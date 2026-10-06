import {
  ProjectData,
  VisualWorkData,
  MediaWorkData,
  WritingEntryData,
  VolunteerEntryData,
  LifeMomentData,
} from '../types/portfolio';

export const IMG_TOKYO = '/src/assets/images/tokyo_night_photography_1791200071853.jpg';
export const IMG_HK = '/src/assets/images/hongkong_harbor_mist_1791200084724.jpg';
export const IMG_SHANGHAI = '/src/assets/images/shanghai_old_lane_1791200099667.jpg';
export const IMG_MEDICATION = '/src/assets/images/project_medication_companion_1791200116259.jpg';
export const IMG_MUSIC = '/src/assets/images/project_music_store_1791200127085.jpg';

export const originalProjectsZh: ProjectData[] = [
  {
    id: 'proj-medication',
    slug: 'medication-companion',
    code: 'PRODUCT_001 / 2026 / AI × VOICE',
    title: 'Medication Companion (智能用药与健康陪伴系统)',
    year: '2026',
    crossDomainLabel: 'AI × VOICE × PERSONAL DATA',
    categories: ['AI', 'Interactive', 'Systems'],
    status: '独立产品仓库 / INDEPENDENT PRODUCT REPO',
    featured: true,
    oneLine:
      '以自然语音对话为核心的个人日常用药与健康日志伴侣，旨在降低老年与慢病群体的记录摩擦。',
    problem:
      '传统用药管理 App 依赖繁琐的表单下拉框和冰冷的闹钟提醒，给多药并用的长辈及忙碌人群带来显著的认知负担。',
    idea:
      '用自然的日常语音签到（“我早饭后吃过降压药了”）替代复杂表单，通过结构化 LLM Schema 提取剂量与时间，并配合温和清晰的视觉确认。',
    role: '产品架构、语音交互流程设计、LLM Schema 约束与前端工程（独立仓库开发）',
    stack: ['Next.js', 'TypeScript', 'Structured LLM Output', 'Web Speech API', 'Tailwind CSS'],
    results: [
      '作为独立解耦的产品仓库 (`medication-companion/`) 完成开发与部署，严格维护数据隐私与导出/删除边界。',
      '实现高可靠性的自然语言到结构化用药记录解析，引入显式的人机确认（Human-in-the-loop）机制。',
    ],
    highlights: [
      '零冗余表单的自然语音对话式日常签到流',
      '针对剂量、时间与体征备注的确定性 JSON Schema 校验',
      '温和、高对比度的无障碍日常用药时间轴视觉设计',
    ],
    cover: IMG_MEDICATION,
    screenshots: [IMG_MEDICATION, IMG_HK],
    liveUrl: 'https://medication-companion.vercel.app',
    githubUrl: 'https://github.com/florayeung-archive/medication-companion',
    technicalStory:
      '围绕对话式语音转写文本构建确定性的 JSON Schema 提取管线，将前端展示层与严格的用药计划状态机及本地优先的隐私控制解耦。',
    personalStory:
      '灵感源自陪伴家中长辈与社区老人时，看到他们面对细小药盒标签与复杂医院 App 的无措。我希望技术像餐桌旁耐心的倾听者，而不是冷冰冰的核对表。',
    caseStudy: {
      overview:
        'Medication Companion 是一个探索语音交互与结构化大语言模型如何让日常健康记录变得温和、准确且富有人情味的独立产品。',
      problem:
        '绝大多数健康管理软件把用户当成数据库录入员——要求多步下拉选择、精确时间戳和僵硬的弹窗确认。',
      idea:
        '允许用户自然说出日常状态，由系统自动解析、核对并归档结构化用药记录。',
      userExperience:
        '大字号高对比度排版、触感柔和的语音波形反馈，以及随时可撤销/修改的交互兜底，让控制权始终留在人的手中。',
      myRole:
        '独立仓库 `medication-companion/` 的端到端构建者：负责产品定义、Prompt 评估、无障碍界面设计与前端架构。',
      architecture:
        '解耦的客户端界面 → 受 Schema 约束的语音语义提取管线 → 带显式导出与删除控制的验证日志存储。',
      technology: ['TypeScript', 'React / Next.js', 'LLM Structured Outputs', 'Web Audio / Speech API'],
      result:
        '完成独立部署的 MVP 产品，验证了 AI 在降低交互摩擦的同时保持严密数据可靠性的可行路径。',
      evaluation:
        '针对模糊时间表达、单句多药物提及以及环境噪音转写进行了系统性的评估测试，杜绝误记与幻觉。',
      reflection:
        '在个人健康工具中，“克制”高于一切。模型绝不应越界编造医疗建议——它的职责是准确倾听并清晰整理。',
    },
  },
  {
    id: 'proj-finger-piano',
    slug: 'finger-touch-piano',
    code: 'PRODUCT_002 / 2026 / CV × AUDIO',
    title: 'Finger Touch Piano (指尖桌面视觉钢琴)',
    year: '2026',
    crossDomainLabel: 'COMPUTER VISION × INTERACTION',
    categories: ['Interactive', 'Vibe Coding'],
    status: '独立产品仓库 / INDEPENDENT PRODUCT REPO',
    featured: true,
    oneLine:
      '利用实时手部关键点追踪与 WebAudio 合成器，将任何平整桌面转化为富有表现力的复音键盘空间。',
    problem:
      '纯屏幕虚拟乐器缺乏空间物理反馈，而常见的摄像头交互 Demo 往往存在明显延迟与误触，难以契合音乐节拍。',
    idea:
      '将 21 点 3D 手部运动学轨迹与向下敲击的速度矢量直接映射至低延迟 WebAudio 多音合成器。',
    role: '计算机视觉管线、敲击速度检测算法与 WebAudio 合成器开发（独立仓库）',
    stack: ['TypeScript', 'MediaPipe Hands', 'WebAudio API', 'HTML5 Canvas', 'Vite'],
    results: [
      '纯浏览器端实时追踪与音频合成，零服务端往返延迟。',
      '支持力度感应（Velocity-sensitive）的按键发音与极简几何波纹视觉反馈。',
    ],
    highlights: [
      '低延迟指尖运动学滤波与下击速度阈值判定算法',
      '自定义带温暖原声衰减包络的复音 WebAudio 合成器',
      '零外设硬件依赖的桌面空间即兴演奏体验',
    ],
    cover: IMG_TOKYO,
    screenshots: [IMG_TOKYO, IMG_MUSIC],
    liveUrl: 'https://finger-touch-piano.vercel.app',
    githubUrl: 'https://github.com/florayeung-archive/finger-touch',
    technicalStory:
      '在 MediaPipe 手部深度与纵向坐标轨迹上设计了自定义导数滤波器，精准区分手指空中平移与真实的桌面敲击瞬间。',
    personalStory:
      '在狭小的宿舍书桌前深夜写完代码时，没有空间放下一台真正的 88 键钢琴。我突然想：如果木头书桌本身就能记住音乐呢？',
    caseStudy: {
      overview:
        'Finger Touch Piano 是在独立仓库 `finger-touch/` 中开发的计算机视觉空间乐器。',
      problem:
        '基于摄像头的音乐交互常因手指水平掠过虚拟音区而产生大量误触发。',
      idea:
        '结合空间音区映射与纵向加速度阈值，让声音只在指尖真正触碰桌面的那一刻绽放。',
      userExperience:
        '极简黑白校准覆层，随着音符敲击化作安静扩散的几何涟漪。',
      myRole:
        '设计运动学滤波算法、调制音频合成包络，并编写 Canvas 视觉反馈层。',
      architecture:
        '纯客户端实时循环：摄像头帧 → 手部 21 点推理 → 速度运动学滤波器 → 复音 WebAudio 节点图。',
      technology: ['MediaPipe Vision', 'WebAudio API', 'Canvas 2D', 'TypeScript'],
      result:
        '可在浏览器原生流畅运行的桌面空间乐器，支持和弦演奏与强弱力度表现。',
      evaluation:
        '在不同环境光照与 30fps/60fps 帧率下测试触发一致性，确保低延迟响应。',
      reflection:
        '当代码隐退为身体直觉——当你不再盯着检测框而是开始倾听音程时，技术才真正有了温度。',
    },
  },
  {
    id: 'proj-music-store',
    slug: 'ai-music-record-store',
    code: 'PRODUCT_003 / 2026 / AI × MUSIC',
    title: 'AI Music Record Store (AI 独立黑胶唱片店)',
    year: '2026',
    crossDomainLabel: 'AI × MUSIC × RECOMMENDATION',
    categories: ['AI', 'Interactive', 'Vibe Coding'],
    status: '独立产品仓库 / INDEPENDENT PRODUCT REPO',
    featured: true,
    oneLine:
      '以氛围、质地与唱片内页叙事（Liner Notes）引导音乐发现的数字淘碟空间，对抗流水线式的算法歌单。',
    problem:
      '主流流媒体算法将音乐发现压缩为无限滚动的背景歌单，剥离了唱片封面、时代语境与走进一家独立唱片店的偶遇感。',
    idea:
      '将语义氛围嵌入（Semantic Mood Embeddings）与触感黑胶封套浏览结合，用 AI 生成解释“为何这张唱片适合此刻心境”的内页札记。',
    role: '推荐引擎架构、Editorial 界面设计与全栈实现（独立仓库）',
    stack: ['Next.js', 'TypeScript', 'Vector Embeddings', 'Framer Motion', 'Tailwind CSS'],
    results: [
      '作为独立 Web 产品 (`music-record-store/`) 部署上线，打造沉浸式数字淘碟（Crate-digging）体验。',
      '打通自然语言氛围检索与物理感黑胶封套翻转交互。',
    ],
    highlights: [
      '支持如“东京晚上十一点雨夜柏油路”等具象氛围检索词的语义声学映射',
      '黑胶封套翻转交互，呈现制作人名单、录音年代与声音脉络',
      '与个人网站解耦的独立产品架构',
    ],
    cover: IMG_MUSIC,
    screenshots: [IMG_MUSIC, IMG_SHANGHAI],
    liveUrl: 'https://ai-music-record-store.vercel.app',
    githubUrl: 'https://github.com/florayeung-archive/music-record-store',
    technicalStory:
      '实现结合声学描述符、年代脉络与语义向量的多模态元数据索引，支持低延迟的氛围检索与多样性重排（Diversity Re-ranking）。',
    personalStory:
      '我生活过的每一座城市，记忆里都有一家小小的独立唱片行。我想写一个懂得尊重唱片封面、内页文字与曲间留白的算法。',
    caseStudy: {
      overview:
        'AI Music Record Store 将音乐推荐重构为一场不慌不忙的空间与编辑部式对话。',
      problem:
        '现代推荐系统过度优化被动跳过率，却牺牲了主动倾听与文化语境。',
      idea:
        '让听众描述一段记忆、天气或质感，返回三张带有完整背景故事与内页导聆的唱片。',
      userExperience:
        '温暖的模拟时代排版、带有物理阻尼感的封套抽取动画与精选声音随笔。',
      myRole:
        '独立仓库 `music-record-store/` 创作者——负责向量检索管线、UI 动效编排与内容策展。',
      architecture:
        '语义查询解析器 → 向量相似度与多样性重排器 → 编辑部风格内页导聆合成器。',
      technology: ['Next.js', 'TypeScript', 'Semantic Embeddings', 'Motion'],
      result:
        '一个自包含的互动产品，展示 AI 如何深化文化欣赏而非仅仅加速消费。',
      evaluation:
        '在 50 组具象氛围提示词上对比了传统流派标签过滤与语义检索的惊喜度（Serendipity）表现。',
      reflection:
        '最好的推荐算法，应该像唱片店柜台后那位老朋友递给你一张黑胶说：“天黑以后听第三首。”',
    },
  },
];

