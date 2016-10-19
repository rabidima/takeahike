"use strict";

module.exports = function(program, tnt) {
  program
    .command("user <id>")
    .description("Get user info")
    .action(function(id, cmd) {
      return tnt.getUser(id, function(err, user) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("%j", user);
      });
    });
};
