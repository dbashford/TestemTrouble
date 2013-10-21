(function () {
!function(){var t={}.hasOwnProperty;define("berico/heatmap_widget",["leaflet","leaflet_draw","leaflet_heatmap"],function(){var e,exports,i;return exports={},i=function(t){var e,i,n,r,s,o,a,h,u,l;for(n=this,i=[],this._maxValue=null!=(h=t.max)?h:0,u=t.data,r=0,o=u.length;o>r;r++)e=u[r],i.push(new L.LatLng(e.lat,e.lon)),null==t.max&&(n._maxValue=Math.max(n._maxValue,e.value));for(this._bounds=new L.LatLngBounds(i),this._quad=new QuadTree(this._boundsToQuery(this._bounds),!1,6,6),l=t.data,s=0,a=l.length;a>s;s++)e=l[s],n._quad.insert({x:e.lon,y:e.lat,value:e.value});return this.redraw()},L.TileLayer.HeatMap.prototype.setData=i,e=function(){function e(){this.map=null,this.handlers={},this.bboxLayer=null,this.drawnItems=null,this.bboxRectOpts={stroke:!0,color:"#f06eaa",weight:4,opacity:.5,fill:!0,fillColor:null,fillOpacity:.2,clickable:!0},this.leafletMapOpts={center:[0,0],zoom:0,crs:L.CRS.EPSG4326},this.heatmapLayerOpts={radius:{value:20,absolute:!1},opacity:.8,minOpacity:0,gradient:{.45:"rgb(0,0,255)",.55:"rgb(0,255,255)",.65:"rgb(0,255,0)",.95:"yellow",1:"rgb(255,0,0)"}}}return e.prototype.on=function(t,e){return null==this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(e)},e.prototype.setHeatmapData=function(t,e){var i;return i={data:t},null!=e&&(i.max=e),this.heatmapLayer.setData(i)},e.prototype.bbox=function(t,e,i,n){var r,s,o,a,h;return null!=this.bboxLayer&&(this.drawnItems.removeLayer(this.bboxLayer),this.bboxLayer=null),o=new L.LatLng(t,e),h=new L.LatLng(i,n),r=new L.LatLngBounds(h,o),a=new L.Rectangle(r,this.bboxRectOpts),a.addTo(this.drawnItems),this.bboxLayer=a,s={northEast:{lat:t,lng:e},southWest:{lat:i,lng:n}},this._publish("bboxDrawn",s)},e.prototype.deleteBbox=function(){return null!=this.bboxLayer?this._publishBBoxDeletedEvent():void 0},e.prototype.invalidateSize=function(){return null!=this.map?this.map.invalidateSize():void 0},e.prototype.getMap=function(){return this.map},e.prototype.draw=function(e){var i,n,r,s,o,a,h,u,l,d,c,p,_,f,m,g,v,y,b;if(null==e.el)throw new Error("Please provide a value for the [el] option");if(null==e.mapUrl)throw new Error("Please provide a value for the [mapUrl] option");if(null==e.serverDefs)throw new Error("Please provide a value for the [serverDefs] option");if(null!=e.leafletImgPath&&(L.Icon.Default.imagePath=e.leafletImgPath),null!=e.heatmapOpacity&&(this.heatmapLayerOpts.opacity=e.heatmapOpacity),null!=e.heatmapMinOpacity&&(this.heatmapLayerOpts.minOpacity=e.heatmapMinOpacity),null!=e.heatmapGradient&&(this.heatmapLayerOpts.gradient=e.heatmapGradient),null!=e.leafletMapOpts){v=e.leafletMapOpts;for(l in v)t.call(v,l)&&(_=v[l],this.leafletMapOpts[l]=_)}if(u=null!=(y=e.layersNoWrap)?y:!1,this.heatmapLayer=L.TileLayer.heatMap(this.heatmapLayerOpts),null!=this.leafletMapOpts.layers?this.leafletMapOpts.layers.push(this.heatmapLayer):this.leafletMapOpts.layers=[this.heatmapLayer],this.map=L.map(e.el,this.leafletMapOpts),d={},i={},d.heat=this.heatmapLayer,null!=e.serverDefs.layers)for(b=e.serverDefs.layers,s=m=0,g=b.length;g>m;s=++m)a=b[s],n=a.id,c=a.requestType,f=a.version,o=a.label,p=L.tileLayer(""+e.mapUrl+"/query?request="+c+"&channel="+n+"&version="+f+"&x={x}&y={y}&z={z}",{noWrap:u,minZoom:1,maxZoom:16}).addTo(this.map),"ImageryMaps"===c?i[o]=p:d[o]=p;return h=L.control.layers(i,d).addTo(this.map),this.drawnItems=new L.FeatureGroup,this.map.addLayer(this.drawnItems),r=new L.Control.Draw({draw:{polyline:!1,polygon:!1,circle:!1,marker:!1},edit:{featureGroup:this.drawnItems}}),this.map.addControl(r),this._registerToDrawEvents(),this._registerToMoveEvents()},e.prototype._registerToMoveEvents=function(){var t=this;return this.map.on("moveend",function(e){return t._publish("mapMoveend",e)})},e.prototype._registerToDrawEvents=function(){var t=this;return this.map.on("draw:edited",function(){return null!=t.bboxLayer?t._publishBBoxDrawnEvent():void 0}),this.map.on("draw:deleted",function(){return null!=t.bboxLayer?t._publishBBoxDeletedEvent():void 0}),this.map.on("draw:drawstart",function(){return null!=t.bboxLayer?t._publishBBoxDeletedEvent():void 0}),this.map.on("draw:created",function(e){return t.bboxLayer=e.layer,t._publishBBoxDrawnEvent(),t.drawnItems.addLayer(t.bboxLayer)})},e.prototype._publishBBoxDrawnEvent=function(){var t,e;return t=this.bboxLayer.getBounds(),e={northEast:{lat:t.getNorth(),lng:t.getEast()},southWest:{lat:t.getSouth(),lng:t.getWest()}},this._publish("bboxDrawn",e)},e.prototype._publishBBoxDeletedEvent=function(){return this.drawnItems.removeLayer(this.bboxLayer),this._publish("bboxDeleted"),this.bboxLayer=null},e.prototype._publish=function(t,e){var i,n,r,s,o;if(null!=this.handlers[t]){for(s=this.handlers[t],o=[],n=0,r=s.length;r>n;n++)i=s[n],o.push(i(e));return o}},e}(),exports.Widget=e,exports}),define('vendor/heat-map/heatmap_widget',["berico/heatmap_widget"],function(t){return t})}();
var __bind=function(e,t){return function(){return e.apply(t,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(e,t){function a(){this.constructor=e}for(var r in t)__hasProp.call(t,r)&&(e[r]=t[r]);return a.prototype=t.prototype,e.prototype=new a,e.__super__=t.prototype,e};define('berico/geohash_widget',["vendor/heat-map/heatmap_widget"],function(e){var t,exports,a;return exports={},a=function(e,t){var a,r;return r=.04394>t?6:.3515>t?5:1.406>t?4:11.25>t?3:45>t?2:1,a=.04394>e?6:.1757>e?5:1.40625>e?4:5.625>e?3:45>e?2:1,Math.min(a,r)},t=function(e){function t(e){this.populateHeatmapData=__bind(this.populateHeatmapData,this),t.__super__.constructor.call(this),this.queryUrl=e.queryUrl,this.buildQueryFunc=e.buildQueryFunc,this.on("mapMoveend",this.populateHeatmapData)}return __extends(t,e),t.prototype.populateHeatmapData=function(){var e,t,r,n,o,l,u=this;if(null!=this.map)return l=this.map.getBounds(),o={lat:l.getNorth(),lng:l.getWest()},e={lat:l.getSouth(),lng:l.getEast()},t=Math.abs(l.getNorth()-l.getSouth()),r=Math.abs(l.getEast()-l.getWest()),n=a(t,r),$.ajax({type:"POST",url:this.queryUrl,data:this.buildQueryFunc(o,e,n),dataType:"json",success:function(e){return u.heatmapLayer.setData({max:e.max,data:e.data})}})},t}(e.Widget),exports.Widget=t,exports.Util={determineGeohashPrecision:a},exports});define(['berico/geohash_widget'], function(lib) {
  return lib;
});
})()