//  set the port number for the server
var v_portNumber = process.argv[2];
if (v_portNumber == undefined) {
    console.log('Port Number not provided.');
    v_portNumber = 1974;
    console.log('Port Number assigned is:- ', v_portNumber);
} else {
    console.log('Port Number argument/option:- ',v_portNumber);
}

//  express server framework
// const express = require('express');
import express from 'express';
// const fs = require('fs');
import fs from 'fs';
const app = express();

// npm install node-fetch --save
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';

// var helmet = require('helmet')
// app.use(helmet())

//  tell the express server to host static files in the 'public' folder
app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.static('images - partial'));
app.use(express.static('js'));
app.use(express.static('resources'));
app.use(express.static('OLDsite\\images-dump'));
app.use(express.static('OLDsite\\documents-dump'));
app.use(express.static('facebook-images'));

//  tell the express server to recognise incoming data as JSON
app.use(express.json({limit: '1mb'}));

console.log(Date().slice(0,25));
app.listen( process.env.PORT || v_portNumber, () => { 
  console.log('TT server is listening at port ' + v_portNumber + '\n');
});

// // NODEMAILER - START ================================================================================================
// // nodemailer initialise - start
// "use strict";
// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'www.runclub@gmail.com',
//         // application-specific password set up for:- "Mail",(not outlook) and "Windows Computer" START
//         pass: 'riukhrdfdfupitlq'
//         // application-specific password set up for:- "Mail",(not outlook) and "Windows Computer" END
//     }
// });
// // // TEST send mail with defined transport object - start
// //   let info = transporter.sendMail({
// //     from: '"test sender" <www.runclub@gmail.com>', // sender address
// //     to: "d.garton@outlook.com, d.garton@outlook.com.au", // list of receivers
// //     subject: "Hello ✔", // Subject line
// //     text: "Hello world?", // plain text body
// //     html: "<b>Hello world?</b>", // html body
// //   });
// // // TEST send mail with defined transport object - end
// // nodemailer initialise - end

// OLD NON-ES CODE const os = require('os');
// const os = require('os');
import os from 'os';

// SERVER REQUESTS LOG start
app.all('*', (req, res) => {
    console.log('incoming socket.remoteAddress:- "' + req.socket.remoteAddress + '"');
    console.log('incoming socket.remoteAddress:- "' + req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress);
    // const v_ipAddress = req.socket.remoteAddress;
    const v_ipAddress = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
    console.log('incoming IP address:- ' + v_ipAddress + ' ' + Date().slice(0,25));
    // const emailBody = 'incoming IP address:- ' + v_ipAddress + ' ' + Date().slice(0,25) + ' ' + 'incoming originalUrl:- "' + req.originalUrl + '"';
    // console.log('emailBody:- ' + v_ipAddress + ' ' + Date().slice(0,25));
    // let info = transporter.sendMail({
    //   from: '"TurramurraTrotters.org" <www.runclub@gmail.com>', // sender address
    //   to: "d.garton@outlook.com", // list of receivers comma separated
    //   subject: "site activity for:- TurramurraTrotters.org", // Subject line
    //   text: emailBody, // plain text body
    //   // html: "<b>Hello world?</b>", // html body
    // });
    console.log('req.method:- ' + req.method);
    console.log('req.body:- ' + req.body);
    console.log('req.body:- ' + req);


    const v_ipAddressForwarded = req.headers['x-forwarded-for'];
    // console.log('total memory:- ',os.totalmem()/1000000000);
    // console.log('free memory:- ',os.freemem()/1000000000);
    console.log(`incoming IP address:-  ${v_ipAddress}`);
    console.log(`app.all req.connection.remoteAddressForwarded:- ${v_ipAddressForwarded}`);
    console.log('app.all req.url:- ', req.url);
    console.log(`app.all req date:- ${Date().slice(0, 25)}\n`);

    switch (req.url) {
        case '/parseRawCSV_TTevents':
            parseRawCSV_TTevents(req,res);
            break;
    }
});
// SERVER REQUESTS LOG end
// PARSE CSV start
async function parseRawCSV_TTevents(req,res){
    console.log(req.body);
    console.log('');
    async function main(req,res){
        try {
            await fs.readFile(req.body.v_filePathAndName, 'utf8', function (err, data) {
                console.log('fs.readFile data:- ' + data);
                console.log('fs.readFile err:- ' + err);
                console.log('');
                const v_data = JSON.stringify(
                    {
                        v_csvData: data.split("\n")
                    }
                );
                res.send(v_data);
                res.end();
                console.log(v_data);
                console.log('/parseRawCSV_TTevents data sent to client:- ' + Date().slice(0,25));
                console.log('');
            });
        }
        catch {
        }
        finally {
        }
    }
    main(req,res);
};
// PARSE CSV end

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// EXIF start
app.post('/getExIf',(req,res) => {
    try {
        // var v_file = "./facebook-images/" + req.body.p_file;
        var v_file = req.body.p_path + req.body.p_file;
        console.log("v_file:- ",v_file + '\n');
        new ExifImage({ image : v_file }, function (error, exifData) {
            if (error){
                console.log('Error: '+error.message);
            }else{
                console.log(v_file + ' taken on '+ exifData.exif.DateTimeOriginal); // Do something with your data!
                res.send({'exifDateTaken': exifData.exif.DateTimeOriginal});
                console.log(Date().slice(0,25));
                res.end();
            }
        });
    } catch (error) {
        console.log('Error: ' + error.message);
        console.log(Date().slice(0,25));
        res.end();
    }
}) 
// EXIF end

