function pulseGunComponent(sprite) {
    'use strict';

    //constructor() {
    var name = 'PulseGunComponent';

    var bulletsAmount = 80;
    var bulletReloadSpeed = 400;
    var bullets = [];
    var bulletShot = 0;

    var pointStartPositionsBuffer;

    //build buffers
    //var position = [];

    //cant create buffer on every loop. Need to create one buffer for every bullet.
    //position.push(bullets[i].getXPos());
    //position.push(bullets[i].getYPos());
    //position.push(bullets[i].getZPos());

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSprite: function() {
            return sprite;
        },

        getBulletsAmount() {
            return bulletsAmount;
        },

        getPointStartPositionBuffer() {
            return pointStartPositionsBuffer;
        },
        setPointStartPositionBuffer(v) {
            pointStartPositionsBuffer = v;
        },
        getBullets() {
            return bullets;
        },
        setBullets(v) {
            bullets = v;
        },
        setBulletShot(v) {
            bulletShot = v;
        },
        getBulletShot() {
            return bulletShot;
        },
        getBulletReloadSpeed() {
            return bulletReloadSpeed;
        }

    });

}
