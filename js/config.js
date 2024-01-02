// 配置项文件
// 定义游戏的状态
// 开始
const START = 0;
// 开始时
const STARTING = 1;
// 运行时
const RUNNING = 2;
// 暂停时
const PAUSE = 3;
// 结束时
const END = 4;

// 创建一个配置文件，收藏所有的图片路径
const IMAGES = {
    b: "img/bullet1.png",
    bg: "img/background.png",
    copyright: "img/shoot_copyright.png",
    pause: "img/game_pause.png",
    loading_frame: [
        "img/game_loading1.png",
        "img/game_loading2.png",
        "img/game_loading3.png",
        "img/game_loading4.png",
    ],
    hero_frame_live: ["img/hero1.png", "img/hero2.png"],
    hero_frame_death: [
        "img/hero_blowup_n1.png",
        "img/hero_blowup_n2.png",
        "img/hero_blowup_n3.png",
        "img/hero_blowup_n4.png",
    ],
    e1_live: ["img/enemy1.png"],
    e1_death: [
        "img/enemy1_down1.png",
        "img/enemy1_down2.png",
        "img/enemy1_down3.png",
        "img/enemy1_down4.png",
    ],
    e2_live: ["img/enemy2.png"],
    e2_death: [
        "img/enemy2_down1.png",
        "img/enemy2_down2.png",
        "img/enemy2_down3.png",
        "img/enemy2_down4.png",
    ],
    e3_live: ["img/enemy3_n1.png", "img/enemy3_n2.png"],
    e3_death: [
        "img/enemy3_down1.png",
        "img/enemy3_down2.png",
        "img/enemy3_down3.png",
        "img/enemy3_down4.png",
        "img/enemy3_down5.png",
        "img/enemy3_down6.png",
    ],
};
/**
 * 该方法用于加载初始化一张图片
 * @param {String / Array} src 图片路径
 * @returns {Image} 根据这个路径地址生成一张图片
 */
function createImage(src) {
    let img;
    if (typeof src === "string") {
        img = new Image();
        img.src = src;
    } else {
        img = [];
        for (let i = 0; i < src.length; i++) {
            img[i] = new Image();
            img[i].src = src[i];
        }
    }
    return img;
}

// 2．加载这张图片，图片加载/初始化这个过程是异步的
// 初始化子弹图片
const b = createImage(IMAGES.b);
/* 初始化背景图片 */
const bg = createImage(IMAGES.bg);

// 初始化一个图片 LOGO
const copyright = createImage(IMAGES.copyright);

// 初始化暂停图片
const pause = createImage(IMAGES.pause);

// 初始化四张飞机大战加载图片
const loading_frame = createImage(IMAGES.loading_frame);
// 英雄的所有图片
const hero_frame = {
    live: createImage(IMAGES.hero_frame_live),
    death: createImage(IMAGES.hero_frame_death),
};
// 小型飞机所有图片
const e1 = {
    live: createImage(IMAGES.e1_live),
    death: createImage(IMAGES.e1_death),
};

// 中型飞机所有图片
const e2 = {
    live: createImage(IMAGES.e2_live),
    death: createImage(IMAGES.e2_death),
};
// 大型飞机所有图片
const e3 = {
    live: createImage(IMAGES.e3_live),
    death: createImage(IMAGES.e3_death),
};

// ES6 新增的写法更加接近于后台语言 Java
// 实际上和 ES5 的构造函数没有本质差别
// function Sky() {}
// 静态属性 & 动态方法，两个部分
// 静态属性，提供到一个叫 constructor 函数中，构造器函数，每当你 new XXX() 总会先调用这个 constructor() 函数

// 天空类的配置项
const SKY = {
    bg: bg,
    width: 480,
    height: 650,
    /* 10 ms 变化一次，数字越大，速度越慢；数字越小，速度越快 */
    speed: 10,
};

// 飞机加载界面的配置项
const LOADING = {
    frame: loading_frame,
    width: 186,
    height: 38,
    x: 0,
    y: 650 - 38,
    speed: 400,
};

// 英雄配置项
const HERO = {
    frame: hero_frame,
    width: 90,
    height: 124,
    speed: 10,
};

// 子弹配置项
const BULLET = {
    img: b,
    width: 9,
    height: 21,
};

// 小飞机配置项
const E1 = {
    type: 1,
    width: 57,
    height: 51,
    life: 1,
    score: 1,
    frame: e1,
    minSpeed: 20,
    maxSpeed: 10,
};
const E2 = {
    type: 2,
    width: 69,
    height: 95,
    life: 5,
    score: 5,
    frame: e2,
    minSpeed: 50,
    maxSpeed: 20,
};
const E3 = {
    type: 3,
    width: 169,
    height: 258,
    life: 20,
    score: 20,
    frame: e3,
    minSpeed: 100,
    maxSpeed: 100,
};
