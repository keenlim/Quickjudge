// Technique-specific deduction codes
export const changQuan_Deductions = {
    '01': {name: '拳', value: 0.1, code: '01'},
    '02': { name: '掌', value: 0.1, code: '02' },
    '03': { name: '勾手', value: 0.1, code: '03' },
    '04': { name: '剑指', value: 0.1, code: '04' },
    '10': {name: '搬脚朝天直立 / 侧踢抱脚直立', value: 0.1, code: '10'},
    '12': { name: '仰身平衡', value: 0.1, code: '12' },
    '13': { name: '十字平衡', value: 0.1, code: '13' },
    '14': { name: '扣腿平衡 / 盘腿平衡', value: 0.1, code: '14' },
    '15': { name: '侧身平衡 / 探海平衡', value: 0.1, code: '15' },
    '16': { name: '望月平衡', value: 0.1, code: '16' },
    '20': { name: '前扫腿', value: 0.1, code: '20' },
    '21': { name: '后扫腿', value: 0.1, code: '21' },
    '22': { name: '跌竖叉', value: 0.1, code: '22' },
    '23': { name: '弹腿 / 蹬腿 / 踹腿', value: 0.1, code: '23' },
    '24': { name: '正踢腿 / 侧踢腿', value: 0.1, code: '24' },
    '25': { name: '里合拍脚 / 摆莲拍脚 / 单拍脚', value: 0.1, code: '25' },
    '26': { name: '提膝（独立)', value: 0.1, code: '26' },
    '30': { name: '腾空飞脚 / 腾空斜飞脚 / 腾空双飞脚 / 旋风脚 / 腾空摆莲', value: 0.1, code: '30' },
    '31': { name: '腾空正踢腿', value: 0.1, code: '31' },
    '32': { name: '侧空翻 / 侧空翻转体', value: 0.1, code: '32' },
    '33': { name: '旋子 / 旋子转体', value: 0.1, code: '33' },
    '34': { name: '腾空箭弹 / 腾空蹬腿', value: 0.1, code: '34' },
    '50': { name: '弓步', value: 0.1, code: '50' },
    '51': { name: '马步', value: 0.1, code: '51' },
    '52': { name: '虚步', value: 0.1, code: '52' },
    '53': { name: '仆步', value: 0.1, code: '53' },
    '54': { name: '歇步', value: 0.1, code: '54' },
    '58': { name: '坐盘', value: 0.1, code: '58' },
    '60': { name: '挂剑 / 撩剑', value: 0.1, code: '60' },
    '61': { name: '握剑', value: 0.1, code: '61' },
    '62': { name: '缠头 / 裹脑', value: 0.1, code: '62' },
    '63': { name: '拦枪 / 拿枪 / 扎枪', value: 0.1, code: '63' },
    '64': { name: '平抡棍', value: 0.1, code: '64' },
    '65': { name: '立舞花枪 / 立舞花棍 / 双手提撩花棍', value: 0.1, code: '65' },
    '66': { name: '器械抛接', value: 0.1, code: '66' },
  };

export const nanQuan_Deductions = {
    '01': {name: '拳', value: 0.1, code: '01'},
    '02': { name: '虎爪', value: 0.1, code: '02' },
    '03': { name: '鹤嘴（顶）手', value: 0.1, code: '03' },
    '04': { name: '单指掌（手）', value: 0.1, code: '04' },
    '20': { name: '前扫腿', value: 0.1, code: '20' },
    '23': { name: '横踩腿 / 蹬腿 / 虎尾腿', value: 0.1, code: '23' },
    '25': { name: '转身后摆腿', value: 0.1, code: '25' },
    '26': { name: '提膝（独立)', value: 0.1, code: '26' },
    '27': { name: '横钉腿', value: 0.1, code: '27' },
    '30': { name: '腾空飞脚 / 旋风脚 / 腾空外摆腿', value: 0.1, code: '30' },
    '32': { name: '侧空翻', value: 0.1, code: '32' },
    '40': { name: '腾空盘腿360°侧扑', value: 0.1, code: '40' },
    '42': { name: '腾空双侧踹', value: 0.1, code: '42' },
    '50': { name: '弓步', value: 0.1, code: '50' },
    '51': { name: '马步', value: 0.1, code: '51' },
    '52': { name: '虚步', value: 0.1, code: '52' },
    '53': { name: '仆步', value: 0.1, code: '53' },
    '54': { name: '歇步', value: 0.1, code: '54' },
    '55': { name: '蝶步', value: 0.1, code: '55' },
    '56': { name: '跪步', value: 0.1, code: '56' },
    '57': { name: '骑龙步', value: 0.1, code: '57' },
    '62': { name: '缠头 / 裹脑', value: 0.1, code: '62' },
    '67': { name: '顶棍', value: 0.1, code: '67' },
  };

