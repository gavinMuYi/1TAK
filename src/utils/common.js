var createHash = function (hashLength) {
    var hash = Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
    do {
        hash = Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
    } while (!isNaN(hash[0]));
    return hash;
};

export {
    createHash
}
