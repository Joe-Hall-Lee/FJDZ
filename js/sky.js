// 初始化一个天空类
class Sky {
    constructor(config) {
        // 静态属性
        // 静态图片
        this.bg = config.bg;
        // 背景宽度
        this.width = config.width;
        // 背景高度
        this.height = config.height;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = -this.height;
        // 10 => 10 ms
        this.speed = config.speed;
        // 最后更新时间
        this.lastTime = new Date().getTime();
    }
    // 动态方法
    // 判断方法
    // 判断这个时间段天空是否需要移动 y1, y2++
    // 拿到当前的时间节点，有一个速度节点，拿到一个历史时间
    // 当前时间 - 速度时间，如果大于历史时间的话，那么就需要移动
    judge() {
        let currentTime = new Date().getTime();
        // currentTime 10015 // lastTime 10000 = 10
        if (currentTime - this.lastTime > this.speed) {
            this.y1++;
            this.y2++;
            // 时间的更新
            this.time = currentTime;
        }
        // 当第二张图片也滚到最下面的时候，就需要让两张图片回到初始的状态
        if (this.y2 === 0) {
            this.y1 = 0;
            this.y2 = -650;
        }
    }
    // 绘图方法
    paint(context) {
        /*
         * image 加载的图片对象
         * dX 图片开始绘制的左上角的那个横坐标
         * dY 图片开始绘制的左上角的那个纵坐标
         * dWidth 图片在 canvas 绘制的宽度（缺省值表示的就是绘制到整张 canvas 对象中）
         * dHeight 图片在 canvas 绘制的高度（缺省值表示的就是绘制到整张 canvas 对象中）
         */
        context.drawImage(this.bg, this.x1, this.y1, this.width, this.height);
        context.drawImage(this.bg, this.x2, this.y2, this.width, this.height);
    }
    // 初始化/实例化一个 Sky 类型的 sky 变量
    // 飘哥和人类
    // 飘哥是具象的，是一个实实在在、有血有肉的一个人
    // 人类是抽象的，只是一个抽象的概念，当项目中需要一个实际的人的时候，你就需要通过 new Person() 的形式来实例化一个对象
}