export const originalProjectsEn: ProjectData[] = [
  {
    id: 'proj-medication',
    slug: 'medication-companion',
    code: 'PRODUCT_001 / 2026 / AI × VOICE',
    title: 'Medication Companion',
    year: '2026',
    crossDomainLabel: 'AI × VOICE × PERSONAL DATA',
    categories: ['AI', 'Interactive', 'Systems'],
    status: 'INDEPENDENT PRODUCT REPO',
    featured: true,
    oneLine:
      'A voice-first personal medication and daily health log companion designed for calm, low-friction adherence.',
    problem:
      'Traditional medication trackers rely on dense forms and clinical alarms, creating cognitive friction for elderly users and busy individuals managing multi-schedule regimens.',
    idea:
      'Replace complex form entry with natural conversational voice check-ins, structured local schedule parsing, and calm visual confirmation.',
    role: 'Product Architecture, Voice Interaction Flow, LLM Schema Design & Frontend Engineering',
    stack: ['Next.js', 'TypeScript', 'Structured LLM Output', 'Web Speech API', 'Tailwind CSS'],
    results: [
      'Designed as a standalone decoupled repository (`medication-companion/`) with dedicated schema validation and privacy boundaries.',
      'Achieved reliable natural-language-to-dosage-log extraction with explicit human-in-the-loop confirmation.',
    ],
    highlights: [
      'Zero-clutter conversational check-in flow',
      'Strict schema validation for dosage, time, and symptom notes',
      'Calm visual communication for daily adherence timelines',
    ],
    cover: IMG_MEDICATION,
    screenshots: [IMG_MEDICATION, IMG_HK],
    liveUrl: 'https://medication-companion.vercel.app',
    githubUrl: 'https://github.com/florayeung-archive/medication-companion',
    technicalStory:
      'Built around deterministic JSON schema extraction from conversational voice transcripts, separating UI presentation from strict medical-schedule state transitions and local-first privacy controls.',
    personalStory:
      'Started from watching family members struggle with tiny labels and cold hospital apps. I wanted technology that feels like a patient listener at the kitchen table rather than a clinical checklist.',
    caseStudy: {
      overview:
        'Medication Companion is an independent product exploring how voice interfaces and structured language models can make daily health logging calm, accurate, and humane.',
      problem:
        'Most health tracking software treats human beings like database operators—demanding multi-step dropdowns, exact timestamps, and rigid modal confirmations.',
      idea:
        'Allow a user to simply speak naturally ("I took my morning blood pressure pill after breakfast") and let the system parse, verify, and log the structured record.',
      userExperience:
        'Large, high-contrast typography, tactile voice waveform feedback, and immediate undo/edit affordances so the user always remains in control.',
      myRole:
        'End-to-end creator in the standalone `medication-companion/` repository: product definition, prompt evaluation, interface design, and frontend architecture.',
      architecture:
        'Decoupled client interface communicating with a schema-constrained extraction pipeline, storing verified logs with explicit export and deletion controls.',
      technology: ['TypeScript', 'React / Next.js', 'LLM Structured Outputs', 'Web Audio / Speech API'],
      result:
        'Completed functional MVP deployed independently, demonstrating how AI can reduce interaction friction while preserving strict data reliability.',
      evaluation:
        'Tested against ambiguous time expressions, multi-medication utterances, and noisy acoustic transcripts to prevent false-positive logging.',
      reflection:
        'In personal health tools, restraint is everything. The model should never hallucinate medical advice—its job is to listen accurately and organize clearly.',
    },
  },
  {
    id: 'proj-finger-piano',
    slug: 'finger-touch-piano',
    code: 'PRODUCT_002 / 2026 / CV × AUDIO',
    title: 'Finger Touch Piano',
    year: '2026',
    crossDomainLabel: 'COMPUTER VISION × INTERACTION',
    categories: ['Interactive', 'Vibe Coding'],
    status: 'INDEPENDENT PRODUCT REPO',
    featured: true,
    oneLine:
      'Turning any flat desk surface into an expressive polyphonic keyboard using real-time hand landmark tracking and WebAudio synthesis.',
    problem:
      'Screen-based instruments lack spatial physicality, while webcam interaction demos often feel laggy and disconnected from musical timing.',
    idea:
      'Map 21-point 3D hand kinematics and downward velocity vectors directly to low-latency WebAudio synthesis on any tabletop.',
    role: 'Computer Vision Pipeline, Velocity Detection Algorithm & WebAudio Synthesizer',
    stack: ['TypeScript', 'MediaPipe Hands', 'WebAudio API', 'HTML5 Canvas', 'Vite'],
    results: [
      'Real-time client-side tracking running directly in the browser without server latency.',
      'Responsive velocity-sensitive key articulation and minimalist visual feedback.',
    ],
    highlights: [
      'Low-latency fingertip kinematics and strike velocity calculation',
      'Custom polyphonic WebAudio synth envelope with warm acoustic decay',
      'Zero-hardware spatial playability',
    ],
    cover: IMG_TOKYO,
    screenshots: [IMG_TOKYO, IMG_MUSIC],
    liveUrl: 'https://finger-touch-piano.vercel.app',
    githubUrl: 'https://github.com/florayeung-archive/finger-touch',
    technicalStory:
      'Engineered a custom derivative filter over MediaPipe z-depth and y-coordinate trajectories to distinguish intentional keystrokes from ambient hand hover.',
    personalStory:
      'Late nights in a small dorm room without space for an 88-key keyboard made me wonder: what if the wooden desk itself could remember music?',
    caseStudy: {
      overview:
        'Finger Touch Piano is an interactive computer-vision instrument developed in the standalone `finger-touch/` repository.',
      problem:
        'Webcam-based musical interactions frequently suffer from false triggers when fingers move horizontally across virtual zones.',
      idea:
        'Combine spatial zone mapping with vertical acceleration thresholds so sound only blooms at the exact moment a fingertip taps a surface.',
      userExperience:
        'Minimalist monochrome calibration overlay that fades into quiet geometric ripples as notes are played.',
      myRole:
        'Designed the kinematics filtering algorithm, synthesized the audio envelopes, and crafted the visual feedback canvas.',
      architecture:
        'Pure client-side real-time loop: Webcam Frame → Hand Landmark Inference → Velocity Kinematic Filter → Polyphonic WebAudio Node Graph.',
      technology: ['MediaPipe Vision', 'WebAudio API', 'Canvas 2D', 'TypeScript'],
      result:
        'Playable browser-native spatial instrument supporting chord voicings and expressive dynamics.',
      evaluation:
        'Evaluated across varying ambient lighting conditions and camera frame rates (30fps vs 60fps) to maintain consistent trigger thresholds.',
      reflection:
        'Code becomes magical when it disappears into physical intuition—when you stop looking at bounding boxes and start hearing intervals.',
    },
  },
  {
    id: 'proj-music-store',
    slug: 'ai-music-record-store',
    code: 'PRODUCT_003 / 2026 / AI × MUSIC',
    title: 'AI Music Record Store',
    year: '2026',
    crossDomainLabel: 'AI × MUSIC × RECOMMENDATION',
    categories: ['AI', 'Interactive', 'Vibe Coding'],
    status: 'INDEPENDENT PRODUCT REPO',
    featured: true,
    oneLine:
      'An editorial vinyl crate-digging experience where recommendations are guided by mood, texture, and liner-note storytelling rather than cold collaborative filtering.',
    problem:
      'Algorithmic streaming feeds flatten music discovery into endless background playlists, stripping away album artwork, context, and the serendipity of a record shop.',
    idea:
      'Pair semantic audio-mood embeddings with tactile sleeve browsing and AI-curated liner notes that explain why a record fits a specific hour or atmosphere.',
    role: 'Recommendation Engine, Editorial UI Design & Full-Stack Implementation',
    stack: ['Next.js', 'TypeScript', 'Vector Embeddings', 'Framer Motion', 'Tailwind CSS'],
    results: [
      'Created a tactile digital crate-digging space deployed as a standalone web product (`music-record-store/`).',
      'Bridged semantic text-to-mood retrieval with physical sleeve inspection.',
    ],
    highlights: [
      'Atmospheric queries like "rain on Tokyo asphalt at 11pm" mapped to curated sonic textures',
      'Tactile vinyl sleeve flip revealing production credits and sonic lineage',
      'Decoupled standalone architecture',
    ],
    cover: IMG_MUSIC,
    screenshots: [IMG_MUSIC, IMG_SHANGHAI],
    liveUrl: 'https://ai-music-record-store.vercel.app',
    githubUrl: 'https://github.com/florayeung-archive/music-record-store',
    technicalStory:
      'Implemented multi-modal metadata indexing combining acoustic descriptors, era lineage, and semantic embeddings for low-latency atmospheric retrieval.',
    personalStory:
      'Every city I have lived in is anchored by small independent record stores. I wanted to build an algorithm that respects the sleeve, the liner notes, and the silence between tracks.',
    caseStudy: {
      overview:
        'AI Music Record Store reimagines music recommendation as an unhurried spatial and editorial conversation.',
      problem:
        'Modern recommendation systems optimize for passive skip-rates rather than intentional listening and discovery.',
      idea:
        'Let listeners describe a memory, weather, or texture, and return three deeply contextualized records with full liner notes.',
      userExperience:
        'Warm analog typography, physical record sleeve physics, and curated sonic essays.',
      myRole:
        'Creator of the standalone `music-record-store/` repository—handling embedding pipeline, UI choreography, and editorial curation.',
      architecture:
        'Semantic query parser → Embedding similarity & diversity re-ranker → Editorial liner-note synthesizer.',
      technology: ['Next.js', 'TypeScript', 'Semantic Embeddings', 'Motion'],
      result:
        'A self-contained interactive product showcasing how AI can deepen cultural appreciation rather than accelerate consumption.',
      evaluation:
        'Compared diversity and serendipity scores against standard genre-tag filtering across 50 atmospheric prompts.',
      reflection:
        'The best recommendation feels like a trusted friend handing you a record across a counter and saying, "Listen to track three when it gets dark."',
    },
  },
];

