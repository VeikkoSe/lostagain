var EntityFactory = function EntityFactory() {
  "use strict";
};
($traceurRuntime.createClass)(EntityFactory, {
  createShip: function() {
    "use strict";
    var e = em.addNew('ship');
    var mesh = mm.getOrAddMesh('ship');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new MomentumMovable(30, 15, 0, 0));
    e.addComponent(new Renderable(1, 0, 1, 1, 0, -90, 0));
    e.addComponent(new Controllable());
    e.addComponent(new HealthComponent(5, new Sprite("hp", -0.9, -0.8)));
    e.addComponent(new ShieldComponent(10, new Sprite("shield", -0.9, -0.74)));
    e.addComponent(new PhotonTorpedoComponent(new Sprite("bigbullet", 0, 0)));
    e.addComponent(new GunComponent());
    var t = new Texture('maps', false, true);
    e.addComponent(new ExhaustComponent(t.loadedTexture));
  },
  createStars: function() {
    "use strict";
    var e = em.addNew('stars');
    e.addComponent(new StarComponent());
  },
  createEnemy: function() {
    "use strict";
    var e = em.addNew('enemymirror');
    var mesh = mm.getOrAddMesh('enemy');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new EnemyComponent());
    e.addComponent(new Renderable(helpers.getRandomInt(-800, 700), 0, helpers.getRandomInt(-800, 700), 1));
  },
  createMotherShip: function() {
    "use strict";
    var e = em.addNew('mothership');
    var mesh = mm.getOrAddMesh('mothership');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new Movable(30));
    e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 2));
    e.addComponent(new Controllable());
    e.addComponent(new Drivable());
    e.addComponent(new CameraController());
    e.addComponent(new JumpArea());
  },
  createTerrain: function() {
    "use strict";
    var e = em.addNew('terrain');
    var mesh = mm.getOrAddMesh('terrain');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));
  },
  createAsteroid: function() {
    "use strict";
    var e = em.addNew();
    var mesh = mm.getOrAddMesh('asteroid');
    e.addComponent(new MeshComponent(mesh, 1, 6));
    e.addComponent(new Renderable(helpers.getRandomInt(-20), 0, helpers.getRandomInt(20), 2));
  },
  createBox: function() {
    "use strict";
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
      for (var i = 0; i < verts.length; i += 3) {
        var newVerts = [];
        newVerts.push(verts[$traceurRuntime.toProperty(i)]);
        newVerts.push(verts[$traceurRuntime.toProperty(i + 1)]);
        newVerts.push(verts[$traceurRuntime.toProperty(i + 2)]);
        newVerts.push(x);
        newVerts.push(y);
        newVerts.push(z);
        newVerts.push(g);
        newVerts.push(g);
        newVerts.push(g);
        combinedMeshes.vertices.push.apply(combinedMeshes.vertices, newVerts);
      }
      vertexPositionBuffer.nums += verts.length / 3;
    }
  },
  createBackground: function() {
    "use strict";
    var e = em.addNew();
    var mesh = new Mesh("background");
    e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));
    e.addComponent(new MeshComponent(mesh));
  },
  createFuel: function(rand) {
    "use strict";
    var e = em.addNew();
    var mesh = mm.getOrAddMesh('fuel');
    e.addComponent(new MeshComponent(mesh));
    if (rand) {
      e.addComponent(new Renderable(helpers.getRandomInt(-200, 200), 0, helpers.getRandomInt(200, -200), 50));
    } else {
      e.addComponent(new Renderable(110, 0, 50, 50));
    }
    e.addComponent(new ConstantRotation(10, 10, 10));
  },
  createPlane: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new PlaneComponent(new Plane(80)));
  }
}, {});
