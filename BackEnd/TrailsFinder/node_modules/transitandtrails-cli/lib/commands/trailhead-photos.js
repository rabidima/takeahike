"use strict";

module.exports = function(program, tnt) {
  program
    .command("trailhead-photos <id>")
    .description("Get photos associated with a trailhead")
    .action(function(id, cmd) {
      return tnt.getTrailheadPhotos(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