export const originalVisualWorksZh: VisualWorkData[] = [
  {
    id: 'vis-orig-01',
    code: 'DECK_004 / 架构与智能体框架',
    title: '从随机信号到 LLM 智能体：结构化系统设计框架',
    category: '学术与技术分享 Slide Deck',
    year: '2026',
    summary:
      '将高维注意力机制与金融时序中的信噪比分解转化为直观的空间流架构图。',
    slideCount: '18 SLIDES',
    keyTakeaway:
      '当我们将概率模型置于确定性的 Schema 边界内时，复杂的智能体架构便具备了工程可控性。',
    slidesPreview: [
      {
        slideNumber: '01 / 18',
        heading: '不确定性的解剖学 (The Anatomy of Uncertainty)',
        caption: '对比金融时间序列中的方差波动与自回归语言模型中的 Token 概率熵。',
      },
      {
        slideNumber: '07 / 18',
        heading: '受 Schema 约束的智能体 (Schema-Constrained Agency)',
        caption: '为什么在真实业务流（如 Medication Companion 与央行文本量化）中确定性边界至关重要。',
      },
      {
        slideNumber: '14 / 18',
        heading: '人机协同确认 (Human-in-the-Loop Verification)',
        caption: '为高可靠决策支持系统设计界面延迟与视觉置信度指示器。',
      },
    ],
  },
];

