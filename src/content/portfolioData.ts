import {
  ProfileData,
  EducationEntryData,
  ExperienceEntryData,
  ProjectData,
  CompetitionData,
  VisualWorkData,
  MediaWorkData,
  WritingEntryData,
  PhotoEntryData,
  PlaceChapterData,
  VolunteerEntryData,
  LifeMomentData,
  Language,
} from '../types/portfolio';

export const IMG_TOKYO = '/src/assets/images/tokyo_night_photography_1791200071853.jpg';
export const IMG_HK = '/src/assets/images/hongkong_harbor_mist_1791200084724.jpg';
export const IMG_SHANGHAI = '/src/assets/images/shanghai_old_lane_1791200099667.jpg';
export const IMG_MEDICATION = '/src/assets/images/project_medication_companion_1791200116259.jpg';
export const IMG_MUSIC = '/src/assets/images/project_music_store_1791200127085.jpg';

export interface PortfolioDataset {
  profile: ProfileData;
  education: EducationEntryData[];
  educationMigrationSteps: { step: string; domain: string; detail: string }[];
  experiences: ExperienceEntryData[];
  projects: ProjectData[];
  competitions: CompetitionData[];
  visualWorks: VisualWorkData[];
  mediaWorks: MediaWorkData[];
  writings: WritingEntryData[];
  photography: PhotoEntryData[];
  places: PlaceChapterData[];
  volunteering: VolunteerEntryData[];
  lifeMoments: LifeMomentData[];
}

