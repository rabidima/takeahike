"use strict";

module.exports = function(program, tnt) {
  program
    .command("campground-maps <id>")
    .description("Get maps associated with a campground")
    .action(function(id, cmd) {
      return tnt.getCampgroundMaps(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