export const originalVisualWorksEn: VisualWorkData[] = [
  {
    id: 'vis-orig-01',
    code: 'DECK_004 / STRATEGY & AI FRAMEWORK',
    title: 'From Stochastic Signals to LLM Agents: A Structural Framework',
    category: 'Academic & Technical Presentation',
    year: '2026',
    summary:
      'Translating high-dimensional attention mechanisms and quantitative signal noise into clean architectural diagrams.',
    slideCount: '18 SLIDES',
    keyTakeaway:
      'Complex model architectures become intuitive when mapped onto spatial flow and signal-to-noise hierarchies.',
    slidesPreview: [
      {
        slideNumber: '01 / 18',
        heading: 'The Anatomy of Uncertainty',
        caption: 'Comparing variance in financial time-series with token probability entropy in autoregressive models.',
      },
      {
        slideNumber: '07 / 18',
        heading: 'Schema-Constrained Agency',
        caption: 'Why deterministic boundaries matter when deploying probabilistic models in real-world workflows.',
      },
      {
        slideNumber: '14 / 18',
        heading: 'Human-in-the-Loop Verification',
        caption: 'Designing interface latency and visual confidence indicators for decision support.',
      },
    ],
  },
];

export const originalMediaWorksZh: MediaWorkData[] = [
  {
    id: 'media-orig-001',
    slug: 'algorithmic-loneliness-and-urban-soundscapes',
    code: 'ESSAY_003 / 城市与声音档案',
    title: '算法信息流与城市倾听的静谧建筑学',
    platform: '独立文化专栏 / 视觉与声音随笔',
    year: '2026',
    role: '作者 / 视觉编辑',
    metricHighlight: {
      value: '深度专栏',
      unit: '跨媒介叙事',
    },
    cover: IMG_TOKYO,
    summary:
      '探讨流媒体推荐算法如何重塑我们对城市的记忆，以及为什么实体唱片店与有温度的数字档案依然重要（启发了 AI Music Record Store）。',
    lifeStory:
      '写于往返香港、上海与东京的几个雨夜，一边听着老磁带转录，一边看着电车窗外的通勤人群。',
    creativeProcess:
      '结合独立唱片店田野访谈、个人 35mm 胶片摄影，以及对向量嵌入空间的通俗视觉化阐释。',
    targetAudience:
      '关注数字文化、人文技术与城市声音记忆的跨学科读者。',
    originalUrl: '#media-case-001',
  },
];

