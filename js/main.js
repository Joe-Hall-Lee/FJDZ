// 主程序代码
/* canvas 画布绘制 bg 对象的左上角坐标 */
// 我们需要初始化两个坐标轴位置来绘制两次 bg
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = -650;

// 1．让画布能够绘制图片
// 1.1 找到这个画布
/* 初始化画布对象 */
const canvas = document.getElementById("canvas");
// 1.2 利用这个画布初始化一个 2D 的画笔
const context = canvas.getContext("2d");







// 初始化一个天空实例
const sky = new Sky(SKY);
// 初始化一个飞机界面加载实例
const loading = new Loading(LOADING);
// 初始化一个英雄实例，英雄是会变的
let hero = new Hero(HERO);
// state 表示游戏的状态，取值必须是以上的五种状态
let state = START;
// score 分数变量 life 变量
let score = 0;
let life = 3;
// 为 canvas 绑定一个点击事件，且当它是 START 状态的时候需要修改成 STARTING 状态
canvas.addEventListener("click", () => {
    if (state == START) {
        state = STARTING;
    }
});
// 为 canvas 绑定一个鼠标移动事件，鼠标正好在飞机图片的正中心
canvas.addEventListener("mousemove", (e) => {
    console.log(e.offsetX, e.offsetY);
    let x = e.offsetX;
    let y = e.offsetY;
    hero.x = x - hero.width / 2;
    hero.y = y - hero.height / 2;
})
// 为 canvas 绑定一个鼠标离开事件，鼠标离开时 RUNNING -> PAUSE
canvas.addEventListener("mouseleave", () => {
    if (state === RUNNING) {
        state = PAUSE;
    }
})
// 为 canvas 绑定一个鼠标进入事件，鼠标进入时 PAUSE -> RUNNING
canvas.addEventListener("mouseenter", () => {
    if (state === PAUSE) {
        state = RUNNING;
    }
})
// 碰撞检测函数
function checkHit() {
    // 遍历所有的敌机
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].hit(hero)) {
            // 敌机和英雄发生碰撞
            enemies[i].collide();
            hero.collide();
        }
        // 遍历所有的子弹
        for (let j = 0; j < hero.bulletList.length; j++) {
            // 用第 i 架敌机和第 j 个子弹进行碰撞检测，返回的是一个布尔类型
            enemies[i].hit(hero.bulletList[j]);
            // 如果碰到了才做某些事情
            if (enemies[i].hit(hero.bulletList[j])) {
                // 清除这架敌机，清除这颗子弹
                enemies[i].collide();
                hero.bulletList[j].collide();
            }
        }
    }
}
// 该变量中所有的敌机实例
const enemies = [];
// 敌机产生的速率
let ENEMY_CREATE_INTERVAL = 800;
let ENEMY_LASTTIME = new Date().getTime();
// 全局函数，隔一段时间就来初始化一架敌机
function createComponent() {
    const currentTime = new Date().getTime();
    if (currentTime - ENEMY_LASTTIME >= ENEMY_CREATE_INTERVAL) {
        // 当时间满足，实例化一架敌机，放入敌机数组中
        // 小飞机 60% 中飞机 30% 大飞机 10%
        // [0, 99]
        // Math.random() => [0, 1)
        // Math.random() * 100 => [0, 100) 随机的小数
        // Math.floor(Math.random() * 100)
        let ran = Math.floor(Math.random() * 100);
        if (ran < 60) {
            // 产生一架小飞机
            enemies.push(new Enemy(E1));
        } else if (ran < 90 && ran > 60) {
            // 产生一架中飞机
            enemies.push(new Enemy(E2));
        } else {
            // 产生一架大飞机
            enemies.push(new Enemy(E3));
        }
        // 更新时间
        ENEMY_LASTTIME = currentTime;
    }
    console.log(enemies);
}

