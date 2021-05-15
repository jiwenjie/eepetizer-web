// 首页 index 中相关数据，包括每日推荐、娱乐等等分类的视频和相关信息数据

// 每日推荐模块
let dailyRecommendation = [
    {
        id: '222959',
        hrefUrl: '/video/video-detail?resource_id=222959&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/339a74373a37637221ba788c7057db3a.png?imageMogr2/quality/60/format/jpg',
        // imgUrl: 'http://img.kaiyanapp.com/339a74373a37637221ba788c7057db3a.png?imageMogr2/quality/60/format/jpg',
        desc: "一个点赞能改变什么？动画师的「桌面日常」",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/222959.mp4'
    },
    {
        id: '250220',
        hrefUrl: '/video/video-detail?resource_id=250220&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/0aa60f63960f619f064e2b1442c0ad5e.png?imageMogr2/quality/60/format/jpg',
        // imgUrl: 'http://img.kaiyanapp.com/0aa60f63960f619f064e2b1442c0ad5e.png?imageMogr2/quality/60/format/jpg',
        desc: "广告版「婚姻故事」，埃及顶尖家电品牌",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/250220.mp4'
    },
    {
        id: '250119',
        hrefUrl: '/video/video-detail?resource_id=250119&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/9c4bc386ccf3929f9339512e3dbfd67a.png?imageMogr2/quality/60/format/jpg',
        // imgUrl: 'http://img.kaiyanapp.com/9c4bc386ccf3929f9339512e3dbfd67a.png?imageMogr2/quality/60/format/jpg',
        desc: "国内创意热店获奖作品「赛博女刺客」",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/250119.mp4'
    },
    {
        id: '249591',
        hrefUrl: '/video/video-detail?resource_id=249591&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/50fac99799893b96589fc7f6f237cf86.png?imageMogr2/quality/60/format/jpg',
        // imgUrl: 'http://img.kaiyanapp.com/50fac99799893b96589fc7f6f237cf86.png?imageMogr2/quality/60/format/jpg',
        desc: "加拿大影像创意：我，一位死宅青年",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/249591.mp4'
    },
    {
        id: '250160',
        hrefUrl: '/video/video-detail?resource_id=250160&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/8fc9d27753d44863a69d092187bf510e.jpeg?imageMogr2/quality/60/format/jpg',
        // imgUrl: 'http://img.kaiyanapp.com/8fc9d27753d44863a69d092187bf510e.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "移轴摩尔多瓦，小小的国家小小的可爱",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/250160.mp4'
    },
    {
        id: '250074',
        hrefUrl: '/video/video-detail?resource_id=250074&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/c7f3fc840c7dc16df3cc8f713008d0fa.jpeg?imageMogr2/quality/60/format/jpg',
        // imgUrl: 'http://img.kaiyanapp.com/c7f3fc840c7dc16df3cc8f713008d0fa.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "值得被看见，跨性别摄影师将镜头对准自己",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/250074.mp4'
    },
];


// 旅行模块
let travel = [
    {
        id: '220775',
        hrefUrl: '/video/video-detail?resource_id=220775&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/6996e49ffb5d4ebf047f4472dcf86fbd.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "3 分钟延时摄影，品尝洛杉矶「滋味」",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/220775.mp4'
    },
    {
        id: '222084',
        hrefUrl: '/video/video-detail?resource_id=222084&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/9526a1005a1d672cf217f20ec29a9fde.png?imageMogr2/quality/60/format/jpg',
        desc: "视角炸裂！穿越机带给你全新视觉体验",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/222084.mp4'
    },
    {
        id: '219338',
        hrefUrl: '/video/video-detail?resource_id=219338&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/901093859fef8cbeadfa3acf68acf865.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "壁纸动起来，瑞士的每一帧都是童话",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/219338.mp4'
    },
    {
        id: '219143',
        hrefUrl: '/video/video-detail?resource_id=219143&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/84e1acc08209e7e1034dd30f512df58d.png?imageMogr2/quality/60/format/jpg',
        desc: "胶片里的印度，记忆中的故乡",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/219143.mp4'
    },
    {
        id: '216539',
        hrefUrl: '/video/video-detail?resource_id=216539&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/c00e417e30590273ca3a2a1ccb6837bf.png?imageMogr2/quality/60/format/jpg',
        desc: "中国风光｜留学生视角下的台湾",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/216539.mp4'
    },
    {
        id: '215612',
        hrefUrl: '/video/video-detail?resource_id=215612&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/3e1ba6749bf53cc9ef7c6186c499d388.png?imageMogr2/quality/60/format/jpg',
        desc: "「法罗群岛」｜自由呼吸，孤独之旅",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/215612.mp4'
    },
];

