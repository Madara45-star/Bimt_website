(function (root, factory) {
  factory(root.jQuery);
})(this, function ($) {
  "use strict";
  var CanvasRenderer = function (element, options) {
    var cachedBackground;
    var canvas = document.createElement("canvas");
    element.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;
    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
    var radius = (options.size - options.lineWidth) / 2;
    Date.now =
      Date.now ||
      function () {
        return +new Date();
      };
    var drawCircle = function (color, lineWidth, percent) {
      percent = Math.min(Math.max(-1, percent || 0), 1);
      var isNegative = percent <= 0 ? true : false;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, isNegative);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };
    var reqAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();
    var drawBackground = function () {
      if (options.trackColor)
        drawCircle(options.trackColor, options.lineWidth, 1);
    };
    this.clear = function () {
      ctx.clearRect(
        options.size / -2,
        options.size / -2,
        options.size,
        options.size
      );
    };
    this.draw = function (percent) {
      if (!!options.trackColor) {
        if (ctx.getImageData && ctx.putImageData) {
          if (!cachedBackground) {
            drawBackground();
            cachedBackground = ctx.getImageData(
              0,
              0,
              options.size,
              options.size
            );
          } else {
            ctx.putImageData(cachedBackground, 0, 0);
          }
        } else {
          this.clear();
          drawBackground();
        }
      } else {
        this.clear();
      }
      ctx.lineCap = options.lineCap;
      drawCircle(options.barColor, options.lineWidth, percent / 100);
    }.bind(this);
    this.animate = function (from, to) {
      var startTime = Date.now();
      var animation = function () {
        var process = Math.min(
          Date.now() - startTime,
          options.animate.duration
        );
        var currentValue = options.easing(
          this,
          process,
          from,
          to - from,
          options.animate.duration
        );
        this.draw(currentValue);
        options.onStep(from, to, currentValue);
        reqAnimationFrame(animation);
      }.bind(this);
      reqAnimationFrame(animation);
    }.bind(this);
  };
  var pieChart = function (element, userOptions) {
    var defaultOptions = {
      barColor: "#ef1e25",
      trackColor: "#f9f9f9",
      lineCap: "round",
      lineWidth: 3,
      size: 150,
      rotate: 0,
      animate: { duration: 1000, enabled: true },
      easing: function (x, t, b, c, d) {
        t = t / (d / 2);
        if (t < 1) {
          return (c / 2) * t * t + b;
        }
        return (-c / 2) * (--t * (t - 2) - 1) + b;
      },
      onStep: function (from, to, currentValue) {
        return;
      },
      renderer: CanvasRenderer,
    };
    var options = {};
    var currentValue = 0;
    var init = function () {
      this.element = element;
      this.options = options;
      for (var i in defaultOptions) {
        if (defaultOptions.hasOwnProperty(i)) {
          options[i] =
            userOptions && typeof userOptions[i] !== "undefined"
              ? userOptions[i]
              : defaultOptions[i];
          if (typeof options[i] === "function") {
            options[i] = options[i].bind(this);
          }
        }
      }
      if (
        typeof options.easing === "string" &&
        typeof jQuery !== "undefined" &&
        jQuery.isFunction(jQuery.easing[options.easing])
      ) {
        options.easing = jQuery.easing[options.easing];
      } else {
        options.easing = defaultOptions.easing;
      }
      this.renderer = new options.renderer(element, options);
      this.renderer.draw(currentValue);
      if (element.getAttribute && element.getAttribute("data-percent")) {
        var newValue = parseFloat(element.getAttribute("data-percent"));
        if (options.animate.enabled) {
          this.renderer.animate(currentValue, newValue);
        } else {
          this.renderer.draw(newValue);
        }
        currentValue = newValue;
      }
    }.bind(this)();
  };
  $.fn.pieChart = function (options) {
    return this.each(function () {
      if (!$.data(this, "pieChart")) {
        var userOptions = $.extend({}, options, $(this).data());
        $.data(this, "pieChart", new pieChart(this, userOptions));
      }
    });
  };
});
