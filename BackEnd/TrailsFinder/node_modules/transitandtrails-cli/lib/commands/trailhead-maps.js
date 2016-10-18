"use strict";

module.exports = function(program, tnt) {
  program
    .command("trailhead-maps <id>")
    .description("Get maps associated with a trailhead")
    .action(function(id, cmd) {
      return tnt.getTrailheadMaps(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
