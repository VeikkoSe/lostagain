var TextTimer = function TextTimer(level) {
  "use strict";
  this.events = {};
  $traceurRuntime.setProperty(this.events, '2000', 'What happened?');
  $traceurRuntime.setProperty(this.events, '5000', 'We were crushed!');
  $traceurRuntime.setProperty(this.events, '7000', 'That seems to be the case');
  $traceurRuntime.setProperty(this.events, '10000', 'We need to heal our wounds and rebuild your ship.');
  $traceurRuntime.setProperty(this.events, '12000', 'True. And we still have the tracker on their flag ship. We should see it on your overview map.');
  $traceurRuntime.setProperty(this.events, '15000', 'When the time is right we will strike back!');
  $traceurRuntime.setProperty(this.events, '17000', 'My sensor will show the nearest asteroid that we need to mine so we can get minerals for fuel');
  $traceurRuntime.setProperty(this.events, '20000', 'Oh yes. These old ships still can\'t jump without fuel');
  $traceurRuntime.setProperty(this.events, '23000', 'Asteroid should not be far');
  $traceurRuntime.setProperty(this.events, '25000', ' ');
};
($traceurRuntime.createClass)(TextTimer, {getLevelText: function(level) {
    "use strict";
    return this.events;
  }}, {});
