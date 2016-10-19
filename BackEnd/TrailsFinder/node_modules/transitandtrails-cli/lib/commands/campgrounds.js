"use strict";

var async = require("async");

var DEFAULT_LIMIT = 50;

module.exports = function(program, tnt) {
  program
    .command("campgrounds")
    .description("List campgrounds")
    .option("-n, --limit <limit>", "Limit the number of results (defaults to 10)")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(cmd) {
      var count,
          limit = cmd.limit || 10,
          campgrounds = [],
          offset = 0;

      async.doWhilst(function(callback) {
        return tnt.getCampgrounds({
          limit: Math.min(DEFAULT_LIMIT, limit),
          offset: offset
        }, function(err, data) {
          if (err) {
            return callback(err);
          }

          count = data.length;
          campgrounds = campgrounds.concat(data);
          offset += data.length;

          return callback();
        });
      }, function() {
        return count > 0 && campgrounds.length < limit;
      }, function(err) {
        if (err) {
          throw err;
        }

        campgrounds = campgrounds.slice(0, limit);

        switch (true) {
        case cmd.geojson:
          var data = {
            type: "FeatureCollection",
            features: campgrounds.map(function(x) {
              var feature = {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [x.longitude, x.latitude]
                },
                properties: x
              };

              delete feature.properties.latitude;
              delete feature.properties.longitude;

              return feature;
            })
          };

          console.log("%j", data);

          break;

        default:
          console.log("%j", campgrounds);
        }
      });
    });
};
