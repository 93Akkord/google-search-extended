import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { getRequires } from './userscript-helpers.js';
import path from './utils/path-extra.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LIBS_PATH = path.join(__dirname, '../libs');

async function downloadFile(url, outputDir, outputFilename = null) {
    outputFilename = !outputFilename ? path.basename(url) : outputFilename;

    let outputFilePath = path.join(outputDir, outputFilename);

    console.debug(`Downloading ${url} to ${path.normalizeSeps(path.relative(process.cwd(), outputFilePath))}`);

    let res = await fetch(url);
    let text = await res.text();

    fs.mkdirSync(outputDir, { recursive: true });

    fs.writeFileSync(outputFilePath, text, { encoding: 'utf8' });
}

async function downloadLibs() {
    let libsToDownload = getRequires(path.join(__dirname, '../src/google-search-extended.user.js'));

    libsToDownload.forEach((libUrl) => {
        try {
            downloadFile(libUrl, LIBS_PATH);
        } catch (error) {
            console.error(`Failed to download ${libUrl}: ${error}`);
        }
    });
}

await downloadLibs();