export const portfolioDataByLang: Record<Language, PortfolioDataset> = {
  zh: {
    profile: {
      name: '杨蕊嘉',
      englishName: 'FLORA YEUNG',
      systemHeroHeadline: '围绕数据、智能与交互，构建真实可用的系统。',
      systemTrajectory: '数理金融 (同济大学) → 计算机科学 (香港大学)',
      institutionTag: 'HKU / TONGJI · 2026',
      lifeLandingHeadline: '我所见的、所造的、所留存与真正在意的。',
      email: 'yrjzcm@foxmail.com',
      phone: '(+86) 13367811933',
      github: 'https://github.com/florayeung-archive',
      linkedin: 'https://linkedin.com/in/florayeung',
      location: '香港 · 上海',
      skillsSummary: {
        programming:
          'Python (Pandas, Scikit-learn, NumPy), SQL, DuckDB, C#, R, Spark (ML, DataFrames), HDFS/MapReduce, LaTeX, QGIS, HTML/CSS',
        mlAndNlp:
          '机器学习 (XGBoost, RF, SVM, GBDT) · 自然语言处理 (Prompt Engineering, LLM API, RAG 框架, BERTopic, LDA) · 量化建模 (高频 LOB 解析, 特征工程, LSTR1 非线性计量)',
        languages: '普通话 (母语) · 英语 (雅思 7.5) · 粤语 (日常交流)',
      },
    },

    education: [
      {
        id: 'edu-hku',
        year: '2026.09 — 今',
        institution: '香港大学 (The University of Hong Kong)',
        degree: '计算机科学硕士 (MSc in Computer Science)',
        major: '计算与数据科学学院',
        location: '香港',
        selectedCoursework: [
          '数据挖掘 (Data Mining)',
          '计算智能与机器学习 (Computational Intelligence & ML)',
          '交易与金融中的机器学习 (ML in Trading and Finance)',
          '自然语言处理 (Natural Language Processing)',
          '大语言模型 (Large Language Models)',
          '数据科学进阶与大数据管理',
        ],
        focusAreas: ['大语言模型与 NLP 管线', '金融与交易机器学习', '大规模数据挖掘'],
        narrativeStep: 'Computer Science → AI Systems',
      },
      {
        id: 'edu-tongji',
        year: '2021.09 — 2026.06',
        institution: '同济大学 (Tongji University)',
        degree: '经济学学士 · 数理金融',
        major: '经济与管理学院',
        gpaOrRank: 'GPA 4.51 / 5.0（专业排名前 30%）',
        location: '上海',
        selectedCoursework: [
          '数学分析与高等代数',
          '概率论与数理统计',
          '计量经济学与数学建模',
          'Python 与数据库系统',
          '公司金融与投资学',
          '宏微观经济学',
        ],
        focusAreas: ['数理统计与非线性计量', '量化特征工程', '跨学科算法建模'],
        narrativeStep: 'Finance → Quantitative Thinking → Programming',
      },
    ],

    educationMigrationSteps: [
      {
        step: '01',
        domain: '数理金融 (Finance)',
        detail: '在同济大学建立严谨的微观市场机制、公司金融与汇率宏观视角。',
      },
      {
        step: '02',
        domain: '量化与计量思维 (Quantitative)',
        detail: '通过数学分析、概率统计与非线性计量经济学，将复杂现象转化为可检验假设。',
      },
      {
        step: '03',
        domain: '工程与数据架构 (Programming)',
        detail: '运用 Python、SQL、DuckDB、Spark 与 WebSocket 构建高吞吐数据采集与清洗管线。',
      },
      {
        step: '04',
        domain: '计算机科学 (Computer Science)',
        detail: '进入香港大学计算与数据科学学院，深耕算法工程、分布式数据与系统构建。',
      },
      {
        step: '05',
        domain: '人工智能与交互 (AI & Systems)',
        detail: '打通大语言模型、NLP 信号提取、Uplift 增量建模与以人为本的交互体验。',
      },
    ],

    experiences: [
      {
        id: 'exp-didi',
        year: '2025.12 — 2026.04',
        company: '滴滴出行 (DiDi)',
        role: '国际业务集团（IBG）战略分析部实习生',
        location: '上海',
        context:
          '负责滴滴 99Food 在拉美地区的外卖业务监测、B/C 双端经营看板搭建及竞对拆解，为拉美本地化扩张提供底层数据与策略支撑。',
        responsibilities: [
          '拉美外卖业务监测与城市映射数据清洗：运用 SQL、Python 与 Excel 处理 5000+ 条巴西 IBGE 原始地缘数据，清洗并重组外卖业务底层的城市级映射数据库，支撑城市圈层监控与区域策略。',
          'B/C 双端看板与市场格局量化：搭建 2 个核心看板，B 端结合 CNPJ 和 CERC 数据按城市及 KA/CKA 商户层级追踪 GMV 与 MS；C 端基于 Klavi 交易数据分析 DAU/AOV/WAU，并通过 QGIS 热力图可视化区域 GMV。',
          '竞对拆解与本地化增长：深度拆解 iFood / Keeta 等竞品底层履约模型、抽佣机制和 B/C/D 端策略，联合拉美本地团队开展市场分析。',
        ],
        results: [
          '任职期间推动圣保罗市场份额（MS）提升 6pp。',
          '助力外卖业务成功拓展至 10+ 新城，区域覆盖显著扩大。',
        ],
        metrics: [
          {
            value: '+6pp',
            label: '圣保罗市场份额 (MS) 提升',
            context: '联合拉美本地团队推进竞对拆解与区域扩张策略',
          },
          {
            value: '5,000+',
            label: '巴西 IBGE 地缘数据清洗与城市映射',
            context: '支撑 10+ 新城拓展与 B/C 双端经营看板',
          },
        ],
      },
      {
        id: 'exp-iqvia',
        year: '2025.08 — 2025.12',
        company: '意略明 (IQVIA 全资子公司)',
        role: 'CBD 组策略分析实习生',
        location: '上海',
        context:
          '结合自动化 NLP 数据管线与定量统计检验，为跨国药企提供处方行为洞察、高潜人群挖掘与跨科室产品定位策略。',
        responsibilities: [
          '自动化问卷数据管道：独立搭建 NLP 流水线（Regex + 独热编码），清洗 12 组含错别字、医学缩写的开放性问卷，全自动化转化为 720 个二值特征的结构化数据矩阵；构建包含 30+ 药物类别与 60+ 同义词/错别字规则的映射字典。',
          '问卷统计检验与专家访谈：分析 200+ 份医生问卷，使用交叉列联表分析与双尾显著性检验比较科室、处方状态与产品认知，结合 7+ 位专家访谈识别处方壁垒。',
          '跨科室机会定位与传播策略：参与舒洛地特产品策略优化，针对血管外科、内分泌科、肾内科开展案头研究，通过三套传播概念测试识别科室级产品定位与优先沟通方向。',
        ],
        results: [
          '大幅压缩开放式医学问卷的人工编码与清洗时间。',
          '成功挖掘出具备 7 倍转化潜力的高潜医生细分人群，交付跨科室机会点报告。',
        ],
        metrics: [
          {
            value: '720 维',
            label: 'NLP 自动化生成二值特征矩阵',
            context: '覆盖 30+ 药物类别与 60+ 同义词/错别字规则映射字典',
          },
          {
            value: '7x',
            label: '高潜细分人群转化潜力',
            context: '基于 200+ 份医生问卷双尾显著性检验与 7+ 专家深访',
          },
        ],
      },
      {
        id: 'exp-minsheng',
        year: '2024.09 — 2025.02',
        company: '民生证券股份有限公司',
        role: '通信团队行研实习生（新财富入围团队）',
        location: '上海',
        context:
          '聚焦互联网卫星产业与海外空天通信龙头，开展深度行业研究、动态数据库搭建及机构客户投研服务。',
        responsibilities: [
          '互联网卫星产业深度报告：独立撰写 70+ 页互联网卫星产业深度报告 PPT，横向对比 SpaceX、AST SpaceMobile 等头部企业的技术壁垒、商业模式与市场渗透率。',
          '海外卫星企业数据库与周度跟踪：建立海外卫星企业动态数据库，主导中国卫星应用大会资料库搭建，完成 800+ 页参会资料标准化归档；系统追踪卫星发射数据（频段分布）与 FCC 申报文件，输出周度简报 21 篇、独立撰写热点点评及快评 8 篇。',
          '机构客户服务对接：参与企业电话会并整理纪要，通过 3000+ 条定向内容触达客户，推动与 5 家机构客户沟通数据服务需求。',
        ],
        results: [
          '70+ 页深度报告的核心数据图表被团队采纳率超过 60%，直接支撑 3 家机构客户产业尽调。',
          '形成标准化的海外卫星发射与 FCC 申报高频跟踪体系。',
        ],
        metrics: [
          {
            value: '>60%',
            label: '70+ 页深度报告核心图表采纳率',
            context: '支撑 3 家机构客户产业尽调与 5 家机构数据服务对接',
          },
          {
            value: '800+ 页',
            label: '卫星大会标准化归档 & 29 篇周报/快评',
            context: '持续追踪 SpaceX / AST SpaceMobile 及 FCC 频段申报',
          },
        ],
      },
      {
        id: 'exp-bie',
        year: '2024 — 2025',
        company: 'BIE 别的 (百万粉丝新媒体编辑部)',
        role: '编辑部实习生（全国仅招 2 人）',
        location: '上海',
        context:
          '在拥有百万粉丝的青年文化与纪实新媒体平台参与核心选题策划、深度撰稿与账号内容运营。',
        responsibilities: [
          '负责青年文化、城市观察与社会议题的深度选题策划与采访撰稿。',
          '把控文章叙事节奏、视觉排版与读者情绪共鸣，统筹账号日常运营与社群互动反馈。',
        ],
        results: [
          '全国仅录取 2 人的编辑部实习席位，独立及参与输出多篇 10w+ 阅读量爆款深度推文。',
        ],
        metrics: [
          {
            value: '10w+',
            label: '多篇深度原创爆文阅读量',
            context: '百万粉丝新媒体编辑部（全国仅 2 名实习生）',
          },
        ],
      },
    ],

    projects: [
      {
        id: 'proj-fx-llm',
        slug: 'llm-fx-policy-econometrics',
        code: 'PROJECT_001 / 2026 / AI × ECONOMETRICS',
        title: 'LLM 驱动的外汇政策文本量化与非线性计量建模',
        year: '2025.12 — 2026.05',
        crossDomainLabel: 'LLM × NLP × NONLINEAR ECONOMETRICS',
        categories: ['AI', 'Systems'],
        status: '毕业论文研究项目',
        featured: true,
        oneLine:
          '打通“央行异构文本采集—LDA 主题过滤—DeepSeek API 结构化情绪赋分—EMP 指数构建—LSTR1 非线性平滑转换回归”的完整研究链路。',
        problem:
          '央行官网缺乏统一结构化接口，传统词典法难以捕捉货币政策报告与官员讲话中微妙的汇率预期引导方向，且线性模型无法刻画不同外汇市场压力区制下的非对称效应。',
        idea:
          '开发网页与 PDF 双路径采集管线处理 640 万字语料，结合 LDA 筛选与带领域锚点约束的 LLM 信号提取，并引入 LSTR1 非线性模型检验不同压力区制下的政策传导。',
        role: '独立研究者（数据工程、NLP/LLM 信号提取、非线性计量建模）',
        stack: ['Python', 'DeepSeek API (JSON Schema)', 'LDA Topic Model', 'LSTR1 非线性计量', 'Granger 检验'],
        results: [
          '统一采集并解析 80 篇货币政策执行报告、1,526 篇官员讲话，总计约 640 万中文字符。',
          '构建 240 期月度外汇市场压力指数（EMP），通过 LSTR1 非线性区制识别将模型 R² 由 0.065 提升至 0.157（提升逾 2.4 倍）。',
        ],
        highlights: [
          '网页正文不足 100 字自动回退 PDF 附件解析的鲁棒采集管线',
          'LDA (K=39) 筛选 454 篇汇率核心文档 + DeepSeek 连续型情绪与分类方向提取',
          '6 项稳健性设定 + Granger 因果检验与外生 DTWEXBGS 敏感性验证',
        ],
        cover: IMG_HK,
        screenshots: [IMG_HK, IMG_SHANGHAI],
        liveUrl: '#case-study-fx-llm',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          '针对异构央行语料构建网页+PDF双路径解析器，使用 LDA (K=39) 从 640 万字中锁定 454 篇汇率文本；通过领域锚点、JSON 结构约束及失败重试机制调用 DeepSeek API 提取政策信号，并在 240 期 EMP 指数上使用 LSTR1 模型将 R² 从 0.065 提升至 0.157。',
        personalStory:
          '作为数理金融跨向计算机科学的关键研究，我希望证明大语言模型不仅能生成对话，更能作为严谨的计量经济学“测量仪器”，读懂政策字里行间的预期管理。',
        caseStudy: {
          overview:
            '本研究探索如何利用大语言模型（LLM）与主题模型对非结构化央行沟通文本进行高精度量化，并置于非线性宏观计量框架下检验其对外汇市场压力（EMP）的区制依赖影响。',
          problem:
            '第一，央行历史文档跨度长、格式异构（HTML 正文与 PDF 附件混杂）；第二，汇率沟通高度凝练，传统情感词典噪音大；第三，外汇市场在平稳期与高压力期对政策信号的反应存在显著非线性。',
          idea:
            '构建“采集解析 → 主题提纯 → LLM 结构化赋分 → 非线性区制回归”四阶段管线，用可复现的工程约束保证 LLM 输出的计量可用性。',
          userExperience:
            '研究管线具备全自动断点续传、JSON Schema 校验与失败自动重试机制，并输出清晰的区制转换函数图与稳健性检验报表。',
          myRole:
            '独立完成全部爬虫与 PDF 解析工程、LDA 建模、Prompt 锚点设计、EMP 指数合成及 LSTR1 计量检验。',
          architecture:
            '双路径采集器 (HTML/PDF Fallback) → 640 万字原始语料库 → LDA (K=39) 汇率主题过滤 (454 篇) → DeepSeek API 结构化评分 → 240 期月度 EMP 指数与 LSTR1 模型。',
          technology: ['Python', 'DeepSeek API', 'LDA', 'LSTR1 (Logistic Smooth Transition Regression)', 'Time-Series Econometrics'],
          result:
            '成功提取连续型政策情绪与分类型引导方向，非线性 LSTR1 模型将解释力 R² 从线性基准的 0.065 显著提升至 0.157。',
          evaluation:
            '完成 6 项稳健性设定，引入 Granger 因果检验、汇率惯性控制及外生美元指数（DTWEXBGS）转换变量，验证了结论在不同时序设定下的稳健性。',
          reflection:
            '当我们将 LLM 引入实证研究时，最重要的不是让模型“自由发挥”，而是通过领域锚点与结构约束，把概率生成转化为可检验、可复现的统计信号。',
        },
      },
      {
        id: 'proj-commerce-iq',
        slug: 'commerce-iq-uplift-diagnostics',
        code: 'PROJECT_002 / 2026 / DATA × UPLIFT ML',
        title: 'CommerceIQ 电商经营异动诊断与增量营销分析',
        year: '2026.08 — 2026.09',
        crossDomainLabel: 'CAUSAL UPLIFT × SHAPLEY ATTRIBUTION × BI',
        categories: ['AI', 'Systems'],
        status: '个人数据科学与工程项目',
        featured: true,
        oneLine:
          '基于 Olist 10 万笔真实订单与 X5 RetailHero 4,578 万条购买明细，构建从 GMV 异动 Shapley 归因到 S/T-Learner 增量营销响应的决策系统。',
        problem:
          '电商平台面临月度 GMV 异常下滑时往往缺乏量化的归因抓手；同时传统促活营销盲目全量触达，无法识别真正由营销带来增量的“可说服人群”。',
        idea:
          '运用 SQL + DuckDB 整合 9 张核心表建立 16 项质量校验指标体系；用 Shapley 值拆解 GMV 下降贡献，并基于 4,578 万条明细训练 Uplift 增量响应模型。',
        role: '独立开发者（数仓建模、Shapley 归因算法、6 页交互看板、S/T-Learner 增量建模）',
        stack: ['SQL', 'Python', 'DuckDB', 'Shapley Attribution', 'S/T-Learner Uplift', 'RFM / Cohort'],
        results: [
          '针对月度 GMV 下降 12.43% 的案例，使用 Shapley 分解量化定位“购买人数变化”占净下降的 74.7%。',
          '在 X5 RetailHero 20 万客户、4,578 万条明细上构建 S/T-Learner，独立测试集 Top 30% 人群触达组与对照组购买率差达 6.24pp。',
        ],
        highlights: [
          'DuckDB 高性能处理 10 万笔订单 + 4,578 万条零售历史购买明细',
          'Shapley 多维归因 + 地区/品类/客群/商家交叉下钻与 6 页交互式经营看板',
          '严格按 60%/20%/20% 划分训练/验证/测试集的因果 Uplift 增量评估',
        ],
        cover: IMG_MEDICATION,
        screenshots: [IMG_MEDICATION, IMG_TOKYO],
        liveUrl: '#case-study-commerce-iq',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          '基于 DuckDB 与 SQL 整合 9 张数据表并完成 16 项数据质量校验；针对 GMV 下滑 12.43% 引入 Shapley 值分解人数、频次与客单价（定位人数变动贡献 74.7%）；在 4,578 万条购买明细上构建 S/T-Learner，实现 Top 30% 人群 +6.24pp 的增量购买率提升。',
        personalStory:
          '在滴滴与意略明的策略分析经历让我意识到：业务真正需要的不是孤立的报表或黑盒预测，而是能回答“为什么掉了”和“该对谁采取行动”的完整闭环。',
        caseStudy: {
          overview:
            'CommerceIQ 是一套面向电商经营诊断与精准营销的端到端分析系统，涵盖底层订单数仓建模、GMV 异动归因、RFM/Cohort 留存看板以及因果推断 Uplift 建模。',
          problem:
            '当月度商品 GMV 出现 12.43% 的显著下滑时，单一维度同比无法区分是流量萎缩、复购频次下降还是客单价稀释；而在营销反哺阶段，常规响应模型容易把预算浪费在“自然转化者”身上。',
          idea:
            '前半程采用合作博弈论中的 Shapley 值进行无偏多因子归因并交叉下钻；后半程引入因果增量学习（S-Learner / T-Learner）直接建模处理效应（ITE）。',
          userExperience:
            '搭建 6 页交互式经营看板，支持从宏观 GMV 趋势一键下钻至异常地区、品类、商家履约状态及营销收益情景模拟。',
          myRole:
            '独立完成数据清洗、DuckDB 数仓构建、16 项数据质量校验、Shapley 归因脚本、6 页看板设计及 Uplift 模型训练与评估。',
          architecture:
            'Olist 9 表 & X5 RetailHero 4,578 万条明细 → DuckDB 聚合与 16 项质量校验 → Shapley 异动分解 + RFM/Cohort 6 页看板 → S/T-Learner 增量响应排序。',
          technology: ['DuckDB', 'Python', 'SQL', 'Shapley Value Decomposition', 'Causal ML (S/T-Learner)', 'BI Dashboard'],
          result:
            '精准锁定购买人数变化占 GMV 净下降的 74.7%；Uplift 模型在独立测试集 Top 30% 目标人群中实现触达组较对照组高出 6.24pp 的购买转化。',
          evaluation:
            '通过等长窗口、星期结构对齐及订单状态检查验证下滑方向；Uplift 模型严格执行 60%/20%/20% 训练、验证与独立测试集隔离。',
          reflection:
            '优秀的数据科学项目应当同时具备“向后看的诊断归因能力”与“向前看的增量干预能力”。',
        },
      },
      {
        id: 'proj-lob-hft',
        slug: 'high-frequency-lob-prediction',
        code: 'PROJECT_003 / 2025 / QUANT × MICROSTRUCTURE',
        title: '高频限价订单簿 (LOB) 动态建模与价格预测',
        year: '2025.03 — 2025.06',
        crossDomainLabel: 'HIGH-FREQUENCY LOB × WEBSOCKET × ML',
        categories: ['AI', 'Systems'],
        status: '个人量化工程项目',
        featured: true,
        oneLine:
          '绕开 REST API 延迟限制，通过 OKX WebSocket 接入最快 10ms 更新的 BTC-USDT 深度盘口，构建 50,000+ tick 样本与 >90% 准确率的短期价格预测框架。',
        problem:
          '传统低频 K 线丢失了订单簿内部的流动性失衡信息，而常规 REST 轮询存在显著网络延迟与数据断层，且金融时序极易因数据泄露产生“未来函数”虚高回测。',
        idea:
          '直接对接 WebSocket 毫秒级深度频道落盘 50,000+ tick，提取 5 档买卖价差、订单失衡率（OFI）与挂单深度变化率，在严格滚动隔离窗口下对比集成学习模型。',
        role: '独立开发者（毫秒级数据接入、微观结构特征工程、滚动调优与无未来函数回测）',
        stack: ['Python', 'OKX WebSocket API', 'Scikit-learn (GBDT / RF / SVM / AdaBoost)', 'GridSearchCV', 'Quantitative Backtesting'],
        results: [
          '稳定采集最快 10ms 级更新的盘口流数据，构建 50,000+ 有效 tick 样本集。',
          '在 30 分钟滚动调优窗口与 10 秒预测窗口下，多模型框架平均二分类准确率超过 90%，并通过无未来函数回测验证。',
        ],
        highlights: [
          '10ms 级 OKX WebSocket 实时异步 JSON 解析、清洗与落盘管线',
          'Z-score 标准化提取 5 档价差、订单失衡率与深度变化率等微观结构特征',
          '严格隔离训练与测试区间的滚动窗口超参调优，杜绝未来函数偏差',
        ],
        cover: IMG_TOKYO,
        screenshots: [IMG_TOKYO, IMG_HK],
        liveUrl: '#case-study-lob-hft',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          '通过 OKX WebSocket API 接入 10ms 级 BTC-USDT 订单簿深度流并构建 50,000+ tick 样本；使用 Z-score 提取 5 档买卖价差、订单失衡率及挂单深度变化率；通过 GridSearchCV 执行 30 分钟滚动窗口调优与 10 秒窗口预测（准确率 >90%），并在严格隔离未来函数的条件下完成策略回测。',
        personalStory:
          '在研究微观市场结构时，我着迷于每一毫秒挂单与撤单背后的多空博弈。亲手从底层 WebSocket 流写起，让我真正理解了高频数据清洗与防过拟合的严苛边界。',
        caseStudy: {
          overview:
            '该项目聚焦数字资产高频市场微观结构，从零搭建毫秒级限价订单簿（Limit Order Book）采集器、特征工程管线、多模型滚动预测框架及无偏回测系统。',
          problem:
            '高频盘口数据噪声大、非平稳性强，若采用静态全样本划分极易引入未来信息泄露（Look-ahead Bias），导致模型在实盘时段失效。',
          idea:
            '以微观流动性供需失衡为核心构建特征，并采用“30 分钟滚动训练调优 + 未来 10 秒窗口预测”的动态前推机制。',
          userExperience:
            '自动化流式采集与日志监控，输出清晰的模型对比矩阵、特征重要性排序与不同市场波动时段下的信号回测曲线。',
          myRole:
            '独立负责异步 WebSocket 客户端开发、50,000+ tick 数据清洗、微观结构特征构造、SVM/AdaBoost/RF/GBDT 对比实验及回测引擎编写。',
          architecture:
            'OKX WebSocket (10ms Tick Stream) → JSON 解析与异常值清洗 (50,000+ ticks) → 5 档微观结构特征 (Z-score) → 30min 滚动 GridSearchCV → 10s 价格方向预测与隔离回测。',
          technology: ['Python', 'WebSocket', 'SVM', 'AdaBoost', 'Random Forest', 'GBDT'],
          result:
            '构建高可靠性的毫秒级盘口数据集，10 秒窗口方向预测平均分类准确率超 90%，并在多个独立行情时段验证了信号的稳定性。',
          evaluation:
            '对比了趋势行情与震荡行情下的模型衰减速度，严格隔离滚动归一化参数（仅用训练窗口均值方差转换测试窗口），彻底消除未来函数。',
          reflection:
            '量化建模的生命线在于数据管道的纯净度与验证协议的诚实度——严谨的滚动隔离比复杂的模型结构更重要。',
        },
      },
      {
        id: 'proj-acg-bertopic',
        slug: 'acg-consumer-mining-bertopic',
        code: 'PROJECT_004 / 2025 / NLP × CONSUMER',
        title: 'ACG 谷圈消费者行为建模与数据挖掘',
        year: '2025.03 — 2025.05',
        crossDomainLabel: 'BERTOPIC NLP × ECONOMETRICS × OMNICHANNEL',
        categories: ['AI', 'Interactive'],
        status: '市级研究项目',
        featured: true,
        oneLine:
          '结合 19,940 条社交媒体文本的 BERTopic 无监督主题挖掘与 817 份分层抽样问卷计量回归，量化亚文化圈层消费决策机制。',
        problem:
          '二次元“谷圈”消费呈现出极强的情感溢价与圈层黑话特征，传统问卷难以穷尽新兴痛点，而纯文本爬虫又缺乏严谨的人口统计与支付意愿因果检验。',
        idea:
          '采用“NLP 非结构化探索 + 统计学结构化验证”混合范式：先用 BERTopic 挖掘近 2 万条社媒文本定位痛点，再设计分层问卷通过多元回归量化各维度驱动力。',
        role: '核心负责人（Python 爬虫与 BERTopic 建模、问卷抽样检验、多元回归与策略输出）',
        stack: ['Python', 'BERTopic', 'HDBSCAN', 'c-TF-IDF', 'Cronbach α / KMO', 'Multiple Regression'],
        results: [
          '部署爬虫抓取 19,940 条社交媒体文本，通过 BERTopic + HDBSCAN + c-TF-IDF 提取核心消费痛点与圈层特征。',
          '回收 817 份有效问卷并通过信效度检验，量化 IP 属性与线上线下场景对消费决策的显著影响，输出全渠道运营策略。',
        ],
        highlights: [
          '19,940 条社媒舆情无监督聚类（BERTopic + HDBSCAN + c-TF-IDF）',
          '817 份有效样本的分层抽样与 Cronbach’s α、KMO、Bartlett 严密检验',
          '打通定性圈层文化洞察与定量回归系数的全渠道商业建议',
        ],
        cover: IMG_MUSIC,
        screenshots: [IMG_MUSIC, IMG_SHANGHAI],
        liveUrl: '#case-study-acg-bertopic',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          '抓取 19,940 条社交媒体文本，利用预训练语义嵌入、HDBSCAN 密度聚类与 c-TF-IDF 构建 BERTopic 主题模型；进而基于 817 份分层抽样有效问卷完成信效度检验与多元线性回归，量化 IP 属性及全渠道触点对消费转化率的影响。',
        personalStory:
          '身边许多朋友热爱收集徽章与周边（“吃谷”），我想用数据科学的显微镜去理解这种情感联结背后的社群温度与商业逻辑。',
        caseStudy: {
          overview:
            '作为市级立项研究，本项目结合自然语言处理（BERTopic）与统计计量方法，深度剖析青年 ACG 周边消费（“谷圈”）的社群生态、溢价心理与全渠道策略。',
          problem:
            '亚文化消费文本充满圈层术语，传统词频统计容易丢失语义上下文；同时品牌方在布局快闪店与线上抽盒机时缺乏定量依据。',
          idea:
            '先通过深度语义聚类从海量野生评论中归纳真实痛点（如拼团信任、现货溢价、线下打卡社交），再将其转化为可测量的量表题项进行回归验证。',
          userExperience:
            '输出直观的主题词云簇、相关性热力图与面向 IP 衍生品运营方的全渠道落地策略蓝图。',
          myRole:
            '负责 Python 数据采集、BERTopic 参数调优、分层问卷设计、信效度检验及多元回归分析。',
          architecture:
            '19,940 条社媒文本 → BERTopic (HDBSCAN + c-TF-IDF) 痛点提取 → 817 份分层问卷 (Cronbach α & KMO) → Pearson 相关与多元线性回归 → 全渠道运营方案。',
          technology: ['Python', 'BERTopic', 'HDBSCAN', 'c-TF-IDF', 'Statistical Modeling'],
          result:
            '精准刻画了圈层消费者的多维痛点矩阵，并定量证明了线下沉浸式场景与线上社群信任机制的协同效应。',
          evaluation:
            '严格执行问卷信度（Cronbach’s α）与效度（KMO 及 Bartlett 球形检验）测试，确保回归系数稳健可信。',
          reflection:
            '当 NLP 算法与青年文化相遇时，技术不仅能处理文本，更能帮助我们听见年轻世代对陪伴与归属感的真实表达。',
        },
      },
      {
        id: 'proj-stirpat-carbon',
        slug: 'stirpat-carbon-digital-economy',
        code: 'PROJECT_005 / 2023 / ECONOMETRICS × ESG',
        title: '基于 STIRPAT 模型的双碳与数字经济实证分析',
        year: '2022.05 — 2023.04',
        crossDomainLabel: 'PANEL ECONOMETRICS × STIRPAT × GREEN ECONOMY',
        categories: ['Systems'],
        status: '校级立项研究项目',
        featured: false,
        oneLine:
          '构建上海市 2013–2021 宏观面板数据与 14 项数字经济评估指标，基于扩展 STIRPAT 模型实证检验产业数字化对碳排放强度的减排效应。',
        problem:
          '数字经济在带来算力能耗增长的同时，又通过赋能传统产业提升了能源效率，其对城市碳排放的净效应及作用板块亟需面板数据实证拆解。',
        idea:
          '聚合 14 个子指标合成数字经济综合指数与三大细分维度，纳入扩展 STIRPAT 计量方程开展 OLS 回归，并结合“碳惠天府”碳普惠机制开展商业与政策案例深挖。',
        role: '项目核心成员（面板特征工程、STIRPAT 计量回归、碳普惠案例研究与报告撰写）',
        stack: ['R / Python', 'STIRPAT 模型', 'OLS 面板回归', '指标体系构建', 'ESG 与低碳政策研究'],
        results: [
          '定量证明了“产业数字化”对碳排放强度具有显著的负向抑制作用。',
          '打通“量化实证—商业案例（成都碳惠天府）—政策建议”完整研究链路，输出上海低碳融合发展现状报告。',
        ],
        highlights: [
          '上海市 2013–2021 宏观经济面板数据清洗与 14 个子指标合成',
          '综合指数与三大细分板块的分层 STIRPAT 回归检验',
          '结合成都“碳惠天府”机制提出可落地的城市碳普惠商业闭环建议',
        ],
        cover: IMG_SHANGHAI,
        screenshots: [IMG_SHANGHAI],
        liveUrl: '#case-study-stirpat-carbon',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          '清洗上海市 2013–2021 宏观面板数据，聚合 14 个子指标构建数字经济评估体系；基于扩展 STIRPAT 模型开展 OLS 回归，实证识别出“产业数字化”细分板块对碳排放强度的显著负向影响。',
        personalStory:
          '漫步在上海梧桐树下的街区与陆家嘴楼宇之间，我常思考一座超大城市的数字化脉搏如何与绿色低碳共生。这也是我第一次将课堂上的计量方程用于回答真实的城市命题。',
        caseStudy: {
          overview:
            '本项目以超大城市上海为样本，结合构建的多维数字经济指标体系与环境经济学经典 STIRPAT 模型，探究数字经济赋能“双碳”目标的实证路径与制度创新。',
          problem:
            '既有文献多停留于宏观定性讨论，缺少对数字基础设施、数字产业发展与产业数字化三大细分板块减排差异的定量刻画。',
          idea:
            '通过 14 项底层统计指标构建分层指数，在 STIRPAT 对数线性化框架下分别检验总指数与子板块弹性系数，并引入标杆城市碳普惠案例对冲单一计量模型的局限。',
          userExperience:
            '形成逻辑严密的学术与政策研究报告，包含指标权重表、回归显著性矩阵及碳普惠商业运作流程图。',
          myRole:
            '负责 2013–2021 面板数据整理、14 项指标标准化聚合、STIRPAT 回归检验及成都“碳惠天府”案例对比撰写。',
          architecture:
            '上海 2013–2021 面板数据 → 14 项子指标合成 (3 大细分板块) → STIRPAT OLS 回归检验 → 成都“碳惠天府”碳普惠机制拆解 → 上海低碳发展政策建议。',
          technology: ['Econometrics (STIRPAT)', 'Panel OLS', 'Composite Index Construction', 'ESG Policy Analysis'],
          result:
            '实证证实产业数字化对降低碳排放强度贡献最为显著，并交付完整的《上海低碳融合发展现状报告》。',
          evaluation:
            '检验了多重共线性与不同细分维度下的弹性方向一致性，确保实证结论稳健。',
          reflection:
            '计量模型给了我们发现规律的眼睛，而深入具体的制度案例（如碳普惠）则让数据结论真正拥有改变现实的支点。',
        },
      },
    ],

    competitions: [
      {
        id: 'comp-math',
        index: '01',
        year: '2022.07',
        name: '全国大学生数学建模竞赛',
        organizer: '中国工业与应用数学学会',
        teamSize: '3',
        role: '统计检验 / 非线性建模 / 全局寻优',
        result: '全国一等奖',
        ranking: 'NATIONAL 1ST PRIZE',
        description:
          '运用 Shapiro-Wilk 正态性检验、配对 t 检验与 Pearson 相关矩阵量化材料结构变量；引入留一法交叉验证（LOOCV）规避小样本过拟合，创新构建三维正态分布模型（nlinfit）并调用 fmincon 执行多目标非线性规划优化。',
      },
      {
        id: 'comp-ey',
        index: '02',
        year: '2023.05',
        name: '安永（EY）聚能创变大学创新挑战赛',
        organizer: '安永 (Ernst & Young)',
        teamSize: '4',
        role: '核心商业逻辑梳理 & 路演 PPT 制作',
        result: '全国一等奖 & 区域 Top 4',
        ranking: 'NATIONAL 1ST PRIZE',
        description:
          '以京东物流为标杆对比国内外物流企业 ESG 披露现状；运用“议题实质性评估矩阵”梳理利益相关方诉求，提出本土化评估体系、绿色金融产品与数智化碳管理平台落地策略。',
      },
      {
        id: 'comp-legaltech',
        index: '03',
        year: '2023.10',
        name: '首届法律科技产品创新设计竞赛',
        organizer: '清华大学 & 中国计算机学会 (CCF)',
        teamSize: '4',
        role: '云端法庭全栈架构 & NLP 判决书管线测试',
        result: '全国三等奖',
        ranking: '全国 Top 20 (数百支队伍)',
        description:
          '联合开发云端法庭模拟平台（SpringBoot, MyBatis, MySQL），运用 DAG 与栈机制构建复杂剧情分支及多路径状态回溯逻辑；标准化真实判决书，使用 ApacheBenchmark、JMeter 与 OWASP ZAP 完成严苛并发负载与安全测试。',
      },
      {
        id: 'comp-jnj',
        index: '04',
        year: '2023.04',
        name: '强生（J&J）未来领袖挑战赛',
        organizer: '强生 (Johnson & Johnson)',
        teamSize: '4',
        role: 'MSCI ESG 风险拆解 & Kenvue 分拆评估',
        result: '全国 Top 12',
        ranking: 'NATIONAL TOP 12',
        description:
          '基于 MSCI ESG 评级框架深度剖析强生环境、社会与治理现状，系统梳理供应链中断、仿制药竞争与合规风险；对分拆消费者健康业务（Kenvue）进行战略可行性与营运资金优化评估。',
      },
    ],

    visualWorks: [
      {
        id: 'vis-satellite',
        code: 'DECK_001 / 行业深度研究 (70+ PAGES)',
        title: '互联网卫星产业深度报告：SpaceX 与 AST SpaceMobile 商业壁垒拆解',
        category: '证券研究所深度行研 PPT · 核心图表采纳率 >60%',
        year: '2024 — 2025',
        summary:
          '独立撰写 70+ 页互联网卫星产业深度研究报告，横向拉通低轨卫星星座技术壁垒、频段申报、发射成本曲线与直连手机（Direct-to-Cell）商业化进展，直接支撑 3 家机构客户产业尽调。',
        slideCount: '70+ SLIDES',
        keyTakeaway:
          '将复杂的空天通信射频参数、FCC 频段申报文件与发射载荷数据，转化为机构投资者一目了然的技术路线与单星经济模型图表。',
        slidesPreview: [
          {
            slideNumber: '12 / 72',
            heading: 'SpaceX Starlink vs. AST SpaceMobile 技术路线对比',
            caption: '对比相控阵天线面积、存量手机直连链路预算、ISL 星间激光链路与频谱合作模式。',
          },
          {
            slideNumber: '34 / 72',
            heading: '全球低轨卫星发射频段分布与 FCC 申报演进',
            caption: '基于 800+ 页中国卫星应用大会归档资料与海外卫星数据库，量化 Ka/Ku/V 频段轨位竞争格局。',
          },
          {
            slideNumber: '58 / 72',
            heading: '商业模式闭环与市场渗透率敏感性测算',
            caption: '拆解偏远地区宽带接入、海事航空高价值专线与运营商漫游分成的盈亏平衡点。',
          },
        ],
      },
      {
        id: 'vis-iqvia',
        code: 'DECK_002 / 医药策略与传播定位',
        title: '舒洛地特跨科室机会点诊断与三套传播概念测试报告',
        category: '医疗咨询策略 Deck · 挖掘 7 倍转化高潜人群',
        year: '2025',
        summary:
          '结合 200+ 份医生定量问卷（交叉列联表与双尾显著性检验）及 7+ 位临床专家深访，梳理血管外科、内分泌科、肾内科主流用药格局与处方壁垒。',
        slideCount: '36 SLIDES',
        keyTakeaway:
          '用严谨的双尾显著性检验识别科室认知差异，将 720 维 NLP 问卷特征浓缩为清晰的科室级产品定位与核心传播卖点。',
        slidesPreview: [
          {
            slideNumber: '06 / 36',
            heading: '三科室疾病领域与主流用药竞争格局',
            caption: '血管外科、内分泌科与肾内科在微血管病变治疗路径上的临床指南与处方习惯对比。',
          },
          {
            slideNumber: '18 / 36',
            heading: '交叉列联表与双尾显著性检验：7 倍高潜人群画像',
            caption: '定位认知壁垒最低、处方转化弹性最高的核心医生细分群体（7x Conversion Potential）。',
          },
          {
            slideNumber: '29 / 36',
            heading: '三套传播概念测试与科室级沟通优先级',
            caption: '针对不同科室痛点定制差异化学术沟通证据链与核心卖点矩阵。',
          },
        ],
      },
      {
        id: 'vis-ey-esg',
        code: 'DECK_003 / 商业挑战赛全国一等奖路演',
        title: '物流行业绿色供应链与数智化碳管理平台战略方案',
        category: '安永（EY）聚能创变挑战赛 · 全国一等奖路演 Deck',
        year: '2023',
        summary:
          '深度对比国内外头部物流企业 ESG 披露现状，运用“议题实质性评估矩阵”对齐多元利益相关方，设计本土化评估体系与绿色金融赋能方案。',
        slideCount: '28 SLIDES',
        keyTakeaway:
          '从碳排放核算标准不统一的行业真痛点切入，构建“实质性矩阵—数智碳平台—绿色金融产品”三层落地闭环。',
        slidesPreview: [
          {
            slideNumber: '04 / 28',
            heading: '国内外物流巨头 ESG 披露对标与核算痛点',
            caption: '以京东物流等为标杆，剖析范围一至范围三（Scope 1–3）排放边界与数字化追踪盲区。',
          },
          {
            slideNumber: '13 / 28',
            heading: '议题实质性评估矩阵 (Materiality Matrix)',
            caption: '横轴量化商业财务影响，纵轴评估监管、客户与社会公众诉求优先级。',
          },
          {
            slideNumber: '22 / 28',
            heading: '数智化碳管理平台与绿色金融产品协同路线图',
            caption: '打通底层车队能耗数据采集、标准化碳核算与绿色信贷激励机制。',
          },
        ],
      },
    ],

    mediaWorks: [
      {
        id: 'media-bie-01',
        slug: 'bie-youth-culture-editorial',
        code: 'ARTICLE_001 / BIE 别的',
        title: '百万粉丝新媒体「BIE 别的」深度选题策划与 10w+ 爆文创作',
        platform: 'BIE 别的 · 微信公众号 / 青年文化纪实',
        year: '2024 — 2025',
        role: '编辑部实习生（全国仅 2 人） / 撰稿与策划',
        metricHighlight: {
          value: '10w+',
          unit: '多篇深度推文阅读量',
        },
        cover: IMG_MUSIC,
        summary:
          '作为全国仅录取 2 人的编辑部实习生，在百万粉丝级新媒体平台负责账号日常运营、深度选题策划与独立撰稿，持续输出多篇阅读量破 10w+ 的青年文化与社会观察爆文。',
        lifeStory:
          '在写代码与跑回归之外，文字是我触摸真实世界的另一种方式。在「BIE 别的」编辑部的日子里，我学会了如何倾听具体的人、具体的生活细节，并在宏大叙事之外保留个体真实的呼吸感。',
        creativeProcess:
          '从海量社媒线索与田野采访中捕捉未被充分讨论的青年文化切面，历经多轮选题会打磨叙事弧线，结合极具辨识度的视觉排版完成高传播度内容交付。',
        targetAudience:
          '关注青年文化、城市生活、独立艺术与社会议题的百万级年轻读者群体。',
        originalUrl: '#media-case-bie',
      },
      {
        id: 'media-campus-02',
        slug: 'shanghai-women-talent-community',
        code: 'CAMPAIGN_002 / 社群与校园媒体',
        title: '600+ 规模上海女性人才社群运营 & 校园新媒体视觉专栏',
        platform: '上海女性人才社群 / 同济经管与新生院新媒体',
        year: '2022 — 2025',
        role: '社群统筹 / 推文撰写 / 活动策划 / 视频剪辑',
        metricHighlight: {
          value: '600+',
          unit: '核心社群规模 & 政企合作',
        },
        cover: IMG_SHANGHAI,
        summary:
          '统筹 600+ 规模上海女性人才社群的政企合作与线下课程推进；并在同济大学经管学生会联络部、新生院团工委学术部担任骨干，全面负责推文撰写、大型活动策划与视频剪辑。',
        lifeStory:
          '无论是把 600 多位不同行业背景的女性连接在一起，还是在深夜剪辑一支校园活动回顾短片，最打动我的始终是人与人之间在现场产生的真实连接。',
        creativeProcess:
          '结合政企合作资源与社群成员成长需求，设计系列线下工作坊与专题推文，用温暖清晰的视觉与文字建立长期社群信任。',
        targetAudience:
          '上海青年职业女性、高校学生群体及政企合作伙伴。',
        originalUrl: '#media-case-community',
      },
    ],

    writings: [
      {
        id: 'write-01',
        slug: 'from-central-bank-texts-to-nonlinear-regimes',
        index: '01',
        title: '当大语言模型读懂央行措辞：从 640 万字政策语料到非线性外汇压力建模',
        year: '2026',
        date: '2026.04',
        category: 'AI Thinking',
        place: 'Hong Kong',
        excerpt:
          '在毕业论文中处理 80 篇货币政策报告与 1,526 篇官员讲话后，我开始重新思考：如何用工程约束把生成式模型变成严谨的计量经济学工具？',
        readTime: '6 分钟阅读',
        content: [
          '在传统的金融计量研究中，文本往往被简化为正负情感词频的加总。但任何读过央行货币政策执行报告的人都知道，真正的信号藏在极其克制的修饰语、语境转折与跨期对比之中。',
          '为了解决央行官网缺乏统一接口且早期文档多为扫描或附件 PDF 的问题，我搭建了网页与 PDF 双路径采集管线：当网页正文不足 100 字时自动回退解析附件，最终沉淀下约 640 万中文字符的干净语料。随后通过 LDA 主题模型（K=39）提纯出 454 篇汇率核心文档。',
          '最关键的一步是调用 DeepSeek API 进行结构化赋分。为了让 LLM 的输出具备计量经济学要求的稳定性，我设计了严格的领域锚点、JSON 结构约束以及解析失败自动重试机制，提取连续型政策情绪与分类型引导方向。当这些信号进入 240 期月度外汇市场压力指数（EMP）的 LSTR1 非线性平滑转换模型时，模型 R² 从线性基准的 0.065 跃升至 0.157。这让我确信：AI 与数理金融最好的结合点，在于用结构化工程驯服概率生成。',
        ],
      },
      {
        id: 'write-02',
        slug: 'notes-between-shanghai-and-hongkong',
        index: '02',
        title: '双城记：从同济梧桐院落到港大薄扶林海雾的学科迁徙',
        year: '2026',
        date: '2026.03',
        category: 'Place Note',
        place: 'Shanghai',
        excerpt:
          '五年数理金融与计算机科学的交织，以及在滴滴、意略明、民生证券与「BIE 别的」编辑部之间切换视角的成长手记。',
        readTime: '5 分钟阅读',
        content: [
          '回看过去几年的轨迹，我似乎一直在两种看似遥远的语境之间往返：一边是数理金融的公理推导、10ms 级高频订单簿（LOB）的实时流和 DuckDB 里的几千万行交易明细；另一边则是「BIE 别的」编辑部里的长文叙事、二次元谷圈田野调查里的社群黑话，以及上海女性社群线下相聚时的笑声。',
          '但当我真正开始独立构建系统时，我发现这两条线索早已合流。在意略明搭建 NLP 问卷流水线时，对医生处方习惯的定性共情帮我设计出了更准确的 720 维特征映射字典；在滴滴分析拉美 99Food 市场时，巴西 IBGE 枯燥的地理编码背后是圣保罗街头真实的骑手与商户生态。',
          '从同济经管学院走向香港大学计算机科学系，我越来越相信：技术决定了系统的下限，而对人、城市与真实语境的理解，决定了我们为什么要建造这个系统。',
        ],
      },
      {
        id: 'write-03',
        slug: 'causal-uplift-and-why-correlation-is-not-action',
        index: '03',
        title: '从相关性到因果增量：为什么经营诊断需要 Shapley 与 Uplift 建模',
        year: '2026',
        date: '2026.08',
        category: 'Literature Review',
        excerpt:
          '在完成 CommerceIQ 项目的 4,578 万条零售明细建模后，关于多维归因与 S/T-Learner 增量响应的读书与实践笔记。',
        readTime: '5 分钟阅读',
        content: [
          '在商业分析中，我们最常遇到的两个陷阱是：把多因素共同导致的指标异动归咎于单一维度，以及把“本来就会购买的高意向用户”当成营销活动的功劳。',
          '在 CommerceIQ 项目中，面对月度 GMV 下滑 12.43% 的真实案例，我引入了合作博弈论中的 Shapley 值分解，严格量化出“购买人数变化”解释了净下降的 74.7%，从而避免了在客单价或频次上盲目发力。而在 X5 RetailHero 的 4,578 万条购买明细上，通过构建 S-Learner 与 T-Learner 增量模型，我们在独立测试集 Top 30% 人群中实现了 6.24pp 的真实购买率净提升。',
          '无论是宏观汇率政策评估还是微观零售促活，底层的方法论始终相通：尊重反事实推断，区分自然趋势与干预增量。',
        ],
      },
    ],

    photography: [
      {
        id: 'photo-hk-01',
        title: '晨雾中的维多利亚港与天星小轮',
        place: 'Hong Kong',
        placeDisplay: '香港 · HONG KONG',
        coordinates: '22.3193° N, 114.1694° E',
        date: '2026.09',
        year: 2026,
        image: IMG_HK,
        aspectRatio: '3:4',
        rotationDeg: 1.2,
        caption: '在香港大学开启计算机科学硕士阶段，清晨前往薄扶林前在海雾中记录下的维港轮廓。',
        cameraNote: '50mm 焦段 · 自然晨光 · 纪实胶片质感',
      },
      {
        id: 'photo-shanghai-01',
        title: '梧桐光影下的上海街巷',
        place: 'Shanghai',
        placeDisplay: '上海 · SHANGHAI',
        coordinates: '31.2304° N, 121.4737° E',
        date: '2025.10',
        year: 2025,
        image: IMG_SHANGHAI,
        aspectRatio: '4:3',
        rotationDeg: -1.1,
        caption: '同济求学与实习下班后的傍晚，阳光穿过法桐枝叶落在安静的砖石立面上。',
        cameraNote: '35mm 焦段 · 午后斜阳 · 胶片色调',
      },
      {
        id: 'photo-tokyo-01',
        title: '雨夜街角的暖色灯影',
        place: 'Tokyo',
        placeDisplay: '东京 · TOKYO',
        coordinates: '35.6762° N, 139.6503° E',
        date: '2026.04',
        year: 2026,
        image: IMG_TOKYO,
        aspectRatio: '4:3',
        rotationDeg: -0.7,
        caption: '阵雨过后的安静街巷，湿润路面折射出暖琥珀色的灯笼微光。',
        cameraNote: '35mm 焦段 · f/2.0 · 暮色暗调',
      },
    ],

    places: [
      {
        id: 'place-hk',
        name: 'Hong Kong',
        displayName: '香港 · HONG KONG',
        coordinates: '22.3193° N',
        period: '2026 — 今',
        chapterNote: 'CHAPTER I — 港大计算与数据科学、海雾山城与粤语日常',
        memoryFragment:
          '从薄扶林道走向海边的坡道，课堂上的大语言模型、自然语言处理与交易机器学习，以及穿梭在双层电车叮叮声里的思考时刻。',
      },
      {
        id: 'place-shanghai',
        name: 'Shanghai',
        displayName: '上海 · SHANGHAI',
        coordinates: '31.2304° N',
        period: '2021 — 2026',
        chapterNote: 'CHAPTER II — 同济数理金融、四段核心实习与新媒体编辑部',
        memoryFragment:
          '在同济度过的本科岁月，在滴滴 IBG、意略明、民生证券与「BIE 别的」编辑部之间奔走的充实四季，以及进博会、白玉兰奖与女性人才社群的温暖现场。',
      },
      {
        id: 'place-tokyo',
        name: 'Tokyo',
        displayName: '东京 · TOKYO',
        coordinates: '35.6762° N',
        period: '旅途与观察',
        chapterNote: 'CHAPTER III — 城市漫游、影像切片与亚文化田野观察',
        memoryFragment:
          '带着相机与观察笔记穿行于书店、唱片行与安静街巷，感受器物细节、平面视觉与青年亚文化的流动。',
      },
    ],

    volunteering: [
      {
        id: 'vol-shanghai-women',
        title: '600+ 规模上海女性人才社群统筹与政企合作推进',
        organization: '上海女性人才社群',
        location: '上海',
        dates: '2024 — 2025',
        whatICaredAbout: '让不同职业阶段的女性在城市中拥有彼此支持、持续成长的真实社群网络。',
        description:
          '统筹 600+ 规模上海女性人才社群的政企合作对接与线下课程落地，负责专题活动策划、跨界嘉宾沟通与社群内容运营。',
      },
      {
        id: 'vol-summits',
        title: '进博会、上海白玉兰奖与浦江创新论坛大型峰会协调',
        organization: '中国国际进口博览会 / 上海白玉兰奖 / 浦江创新论坛',
        location: '上海',
        dates: '2022 — 2025',
        whatICaredAbout: '在国际级学术、文化与经贸交流现场，用细致严谨的沟通保障跨文化对话。',
        description:
          '担任进博会外宾接待、上海白玉兰奖评奖部协调员、浦江创新论坛注册报到统筹，发挥雅思 7.5 英语与多语沟通优势服务高规格现场。',
      },
      {
        id: 'vol-rural-campus',
        title: '乡村支教公益志愿 & 同济经管/新生院学生骨干、普华永道 LEAPer',
        organization: '乡村公益支教 / 同济大学经管学生会 & 新生院团工委 / PwC LEAPer',
        location: '上海及支教地',
        dates: '2021 — 2025',
        whatICaredAbout: '走出书斋与屏幕，把知识、视野与陪伴带到更需要光亮的基层课堂与校园社群。',
        description:
          '参与乡村公益基层支教志愿活动；入选普华永道 LEAPer 项目；担任同济大学经管学生会联络部、新生院团工委学术部骨干成员，负责推文撰写、学术与文化活动策划及视频剪辑。',
      },
    ],

    lifeMoments: [
      {
        id: 'moment-01',
        label: '香港大学 · 薄扶林与维港晨雾',
        location: 'Hong Kong',
        date: '2026',
        image: IMG_HK,
        note: '从数理金融迈入计算机科学硕士，在海风与山城步道间开启新的系统构建之旅。',
      },
      {
        id: 'moment-02',
        label: 'BIE 别的编辑部 · 10w+ 爆文背后的田野倾听',
        location: 'Shanghai',
        date: '2024 — 2025',
        image: IMG_MUSIC,
        note: '作为百万粉丝新媒体全国仅招 2 人的编辑部实习生，用文字记录青年文化的真实脉搏。',
      },
      {
        id: 'moment-03',
        label: '同济岁月与上海梧桐街巷',
        location: 'Shanghai',
        date: '2021 — 2026',
        image: IMG_SHANGHAI,
        note: '在数学建模、高频数据实验与 600+ 女性社群活动之间，保持对生活细节的热爱。',
      },
    ],
  },

  en: {
    profile: {
      name: 'FLORA YEUNG (杨蕊嘉)',
      englishName: 'FLORA YEUNG',
      systemHeroHeadline: 'I build systems around data, intelligence and interaction.',
      systemTrajectory: 'MATHEMATICAL FINANCE (TONGJI) → COMPUTER SCIENCE (HKU)',
      institutionTag: 'HKU / TONGJI · 2026',
      lifeLandingHeadline: "Things I've seen, made, kept, and cared about.",
      email: 'yrjzcm@foxmail.com',
      phone: '(+86) 13367811933',
      github: 'https://github.com/florayeung-archive',
      linkedin: 'https://linkedin.com/in/florayeung',
      location: 'Hong Kong · Shanghai',
      skillsSummary: {
        programming:
          'Python (Pandas, Scikit-learn, NumPy), SQL, DuckDB, C#, R, Spark (ML, DataFrames), HDFS/MapReduce, LaTeX, QGIS, HTML/CSS',
        mlAndNlp:
          'Machine Learning (XGBoost, RF, SVM, GBDT) · NLP (Prompt Engineering, LLM API, RAG, BERTopic, LDA) · Quant Data (High-Freq LOB, Feature Engineering, Nonlinear Econometrics)',
        languages: 'Mandarin (Native) · English (IELTS 7.5) · Cantonese (Conversational)',
      },
    },

    education: [
      {
        id: 'edu-hku',
        year: '2026.09 — Present',
        institution: 'THE UNIVERSITY OF HONG KONG (HKU)',
        degree: 'MSc in Computer Science',
        major: 'School of Computing and Data Science',
        location: 'Hong Kong',
        selectedCoursework: [
          'Data Mining',
          'Computational Intelligence & Machine Learning',
          'Machine Learning in Trading and Finance',
          'Natural Language Processing',
          'Large Language Models',
          'Advanced Data Science & Big Data Management',
        ],
        focusAreas: ['Large Language Models & NLP', 'ML in Trading & Finance', 'Scalable Data Mining'],
        narrativeStep: 'Computer Science → AI Systems',
      },
      {
        id: 'edu-tongji',
        year: '2021.09 — 2026.06',
        institution: 'TONGJI UNIVERSITY',
        degree: 'Bachelor of Economics in Mathematical Finance',
        major: 'School of Economics and Management',
        gpaOrRank: 'GPA 4.51 / 5.0 (Top 30%)',
        location: 'Shanghai',
        selectedCoursework: [
          'Mathematical Analysis & Advanced Algebra',
          'Probability Theory & Mathematical Statistics',
          'Econometrics & Mathematical Modeling',
          'Python & Database Systems',
          'Corporate Finance & Investments',
          'Micro & Macroeconomics',
        ],
        focusAreas: ['Nonlinear Econometrics', 'Quantitative Feature Engineering', 'Statistical Modeling'],
        narrativeStep: 'Finance → Quantitative Thinking → Programming',
      },
    ],

    educationMigrationSteps: [
      {
        step: '01',
        domain: 'Finance',
        detail: 'Built rigorous foundations in market microstructure, corporate finance, and macro FX dynamics at Tongji University.',
      },
      {
        step: '02',
        domain: 'Quantitative Thinking',
        detail: 'Translated complex economic dynamics into stochastic hypotheses, nonlinear econometrics, and mathematical models.',
      },
      {
        step: '03',
        domain: 'Programming',
        detail: 'Engineered reproducible data pipelines with Python, SQL, DuckDB, Spark, and real-time WebSocket streams.',
      },
      {
        step: '04',
        domain: 'Computer Science',
        detail: 'Pursuing MSc in Computer Science at HKU to master scalable algorithms, big data architectures, and system design.',
      },
      {
        step: '05',
        domain: 'AI',
        detail: 'Bridging LLMs, NLP signal extraction, and causal uplift modeling with human-centric decision systems.',
      },
    ],

    experiences: [
      {
        id: 'exp-didi',
        year: '2025.12 — 2026.04',
        company: 'DIDI GLOBAL (International Business Group - IBG)',
        role: 'Strategic Analytics Intern',
        location: 'Shanghai',
        context:
          'Monitored DiDi 99Food operations across Latin America, architecting city-tier mapping databases, B/C-side BI dashboards, and competitor teardowns to drive regional expansion.',
        responsibilities: [
          'LatAm Food Delivery Monitoring & Geospatial Data Cleaning: Processed 5,000+ raw Brazilian IBGE geospatial records using SQL, Python, and Excel to rebuild the city-level mapping database supporting tier monitoring and regional strategy.',
          'B/C-Side Dashboards & Market Sizing: Built 2 core dashboards—tracking merchant-tier (KA/CKA) GMV and Market Share (MS) with CNPJ/CERC data on the B-side, and analyzing DAU/AOV/WAU with Klavi transaction data and QGIS spatial heatmaps on the C-side.',
          'Competitor Teardown & Localized Growth: Deconstructed fulfillment models, take-rate structures, and B/C/D strategies of iFood and Keeta alongside local LatAm teams.',
        ],
        results: [
          'Contributed to a +6pp Market Share (MS) increase in São Paulo during tenure.',
          'Supported business expansion into 10+ new cities across Latin America with data-backed strategy.',
        ],
        metrics: [
          {
            value: '+6pp',
            label: 'SÃO PAULO MARKET SHARE GAIN',
            context: 'Supported expansion into 10+ new LatAm cities for DiDi 99Food',
          },
          {
            value: '5,000+',
            label: 'BRAZIL IBGE GEOSPATIAL RECORDS CLEANED',
            context: 'Powered city-tier mapping & B/C-side QGIS / GMV dashboards',
          },
        ],
      },
      {
        id: 'exp-iqvia',
        year: '2025.08 — 2025.12',
        company: 'ILLUMINERA (Wholly-Owned Subsidiary of IQVIA)',
        role: 'Strategic Analytics Intern, CBD Practice',
        location: 'Shanghai',
        context:
          'Combined automated NLP survey pipelines with quantitative hypothesis testing to uncover prescription barriers, high-potential physician segments, and cross-department positioning.',
        responsibilities: [
          'Automated Survey NLP Pipeline: Independently engineered a Regex + One-Hot encoding pipeline to clean 12 open-ended medical survey sets containing typos and clinical abbreviations into a 720-feature binary matrix, backed by a dictionary of 30+ drug classes and 60+ synonym rules.',
          'Statistical Testing & Expert Interviews: Analyzed 200+ physician questionnaires via contingency tables and two-tailed significance tests alongside 7+ in-depth expert interviews to identify prescription barriers.',
          'Cross-Department Positioning Strategy: Conducted desk research across Vascular Surgery, Endocrinology, and Nephrology for Sulodexide, testing 3 communication concepts to define department-specific positioning.',
        ],
        results: [
          'Dramatically compressed manual medical survey coding turnaround time.',
          'Identified a high-potential physician segment with 7x conversion potential and delivered the cross-department opportunity report.',
        ],
        metrics: [
          {
            value: '720-Dim',
            label: 'AUTOMATED BINARY FEATURE MATRIX',
            context: '30+ drug categories & 60+ medical synonym/typo mapping rules',
          },
          {
            value: '7x',
            label: 'HIGH-POTENTIAL SEGMENT CONVERSION LIFT',
            context: 'Validated across 200+ physician surveys & two-tailed tests',
          },
        ],
      },
      {
        id: 'exp-minsheng',
        year: '2024.09 — 2025.02',
        company: 'MINSHENG SECURITIES CO., LTD.',
        role: 'Equity Research Intern, Telecom Team (New Fortune Finalist Team)',
        location: 'Shanghai',
        context:
          'Conducted deep-dive industry research on LEO satellite internet, maintained global satellite company databases, and supported institutional client due diligence.',
        responsibilities: [
          'In-Depth Satellite Internet Report: Independently authored a 70+ page PPT deep-dive report benchmarking SpaceX and AST SpaceMobile across technical moats, business models, and market penetration.',
          'Global Satellite Database & Weekly Tracking: Built a dynamic overseas satellite enterprise database and led the standardization of 800+ pages of China Satellite Application Conference materials; tracked launch frequency bands and FCC filings to publish 21 weekly briefs and 8 flash commentaries.',
          'Institutional Client Service: Participated in corporate conference calls, authored minutes, reached clients via 3,000+ targeted messages, and facilitated data service engagements with 5 institutional clients.',
        ],
        results: [
          'Over 60% of core data charts from the 70+ page report were adopted by the team, directly supporting due diligence for 3 institutional clients.',
        ],
        metrics: [
          {
            value: '>60%',
            label: 'CORE CHART ADOPTION IN 70+ PAGE REPORT',
            context: 'Supported due diligence for 3 institutional clients',
          },
          {
            value: '800+ Pgs',
            label: 'STANDARDIZED ARCHIVE & 29 RESEARCH NOTES',
            context: '21 weekly sector briefs + 8 independent flash commentaries',
          },
        ],
      },
      {
        id: 'exp-bie',
        year: '2024 — 2025',
        company: 'BIE别的 (1M+ Follower Youth Culture Editorial Media)',
        role: 'Editorial Intern (1 of only 2 selected nationwide)',
        location: 'Shanghai',
        context:
          'Spearheaded topic curation, long-form cultural writing, and account operations at one of China’s most influential youth culture and documentary media platforms.',
        responsibilities: [
          'Pitched and wrote long-form features examining youth subcultures, urban life, and contemporary social topics.',
          'Managed editorial cadence, visual storytelling, and reader community engagement across flagship accounts.',
        ],
        results: [
          'Selected as 1 of only 2 interns nationwide; authored and produced multiple viral articles exceeding 100k+ organic reads.',
        ],
        metrics: [
          {
            value: '100k+',
            label: 'READS ACROSS MULTIPLE VIRAL FEATURES',
            context: '1M+ follower media platform (only 2 editorial interns nationwide)',
          },
        ],
      },
    ],

    projects: [
      {
        id: 'proj-fx-llm',
        slug: 'llm-fx-policy-econometrics',
        code: 'PROJECT_001 / 2026 / AI × ECONOMETRICS',
        title: 'LLM-Driven FX Policy Text Quantification & Nonlinear Econometric Modeling',
        year: '2025.12 — 2026.05',
        crossDomainLabel: 'LLM × NLP × NONLINEAR ECONOMETRICS',
        categories: ['AI', 'Systems'],
        status: 'THESIS RESEARCH PROJECT',
        featured: true,
        oneLine:
          'An end-to-end research pipeline connecting heterogeneous central bank text ingestion, LDA filtering, DeepSeek API structured sentiment scoring, EMP index construction, and LSTR1 nonlinear regime modeling.',
        problem:
          'Central bank portals lack unified structured APIs, dictionary methods fail to capture nuanced FX forward guidance, and linear regressions obscure asymmetric policy effects across calm vs. high-stress market regimes.',
        idea:
          'Build a dual-path HTML/PDF ingestion pipeline over 6.4M Chinese characters, filter via LDA (K=39), extract JSON-constrained continuous policy tone via DeepSeek API, and model regime shifts using LSTR1.',
        role: 'Lead Researcher (Data Engineering, LLM Signal Extraction & Nonlinear Econometrics)',
        stack: ['Python', 'DeepSeek API (JSON Schema)', 'LDA Topic Model', 'LSTR1 Nonlinear Regression', 'Granger Causality'],
        results: [
          'Parsed 80 monetary policy reports and 1,526 official speeches totaling ~6.4 million Chinese characters.',
          'Constructed a 240-month Exchange Market Pressure (EMP) index and lifted model R² from 0.065 to 0.157 via LSTR1 regime identification.',
        ],
        highlights: [
          'Dual-path HTML/PDF crawler with automatic PDF attachment fallback when body text < 100 chars',
          'LDA (K=39) filtering 454 FX-relevant documents + domain-anchored DeepSeek API JSON extraction',
          '6 robustness checks + Granger causality & exogenous DTWEXBGS transition sensitivity tests',
        ],
        cover: IMG_HK,
        screenshots: [IMG_HK, IMG_SHANGHAI],
        liveUrl: '#case-study-fx-llm',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          'Engineered an HTML+PDF fallback parser for 6.4M characters of central bank texts; filtered 454 FX documents via LDA (K=39); invoked DeepSeek API with domain anchors, JSON schema constraints, and retry logic; modeled a 240-period monthly EMP index with LSTR1, boosting R² from 0.065 to 0.157.',
        personalStory:
          'As my bridge from Mathematical Finance into Computer Science, this thesis proved to me that LLMs are not just conversational chatbots—with strict schema constraints, they become rigorous econometric measurement instruments.',
        caseStudy: {
          overview:
            'This study quantifies unstructured central bank communication using topic modeling and Large Language Models, evaluating its nonlinear, regime-dependent impact on Exchange Market Pressure (EMP).',
          problem:
            'Historical central bank archives mix short HTML notices with PDF attachments; policy language is subtle; and FX markets respond nonlinearly under varying stress regimes.',
          idea:
            'Chain automated ingestion, LDA topic purification, schema-constrained LLM scoring, and Logistic Smooth Transition Regression (LSTR1).',
          userExperience:
            'Fault-tolerant batch extraction pipeline with automated JSON validation, retry mechanisms, and reproducible econometric output tables.',
          myRole:
            'Independently designed and executed the crawler, LDA filter, DeepSeek API prompt engineering, EMP index synthesis, and LSTR1 estimation.',
          architecture:
            'Dual-Path Scraper (80 Reports + 1,526 Speeches / 6.4M Chars) → LDA (K=39, 454 Docs) → DeepSeek API Structured Scoring → 240-Period EMP Index & LSTR1 Model.',
          technology: ['Python', 'DeepSeek API', 'LDA', 'LSTR1 Econometrics', 'Granger Causality'],
          result:
            'LSTR1 nonlinear modeling increased explanatory power (R²) from 0.065 to 0.157 across distinct market pressure regimes.',
          evaluation:
            'Verified across 6 robustness specifications, controlling for FX inertia and testing exogenous DTWEXBGS transition variables.',
          reflection:
            'In quantitative social science, the value of an LLM lies in deterministic constraints that turn probabilistic text understanding into auditable statistical signals.',
        },
      },
      {
        id: 'proj-commerce-iq',
        slug: 'commerce-iq-uplift-diagnostics',
        code: 'PROJECT_002 / 2026 / DATA × UPLIFT ML',
        title: 'CommerceIQ E-Commerce Anomaly Diagnostics & Uplift Marketing Analytics',
        year: '2026.08 — 2026.09',
        crossDomainLabel: 'CAUSAL UPLIFT × SHAPLEY ATTRIBUTION × BI',
        categories: ['AI', 'Systems'],
        status: 'INDEPENDENT DATA SCIENCE PROJECT',
        featured: true,
        oneLine:
          'End-to-end e-commerce intelligence combining Olist (100k orders) Shapley GMV anomaly attribution with X5 RetailHero (45.78M transactions) S/T-Learner causal uplift modeling.',
        problem:
          'When monthly GMV drops sharply, standard dashboards fail to isolate root causes; meanwhile, blanket retention campaigns waste budget on sure-things rather than persuadable users.',
        idea:
          'Integrate 9 tables via SQL & DuckDB with 16 data quality checks; decompose the -12.43% GMV drop via Shapley values; and train S/T-Learner uplift models over 45.78M purchase records.',
        role: 'Independent Creator (Data Warehouse, Shapley Attribution, 6-Page BI Dashboard & Uplift Modeling)',
        stack: ['SQL', 'Python', 'DuckDB', 'Shapley Attribution', 'S/T-Learner Uplift', 'RFM / Cohort'],
        results: [
          'Quantified via Shapley decomposition that buyer count contraction accounted for 74.7% of the -12.43% monthly GMV decline.',
          'Trained S/T-Learner models on 200k customers and 45.78M records, achieving a +6.24pp purchase rate lift between treatment and control in the top 30% test cohort.',
        ],
        highlights: [
          'DuckDB warehouse integrating 9 Olist tables (100k orders) with 16 automated quality checks',
          'Shapley value decomposition + 6-page interactive RFM/Cohort & merchant retention dashboard',
          'Causal S/T-Learner uplift evaluation on 45.78M rows with strict 60%/20%/20% train/val/test split',
        ],
        cover: IMG_MEDICATION,
        screenshots: [IMG_MEDICATION, IMG_TOKYO],
        liveUrl: '#case-study-commerce-iq',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          'Consolidated 9 tables (~100k orders) via SQL/Python/DuckDB with 16 quality validations; applied Shapley decomposition to a -12.43% GMV drop (isolating 74.7% impact from active buyer decline); aggregated 45.78M X5 RetailHero records to train S/T-Learners, yielding a +6.24pp treatment-vs-control lift in the top 30% test segment.',
        personalStory:
          'My strategy analytics internships taught me that business teams need two things connected: a diagnostic lens explaining why a metric moved, and a causal lens prescribing who to target next.',
        caseStudy: {
          overview:
            'CommerceIQ unifies e-commerce anomaly attribution, user/merchant cohort retention, and causal uplift modeling into a cohesive decision framework.',
          problem:
            'Diagnosing a 12.43% monthly GMV drop requires disentangling multiplicative drivers (buyers × frequency × AOV), while optimizing marketing ROI requires estimating incremental treatment effects.',
          idea:
            'Pair game-theoretic Shapley attribution and multi-dimensional drill-downs with meta-learner causal uplift models (S-Learner & T-Learner).',
          userExperience:
            'A 6-page interactive dashboard enabling trend monitoring, region/category/merchant anomaly drill-downs, and marketing ROI scenario simulation.',
          myRole:
            'Designed the DuckDB schema, 16 quality checks, Shapley attribution logic, 6-page BI dashboard, and S/T-Learner uplift pipeline.',
          architecture:
            'Olist 9 Tables (100k Orders) & X5 RetailHero (45.78M Rows) → DuckDB Aggregation & 16 Quality Gates → Shapley Attribution & 6-Page Dashboard → S/T-Learner Uplift Ranking.',
          technology: ['DuckDB', 'Python', 'SQL', 'Shapley Attribution', 'Causal Uplift (S/T-Learner)', 'RFM & Cohort Analysis'],
          result:
            'Pinpointed buyer count as 74.7% of the net GMV decline and achieved a 6.24pp incremental conversion lift in the top 30% uplift test group.',
          evaluation:
            'Validated GMV decline directions across equal-length windows, day-of-week structures, and order statuses; evaluated uplift strictly on a held-out 20% test split.',
          reflection:
            'Descriptive analytics tells you where you stood; causal uplift modeling tells you where your next intervention actually matters.',
        },
      },
      {
        id: 'proj-lob-hft',
        slug: 'high-frequency-lob-prediction',
        code: 'PROJECT_003 / 2025 / QUANT × MICROSTRUCTURE',
        title: 'High-Frequency Limit Order Book (LOB) Dynamic Modeling & Price Prediction',
        year: '2025.03 — 2025.06',
        crossDomainLabel: 'HIGH-FREQUENCY LOB × WEBSOCKET × ML',
        categories: ['AI', 'Systems'],
        status: 'INDEPENDENT QUANTITATIVE PROJECT',
        featured: true,
        oneLine:
          'Bypassing REST API latency via OKX WebSocket to ingest 10ms BTC-USDT depth ticks (50,000+ samples) for microstructure feature engineering and >90% accuracy short-horizon prediction.',
        problem:
          'REST polling misses millisecond order book dynamics, and naive backtests on high-frequency financial time series frequently suffer from look-ahead bias.',
        idea:
          'Stream 10ms order book updates directly via WebSocket, extract 5-level bid-ask spreads, order imbalance, and depth velocity, and evaluate ensemble classifiers under rolling windows.',
        role: 'Independent Developer (WebSocket Ingestion, Microstructure Features & Rolling Backtest)',
        stack: ['Python', 'OKX WebSocket API', 'SVM / AdaBoost / Random Forest / GBDT', 'GridSearchCV', 'Look-Ahead-Free Backtesting'],
        results: [
          'Constructed a clean dataset of 50,000+ valid 10ms-granularity BTC-USDT order book ticks.',
          'Achieved >90% average binary classification accuracy on 10-second horizons using 30-minute rolling GridSearchCV tuning and strict out-of-sample backtesting.',
        ],
        highlights: [
          'Real-time 10ms OKX WebSocket depth ingestion, JSON parsing, and CSV persistence',
          'Z-score standardized 5-level bid-ask spread, order imbalance, and depth change rate features',
          '30-minute rolling window tuning + 10-second test window with zero look-ahead bias',
        ],
        cover: IMG_TOKYO,
        screenshots: [IMG_TOKYO, IMG_HK],
        liveUrl: '#case-study-lob-hft',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          'Connected to OKX WebSocket API to capture 10ms BTC-USDT depth updates (50,000+ valid ticks); extracted Z-score normalized 5-level spreads, order book imbalance, and depth change rates; benchmarked SVM, AdaBoost, Random Forest, and GBDT with 30-min rolling GridSearchCV (>90% accuracy on 10s windows) and look-ahead-free signal simulation.',
        personalStory:
          'Building a millisecond WebSocket collector from scratch taught me where textbook stochastic processes meet real-world network jitter and market microstructure.',
        caseStudy: {
          overview:
            'An end-to-end high-frequency quantitative pipeline covering real-time limit order book capture, microstructure feature extraction, rolling hyperparameter optimization, and strict backtesting.',
          problem:
            'High-frequency crypto order books exhibit rapid regime shifts; static train-test splits leak future volatility information.',
          idea:
            'Combine 5-level order book imbalance kinematics with a rolling 30-minute training/tuning window and a strictly isolated 10-second prediction horizon.',
          userExperience:
            'Automated stream logger, rolling evaluation pipeline, and multi-regime signal simulation outputs.',
          myRole:
            'Sole engineer responsible for WebSocket streaming, feature engineering, model benchmarking, and backtest isolation.',
          architecture:
            'OKX WebSocket (10ms Depth) → 50,000+ Tick Dataset → 5-Level Microstructure Features (Z-score) → 30m Rolling GridSearchCV (SVM/AdaBoost/RF/GBDT) → 10s Horizon Backtest.',
          technology: ['Python', 'WebSocket API', 'Scikit-learn', 'GBDT', 'Random Forest', 'Market Microstructure'],
          result:
            'Over 90% average classification accuracy on 10-second price movement windows with verified stability across distinct market sessions.',
          evaluation:
            'Tested across multiple BTC-USDT volatility regimes with strict train/test boundary isolation to prevent look-ahead bias.',
          reflection:
            'In quantitative modeling, preventing data leakage is far more decisive than chasing marginal in-sample accuracy.',
        },
      },
      {
        id: 'proj-acg-bertopic',
        slug: 'acg-consumer-mining-bertopic',
        code: 'PROJECT_004 / 2025 / NLP × CONSUMER',
        title: 'ACG Subculture Consumer Behavior Modeling & Data Mining',
        year: '2025.03 — 2025.05',
        crossDomainLabel: 'BERTOPIC NLP × ECONOMETRICS × OMNICHANNEL',
        categories: ['AI', 'Interactive'],
        status: 'MUNICIPAL-LEVEL RESEARCH PROJECT',
        featured: true,
        oneLine:
          'Combining BERTopic unsupervised NLP over 19,940 social media posts with econometric regression across 817 stratified survey responses to decode subculture consumption.',
        problem:
          'ACG merchandise ("Gu-Quan") consumption is driven by community slang and emotional IP attachment that traditional surveys miss and pure text scraping cannot causally quantify.',
        idea:
          'Deploy Python crawlers to collect 19,940 social posts for BERTopic + HDBSCAN + c-TF-IDF topic discovery, then validate drivers via 817 stratified questionnaires and multiple regression.',
        role: 'Lead Researcher (Web Scraping, BERTopic Modeling, Survey Psychometrics & Regression)',
        stack: ['Python', 'BERTopic', 'HDBSCAN', 'c-TF-IDF', 'Cronbach α / KMO', 'Multiple Linear Regression'],
        results: [
          'Extracted multi-dimensional consumer pain points from 19,940 social media texts using BERTopic.',
          'Validated 817 effective survey responses (Cronbach’s α, KMO, Bartlett tests) and quantified IP & omnichannel drivers via multiple regression.',
        ],
        highlights: [
          '19,940 social media texts analyzed with BERTopic, HDBSCAN & c-TF-IDF',
          '817 stratified survey responses passing rigorous reliability and validity tests',
          'Actionable omnichannel retail strategy bridging online community trust and offline pop-ups',
        ],
        cover: IMG_MUSIC,
        screenshots: [IMG_MUSIC, IMG_SHANGHAI],
        liveUrl: '#case-study-acg-bertopic',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          'Scraped 19,940 social media posts and applied BERTopic (HDBSCAN + c-TF-IDF) for unsupervised pain-point extraction; designed a stratified survey yielding 817 valid samples (verified via Cronbach’s α, KMO, and Bartlett tests) and ran Pearson correlation and multiple linear regression.',
        personalStory:
          'Watching friends trade anime badges and acrylic stands made me curious about how digital subcultures build trust, value, and offline community spaces.',
        caseStudy: {
          overview:
            'A municipal-level research project blending modern neural topic modeling (BERTopic) with psychometric survey regression to understand youth ACG merchandise consumption.',
          problem:
            'Subculture jargon defeats standard keyword frequency tools, while brands lack quantitative evidence on how online fandom translates into offline retail conversion.',
          idea:
            'Let unsupervised NLP discover the latent pain points first, then ground those dimensions in a statistically rigorous stratified survey.',
          userExperience:
            'Clear topic cluster hierarchies, correlation matrices, and omnichannel operational blueprints.',
          myRole:
            'Led Python crawler deployment, BERTopic pipeline tuning, questionnaire design, psychometric validation, and regression modeling.',
          architecture:
            '19,940 Social Posts → BERTopic (HDBSCAN + c-TF-IDF) → 817 Stratified Surveys (Cronbach α / KMO) → Multiple Regression → Omnichannel Strategy.',
          technology: ['Python', 'BERTopic', 'HDBSCAN', 'c-TF-IDF', 'Econometric Regression'],
          result:
            'Quantified the link between IP attributes, online/offline touchpoints, and purchasing decisions.',
          evaluation:
            'Passed Cronbach’s α reliability, KMO sampling adequacy, and Bartlett’s sphericity tests prior to regression.',
          reflection:
            'Combining unstructured NLP with structured econometrics bridges the gap between cultural empathy and quantitative proof.',
        },
      },
      {
        id: 'proj-stirpat-carbon',
        slug: 'stirpat-carbon-digital-economy',
        code: 'PROJECT_005 / 2023 / ECONOMETRICS × ESG',
        title: 'Empirical Analysis of Dual-Carbon Goals & Digital Economy via STIRPAT',
        year: '2022.05 — 2023.04',
        crossDomainLabel: 'PANEL ECONOMETRICS × STIRPAT × GREEN ECONOMY',
        categories: ['Systems'],
        status: 'UNIVERSITY-LEVEL RESEARCH PROJECT',
        featured: false,
        oneLine:
          'Constructing a 14-indicator digital economy index on Shanghai macro panel data (2013–2021) to test carbon intensity reduction via STIRPAT regression and carbon-inclusion case studies.',
        problem:
          'While digital infrastructure consumes energy, industrial digitization improves efficiency—requiring empirical disaggregation to measure net urban carbon impact.',
        idea:
          'Aggregate 14 sub-indicators into a composite framework and 3 sub-sectors, run STIRPAT OLS regressions on Shanghai panel data, and benchmark Chengdu’s carbon-inclusion mechanism.',
        role: 'Core Researcher (Panel Feature Engineering, STIRPAT Regression & Policy Case Study)',
        stack: ['R / Python', 'STIRPAT Model', 'OLS Panel Regression', 'Index Construction', 'Low-Carbon Policy'],
        results: [
          'Empirically proved the significant negative (reducing) effect of Industrial Digitization on carbon emission intensity.',
          'Delivered a comprehensive report linking quantitative panel evidence, the Chengdu Carbon-Inclusion case, and Shanghai policy recommendations.',
        ],
        highlights: [
          'Shanghai macro panel dataset (2013–2021) aggregating 14 digital economy sub-indicators',
          'Disaggregated STIRPAT OLS regressions across composite and 3 sub-sector indices',
          'End-to-end chain from empirical econometrics to commercial carbon-inclusion mechanisms',
        ],
        cover: IMG_SHANGHAI,
        screenshots: [IMG_SHANGHAI],
        liveUrl: '#case-study-stirpat-carbon',
        githubUrl: 'https://github.com/florayeung-archive',
        technicalStory:
          'Processed Shanghai macroeconomic panel data (2013–2021), aggregating 14 sub-indicators into a digital economy evaluation framework; conducted OLS regressions based on the extended STIRPAT model to isolate the carbon-reducing impact of industrial digitization.',
        personalStory:
          'My earliest empirical research project at Tongji, exploring how a megacity like Shanghai can harmonize digital growth with decarbonization.',
        caseStudy: {
          overview:
            'An empirical environmental economics study evaluating how distinct dimensions of the digital economy influence urban carbon emission intensity in Shanghai.',
          problem:
            'Aggregate digital economy metrics mask heterogeneous effects between hardware energy consumption and industrial process optimization.',
          idea:
            'Decompose the digital economy into 14 indicators across 3 sub-pillars within a STIRPAT econometric framework and pair findings with real-world carbon credit case studies.',
          userExperience:
            'Structured empirical tables, elasticity comparisons, and policy implementation roadmaps.',
          myRole:
            'Handled panel data preprocessing, 14-indicator synthesis, STIRPAT OLS estimation, and comparative case writing.',
          architecture:
            'Shanghai Panel Data (2013–2021) → 14-Indicator Index → STIRPAT OLS Regression → Chengdu Carbon-Inclusion Case → Policy Blueprint.',
          technology: ['STIRPAT Model', 'OLS Regression', 'Panel Data Analysis', 'ESG Policy'],
          result:
            'Demonstrated statistically significant carbon intensity reduction driven by industrial digitization.',
          evaluation:
            'Cross-checked composite index vs. three sub-sector regressions for sign and significance consistency.',
          reflection:
            'Pairing econometric elasticity estimates with institutional case studies turns academic regressions into actionable urban policy.',
        },
      },
    ],

    competitions: [
      {
        id: 'comp-math',
        index: '01',
        year: '2022.07',
        name: 'National Undergraduate Mathematical Contest in Modeling (CUMCM)',
        organizer: 'CSIAM',
        teamSize: '3',
        role: 'STATISTICAL TESTING / NONLINEAR MODELING',
        result: 'NATIONAL 1ST PRIZE',
        ranking: 'TOP NATIONAL TIER',
        description:
          'Applied Shapiro-Wilk normality tests, paired t-tests, and Pearson correlation matrices; introduced Leave-One-Out Cross-Validation (LOOCV) to prevent small-sample overfitting, built a 3D normal distribution model (nlinfit), and executed constrained multi-objective nonlinear optimization via fmincon.',
      },
      {
        id: 'comp-ey',
        index: '02',
        year: '2023.05',
        name: 'EY University Innovation Challenge',
        organizer: 'Ernst & Young (EY)',
        teamSize: '4',
        role: 'CORE STRATEGY & PITCH DECK LEAD',
        result: 'NATIONAL 1ST PRIZE & REGIONAL TOP 4',
        ranking: 'NATIONAL CHAMPION',
        description:
          'Benchmarked JD Logistics and global peers on ESG disclosure pain points; applied a Materiality Assessment Matrix to align stakeholder demands and proposed localized evaluation frameworks, green finance products, and a digital carbon management platform.',
      },
      {
        id: 'comp-legaltech',
        index: '03',
        year: '2023.10',
        name: '1st LegalTech Product Innovation Design Competition',
        organizer: 'Tsinghua University & CCF',
        teamSize: '4',
        role: 'FULL-STACK ARCHITECTURE & NLP PIPELINE QA',
        result: 'NATIONAL 3RD PRIZE',
        ranking: 'NATIONAL TOP 20',
        description:
          'Co-developed a cloud moot court simulation platform (SpringBoot, MyBatis, MySQL) using DAG and stack structures for multi-path state backtracking; standardized real legal judgments and executed load & security testing via ApacheBenchmark, JMeter, and OWASP ZAP.',
      },
      {
        id: 'comp-jnj',
        index: '04',
        year: '2023.04',
        name: 'Johnson & Johnson (J&J) Future Leaders Challenge',
        organizer: 'Johnson & Johnson',
        teamSize: '4',
        role: 'MSCI ESG RISK & KENVUE SPIN-OFF ANALYSIS',
        result: 'NATIONAL TOP 12',
        ranking: 'NATIONAL TOP 12',
        description:
          'Deconstructed J&J’s E/S/G performance under the MSCI ESG framework, identifying supply chain, generic competition, and regulatory risks; evaluated the strategic feasibility, governance, and working capital optimization of the Kenvue consumer health spin-off.',
      },
    ],

    visualWorks: [
      {
        id: 'vis-satellite',
        code: 'DECK_001 / EQUITY RESEARCH (70+ PAGES)',
        title: 'Satellite Internet Deep-Dive: SpaceX vs. AST SpaceMobile Moat & Economics',
        category: 'Minsheng Securities Telecom Research · >60% Chart Adoption Rate',
        year: '2024 — 2025',
        summary:
          'Independently authored a 70+ page industry research slide deck comparing LEO satellite constellations across RF architecture, launch cadence, FCC spectrum filings, and Direct-to-Cell commercialization, supporting 3 institutional client due diligence processes.',
        slideCount: '70+ SLIDES',
        keyTakeaway:
          'Translating complex orbital mechanics, phased-array link budgets, and 800+ pages of conference filings into institutional-grade visual frameworks.',
        slidesPreview: [
          {
            slideNumber: '12 / 72',
            heading: 'SpaceX Starlink vs. AST SpaceMobile Technical Architecture',
            caption: 'Comparing phased-array antenna aperture, inter-satellite laser links (ISL), and MNO spectrum partnerships.',
          },
          {
            slideNumber: '34 / 72',
            heading: 'Global LEO Launch Frequency Distribution & FCC Filings',
            caption: 'Synthesizing 800+ pages of archived conference materials and orbital launch logs across Ka/Ku/V bands.',
          },
          {
            slideNumber: '58 / 72',
            heading: 'Unit Economics & Market Penetration Sensitivity',
            caption: 'Modeling break-even thresholds across maritime/aviation enterprise links and consumer direct-to-cell roaming.',
          },
        ],
      },
      {
        id: 'vis-iqvia',
        code: 'DECK_002 / HEALTHCARE STRATEGY & POSITIONING',
        title: 'Sulodexide Cross-Department Opportunity & Concept Testing Deck',
        category: 'Illuminera (IQVIA) Strategy Consulting · 7x Conversion Segment',
        year: '2025',
        summary:
          'Synthesized 200+ physician surveys (contingency tables & two-tailed significance tests), 720 NLP binary features, and 7+ expert interviews across Vascular Surgery, Endocrinology, and Nephrology.',
        slideCount: '36 SLIDES',
        keyTakeaway:
          'Turning statistical significance tables and clinical interview transcripts into clear department-level value propositions.',
        slidesPreview: [
          {
            slideNumber: '06 / 36',
            heading: 'Cross-Department Disease Landscape & Treatment Regimens',
            caption: 'Mapping clinical guidelines and prescribing habits across Vascular Surgery, Endocrinology, and Nephrology.',
          },
          {
            slideNumber: '18 / 36',
            heading: 'Contingency Table & Two-Tailed Tests: The 7x Segment',
            caption: 'Isolating high-potential physician cohorts with the highest prescription conversion elasticity.',
          },
          {
            slideNumber: '29 / 36',
            heading: 'Three Communication Concept Tests & Messaging Priority',
            caption: 'Aligning clinical evidence hooks with department-specific unmet needs.',
          },
        ],
      },
      {
        id: 'vis-ey-esg',
        code: 'DECK_003 / NATIONAL 1ST PRIZE PITCH DECK',
        title: 'Green Supply Chain & Digital Carbon Platform Strategy for Logistics',
        category: 'EY Innovation Challenge · National 1st Prize Pitch Deck',
        year: '2023',
        summary:
          'Benchmarked domestic and global logistics ESG disclosures, applying a Materiality Assessment Matrix to design localized ESG standards, green finance instruments, and a digital carbon management platform.',
        slideCount: '28 SLIDES',
        keyTakeaway:
          'Structuring ambiguous ESG compliance challenges into a crisp three-pillar executive pitch.',
        slidesPreview: [
          {
            slideNumber: '04 / 28',
            heading: 'Logistics ESG Disclosure Benchmarking & Scope 1–3 Gaps',
            caption: 'Contrasting JD Logistics with global peers on carbon accounting standardization.',
          },
          {
            slideNumber: '13 / 28',
            heading: 'Stakeholder Materiality Assessment Matrix',
            caption: 'Mapping financial materiality against regulatory and supply-chain stakeholder urgency.',
          },
          {
            slideNumber: '22 / 28',
            heading: 'Digital Carbon Platform & Green Finance Roadmap',
            caption: 'Connecting fleet telemetry, standardized emissions accounting, and green credit incentives.',
          },
        ],
      },
    ],

    mediaWorks: [
      {
        id: 'media-bie-01',
        slug: 'bie-youth-culture-editorial',
        code: 'ARTICLE_001 / BIE 别的',
        title: '100k+ Viral Youth Culture Features at 1M+ Follower Platform "BIE 别的"',
        platform: 'BIE 别的 · WeChat Official Account / Youth Culture & Documentary',
        year: '2024 — 2025',
        role: 'Editorial Intern (1 of 2 Nationwide) / Writer & Curator',
        metricHighlight: {
          value: '100k+',
          unit: 'READS ON MULTIPLE VIRAL ARTICLES',
        },
        cover: IMG_MUSIC,
        summary:
          'Selected as 1 of only 2 editorial interns nationwide at the 1M+ follower media brand BIE 别的; led account operations, topic pitching, and long-form writing, producing multiple 100k+ read features.',
        lifeStory:
          'Beyond equations and code, writing is how I stay close to real human textures. At BIE, I learned how to listen to everyday stories and craft narratives that resonate across hundreds of thousands of readers.',
        creativeProcess:
          'Combined cultural field observation, in-depth interviews, and tight editorial pacing with distinctive visual layouts.',
        targetAudience:
          'Over 1 million young urban readers interested in subcultures, independent art, and contemporary society.',
        originalUrl: '#media-case-bie',
      },
      {
        id: 'media-campus-02',
        slug: 'shanghai-women-talent-community',
        code: 'CAMPAIGN_002 / COMMUNITY & MEDIA',
        title: '600+ Member Shanghai Women Talent Community & Campus Media Production',
        platform: 'Shanghai Women Talent Community / Tongji SEM & Freshman College',
        year: '2022 — 2025',
        role: 'Community Lead / Editor / Event Planner / Video Editor',
        metricHighlight: {
          value: '600+',
          unit: 'COMMUNITY SCALE & GOV-CORP PARTNERSHIPS',
        },
        cover: IMG_SHANGHAI,
        summary:
          'Coordinated government-enterprise partnerships and offline courses for a 600+ member Shanghai women talent community; served as a core member at Tongji SEM Student Union and Freshman Academic Committee producing articles, events, and videos.',
        lifeStory:
          'Whether bringing 600+ women professionals together for offline workshops or editing event recap videos late at night, I care deeply about creating spaces where people genuinely connect.',
        creativeProcess:
          'Integrated cross-sector partnerships, offline curriculum design, and warm visual/editorial storytelling.',
        targetAudience:
          'Young professional women in Shanghai, university students, and institutional partners.',
        originalUrl: '#media-case-community',
      },
    ],

    writings: [
      {
        id: 'write-01',
        slug: 'from-central-bank-texts-to-nonlinear-regimes',
        index: '01',
        title: 'When LLMs Read Central Bank Speak: From 6.4M Policy Characters to Nonlinear FX Regimes',
        year: '2026',
        date: 'APR 2026',
        category: 'AI Thinking',
        place: 'Hong Kong',
        excerpt:
          'Reflections on parsing 80 monetary policy reports and 1,526 speeches—and how schema constraints turn generative models into rigorous econometric instruments.',
        readTime: '6 MIN READ',
        content: [
          'In traditional financial econometrics, text is often flattened into naive bag-of-words sentiment counts. Yet anyone who reads central bank monetary policy reports knows the real signal lives in measured qualifiers and subtle shifts in forward guidance.',
          'To overcome fragmented central bank web archives, I built a dual-path HTML and PDF ingestion pipeline with an automatic fallback to PDF parsing whenever page text fell below 100 characters—assembling ~6.4 million Chinese characters. Using LDA (K=39), I isolated 454 core exchange-rate documents.',
          'By pairing DeepSeek API with domain anchors, strict JSON schema validation, and automated retry logic, we extracted continuous policy sentiment and directional guidance. Feeding these signals into a 240-month Exchange Market Pressure (EMP) LSTR1 nonlinear model lifted R² from 0.065 to 0.157.',
        ],
      },
      {
        id: 'write-02',
        slug: 'notes-between-shanghai-and-hongkong',
        index: '02',
        title: 'A Tale of Two Cities: From Tongji Sycamores to HKU Harbour Mist',
        year: '2026',
        date: 'MAR 2026',
        category: 'Place Note',
        place: 'Shanghai',
        excerpt:
          'Moving from Mathematical Finance to Computer Science, while navigating quantitative research, strategy analytics, and a 1M+ follower editorial newsroom.',
        readTime: '5 MIN READ',
        content: [
          'Looking back, my path has constantly alternated between two worlds: stochastic proofs, 10ms limit order books, and 45-million-row DuckDB tables on one side; long-form youth culture essays at BIE 别的 and offline women’s community workshops on the other.',
          'In practice, these two lenses reinforce each other. At Illuminera (IQVIA), empathy for how physicians actually write clinical notes helped me design a cleaner 720-feature NLP mapping dictionary. At DiDi IBG, cleaning 5,000+ Brazilian IBGE records meant visualizing real streets and merchants in São Paulo.',
          'Transitioning from Tongji University to my MSc in Computer Science at HKU, I carry both habits: engineering precision and editorial curiosity.',
        ],
      },
      {
        id: 'write-03',
        slug: 'causal-uplift-and-why-correlation-is-not-action',
        index: '03',
        title: 'From Correlation to Incremental Lift: Shapley Attribution & Causal Uplift',
        year: '2026',
        date: 'AUG 2026',
        category: 'Literature Review',
        excerpt:
          'Notes from building CommerceIQ over 45.78 million retail rows: why game-theoretic attribution and S/T-Learners matter for real business decisions.',
        readTime: '5 MIN READ',
        content: [
          'Analytics teams routinely face two traps: misattributing multi-factor metric drops to a single noisy dimension, and mistaking organic high-propensity buyers for marketing campaign success.',
          'In CommerceIQ, applying Shapley value decomposition to a -12.43% monthly GMV drop revealed that 74.7% of the net decline stemmed from active buyer contraction rather than AOV erosion. Meanwhile, training S/T-Learner uplift models across 45.78M retail rows delivered a +6.24pp incremental conversion gain in the top 30% test segment.',
          'Good data science bridges backward-looking diagnosis with forward-looking counterfactual intervention.',
        ],
      },
    ],

    photography: [
      {
        id: 'photo-hk-01',
        title: 'Star Ferry Through Victoria Harbour Mist',
        place: 'Hong Kong',
        placeDisplay: 'HONG KONG',
        coordinates: '22.3193° N, 114.1694° E',
        date: 'SEP 2026',
        year: 2026,
        image: IMG_HK,
        aspectRatio: '3:4',
        rotationDeg: 1.2,
        caption: 'Morning mist over Victoria Harbour at the start of my MSc in Computer Science at HKU.',
        cameraNote: '50mm Equivalent · Morning Fog · Documentary Film Tone',
      },
      {
        id: 'photo-shanghai-01',
        title: 'Afternoon Plane Trees & Historic Lanes',
        place: 'Shanghai',
        placeDisplay: 'SHANGHAI',
        coordinates: '31.2304° N, 121.4737° E',
        date: 'OCT 2025',
        year: 2025,
        image: IMG_SHANGHAI,
        aspectRatio: '4:3',
        rotationDeg: -1.1,
        caption: 'Slant autumn light filtering through plane trees in Shanghai after a day of research and editing.',
        cameraNote: '35mm Equivalent · Natural Shadow · Warm Film Grain',
      },
      {
        id: 'photo-tokyo-01',
        title: 'Warm Lantern Reflections After Rain',
        place: 'Tokyo',
        placeDisplay: 'TOKYO',
        coordinates: '35.6762° N, 139.6503° E',
        date: 'APR 2026',
        year: 2026,
        image: IMG_TOKYO,
        aspectRatio: '4:3',
        rotationDeg: -0.7,
        caption: 'Quiet rain-slicked asphalt holding amber light at dusk.',
        cameraNote: '35mm Equivalent · f/2.0 · Dusk Exposure',
      },
    ],

    places: [
      {
        id: 'place-hk',
        name: 'Hong Kong',
        displayName: 'HONG KONG',
        coordinates: '22.3193° N',
        period: '2026 — PRESENT',
        chapterNote: 'CHAPTER I — HKU COMPUTER SCIENCE, HARBOUR MIST & CANTONESE DAILY LIFE',
        memoryFragment:
          'Walking down from Pok Fu Lam after LLM and Data Mining seminars, watching ferries cross the harbour.',
      },
      {
        id: 'place-shanghai',
        name: 'Shanghai',
        displayName: 'SHANGHAI',
        coordinates: '31.2304° N',
        period: '2021 — 2026',
        chapterNote: 'CHAPTER II — TONGJI MATHEMATICAL FINANCE, INTERNSHIPS & EDITORIAL ROOMS',
        memoryFragment:
          'Five formative years at Tongji University, internships across DiDi IBG, Illuminera (IQVIA), Minsheng Securities, and BIE 别的, plus leading a 600+ member women’s community.',
      },
      {
        id: 'place-tokyo',
        name: 'Tokyo',
        displayName: 'TOKYO',
        coordinates: '35.6762° N',
        period: 'FIELD NOTES',
        chapterNote: 'CHAPTER III — URBAN OBSERVATION, FILM FRAMES & SUBCULTURE RESEARCH',
        memoryFragment:
          'Quiet streets, independent bookstores, and observing youth culture and visual design details.',
      },
    ],

    volunteering: [
      {
        id: 'vol-shanghai-women',
        title: '600+ Member Shanghai Women Talent Community & Gov-Enterprise Partnerships',
        organization: 'Shanghai Women Talent Community',
        location: 'Shanghai',
        dates: '2024 — 2025',
        whatICaredAbout: 'Building a supportive, real-world network and offline learning space for over 600 women professionals in Shanghai.',
        description:
          'Spearheaded government-enterprise partnerships and offline curriculum execution for a 600+ scale female talent community in Shanghai.',
      },
      {
        id: 'vol-summits',
        title: 'CIIE, Shanghai Magnolia Award & Pujiang Innovation Forum Coordination',
        organization: 'China International Import Expo / Magnolia Award / Pujiang Forum',
        location: 'Shanghai',
        dates: '2022 — 2025',
        whatICaredAbout: 'Facilitating cross-cultural dialogue and seamless hospitality at major international summits.',
        description:
          'Coordinated foreign guest reception at CIIE, Award Department operations at the Shanghai Magnolia Award, and registration at the Pujiang Innovation Forum.',
      },
      {
        id: 'vol-rural-campus',
        title: 'Rural Volunteer Teaching, PwC LEAPer & Tongji Student Leadership',
        organization: 'Rural Education Initiative / PwC LEAPer / Tongji SEM & Freshman College',
        location: 'Shanghai & Rural Schools',
        dates: '2021 — 2025',
        whatICaredAbout: 'Bringing patience, curiosity, and broader horizons to grassroots classrooms and campus communities.',
        description:
          'Participated in grassroots rural teaching volunteer programs; selected for PwC LEAPer; served as core member in Tongji SEM Student Union Liaison Dept and Freshman Academic Committee.',
      },
    ],

    lifeMoments: [
      {
        id: 'moment-01',
        label: 'HKU · Pok Fu Lam & Victoria Harbour',
        location: 'Hong Kong',
        date: '2026',
        image: IMG_HK,
        note: 'Embarking on MSc Computer Science at HKU—bridging mathematical finance with intelligent systems.',
      },
      {
        id: 'moment-02',
        label: 'BIE 别的 Newsroom · Writing 100k+ Read Stories',
        location: 'Shanghai',
        date: '2024 — 2025',
        image: IMG_MUSIC,
        note: 'Working as 1 of 2 editorial interns nationwide at a 1M+ follower youth culture media platform.',
      },
      {
        id: 'moment-03',
        label: 'Tongji Years & Shanghai Sycamore Lanes',
        location: 'Shanghai',
        date: '2021 — 2026',
        image: IMG_SHANGHAI,
        note: 'Balancing mathematical modeling, high-frequency data pipelines, and a 600+ women talent community.',
      },
    ],
  },
};
