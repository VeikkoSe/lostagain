function MeshComponent() {
    'use strict';

    var name = "MeshComponent";
    var mesh = null;
    var width = 5;

    return Object.freeze({
        getName: function() {
            return name;
        },
        setName: function(n) {
            name = n;
        },
        getWidth: function() {
            return width;
        },
        setWidth: function(w) {
            width = w;
        },
        getMesh: function() {
            return mesh
        },
        setMesh: function(m) {
            mesh = m;
        }
    });

}