export const originalMediaWorksEn: MediaWorkData[] = [
  {
    id: 'media-orig-001',
    slug: 'algorithmic-loneliness-and-urban-soundscapes',
    code: 'ESSAY_003 / URBAN & SOUND ARCHIVE',
    title: 'Algorithmic Feeds & The Quiet Architecture of Urban Listening',
    platform: 'Editorial Essay / Visual & Sonic Column',
    year: '2026',
    role: 'WRITER / EDITOR',
    metricHighlight: {
      value: 'FEATURE',
      unit: 'EDITORIAL ESSAY',
    },
    cover: IMG_TOKYO,
    summary:
      'An editorial investigation into how recommendation feeds reshape our memory of cities, and why tactile archives still matter (inspiring AI Music Record Store).',
    lifeStory:
      'Written over three rainy evenings between Hong Kong and Tokyo while listening to old cassette rips and watching commuters on the tram.',
    creativeProcess:
      'Combined field interviews with independent record shop owners, personal film photography, and accessible explanations of embedding spaces.',
    targetAudience:
      'Technologists, designers, and urban readers looking for humane perspectives on digital culture.',
    originalUrl: '#media-case-001',
  },
];

export const originalWritingsZh: WritingEntryData[] = [
  {
    id: 'write-orig-01',
    slug: 'why-interfaces-should-feel-like-architecture',
    index: '04',
    title: '为什么智能界面应该像安静的建筑 (Why Intelligent Interfaces Should Feel Like Quiet Architecture)',
    year: '2026',
    date: '2026.03',
    category: 'AI Thinking',
    excerpt:
      '当我们使用大语言模型构建产品时，最容易陷入的诱惑是让一切都变成喋喋不休的聊天框。但最好的工具懂得何时保持安静与结构感。',
    readTime: '5 分钟阅读',
    content: [
      '如今大多数 AI 界面默认采用同一种隐喻：无限延伸的聊天气泡。虽然对话足够灵活，但它往往把组织结构信息的负担转嫁给了用户。',
      '从同济数理金融走向港大计算机科学，我愈发欣赏那些“用约束创造清晰”的系统。一张设计克制的表格、一个空间化的索引，或者一张确定性的用药确认卡片（如 Medication Companion），在半秒内传递的信息远胜三段生成的套话。',
      '在我自己的构建中——无论是语音用药伴侣、指尖桌面钢琴还是黑胶唱片店——我都把模型视为隐形的推理层，而把界面视为安静的建筑。目标不是表演智能，而是留给人从容的理解。',
    ],
  },
  {
    id: 'write-orig-02',
    slug: 'a-note-from-tokyo-rain-and-sodium-light',
    index: '05',
    title: '东京札记：阵雨、钠灯与 35mm 颗粒 (A Note from Tokyo)',
    year: '2026',
    date: '2026.04',
    category: 'Place Note',
    place: 'Tokyo',
    excerpt:
      '黄昏雨后走过下北泽的街巷。关于摄影如何让习惯了扫描屏幕与代码的眼睛重新慢下来。',
    readTime: '4 分钟阅读',
    content: [
      '在北纬 35.6762°，一场春雨刚刚停歇，柏油路面盛着由暖琥珀色灯笼与便利店白光构成的第二个天空。',
      '当你每天清晨都在调试分词管线、WebSocket 数据流与损失曲线时，你的眼睛会习惯离散的符号。而背上一台相机则让人找回连续的影调——你会等待一辆单车驶过水洼，会留意黄铜门把手上时间的包浆。',
      '写代码与按快门其实是同一种专注：前者追问一个系统如何运行，后者追问一个瞬间在消逝前如何被感知。',
    ],
  },
];

