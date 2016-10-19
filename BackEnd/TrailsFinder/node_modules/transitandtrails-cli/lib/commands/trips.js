"use strict";

var async = require("async");

var DEFAULT_LIMIT = 50;

module.exports = function(program, tnt) {
  program
    .command("trips")
    .description("List trips")
    .option("-n, --limit <limit>", "Limit the number of results (defaults to 10)")
    .option("-u, --user-id <id>", "Filter results by user (comma-delimited)")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(cmd) {
      var count,
          limit = cmd.limit || 10,
          trips = [],
          offset = 0;

      return async.doWhilst(function(callback) {
        return tnt.getTrips({
          user_id: cmd.userId,
          limit: Math.min(DEFAULT_LIMIT, limit),
          offset: offset
        }, function(err, data) {
          if (err) {
            return callback(err);
          }

          count = data.length;
          trips = trips.concat(data);
          offset += data.length;

          return callback();
        });
      }, function() {
        return count > 0 && trips.length < limit;
      }, function(err) {
        if (err) {
          throw err;
        }

        trips = trips.slice(0, limit);

        switch (true) {
        case cmd.geojson:
          var tripIds = trips.map(function(x) {
            return x.id;
          });

          return async.map(tripIds, function(id, done) {
            return tnt.getTripAsGeoJSON(id, done);
          }, function(err, data) {
            if (err) {
              throw err;
            }

            var collection = {
              type: "FeatureCollection",
              features: data
            };

            console.log("%j", collection);
          });

        default:
          console.log("%j", trips);
        }
      });
    });
};
