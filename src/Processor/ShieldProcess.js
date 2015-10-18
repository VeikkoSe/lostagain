function ShieldProcess(sb) {
    'use strict';

    var em = sb.getEntityManager();

    var update = function(deltatime, timeSinceStart) {

        var timeNow = new Date().getTime();
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.ShieldComponent) {

                var sc = le.components.ShieldComponent;

                var lastHit = sc.getLastHit();
                if (lastHit > 0 && timeNow - lastHit > 3000) {
                    sc.setLastHit(timeNow);
                    if (sc.getAmount() < sc.getMax()) {
                        sc.setAmount(sc.getAmount() + 1);
                    }
                    else {
                        sc.setLastHit(0);
                    }

                }

            }
        }

    };

    return {
        draw: function() {
        }, update, init: function() {
        }
    }
}