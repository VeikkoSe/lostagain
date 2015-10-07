/**
 * Created by vge on 10/7/15.
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

            //console.log(fuelEntity);
            //fuelEntity.components.RenderableComponent.setXPos(5);
            //fuelEntity.components.RenderableComponent.setZPos(10);


            rmc.setRouteEndXpos(fuelEntity.components.RenderableComponent.getXPos());
            rmc.setRouteEndZpos(fuelEntity.components.RenderableComponent.getZPos());
            rmc.setRouteDone(false);

            console.log(rmc);

            ms.components.RailsMovementComponent = rmc;

        });

    };



    return {
        update: function() {
        }, draw: function() {}, init
    };

}