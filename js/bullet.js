// 初始化一个子弹类
class Bullet {
    constructor(config, x, y) {
        this.img = config.img;
        this.width = config.width;
        this.height = config.height;
        this.x = x;
        this.y = y;
        this.destroy = false;
    }

    // 子弹绘制方法
    paint(context) {
        context.drawImage(this.img, this.x, this.y)
    }

    // 移动子弹 this.y--
    move() {
        this.y -= 2;
    }
    outOfBounds() {
        // 如果返回的是真的的话，那么我们应该销毁掉这个子弹
        return this.y < -this.height;
    }
    collide() {
        // 让这颗子弹变成可销毁状态
        this.destroy = true;
    }
}
