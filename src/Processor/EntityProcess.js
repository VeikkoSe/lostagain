/**
 * Created by vge on 10/7/15.
 * @param {object} sb sandbox
 * @return {object} Closure
 */
function EntityProcess(sb) {

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

        sb.subscribe('gameover', function(name, b) {
            alert('game over. Refresh');
        });



        sb.subscribe('enemyDeath', function(name,b) {
            if(b.getName()==='mine' && b.components.RespawnComponent) {
                em.removeEntityById(b.getId());
                ec.createMine();
            }


        });

        sb.subscribe('respawn', function(name, b) {
            var ms = em.getEntityByName('mothership');

            if (ms.components.HealthComponent.getAmount() > 0) { //if mothership is destroyed we don't respawn

                var ship = em.getEntityByName('ship');

                ship.components.RenderableComponent.setXPos(ms.components.RenderableComponent.getXPos() + 20);
                ship.components.RenderableComponent.setZPos(ms.components.RenderableComponent.getZPos() + 20);

                var trailComponents = ship.components.MultiTrailComponent.getTrailComponents();
                for (var i = 0; i < trailComponents.length; i++) {
                    trailComponents[i].resetTrail();
                }

                ship.components.ShieldComponent.setAmount(10);
                ship.components.HealthComponent.setAmount(10);
            }

        });

    };

    return {
        update: function() {
        }, draw: function() {
        }, init
    };

}