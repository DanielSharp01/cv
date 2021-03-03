var html_to_pdf = require('html-pdf-node');
var fs = require('fs');

fs.writeFileSync('index.html', fs.readFileSync('index.html', 'utf8').replace('<body class="preview">', '<body>'), 'utf8')

var liveServer = require("live-server");
 
var params = {
    port: 5501,
    open: false, // When false, it won't load your browser by default.
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    logLevel: 2,
};
liveServer.start(params);

let options = { format: 'A4', preferCSSPageSize: true, printBackground: true };
let file = { url: 'http://127.0.0.1:5501' };
html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    fs.writeFileSync('cv.pdf', pdfBuffer);
    fs.writeFileSync('index.html', fs.readFileSync('index.html', 'utf8').replace('<body>', '<body class="preview">'), 'utf8')
    liveServer.shutdown();
});