export const originalWritingsEn: WritingEntryData[] = [
  {
    id: 'write-orig-01',
    slug: 'why-interfaces-should-feel-like-architecture',
    index: '04',
    title: 'Why Intelligent Interfaces Should Feel Like Quiet Architecture',
    year: '2026',
    date: 'MAR 2026',
    category: 'AI Thinking',
    excerpt:
      'When we build with large language models, the temptation is to make everything talkative. Yet the best tools know when to stay silent and structured.',
    readTime: '5 MIN READ',
    content: [
      'Most AI interfaces today default to a single metaphor: an endless chat thread. While conversational turns are flexible, they often shift the burden of structure onto the user.',
      'Coming from mathematical finance into computer science, I learned to appreciate systems where constraints create clarity. A well-designed table, a spatial index, or a deterministic confirmation card communicates more in half a second than three paragraphs of generated prose.',
      'In my own builds—whether a voice medication companion or a spatial music archive—I treat the model as an invisible reasoning layer and the interface as quiet architecture. The goal is not to perform intelligence, but to leave the human with calm understanding.',
    ],
  },
  {
    id: 'write-orig-02',
    slug: 'a-note-from-tokyo-rain-and-sodium-light',
    index: '05',
    title: 'A Note from Tokyo: Rain, Sodium Light, and 35mm Grain',
    year: '2026',
    date: 'APR 2026',
    category: 'Place Note',
    place: 'Tokyo',
    excerpt:
      'Walking through Shimokitazawa after dusk with a manual lens. On how photography slows down the eye trained to scan screens.',
    readTime: '4 MIN READ',
    content: [
      'At 35.6762° N, just after a spring downpour, the asphalt holds a second sky made of amber lantern light and convenience-store white.',
      'When you spend your mornings debugging tokenization pipelines and loss curves, your eyes get used to discrete symbols. Carrying a camera restores continuous tone. You wait for a bicycle to cross the puddle; you notice the exact patina on a brass doorway.',
      'Both coding and photography are ways of paying attention. One asks how a system behaves; the other asks how a moment feels before it vanishes.',
    ],
  },
];

