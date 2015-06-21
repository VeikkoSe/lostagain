function CollisionComponent() {

    let name = "CollisionComponent";
    let group = group;
    let xPos = null;
    let yPos = null;
    let zPos = null;
    let xWidth = null;
    let yWidth = null;
    let zWidth = null;
    let entity = null;


    return Object.freeze({
        name,
        group,
        xPos,
        zPos,
        xWidth,
        yWidth,
        zWidth,
        entity
    });


}

