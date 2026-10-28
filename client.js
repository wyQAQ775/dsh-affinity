/**
 * @local/dsh-affinity —— 界面侧（游戏面板版）
 *
 * client bundle 是自注册脚本，不是 ESM。
 * 版式与 `preview2.html` 一致；数据来自宿主 `/api/affinity`。
 * CSS 由 `_build_client.py` 从 preview2.html 抽取并加 `.aff-root` 前缀后内联，勿手改 __AFF_CSS__。
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-affinity',
  factory: (require) => {
    const React = require('react')
    const h = React.createElement

    const API = '/api/affinity'

    const CSS = `
  .aff-root{
    --bg:#080c15;
    --panel:#0d1421;
    --line:rgba(216,180,90,.28);
    --gold:#d9b65c;
    --gold-soft:#f0d79a;
    --ink:#e9e7e0;
    --dim:#8892a6;
    --track:#1a2337;
    --teal:#5fd4c9;
    --violet:#a48bfa;
    --rose:#f07ab0;
    --warm:#f0a04b;
    --hot:#ff6b5e;
  }
  .aff-root *{box-sizing:border-box;margin:0;padding:0}
    .aff-root{
    height:100%;overflow:auto;
    background:
      radial-gradient(900px 460px at 50% -6%, rgba(58,86,150,.30) 0%, transparent 68%),
      radial-gradient(700px 400px at 90% 110%, rgba(120,80,40,.10) 0%, transparent 70%),
      var(--bg);
    font-family:"Microsoft YaHei","PingFang SC","Hiragino Sans GB",sans-serif;
    color:var(--ink);font-size:14px;line-height:1.72;
    -webkit-font-smoothing:antialiased;
  }

  /* ============ 主卡 ============ */
  .aff-root .card{
    position:relative;
    width:100%;max-width:900px;
    padding:26px 30px 22px;
    background:
      repeating-linear-gradient(0deg, rgba(255,255,255,.008) 0 1px, transparent 1px 3px),
      linear-gradient(165deg,#101a2e 0%,#0b1220 55%,#090f1b 100%);
    border:1px solid var(--line);
    box-shadow:
      0 0 0 1px rgba(0,0,0,.6),
      0 24px 60px -20px rgba(0,0,0,.9),
      inset 0 1px 0 rgba(240,215,154,.10);
    clip-path:polygon(16px 0,calc(100% - 16px) 0,100% 16px,100% calc(100% - 16px),calc(100% - 16px) 100%,16px 100%,0 calc(100% - 16px),0 16px);
  }
  /* 内描边 */
  .aff-root .card::before{
    content:"";position:absolute;inset:7px;pointer-events:none;
    border:1px solid rgba(216,180,90,.14);
    clip-path:polygon(13px 0,calc(100% - 13px) 0,100% 13px,100% calc(100% - 13px),calc(100% - 13px) 100%,13px 100%,0 calc(100% - 13px),0 13px);
  }
  /* 顶部微光 */
  .aff-root .card::after{
    content:"";position:absolute;left:12%;right:12%;top:-1px;height:1px;
    background:linear-gradient(90deg,transparent,rgba(240,215,154,.75),transparent);
  }

  /* ============ 头部 ============ */
  .aff-root .head{display:flex;gap:20px;align-items:flex-start;position:relative;z-index:1}

  .aff-root .portrait{
    position:relative;width:112px;height:112px;flex:0 0 112px;
    background:#0a1120;
    border:1px solid rgba(216,180,90,.55);
    box-shadow:0 0 18px -6px rgba(216,180,90,.5), inset 0 0 24px -10px rgba(216,180,90,.6);
    clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
    overflow:hidden;
  }
  .aff-root .portrait img{width:100%;height:100%;object-fit:cover;display:block}
  .aff-root .rank{
    position:absolute;left:-1px;top:-1px;z-index:2;
    padding:2px 9px 3px;
    font-size:11px;font-weight:700;letter-spacing:.16em;
    color:#1a1206;
    background:linear-gradient(135deg,#f4dc9c,#c8a244);
    clip-path:polygon(0 0,100% 0,calc(100% - 8px) 100%,0 100%);
  }

  .aff-root .who{flex:1;min-width:0;padding-top:4px}
  .aff-root .nameRow{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
  .aff-root .name{
    font-size:34px;font-weight:800;letter-spacing:.06em;line-height:1;
    background:linear-gradient(180deg,#fdf3d8,#d9b65c 62%,#a9812f);
    -webkit-background-clip:text;background-clip:text;color:transparent;
    text-shadow:0 0 24px rgba(217,182,92,.22);
  }
  .aff-root .lv{font-size:12px;color:var(--dim);letter-spacing:.1em;font-variant-numeric:tabular-nums}
  .aff-root .lv b{color:var(--gold-soft);font-size:14px}
  .aff-root .cls{
    display:inline-flex;align-items:center;gap:5px;
    padding:2px 9px;font-size:11px;letter-spacing:.08em;
    color:var(--gold-soft);
    border:1px solid rgba(216,180,90,.34);
    background:rgba(216,180,90,.07);
  }
  .aff-root .cls::before{content:"";width:5px;height:5px;background:var(--gold);transform:rotate(45deg)}

  .aff-root .tags{display:flex;gap:8px;margin-top:11px;flex-wrap:wrap}
  .aff-root .tag{
    font-size:11.5px;padding:3px 11px;color:#b9c2d4;
    border:1px solid rgba(150,165,195,.24);
    background:rgba(150,165,195,.06);
    clip-path:polygon(7px 0,100% 0,calc(100% - 7px) 100%,0 100%);
  }
  .aff-root .notes{margin-top:11px;font-size:12.5px;line-height:1.85;color:var(--dim)}
  .aff-root .notes i{color:var(--gold-soft);font-style:normal}

  /* ============ 好感环 ============ */
  .aff-root .ringWrap{
    position:relative;flex:0 0 190px;width:190px;height:112px;
    display:flex;justify-content:center;
  }
  .aff-root .ringWrap svg{width:190px;height:112px;overflow:visible}
  .aff-root .ringNum{
    position:absolute;bottom:2px;left:0;right:0;text-align:center;
  }
  .aff-root .ringNum b{
    display:block;font-size:38px;line-height:1;font-weight:800;
    font-variant-numeric:tabular-nums;
    background:linear-gradient(180deg,#fff6dc,#d9b65c 70%);
    -webkit-background-clip:text;background-clip:text;color:transparent;
  }
  .aff-root .ringNum span{display:block;margin-top:3px;font-size:10.5px;letter-spacing:.3em;color:var(--dim)}

  /* ============ 分隔 ============ */
  .aff-root .hr{
    height:1px;margin:20px 0 16px;position:relative;
    background:linear-gradient(90deg,transparent,rgba(216,180,90,.30) 18%,rgba(216,180,90,.30) 82%,transparent);
  }
  .aff-root .hr::after{
    content:"◆";position:absolute;left:50%;top:-8px;transform:translateX(-50%);
    font-size:9px;color:rgba(216,180,90,.6);background:#0b1220;padding:0 8px;
  }

  /* ============ 属性 ============ */
  .aff-root .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 34px}
  .aff-root .stat{display:flex;align-items:center;gap:10px;padding:4px 0}
  .aff-root .ico{
    flex:0 0 22px;width:22px;height:22px;display:grid;place-items:center;
    border:1px solid rgba(150,165,195,.2);
    background:rgba(150,165,195,.05);
    clip-path:polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px);
  }
  .aff-root .ico svg{width:12px;height:12px}
  .aff-root .stat .lb{flex:0 0 62px;font-size:12.5px;color:#b9c2d4;letter-spacing:.04em}
  .aff-root .bar{
    position:relative;flex:1;height:9px;background:var(--track);
    box-shadow:inset 0 1px 2px rgba(0,0,0,.7);
    overflow:hidden;
  }
  .aff-root .bar .fill{
    position:absolute;inset:0;right:auto;width:0;
    transition:width 1.05s cubic-bezier(.22,.68,.24,1);
    box-shadow:0 0 10px -2px currentColor;
    color:var(--teal);
  }
  .aff-root .bar .fill::after{
    content:"";position:absolute;inset:0;
    background:linear-gradient(90deg,transparent 0 60%,rgba(255,255,255,.45) 82%,transparent 100%);
    background-size:220% 100%;
    animation:sheen 3.4s linear infinite;
    opacity:.55;
  }
  .aff-root .bar .ticks{
    position:absolute;inset:0;pointer-events:none;
    background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.55) 0 1px,transparent 1px 10%);
  }
  .aff-root .stat .val{
    flex:0 0 26px;text-align:right;font-size:13px;font-variant-numeric:tabular-nums;
    color:#dfe4ee;
  }
  @keyframes sheen{from{background-position:220% 0}to{background-position:-120% 0}}

  /* 颜色分组 */
  .aff-root .c-teal .fill{background:linear-gradient(90deg,#2c8f88,#5fd4c9)}
  .aff-root .c-teal .ico{border-color:rgba(95,212,201,.34);color:#5fd4c9}
  .aff-root .c-violet .fill{background:linear-gradient(90deg,#5f4bb5,#a48bfa)}
  .aff-root .c-violet .ico{border-color:rgba(164,139,250,.34);color:#a48bfa}
  .aff-root .c-rose .fill{background:linear-gradient(90deg,#a83a72,#f07ab0)}
  .aff-root .c-rose .ico{border-color:rgba(240,122,176,.34);color:#f07ab0}
  .aff-root .c-warm .fill{background:linear-gradient(90deg,#a86a24,#f0a04b)}
  .aff-root .c-warm .ico{border-color:rgba(240,160,75,.42);color:#f0a04b}
  .aff-root .c-hot .fill{background:linear-gradient(90deg,#a8312a,#ff6b5e)}
  .aff-root .c-hot .ico{border-color:rgba(255,107,94,.45);color:#ff6b5e}
  .aff-root .c-hot .val{color:#ff8d83}

  /* ============ 心之声 ============ */
  .aff-root .voice{
    margin-top:20px;padding:16px 20px 17px;position:relative;
    background:linear-gradient(180deg,rgba(18,27,45,.92),rgba(12,18,31,.92));
    border-left:2px solid rgba(216,180,90,.55);
  }
  .aff-root .voice h3{
    font-size:11px;font-weight:600;letter-spacing:.34em;color:var(--gold);
    margin-bottom:9px;
  }
  .aff-root .voice p{font-size:13px;line-height:2;color:#c8cfdd}
  .aff-root .voice p + p{margin-top:9px}
  .aff-root .voice em{font-style:normal;color:var(--gold-soft)}

  /* ============ 增益 / 减益 ============ */
  .aff-root .fx{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}
  .aff-root .fxBox{padding:13px 16px 14px;background:rgba(14,21,36,.7);border:1px solid rgba(150,165,195,.13)}
  .aff-root .fxBox h4{
    font-size:11px;letter-spacing:.2em;margin-bottom:9px;display:flex;align-items:center;gap:7px;
  }
  .aff-root .fxBox h4::before{content:"";width:0;height:0;border-style:solid}
  .aff-root .up h4{color:#7fd4c9}
  .aff-root .up h4::before{border-width:0 5px 8px 5px;border-color:transparent transparent #7fd4c9 transparent}
  .aff-root .down h4{color:#ff8d83}
  .aff-root .down h4::before{border-width:8px 5px 0 5px;border-color:#ff8d83 transparent transparent transparent}
  .aff-root .fxBox li{
    list-style:none;font-size:12px;line-height:1.95;color:#aeb7c9;
    padding-left:13px;position:relative;
  }
  .aff-root .fxBox li::before{
    content:"";position:absolute;left:0;top:8px;width:4px;height:4px;
    background:currentColor;opacity:.5;transform:rotate(45deg);
  }
  .aff-root .up li::before{color:#7fd4c9}
  .aff-root .down li::before{color:#ff8d83}

  /* ============ 页脚 ============ */
  .aff-root .foot{
    display:flex;justify-content:space-between;align-items:center;
    margin-top:20px;padding-top:12px;
    border-top:1px solid rgba(150,165,195,.12);
    font-size:11px;color:#67718a;letter-spacing:.05em;
  }
  .aff-root .foot b{color:var(--gold);font-weight:600;letter-spacing:.2em}

  @media (prefers-reduced-motion:reduce){
  .aff-root .bar .fill{transition:none;width:var(--w)!important}
  .aff-root .bar .fill::after{animation:none}
  }

  /* ============ 插件外壳 ============ */
  .aff-root .affWrap{max-width:960px;margin:0 auto;padding:14px 14px 44px}
  .aff-root .affBar{display:flex;align-items:center;gap:12px;padding:4px 0 16px;flex-wrap:wrap}
  .aff-root .affBarTitle{font-size:12.5px;letter-spacing:.18em;color:var(--gold-soft)}
  .aff-root .affBarNote{font-size:11.5px;color:var(--dim)}
  .aff-root .affBtn{padding:5px 12px;border-radius:6px;font-size:11.5px;cursor:pointer;font-family:inherit;
    border:1px solid rgba(216,180,90,.28);background:rgba(216,180,90,.07);color:var(--gold-soft)}
  .aff-root .affBtn:hover{background:rgba(216,180,90,.15)}
  .aff-root .affBtn[disabled]{opacity:.5;cursor:default}
  .aff-root .affMsg{font-size:12px;color:var(--dim);padding:14px 0}
  .aff-root .affMsg[data-bad]{color:#ff8d83}
  .aff-root .affCardGap{margin-top:26px}
  .aff-root .affCardGap:first-child{margin-top:0}
  .aff-root .portraitFallback{display:grid;place-items:center;width:100%;height:100%;
    font-size:34px;color:rgba(217,182,92,.75);background:#0a1120}
  .aff-root .skills{padding:10px 0 2px}
  .aff-root .skillsTitle{font-size:11px;letter-spacing:.22em;color:var(--gold-soft);opacity:.85;margin-bottom:8px}
  .aff-root .skillsRow{display:flex;flex-wrap:wrap;gap:8px}
  .aff-root .skillPill{font-size:12px;line-height:1.5;padding:4px 12px;border-radius:999px;color:var(--ink);
    background:rgba(216,180,90,.07);border:1px solid rgba(216,180,90,.26);
    box-shadow:inset 0 0 12px rgba(216,180,90,.05)}
`

    /** 12×12 图标，照 preview2.html 的 ICONS 原样搬。 */
    const ICONS = {
      shield: '<path d="M6 1 11 3v4c0 3-2.4 5-5 6C3.4 12 1 10 1 7V3z" fill="currentColor"/>',
      sword: '<path d="M11 1 7 8H5l4-7zM4 9h3l1 2H3z" fill="currentColor"/><rect x="4.6" y="8" width="1.2" height="4" fill="currentColor"/>',
      heart: '<path d="M6 11S1 7.8 1 4.6C1 2.9 2.3 1.6 3.9 1.6c1 0 1.8.5 2.1 1.2.3-.7 1.1-1.2 2.1-1.2C9.7 1.6 11 2.9 11 4.6 11 7.8 6 11 6 11z" fill="currentColor"/>',
      hand: '<path d="M4 6V2.4a.9.9 0 1 1 1.8 0V5h.5V1.6a.9.9 0 1 1 1.8 0V5h.4V2.2a.9.9 0 1 1 1.8 0V7c0 3-1.4 4.6-3.6 4.6-2 0-3.4-1.3-3.4-3.4V5.2a.9.9 0 1 1 1.8 0V6z" fill="currentColor"/>',
      lock: '<path d="M3 5V3.6A3 3 0 0 1 9 3.6V5h.4c.4 0 .6.3.6.6v4.8c0 .4-.2.6-.6.6H2.6c-.4 0-.6-.2-.6-.6V5.6c0-.3.2-.6.6-.6zm1.4 0h3.2V3.7a1.6 1.6 0 0 0-3.2 0z" fill="currentColor"/>',
      hourglass: '<path d="M2 1h8v1.2H8.8C8.8 4.6 7 5.4 7 6s1.8 1.4 1.8 3.8H10V11H2V9.8h1.2C3.2 7.4 5 6.6 5 6S3.2 4.6 3.2 2.2H2z" fill="currentColor"/>',
      crack: '<path d="M6 11S1 7.8 1 4.6C1 2.9 2.3 1.6 3.9 1.6c1 0 1.8.5 2.1 1.2.3-.7 1.1-1.2 2.1-1.2C9.7 1.6 11 2.9 11 4.6 11 7.8 6 11 6 11z" fill="currentColor" opacity=".45"/><path d="M6.4 2 4.6 6h1.6l-1 4.4L8.8 5H6.9z" fill="#0b1220"/>',
      flag: '<path d="M2 1h1.2v10H2zM3.6 1.4c2.2-1 3.8.9 6 0v4.6c-2.2.9-3.8-1-6 0z" fill="currentColor"/>',
      star: '<path d="M6 .8 7.5 4l3.5.4-2.6 2.4.7 3.4L6 8.5 2.9 10.2l.7-3.4L1 4.4 4.5 4z" fill="currentColor"/>',
    }

    /** 已知指标的图标与配色；未列出的按数值兜底。 */
    const META = {
      信任: ['shield', 'c-teal'],
      服气: ['sword', 'c-teal'],
      心疼: ['heart', 'c-rose'],
      依赖: ['hand', 'c-violet'],
      会吃醋: ['lock', 'c-rose'],
      耐心: ['hourglass', 'c-warm'],
      怕失去: ['crack', 'c-violet'],
      嘴上认输: ['flag', 'c-hot'],
      嘴硬: ['flag', 'c-rose'],
      撒娇: ['heart', 'c-rose'],
      干劲: ['sword', 'c-teal'],
      饥饿: ['heart', 'c-warm'],
      疲惫: ['hourglass', 'c-violet'],
      了解: ['shield', 'c-violet'],
      想靠近: ['hand', 'c-rose'],
      想被夸: ['star', 'c-warm'],
      吃醋: ['lock', 'c-rose'],
    }

    const FALLBACK_CLS = ['c-teal', 'c-violet', 'c-rose']

    const toList = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()) : [])

    const toParagraphs = (m) => {
      if (Array.isArray(m)) return m.filter((x) => typeof x === 'string' && x.trim())
      if (typeof m !== 'string') return []
      return m.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)
    }

    const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0))

    /** 弧长常量：与 preview2.html 的 svg 路径 (M16 100 A79 79 0 0 1 174 100) 一致。 */
    const FULL_ARC = 248.2

    const useReducedMotion = () => {
      const [reduce] = React.useState(
        () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
      )
      return reduce
    }

    function Icon({ name }) {
      return h('svg', {
        viewBox: '0 0 12 12',
        'aria-hidden': true,
        dangerouslySetInnerHTML: { __html: ICONS[name] || ICONS.heart },
      })
    }

    function Stat({ bar, index }) {
      const label = (bar && bar.label) || ''
      const v = clamp(bar && bar.value)
      const meta = META[label]
      const cls = meta ? meta[1] : FALLBACK_CLS[index % FALLBACK_CLS.length]
      const icon = meta ? meta[0] : 'heart'

      // 条子从 0 长到目标值：首帧 width:0，下一拍再给目标宽度，交给 CSS transition。
      const [on, setOn] = React.useState(false)
      React.useEffect(() => {
        const t = setTimeout(() => setOn(true), 120 + index * 40)
        return () => clearTimeout(t)
      }, [index])

      return h('div', { className: 'stat ' + cls },
        h('span', { className: 'ico' }, h(Icon, { name: icon })),
        h('span', { className: 'lb' }, label),
        h('span', { className: 'bar' },
          h('span', { className: 'fill', style: { width: on ? v + '%' : 0, '--w': v + '%' } }),
          h('span', { className: 'ticks' })),
        h('span', { className: 'val' }, String(v)))
    }

    function Ring({ score, ready, reduce }) {
      const arc = reduce || ready ? (FULL_ARC * score) / 100 : 0
      const [shown, setShown] = React.useState(reduce ? score : 0)

      React.useEffect(() => {
        if (reduce) { setShown(score); return }
        if (!ready) return
        let raf = 0
        const t0 = performance.now()
        const dur = 1100
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / dur)
          const e = 1 - Math.pow(1 - p, 3)
          setShown(Math.round(score * e))
          if (p < 1) raf = requestAnimationFrame(tick)
          else setShown(score)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
      }, [ready, reduce, score])

      return h('div', { className: 'ringWrap' },
        h('svg', { viewBox: '0 0 190 112', 'aria-hidden': true },
          h('defs', null,
            h('linearGradient', { id: 'affRingGrad', x1: 0, y1: 0, x2: 1, y2: 0 },
              h('stop', { offset: '0%', stopColor: '#a9812f' }),
              h('stop', { offset: '55%', stopColor: '#f0d79a' }),
              h('stop', { offset: '100%', stopColor: '#d9b65c' })),
            h('filter', { id: 'affRingGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' },
              h('feGaussianBlur', { stdDeviation: 3, result: 'b' }),
              h('feMerge', null,
                h('feMergeNode', { in: 'b' }),
                h('feMergeNode', { in: 'SourceGraphic' })))),
          h('path', {
            d: 'M16 100 A79 79 0 0 1 174 100', fill: 'none',
            stroke: '#182135', strokeWidth: 13, strokeLinecap: 'round',
          }),
          h('path', {
            d: 'M16 100 A79 79 0 0 1 174 100', fill: 'none',
            stroke: 'url(#affRingGrad)', strokeWidth: 13, strokeLinecap: 'round',
            filter: 'url(#affRingGlow)',
            strokeDasharray: `${arc.toFixed(1)} ${FULL_ARC}`,
            style: { transition: reduce ? 'none' : 'stroke-dasharray 1.05s cubic-bezier(.22,.68,.24,1)' },
          })),
        h('div', { className: 'ringNum' },
          h('b', null, String(shown)),
          h('span', null, '好感度')))
    }

    function Radar({ bars }) {
      const list = Array.isArray(bars) ? bars : []
      const N = list.length
      const [on, setOn] = React.useState(false)
      React.useEffect(() => {
        const t = setTimeout(() => setOn(true), 160)
        return () => clearTimeout(t)
      }, [])
      if (N < 3) return null
      const R = 78, cx = 110, cy = 110
      const ang = (i) => -Math.PI / 2 + i * 2 * Math.PI / N
      const pt = (i, r) => [cx + Math.cos(ang(i)) * r, cy + Math.sin(ang(i)) * r]
      const path = (f) => list.map((_, i) => {
        const q = pt(i, R * f)
        return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)
      }).join(' ') + ' Z'
      const kids = []
      ;[0.25, 0.5, 0.75, 1].forEach((f) => {
        kids.push(h('path', { key: 'g' + f, d: path(f), fill: 'none', stroke: 'rgba(216,180,90,.16)', strokeWidth: 1 }))
      })
      list.forEach((b, i) => {
        const q = pt(i, R)
        kids.push(h('line', { key: 'ax' + i, x1: cx, y1: cy, x2: q[0].toFixed(1), y2: q[1].toFixed(1), stroke: 'rgba(216,180,90,.12)' }))
      })
      const val = (b) => Math.max(0, Math.min(100, Number(b.value) || 0))
      const shape = list.map((b, i) => {
        const q = pt(i, R * (on ? val(b) : 0) / 100)
        return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)
      }).join(' ') + ' Z'
      kids.push(h('path', {
        key: 'poly', d: shape, fill: 'rgba(240,215,154,.18)', stroke: '#f0d79a',
        strokeWidth: 1.6, strokeLinejoin: 'round',
        style: { transition: 'd .7s cubic-bezier(.22,.68,.24,1)' },
      }))
      list.forEach((b, i) => {
        const q = pt(i, R * (on ? val(b) : 0) / 100)
        kids.push(h('circle', { key: 'dt' + i, cx: q[0].toFixed(1), cy: q[1].toFixed(1), r: 2.6, fill: '#ffe9b0' }))
      })
      list.forEach((b, i) => {
        const q = pt(i, R + 14)
        kids.push(h('text', {
          key: 'lb' + i, x: q[0].toFixed(1), y: q[1].toFixed(1),
          textAnchor: 'middle', dominantBaseline: 'middle',
          fontSize: 10, fill: '#b9c6dc',
        }, String(b.label || '')))
      })
      return h('div', {
        className: 'radarBox',
        style: { flex: '0 0 auto', width: '250px', marginRight: '24px' },
      },
        h('div', {
          className: 'radarTitle',
          style: { fontSize: '12px', letterSpacing: '2px', color: '#8b9bb4', marginBottom: '6px' },
        }, '属性雷达'),
        h('svg', { viewBox: '0 0 220 220', 'aria-hidden': true, style: { width: '100%', height: 'auto' } }, kids))
    }

    function Portrait({ item }) {
      const [failed, setFailed] = React.useState(false)
      const initial = String(item.name || '?').slice(0, 1)
      const src = API + '/avatar?id=' + encodeURIComponent(item.id || '')
      return h('div', { className: 'portrait' },
        h('span', { className: 'rank' }, item.rank || 'SSR'),
        failed || !item.id
          ? h('div', { className: 'portraitFallback' }, initial)
          : h('img', { src, alt: item.name || '', onError: () => setFailed(true) }))
    }

    function Card({ item }) {
      const bars = Array.isArray(item.bars) ? item.bars : []
      const paras = toParagraphs(item.monologue)
      const up = toList(item.up)
      const down = toList(item.down)
      const tags = toList(item.tags)
      const notes = toList(item.notes)
      const score = clamp(item.total)
      const reduce = useReducedMotion()

      const [ready, setReady] = React.useState(false)
      React.useEffect(() => {
        const t = setTimeout(() => setReady(true), 120)
        return () => clearTimeout(t)
      }, [])

      const title = item.title || ''
      const lv = item.level || item.lv || ''
      const cls = item.cls || ''

      return h('article', { className: 'card' },
        h('div', { className: 'head' },
          h(Portrait, { item }),
          h('div', { className: 'who' },
            h('div', { className: 'nameRow' },
              h('div', { className: 'name' }, item.name || '无名'),
              lv ? h('div', { className: 'lv' }, 'LV.', h('b', null, String(lv))) : null,
              cls ? h('span', { className: 'cls' }, cls) : null),
            tags.length
              ? h('div', { className: 'tags' }, tags.map((x, i) => h('span', { className: 'tag', key: i }, x)))
              : null,
            notes.length
              ? h('div', { className: 'notes' }, notes.map((x, i) => h('div', { key: i }, '· ', x)))
              : null),
          h(Ring, { score, ready, reduce })),

        h('div', { className: 'hr' }),

        bars.length
          ? h('div', { style: { display: 'flex', alignItems: 'flex-start' } },
              h(Radar, { bars }),
              h('div', { className: 'grid', style: { flex: '1 1 auto', minWidth: 0 } },
                bars.map((b, i) => h(Stat, { key: i, bar: b, index: i }))))
          : null,

        (item.skills || []).length
          ? h('div', { className: 'skills' },
              h('div', { className: 'skillsTitle' }, '特 长'),
              h('div', { className: 'skillsRow' },
                item.skills.map((s, i) => h('span', { key: i, className: 'skillPill' }, s))))
          : null,

        paras.length
          ? h('div', { className: 'voice' },
              h('h3', null, '心 之 声'),
              paras.map((x, i) => h('p', { key: i }, '「', h('em', null, x), '」')))
          : null,

        (up.length || down.length)
          ? h('div', { className: 'fx' },
              up.length
                ? h('div', { className: 'fxBox up' },
                    h('h4', null, item.upTitle || '好感上升'),
                    h('ul', null, up.map((x, i) => h('li', { key: i }, x))))
                : null,
              down.length
                ? h('div', { className: 'fxBox down' },
                    h('h4', null, item.downTitle || '好感下降'),
                    h('ul', null, down.map((x, i) => h('li', { key: i }, x))))
                : null)
          : null,

        h('div', { className: 'foot' },
          h('b', null, item.name || ''),
          h('span', null, item.footer || '')))
    }

    function Panel() {
      const [state, setState] = React.useState({ phase: 'loading', items: [], errors: [], error: '', activeId: '' })

      const load = React.useCallback(async () => {
        setState((s) => ({ ...s, phase: 'loading', error: '' }))
        try {
          const res = await fetch(API, { credentials: 'same-origin' })
          if (!res.ok) throw new Error('HTTP ' + res.status)
          const data = await res.json()
          if (!data || data.ok !== true) throw new Error((data && data.error) || '读取失败')
          setState({
            phase: 'ready',
            items: Array.isArray(data.items) ? data.items : [],
            errors: Array.isArray(data.errors) ? data.errors : [],
            error: '',
          })
        } catch (e) {
          setState({ phase: 'error', items: [], errors: [], error: String((e && e.message) || e) })
        }
      }, [])

      React.useEffect(() => {
        load()
        // 后台每 3 秒静默拉一次：改 data/*.json 后界面自己变，不闪「读取中」
        const t = setInterval(() => {
          fetch(API + '?t=' + Date.now(), { credentials: 'same-origin', cache: 'no-store' })
            .then((r) => r.json())
            .then((data) => {
              if (data && data.ok === true) {
                setState({
                  phase: 'ready',
                  items: Array.isArray(data.items) ? data.items : [],
                  errors: Array.isArray(data.errors) ? data.errors : [],
                  error: '',
                })
              }
            })
            .catch(() => { })
        }, 3000)
        return () => clearInterval(t)
      }, [load])

      const head = h('div', { className: 'affBar' },
        h('span', { className: 'affBarTitle' }, '鲸宝档案'),
        h('span', { className: 'affBarNote' }, state.phase === 'ready' ? state.items.length + ' 位' : ''),
        h('span', { style: { flex: 1 } }),
        h('button', { className: 'affBtn', disabled: state.phase === 'loading', onClick: load },
          state.phase === 'loading' ? '读取中…' : '重新读取'))

      const body = state.phase === 'error'
        ? h('div', { className: 'affMsg', 'data-bad': '' }, '读不到数据：' + state.error)
        : state.phase === 'loading'
          ? h('div', { className: 'affMsg' }, '读取中…')
          : state.items.length === 0
            ? h('div', { className: 'affMsg' }, 'data 目录里还没有卡片（放一个 名字.json 进来就行）')
            : (() => {
              const cur = state.items.find((x) => x.id === state.activeId) || state.items[0]
              const tabs = h('div', {
                style: {
                  display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center',
                  padding: '10px 0 14px', marginBottom: 14,
                  borderBottom: '1px solid rgba(216,180,90,.22)',
                },
              }, state.items.map((it, i) => {
                const on = !!(cur && it.id === cur.id)
                return h('button', {
                  key: it.id || i,
                  type: 'button',
                  title: '看 ' + (it.name || it.id || ''),
                  onClick: () => setState((s) => ({ ...s, activeId: it.id })),
                  style: {
                    display: 'flex', alignItems: 'baseline', gap: 7,
                    padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 13, lineHeight: 1.4,
                    color: on ? '#f0d79a' : '#8c9ab3',
                    background: on ? 'rgba(216,180,90,.14)' : 'transparent',
                    border: '1px solid ' + (on ? 'rgba(240,215,154,.55)' : 'rgba(216,180,90,.18)'),
                  },
                },
                  h('span', null, it.name || it.id || '无名'))
              }))
              return h('div', null, tabs, h(Card, { key: cur ? cur.id : 'none', item: cur }))
            })()

      return h('div', { className: 'aff-root' },
        h('div', { className: 'affWrap' },
          head,
          body,
          state.errors.length ? h('div', { className: 'affMsg', 'data-bad': '' }, state.errors.join('；')) : null))
    }

    function HeartIcon(owner) {
      const size = (owner && owner.size) || 16
      return h('svg', {
        viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true,
        style: { display: 'block' },
      }, h('path', {
        d: 'M12 20.6 4.7 13.4a4.6 4.6 0 0 1 6.5-6.5l.8.8.8-.8a4.6 4.6 0 1 1 6.5 6.5Z',
        fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round',
      }))
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const style = document.createElement('style')
        style.setAttribute('data-plugin-css', '@local/dsh-affinity')
        style.textContent = CSS
        document.head.appendChild(style)
        ctx.effect(() => () => style.remove(), 'affinity: 样式')

        const slots = (typeof ctx.get === 'function' ? ctx.get('slots') : undefined) || ctx.slots
        if (!slots) return

        const PANEL_ID = 'affinity'

        ctx.effect(() => slots.inject('main', () => slots.inject('sidebar.panellist', () => {
          const stopPanel = slots.register({ name: 'main', key: PANEL_ID }, Panel)
          const stopRow = slots.register({
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: 26,
            label: () => '好感度',
          }, HeartIcon)
          return () => { stopRow?.(); stopPanel?.() }
        })), 'affinity: 侧栏面板')

        ctx.effect(() => slots.inject('settings.section', () => slots.register(
          { name: 'settings.section', id: PANEL_ID, order: 26, label: '好感度' },
          () => h(Panel),
        )), 'affinity: 设置页入口')
      },
    }
  },
})
