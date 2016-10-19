"use strict";

var async = require("async");

// limit per page (not total limit)
var DEFAULT_LIMIT = 50;

module.exports = function(program, tnt) {
  program
    .command("trailheads")
    .description("List trailheads")
    .option("-d, --distance <distance>", "Distance restriction")
    .option("-y, --latitude <latitude>", "Latitude")
    .option("-x, --longitude <longitude>", "Longitude")
    .option("-n, --limit <limit>", "Limit the number of results (defaults to 10)")
    .option("-p, --non-profit-partner-id <id>",
            "Filter results by non-profit partner (comma-delimited)")
    .option("-u, --user-id <id>", "Filter results by user (comma-delimited)")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(cmd) {
      var count,
          limit = cmd.limit || 10,
          trailheads = [],
          offset = 0;

      async.doWhilst(function(callback) {
        return tnt.getTrailheads({
          latitude: cmd.latitude,
          longitude: cmd.longitude,
          distance: cmd.distance,
          non_profit_partner_id: cmd.nonProfitPartnerId,
          user_id: cmd.userId,
          limit: Math.min(DEFAULT_LIMIT, limit),
          offset: offset
        }, function(err, data) {
          if (err) {
            return callback(err);
          }

          count = data.length;
          trailheads = trailheads.concat(data);
          offset += data.length;

          return callback();
        });
      }, function() {
        return count > 0 && trailheads.length < limit;
      }, function(err) {
        if (err) {
          throw err;
        }

        trailheads = trailheads.slice(0, limit);

        switch (true) {
        case cmd.geojson:
          var trailheadIds = trailheads.map(function(x) {
            return x.id;
          });

          return async.map(trailheadIds, function(id, done) {
            return tnt.getTrailheadAsGeoJSON(id, done);
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
          console.log("%j", trailheads);
        }
      });
    });
};
