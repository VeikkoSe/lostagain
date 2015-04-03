class EntityFactory {
    constructor() {

        //this.controllable = new Controllable();

    }

    createShip() {

        var e = em.addNew('ship');
        var mesh = mm.getOrAddMesh('ship');
        e.addComponent(new MeshComponent(mesh));

        e.addComponent(new MomentumMovable(30, 15, 0, 0));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 1, -180, 0, -90));
        //e.addComponent(new Selectable());
        e.addComponent(new Controllable());

        e.addComponent(new HealthComponent(5, new Sprite("hp", -0.9, -0.8)));
        e.addComponent(new ShieldComponent(10, new Sprite("shield", -0.9, -0.74)));
        e.addComponent(new BulletComponent(new Sprite("bigbullet", 0, 0)));

    }

    createStars() {

        var e = em.addNew('stars');
        //var mesh = mm.getOrAddMesh('ship');
        //e.addComponent(new MeshComponent(mesh));

        e.addComponent(new StarComponent());
        //e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 1, -180, 0, -90));
        //e.addComponent(new Selectable());
        //e.addComponent(new Controllable());

        //e.addComponent(new HealthComponent(5, new Sprite("hp", -0.9, -0.8)));
        //e.addComponent(new ShieldComponent(10, new Sprite("shield", -0.9, -0.74)));
        //e.addComponent(new BulletComponent(new Sprite("bigbullet", 0, 0)));

    }




    createEnemy() {

        var e = em.addNew('enemymirror');
        var mesh = mm.getOrAddMesh('enemy');
        e.addComponent(new MeshComponent(mesh));
        e.addComponent(new EnemyComponent());

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));
        e.addComponent(new Renderable(-100, mesh.yPos, -100, 1, -180, 90, -90));
        //e.addComponent(new Selectable());
        //e.addComponent(new Controllable());

        //e.addComponent(new HealthComponent(15));
        //e.addComponent(new Shield(10, new Sprite("shield", -0.9, -0.74)));


    }


    createMotherShip() {

        var e = em.addNew('mothership');
        var mesh = mm.getOrAddMesh('mothership');
        e.addComponent(new MeshComponent(mesh));

        e.addComponent(new Movable(30));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 2));
        e.addComponent(new Selectable());
        e.addComponent(new Controllable());
        //can be only one. Camera follows this entity
        e.addComponent(new CameraController());
        e.addComponent(new JumpArea());


    }


    createTerrain() {

        var e = em.addNew('terrain');
        var mesh = mm.getOrAddMesh('terrain');
        e.addComponent(new MeshComponent(mesh));

        // e.addComponent(new Movable(30));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));
        // e.addComponent(new Selectable());
        // e.addComponent(new Controllable());
        //can be only one. Camera follows this entity
        // e.addComponent(new CameraController());
        //  e.addComponent(new JumpArea());


    }



    createAsteroid() {

        var e = em.addNew();
        var mesh = mm.getOrAddMesh('asteroid');
        e.addComponent(new MeshComponent(mesh, 1, 6));
        e.addComponent(new Renderable(helpers.getRandomInt(-20), 0, helpers.getRandomInt(20), 2));


    }

    createBox() {

        var e = em.addNew();
        var mesh = mm.getOrAddMesh('box2');

        var vertexPositionBuffer = gl.createBuffer();

        var rends = [];
        var combinedMeshes = {};
        combinedMeshes.vertices = [];
        combinedMeshes.indices = [];
        combinedMeshes.worldCoordinates = [];


        var cube = new Cube();
        var verts = cube.vertices();

        vertexPositionBuffer.nums = 0;
        for (var g = 0; g < 10000; g++) {
            var x = helpers.getRandomInt(-50, 50);
            var z = helpers.getRandomInt(-50, 50);
            var y = helpers.getRandomInt(-50, 50);
            //alert(verts.length/3);
            for (var i = 0; i < verts.length; i += 3) {


                var newVerts = [];


                //object coordinates
                newVerts.push(verts[i]);
                newVerts.push(verts[i + 1]);
                newVerts.push(verts[i + 2]);
                //world xyx
                newVerts.push(x);
                newVerts.push(y);
                newVerts.push(z);
                //number of the object
                newVerts.push(g);
                newVerts.push(g);
                newVerts.push(g);

                combinedMeshes.vertices.push.apply(combinedMeshes.vertices, newVerts);


            }


            vertexPositionBuffer.nums += verts.length / 3;
        }


        //gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(combinedMeshes.vertices), gl.STATIC_DRAW);


        //combinedMeshes.vertexPositionBuffer = vertexPositionBuffer;

        //e.addComponent(new MultiRenderable(combinedMeshes));


    }


    createBackground() {

        var e = em.addNew();
        var mesh = new Mesh("background");


        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));

        e.addComponent(new MeshComponent(mesh));


    }


    createFuel() {


        var e = em.addNew();
        var mesh = mm.getOrAddMesh('fuel');
        e.addComponent(new MeshComponent(mesh));

        //e.addComponent(new Movable(12));
        e.addComponent(new Renderable(110, 0, 50, 50));
        e.addComponent(new ConstantRotation(10, 10, 10));
        //e.addComponent(new Selectable());
        //e.addComponent(new Controllable());
        //can be only one. Camera follows this entity
        //e.addComponent(new CameraController());
        //e.addComponent(new JumpArea());


    }

    createPlane() {


        var e = em.addNew();

        e.addComponent(new PlaneComponent(new Plane(80)));


    }


}