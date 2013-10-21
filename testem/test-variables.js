window.TEST_REQUIRE_CONFIG = {
  "waitSeconds": 200,
  "baseUrl": "/js",
  "paths": {
    "appConfig": "common/util/config",
    "comms": "common/comms",
    "bus": "common/util/bus",
    "mysearches": "searches/my_searches/models/my_searches_collection",
    "myprofile": "searches/my_profile/models/profile_model",
    "community": "searches/my_searches/models/community_searches_collection",
    "templates": "search_templates",
    "backbone": "common/util/backbone-extended",
    "underscore": "vendor/managed/lodash/lodash.compat",
    "jquery": "vendor/managed/jquery/jquery",
    "highcharts": "vendor/highcharts.min",
    "jvectormap": "vendor/jquery-jvectormap-1.2.2.min",
    "worldmap": "vendor/jquery-jvectormap-world-mill-en",
    "tagCanvas": "vendor/tagcanvas",
    "openlayers": "common/util/openlayers-extended",
    "rangy": "vendor/rangy/rangy-core",
    "d3": "vendor/managed/d3/d3",
    "timeline": "vendor/managed/timeline-d3/berico-timeline",
    "geoBoundingBox": "vendor/managed/geo-bounding-box/geoBoundingBox",
    "leaflet": "vendor/managed/leaflet-shim/leaflet",
    "leaflet_draw": "vendor/managed/leaflet.draw/leaflet.draw",
    "leaflet_heatmap": "vendor/managed/heatmapjs/heatmap-leaflet",
    "quadtree": "vendor/managed/heatmapjs/QuadTree",
    "heatmapjs": "vendor/managed/heatmapjs/heatmap"
  },
  "shim": {
    "leaflet_draw": {
      "deps": [
        "leaflet"
      ]
    },
    "leaflet_heatmap": {
      "deps": [
        "leaflet",
        "quadtree",
        "heatmapjs"
      ]
    }
  }
};
window.TEST_MOCHA_SETUP = {
  "ui": "bdd",
  "globals": []
};
window.TEST_SPECS = [
  "spec/spec1",
  "spec/spec2",
  "spec/spec3",
  "spec/spec4",
  "spec/spec5"
];