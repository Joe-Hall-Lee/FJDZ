// 初始化一个敌机类
class Enemy {
    constructor(config) {
        // 敌机类型
        this.type = config.type;
        // 敌机宽度
        this.width = config.width;
        // 敌机高度
        this.height = config.height;
        // 敌机初始化位置
        this.x = Math.floor(Math.random() * (480 - config.width));
        this.y = -config.height;
        // 敌机生命
        this.life = config.life;
        // 敌机分数
        this.score = config.score;
        // 敌机图片库
        this.frame = config.frame;
        // 此时此刻展示的图片
        this.img = this.frame.live[0];
        // 活着的标示
        this.live = true;
        // 敌机速度
        // this.minSpeed = config.minSpeed;
        // this.maxSpeed = config.maxSpeed;
        this.speed = Math.floor(Math.random() * (config.minSpeed - config.maxSpeed + 1)) + config.maxSpeed;
        // 最后时间标示，在这个时间段，它是不变化的，但是过了这个时间，就要变化
        this.lastTime = new Date().getTime();
        // 死亡下标
        this.deathIndex = 0;
        // 确认销毁
        this.destroy = false;
    }
    // 判定是否需要渲染/怎么渲染/是否移动
    move() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastTime >= this.speed) {
            // 如果这架飞机是活着的，那么就直接播放活着的图片地址
            if (this.live) {
                this.img = this.frame.live[0];
                this.y++;
            } else {
                // 死的时候播放死亡动画 0 1 2 3
                // 活着、爆炸中、死亡
                this.img = this.frame.death[this.deathIndex++];
                // 如果死亡动画播放完毕之后就要销毁掉这架敌机
                if (this.deathIndex === this.frame.death.length) {
                    this.destroy = true;
                }
            }
            // 修正上一次时间
            this.lastTime = currentTime;
        }
    }
    // 渲染敌机
    paint(context) {
        context.drawImage(this.img, this.x, this.y);
    }
    outOfBounds() {
        if (this.y > 650) {
            return true;
        }
    }
    // 检测敌机是否有撞到其他物体（子弹/hero）
    // 敌机 e
    // 子弹 o
    hit(o) {
        // 其他物体的左边
        let ol = o.x;
        // 其他物体的右边
        let or = o.x + o.width;
        // 其他物体的顶边
        let ot = o.y;
        // 其他物体的底边
        let ob = o.y + o.height;
        // 敌机的左边
        let el = this.x;
        // 敌机的右边
        let er = this.x + this.width;
        // 敌机的顶边
        let et = this.y;
        // 敌机的底边
        let eb = this.y + this.height;
        // 判断它是否有碰到
        if (ol > er || or < el || ot > eb || ob < et) {
            // 没碰到
            return false;
        } else {
            // 碰到了
            return true;
        }
    }
    collide() {
        // 中弹了，生命减少 1
        this.life--;
        // 当这个实例的生命降低为 0 的时候，就需要调用其他方法
        if (this.life === 0) {
            // 1．将 live 标示标记为死亡状态
            // 2．播放死亡动画
            // 3．播放死亡动画完毕之后才真正地销毁掉这架飞机
            this.live = false;
            // 收获到敌机实例的分数
            score += this.score;
        }
    }
}