// 运动模块
let movement = [
    {
        id: '228161',
        hrefUrl: '/video/video-detail?resource_id=228161&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/86f567e6d7d3b1e9ffe15c76af301be5.png?imageMogr2/quality/60/format/jpg',
        desc: "滑雪，有时候拍的不是技巧，是情怀",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/228161.mp4'
    },
    {
        id: '222760',
        hrefUrl: '/video/video-detail?resource_id=222760&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/af039ed2e8637b917d8175518f90729d.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "打死我都不信，这支视频的目的是健身教程",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/222760.mp4'
    },
    {
        id: '222309',
        hrefUrl: '/video/video-detail?resource_id=222309&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/5f3032193faefbf1ad4b90688f492b61.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "Fetish 爱好者是如何将运动发挥到极致",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/222309.mp4'
    },
    {
        id: '219333',
        hrefUrl: '/video/video-detail?resource_id=219333&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/7f2146eb583a0fca45c2f028c3197b2f.png?imageMogr2/quality/60/format/jpg',
        desc: "今年最好看的 10 个极限运动，都在这条 Gopro 短片里",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/219333.mp4'
    },
    {
        id: '218104',
        hrefUrl: '/video/video-detail?resource_id=218104&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/585319c4bbcf3283a2fffb7d4c96ef58.png?imageMogr2/quality/60/format/jpg',
        desc: "滑雪、翼装、山地，这位大神无所不能",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/218104.mp4'
    },
    {
        id: '216959',
        hrefUrl: '/video/video-detail?resource_id=216959&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/2601792e55c5c0404e34472d13a626a1.png?imageMogr2/quality/60/format/jpg',
        desc: "山地车大神，「人车合一」超我境界",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/216959.mp4'
    },
];

// 摄影模块
let photography = [
    {
        id: '225682',
        hrefUrl: '/video/video-detail?resource_id=225682&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/c2e16e3fd2471a8c340347eec25bdd24.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "纽约这只「城市巨兽」，猛在哪里？",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/225682.mp4'
    },
    {
        id: '206714',
        hrefUrl: '/video/video-detail?resource_id=206714&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/eba76cb53a6ee1a0a9709e0a1ddf43df.png?imageMogr2/quality/60/format/jpg',
        desc: "创意运动视觉｜你的孤独是一门艺术",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/206714.mp4'
    },
    {
        id: '224492',
        hrefUrl: '/video/video-detail?resource_id=224492&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/aa46d61c6c2c3c0b7466cf389ebcc3ad.png?imageMogr2/quality/60/format/jpg',
        desc: "黑白光影变化，摄影真正的高级感",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/224492.mp4'
    },
    {
        id: '223479',
        hrefUrl: '/video/video-detail?resource_id=223479&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/aa46d61c6c2c3c0b7466cf389ebcc3ad.png?imageMogr2/quality/60/format/jpg',
        desc: "来和乐手们玩一场「光影游戏」",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/223479.mp4'
    },
    {
        id: '217521',
        hrefUrl: '/video/video-detail?resource_id=217521&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/d51c673643aa1327a4c5d7fecaf2aab7.png?imageMogr2/quality/60/format/jpg',
        desc: "这支创意短片通过「手」展示生活",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/217521.mp4'
    },
    {
        id: '216906',
        hrefUrl: '/video/video-detail?resource_id=216906&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/dd15ead55ae8946d343b3075c582cc29.png?imageMogr2/quality/60/format/jpg',
        desc: "视觉创意：缘未来乃梦境",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/216906.mp4'
    },
];

// 艺术模块数据
let art = [
    {
        id: '228451',
        hrefUrl: '/video/video-detail?resource_id=228451&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/8ec35e5008243797cd0103f38cb9ef76.jpeg?imageMogr2/quality/60/format/jpg',
        desc: "世界上最小的电影，放大 1 亿倍才能看",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/228451.mp4'
    },
    {
        id: '227306',
        hrefUrl: '/video/video-detail?resource_id=227306&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/f925a00509284532fc43d09d914b8739.png?imageMogr2/quality/60/format/jpg',
        desc: "若要回忆童年，一颗美丽的泡泡足以",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/227306.mp4'
    },
    {
        id: '225709',
        hrefUrl: '/video/video-detail?resource_id=225709&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/7ac6f021ae7037b4e337d4380f787c4f.png?imageMogr2/quality/60/format/jpg',
        desc: "入围影片：白色的马",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/225709.mp4'
    },
    {
        id: '224307',
        hrefUrl: '/video/video-detail?resource_id=224307&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/78cedacecfb8fc1cc6c9f0f8b029275a.png?imageMogr2/quality/60/format/jpg',
        desc: "看不懂「星际穿越」的五维空间，请别看此片",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/224307.mp4'
    },
    {
        id: '222161',
        hrefUrl: '/video/video-detail?resource_id=222161&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/dd44e742492fe072ce8de08669592df8.png?imageMogr2/quality/60/format/jpg',
        desc: "禅意空间，灵感来自最独特建筑大师",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/222161.mp4'
    },
    {
        id: '215777',
        hrefUrl: '/video/video-detail?resource_id=215777&resource_type=pgc_video',
        imgUrl: 'http://img.kaiyanapp.com/95e341a4fb9e53e33640dc72c0c31363.png?imageMogr2/quality/60/format/jpg',
        desc: "神级创意 CG，舒适到难以想象的「永动机」",
        videoUrl: 'http://oss-cn-beijing.aliyuncs.com/static-thefair-bj/eyepetizer/pgc_video/video_summary/215777.mp4'
    },
];

export default { 
    dailyRecommendation,    // 每日推荐模块
    travel,         // 旅行模块
    movement,       // 运动模块
    photography,     // 摄影模块
    art             // 艺术模块
}