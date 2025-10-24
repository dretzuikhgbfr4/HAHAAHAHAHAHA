const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: minifyHtml } = require('html-minifier-terser');
const JavaScriptObfuscator = require('javascript-obfuscator');

const root = __dirname;
const distDir = path.join(root, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function writeDist(file, content) {
  const out = path.join(distDir, file);
  ensureDir(path.dirname(out));
  fs.writeFileSync(out, content);
}

async function build() {
  ensureDir(distDir);

  // CSS: minify
  const css = read('styles.css');
  const cssMin = new CleanCSS({ level: 2 }).minify(css).styles;
  writeDist('styles.css', cssMin);

  // JS: obfuscate (removes comments and makes code harder to copy)
  const js = read('script.js');
  const obf = JavaScriptObfuscator.obfuscate(js, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.8,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.3,
    debugProtection: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.8,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    transformObjectKeys: true,
    unicodeEscapeSequence: true,
    sourceMap: false,
    sourceMapMode: 'separate'
  }).getObfuscatedCode();
  writeDist('script.js', obf);

  // HTML: update asset paths and minify (also strips comments)
  let html = read('index.html')
    .replace(/href=\"[^\"]*styles\.css\"/g, 'href="styles.css"')
    .replace(/src=\"[^\"]*script\.js\"/g, 'src="script.js"');

  const htmlMin = await minifyHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    keepClosingSlash: true
  });

  writeDist('index.html', htmlMin);

  // Copy static files like resume
  const resumePath = path.join(root, 'resume.pdf');
  if (fs.existsSync(resumePath)) {
    fs.copyFileSync(resumePath, path.join(distDir, 'resume.pdf'));
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});


