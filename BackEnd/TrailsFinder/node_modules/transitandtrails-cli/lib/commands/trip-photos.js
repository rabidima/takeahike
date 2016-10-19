"use strict";

module.exports = function(program, tnt) {
  program
    .command("trip-photos <id>")
    .description("Get photos associated with a trip")
    .action(function(id, cmd) {
      return tnt.getTripPhotos(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
