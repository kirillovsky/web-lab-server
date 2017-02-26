var express = require('express'),
    router = express.Router(),
    fs = require('fs-extra'),
    path = require('path');

var imgFolder = path.join(__dirname, '../../../data/img');

module.exports = function (app) {
    app.use('/api/images', router);
};

router.get('/:name', (req, res, next) => {
    // TODO: Not Implemented.
    let imgName = req.params.name;
    res.send(null);
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
            res.send({filename: uniqueFilename});
        });
    });
});
