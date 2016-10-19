"use strict";

module.exports = function(program, tnt) {
  program
    .command("campground <id>")
    .description("Get campground info")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(id, cmd) {
      return tnt.getCampground(id, function(err, campground) {
        if (err) {
          console.error(err);
          return;
        }

        switch (true) {
        case cmd.geojson:
          var data = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [campground.longitude, campground.latitude]
                },
                properties: campground
              }
            ]
          };

          delete data.features[0].properties.latitude;
          delete data.features[0].properties.longitude;

          console.log("%j", data);

          break;

        default:
          console.log("%j", campground);
        }
      });
    });
};
