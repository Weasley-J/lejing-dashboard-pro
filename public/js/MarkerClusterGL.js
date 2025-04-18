var BMapLib = (window.BMapLib = BMapLib || {})
;(function () {
  var b = function (m, l, j) {
    l = d(l)
    var n = m.pointToPixel(l.getNorthEast())
    var i = m.pointToPixel(l.getSouthWest())
    n.x += j
    n.y -= j
    i.x -= j
    i.y += j
    var h = m.pixelToPoint(n)
    var k = m.pixelToPoint(i)
    return new window.BMapGL.Bounds(k, h)
  }
  var d = function (i) {
    var k = f(i.getNorthEast().lng, -180, 180)
    var h = f(i.getSouthWest().lng, -180, 180)
    var j = f(i.getNorthEast().lat, -74, 74)
    var l = f(i.getSouthWest().lat, -74, 74)
    return new window.BMapGL.Bounds(new window.BMapGL.Point(h, l), new window.BMapGL.Point(k, j))
  }
  var f = function (j, k, h) {
    k && (j = Math.max(j, k))
    h && (j = Math.min(j, h))
    return j
  }
  var a = function (h) {
    return '[object Array]' === Object.prototype.toString.call(h)
  }
  var c = function (l, n) {
    var j = -1
    if (a(n)) {
      if (n.indexOf) {
        j = n.indexOf(l)
      } else {
        for (var k = 0, h; (h = n[k]); k++) {
          if (h === l) {
            j = k
            break
          }
        }
      }
    }
    return j
  }
  var e = (BMapLib.MarkerClusterer = function (l, h) {
    if (!l) {
      return
    }
    this._map = l
    this._markers = []
    this._clusters = []
    var k = h || {}
    this._gridSize = k.gridSize || 60
    this._maxZoom = k.maxZoom || 18
    this._minClusterSize = k.minClusterSize || 2
    this._isAverageCenter = false
    if (k.isAverageCenter != undefined) {
      this._isAverageCenter = k.isAverageCenter
    }
    this._styles = k.styles || []
    var j = this
    this._map.addEventListener('zoomend', function () {
      j._redraw()
    })
    this._map.addEventListener('moveend', function () {
      j._redraw()
    })
    var i = k.markers
    a(i) && this.addMarkers(i)
  })
  e.prototype.addMarkers = function (k) {
    for (var j = 0, h = k.length; j < h; j++) {
      this._pushMarkerTo(k[j])
    }
    this._createClusters()
  }
  e.prototype._pushMarkerTo = function (h) {
    var i = c(h, this._markers)
    if (i === -1) {
      h.isInCluster = false
      this._markers.push(h)
    }
  }
  e.prototype.addMarker = function (h) {
    this._pushMarkerTo(h)
    this._createClusters()
  }
  e.prototype._createClusters = function () {
    var j = this._map.getBounds()
    var l = b(this._map, j, this._gridSize)
    for (var k = 0, h; (h = this._markers[k]); k++) {
      if (!h.isInCluster && l.containsPoint(h.getPosition())) {
        this._addToClosestCluster(h)
      }
    }
  }
  e.prototype._addToClosestCluster = function (l) {
    var p = 4000000
    var n = null
    var k = l.getPosition()
    for (var m = 0, j; (j = this._clusters[m]); m++) {
      var h = j.getCenter()
      if (h) {
        var o = this._map.getDistance(h, l.getPosition())
        if (o < p) {
          p = o
          n = j
        }
      }
    }
    if (n && n.isMarkerInClusterBounds(l)) {
      n.addMarker(l)
    } else {
      var j = new g(this)
      j.addMarker(l)
      this._clusters.push(j)
    }
  }
  e.prototype._clearLastClusters = function () {
    for (var j = 0, h; (h = this._clusters[j]); j++) {
      h.remove()
    }
    this._clusters = []
    this._removeMarkersFromCluster()
  }
  e.prototype._removeMarkersFromCluster = function () {
    for (var j = 0, h; (h = this._markers[j]); j++) {
      h.isInCluster = false
    }
  }
  e.prototype._removeMarkersFromMap = function () {
    for (var j = 0, h; (h = this._markers[j]); j++) {
      h.isInCluster = false
      this._map.removeOverlay(h)
    }
  }
  e.prototype._removeMarker = function (h) {
    var i = c(h, this._markers)
    if (i === -1) {
      return false
    }
    this._map.removeOverlay(h)
    this._markers.splice(i, 1)
    return true
  }
  e.prototype.removeMarker = function (h) {
    var i = this._removeMarker(h)
    if (i) {
      this._clearLastClusters()
      this._createClusters()
    }
    return i
  }
  e.prototype.removeMarkers = function (l) {
    var k = false
    for (var h = 0; h < l.length; h++) {
      var j = this._removeMarker(l[h])
      k = k || j
    }
    if (k) {
      this._clearLastClusters()
      this._createClusters()
    }
    return k
  }
  e.prototype.clearMarkers = function () {
    this._clearLastClusters()
    this._removeMarkersFromMap()
    this._markers = []
  }
  e.prototype._redraw = function () {
    this._clearLastClusters()
    this._createClusters()
  }
  e.prototype.getGridSize = function () {
    return this._gridSize
  }
  e.prototype.setGridSize = function (h) {
    this._gridSize = h
    this._redraw()
  }
  e.prototype.getMaxZoom = function () {
    return this._maxZoom
  }
  e.prototype.setMaxZoom = function (h) {
    this._maxZoom = h
    this._redraw()
  }
  e.prototype.getStyles = function () {
    return this._styles
  }
  e.prototype.setStyles = function (h) {
    this._styles = h
    this._redraw()
  }
  e.prototype.getMinClusterSize = function () {
    return this._minClusterSize
  }
  e.prototype.setMinClusterSize = function (h) {
    this._minClusterSize = h
    this._redraw()
  }
  e.prototype.isAverageCenter = function () {
    return this._isAverageCenter
  }
  e.prototype.getMap = function () {
    return this._map
  }
  e.prototype.getMarkers = function () {
    return this._markers
  }
  e.prototype.getClustersCount = function () {
    var k = 0
    for (var j = 0, h; (h = this._clusters[j]); j++) {
      h.isReal() && k++
    }
    return k
  }
  function g(h) {
    this._markerClusterer = h
    this._map = h.getMap()
    this._minClusterSize = h.getMinClusterSize()
    this._isAverageCenter = h.isAverageCenter()
    this._center = null
    this._markers = []
    this._gridBounds = null
    this._isReal = false
    this._clusterMarker = new BMapLib.TextIconOverlay(this._center, this._markers.length, {
      styles: this._markerClusterer.getStyles(),
    })
  }
  g.prototype.addMarker = function (k) {
    if (this.isMarkerInCluster(k)) {
      return false
    }
    if (!this._center) {
      this._center = k.getPosition()
      this.updateGridBounds()
    } else {
      if (this._isAverageCenter) {
        var j = this._markers.length + 1
        var o = (this._center.lat * (j - 1) + k.getPosition().lat) / j
        var m = (this._center.lng * (j - 1) + k.getPosition().lng) / j
        this._center = new window.BMapGL.Point(m, o)
        this.updateGridBounds()
      }
    }
    k.isInCluster = true
    this._markers.push(k)
    var h = this._markers.length
    if (h < this._minClusterSize) {
      this._map.addOverlay(k)
      return true
    } else {
      if (h === this._minClusterSize) {
        for (var n = 0; n < h; n++) {
          this._markers[n].getMap() && this._map.removeOverlay(this._markers[n])
        }
      }
    }
    this._map.addOverlay(this._clusterMarker)
    this._isReal = true
    this.updateClusterMarker()
    return true
  }
  g.prototype.isMarkerInCluster = function (j) {
    if (this._markers.indexOf) {
      return this._markers.indexOf(j) != -1
    } else {
      for (var k = 0, h; (h = this._markers[k]); k++) {
        if (h === j) {
          return true
        }
      }
    }
    return false
  }
  g.prototype.isMarkerInClusterBounds = function (h) {
    return this._gridBounds.containsPoint(h.getPosition())
  }
  g.prototype.isReal = function (h) {
    return this._isReal
  }
  g.prototype.updateGridBounds = function () {
    var h = new window.BMapGL.Bounds(this._center, this._center)
    this._gridBounds = b(this._map, h, this._markerClusterer.getGridSize())
  }
  g.prototype.updateClusterMarker = function () {
    if (this._map.getZoom() > this._markerClusterer.getMaxZoom()) {
      this._clusterMarker && this._map.removeOverlay(this._clusterMarker)
      for (var l = 0, j; (j = this._markers[l]); l++) {
        this._map.addOverlay(j)
      }
      return
    }
    if (this._markers.length < this._minClusterSize) {
      this._clusterMarker.hide()
      return
    }
    this._clusterMarker.setPosition(this._center)
    this._clusterMarker.setText(this._markers.length)
    var k = this._map
    var h = this.getBounds()
    this._clusterMarker.addEventListener('click', function (i) {
      k.setViewport(h)
    })
  }
  g.prototype.remove = function () {
    for (var j = 0, h; (h = this._markers[j]); j++) {
      this._markers[j].getMap() && this._map.removeOverlay(this._markers[j])
    }
    this._map.removeOverlay(this._clusterMarker)
    this._markers.length = 0
    delete this._markers
  }
  g.prototype.getBounds = function () {
    var k = new window.BMapGL.Bounds(this._center, this._center)
    for (var j = 0, h; (h = this._markers[j]); j++) {
      k.extend(h.getPosition())
    }
    return k
  }
  g.prototype.getCenter = function () {
    return this._center
  }
})()
