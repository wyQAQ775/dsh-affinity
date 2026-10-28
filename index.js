/**
 * @local/dsh-affinity —— 宿主侧
 *
 * 只做一件事：把包目录下 `data/*.json` 读成一个数组，通过
 * `/api/affinity` 交给界面侧；另外 `/api/affinity/avatar` 把卡里写死的
 * 本地头像文件吐出来（http 页面不能直接加载 file://）。
 *
 * 安全边界：只读 `data/` 下的 .json；头像只允许读卡里 avatar 字段指向的
 * 那一个文件，不接受任意路径参数。
 */
import { existsSync, readdirSync, readFileSync, statSync, createReadStream } from 'node:fs'
import { join, isAbsolute, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'affinity'
export const inject = ['webServer']

const pluginDir = fileURLToPath(new URL('.', import.meta.url))
const dataDir = () => join(pluginDir, 'data')

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
}

const sendJson = (res, code, body) => {
  try {
    res.statusCode = code
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.setHeader('cache-control', 'no-store')
    res.end(JSON.stringify(body))
  } catch { /* 连接已经断了就算了 */ }
}

/** 读 data/*.json，按文件名排序合并成一个数组。坏文件跳过但记下来。 */
function readCards() {
  const dir = dataDir()
  if (!existsSync(dir)) return { items: [], errors: [], dir }

  const errors = []
  const items = []
  const files = readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

  for (const file of files) {
    try {
      const raw = readFileSync(join(dir, file), 'utf8')
      const card = JSON.parse(raw)
      if (!card || typeof card !== 'object' || Array.isArray(card)) {
        errors.push(`${file}：内容不是单个对象`)
        continue
      }
      // id 用文件名（去掉 .json），头像接口和 React key 都用它。
      items.push({ ...card, id: basename(file, extname(file)) })
    } catch (e) {
      errors.push(`${file}：${String(e?.message ?? e)}`)
    }
  }
  return { items, errors, dir }
}

/** 把卡里的 avatar 解析成本机绝对路径，解析不到就返回空串。 */
function resolveAvatar(card) {
  const avatar = typeof card?.avatar === 'string' ? card.avatar.trim() : ''
  if (!avatar) return ''
  const file = isAbsolute(avatar) ? avatar : join(pluginDir, avatar)
  try {
    if (!existsSync(file) || !statSync(file).isFile()) return ''
    return file
  } catch {
    return ''
  }
}

function serveAvatar(req, res, query) {
  const id = query.get('id') || ''
  const { items } = readCards()
  const card = items.find((it) => it.id === id)
  if (!card) return sendJson(res, 404, { ok: false, error: `没有这张卡：${id || '(空)'}` })

  const file = resolveAvatar(card)
  if (!file) return sendJson(res, 404, { ok: false, error: '头像文件不在了，或卡里没写 avatar' })

  try {
    const stat = statSync(file)
    res.statusCode = 200
    res.setHeader('content-type', MIME[extname(file).toLowerCase()] || 'application/octet-stream')
    res.setHeader('content-length', String(stat.size))
    res.setHeader('cache-control', 'no-cache')
    if (req.method === 'HEAD') return res.end()
    const stream = createReadStream(file)
    stream.on('error', () => { try { res.end() } catch { /* ignore */ } })
    stream.pipe(res)
  } catch (e) {
    return sendJson(res, 500, { ok: false, error: String(e?.message ?? e) })
  }
}

export function apply(ctx) {
  const log = (m) => { try { ctx.logger?.info?.(`[affinity] ${m}`) } catch { /* 没有 logger 就算了 */ } }

  const handle = (req, res) => {
    let pathname = ''
    let query = new URLSearchParams()
    try {
      const raw = String(req.url || '')
      const cut = raw.indexOf('?')
      pathname = cut >= 0 ? raw.slice(0, cut) : raw
      query = new URLSearchParams(cut >= 0 ? raw.slice(cut + 1) : '')
    } catch { /* 解析不了就当根路径 */ }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return sendJson(res, 405, { ok: false, error: `不支持 ${req.method}` })
    }

    // 前缀路由可能把 /api/affinity 保留、也可能被剥掉，两种都认。
    if (/\/avatar\/?$/.test(pathname)) return serveAvatar(req, res, query)

    try {
      const { items, errors, dir } = readCards()
      return sendJson(res, 200, { ok: true, dir, count: items.length, items, errors })
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: String(e?.message ?? e) })
    }
  }

  try {
    ctx.effect(() => ctx.webServer.register({
      kind: 'prefix',
      path: '/api/affinity',
      handler: handle,
    }), 'affinity: /api/affinity 路由')
    log(`已挂上 /api/affinity（数据目录 ${dataDir()}）`)
  } catch (e) {
    log(`路由没挂上：${e?.message ?? e}`)
  }
}
