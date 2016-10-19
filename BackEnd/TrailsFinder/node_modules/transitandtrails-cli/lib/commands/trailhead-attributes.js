"use strict";

module.exports = function(program, tnt) {
  program
    .command("trailhead-attributes [id]")
    .description("Get trailhead attributes")
    .action(function(id, cmd) {
      return tnt.getTrailheadAttributes(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
