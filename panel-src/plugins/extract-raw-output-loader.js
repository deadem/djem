/* global require, module, __dirname */

let markers = '______________######BLOCK######______________';
let binary = '______________######BINARY######______________';

module.exports = function(content) {
  this.cacheable && this.cacheable();
  this.value = content;

  let data;

  if (typeof content == 'object') {
    // binary data
    data = binary + content.toString('base64') + binary;
  } else {
    data = markers + content + markers;
  }

  return 'module.exports = ' + JSON.stringify(data);
};
module.exports.raw = true;
