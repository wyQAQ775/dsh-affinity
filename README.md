# 鲸宝好感度插件 · dsh-affinity

一个 DeepSeek Harness 的界面插件：在侧栏加一个「好感度」入口，把 `data/*.json` 里的角色卡渲染成游戏角色面板那种样子 —— SSR 角标、Lv、职阶、半圆环总分、八边形雷达、带刻度的数值条、她们自己写的特长、心之声、好感上升/下降两栏。

数字是手填的，插件只负责显示。改 json 里任何一个数，界面 3 秒内自己跟着变，不用刷新、不用重启。

仓库里只有插件本体和一张空白示例卡，没有任何人的真实数据。

## 它长什么样

- 顶部一排名字，点谁看谁
- 每张卡：头像 + 名字 + 职阶徽章 + 半圆环总分
- 左八边形雷达看形状，右数值条看数字
- 「特长」一排胶囊 —— 角色自己写的，插件不改字
- 「心之声」大框，写内心独白
- 底部「会往上走 / 会往下掉」两栏

## 装法

需要 DeepSeek Harness（桌面版自带 `profiles/desktop`）。

先把这个仓库放到本机，两种都行：

- 有 git：`git clone https://github.com/wyQAQ775/dsh-affinity.git D:/dsh-plugins/dsh-affinity`
- 没有 git：下载 zip，解压到 `D:/dsh-plugins/`，得到 `D:/dsh-plugins/dsh-affinity/`（里面应该直接有 `package.json`，不要再套一层目录）

然后编辑 `%USERPROFILE%\.dsh\profiles\desktop\package.json`，在 `dependencies` 里加一行：

```json
"@local/dsh-affinity": "file:D:/dsh-plugins/dsh-affinity"
```

在 profile 目录里装一次依赖：

```bash
cd %USERPROFILE%\.dsh\profiles\desktop
pnpm install
```

重启 DSH，刷新页面，侧栏就多一个「好感度」。

> 装完看到的是那张空白示例卡，换成你自己的 json 就是你的面板。

## 加人和改数字

- 一个角色 = `data/` 里一个 json 文件，文件名就是面板上的名字（例：`示例.json`）
- 丢一个新 json 进去，就多一个名字，不用改代码
- 改数字存盘 → 3 秒后面板自己动

字段：

| 字段 | 说明 |
| --- | --- |
| `name` | 显示名 |
| `title` | 名字下面那行小字 |
| `subtitle` | 更小的一行（在线状态之类） |
| `avatar` | 头像文件绝对路径，可留空 |
| `tags` | 名字旁的徽章数组 |
| `total` | 总分（环上那个数，0-100） |
| `bars` | `[{label, value}]`，4 条或 8 条都行，同时决定雷达形状 |
| `skills` | 特长胶囊，字符串数组 |
| `up` / `down` | 会往上走 / 会往下掉，字符串数组 |
| `monologue` | 心之声，`\n\n` 分段 |
| `footer` | 页脚一行 |

仓库里的 `data/示例.json` 是格式样例，换成你自己的就行。

## 边界

- 插件只读 `data/` 下的 `.json`，只吐卡里 `avatar` 指的那一个文件；不接受任意路径参数。
- 不联网、不上报、不写别的地方。

## 许可

MIT。头像素材自己负责版权。
