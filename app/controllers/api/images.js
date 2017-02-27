var express = require('express'),
    router = express.Router(),
    fs = require('fs-extra'),
    path = require('path'),
    request = require('request');

var port = 3000;

var imgFolder = path.join(__dirname, '../../../data/userdata/img');

module.exports = function (app) {
    app.use('/api/images', router);
};

router.get('/:name', (req, res, next) => {
    let newUrl = req.protocol + '://' + req.host + ':' + port + '/img/' + req.params.name;
    request(newUrl).pipe(res);
});

router.post('/', (req, res, next) => {
    const max_int = 1000000;
    let fstream;

    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        let uniqueFilename = Math.floor(Math.random() * max_int) + '-' + filename;
        filepath = path.join(imgFolder, uniqueFilename);
        
        fstream = fs.createWriteStream(filepath);
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + filename);              
            res.send({filename: '/api/images/' + uniqueFilename});
        });
    });
});
