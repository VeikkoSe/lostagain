/**
 * Created by vge on 10/7/15.
 * @param {object} sb sandbox
 * @return {object} Closure
 */
function entityprocess_constructor(sb) {

    // var gl = sb.getGL();
    //var camera = sb.getCamera();

    var em = sb.getEntityManager();
    var ec = sb.getEntityCreator();

    var init = function() {
        sb.subscribe('routeDone', function(name, entity) {

            var ms = em.getEntityByName('mothership');
            var rmc = ms.components.RailsMovementComponent;

            //TODO something sparcling to hide the destruction.
            // possibly destroy when out of screen
            em.removeEntityByName('fuel');

            var fuelEntity = ec.createFuel(false);
            var fuelComponents = fuelEntity.components;

            rmc.setRouteEndXpos(fuelComponents.RenderableComponent.getXPos());
            rmc.setRouteEndZpos(fuelComponents.RenderableComponent.getZPos());
            rmc.setRouteDone(false);

            ms.components.RailsMovementComponent = rmc;

        });

    };

    return {
        update: function() {
        }, draw: function() {
        }, init
    };

}