function CollisionComponent() {
  var name = "CollisionComponent";
  var group = group;
  var xPos = null;
  var yPos = null;
  var zPos = null;
  var xWidth = null;
  var yWidth = null;
  var zWidth = null;
  var entity = null;
  return Object.freeze({
    name: name,
    group: group,
    xPos: xPos,
    zPos: zPos,
    xWidth: xWidth,
    yWidth: yWidth,
    zWidth: zWidth,
    entity: entity
  });
}
