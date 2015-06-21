function textimer_constructor(level) {
  var events = {};
  var init = function() {
    $traceurRuntime.setProperty(events, '2000', 'What happened?');
    $traceurRuntime.setProperty(events, '5000', 'We were crushed!');
    $traceurRuntime.setProperty(events, '7000', 'That seems to be the case');
    $traceurRuntime.setProperty(events, '10000', 'We need to heal our wounds and rebuild your ship.');
    $traceurRuntime.setProperty(events, '12000', 'True. And we still have the tracker on their flag ship. We should see it on your overview map.');
    $traceurRuntime.setProperty(events, '15000', 'When the time is right we will strike back!');
    $traceurRuntime.setProperty(events, '17000', 'My sensor will show the nearest asteroid that we need to mine so we can get minerals for fuel');
    $traceurRuntime.setProperty(events, '20000', 'Oh yes. These old ships still can\'t jump without fuel');
    $traceurRuntime.setProperty(events, '23000', 'Asteroid should not be far');
    $traceurRuntime.setProperty(events, '25000', ' ');
  };
  var getLevelText = function(level) {
    return events;
  };
  return {
    getLevelText: getLevelText,
    init: init
  };
}