export const taiJi_Deductions = {
  '01': {name: '拳', value: 0.1, code: '01'},
  '02': { name: '掌', value: 0.1, code: '02' },
  '04': { name: '剑指', value: 0.1, code: '04' },
  '05': { name: '手法', value: 0.1, code: '05' },
  '06': { name: '身型', value: 0.1, code: '06' },
  '17': { name: '低势前蹬踩脚平衡', value: 0.1, code: '17' },
  '18': { name: '前举腿低势平衡', value: 0.1, code: '18' },
  '19': { name: '后插腿低势平衡', value: 0.1, code: '19' },
  '22': { name: '跌叉', value: 0.1, code: '22' },
  '23': { name: '分脚 / 蹬脚', value: 0.1, code: '23' },
  '25': { name: '摆莲拍脚 / 单拍脚', value: 0.1, code: '25' },
  '26': { name: '提膝（独立)', value: 0.1, code: '26' },
  '30': { name: '腾空飞脚 / 旋风脚 / 腾空摆莲', value: 0.1, code: '30' },
  '31': { name: '腾空正踢腿', value: 0.1, code: '31' },
  '50': { name: '弓步', value: 0.1, code: '50' },
  '51': { name: '马步', value: 0.1, code: '51' },
  '52': { name: '虚步', value: 0.1, code: '52' },
  '53': { name: '仆步', value: 0.1, code: '53' },
  '59': { name: '上步 / 退步 / 进步 / 跟步 / 侧行步', value: 0.1, code: '59' },
  '60': { name: '挂剑 / 撩剑 / 挂扇 / 撩扇', value: 0.1, code: '60' },
  '61': { name: '握剑 / 开扇 / 合扇', value: 0.1, code: '61' },
  '63': { name: '刺扇 / 劈扇', value: 0.1, code: '63' },
  '66': { name: '抛接扇', value: 0.1, code: '66' },
  '68': { name: '绞剑', value: 0.1, code: '68' },
  '69': { name: '点扇', value: 0.1, code: '69' },
};
  
// Other error deduction codes (70–79 series)
export const otherDeductions = [
  // 70 series
  {
    code: '70A',
    name: '躯干晃动',
    value: 0.05,
    description: '躯干平稳晃动 (Torso sways)'
  },
  {
    code: '70B',
    name: '脚步拖动/跳动',
    value: 0.1,
    description: '脚步拖动（跳动）(Foot shuffles or skips)'
  },

  // 71–72 Loss of Balance
  {
    code: '71',
    name: '附加支撑',
    value: 0.2,
    description: '附加支撑 (Additional Support)'
  },
  {
    code: '72',
    name: '倒地',
    value: 0.3,
    description: '倒地 (Fall)'
  },

  // 73–76 Weapons & Apparel
  {
    code: '73',
    name: '器械/扇面异常接触',
    value: 0.1,
    description:
      '器械触地、脱手、器械击中身体、变形、扇面与扇骨脱离 (Weapon unintentionally makes contact with the floor; Loss of grip; Weapon strikes the body; Weapon deforms; Fan surface is detached from fan’s ribs)'
  },
  {
    code: '74',
    name: '器械或扇骨断裂',
    value: 0.2,
    description:
      '器械断折；扇大骨或小扇骨折断、脱落 (Weapon Broken; Major or minor ribs of the fan break or fall off/detach)'
  },
  {
    code: '75',
    name: '器械掉落',
    value: 0.3,
    description: '器械掉地 (Weapon dropped on the floor)'
  },
  {
    code: '76',
    name: '小件落地/缠绕/服装问题',
    value: 0.1,
    description:
      '刀绳、剑穗、枪穗、软器械缠绕身体；刀绳、剑穗、枪穗、软器械落地；服装纽扣松开；鞋脱落 (Broad Sword Ribbon; Straight sword Tassel; Spear Tassel; Garment Item; Headwear dropped on the floor; Soft Weapon entangles hand or body; Shoes dropped off)'
  },

  // 77–79 Other
  {
    code: '77',
    name: '平衡动作错误',
    value: 0.1,
    description:
      '平衡动作未按项目特性节奏快速完成；平衡时保持的时间不足2秒 (Balance technique not completed rhythmically and quickly according to the characteristics of the event; Balance technique not maintained for at least 2 seconds)'
  },
  {
    code: '78',
    name: '出界',
    value: 0.1,
    description: '出界 (Out-of-bounds)'
  },
  {
    code: '79',
    name: '动作遗忘',
    value: 0.1,
    description: '遗忘 (Movement Forgotten)'
  }
];
