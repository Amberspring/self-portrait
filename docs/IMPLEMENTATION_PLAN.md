# Self-Portrait 实施计划与 Phase 0 技术审查

基线：2026-10-10，仓库 `Amberspring/self-portrait`，检出提交 `1e89a07`。产品需求原文见 [PRD.md](PRD.md)。本文件记录当前代码事实、渐进改造顺序和每阶段验收；视觉参考不等于当前已实现功能。Phase 1 须在用户确认本计划后开始。

## 1. 当前仓库与内容基线

项目入口是 `index.html → src/main.tsx → src/App.tsx`，使用 React 19、TypeScript、Vite 8、Tailwind 4、Motion 和 Lucide。页面路由由 `App.tsx` 的 `useState` 切换；`OpeningScreen`、`SystemView`、`LifeView`、项目 Case Study 与写作详情各自是组件，没有 URL 路由、Firestore、Firebase Auth、Cloudinary 或 Admin。中英文资料存在 `src/content/portfolioData.ts` 和 `originalProductsData.ts`，经 `selectors.ts` 合并供两个模式共享；`src/types/portfolio.ts` 是现有数据合同。保留全部已录入的个人资料、教育、实习、项目、竞赛、视觉作品、新媒体、写作、摄影、地点、志愿及生活片段，迁移时按 `id/slug/lang` 逐项核对。

| 部位 | 已有功能与可复用代码 | 必须修改 | 新增 |
|---|---|---|---|
| Opening | 双模式入口、键盘可聚焦按钮、Hover 预览、Motion 过渡、中英切换、reduced-motion Hook | 首屏目前先打字显示提问，姓名不是主视觉；Hover 基于按钮而非整屏左右方位；白/橙配色与新黑紫方向冲突 | FLORA YEUNG 巨型排版、连续左右预览、像素扳手与受控音效 |
| SYSTEM | 教育、经历、项目、竞赛、作品、媒体、写作、Contact；Case Study；现有滚动导航 | 当前浅色简历式长页要渐进改成黑紫、Luke 式编辑排版；项目卡片、Hero、时间线和联系区需重做呈现，内容继续复用 | 照片轮播、核实数字动画、三句打字机、独立粒子交互模式、最终 ASCII 双手 |
| LIFE | 个人故事、城市、摄影、写作、媒体、项目、志愿与照片弹窗；`LifeDisturbanceField` Canvas | 当前是深色章节式个人档案，不是卧室；保留内容入口并转接房间物件 | 精细像素卧室、连续镜头、角色/对白、十类热点、DJ、豆豆、服装与天气状态 |
| 详情与数据 | 项目 Case Study 和写作详情、双语选择器、`ResilientImage`、Mosby Archive | 页面刷新丢失详情；现有本地图片写成 `/src/assets/images/...` 字符串，需在构建阶段验证并改为可打包的 import 或 `public/` 路径；外链和项目状态需核实 | URL 路由、远程内容读取、草稿/发布过滤、CMS |

### 需要先处理的风险

1. `App.tsx` 只存内存路由，直接访问 `/system/projects/:slug` 或刷新无法恢复页面。引入浏览器路由时要同时处理返回、语言和弹窗状态；Vercel 需要 `/* → /index.html` rewrite。
2. `portfolioData.ts` 和 `originalProductsData.ts` 都包含完整中英文内容，不能将现有数组直接覆盖为 CMS 空集合。先导出、盘点、核对与迁移，再切读 Firestore；迁移前后比较各类别数量与 slug，保留代码快照和回退路径。
3. 五张现有 JPG 在 `src/assets/images`，但数据文件以 `/src/assets/images/... `文本地址引用；Vite 生产构建可能保留该绝对路径而不复制资源。使用生产预览实际请求图片验证，Phase 1 前修正引用方式。现有真实照片是否为本人作品、项目封面是否仅示意，需要用户逐张确认。
4. 部分演示 URL、GitHub URL、个人指标、学校和职责虽已写入仓库，尚未同用户简历及原始项目核对。CMS 发布字段应区分草稿与正式内容，不能以现有文案自动推断项目已上线。
5. `MosbyArchiveShowcase` 的编辑状态保存在浏览器 `localStorage`，不是管理后台，也不应被误认为公开内容源。迁移时明确它是访客个人临时编辑还是旧版演示功能。
6. `tsconfig.json` 没有启用 `strict`；`npm run lint` 实际是 `tsc --noEmit`，并非 ESLint。依赖中有 Gemini、Express、dotenv、tsx 等历史项，当前前端代码未见对应调用；依赖清理要在确认用途后单独进行。

### Phase 0 验证记录

