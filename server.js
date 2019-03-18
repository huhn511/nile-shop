const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');


// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

