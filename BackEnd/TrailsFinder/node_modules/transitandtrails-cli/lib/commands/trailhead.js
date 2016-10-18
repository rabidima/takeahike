"use strict";

var async = require("async");

module.exports = function(program, tnt) {
  program
    .command("trailhead <id>")
    .description("Get trailhead info")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(id, cmd) {
      var ids = id.split(",");

      switch (true) {
      case cmd.geojson:
        return async.map(ids, function(id, done) {
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
        return async.map(ids, function(id, done) {
          return tnt.getTrailhead(id, done);
        }, function(err, data) {
          if (err) {
            throw err;
          }

          if (data.length === 1) {
            console.log("%j", data[0]);
          } else {
            console.log("%j", data);
          }
        });
      }
    });
};
