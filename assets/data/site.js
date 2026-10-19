/* ============================================================
   SevenHours · 网站内容数据
   日常维护只需要改这个文件：
     · SITE.contact  —— 联系方式
     · SITE.pricing  —— 报价（⚠️ 目前是占位数字，请替换为真实价格）
     · SITE.works    —— 作品分类与图片（由脚本自动生成）
   ============================================================ */
window.SITE = {

  brand: {
    name: "SevenHours",
    cn: "七分咸苏打",
    tagline: "云南地陪 · 行程定制 · 包车跟拍",
    sub: "大理旅居独立摄影师"
  },

  /* ================= 入口页（两个板块） ================= */
  /* ================= 入口页（合一研习社官网 · 三个板块） ================= */
  hub: {
    brand: "合一研习社",
    brandEn: "ONENESS",
    eyebrow: "合一研习社 · ONENESS",
    title: "三个方向，<br>陪你慢慢来",
    desc: "带着相机和车陪你在云南走，用瑜伽和理疗陪你把身体松下来，也用卦象陪你看看当下的节奏。三条线，都是慢的。",
    cards: [
      {
        href: "travel.html",
        img: "assets/img/hero/1、cloud-mountain.webp",
        tag: "01 / TRAVEL & PHOTO",
        title: "旅拍陪玩",
        en: "TRAVEL · PHOTO · GUIDE",
        desc: "云南地陪 · 行程定制 · 专属包车 · 照片和视频都拍。三项可以单独买，也可以打包做定制出行。",
        points: ["包车", "摄影", "地陪", "定制出行"],
        cta: "进入旅拍板块"
      },
      {
        href: "wellness.html",
        img: "assets/img/wellness/incense-hub.webp",
        tag: "02 / WELLNESS",
        title: "身心灵理疗",
        en: "YOGA · BODYWORK · COUNSELING",
        desc: "瑜伽、理疗、心理咨询，一次只服务一个人（瑜伽最多两人）。不赶时间，跟着呼吸和身体的节奏走。",
        points: ["瑜伽", "理疗", "心理咨询", "¥600 / 次"],
        cta: "进入理疗板块"
      },
      {
        href: "gua.html",
        img: "assets/img/hub/gua.webp",
        tag: "03 / I CHING CALENDAR",
        title: "卦象日历",
        en: "I CHING · 2026",
        desc: "2026 年每日卦象日历，随时查看当天的卦与节气。",
        points: ["每日卦象", "节气", "2026 全年"],
        cta: "查看卦象日历",
        compact: true
      }
    ],
    note: "三个板块都可以直接加微信咨询。旅拍与理疗可以同一天安排，详情微信聊。"
  },

  hero: {
    eyebrow: "YUNNAN · PHOTOGRAPHY & PRIVATE TOUR",
    title: "把云南的光，<br>拍成你的故事",
    titleEn: "Slow travel · Blue hour · Cinematic portraits",
    desc: "我常住大理，也跑遍云南。从苍山洱海到雪山古镇，为你定制专属行程、专职包车、全程跟拍 —— 不赶时间，只为在对的光线里按下快门。",
    tags: ["地陪行程定制", "专属包车随行", "照片 + 视频拍摄", "蓝调时刻控光", "慢节奏创作"]
  },

  about: {
    eyebrow: "ABOUT ME",
    title: "自诩古希腊掌管蓝调的神",
    quote: "好的照片需要时间沉淀。<br>偏爱慢节奏的创作方式，让每一次快门都有<em>故事</em>。",
    body: [
      "来自上海，在大理旅居的独立摄影师，痴迷于蓝调时刻的光影魔法。",
      "照片和视频都拍，记录生活中那些安静而有力量的瞬间。不赶时间，拒绝流水线作业，把旅行变成一场流动的创作。"
    ],
    tags: ["蓝调", "杂志风", "慢创作"],
    photo: "assets/img/feature/about.jpg"
  },

  stats: [
    { num: "8年+", label: "影像创作经验" },
    { num: "30+", label: "风格样片主题" },
    { num: "照片 + 视频", label: "一次交付" },
    { num: "全云南", label: "行程可定制" }
  ],

  philosophy: [
    {
      icon: "clock",
      title: "慢节奏创作",
      en: "SLOW CREATION",
      desc: "不赶时间，拒绝流水线作业。每一次快门的按下，都是一场专属的光影对话，只为捕捉独一无二的感动。"
    },
    {
      icon: "eye",
      title: "沉浸式体验",
      en: "IMMERSIVE",
      desc: "边拍边玩，在互动中消解镜头的陌生感。我们深入场景，记录最自然的你和真实流淌的情绪，让画面充满故事感。"
    },
    {
      icon: "film",
      title: "照片 + 视频",
      en: "PHOTO & VIDEO",
      desc: "照片定格永恒的瞬间，视频延续生动的故事。动静结合的影像解决方案，为你珍藏每一个值得铭记的高光时刻。"
    }
  ],

  services: [
    {
      no: "01",
      title: "地陪行程定制",
      en: "CUSTOM ITINERARY",
      desc: "告诉我想看什么样的风景、想要什么风格的照片，我来出路线。避开人潮和流水线机位，把行程排在对的光线里。",
      points: ["一对一沟通需求与拍摄主题", "按季节 / 天气 / 光线排路线", "住宿餐饮与当地玩法建议", "全程陪同翻译与拍摄引导"]
    },
    {
      no: "02",
      title: "专属包车随行",
      en: "PRIVATE CAR",
      desc: "不用赶景点、不用挤人群，哪里光线好就停在哪里。全程空调、干净无异味，大后备箱放得下你所有行李和服装。",
      points: ["车型：长安启源 Q05（5 座）", "座椅通风 / 加热 / 按摩", "随时停车、边走边拍", "洱海环线 · 苍山 · 古镇 · 雪山"]
    },
    {
      no: "03",
      title: "照片 + 视频拍摄",
      en: "PHOTO & CINEMATIC",
      desc: "一次拍摄，双重收获。静态照片定格最美瞬间，动态视频留住温度和声音，给你更完整的旅行回忆。",
      points: ["专业调色 · 电影质感", "精修成片 + 原片交付", "旅拍 Vlog / 短片剪辑", "无人机航拍可选"]
    }
  ],

  routes: [
    "大理环洱海", "苍山脚下", "喜洲古镇", "双廊海景", "沙溪古镇",
    "丽江古城", "玉龙雪山", "香格里拉", "泸沽湖", "腾冲 / 芒市",
    "元阳梯田", "西双版纳"
  ],

  /* 专属座驾 —— 包车用的车 */
  car: {
    eyebrow: "PRIVATE CAR",
    title: "专属座驾 · 长安启源 Q05",
    en: "CHANGAN NEVO Q05",
    desc: "5 座月华银，全程空调、干净无异味。不赶景点、不挤人群 —— 哪里光线好就停在哪里，想去哪里就去哪里。",
    main: "assets/img/car/q05-main.webp",
    specs: ["5 座", "月华银", "超大后备箱", "全程空调", "座椅通风 · 加热 · 按摩"],
    feats: [
      {
        img: "assets/img/car/q05-seat.webp",
        title: "前排座椅 通风 · 加热 · 按摩",
        desc: "长途不累。拍完一整天，回程路上开着按摩，是行程里最容易被忽略、也最容易被记住的细节。"
      },
      {
        img: "assets/img/car/q05-route.webp",
        title: "行程定制 · 想去哪就去哪",
        desc: "不做流水线路线。出发前一起定好方向，路上随时因为一片云、一束光停下来。"
      },
      {
        img: "assets/img/car/q05-supplies.webp",
        title: "车上常备 医疗箱 · 矿泉水 · 纸巾",
        desc: "医疗箱、矿泉水、纸巾全程备着，不用你操心。行李再多也放得下 —— 后备箱很能装。"
      }
    ]
  },

  /* ⚠️ 以下 4 个数字全部是占位价，请替换成你的真实报价（改 price / save 两个字段即可） */
  pricing: {
    pending: true,
    eyebrow: "PRICING",
    title: "报价",
    desc: "包车、地陪、摄影可以单独约，也可以三项打包成「定制出行」。明码标价，没有隐形消费。",
    unitNote: "以下均为 1 天（8 小时）参考价",
    /* 单项：包车 / 地陪 / 摄影 —— 按价格从低到高排列（渲染时也会再按 price 排一次，改价不会乱序） */
    items: [
      {
        key: "car",
        name: "包车",
        en: "PRIVATE CAR",
        price: 380,
        unit: "/ 天",
        desc: "5 座长安启源 Q05，含油费与过路费，专职司机随行。",
        features: [
          "5 座专属座驾（月华银）",
          "含油费 / 过路费",
          "座椅通风 · 加热 · 按摩",
          "超大后备箱，行李全放得下",
          "车上常备医疗箱 / 矿泉水 / 纸巾"
        ],
        cta: "单独订车"
      },
      {
        key: "guide",
        name: "地陪",
        en: "LOCAL GUIDE",
        price: 680,
        unit: "/ 天",
        desc: "行程定制、路线规划，带你去本地人才知道的地方。",
        features: [
          "一对一沟通需求与主题",
          "按季节 / 天气 / 光线排路线",
          "住宿与餐饮建议",
          "全程陪同，想去哪就去哪"
        ],
        cta: "单独约地陪"
      },
      {
        key: "photo",
        name: "摄影",
        en: "PHOTOGRAPHY",
        price: 980,
        unit: "/ 天",
        desc: "全天跟拍，照片和视频都拍，不赶时间。",
        features: [
          "8 小时跟拍 + 1v1 拍摄引导",
          "精修成片 + 全部原片交付",
          "1 分钟旅拍短视频",
          "蓝调时刻专场",
          "无人机航拍可选"
        ],
        cta: "单独约拍"
      }
    ],
    /* 打包：包车 + 摄影 + 地陪 */
    bundle: {
      name: "定制出行 · 三项全包",
      en: "ALL IN ONE",
      price: 1599,
      unit: "/ 天",
      /* 「比分开买省多少」由脚本按 单项合计 − 打包价 自动算出，不用手写 */
      desc: "包车 + 摄影 + 地陪一起带走，行程全定制。不用自己拼，也不用分别对接。",
      features: [
        "包车 + 摄影 + 地陪，三项全含",
        "行程完全定制，想去哪就去哪",
        "专车随停随拍，哪里光线好停哪里",
        "照片 + 视频一起交付",
        "车上常备医疗箱 / 矿泉水 / 纸巾"
      ],
      cta: "预约定制出行"
    },
    extras: [
      { k: "多日行程", v: "2 天起可谈整体优惠，多日价格另议" },
      { k: "出行范围", v: "大理市区及环洱海含在报价内，出大理州另行核算" },
      { k: "节假日", v: "春节、国庆等旺季价格上浮，具体以沟通为准" }
    ],
    note: "以上为参考报价，节假日、多日行程与特殊路线价格另议，以实际沟通为准。"
  },

  /* 装备清单。img 对应 assets/img/gear/<img>.webp，找不到图时会自动退回纯文字条目 */
  equipment: {
    camera: {
      title: "相机与机身",
      items: [
        { n: "Sony A7M5", img: "sony-a7m5" },
        { n: "FujiFilm XH2", img: "fujifilm-xh2" },
        { n: "DJI Osmo Pocket 4", img: "dji-osmo-pocket" },
        { n: "DJI Mini 3 Pro", img: "dji-mini-3-pro" }
      ]
    },
    lens: {
      title: "镜头",
      items: [
        { n: "Sony FE 50-150mm F2 GM", img: "sony-50-150-f2-gm" },
        { n: "Sony FE 16-35mm F4 G PZ", img: "sony-16-35-f4-g" },
        { n: "Tamron 17-70mm F2.8", img: "tamron-17-70-f28" },
        { n: "TTArtisan 50mm F1.2", img: "ttartisan-50-f12" }
      ]
    },
    light: {
      title: "灯光与稳定",
      items: [
        { n: "神牛 V100 闪光灯", img: "godox-v100" },
        { n: "神牛 iT32 闪光灯", img: "godox-it32" },
        { n: "智云 FIVERAY M40 棒灯", img: "zhiyun-stick-light" },
        { n: "Ulanzi LT002 补光灯", img: "ulanzi-flashlight" },
        { n: "DJI RS 3 Mini 稳定器", img: "dji-rs3-mini" },
        { n: "Ulanzi TT09 三脚架", img: "ulanzi-tripod" }
      ]
    },
    acc: {
      title: "收音与配件",
      items: [
        { n: "DJI Mic 无线麦克风", img: "dji-mic" },
        { n: "ND / CPL / 星光镜 滤镜套装" },
        { n: "车载 / 户外移动电源" },
        { n: "多机位备用电池" }
      ]
    }
  },

  /* ================= 身心灵理疗板块 ================= */
  wellness: {
    brand: { name: "SevenHours Wellness", cn: "身心灵理疗" },

    hero: {
      eyebrow: "WELLNESS · YOGA · BODYWORK · COUNSELING",
      title: "先让身体松下来",
      desc: "瑜伽、理疗、心理咨询，三个方向都做。每次只服务一个人（瑜伽最多两人），没有流水线课表，跟着你当天的状态走。",
      img: "assets/img/wellness/hero-yoga-sunset.webp",
      tags: ["瑜伽", "理疗", "心理咨询", "60 分钟 / 次", "¥600 / 次"]
    },

    intro: {
      eyebrow: "ABOUT",
      title: "慢一点，身体会自己说话",
      body: [
        "瑜伽不是把动作做标准，而是把注意力放回呼吸上。理疗也不是「按得越重越好」，而是找到那些长期绷着、你自己都没察觉的地方。",
        "心理咨询则更安静一些 —— 用占星、人类图、紫微斗数、心理学这些不同的语言，陪你把当下这件事看清楚。",
        "三个方向，每次只服务一个人（瑜伽最多两人），所以时间是你的，节奏也是你的。"
      ]
    },

    projects: [
      {
        key: "yoga",
        title: "瑜伽",
        en: "YOGA",
        price: 600,
        unit: "/ 次",
        duration: "60 分钟",
        capacity: "一对一 / 一对二（最多两人）",
        photo: "assets/img/wellness/yoga-indoor.webp",
        desc: "按你的身体状态和当天的感觉排课，不套固定序列。零基础可以来，练过很久也可以来。",
        points: [
          "一对一，或一对二（最多两人）",
          "单次 60 分钟",
          "¥600 / 次（一对一与一对二同价）",
          "强度按需调整，不硬撑"
        ]
      },
      {
        key: "therapy",
        title: "理疗",
        en: "BODYWORK",
        price: 600,
        unit: "/ 次",
        duration: "60 分钟",
        capacity: "仅一对一",
        photo: "assets/img/wellness/therapy-hotstone.webp",
        desc: "从呼吸和体态入手，慢慢松开长期绷着的肩颈和腰背。全程一对一，力度随时沟通。",
        points: [
          "仅一对一",
          "单次 60 分钟",
          "¥600 / 次",
          "力度随时沟通，不硬按"
        ]
      },
      {
        key: "counsel",
        title: "心理咨询",
        en: "COUNSELING",
        price: 600,
        unit: "/ 次",
        duration: "60 分钟",
        capacity: "仅一对一",
        photo: "assets/img/wellness/meditate-mudra.webp",
        desc: "不套模板，用你听得进去的方式聊。可以借占星、人类图、紫微斗数、心理学这些工具，把当下的困惑拆开看。",
        points: [
          "仅一对一",
          "单次 60 分钟",
          "¥600 / 次",
          "占星 / 人类图 / 紫微斗数 / 心理学",
          "聊什么由你决定，不评判"
        ]
      }
    ],

    /* 三个方向各配一组意象图（Unsplash，无水印可商用） */
    gallery: {
      eyebrow: "PRACTICE",
      title: "练习的样子",
      desc: "瑜伽、香道、冥想、禅修 —— 都是一件事：把注意力收回来。",
      /* 图上只显示 title 一个词，desc 保留在数据里但不渲染 */
      items: [
        { img: "assets/img/wellness/yoga-indoor.webp",       title: "瑜伽" },
        { img: "assets/img/wellness/incense-one-stick.webp", title: "香道" },
        { img: "assets/img/wellness/meditate-mudra.webp",    title: "冥想" },
        { img: "assets/img/wellness/meditate-lakeside.webp", title: "禅修" }
      ]
    },

    notes: {
      eyebrow: "BEFORE YOU BOOK",
      title: "预约须知",
      items: [
        { k: "预约", v: "建议提前至少 1 天预约；当天有空位也可以问" },
        { k: "时长与人数", v: "单次 60 分钟；瑜伽最多一对二，理疗与心理咨询仅一对一" },
        { k: "穿着", v: "瑜伽与理疗请穿方便活动的衣物" },
        { k: "身体状况", v: "孕期、术后恢复期、急性损伤或有基础疾病，请提前告知，方便判断是否适合" },
        { k: "心理咨询", v: "不是医疗诊断或治疗；如有确诊的心理健康问题，建议同时寻求专业医疗帮助" },
        { k: "地点", v: "大理，具体地点预约后告知" }
      ]
    },

    cta: {
      title: "想约课，或者只是想聊聊",
      desc: "加微信说明想约瑜伽、理疗还是心理咨询，以及方便的时间段，我会回你最近的可约时段。"
    }
  },

  contact: {
    eyebrow: "CONTACT",
    title: "期待与你相遇",
    sub: "在大理的时刻，记录属于你的故事",
    ways: [
      { k: "电话", v: "15001926558", icon: "phone", href: "tel:15001926558" },
      { k: "微信", v: "SevenHoursStudio7", icon: "wechat", href: "" },
      { k: "小红书", v: "SevenHoursStudio7（大理约拍）", icon: "xhs", href: "" },
      { k: "抖音", v: "Seven Hours", icon: "douyin", href: "" },
      { k: "Bilibili", v: "七分咸苏打", icon: "bili", href: "" }
    ]
  },

  footer: {
    note: "本站所有摄影作品版权归 SevenHours 所有，未经许可请勿商用。"
  },

  /* works 由 build_works.py 自动写入 assets/data/works.js，此处不重复维护 */
  works: []
};