// 全局函数，来判断所有的子弹/敌人组件
function judgeComponent() {
    for (let i = 0; i < hero.bulletList.length; i++) {
        hero.bulletList[i].move();
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].move();
    }

}
// 全局函数，来绘制所有的子弹/敌人组件，绘制 score & life 面板
function paintComponent() {
    for (let i = 0; i < hero.bulletList.length; i++) {
        hero.bulletList[i].paint(context);
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].paint(context);
    }
    // 绘制 score & life 面板
    // 10 score 左 life 右
    // 20 score 右 life 右
    context.font = "20px 微软雅黑";
    context.fillStyle = "red";
    context.textAlign = "left";
    context.fillText("score: " + score, 10, 20);
    context.textAlign = "right";
    context.fillText("life: " + life, 480 - 10, 20);

    // 重置代码，画笔重置为黑色，左对齐
    context.fillStyle = "black";
    context.textAlign = "left";
}
// 全局函数，来销毁所有的子弹/敌人组件，销毁掉英雄
function deleteComponent() {
    if (hero.destroy) {
        // 生命--
        life--;
        // 又活了
        hero.destroy = false;
        // 当生命值降低为 0 的时候，进入到游戏结束状态
        // 否则就产生一个新的英雄飞机
        if (life === 0) {
            state = END;
        } else {
            // 死了一次之后，重新初始化一个英雄实例
            hero = new Hero(HERO);
        }

    }
    for (let i = 0; i < hero.bulletList.length; i++) {
        // 判断有无飞出边界或者 destroy = true
        if (hero.bulletList[i].outOfBounds() || hero.bulletList[i].destroy) {
            // splice
            // index 操作位
            // count 操作数
            hero.bulletList.splice(i, 1);
        }
    }
    for (let i = 0; i < enemies.length; i++) {
        // 如果敌机处于一种待销毁状态 destroy = true
        if (enemies[i].outOfBounds() || enemies[i].destroy) {
            enemies.splice(i, 1);
        }
    }
}

// 当图片加载完毕的时候再去绘制背景
/*
 * eventName 事件的名称
 * callback 该事件执行完毕之后的回调函数
 */
// 当图片加载完毕时，需要做某些事情
// 加载图片
bg.addEventListener("load", () => {
    // 会实时地渲染整个 canvas 对象，当游戏进入到不同的状态的时候会渲染不同的内容
    // 保证页面的一个刷新率，一直在刷新，但是实际移动位置的判断交给每个实例 
    /*
     * callback: function 表示回调函数
     * timeout: Number 每隔多长时间会调用该回调函数
     */
    setInterval(() => {
        switch (state) {
            case START:
                // console.log("开始了")
                sky.judge();
                sky.paint(context);
                // 渲染飞机大战 LOGO
                // 图片原始宽高属性的获取 naturalWidth & naturalHeight
                let logo_x = (480 - copyright.naturalWidth) / 2;
                let logo_y = (650 - copyright.naturalHeight) / 2
                context.drawImage(copyright, logo_x, logo_y);
                break;
            case STARTING:
                // console.log("开始时")
                sky.judge();
                sky.paint(context);
                // 飞机加载类 Loading
                loading.judge();
                loading.paint(context);
                break;
            case RUNNING:
                console.log("运行时")
                // 渲染移动天空
                sky.judge();
                sky.paint(context);
                // 渲染我方飞机
                hero.judge();
                hero.paint(context);
                hero.shoot();
                createComponent();
                judgeComponent();
                deleteComponent();
                paintComponent();
                checkHit();
                break;
            case PAUSE:
                console.log("暂停时")
                // 渲染一个暂停图标
                let pause_x = (480 - pause.naturalWidth) / 2;
                let pause_y = (650 - pause.naturalHeight) / 2
                context.drawImage(pause, pause_x, pause_y);
                break;
            case END:
                console.log("结束时")
                // 渲染一个 GAME_OVER
                // 为 context 画笔对象设置一个 bold 24px 微软雅黑
                context.font = "bold 24px 微软雅黑";
                // fillText
                // text: String 填充的文本内容
                // x: 填充文本渲染的位置
                // 文本水平方式
                context.textAlign = "center";
                // 文本垂直对齐方式
                context.textBaseline = "middle";
                context.fillText("GAME_OVER", 480 / 2, 650 / 2);
                break;
        }
    }, 10);
});