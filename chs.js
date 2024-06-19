/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Default Save": "默认存档",
    "Delete": "删除",
    "No": "否",
    "Saves": "存档",
    "Options": "选项",
    "Yes": "是",
    "Are you sure?": "你确定吗？",
    "Edit Name": "编辑名称",
    "Info": "信息",
    "Currently:": "当前:",
    "Appearance": "外观",
    "How the game looks.": "游戏看起来如何。",
    "Theme": "主题",
    "Show milestones": "显示里程碑",
    "Show TPS meter at the bottom-left corner of the page.": "在页面左下角显示 TPS。",
    "Show TPS": "显示 TPS",
    "None": "无",
    "Align modifier units": "对齐概览单位",
    "Align numbers to the beginning of the unit in modifier view.": "在概览视图中将数字与单元的开头对齐。",
    "Select which milestones to display based on criterias.": "根据标准选择要显示的里程碑。",
    "All": "全部",
    "Classic": "经典",
    "Configurable": "可配置",
    "Duplicate": "复制",
    "Mute": "静音",
    "Unmute": "播放",
    "You have conquered Mars. It lies in front of you, red, deserted and completely silent. And as you look at it, you ask yourself, \"Why did I even invade?\" But immediately the answer bubbles up. \"Because I'm good at it.\"": "你征服了火星。它就在你面前，红色的，荒芜的，完全的寂静。当你看着它的时候，你会问自己，“我为什么要入侵?但答案马上就冒出来了。“因为我很擅长。”",
    "appear frequently": "频繁出现",
    "Attack Wave": "攻击波",
    "Audio": "音频",
    "Bones Bomb": "骨头炸弹",
    "Cancel": "取消",
    "Copy": "复制",
    "Copy save": "复制保存",
    "Dear player,": "亲爱的玩家,",
    "Delete save": "删除存档",
    "Deleting your save resets all progress": "删除保存将重置所有进度",
    "Double Troopers": "骑兵翻倍",
    "Fresh Bones": "新鲜的骨头",
    "Hold X to fire": "按住X键开火",
    "I will absolutely NOT do it again": "我绝对不会再这样做了",
    "I will invade Mars again": "我将再次入侵火星",
    "I will invade Mars anyway": "无论如何我都要入侵火星",
    "I will not invade Mars": "我不会入侵火星",
    "Import save": "导入保存",
    "Impressive Helmet": "令人印象深刻的头盔",
    "Increases tree power from 2% to 3%. Makes": "将树的能量从2%提高到3%。使",
    "Invade without upgrades": "不升级入侵",
    "Join our Discord": "加入我们的Discord",
    "Lizardbrain": "蜥蜴大脑",
    "Louigi Verona's Workshop": "Louigi Verona的工作室",
    "Manure": "施肥",
    "Mars?": "火星?",
    "Obviously not": "显然不是",
    "OK": "好吧",
    "Plant 1 tree": "种一棵树",
    "Plant a Tree": "种一棵树",
    "Power": "战力",
    "Reincarnation Artefacts": "转世神器",
    "Restart Goal Growth": "重启目标成长",
    "Resume the invasion?": "是否继续入侵?",
    "Save Game": "保存游戏",
    "Scientific notation": "科学记数法",
    "Single blow produces 2 undead": "一击可产生2个亡灵",
    "So. Let's do it again.": "所以。我们再来一次。",
    "Special offer": "特惠",
    "Starts you with a full trooper regiment": "一开始你会有一个完整的骑兵团",
    "Support Louigi 💚︎": "支持Louigi💚︎",
    "Toggle": "切换",
    "Turn it off": "关闭它",
    "Turn it back on": "打开它",
    "Unimpressive Scythe": "不起眼的镰刀",
    "Volume": "音量",
    "Watney's Botany Textbook": "沃特尼的植物学课本",
    "why did you invade": "你为什么要入侵",
    "Yes please": "是的,请",
    "You are about to make a life-changing decision. There might be no turning back. But if you do find yourself in a pickle, you must hold your ground till the bitter end. Because if not, then": "你即将做出一个改变人生的决定。也许已经没有回头路了。但如果你发现自己陷入困境，你必须坚持到底。因为如果不是，那么",
    "A new RG is then calculated to compensate for your acquired power, but also some additional growth is added on top as cost.": "然后计算一个新的重启目标来补偿你获得的战力，但也会增加一些额外的增长作为成本。",
    "Compensated Restart Goal growth, which takes into account the effect of the trees": "补偿重启目标增长，考虑到树木的影响",
    "Double your manual power. Restart Goal will be increased only by 1%": "手动战力翻倍。重启目标只会增加1%",
    "How much has the Restart Goal grown by": "重启目标增长了多少",
    "If you pick an offer, Restart Goal will be increased by 5%": "如果你选择了一个报价，重启目标将增加5%",
    "Manual power": "手动战力",
    "Restart Goal is the number you need to reach in order to restart.": "重启目标是你需要达到的数字，以便重新开始。",
    "Saved": "已保存",
    "This bar shows how close we are to the Restart Goal": "这个栏显示了我们离重启目标有多近",
    "This makes reaching the next restart slightly longer.": "这使得到达下一次重启的时间稍微长一些。",
    "A mild danger to society": "对社会有轻微的危害",
    "Crabdusk": "黄昏之蟹",
    "Like a crab, only different": "像螃蟹一样，只是不同而已",
    "Rockin' Toothface": "摇滚牙脸怪",
    "An undead is added if you kill a monster with a single blow": "如果你用一击杀死一个怪物，将会增加一个亡灵",
    "Burning Dog": "燃烧的狗",
    "Elephprog": "大象",
    "Engineer": "工程师",
    "He's watching you": "他在看着你",
    "Increase your manual power": "提升手动战力",
    "Like your passive income, only better returns": "就像你的被动收入一样，只有更好的回报",
    "Plant 1 Tree": "种一棵树",
    "Roboeye": "机械眼",
    "Sacrifice the dead for significant damage": "牺牲死者以获得重大伤害",
    "Tough and unfair": "困难和不公平",
    "Units:": "单位:",
    "What \"This is fine dog\" eventually turns into": "“这是条好狗”最终变成了什么",
    "(max)": "(最大)",
    "| Collective power:": "| 集体战力:",
    "A blue trooper represents 10 units": "蓝色骑兵代表10个单位",
    "Average Martian": "普通火星人",
    "But he thinks he's a genius, of course": "当然，他认为自己是个天才",
    "Double per unit power": "单位战力翻倍",
    "Double the amount of troopers": "骑兵数量翻倍",
    "Each tree reduces Restart Goal by 2%": "每棵树使重启目标降低 2%",
    "He sciences the shit out of it": "他把科学搞得一团糟",
    "Increase per unit power by x5": "单位战力提升 x5",
    "It has no stop button": "它没有停止按钮",
    "Martian Cyborg": "火星机器人",
    "Power per unit:": "单位战力:",
    "Rolltack": "滚轮机",
    "Same as a cyborg, only from Mars": "和半机械人一样，只是来自火星",
    "Troopers galore!": "大量的骑兵!",
    "An almost ordinary crustacean, roaming the depths and hunting for unsuspecting invaders": "一种几乎普通的甲壳类动物，在深海漫游，寻找毫无防备的入侵者",
    "Blipy": "哔哔",
    "Decrease Restart Goal by 2%": "将重启目标降低2%",
    "Dragonbust": "龙身像",
    "Each tree reduces RG by 2% | A purple tree represents 10 units": "每棵树减少2%的RG |紫色树代表10个单位",
    "Even more gadgets": "更多的小玩意",
    "Grudbuck": "格鲁巴克",
    "Incessantly annoying": "不停地烦人",
    "Martian Robocyborg": "火星机器人",
    "Martitruck": "运输车",
    "Reset tree price": "重置树的价格",
    "Stuck and furious!": "被困住了，愤怒!",
    "Will bust your chops": "会让你抓狂的",
    "Almost completely destroyed, Roboflick hides behind his sturdy shuttle and slids inside. \"The princess is in another castle!\" he shouts at you and cackles wildly.": "几乎被完全摧毁了，罗博夫利克 躲在他结实的穿梭机后面，滑了进去。“公主在另一座城堡里!”他对你大喊大叫，疯狂地咯咯笑着。",
    "Everyone's boss": "每个人的Boss",
    "Roboflick": "罗博夫利克",
    "You won't get away, you fiend!": "你跑不掉的，你这个魔鬼!",
    "Roboflick's Shuttle": "罗博夫利克的穿梭机",
    "Badly hurt, Roboflick tries to escape": "罗博夫利克受了重伤，试图逃跑",
    "Martian Probe": "火星探测器",
    "He stands up for his son": "他支持他的儿子",
    "Karate Kid aka Martial Arts Luke": "空手道小子又名武术卢克",
    "Left on the planet to spy on the invaders": "留在这个星球上监视入侵者",
    "Luke's Father": "卢克的父亲",
    "Martian Observer": "火星观察者",
    "The last stand of Mars, he uses the Force": "火星的最后一战，他使用了原力",
    "The Real Boss": "真正的Boss",
    "The sturdiest lifeform on the planet, bwahaha": "地球上最强壮的生命形式，哈哈",
    "A Forgotten Megatank": "被遗忘的巨型坦克",
    "The crew refuses to surrender": "船员们拒绝投降",
    "The Real Martian": "真正的火星人",
    "You've been lied to, the real martians have just one eye": "你被骗了，真正的火星人只有一只眼睛",
    "Charge!": "冲锋!",
    "Go!": "冲哇!",
    "Move out!": "出发!",
    "Copied": "已复制",
    "Start with a full regiment of troopers": "开局时拥有一整团的骑兵",
    "Tree power is increased from 2% to 3%. \"Plant a Tree\" now appears frequently": "树木力量从 2% 增加至 3%。“种一棵树”现在频繁出现",
    "Two undead are added if you kill a monster with a single blow": "如果你一击杀死一个怪物，就会增加两个亡灵",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Scientific": "科学计数法",
    "Standard": "标准",
    "Blind": "盲文",
    "Letters": "字母",
    "Mixed Engineering": "混合工程",
    "Mixed Scientific": "混合科学",
    "Chemistry": "化学",
    "Engineering": "工程符号",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    'i': 'i',
    'I': 'I',
    'II': 'I',
    'III': 'III',
    'IV': 'IV',
    'V': 'V',
    'VI': 'VI',
    'VII': 'VII',
    'VIII': 'VIII',
    'X': 'X',
    'XI': 'XI',
    'XII': 'XII',
    'XIII': 'XIII',
    'XIV': 'XIV',
    'XV': 'XV',
    'XVI': 'XVI',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'H': 'H',
    'I': 'I',
    'J': 'J',
    'K': 'K',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'O': 'O',
    'P': 'P',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
    '<': '<',
    '<<': '<<',
    '>': '>',
    '>>': '>>',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀，此处可以截取语句开头部分的内容进行汉化
