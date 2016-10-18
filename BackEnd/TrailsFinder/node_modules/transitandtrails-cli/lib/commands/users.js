"use strict";

var async = require("async");

var DEFAULT_LIMIT = 50;

module.exports = function(program, tnt) {
  program
    .command("users")
    .description("List users")
    .option("-n, --limit <limit>", "Limit the number of results (defaults to 10)")
    .action(function(cmd) {
      var count,
          limit = cmd.limit || 10,
          users = [],
          offset = 0;

      async.doWhilst(function(callback) {
        return tnt.getUsers({
          limit: Math.min(DEFAULT_LIMIT, limit),
          offset: offset
        }, function(err, data) {
          if (err) {
            return callback(err);
          }

          count = data.length;
          users = users.concat(data);
          offset += data.length;

          return callback();
        });
      }, function() {
        return count > 0 && users.length < limit;
      }, function(err) {
        if (err) {
          throw err;
        }

        users = users.slice(0, limit);

        console.log("%j", users);
      });
    });
};