// DISPLAY IMAGES DUMP start
app.post('/displayImagesDump',(req,res) => {
    console.log('req.body.p_path:- ',req.body.p_path);
    const folderPath = req.body.p_path;
    fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
        //     console.log(file);
        });
        res.send(files);
        console.log(Date().slice(0,25));
        res.end();
    });
});
// test();
// function test() {
//     const testFolder = './images/';
//     fs.readdir(testFolder, (err, files) => {
//         files.forEach(file => {
//             console.log(file);
//         });
//     });
// }
// DISPLAY IMAGES DUMP end

// DISPLAY DOCUMENTS DUMP start
app.post('/displayDocumentsDump',(req,res) => {
    console.log('req.body.p_path:- ',req.body.p_path);
    const folderPath = req.body.p_path;
    fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
        //     console.log(file);
        });
        res.send(files);
        console.log(Date().slice(0,25));
        res.end();
    });
});
// DISPLAY DOCUMENTSDUMP end

// GET CAPTION start
app.post('/getCaption',(req,res) => {
    try {
        console.log('/getCaption body:- ',req.body);
        console.log('/getCaption body.p_file:- ',req.body.p_file);
        var data = fs.readFileSync('./image-captions/' + req.body.p_file+'.json')
        var imageInfo = JSON.parse(data);
        console.log('/getCaption retrieved:- ',imageInfo.v_caption);
        // res.send({'mtimeMs': stats.mtimeMs,'fileName': req.body.p_path + req.body.p_file,'sizeInBytes': stats.size});
        res.send({"v_caption":imageInfo.v_caption});
        console.log(Date().slice(0,25));
        res.end();
    } catch (error) {
        console.log('/getCaption retrieved Error: ' + error.message);
        res.send({"v_caption":""});
        console.log(Date().slice(0,25));
        res.end();
    }
});
// GET CAPTION end

// GET FILE DTAILS start
app.post('/getFileDetails',(req,res) => {
    console.log('/getFileDetails body:- ',req.body);
    console.log('/getFileDetails body.p_file:- ',req.body.p_file);
    // fs.stat('./server.js', function read(err, data) {
    // fs.stat('./sites/netitcomau/public/index.html', function read(err, data) {
    fs.stat(req.body.p_path + req.body.p_file, function read(err, data) {
        if (err) {
            throw err;
        }
        var stats = data;
        console.log('file:- ',req.body.p_file,'mtimeMs:- ',stats.mtimeMs, stats.mtimeMs.toLocaleString(),'size:- ', stats.size);
        res.send({'mtimeMs': stats.mtimeMs,'fileName': req.body.p_path + req.body.p_file,'sizeInBytes': stats.size});
        console.log(Date().slice(0,25));
        res.end();
    });
});
// GET FILE DTAILS end

// UPDATE CAPTION start
app.post('/updateCaption',(req,res) => {
    console.log(Date().slice(0,25));
    console.log('/updateCaption:- ',req.body);
    console.log('/updateCaption for write:- ',JSON.stringify(req.body));
    fs.writeFileSync('./image-captions/' + req.body.v_fileName+'.json',JSON.stringify(req.body));
    var data = fs.readFileSync('./image-captions/' + req.body.v_fileName+'.json')
    var imageInfo = JSON.parse(data);
    console.log('/updateCaption read:- ',imageInfo);
    res.send({'req.body': req.body});
    console.log(Date().slice(0,25));
    res.end();
});
// UPDATE CAPTION end