- 原始仓库没有 `package-lock.json`。Phase 0 时默认 `npm install` 因直接声明的 `esbuild@^0.25.0` 与 Vite 8 当前要求的 `esbuild@^0.27.0 || ^0.28.0` 冲突而报 `ERESOLVE`。随后 GitHub `main` 的 `703b35e` 已移除直接 `esbuild` 依赖；Phase 1 在此基础上重新生成锁文件，并用标准 `npm ci` 验证。
- 本机默认 npm registry 是 `registry.npmmirror.com`，首次安装触发 npm 的 `EALLOWREMOTE`；指定官方 registry 后完成安装。它属于本机源配置问题，不是项目运行时问题。
- 基于本次锁文件，`npm ci --registry=https://registry.npmjs.org`、`npm run lint` 和 `npm run build` 均通过；Vite 产出约 576 kB 的主 JS 包并给出 500 kB 警告。构建另提示 `vite.config.ts` 中 `__dirname` 与未来 native config loader 不兼容。
- Phase 0 的 `dist` 只包含 `index.html`、CSS 和 JS，没有五张原仓库 JPG。因数据使用 `/src/assets/images/...` 字符串 URL，发布到 Vercel 后这些图片会请求不存在的路径；Phase 1 需修复并以生产预览确认。

## 2. 目标技术架构

### 新增参考视频核对（用户提供的《网站演示.mp4》）

视频长约 81.6 秒，分辨率 1896×828，内容为 Luke Baffait 网站操作录屏。约 0–15 秒可见黑底、分置两侧的巨大无衬线/斜体衬线姓名与顶部小字号文字导航；鼠标附近的红色细点会局部扰动。约 16–19 秒切到白底 Contact，约 20–48 秒展示红黑渐变、人物照片和 Info 页面，约 52–72 秒展示项目大字列表、悬浮预览、红色曲线、图片画廊及 Skills，最后出现 Awards 与返回姓名画面。这段视频为 SYSTEM 的排版、节奏、Hover 与滚动编排提供了可见依据，未展示 LIFE 卧室、像素扳手或指定 Webamp 播放器。

录屏里的双手形状出现在开头，且从画面观察更像细点阵；Contact 也有白底画面。本站以用户明确的 PRD 为准：Opening 不出现双手，SYSTEM 最后一屏才出现由代码字符构成、黑底暗紫且能鼠标扰动的双手。仅凭这段录屏还不足以逐帧确认邮箱 Hover 的完整进出状态或 ASCII 字符形状；Phase 3 应单独获取这两段近景参考或由用户验收原型。

```text
Vercel Vite deployment (dist, SPA rewrite)
  ├─ React Router: /, /system, /system/projects/:slug, /life, /life/projects/:slug, /admin
  ├─ Opening / SYSTEM / LIFE 展示层
  ├─ 共享 typed 内容读取层 → Firestore (published 公开只读)
  ├─ Firebase Auth → Admin (授权管理员写入)
  ├─ Cloudinary HTTPS 图片交付 → Firestore 存 publicId、尺寸、说明
  └─ 持久 Audio Manager → ambient / SFX / DJ，播放器弹窗只控制视图
可选受保护签名端点 → Cloudinary 上传签名（仅当后台上传上线）
```

保留当前的 `selectors.ts` 作为共享内容入口，先给它添加可核对的远端读取适配，再让 SYSTEM 和 LIFE 读取同一 `projects/profile` 文档。按类别建立明确的 TypeScript 类型，并把 `status`、`sortOrder`、`featured`、中英字段、时间戳、媒体元数据作为合同；写入使用服务端时间戳，公开查询只读 `published`。Firestore 规则必须拒绝访客写入，并把管理权限绑定到明确的 Auth UID 或自定义声明；隐藏前端按钮不构成授权。Firebase Web 配置可以在 `VITE_` 环境变量，Cloudinary API secret、上传签名私钥和服务账号密钥只能留在受保护服务端，不能进入 Vite bundle。

Cloudinary 用于公开摄影、生活照、封面和文章配图，原图留在仓库外；小型场景 Sprite、UI、许可字体及短音效可放在仓库 `public/assets`。MP3 单独确认许可、流量与交付方式后选择 Cloudinary 或对象存储，Vercel 静态站点不存持续性音频。Admin 的上传功能需要签名端点；在端点和权限规则完成前，可先由管理员手工上传媒体再录入元数据。应对手机屏幕提供可用提示、键盘焦点与物件替代列表，同时对低性能和 reduced-motion 保留完整内容访问。

### 渐进目录方案

