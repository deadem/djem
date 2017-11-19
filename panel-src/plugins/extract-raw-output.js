/* global require, module, __dirname */
(function() {
  module.exports = plugin;

  function plugin(options) {
  }

  plugin.prototype.apply = function(compiler) {
    var me = this;
    compiler.plugin('emit', function(compilation, callback) {
      var unit = this;

      if (compilation.errors && compilation.errors.length) {
        return callback();
      }

      // console.log(compilation);

      var files = Object.keys(compilation.assets);
      files.forEach(function(file) {
        var asset = compilation.assets[file];
        // console.log(asset.source());

        let text = (asset.source() || '').match(/(______________######(BLOCK|BINARY)######______________)(.*?)\1/);
        let data;
        if (text) {
          if (text[2] == 'BINARY') {
            data = new Buffer(text[3], 'base64');//.toString('binary');
          } else {
            data = JSON.parse('"' + text[3] + '"');
          }
        }
        // console.log(data);

        compilation.assets[file] = {
          source: function() {
            return data;
          },
          size: function() {
            return data.length;
          }
        }
      });
      callback();
    });
  };
})();
