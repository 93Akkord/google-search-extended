import _path from 'path';
import replaceExt from 'replace-ext';
import escapeRegexp from 'escape-string-regexp';

let path = _path;
let p = {};

Object.keys(path).forEach(function (key) {
    p[key] = path[key];
});

path = p;

path.replaceExt = replaceExt;

path.normalizeTrim = function (str) {
    return this.normalize(str).replace(new RegExp(escapeRegexp(this.sep) + '$'), '');
};

path.base = function (str, includeExt) {
    if (includeExt) {
        return this.basename(str);
    } else {
        return this.basename(str, this.extname(str));
    }
};

path.removeExt = function (str) {
    return str.slice(0, -this.extname(str).length);
};

path.fileNameWithPostfix = function (filePath, postfix) {
    if (typeof postfix !== 'string') {
        throw TypeError(`second argument 'postfix' must be string, got ${typeof postfix}`);
    }

    let ext = this.extname(filePath);
    let fileNameWithoutExt = this.basename(filePath, ext);

    return this.join(this.dirname(filePath), fileNameWithoutExt + postfix + ext);
};

path.fileNameWithPrefix = function (filePath, prefix) {
    if (typeof prefix !== 'string') {
        throw TypeError(`second argument 'prefix' must be string, got ${typeof prefix}`);
    }

    let ext = this.extname(filePath);
    let fileNameWithoutExt = this.basename(filePath, ext);

    return this.join(this.dirname(filePath), prefix + fileNameWithoutExt + ext);
};

path.normalizeSeps = function (str, unixStyle = true) {
    return unixStyle ? str.replace(/[\\/]/g, '/') : str.replace(/[\\/]/g, '\\');
};

export default path;