// RECORD ANALYTICS start
    app.post('/logAnalytics_Beacon',(req) => {
        // console.log(req.body);
        v_csvText = '' 
            + req.body.v_sessionId + ',' 
            + req.body.v_sessionStartDateTime + ',' 
            + req.body.v_sessionSecondsAlive + ',' 
            + req.body.v_sessionSecondsDuration + ',' 
            + req.body.v_wheelRolls + ',' 
            + req.body.v_navKeyPresses + ',' 
            + req.body.v_menuClicks + ',' 
            + req.body.v_menuClickHistory + ',' 
            + req.body.v_dateNow + ',' 
            + req.body.v_timeNow + ','  
            + req.body.v_timeNow + ','  
            + req.body.v_clientOS + ','  
            + req.body.v_browser + ',' 
            + timeStampString() + '\n';
        // console.log(v_csvText);
        fs.appendFile('../../SiteStatistics/tt/' + req.body.v_sessionId + '.csv', v_csvText ,(err) => {
        });
        fs.appendFile('../../SiteStatistics/turramurra-trotters-analytics.csv', v_csvText ,(err) => {
        });
        console.log('$$$ Server received analytics from client via sendBeacon. $$$\n',Date().slice(0,25));
    });
    app.post('/logAnalytics',(req,res) => {
        console.log("YES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(req.body);
        v_csvText = '' 
            + req.body.v_sessionId + ',' 
            + req.body.v_sessionStartDateTime + ',' 
            + req.body.v_sessionSecondsAlive + ',' 
            + req.body.v_sessionSecondsDuration + ',' 
            + req.body.v_wheelRolls + ',' 
            + req.body.v_navKeyPresses + ',' 
            + req.body.v_menuClicks + ',' 
            + req.body.v_menuClickHistory + ',' 
            + req.body.v_dateNow + ',' 
            + req.body.v_timeNow + ','  
            + req.body.v_timeNow + ','  
            + req.body.v_clientOS + ','  
            + req.body.v_browser + ',' 
            + timeStampString() + '\n';
        // console.log(v_csvText);
        fs.appendFile('../../SiteStatistics/tt/' + req.body.v_sessionId + '.csv', v_csvText ,(err) => {
        });
        fs.appendFile('../../SiteStatistics/turramurra-trotters-analytics.csv', v_csvText ,(err) => {
        });
        const v_data = JSON.stringify(
            {
                v_csvData: v_csvText
            }
        );
        res.send(v_data);
        res.end();
    });
    // app.post('/recordAnalytics',(req,res) => {
    //     v_csvText = req.body.v_date + ',' + req.body.v_time + ','  + req.body.v_sessionId + ',' + req.body.v_analyticDescription + ',' + req.body.v_analyticValue + ',' + req.body.v_timeStampString + '\n';
    //     // console.log(v_csvText);
    //     fs.appendFile('../../SiteStatistics/turramurra-trotters-analytics.csv', v_csvText ,(err) => {
    //     });
   //     const v_data = JSON.stringify(
    //         {
    //             v_csvData: v_csvText
    //         }
    //     );
    //     res.send(v_data);
    //     res.end();
    // });
// RECORD ANALYTICS end
// PARSE ANALYTICS start
    app.post('/parseAnalyticsCSV',(req,res) => {
        console.log(req.body);
        console.log('');
        async function main(req,res){
            try {
                await fs.readFile(req.body.v_filePathAndName, 'utf8', function (err, data) {
                    // console.log('fs.readFile data:- ' + data);
                    console.log('fs.readFile err:- ' + err);
                    console.log('');
                    const v_data = JSON.stringify(
                        {
                            v_csvData: data.split("\n")
                        }
                    );
                    res.send(v_data);
                    res.end();
                    // console.log(v_data);
                    console.log('/parseAnalyticsCSV parsed data sent to client:- ' + Date().slice(0,25));
                    console.log('');
                });
            }
            catch {
            }
            finally {
            }
        }
        main(req,res);
    });
// PARSE ANALYTICS end

app.post('/txtFromClient',(req,res) => {
    console.log(req.body.v_txt + '\n' + Date().slice(0,25) + '\n');
});
// TEST COMMS begin /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
app.post('/commsPostCheck',(req,res) => {
    console.log("comms check - POST fetch:- server received client request OK")
    console.log(req.body);
    res.send({text: "server response - POST fetch:- text sent from server to client OK" });
    console.log(Date().slice(0,25));
    res.end();
});
app.post('/commsGetCheck',(req,res) => {
    console.log("comms check - GET fetch:- server received client request OK")
    console.log(req.body);
    res.send({text: "server response - GET fetch:- text sent from server to client OK" });
    console.log(Date().slice(0,25));
    res.end();
});
// TEST COMMS end /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
function timeStampString(){
    const v_dateNow = new Date(); 
    var v_fullYear = v_dateNow.getFullYear();
    var v_month = v_dateNow.getMonth()+1;
    if (v_month<10)(v_month="0"+v_month);
    var v_day = v_dateNow.getDate();
    if (v_day<10)(v_day="0"+v_day);
    var v_hour = v_dateNow.getHours();
    if (v_hour<10)(v_hour="0"+v_hour);
    var v_minute = v_dateNow.getMinutes();
    if (v_minute<10)(v_minute="0"+v_minute);
    var v_second = v_dateNow.getSeconds();
    if (v_second<10)(v_second="0"+v_second);
    var v_millisecond = v_dateNow.getMilliseconds();
    if (v_millisecond<10)(v_millisecond="0"+v_millisecond);
    if (v_millisecond<100)(v_millisecond="0"+v_millisecond);
    const v_timeStampStr = "now" + v_fullYear + v_month + v_day + v_hour + v_minute + v_second + v_millisecond;
    // console.log("v_timeStampString:- ",v_timeStampStr);
    return v_timeStampStr;
}