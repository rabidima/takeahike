"use strict";

module.exports = function(program, tnt) {
  program
    .command("trip-maps <id>")
    .description("Get maps associated with a trip")
    .action(function(id, cmd) {
      return tnt.getTripMaps(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
