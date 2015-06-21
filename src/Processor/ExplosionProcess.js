function explosionprocess_constructor(sb) {
    // constructor() {
    // let that = this;

    let explosions = [];
    let particleProgram = sm.init('lifetimeparticle');
    let gl = sb.getGL();
    let camera = sb.getCamera();


    let init = function () {

        let texture = texture_constuctor('smoke');

        sb.subscribe("explosion", function (name, entity) {

            createNewExplosion(entity.xPos, entity.zPos);


        });

        sb.subscribe("bigexplosion", function (name, entity) {

            createNewExplosion(entity.xPos, entity.zPos);


        });

        explosions = [];
        particleProgram = sm.init('lifetimeparticle');

        texture = new Texture('smoke');

    }


    let simpleWorldToViewX = function (x) {
        return x / resolutionWidth;
    }

    let simpleWorldToViewY = function (y) {

        return y / resolutionHeight;
    }

    let update = function (elapsed) {

        for (let i = 0; i < explosions.length; i++) {
            if (explosions[i].time > 5)
                explosions.splice(i, 1);
            else {
                explosions[i].time += elapsed / 3000;
            }
        }

    }


    let createNewExplosion = function (x, z) {
        //slow

        let particle = asteroidexplosion_constructor(x, 0, z);


        explosions.push(particle);

    }

    let draw = function () {

        gl.disable(gl.DEPTH_TEST);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        sm.setProgram(particleProgram);

        for (let i = 0; i < explosions.length; i++) {
            camera.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, explosions[i].pointLifetimeBuffer);
            gl.vertexAttribPointer(particleProgram.pointLifetimeAttribute, explosions[i].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, explosions[i].pointStartPositionsBuffer);
            gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, explosions[i].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, explosions[i].pointEndPositionsBuffer);
            gl.vertexAttribPointer(particleProgram.pointEndPositionAttribute, explosions[i].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture.loadedTexture);
            gl.uniform1i(particleProgram.samplerUniform, 0);


            gl.uniformMatrix4fv(particleProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(particleProgram.uMVMatrix, false, camera.getMVMatrix());

            gl.uniform3f(particleProgram.centerPositionUniform, explosions[i].xPos, 0, explosions[i].zPos);
            gl.uniform4f(particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
            gl.uniform1f(particleProgram.timeUniform, explosions[i].time);

            gl.drawArrays(gl.POINTS, 0, explosions[i].pointLifetimeBuffer.numItems);
            camera.mvPopMatrix();
        }

        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);


    }
}




















