var BMapLib = (window.BMapLib = BMapLib || {})
;(function () {
  var d,
    c = (d = c || { version: '1.3.8' })
  ;(function () {
    c.guid = '$BAIDU$'
    window[c.guid] = window[c.guid] || {}
    c.dom = c.dom || {}
    c.dom.g = function (f) {
      if ('string' == typeof f || f instanceof String) {
        return document.getElementById(f)
      } else {
        if (f && f.nodeName && (f.nodeType == 1 || f.nodeType == 9)) {
          return f
        }
      }
      return null
    }
    c.g = c.G = c.dom.g
    c.dom.getDocument = function (f) {
      f = c.dom.g(f)
      return f.nodeType == 9 ? f : f.ownerDocument || f.document
    }
    c.lang = c.lang || {}
    c.lang.isString = function (f) {
      return '[object String]' == Object.prototype.toString.call(f)
    }
    c.isString = c.lang.isString
    c.dom._g = function (f) {
      if (c.lang.isString(f)) {
        return document.getElementById(f)
      }
      return f
    }
    c._g = c.dom._g
    c.browser = c.browser || {}
    if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
      c.browser.ie = c.ie = document.documentMode || +RegExp['\x241']
    }
    c.dom.getComputedStyle = function (g, f) {
      g = c.dom._g(g)
      var i = c.dom.getDocument(g),
        h
      if (i.defaultView && i.defaultView.getComputedStyle) {
        h = i.defaultView.getComputedStyle(g, null)
        if (h) {
          return h[f] || h.getPropertyValue(f)
        }
      }
      return ''
    }
    c.dom._styleFixer = c.dom._styleFixer || {}
    c.dom._styleFilter = c.dom._styleFilter || []
    c.dom._styleFilter.filter = function (g, k, l) {
      for (var f = 0, j = c.dom._styleFilter, h; (h = j[f]); f++) {
        if ((h = h[l])) {
          k = h(g, k)
        }
      }
      return k
    }
    c.string = c.string || {}
    c.string.toCamelCase = function (f) {
      if (f.indexOf('-') < 0 && f.indexOf('_') < 0) {
        return f
      }
      return f.replace(/[-_][^-_]/g, function (g) {
        return g.charAt(1).toUpperCase()
      })
    }
    c.dom.getStyle = function (h, g) {
      var j = c.dom
      h = j.g(h)
      g = c.string.toCamelCase(g)
      var i = h.style[g] || (h.currentStyle ? h.currentStyle[g] : '') || j.getComputedStyle(h, g)
      if (!i) {
        var f = j._styleFixer[g]
        if (f) {
          i = f.get ? f.get(h) : c.dom.getStyle(h, f)
        }
      }
      if ((f = j._styleFilter)) {
        i = f.filter(g, i, 'get')
      }
      return i
    }
    c.getStyle = c.dom.getStyle
    if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
      c.browser.opera = +RegExp['\x241']
    }
    c.browser.isWebkit = /webkit/i.test(navigator.userAgent)
    c.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent)
    c.browser.isStrict = document.compatMode == 'CSS1Compat'
    c.dom.getPosition = function (f) {
      f = c.dom.g(f)
      var o = c.dom.getDocument(f),
        i = c.browser,
        l = c.dom.getStyle,
        h =
          i.isGecko > 0 &&
          o.getBoxObjectFor &&
          l(f, 'position') == 'absolute' &&
          (f.style.top === '' || f.style.left === ''),
        m = { left: 0, top: 0 },
        k = i.ie && !i.isStrict ? o.body : o.documentElement,
        p,
        g
      if (f == k) {
        return m
      }
      if (f.getBoundingClientRect) {
        g = f.getBoundingClientRect()
        m.left = Math.floor(g.left) + Math.max(o.documentElement.scrollLeft, o.body.scrollLeft)
        m.top = Math.floor(g.top) + Math.max(o.documentElement.scrollTop, o.body.scrollTop)
        m.left -= o.documentElement.clientLeft
        m.top -= o.documentElement.clientTop
        var n = o.body,
          q = parseInt(l(n, 'borderLeftWidth')),
          j = parseInt(l(n, 'borderTopWidth'))
        if (i.ie && !i.isStrict) {
          m.left -= isNaN(q) ? 2 : q
          m.top -= isNaN(j) ? 2 : j
        }
      } else {
        p = f
        do {
          m.left += p.offsetLeft
          m.top += p.offsetTop
          if (i.isWebkit > 0 && l(p, 'position') == 'fixed') {
            m.left += o.body.scrollLeft
            m.top += o.body.scrollTop
            break
          }
          p = p.offsetParent
        } while (p && p != f)
        if (i.opera > 0 || (i.isWebkit > 0 && l(f, 'position') == 'absolute')) {
          m.top -= o.body.offsetTop
        }
        p = f.offsetParent
        while (p && p != o.body) {
          m.left -= p.scrollLeft
          if (!i.opera || p.tagName != 'TR') {
            m.top -= p.scrollTop
          }
          p = p.offsetParent
        }
      }
      return m
    }
    c.event = c.event || {}
    c.event._listeners = c.event._listeners || []
    c.event.on = function (g, j, l) {
      j = j.replace(/^on/i, '')
      g = c.dom._g(g)
      var k = function (n) {
          l.call(g, n)
        },
        f = c.event._listeners,
        i = c.event._eventFilter,
        m,
        h = j
      j = j.toLowerCase()
      if (i && i[j]) {
        m = i[j](g, j, k)
        h = m.type
        k = m.listener
      }
      if (g.addEventListener) {
        g.addEventListener(h, k, false)
      } else {
        if (g.attachEvent) {
          g.attachEvent('on' + h, k)
        }
      }
      f[f.length] = [g, j, l, k, h]
      return g
    }
    c.on = c.event.on
    ;(function () {
      var f = window[c.guid]
      c.lang.guid = function () {
        return 'TANGRAM__' + (f._counter++).toString(36)
      }
      f._counter = f._counter || 1
    })()
    window[c.guid]._instances = window[c.guid]._instances || {}
    c.lang.isFunction = function (f) {
      return '[object Function]' == Object.prototype.toString.call(f)
    }
    c.lang.Class = function (f) {
      this.guid = f || c.lang.guid()
      window[c.guid]._instances[this.guid] = this
    }
    window[c.guid]._instances = window[c.guid]._instances || {}
    c.lang.Class.prototype.dispose = function () {
      delete window[c.guid]._instances[this.guid]
      for (var f in this) {
        if (!c.lang.isFunction(this[f])) {
          delete this[f]
        }
      }
      this.disposed = true
    }
    c.lang.Class.prototype.toString = function () {
      return '[object ' + (this._className || 'Object') + ']'
    }
    c.lang.Event = function (f, g) {
      this.type = f
      this.returnValue = true
      this.target = g || null
      this.currentTarget = null
    }
    c.lang.Class.prototype.addEventListener = function (i, h, g) {
      if (!c.lang.isFunction(h)) {
        return
      }
      !this.__listeners && (this.__listeners = {})
      var f = this.__listeners,
        j
      if (typeof g == 'string' && g) {
        if (/[^\w\-]/.test(g)) {
          throw 'nonstandard key:' + g
        } else {
          h.hashCode = g
          j = g
        }
      }
      i.indexOf('on') != 0 && (i = 'on' + i)
      typeof f[i] != 'object' && (f[i] = {})
      j = j || c.lang.guid()
      h.hashCode = j
      f[i][j] = h
    }
    c.lang.Class.prototype.removeEventListener = function (i, h) {
      if (typeof h != 'undefined') {
        if ((c.lang.isFunction(h) && !(h = h.hashCode)) || !c.lang.isString(h)) {
          return
        }
      }
      !this.__listeners && (this.__listeners = {})
      i.indexOf('on') != 0 && (i = 'on' + i)
      var g = this.__listeners
      if (!g[i]) {
        return
      }
      if (typeof h != 'undefined') {
        g[i][h] && delete g[i][h]
      } else {
        for (var f in g[i]) {
          delete g[i][f]
        }
      }
    }
    c.lang.Class.prototype.dispatchEvent = function (j, f) {
      if (c.lang.isString(j)) {
        j = new c.lang.Event(j)
      }
      !this.__listeners && (this.__listeners = {})
      f = f || {}
      for (var h in f) {
        j[h] = f[h]
      }
      var h,
        g = this.__listeners,
        k = j.type
      j.target = j.target || this
      j.currentTarget = this
      k.indexOf('on') != 0 && (k = 'on' + k)
      c.lang.isFunction(this[k]) && this[k].apply(this, arguments)
      if (typeof g[k] == 'object') {
        for (h in g[k]) {
          g[k][h].apply(this, arguments)
        }
      }
      return j.returnValue
    }
    c.lang.inherits = function (l, j, i) {
      var h,
        k,
        f = l.prototype,
        g = new Function()
      g.prototype = j.prototype
      k = l.prototype = new g()
      for (h in f) {
        k[h] = f[h]
      }
      l.prototype.constructor = l
      l.superClass = j.prototype
      if ('string' == typeof i) {
        k._className = i
      }
    }
    c.inherits = c.lang.inherits
  })()
  var b = 'http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m'
  var a = 'png'
  var e = (BMapLib.TextIconOverlay = function (f, h, g) {
    this._position = f
    this._text = h
    this._options = g || {}
    this._styles = this._options.styles || []
    !this._styles.length && this._setupDefaultStyles()
  })
  d.lang.inherits(e, window.BMapGL.Overlay, 'TextIconOverlay')
  e.prototype._setupDefaultStyles = function () {
    var h = [53, 56, 66, 78, 90]
    for (var g = 0, f; (f = h[g]); g++) {
      this._styles.push({
        url: b + g + '.' + a,
        size: new window.BMapGL.Size(f, f),
      })
    }
  }
  e.prototype.initialize = function (f) {
    this._map = f
    this._domElement = document.createElement('div')
    this._updateCss()
    this._updateText()
    this._updatePosition()
    this._bind()
    this._map.getPanes().markerPane.appendChild(this._domElement)
    return this._domElement
  }
  e.prototype.draw = function () {
    this._map && this._updatePosition()
  }
  e.prototype.getText = function () {
    return this._text
  }
  e.prototype.setText = function (f) {
    if (f && (!this._text || this._text.toString() != f.toString())) {
      this._text = f
      this._updateText()
      this._updateCss()
      this._updatePosition()
    }
  }
  e.prototype.getPosition = function () {
    return this._position
  }
  e.prototype.setPosition = function (f) {
    if (f && (!this._position || !this._position.equals(f))) {
      this._position = f
      this._updatePosition()
    }
  }
  e.prototype.getStyleByText = function (i, h) {
    var g = parseInt(i)
    var f = parseInt(g / 10)
    f = Math.max(0, f)
    f = Math.min(f, h.length - 1)
    return h[f]
  }
  e.prototype._updateCss = function () {
    var f = this.getStyleByText(this._text, this._styles)
    this._domElement.style.cssText = this._buildCssText(f)
  }
  e.prototype._updateText = function () {
    if (this._domElement) {
      this._domElement.innerHTML = this._text
    }
  }
  e.prototype._updatePosition = function () {
    if (this._domElement && this._position) {
      var f = this._domElement.style
      var g = this._map.pointToOverlayPixel(this._position)
      g.x -= Math.ceil(parseInt(f.width) / 2)
      g.y -= Math.ceil(parseInt(f.height) / 2)
      f.left = g.x + 'px'
      f.top = g.y + 'px'
    }
  }
  e.prototype._buildCssText = function (g) {
    var h = g.url
    var n = g.size
    var k = g.anchor
    var j = g.offset
    var l = g.textColor || 'black'
    var f = g.textSize || 10
    var m = []
    if (d.browser.ie < 7) {
      m.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="' + h + '");')
    } else {
      m.push('background-image:url(' + h + ');')
      var i = '0 0'
      j instanceof window.BMapGL.Size && (i = j.width + 'px ' + j.height + 'px')
      m.push('background-position:' + i + ';')
    }
    if (n instanceof window.BMapGL.Size) {
      if (k instanceof window.BMapGL.Size) {
        if (k.height > 0 && k.height < n.height) {
          m.push('height:' + (n.height - k.height) + 'px; padding-top:' + k.height + 'px;')
        }
        if (k.width > 0 && k.width < n.width) {
          m.push('width:' + (n.width - k.width) + 'px; padding-left:' + k.width + 'px;')
        }
      } else {
        m.push('height:' + n.height + 'px; line-height:' + n.height + 'px;')
        m.push('width:' + n.width + 'px; text-align:center;')
      }
    }
    m.push(
      'cursor:pointer; color:' +
        l +
        '; position:absolute; font-size:' +
        f +
        'px; font-family:Arial,sans-serif; font-weight:bold'
    )
    return m.join('')
  }
  e.prototype._bind = function () {
    if (!this._domElement) {
      return
    }
    var g = this
    var i = this._map
    var f = d.lang.Event
    function h(m, l) {
      var k = m.srcElement || m.target
      var j = m.clientX || m.pageX
      var o = m.clientY || m.pageY
      if (m && l && j && o && k) {
        var n = d.dom.getPosition(i.getContainer())
        l.pixel = new window.BMapGL.Pixel(j - n.left, o - n.top)
        l.point = i.pixelToPoint(l.pixel)
      }
      return l
    }
    d.event.on(this._domElement, 'mouseover', function (j) {
      g.dispatchEvent(h(j, new f('onmouseover')))
    })
    d.event.on(this._domElement, 'mouseout', function (j) {
      g.dispatchEvent(h(j, new f('onmouseout')))
    })
    d.event.on(this._domElement, 'click', function (j) {
      g.dispatchEvent(h(j, new f('onclick')))
    })
  }
})()
