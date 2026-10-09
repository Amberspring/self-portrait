# Self-Portrait — Personal Interactive Portfolio

**Product Requirements Document (PRD) v0.9**

**项目代号：** SELF-PORTRAIT
**项目类型：** Interactive Portfolio / Personal Digital World
**开发基础：** [Amberspring/self-portrait](https://github.com/Amberspring/self-portrait)
**目标平台：** Desktop Web First
**核心技术：** React + TypeScript + Vite + Firestore + Cloudinary + Vercel
**状态：** 产品需求整合版，部分美术与内容细节待确认

---

# 0. 产品愿景

## 0.1 核心概念

Self-Portrait 不是传统意义上的在线简历，而是一个允许访问者通过两种不同阅读方式理解同一个人的互动网站。

网站首次加载时，显示巨大的：

**FLORA YEUNG**

鼠标在画面左右移动，可以选择：

- **SYSTEM** — 理性、专业、技术、金融、人工智能与结构化知识
- **LIFE** — 感性、个人记忆、音乐、摄影、写作、生活与创作

两种模式共用核心个人信息与项目数据，但采用完全不同的视觉和交互方式。

**核心原则：Same person. Different ways of reading.**

## 0.2 参考网站及其职责

| 参考 | 用途 |
|---|---|
| [Luke Baffait](https://lukebaffait.fr/) | Opening 的姓名排版、SYSTEM 滚动叙事、作品展示、Contact 视觉与交互 |
| [particles.js](https://vincentgarreau.com/particles.js/#default) | 科技模式的鼠标响应粒子行为 |
| [biede.com](https://www.biede.com/) | 多彩模式的动态图片拼贴与视觉溶解 |
| [Cuelume](https://cuelume-site.pages.dev/) | 鼠标互动及音效体验参考 |
| Undertale | 像素角色、对话框、复古 RPG 交互 |
| Celeste | 角色说话时的短促电子语音反馈 |
| Frutiger Aero | LIFE 窗外天空与复古未来感 |
| [Webamp 指定皮肤](https://skins.webamp.org/skin/b87082c4a409c9f7143bd1b75445ab26/Carrie-Anne%20Moss.wsz/) | DJ 播放器的指定视觉皮肤 |

**参考优先级：**

1. 用户明确提出的最新要求
2. 用户提供的参考照片、服装图与网站演示视频
3. 已确认的前几轮 PRD
4. 原有仓库实现

当旧需求与新需求冲突时，以最新确认的需求为准。

---

# 1. 全站信息架构

```text
/
│
├── OPENING
│   ├── FLORA YEUNG 巨型姓名
│   ├── SYSTEM / LIFE 鼠标方向选择
│   ├── 像素扳手
│   ├── 动态背景过渡
│   └── 交互音效
│
├── /system
│   ├── Hero / 姓名动画
│   ├── About / 个人介绍
│   ├── Education / 教育经历
│   ├── Experience / 实习时间线
│   ├── Projects / 项目档案
│   ├── Awards & Selected Works
│   ├── Writing & Media
│   ├── Skills
│   └── Final Contact / ASCII Hands
│
├── /system/projects/:slug
│
├── /life
│   └── Interactive Pixel Bedroom
│       ├── 角色与对话系统
│       ├── DJ / 音乐播放器
│       ├── Computer / GitHub
│       ├── Diary / 文章手账
│       ├── Globe / 摄影
│       ├── Polaroid / 生活照片
│       ├── Project Archive
│       ├── Doudou / 宠物互动
│       └── Outfit / 角色服装
│
├── /life/projects/:slug
│
└── /admin
    └── 内容管理后台
```

页面必须支持直接访问与刷新，不允许仅依靠前端临时状态维持项目详情。

---

# 2. Opening — 网站入口

## 2.1 第一屏

Opening 的主视觉只有超大姓名与极简辅助信息。

**视觉要求：**

- 全屏布局，首屏高度至少占据一个视口
- 主色为接近纯黑的背景
- 紫色作为科技光效和交互强调色
- `FLORA` 采用参考 Luke 字体比例的粗重无衬线字体
- `YEUNG` 采用参考 Baffait 字体比例的优雅斜体衬线
- 中文文字优先使用指定的猴尊宋体，须确认字体文件与 Web 使用许可
- 文字具有明显的尺度对比及视觉张力

不得把第一屏设计成传统的两个大型矩形按钮。

## 2.2 左右选择逻辑

鼠标在画面左侧时，预览 SYSTEM。

鼠标在画面右侧时，预览 LIFE。

鼠标位于中间时，显示中性状态。

**SYSTEM Hover：**

- 深黑背景上浮现紫色代码、字符或粒子网络
- 粒子受到鼠标位置影响
- 整体采用冷静、精密、低饱和的科技视觉
- 不出现最终 Contact 专属的 ASCII 双手

**LIFE Hover：**

- 背景迅速、平滑地变化为高饱和多彩拼贴
- 图片可由局部碎片、遮罩溶解等方式逐渐显现
- 导入文字变化为彩虹渐变
- 画面具有明显的 Y2K / Scrapbook 氛围

切换应该连续平滑，而不是整个页面突然闪烁或完全重载。

## 2.3 像素扳手

扳手是 Opening 的核心交互对象。

必须具有以下行为：

- 水平跟随鼠标方向
- 向当前选择方向旋转
- 移动时带有轻微惯性
- 鼠标停止后有回弹或稳定过程
- 状态变化时触发机械式像素音效
- 点击或选择入口时触发确认动画

建议将扳手作为独立 Sprite 或 Canvas 图层实现，不与文字 DOM 强耦合。

## 2.4 点击进入模式

选择 SYSTEM 后，进入 `/system`。

选择 LIFE 后，进入 `/life`。

切换应使用路由与动画过渡，不进行整个浏览器页面刷新。

**验收要求：**

- 鼠标从左移动到右侧时，背景和文字风格正确过渡
- 快速左右移动不发生异常闪烁
- 扳手位移、旋转、音效与当前预览状态同步
- 用户可通过点击明确进入两种模式
- 同时提供键盘可操作的入口

---

# 3. SYSTEM — 科技风完整页面

## 3.1 视觉总规范

SYSTEM 全面参考 Luke Baffait 网站的滚动 UI 与排版语言。

关键词：

**Editorial / Brutalist Typography / Black & Violet / Interactive / Motion-Driven / Minimal**

### 视觉规则

- 黑色、深紫、少量白色构成主要配色
- 采用大字号标题和明显留白
- 内容通过滚动逐步建立层级
- 项目展示以大面积媒体和排版为主
- 不大量使用传统圆角白色卡片
- 页面动画与实际滚动进度关联
- 鼠标交互是辅助，不干扰正文阅读

建议色板（初稿，可微调）：

| 角色 | 颜色 |
|---|---|
| 主背景 | `#09070F` |
| 深层背景 | `#130B20` |
| 主要文字 | `#F5F2F8` |
| 紫色强调 | `#A86BE8` |
| 亮紫强调 | `#CE9DFF` |
| 次要文字 | `#AAA1B8` |

## 3.2 全局导航

采用纯文字极简导航。

推荐内容：

- ABOUT
- EXPERIENCE
- PROJECTS
- WORKS
- CONTACT
- LIFE ↗

导航不能遮挡 Hero 中的超大姓名。

可以在滚动后使用精简固定导航，但需要维持整体排版美感。

---

## 3.3 S01 — SYSTEM Hero

用户从 Opening 进入 SYSTEM 时，再次出现 `FLORA YEUNG` 的姓名动画。

这不是完全重复 Opening，而是一次从个人身份进入技术档案的视觉过渡。

### 页面内容

- 超大姓名
- 三句循环的打字机文案
- 少量个人专业标签
- 极简滚动提示

**打字机机制：**

```text
逐字输入
→ 完整句停顿
→ 逐字回删
→ 下一句输入
→ 循环
```

文案同时包含专业能力和个人表达。

暂定示例：

1. 金融视角，技术思维。
2. Finance × Computer Science × AI.
3. Building systems, stories and things I care about.

正式文案待确认。

---

## 3.4 S02 — About / 自我介绍

目标是建立真实、有记忆点的个人形象。

### 页面排版

结合大型标题、个人简介与真实人物照片。

照片支持多张轮换：

- 左右箭头控制
- 平滑图片过渡
- 尽量保留原始照片的比例及质感
- 不应用像素化效果

照片并非必须始终占据页面一半，具体空间比例以参考图和文字可读性为准。

### 自我介绍

内容应涵盖：

- 本科数理金融背景
- 研究生计算机科学方向
- 从金融分析、数据工作到 AI 与系统开发的经历
- 技术兴趣与创造性工作
- 与 LIFE 部分之间的个人连接

文案不应该只是把简历里的学校和公司重新堆砌一遍。

### 数字内容

保留滚动数字效果。

计划展示 4–6 个与用户经历相关的真实指标，例如：

- 真实 GPA / 排名
- 项目数据规模
- 实习或研究经历
- 研究报告产出
- 项目核心实验结果

最终数字必须从已核实的简历或项目资料中取得。

不使用参考网站中的其他人的成绩数据。

**动效：**

- 数字进入视口时增长
- 相邻数据错峰出现
- 首次进入时触发一次，避免滚动反复重置
- 支持 reduced-motion 简化显示

---

## 3.5 S03 — Education

重点表现从 Quantitative Finance 到 Computer Science 的学习轨迹。

包括：

- Tongji University
- The University of Hong Kong
- 学位、专业、时间
- 代表性课程与专业方向

视觉上使用大字号学校名称、线条、少量日期和层级式信息。

不做传统简历表格。

---

## 3.6 S04 — Experience Timeline

保留简历里的真实实习职责及成果。

### 视觉结构

采用垂直时间线：

- 日期或年份
- 公司名称
- 岗位
- 所在地
- 业务背景
- 2–4 条重点工作内容及结果

### 交互

向下滚动时：

1. 当前时间节点点亮
2. 时间线延伸
3. 公司名称进入
4. 工作描述分段出现
5. 下一段经历进入视觉焦点

已显示内容不应在滚动过程中突然消失到无法阅读。

### 内容原则

- 不夸大个人贡献
- 不添加未经核实的结果
- 尽量沿用现有英文简历中已确认的描述
- 中英文内容独立维护

---

## 3.7 S05 — Projects

作品展示重点参考 Luke 的项目滚动方式，而不是普通卡片网格。

### 视觉结构

- 大尺寸项目标题
- 大面积封面或媒体内容
- 与滚动联动的版面变化
- 鼠标 Hover 显示项目预览
- 页面局部使用紫色曲线、流光或遮罩效果

### 项目类型

统一包含：

- AI / Machine Learning
- Finance / Quantitative Research
- Data Analytics
- Interactive Development
- Vibe Coding / Creative Technology

### 项目详情

每个项目至少具备：

- 项目简介
- 问题背景
- 个人职责
- 技术架构
- 方法与实现
- 实验或业务结果
- 局限与反思
- GitHub / Demo 链接
- 项目图片及截图

项目详情沿用并升级当前仓库已有的 Case Study 结构。

---

## 3.8 S06 — Selected Works & Media

这里整合现有仓库的：

- Competitions
- Visual Works
- Research Reports
- Media Works
- AI Writing

建议采用分组式大字号列表、图片预览和局部交互。

内容结构可以分类，但整体视觉保持与 Projects 一致。

---

## 3.9 S07 — Skills & Technologies

展示程序语言、框架、机器学习、金融分析与创作工具。

不要直接放成大量相同大小的彩色标签。

建议使用文字分组、横向排列、滚动显现及轻微 Hover 效果。

---

## 3.10 SYSTEM 粒子交互模式

参考 particles.js，但需要与 Luke 式版面视觉融合。

### 默认模式

- 背景存在少量细小粒子或节点
- 运动缓慢
- 低对比度
- 不抢夺正文阅读注意力

### Interactive Mode

用户开启后：

- 增强鼠标扰动范围
- 显示更明显的连线和聚合
- 增加点击时的短暂粒子反馈

具体入口位置和动效强度待设计。

**严格要求：** 这种粒子交互不能替代最后一屏的 ASCII 手掌，也不能提前出现相同的双手视觉。

---

# 4. SYSTEM — Final Contact

**本模块是 SYSTEM 的最后一屏，也是最重要的视觉高潮之一。**

其核心参考为用户演示视频中的结尾段落。

## 4.1 视觉构图

- 大面积黑色背景
- 两只从左右伸向中间的人手
- 手掌和手指轮廓清晰
- 手全部由密集代码字符构成
- 字符颜色主要为暗紫色
- 鼠标扰动时，局部字符明亮、离散并逐渐回弹
- 巨大的 FLORA YEUNG 姓名位于前景
- 上方分布邮箱、GitHub、LinkedIn 等联系方式

## 4.2 ASCII Hands

不允许使用简单圆形粒子随机组合来冒充手掌。

推荐机制：

1. 准备清晰的双手轮廓遮罩或目标形状数据
2. 在轮廓内部排列高密度字符
3. 为每个字符分配初始位置、目标位置及亮度
4. 默认保持完整手形
5. 鼠标接近时，对局部字符施加位移与速度
6. 鼠标离开后，通过阻尼或弹簧模型回到目标位置

字符示例：

`0 1 / \ { } [ ] < > + - * =`

具体字符密度、尺寸、轮廓清晰度和扰动强度，需要以用户录屏作为视觉验收参考。

## 4.3 邮箱 Hover

邮箱不应仅仅改变字体颜色。

需要制作单独的 Hover 动画，参考 Luke 网站的联系方式交互。

验收时分别对照：

- 鼠标进入前
- Hover 过程中
- 完整 Hover 状态
- 鼠标离开后的回退状态
- 点击后的实际动作

邮箱点击触发真实邮件链接，不做无效的装饰交互。

## 4.4 结尾与滚动行为

此区域只出现在 SYSTEM 最后。

不在 Opening、About 或其他章节重复 ASCII 双手。

用户滚动到底部后可以停留观察，也可以移动鼠标与字符手掌互动。

---

# 5. LIFE — Y2K Pixel Bedroom

## 5.1 核心视觉

LIFE 是一间完整可探索的精细像素卧室。

美术方向：

**Y2K Maximalist Bedroom + Retro Futurism + McBling + Soft Sci-Fi**

使用用户提供的原始 Y2K 卧室照片作为构图与氛围的主要基准。

### 已确认要求

- 从房间角落斜向观察的侧面透视
- 有明显空间纵深
- 精细 2D 像素场景
- 粉紫、霓虹蓝、彩虹色
- 透明家具
- CRT 复古电脑
- 彩色织物与丰富装饰
- 复古未来主义的电子设备
- 床靠近窗户
- 电脑和 DJ 设备位于床边右侧区域
- 地面为豆豆的活动空间

不使用之前的正面平铺 RPG 房间构图。

## 5.2 窗户与环境

窗外采用 Frutiger Aero 风格的像素天空。

支持三种视觉状态：

- Day
- Sunset
- Neon Night

天空、室内霓虹灯与环境颜色互相影响。

切换时使用平滑过渡，不能瞬间全屏闪白。

## 5.3 镜头系统

采用连续长镜头。

首次进入 LIFE 时：

- 显示完整房间
- 角色开始介绍
- 镜头通过 Zoom In / Zoom Out 强调道具
- 不使用硬切镜头
- 不频繁旋转或摇晃整个房间

目前以**固定镜头中心、缩放为主**作为开发基线。

对于离中心较远的物件，允许通过高亮、局部动画或文字提示辅助引导，避免为了突出物件而过度移动摄像机。

---

# 6. LIFE — 角色与对话

## 6.1 角色外观

角色以用户本人为原型，采用精细 Q 版像素风格。

参考 Undertale 的人物比例，但具有更丰富的衣服与动作细节。

服装参考用户提供的 McBling / Scene / 2000s 拼贴图。

偏好的元素包括：

- 条纹
- 波点
- 印花上衣
- Baby Tee
- 牛仔迷你裙
- 毛绒靴
- 金属配饰
- 复古帽子
- Y2K 配色

## 6.2 服装随机化

每次进入 LIFE 时从预设完整套装中随机选一套。

随机结果应在当前访问会话内保持稳定，不能因为重新渲染而突然换衣服。

初始套装数量及手动换装机制尚未最终确认。

## 6.3 基础动作

至少包括：

- 躺在床上听音乐
- 坐起
- 说话
- 眨眼
- 待机
- 对用户点击作出反应

各套服装需要对应这些基础动作。

## 6.4 对话系统

对话框参考 Undertale：

- 黑色背景
- 像素边框
- 逐字出现
- 角色名
- 特定的说话音效

说话音效参考 Celeste 的短促电子语音反馈，最终使用可合法使用或自行制作的音效资源。

### 首次进入

角色自动介绍主要道具。

目标长度约 45–60 秒，允许根据正式文案调整。

语气偏轻微电波感，不是传统网站客服，也不是过度卖萌的游戏 NPC。

对话期间同步触发物件提示和镜头缩放。

### 自由探索

介绍结束后，点击角色仍可触发短对话。

对白可以与以下内容相关：

- 随机心情
- 当前音乐
- 刚刚打开的物品
- 房间环境状态

部分对话允许访问者从 2–3 个回应中选择。

---

# 7. LIFE — 交互物件

| ID | 物件 | 点击后的界面与行为 |
|---|---|---|
| L01 | Computer | 像素电脑窗口，展示 GitHub 信息与精选仓库 |
| L02 | DJ Console | 展开指定 Webamp 皮肤播放器 |
| L03 | Diary | 文章目录，打开后是手账式图文页面 |
| L04 | Globe | 点击城市热点，打开真实摄影相册 |
| L05 | Polaroids | 打开可拖动的生活照 Scrapbook 板 |
| L06 | Project Archive | 显示与 SYSTEM 共用的项目档案 |
| L07 | Doudou | 抚摸、行动反馈、投喂、追球等 |
| L08 | Dog Bowl | 弹出零食菜单并触发投喂流程 |
| L09 | Pixel Character | 继续触发短对白 |
| L10 | Window | 展示或切换天空状态 |

## 7.1 全局物件 Hover

已确认行为：

- 鼠标靠近时出现像素轮廓提示
- 物件具有各自的反馈音效
- 不要求所有物件持续闪烁发光
- 鼠标离开后恢复正常状态

物件必须有足够清晰的实际点击区域，不允许需要精确点击到某个单独像素。

## 7.2 Computer

点击房间里的 CRT 电脑。

打开像素风电脑界面，主要展示：

- GitHub Profile
- 精选仓库
- 技术项目
- 跳转 GitHub 的外部链接

不将整个 GitHub 网站强制嵌入 iframe。

## 7.3 Diary

日记本放在桌上。

点击后先显示文章目录，再选择具体文章。

文章以手账方式排版，支持：

- 真实照片
- 标题
- 文字
- 胶带
- 贴纸
- 手写感装饰
- 涂鸦
- 阅读原文链接

主要内容来源为用户自己的公众号、小红书文章及其他写作。

**所有外链都需要可在后台维护。**

## 7.4 Globe

地球仪为普通复古地球仪的像素版本。

用户可以与地球仪交互，在上面选择城市热点。

点击城市后打开摄影作品集。

初始城市可包含：

- Hong Kong
- Shanghai
- Tokyo

摄影原图必须保留真实照片效果，不应用像素滤镜。

## 7.5 Polaroids

桌面上有一叠拍立得。

点击后出现可拖动的大型 Scrapbook 板。

支持：

- 自由拖动画面
- 多张照片拼贴
- 不同旋转角度
- 点击放大照片
- 查看照片描述
- 返回房间

所有真实生活照保持原始摄影质感。

## 7.6 DJ Console

桌面设备是一台 DJ 机，而不是唱片机。

点击后展开完整播放器。

指定 Webamp Carrie-Anne Moss 皮肤为视觉目标。

第一版功能：

- 播放 / 暂停
- 上一首 / 下一首
- 音量调节
- 播放列表
- 原生均衡器
- 当前曲目与播放进度

用户提供自己的 MP3 或其他兼容音频文件。

### Esc 规则

按 Esc 关闭放大界面：

- 音乐继续播放
- 当前歌曲不变
- 播放时间不重置
- 音量不重置
- 均衡器设置保留

播放器应由持久化的全局音频控制层管理，不能随弹窗关闭而销毁音频实例。

### 音频启动

LIFE 优先播放低音量环境音。

正式音乐由 DJ 播放器启动。

浏览器可能限制未经过用户交互的有声音频自动播放，必须处理这种情况并提供明确的启动方式。

## 7.7 Doudou

豆豆采用用户真实小狗形象制作像素 Sprite。

可在房间几个预设活动区域之间随机走动。

互动包括：

- 点击抚摸
- 摇尾巴
- 走近角色
- 睡觉
- 追球
- 吃零食

豆豆的声音优先使用真实小狗音效。

### 投喂流程

点击狗盆：

1. 出现零食选择
2. 选择零食
3. 豆豆移动至食盆
4. 播放吃东西的动画
5. 触发开心反馈
6. 返回自由活动

零食为模拟互动，菜单选择应采用犬类适宜食物，而不是现实中可能对狗有害的食品。

---

# 8. 音效系统

网站中的声音是独立的产品系统，不应分散写在每个组件内部。

建议建立统一 Audio Manager。

音效类型：

| 类型 | 应用 |
|---|---|
| Navigation | 模式切换、确认 |
| Cursor / Tool | 扳手位移、回弹 |
| Hover | 不同道具接近反馈 |
| Dialog | 角色打字语音 |
| Object | 日记本、地球仪、照片等 |
| Pet | 豆豆的反应 |
| Ambient | LIFE 房间环境 |
| Music | DJ 播放器 |

必须提供明显的静音 / 音量控制，并避免鼠标快速移动导致音效连续重叠。

---

# 9. 数据管理架构

## 9.1 Firebase Firestore

Firestore 存储结构化内容和媒体元数据。

推荐 Collection：

```text
siteConfig
profiles
education
experiences
projects
competitions
visualWorks
mediaWorks
writings
photography
places
volunteering
lifeMoments
roomDialogues
outfitPresets
musicTracks
```

### 通用文档字段

```ts
{
  id: string;
  slug?: string;
  status: "draft" | "published" | "archived";
  sortOrder: number;
  featured?: boolean;
  i18n: {
    zh?: Record<string, unknown>;
    en?: Record<string, unknown>;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

其中不同 Collection 使用明确的 TypeScript 数据模型，不建议在正式代码中大量保留无约束的 `Record<string, unknown>`。

SYSTEM 和 LIFE 必须共用项目及个人信息数据。

## 9.2 Cloudinary

主要保存：

- 摄影作品
- 生活照
- 项目封面
- 文章配图
- 其他较大的公开图片

Firestore 存储 Cloudinary 的 `publicId`、宽高、描述等元数据。

使用响应式图片尺寸和加载优化。

## 9.3 音乐存储

音乐文件与普通照片分开管理。

Cloudinary 可以作为候选方案，但需要根据实际账户的音频交付方式、流量限额与文件使用权限确认；也可以使用专门的对象存储。

Firestore 仅保存曲目名称、艺人、顺序、封面和媒体地址等信息。

**Vercel 静态站点不承担 MP3 文件的持久化存储。**

## 9.4 Admin 后台

采用 Firebase Authentication 保护后台。

后台支持：

- 修改个人信息
- 新增或编辑项目
- 上传媒体
- 维护摄影相册
- 修改文章与原文链接
- 管理歌曲列表
- 修改开场对话
- 管理内容排序与发布状态

公开访客不得拥有写入权限。

Cloudinary 的签名密钥及其他服务端密钥不能放入 Vite 前端环境变量。

---

# 10. 项目文件与素材存放规范

必须区分：

1. 本地原始素材
2. GitHub 中的应用资源
3. Cloudinary 托管媒体
4. Firestore 内容数据

## 10.1 本地原始素材

这部分可以放在用户电脑里，不要直接全部上传至公开仓库。

```text
self-portrait-assets/
│
├── references/
│   ├── opening/
│   ├── system/
│   ├── life-room/
│   ├── interactions/
│   └── outfits/
│
├── character/
│   ├── face-references/
│   ├── outfits/
│   ├── sprites/
│   └── dialogue/
│
├── room/
│   ├── background/
│   ├── furniture/
│   ├── objects/
│   └── sky/
│
├── doudou/
│   ├── photos/
│   ├── sprites/
│   └── sounds/
│
├── photography/
│   ├── tokyo/
│   ├── hongkong/
│   └── shanghai/
│
├── polaroids/
│
├── writings/
│   ├── wechat/
│   └── xiaohongshu/
│
├── music/
│   ├── tracks/
│   ├── covers/
│   └── playlists/
│
├── sound-effects/
│
└── projects/
    ├── covers/
    ├── screenshots/
    └── documents/
```

## 10.2 前端仓库

建议在现有项目上渐进式调整，而不是重建。

```text
src/
├── app/
│   ├── router/
│   └── providers/
│
├── components/
│   ├── opening/
│   ├── system/
│   ├── life/
│   ├── effects/
│   ├── audio/
│   └── shared/
│
├── features/
│   ├── portfolio/
│   ├── photography/
│   ├── diary/
│   ├── music/
│   ├── character/
│   └── pet/
│
├── services/
│   ├── firebase/
│   ├── cloudinary/
│   └── github/
│
├── hooks/
├── types/
├── styles/
└── content/

public/
└── assets/
    ├── sprites/
    ├── room/
    ├── ui/
    ├── fonts/
    └── sfx/
```

本地 `public/assets/fonts/` 只能存放已取得合法 Web 使用权限的字体文件。

**注意：** 这是目标目录，不要求 Codex 第一步就把所有现有文件搬迁。优先保持当前网站可运行，再逐步抽离。

## 10.3 素材提交顺序

建议第一批先准备：

1. Opening / SYSTEM 的网站参考视频与截图
2. LIFE 房间主参考照片
3. 本人角色外貌参考图及穿搭参考
4. 豆豆的正面、侧面、活动照片
5. SYSTEM 自我介绍用的真实照片
6. 第一批项目封面及文字
7. 第一批音乐和摄影作品

没有准备好的资源使用明确的占位素材，不能将占位内容误标为正式作品。

---

# 11. Vercel 部署

前端使用 React + Vite，当前正式网站为 https://florayeung.vercel.app/，通过 Vercel 部署。Production 分支在 Vercel 控制台核实；Phase 1 使用非 Production 分支产生 Preview，验收前不合并至 Production 分支。

建议配置：

```text
Framework Preset: Vite
Install Command: npm ci
Build Command: npm run build
Output Directory: dist
SPA Rewrite: /* -> /index.html
```

需先为项目生成并提交锁文件，确保 `npm ci` 可以运行。

如果未来需要安全的图片上传签名接口，可以使用受保护的 Vercel Function 或其他服务端函数，具体方案在 Phase 6 确认。

Firebase 凭据与 Cloudinary 配置通过环境变量管理，密钥不得提交至 GitHub。

---

# 12. 性能、响应式与可访问性

## 12.1 开发优先级

第一阶段以桌面网页为主。

LIFE 复杂房间暂不要求完成独立手机版，但不得完全忽略小屏幕和键盘操作。

## 12.2 性能策略

- Opening 不等待 LIFE 所有资源下载完毕
- LIFE 场景按需要延迟加载
- 分离大型背景资源与精灵动画
- 真实照片使用优化后的展示尺寸
- 仅运行当前页面需要的 Canvas 动画
- 页面不可见时暂停非必要渲染
- 动画帧率不足时降低粒子密度
- 遵守用户系统的 reduced-motion 设置

## 12.3 交互规则

- Esc 优先关闭当前最上层弹窗
- 关闭 LIFE 物件界面后返回同一房间状态
- 不因为普通弹窗关闭而停止背景音乐
- 角色开场介绍应提供跳过能力，具体形式待确认
- 按钮、外链、动态内容需具有可访问名称
- 所有可交互对象需要基本的键盘替代操作

---

# 13. 开发阶段与验收

## Phase 0 — Baseline Audit

- 检查原项目数据、组件和图片引用
- 确认当前构建可运行
- 保存现有版本
- 建立技术改造清单
- 不删除旧作品和履历内容

**验收：** 原有 SYSTEM / LIFE 均能运行，内容不丢失。

## Phase 1 — Opening

- 巨型姓名
- 黑紫主题
- 左右模式预览
- 像素扳手
- 动态背景
- 基础音效
- 路由切换

**验收：** 鼠标选择与视觉、声音和路由状态同步。

## Phase 2 — SYSTEM

- Hero 名字动画
- 打字机
- About
- 人物照片轮换
- 数字滚动
- 教育与实习时间线
- 项目展示
- 作品和媒体内容
- 粒子互动模式

**验收：** 关键滚动段落与参考视频进行视觉对照，同时保证所有真实内容可读。

## Phase 3 — Final Contact

- 双手轮廓建模
- 代码字符填充
- 鼠标扰动
- 字符回弹
- 巨型姓名
- 邮箱 Hover
- GitHub / LinkedIn

**验收：** 静态状态下清晰识别双手；扰动结束后恢复轮廓；全部链接有效。

## Phase 4 — LIFE Scene

- 房间像素场景
- 角色精灵
- 长镜头缩放
- 对话框
- 房间环境状态
- 物件交互区域

**验收：** 场景符合用户提供的侧向角落透视和 Y2K 科幻参考，所有热点位置准确。

## Phase 5 — LIFE Interactions

- DJ / Webamp
- 日记本
- 地球仪摄影
- 拍立得拼贴
- GitHub 电脑
- 项目档案本
- 豆豆互动
- 服装随机
- 音效系统

**验收：** 所有道具均有真实可用功能；Esc 后音乐状态保留。

## Phase 6 — Data / CMS / Deployment

- Firestore 数据模型
- 旧数据迁移
- Cloudinary 媒体管理
- 管理后台
- Firebase Auth
- 安全规则
- Vercel Production / Preview 部署
- 测试与优化

**验收：** 网站正式内容由统一数据源管理，管理员无需修改代码即可维护常用内容。

---

# 14. Codex 工作约束

Codex 在实施本 PRD 时必须遵守：

1. **不要推倒重写仓库。** 先审查当前代码并规划渐进迁移。
2. **不要未经允许直接替换或删除现有内容。**
3. **不要将未完成的项目伪装成已上线项目。**
4. **不要将用户的真实照片像素化。** 像素化仅用于 LIFE 场景、角色、家具及 UI。
5. **不要用随机粒子云代替 ASCII 双手。**
6. **不要在 SYSTEM 中间章节提前展示 Final Contact 双手。**
7. **不要用模拟按钮代替真实播放器功能。**
8. **不要在前端代码中暴露私密 API Key 或签名密钥。**
9. **不要一次性同时开发所有模块。**
10. **每个 Phase 完成后提供可运行版本与验收说明。**

每个开发任务应包含：

- 涉及的文件
- 新增或修改的组件
- 交互行为
- 数据依赖
- 验收条件
- 尚未解决的问题

---

# 15. 当前尚未确认的产品决策

以下内容不得由开发者自行视作最终决定：

| 问题 | 当前状态 |
|---|---|
| 初始服装池数量 | 待确认 |
| 用户是否能手动换装 | 待确认 |
| 服装配件是否自由组合 | 待确认 |
| 正式角色 Sprite 外貌 | 等待人物参考素材 |
| SYSTEM 三句最终打字文案 | 待确认 |
| About 正式文案 | 待确认 |
| ASCII 双手精确轮廓和鼠标物理参数 | 需要进一步参考视频验证 |
| 邮箱 Hover 精确逐帧行为 | 需要单独确认 |
| LIFE 开场正式对白 | 待撰写并确认 |
| 第一批摄影及音乐数据 | 等待用户提供 |
| 自定义字体的具体文件与使用许可 | 待确认 |
| 音频正式托管方式 | 待确认 |

---

# 16. 最终产品验收原则

Self-Portrait 应使访客获得两种明显不同、但人格一致的体验。

**SYSTEM：** 像阅读一本高度设计化的个人技术档案。页面专业、克制，却拥有精细而富有实验性的交互。

**LIFE：** 像进入一款关于用户自己的小型像素游戏。每件物品都有意义，每次点击都能看到不同的个人生活与创作内容。

二者最终都应该让访问者认识同一个人，而不仅仅是欣赏网页特效。

**End of PRD v0.9**
