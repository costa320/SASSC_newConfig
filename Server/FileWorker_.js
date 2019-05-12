var fs = require('fs');
var path = require('path');
var util = require('util')

const dataBaseDIR = './database/Years';

const isDirectory = source => fs
    .lstatSync(source)
    .isDirectory();
const getDirectories = source => fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

exports.manageArrayDays = (arrayDays) => {

    let formattedArrayOfDays = arrayDays.map((day) => {
        let formattedDay = {};
        formattedDay['data'] = day.data;

        let RadarsOBJ = {};
        day
            .Radars
            .map((i, radar) => {
                let formattedValues = {}
                radar
                    .values
                    .map((x, det) => {
                        let detenzionePulita = det.detenzione.replace(/\s/g, '');
                        detenzionePulita = detenzionePulita.replace('/\\n/g', '');
                        x !== 0 ?
                            formattedValues[detenzionePulita] = det.value.replace('/\\n/g', '').replace(/\s/g, '') :
                            ''
                    })
                i !== 0 ?
                    RadarsOBJ[radar.radar] = formattedValues :
                    ''
            });

        formattedDay['radars'] = RadarsOBJ;
        return formattedDay;
    });
    formattedArrayOfDays.map((day) => {
        manageNewDay(day)
    })
}

function manageNewDay(dayOBJ) {

    let data_yy = dayOBJ
        .data
        .substring(0, 2) + '_yy',
        data_mm = dayOBJ
        .data
        .substring(3, 5) + '_mm',
        data_gg = dayOBJ
        .data
        .substring(6, 8) + '_gg';

    /* Se la directory di Questo Anno non esiste la creo */
    if (!fs.existsSync(path.resolve(__dirname, '../database/Years', data_yy))) {
        fs.mkdirSync(path.resolve(__dirname, '../database/Years', data_yy));
    }
    if (!fs.existsSync(path.resolve(__dirname, '../database/Years/' + data_yy, data_mm))) {
        fs.mkdirSync(path.resolve(__dirname, '../database/Years/' + data_yy, data_mm));
    }
    /* A QUESTO PUNTO ESISTE SIA LA DIRECTORY DELL'ANNO IN QUESTIONE CHE LA DIRECTORY DEL MESE IN QUESTIONE ESISTONO*/

    let data = JSON.stringify(dayOBJ);

    let pathOfFile = path.resolve(__dirname, '../database/Years/' + data_yy, data_mm, data_gg + '.json');
    /* se non esiste il file di questo giorno lo crea, se ce ne gia uno lo sovrascrive */
    writeFile(pathOfFile, data);

}

let fileNum = 0;

function writeFile(urlOfFile, data) {

    fs.writeFile(urlOfFile, data, 'utf8', (err) => {
        fileNum++;
        if (err) {
            console.log('ERROR : File number ' + fileNum)
            throw err;
        }
        console.log('The file number: ' + fileNum + ' has been saved!');
    });
}