//例如：Coin: 13、Coin: 14、Coin: 15... 这种有相同开头的语句
//可以在这里汉化开头："Coin: ":"金币: "
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": " ",
    " ": " ",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Notation: ": "符号: ",
    "Toggle Music: ": "切换声音: ",
    "Upgrade Troopers": "升级骑兵",
    "Restart with x": "重启 x",
    "In absolute numbers: ": "按绝对数字: ",
    "Decrease RG by ": "减少重启目标 ",
    "Offer target: ": "报价目标: ",
    "RG -": "重启目标 -",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀，此处可以截取语句结尾部分的内容进行汉化
//例如：13 Coin、14 Coin、15 Coin... 这种有相同结尾的语句
//可以在这里汉化结尾：" Coin":" 金币"
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "/sec)": "/秒)",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)h ([\d\.]+)m ([\d\.]+)s$/,
    /^([\d\.]+)y ([\d\.]+)d ([\d\.]+)h$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\$([\d\.]+)$/,
    /^\(([\d\.]+)\)$/,
    /^([\d\.]+)\%$/,
    /^([\d\.]+)\/([\d\.]+)$/,
    /^([\d\.]+)M\/([\d\.]+)M$/,
    /^([\d\.]+)K\/([\d\.]+)K$/,
    /^([\d\.]+)T\/([\d\.]+)T$/,
    /^([\d\.]+)Qi\/([\d\.]+)Qi$/,
    /^([\d\.]+)\/([\d\.,]+)$/,
    /^([\d\.,]+)\/([\d\.,]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)k$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)T$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+)Qa$/,
    /^([\d\.]+)Qi$/,
    /^([\d\.]+)Sx$/,
    /^([\d\.]+)Sp$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+) T$/,
    /^([\d\.]+) Qi$/,
    /^([\d\.]+) Qa$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\$([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+) \/ ([\d\.]+)e([\d\.,]+)$/,
    /^\$([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.,]+)\/([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)\/([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e\+([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^RG \+([\d\.]+)\%$/, '重启目标 \+$1\%'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\+ ([\d\.,]+) Undead$/, '\+ $1 亡灵'],
    [/^\+([\d\.,]+) Troopers$/, '\+$1 骑兵'],
    [/^Day ([\d\.,]+)$/, '天数 $1'],
    [/^([\d\.,]+) Undead$/, '$1 亡灵'],
    [/^x([\d\.,]+) or x([\d\.,]+)$/, 'x$1 或 x$2'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);