var express = require('express');
var router = express.Router();
var HtmlJsonUtils = require('../Server/ParseHtmlFile');
const fs = require('fs');
const path = require('path');
var glob = require("glob")
/* CONFIG FOR FILE UPLOADER */
var multer = require('multer');
var bodyParser = require('body-parser');

express().use(bodyParser.json());

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, 'Upload'))
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[
            file
            .originalname
            .split('.')
            .length - 1
        ])
    }
});

var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['html', 'htm'].indexOf(file.originalname.split('.')[
                file
                .originalname
                .split('.')
                .length - 1
            ]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).array('file', 2);
/* END CONFIG FILE UPLOADER */

express().use(bodyParser.json());
/* restituisce il numero di file per il mese richiesto */
router.get('/getNumberOfAllScannedDays', (req, res, next) => {
    var directory = path.resolve(__dirname, '../Server', 'dataBase', 'Years');
    let detailedResult = getFilesFromDir_Dettagli(directory, [".json"]);
    res
        .status(200)
        .send({
            'detailedResults': detailedResult
        });
});

router.get('/getLastMonthData', (req, res, next) => {
    let choosenRadar = req.query.radar;
    let choosenDetection = req.query.detezione;
    if (choosenRadar && choosenDetection) {
        let lastMonth = getLastMonth();
        let directory = path.resolve(__dirname, '../Server', 'dataBase', 'Years', lastMonth);
        if (lastMonth === '/') {
            /* MONTH DONT FOUND */
            res
                .status(404)
                .send({
                    'error': 'ERROR, i parametri devono essere stringhe e valorizzati'
                });
        } else {
            let lastMonthFilesPath = getFilesFromDir_LastMonth(directory, [".json"], choosenRadar, choosenDetection);
            res
                .status(200)
                .send({
                    'result': lastMonthFilesPath
                });
        }
    } else {
        res
            .status(404)
            .send({
                'error': 'ERROR, i parametri devono essere stringhe e valorizzati'
            });
    }
});

router.get('/getYear/:year', (req, res, next) => {
    console.log(req.params.year);

});

router.get('/getMonth/:data', (req, res, next) => {
    console.log(req.params.data);
});

router.get('/getDay/:data', (req, res, next) => {
    var fullData = req.params.data;

    var directory = path.resolve(__dirname, '../Server', 'dataBase', 'Years')

    let daydata = getFilesFromDir(directory, [".json"])
    res
        .status(200)
        .send({
            'day': daydata
        });
});

router.post('/upload', (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.files) {
            res.json({
                error_code: 1,
                err_desc: "No file passed"
            });
            return;
        }
        res.json({
            error_code: 0,
            err_desc: null
        });
    });

});
router.get('/update', (req, res, next) => {
    try {
        HtmlJsonUtils.ParseAllFilesInDirectory();
        res.status(200).send('OK');
    } catch (err) {
        res.status(500).send({
            'Error': 'error'
        });
    }
});


function getLastYear() {
    let biggestYear = 0;
    let latestYearPath = '';
    fs
        .readdirSync(path.resolve(__dirname, '../Server', 'dataBase', 'Years'))
        .forEach((year) => {
            let c = Number(year.substring(0, 2));
            if (c >= biggestYear) {
                latestYearPath = year.substring(0.2);
            }
        });
    return latestYearPath;
}

function getLastMonth() {
    let LastYear = getLastYear();
    let biggerMonth = 0;
    let latestMonthPath = '';
    fs
        .readdirSync(path.resolve(__dirname, '../Server', 'dataBase', 'Years', LastYear))
        .forEach((year) => {
            let c = Number(year.substring(0, 2));
            if (c >= biggerMonth) {
                latestMonthPath = year.substring(0.2);
            }
        });
    return LastYear + '/' + latestMonthPath;
}

function getDay(date) {}

function getMonth(date) {}

function getYear(date) {}

// Return a list of files of the specified fileTypes in the provided dir, with
// the file path relative to the given dir dir: path of the directory you want
// to search the files for fileTypes: array of file types you are search files,
// ex: ['.txt', '.jpg']
function getFilesFromDir(dir, fileTypes) {
    var filesToReturn = [];

    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {
            var curFile = path.join(currentPath, files[i]);
            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    };
    walkDir(dir);
    return filesToReturn;
}





function getFilesFromDir_LastMonth(dir, fileTypes, radarChosen, detenzioneChosen) {

    let objRadarMonth = {
        radar: '',
        data_mm: '',
        data_yy: '',
        values: []
    }

    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {
            let k = Number(i);
            var curFile = path.join(currentPath, files[k]);

            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                var obj = JSON.parse(fs.readFileSync(curFile, 'utf8'));
                if (k === 0) {
                    objRadarMonth.radar = Object.keys(obj.radars)[0];
                    objRadarMonth.data_yy = obj.data.substring(0, 2);
                    objRadarMonth.data_mm = obj.data.substring(3, 5);
                }
                objRadarMonth.values.push({
                    day: obj.data.substring(6, 8),
                    value: Number(obj.radars[radarChosen][detenzioneChosen])
                })

            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }

        }
    }

    walkDir(dir);
    return objRadarMonth;

}



function getFilesFromDir_Dettagli(dir, fileTypes) {
    var filesToReturn = [];
    let objYears = {};

    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {
            var curFile = path.join(currentPath, files[i]);
            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                if (files[i].split('_')[1] === 'yy') {
                    objYears[files[i]] = getFilesFromDir(curFile, ['.json']).length;
                }
                walkDir(curFile);
            }
        }
    };
    walkDir(dir);
    return {
        'TotalFiles': filesToReturn.length,
        'yearDetails': objYears
    };
}

module.exports = router;