```text
src/
  App.tsx                     # 迁移完成前保留现有总入口
  app/router/                 # URL 路由及页面级懒加载
  components/entry|system|life|projects|shared/  # 保留，按 Phase 逐步拆分
  components/effects|audio/   # ASCII、粒子、扳手、声音控制
  features/portfolio|photography|diary|music|character|pet/
  services/firebase|cloudinary|github/
  content/                    # 旧数据快照与迁移脚本输入，确认后再缩减
  types/ styles/ hooks/
public/assets/sprites|room|ui|fonts|sfx/
docs/PRD.md docs/IMPLEMENTATION_PLAN.md
```

这是目标位置，不在 Phase 0 创建空目录或搬运现有文件。新文件在首次需要时建立；共享内容服务先接现有 selectors，避免在两个模式分别写一套数据逻辑。

## 3. 分阶段任务

每一阶段均以能运行的版本结束，复核中英内容、两入口、详情、键盘操作和真实资料。下表的文件是预计触达范围；新增模块在实现前仍需以当时仓库为准。每个 Phase 输出可访问的预览或本地构建结果、截图/短录屏、已知差异及用户待确认项。

| 阶段 | 具体任务与文件/组件 | 交互与数据依赖 | 验收与尚未解决问题 |
|---|---|---|---|
| 0 审查 | 保存 PRD 与本计划；盘点 `src/content/*`、`src/components/*`、`package.json`、图片；跑类型/构建；记录提交基线 | 不改现有体验，保留所有资料 | 文档可追溯、构建结果和阻塞原因明确；用户确认后进入 Phase 1 |
| 1 Opening 与路由 | 修改 `App.tsx`、`OpeningScreen.tsx`、`index.css`；新增 `app/router`、扳手 Sprite/Canvas、过渡与入口音效；修复现有图片引用 | 姓名立即显示；左右移动有中性/SYSTEM/LIFE 状态；键盘入口；URL 直达和返回；依赖第一批参考、扳手素材、音效、授权字体 | 快速横移不闪烁，位移/旋转/声音同步；`/system`、`/life` 直达刷新正常。扳手具体画法、入口音色由素材确认 |
| 2 SYSTEM | 渐进拆分 `SystemView.tsx`；复用 `selectors.ts`、`ProjectCaseStudyView.tsx`；新增 Hero、About 照片轮播/数字、Education、Experience Timeline、Projects/Works/Skills、粒子图层 | 黑紫滚动叙事，实际进度驱动动效；真实照片无像素滤镜；中英文案分别维护；项目详情共用 slug | 与 Luke 参考和用户录屏逐段对照，文字在动画中始终可读，reduced-motion 可用；正式三句文案、About、真实数字、项目媒体待确认 |
| 3 Final Contact | 新增 `components/system/AsciiHands` 与专用遮罩/字形数据，改 `SystemView` 最后一屏；邮箱 Hover 和真实链接 | 双手由代码字符填充，鼠标扰动后回弹；只在 SYSTEM 末屏加载 Canvas | 静态轮廓清楚、离开后恢复、邮箱五态和链接有效；手形轮廓及逐帧参考视频待提供 |
| 4 LIFE 场景 | 保留 `LifeView.tsx` 内容入口，建立卧室场景、热点映射、固定中心缩放镜头、日落/夜晚状态、角色 Sprite、对话框；按需引入 `features/character` | 侧向角落透视、从完整房间连续缩放；45–60 秒介绍可跳过；点击面积与键盘替代明确；依赖房间/角色/天空素材 | 房间与照片参考一致，热点和画面对齐，切换不闪白；角色外貌、对白、镜头分镜待确认 |
| 5 LIFE 物件 | 新增 Computer、Diary、Globe、Polaroids、Project Archive、DJ/Webamp、Doudou/Dog Bowl、服装预设、统一 Audio Manager；复用现有照片/文章/项目数据与详情 | Esc 只关最上层界面；房间状态与音乐实例保留；宠物活动/喂食流程、会话内服装稳定；浏览器音频启动受用户手势约束 | 十类热点均有真实功能，DJ 关闭后曲目/进度/音量/EQ 不变，素材授权确认；Webamp 指定皮肤可用性、服装池、音频托管待确认 |
| 6 数据/CMS/部署 | `services/firebase`、`services/cloudinary`、`types`、`/admin`；数据迁移脚本、Auth 与 Firestore 规则；Vercel 配置和生产测试 | 先导出及校验旧内容，再导入；草稿不公开；图片响应式交付；管理员能维护常用内容 | 两模式读同一正式项目资料，公开访客写入被规则拒绝，管理员可编辑，刷新/直达正常；需用户提供 Firebase、Cloudinary、Vercel 的项目及权限 |

