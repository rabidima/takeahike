"use strict";

module.exports = function(program, tnt) {
  program
    .command("campground-attributes [id]")
    .description("Get campground attributes")
    .action(function(id, cmd) {
      return tnt.getCampgroundAttributes(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
