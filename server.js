const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const uglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(compression());

const projectRoot = __dirname;

function cacheControl(res) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'index.html'));
});

app.get('/resume.pdf', (req, res) => {
  res.sendFile(path.join(projectRoot, 'resume.pdf'));
});

app.get('/assets/script.js', (req, res) => {
  try {
    const sourcePath = path.join(projectRoot, 'script.js');
    const code = fs.readFileSync(sourcePath, 'utf8');
    const minified = uglifyJS.minify(code, { compress: true, mangle: true });
    if (minified.error) {
      throw minified.error;
    }
    res.type('application/javascript');
    cacheControl(res);
    res.send(minified.code);
  } catch (e) {
    res.status(500).type('text/plain').send('Error serving JS');
  }
});

app.get('/assets/styles.css', (req, res) => {
  try {
    const sourcePath = path.join(projectRoot, 'styles.css');
    const css = fs.readFileSync(sourcePath, 'utf8');
    const minified = new CleanCSS({ level: 2 }).minify(css);
    if (minified.errors && minified.errors.length) {
      throw new Error(minified.errors.join('\n'));
    }
    res.type('text/css');
    cacheControl(res);
    res.send(minified.styles);
  } catch (e) {
    res.status(500).type('text/plain').send('Error serving CSS');
  }
});

app.get('/script.js', (req, res) => {
  try {
    const sourcePath = path.join(projectRoot, 'script.js');
    const code = fs.readFileSync(sourcePath, 'utf8');
    const minified = uglifyJS.minify(code, { compress: true, mangle: true });
    if (minified.error) throw minified.error;
    res.type('application/javascript');
    res.send(minified.code);
  } catch (e) {
    res.status(500).type('text/plain').send('Error serving JS');
  }
});

app.get('/styles.css', (req, res) => {
  try {
    const sourcePath = path.join(projectRoot, 'styles.css');
    const css = fs.readFileSync(sourcePath, 'utf8');
    const minified = new CleanCSS({ level: 2 }).minify(css);
    if (minified.errors && minified.errors.length) throw new Error(minified.errors.join('\n'));
    res.type('text/css');
    res.send(minified.styles);
  } catch (e) {
    res.status(500).type('text/plain').send('Error serving CSS');
  }
});

app.use('/fonts', express.static(path.join(projectRoot, 'fonts')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