Phase 2 和 4 可在素材未齐时先完成结构与交互原型，但必须在预览里醒目标注“待替换素材”；视觉验收要等正式资产到位，不能把占位版本签收为最终效果。Phase 6 的数据模型设计可在较早阶段先行，真正切换读写与上线按迁移校验完成后执行。

## 4. 素材交付清单与存放位置

请在仓库外建立 `self-portrait-assets/` 原始素材库，保留高清母版、来源和使用许可；公开仓库只放可分发的优化版与许可明确的小资源。每份素材建议附 `manifest.csv`：文件名、用途、拍摄/制作人、授权范围、是否可公开、对应项目或城市、替代文字。原图和证件/简历原件先不要公开上传。以下路径相对该原始素材库。

| 优先级 | 需要提供的素材 | 原始素材位置 | 进入产品后的归属 |
|---|---|---|---|
| 第一批 | Luke Opening/SYSTEM/Contact、用户演示视频及关键帧；粒子/拼贴/交互参考，尤其邮箱 Hover 五态和 ASCII 双手轮廓 | `references/opening/`、`references/system/`、`references/interactions/` | 设计依据，不放正式网站 |
| 第一批 | Y2K 卧室主参考照片、房间透视与家具位置草图、天空 Day/Sunset/Neon Night 参考 | `references/life-room/`、`room/background/`、`room/sky/` | 最终背景/分层 Sprite 优化后进 `public/assets/room/` |
| 第一批 | 本人正侧面外貌参考、McBling/Scene 穿搭拼贴；躺/坐/说话/眨眼/待机/点击动作与各完整套装 | `character/face-references/`、`character/outfits/`、`character/sprites/` | 可发布 Sprite 进 `public/assets/sprites/character/` |
| 第一批 | 豆豆正面、侧面、站走睡跑照片与真实叫声；尾巴、追球、吃零食动画参考 | `doudou/photos/`、`doudou/sprites/`、`doudou/sounds/` | Sprite 进 `public/assets/sprites/doudou/`，短声效进 `public/assets/sfx/pet/` |
| 第一批 | SYSTEM About 真人照片、本人履历核实资料、每项目封面/截图/方法和结果证据 | `projects/covers/`、`projects/screenshots/`、`projects/documents/`；About 原图另设 `profile/photos/` | 公开照片与大图经 Cloudinary；Firestore 记录元数据 |
| 后续 | 东京/香港/上海摄影原图、拍立得生活照、标题日期地点与说明 | `photography/tokyo|hongkong|shanghai/`、`polaroids/` | Cloudinary + Firestore；照片保留真实质感 |
| 后续 | 公众号/小红书文章原文、配图、原文 URL 与发布权限 | `writings/wechat/`、`writings/xiaohongshu/` | 图片 Cloudinary；正文/外链 Firestore |
| 后续 | 自有或已获网页播放授权的曲目、封面、播放顺序；指定 Webamp 皮肤文件/许可核实 | `music/tracks/`、`music/covers/`、`music/playlists/`、`references/interactions/` | 音频独立托管，封面 Cloudinary，元数据 Firestore |
| 后续 | 扳手、家具、CRT、DJ 机、日记本、地球仪、拍立得、食盆、球、零食 UI 等像素素材；环境、确认、物件、对白、宠物短音效 | `room/furniture/`、`room/objects/`、`sound-effects/` | 可发布 Sprite 进 `public/assets/room|ui/`，短声效进 `public/assets/sfx/` |
| 上线前 | 粗黑体、斜体衬线、猴尊宋体的具体字体文件及 Web 嵌入许可 | `fonts/licenses/`、`fonts/source/` | 仅获 Web 使用许可的优化字库进 `public/assets/fonts/` |

素材尚未齐备时，先保留现有真实内容与清楚标明的临时图；绝不据参考图伪造本人照片、项目结果或已上线状态。需要用户优先确认的产品决策包括正式文案与指标、服装池/换装、精灵外貌、手形与邮箱动效、开场对白、第一批城市/歌曲、字体许可、音频托管和各外链有效性。

## 5. 发布前统一检查

每阶段至少运行 `npm run lint`（当前实际为 TypeScript 类型检查）与 `npm run build`，再用 Vercel Preview 核对路由刷新、所有图片请求与关键交互。到 Phase 6 增加 Firestore 规则的拒绝/允许检查、数据迁移数量与 slug 对比、音乐 Esc 状态测试、键盘路径、reduced-motion、低性能与窄屏检查。Vercel 使用 `npm ci` 安装、`npm run build` 构建、发布 `dist`，配置 `/* → /index.html`；Production 分支和 Preview 自动部署需在 Vercel 控制台核实，验收前不合并至 Production 分支。
