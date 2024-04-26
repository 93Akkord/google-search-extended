import fs from 'fs';
import userscript from 'userscript-meta-f4w';

const KNOWN_CDN_HOSTS = [
    //
    'cdnjs.cloudflare.com',
    'ajax.googleapis.com',
    'maxcdn.bootstrapcdn.com',
    'stackpath.bootstrapcdn.com',
    'code.jquery.com',
    'cdn.jsdelivr.net',
    'unpkg.com',
    'cdnjs.com',
    'use.fontawesome.com',
    'fonts.googleapis.com',
    'secure.gravatar.com',
    'cdn.ckeditor.com',
    'cdn.rawgit.com',
    'cdn.quilljs.com',
    'cdn.leafletjs.com',
    'cdn.onesignal.com',
    'cdn.tiny.cloud',
    'cdn.plot.ly',
    'cdn.socket.io',
    'cdn.ampproject.org',
    'cdn.datatables.net',
];

/**
 *
 *
 * @author Michael Barros <michaelcbarros@gmail.com>
 * @param {string} src
 * @returns {Object}
 */
export function getUserScriptMeta(src) {
    let regex = /\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/;
    let match = src.match(regex);

    if (match && match[0]) {
        let extractedText = match[0].trim();

        return userscript.parse(extractedText);
    }
}

/**
 *
 *
 * @author Michael Barros <michaelcbarros@gmail.com>
 * @param {string} srcPath
 * @returns {string[]}
 */
export function getRequires(srcPath) {
    let src = fs.readFileSync(srcPath, { encoding: 'utf8' });

    let userScriptMeta = getUserScriptMeta(src);

    let requires = userScriptMeta.require.filter((r) => KNOWN_CDN_HOSTS.filter((c) => r.includes(c)).length == 0);

    return requires;
}
