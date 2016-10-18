"use strict";

module.exports = function(program, tnt) {
  program
    .command("trip-attributes [id]")
    .description("Get trip attributes")
    .action(function(id, cmd) {
      return tnt.getTripAttributes(id, function(err, attributes) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", attributes);
      });
    });
};
