"use strict";

module.exports = function(program, tnt) {
  program
    .command("campground-photos <id>")
    .description("Get photos associated with a campground")
    .action(function(id, cmd) {
      return tnt.getCampgroundPhotos(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
