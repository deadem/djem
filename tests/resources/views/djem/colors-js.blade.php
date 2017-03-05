Ext.select('table.colors', true).on('click', function(e, target) {
  copyText(Ext.get(target).getAttribute('data'));

  function copyText(text) {
    var copyFrom = document.createElement('textarea');
    copyFrom.setAttribute('style', 'position:absolute;opacity:0');
    copyFrom.value = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    var copied = document.createElement('div');
    copied.setAttribute('class', 'copied');
    copied.appendChild(document.createTextNode('Copied to Clipboard'));
    document.body.appendChild(copied);
    setTimeout(function() {
      document.body.removeChild(copyFrom);
      document.body.removeChild(copied);
    }, 1500);
  };
});
