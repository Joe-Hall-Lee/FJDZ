// 初始化一个英雄类
class Hero {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.x = (480 - config.width) / 2;
        this.y = 650 - config.height;
        this.frame = config.frame;
        this.frameLiveIndex = 0;
        this.frameDeathIndex = 0;
        this.lastTime = new Date().getTime();
        this.speed = config.speed;
        // 当前展示的图片
        this.img = null;
        this.live = true;
        // 子弹上次射击的时间
        this.lastShootTime = new Date().getTime();
        // 子弹射击的间隔
        this.shootInterval = 200;
        // 子弹夹数组
        this.bulletList = [];
        this.destroy = false;
    }
    judge() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastTime > this.speed) {
            // frame = {
            //     live: [图片1, 图片2]
            //     death: [图片1, 图片2, 图片3, 图片4]
            // }
            if (this.live) {
                this.img = this.frame.live[this.frameLiveIndex++ % this.frame.live.length];
            } else {
                // 0 1 2 3 4
                this.img = this.frame.death[this.frameDeathIndex++];
                // 到 4 的时候英雄死了
                if (this.frameDeathIndex === this.frame.death.length) {
                    this.destroy = true;
                }
            }
            this.lastTime = currentTime;
        }
    }
    paint(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    // 英雄可以射击子弹
    shoot() {
        // 获取当前时间
        const currentTime = new Date().getTime();
        // 飞机的位置
        if (currentTime - this.lastShootTime > this.shootInterval) {
            let bullet = new Bullet(BULLET, this.x + this.width / 2 - BULLET.width / 2, this.y - BULLET.height);
            // 英雄飞机要认领这个子弹
            this.bulletList.push(bullet);
            // 在网页上绘制一个子弹对象
            bullet.paint(context);
            // 更新英雄射击时间
            this.lastShootTime = currentTime;
        }
    }
    collide() {
        // 将活着标识符切换为 false
        // 活着 -> 爆炸中 -> 死亡（销毁）
        this.live = false;
    }
}