export const originalVolunteeringZh: VolunteerEntryData[] = [
  {
    id: 'vol-orig-01',
    title: '社区长者数字无障碍与健康工具陪伴工作坊',
    organization: '社区老年数字关怀倡议',
    location: '香港 / 上海',
    dates: '2025 — 2026',
    whatICaredAbout: '当公共服务与日常健康管理全面迁移至智能手机时，确保长辈们不被细小的字号与繁琐的界面留在原地。',
    description:
      '一对一陪伴社区长者梳理手机常用功能，倾听他们在日常记录用药与使用医疗小程序时的真实挫败感，这些一线观察直接启发了 Medication Companion 的无障碍语音交互设计。',
  },
];

export const originalVolunteeringEn: VolunteerEntryData[] = [
  {
    id: 'vol-orig-01',
    title: 'Community Digital Literacy & Accessible Health Workshops',
    organization: 'Neighborhood Senior Support Initiative',
    location: 'Hong Kong / Shanghai',
    dates: '2025 — 2026',
    whatICaredAbout:
      'Ensuring older adults are not left behind when public services and health tools move onto smartphones.',
    description:
      'Sat one-on-one with elderly residents to simplify mobile interfaces, listen to their frustrations with small typography, and document real-world accessibility barriers that directly inspired Medication Companion.',
  },
];

export const originalMomentsZh: LifeMomentData[] = [
  {
    id: 'moment-orig-02',
    label: '东京唱片行淘碟与黑胶内页观察',
    location: 'Tokyo',
    date: '2026.04',
    image: IMG_TOKYO,
    note: '在安静的唱片店里倾听原声编曲，观察一张物理黑胶封套如何包裹住特定的时间与情绪（AI Music Record Store 的起点）。',
  },
];

export const originalMomentsEn: LifeMomentData[] = [
  {
    id: 'moment-orig-02',
    label: 'Crate Digging & Analog Listening in Tokyo',
    location: 'Tokyo',
    date: 'APR 2026',
    image: IMG_TOKYO,
    note: 'Listening to acoustic arrangements and studying how physical album sleeves frame a mood (the seed of AI Music Record Store).',
  },
];
