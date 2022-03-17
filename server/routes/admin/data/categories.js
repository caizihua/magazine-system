const parent = [{
    name: '文艺'
  },
  {
    name: '艺术'
  },
  {
    name: '文化'
  },
  {
    name: '科普'
  },
  {
    name: '居家'
  },
  {
    name: '女性'
  },
  {
    name: '老年'
  }, {
    name: '休休闲'
  },
  {
    name: '中小学'
  },
  {
    name: '高等教育'
  },
  {
    name: '企业经管'
  }, {
    name: '管理决策'
  }, {
    name: '行业市场'
  }, {
    name: '金融财经'
  }, {
    name: '经济理论'
  },
  {
    name: '党政党建'
  },
  {
    name: '军事'
  },
  {
    name: '法律.'
  },
  {
    name: '医药卫生科技'
  },
  {
    name: '农业科技'
  },
  {
    name: '工程科技I'
  },
  {
    name: '工程科技II'
  },
  {
    name: '信息科技'
  },
  {
    name: '哲学与人文科学'
  },
  {
    name: '社会科学I'
  },
  {
    name: '社会科学II'
  },
  {
    name: '基础科学'
  }
]

const child = [
  [{
      "name": "小说故事"
    },
    {
      "name": "诗歌韵文"
    },
    {
      "name": "散文杂著"
    },
    {
      "name": "民间文学"
    },
    {
      "name": "戏剧文学"
    },
    {
      "name": "儿童文学"
    },
    {
      "name": "综合文学"
    },
    {
      "name": "报告文学"
    },
    {
      "name": "曲艺"
    },
    {
      "name": "少数民族文学"
    }
  ],
  [{
      "name": "美术摄影"
    },
    {
      "name": "音乐舞蹈"
    },
    {
      "name": "工艺美术"
    },
    {
      "name": "表演艺术"
    },
    {
      "name": "艺术综合"
    }
  ],
  [{
      "name": "健康保健"
    },
    {
      "name": "家居装饰"
    },
    {
      "name": "现代家庭"
    },
    {
      "name": "生活指南"
    },
    {
      "name": "家庭收藏"
    },
    {
      "name": "烹饪美食"
    },
    {
      "name": "理财顾问"
    },
    {
      "name": "家长必读"
    },
    {
      "name": "科学育儿"
    },
    {
      "name": "流行时尚"
    },
    {
      "name": "女性情感"
    },
    {
      "name": "金色晚年"
    },
    {
      "name": "演 艺 圈"
    },
    {
      "name": "体育运动"
    },
    {
      "name": "休闲阅读"
    },
    {
      "name": "旅游地理"
    },
    {
      "name": "文化人文"
    },
    {
      "name": "时政杂谈"
    },
    {
      "name": "历史纵谈"
    },
    {
      "name": "工人之窗"
    },
    {
      "name": "交通出行"
    }
  ],
  [{
      "name": "科学大观"
    },
    {
      "name": "探索自然"
    },
    {
      "name": "科技之光"
    },
    {
      "name": "农业广角"
    }
  ],
  [{
      "name": "健康保健"
    },
    {
      "name": "家居装饰"
    },
    {
      "name": "现代家庭"
    },
    {
      "name": "生活指南"
    },
    {
      "name": "家庭收藏"
    },
    {
      "name": "烹饪美食"
    },
    {
      "name": "理财顾问"
    },
    {
      "name": "家长必读"
    }
  ],
  [{
      "name": "流行时尚"
    },
    {
      "name": "女性情感"
    },
    {
      "name": "科学育儿"
    }
  ],
  [{
      "name": "老年生活"
    },
    {
      "name": "老年保健"
    }
  ],
  [{
      "name": "演 艺 圈"
    },
    {
      "name": "体育运动"
    },
    {
      "name": "休闲阅读"
    },
    {
      "name": "旅游地理"
    },
    {
      "name": "文化人文"
    },
    {
      "name": "交通出行"
    },
    {
      "name": "时政杂谈"
    },
    {
      "name": "历史纵谈"
    },
    {
      "name": "工人之窗"
    }
  ],
  [{
      "name": "现代教学"
    },
    {
      "name": "教参教辅"
    },
    {
      "name": "教师之友"
    },
    {
      "name": "教育研究"
    },
    {
      "name": "学校管理"
    },
    {
      "name": "地方教育"
    },
    {
      "name": "考试辅导"
    },
    {
      "name": "高考辅导"
    },
    {
      "name": "中考辅导"
    },
    {
      "name": "各科学习辅导"
    },
    {
      "name": "课外阅读"
    },
    {
      "name": "教育技术与装备"
    },
    {
      "name": "小学教师必备"
    },
    {
      "name": "初中教师必备"
    }
  ],
  [{
      "name": "教育理论"
    },
    {
      "name": "教育管理"
    },
    {
      "name": "高等教学指导"
    },
    {
      "name": "教育心理学"
    },
    {
      "name": "大学校园"
    },
    {
      "name": "教育技术"
    },
    {
      "name": "职业教育"
    },
    {
      "name": "成人教育"
    }
  ],
  [{
      "name": "经营管理"
    },
    {
      "name": "金融财经"
    },
    {
      "name": "市场营销"
    },
    {
      "name": "经济信息"
    }
  ],
  [{
      "name": "管理学"
    },
    {
      "name": "领导学与决策学"
    },
    {
      "name": "科学研究管理"
    }
  ],
  [{
      "name": "工业经济"
    },
    {
      "name": "农业经济"
    },
    {
      "name": "企业经济"
    },
    {
      "name": "文化经济"
    },
    {
      "name": "市场研究与信息"
    },
    {
      "name": "贸易经济"
    },
    {
      "name": "旅游经济"
    },
    {
      "name": "交通运输经济"
    },
    {
      "name": "信息与邮政经济"
    },
    {
      "name": "服务业"
    }
  ],
  [{
      "name": "金融"
    },
    {
      "name": "证券"
    },
    {
      "name": "保险"
    },
    {
      "name": "投资"
    },
    {
      "name": "会计"
    },
    {
      "name": "审计"
    },
    {
      "name": "财政与税收"
    }
  ],
  [{
      "name": "经济理论"
    },
    {
      "name": "经济体制改革"
    },
    {
      "name": "宏观经济管理与可持续发展"
    }
  ],
  [{
      "name": "政治理论"
    },
    {
      "name": "党建研究"
    },
    {
      "name": "支部生活"
    },
    {
      "name": "领导决策"
    },
    {
      "name": "经济发展"
    },
    {
      "name": "党史博览"
    },
    {
      "name": "人大政协"
    },
    {
      "name": "国际视野"
    }
  ],
  [{
      "name": "军事武器"
    },
    {
      "name": "公安"
    }
  ],
  [{
      "name": "法制时空"
    },
    {
      "name": "宪法"
    },
    {
      "name": "经济法"
    },
    {
      "name": "国际法"
    },
    {
      "name": "诉讼法与司法制度"
    },
    {
      "name": "法理法史"
    },
    {
      "name": "刑法"
    },
    {
      "name": "民商法"
    },
    {
      "name": "行政法及地方法制"
    }
  ],
  [{
      "name": "外科学"
    },
    {
      "name": "口腔科学"
    },
    {
      "name": "泌尿科学"
    },
    {
      "name": "临床医学"
    },
    {
      "name": "消化系统疾病"
    },
    {
      "name": "心血管系统疾病"
    },
    {
      "name": "儿科学"
    },
    {
      "name": "妇产科学"
    },
    {
      "name": "急救医学"
    },
    {
      "name": "基础医学"
    },
    {
      "name": "呼吸系统疾病"
    },
    {
      "name": "皮肤病与性病"
    },
    {
      "name": "肿瘤学"
    },
    {
      "name": "神经病学"
    },
    {
      "name": "精神病学"
    },
    {
      "name": "眼科与耳鼻咽喉科"
    },
    {
      "name": "感染性疾病及传染病"
    },
    {
      "name": "中医学"
    },
    {
      "name": "特种医学"
    },
    {
      "name": "中西医结合"
    },
    {
      "name": "内分泌腺及全身性疾病"
    },
    {
      "name": "中药学"
    },
    {
      "name": "生物医学工程"
    },
    {
      "name": "军事医学与卫生"
    },
    {
      "name": "预防医学与卫生学"
    },
    {
      "name": "药　学"
    },
    {
      "name": "医学教育与医学边缘学科"
    },
    {
      "name": "医药卫生方针政策与法律法规研究"
    }
  ],

  [{
      "name": "农业基础科学"
    },
    {
      "name": "农业工程"
    },
    {
      "name": "农艺学"
    },
    {
      "name": "农作物"
    },
    {
      "name": "林业"
    },
    {
      "name": "园艺"
    },
    {
      "name": "水产和渔业"
    },
    {
      "name": "植物保护"
    },
    {
      "name": "畜牧与动物医学"
    },
    {
      "name": "蚕蜂与野生动物保护"
    }
  ],
  [{
      "name": "无机化工"
    },
    {
      "name": "有机化工"
    },
    {
      "name": "一般化学工业"
    },
    {
      "name": "石油天然气工业"
    },
    {
      "name": "冶金工业"
    },
    {
      "name": "矿业工程"
    },
    {
      "name": "轻工业手工业"
    },
    {
      "name": "金属学及金属工艺"
    },
    {
      "name": "燃料化工"
    },
    {
      "name": "材料科学"
    },
    {
      "name": "一般服务业"
    },
    {
      "name": "安全科学与灾害防治"
    },
    {
      "name": "化学"
    },
    {
      "name": "环境科学与资源利用"
    }
  ],
  [{
      "name": "电力工业"
    },
    {
      "name": "水利水电工程"
    },
    {
      "name": "机械工业"
    },
    {
      "name": "新能源"
    },
    {
      "name": "汽车工业"
    },
    {
      "name": "仪器仪表工业"
    },
    {
      "name": "铁路运输"
    },
    {
      "name": "动力工程"
    },
    {
      "name": "公路与水路运输"
    },
    {
      "name": "工业通用技术及设备"
    },
    {
      "name": "航空航天科学与工程"
    },
    {
      "name": "建筑科学与工程"
    },
    {
      "name": "武器工业与军事技术"
    },
    {
      "name": "核科学技术"
    }
  ],
  [{
      "name": "数字时代"
    },
    {
      "name": "电信技术"
    },
    {
      "name": "无线电电子学"
    },
    {
      "name": "自动化技术"
    },
    {
      "name": "互联网技术"
    },
    {
      "name": "计算机硬件技术"
    },
    {
      "name": "计算机软件及计算机应用"
    },
    {
      "name": "出版"
    },
    {
      "name": "新闻与传媒"
    },
    {
      "name": "图书情报与数字图书馆"
    },
    {
      "name": "档案及博物馆"
    }
  ],
  [{
      "name": "文艺理论"
    },
    {
      "name": "世界文学"
    },
    {
      "name": "中国文学"
    },
    {
      "name": "中国语言文字"
    },
    {
      "name": "外国语言文字"
    },
    {
      "name": "文化"
    },
    {
      "name": "音乐舞蹈"
    },
    {
      "name": "戏剧电影与电视艺术"
    },
    {
      "name": "美术书法雕塑与摄影"
    },
    {
      "name": "人物传记"
    },
    {
      "name": "世界历史"
    },
    {
      "name": "中国通史"
    },
    {
      "name": "中国古代史"
    },
    {
      "name": "中国近代史"
    },
    {
      "name": "中国民族与地方史志"
    },
    {
      "name": "史学理论"
    },
    {
      "name": "地理"
    },
    {
      "name": "考古"
    },
    {
      "name": "哲学"
    },
    {
      "name": "宗教"
    },
    {
      "name": "逻辑学"
    },
    {
      "name": "伦理学"
    },
    {
      "name": "心理学"
    },
    {
      "name": "美学"
    }
  ],

  [{
      "name": "马克思主义"
    },
    {
      "name": "中国共产党"
    },
    {
      "name": "政党及群众组织"
    },
    {
      "name": "思想政治教育"
    },
    {
      "name": "政治学"
    },
    {
      "name": "中国政治与国际政治"
    },
    {
      "name": "行政学及国家行政管理"
    },
    {
      "name": "军事"
    },
    {
      "name": "经济法"
    },
    {
      "name": "宪法"
    },
    {
      "name": "法理法史"
    },
    {
      "name": "行政法及地方法制"
    },
    {
      "name": "公安"
    },
    {
      "name": "民商法"
    },
    {
      "name": "刑法"
    },
    {
      "name": "国际法"
    },
    {
      "name": "诉讼法与司法制度"
    }
  ],
  [{
      "name": "社会科学理论与方法"
    },
    {
      "name": "社会学及统计学"
    },
    {
      "name": "人才学与劳动科学"
    },
    {
      "name": "人口学与计划生育"
    },
    {
      "name": "民族学"
    },
    {
      "name": "教育理论与教育管理"
    },
    {
      "name": "学前教育"
    },
    {
      "name": "初等教育"
    },
    {
      "name": "中等教育"
    },
    {
      "name": "体育"
    },
    {
      "name": "高等教育"
    },
    {
      "name": "职业教育"
    },
    {
      "name": "成人教育与特殊教育"
    }
  ],
  [{
      "name": "数学"
    },
    {
      "name": "物理学"
    },
    {
      "name": "天文学"
    },
    {
      "name": "地质学"
    },
    {
      "name": "地球物理学"
    },
    {
      "name": "自然地理学和测绘学"
    },
    {
      "name": "力学"
    },
    {
      "name": "生物学"
    },
    {
      "name": "气象学"
    },
    {
      "name": "海洋学"
    },
    {
      "name": "资源科学"
    },
    {
      "name": "非线性科学与系统科学"
    },
    {
      "name": "自然科学理论与方法"
    }
  ]
]

module.exports = {parent, child}