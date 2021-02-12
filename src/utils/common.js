var createHash = function (hashLength) {
    var hash = Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
    do {
        hash = Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
    } while (!isNaN(hash[0]));
    return hash;
};

var addCss = function (strcss) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'styleEditorPreview';
    style.innerHTML = strcss;
    document.getElementsByTagName('head').item(0).appendChild(style);
};

export {
    createHash,
    addCss
}
