+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");

  function generateOneRandomInteger(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  function RandomInteger() {
    var args    = [].slice.call(arguments)
    ,   options = {};

    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // {}
        options = args[0];
      }
    } else if (args.length === 2) {
      // start, end
      options.start = args[0];
      options.end   = args[1];
    }

    return new RandomInteger.prototype._init(options);
  }

  RandomInteger.prototype = {
    start: Number.MIN_SAFE_INTEGER || -2000000000,
    end  : Number.MAX_SAFE_INTEGER ||  2000000000,

    _init: function(options) {
      this.params(options);

      return this;
    },

    params: function(options) {
      options = options || {};

      this.start    = utils.isNumeric(options.start) ? options.start : this.start;
      this.end      = utils.isNumeric(options.end) ? options.end : this.end;

      this.generate = (function(_generate, start, end) {
        return function(count, __callback) {
          if (count === undefined) {
            return _generate(start, end);
          } else {
            var data = [];
            for (var i = 0; i < count; i++) {
              data.push(_generate(start, end));
            }
            if (typeof __callback === "function") {
              return __callback(null, data);
            } else {
              return data;
            }
          }
        }
      })(generateOneRandomInteger, this.start, this.end);

      return {
        start: this.start,
        end  : this.end
      };
    }
  };

  RandomInteger.prototype._init.prototype = RandomInteger.prototype;

  module.exports = RandomInteger;

}();
