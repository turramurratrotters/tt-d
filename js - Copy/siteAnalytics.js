var v_analyticsArray = [];
// PARSE site-name...-analytics.csv START
async function parseAnalyticsCSV_Step1(){
    var p_fileName = "turramurra-trotters-analytics.csv";
    // v_csvTitlesArray = new Array ("Date","Time","Analytic description","Analytic value");
    const v_sourceFilePathAndName = `C:\\netIT\\hosting\\SiteStatistics\\${p_fileName}`;
    if(v_clientOS=="Windows"){console.log(v_sourceFilePathAndName);}
    const v_data = JSON.stringify(
        {
            v_filePathAndName: v_sourceFilePathAndName
        }
    );
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(v_clientOS=="Windows"){console.log(JSON.stringify(options));}
    await fetch('/parseAnalyticsCSV',options)
    .then(res => {
        return res.json();
   })
    .then(res_data => {

        // PARSE row data START
            // if(v_clientOS=="Windows"){console.log("res_data.v_csvData.length:- ",res_data.v_csvData.length);}
            // if(v_clientOS=="Windows"){console.log("res_data.v_csvData:- ",res_data.v_csvData);}
            // var myArray = res_data.v_csvData.replace(/[\r]/g, "" );
            var myArray2 = [[]];
            // myArray2[0] = ["ID","Start","Seconds Viewed","Seconds Duration","Mouse Wheel Ticks","Navigation Key Presses","Menu Clicks","Menu History","Now","Now","Time STamp Client","Time Stamp Server"];
            var str = "";
            for ( i0 = 0; i0 < res_data.v_csvData.length-1; i0++ ){
                // res_data.v_csvData[i0].replace( /[\r\n]+/gm, "" );
                // myArray1 = res_data.v_csvData[i0].replace(/\r/gm,"");
                myArray2 = res_data.v_csvData[i0].split(",");
                // if(v_clientOS=="Windows"){console.log(myArray2);}
                str = myArray2[myArray2.length-1].replace(/[\r\n]/,"");
                v_csvTableArray.push([myArray2[0],myArray2[1],myArray2[2],myArray2[3],myArray2[4],myArray2[5],myArray2[6],myArray2[7],myArray2[8],myArray2[9],myArray2[10],str]);
            }
            if(v_clientOS=="Windows"){console.log("v_csvTableArray.length:- ",v_csvTableArray.length);}
            if(v_clientOS=="Windows"){console.log("v_csvTableArray:- ",v_csvTableArray);}
        // PARSE row data END

        // CREATE ARRAY OF UNIQUE v_sessionId START
            var v_id0, v_id1;
            v_id0 = v_csvTableArray[0][0];
            // if(v_clientOS=="Windows"){console.log(v_id0);}
            for ( i = 1; i < v_csvTableArray.length; i++ ){
                v_id1 = v_csvTableArray[i][0];
                if (v_id0 === v_id1){
                    v_csvTableArray[i-1][0] = "delete";
                }
                v_id0 = v_csvTableArray[i][0];
            }
            if(v_clientOS=="Windows"){console.log("v_csvTableArray.length:- ",v_csvTableArray.length);}
            if(v_clientOS=="Windows"){console.log("v_csvTableArray:- ",v_csvTableArray);}
            v_analyticsArray = [];
            for ( i = 1; i < v_csvTableArray.length; i++ ){
                if (v_csvTableArray[i][0] != "delete"){
                    v_analyticsArray.push(v_csvTableArray[i]);
                };
            }
            if(v_clientOS=="Windows"){console.log(v_analyticsArray);}
        // CREATE ARRAY OF UNIQUE v_sessionId END

    })
    .then(() => {
        v_html = ``;
        v_html += `<table style="position:relative;border-collapse:collapse;">`;
        v_html += `<tr class="X-i06-table-header-fixed-analytics">`;
        v_html += `<th class="table-simple-header100" >Session ID</th>`;
        v_html += `<th class="table-simple-header100" >Start</th>`;
        v_html += `<th class="table-simple-header100" >Seconds<br>Viewed</th>`;
        v_html += `<th class="table-simple-header100" >Seconds<br>Duration</th>`;
        v_html += `<th class="table-simple-header100" >Mouse<br>Ticks</th>`;
        v_html += `<th class="table-simple-header100" >Navigation<br>Key Presses</th>`;
        v_html += `<th class="table-simple-header100" >Menu<br>Clicks</th>`;
        v_html += `<th class="table-simple-header100" width="130px">Menu History</th>`;
        v_html += `<th class="table-simple-header100" >Date Now</th>`;
        v_html += `<th class="table-simple-header100" >Time Now</th>`;
        v_html += `<th class="table-simple-header100" >Client Timestamp</th>`;
        v_html += `<th class="table-simple-header100" >Server Timestamp</th>`;
        v_html += `</tr>`;
        for (i=0;i<v_analyticsArray.length;i++){
            v_html += `<tr>`;
            // v_html += `<td class="table-simple" style="xdisplay:none">${v_sortedArray[i][0]}</td>`;
            v_html += `<td class="table-simple" >${v_analyticsArray[i][0]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][1]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][2]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][3]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][4]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][5]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][6]}</td>`;
            v_html += `<td class="table-simple" >${v_analyticsArray[i][7]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][8]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][9]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][10]}</td>`;
            v_html += `<td class="table-simple">${v_analyticsArray[i][11]}</td>`;
            v_html += `</tr>`;
        }
        v_html += `</table>`;
        document.getElementById("outPutA").innerHTML = v_html;
        popCalendar();
    })
}
// PARSE site-name...-analytics.csv END

function timeStampString(){
        const v_dateNow = new Date(); 
        var v_fullYear = v_dateNow.getFullYear();
        var v_month = v_dateNow.getMonth()+1
        var v_monthStr = v_month;
        if (v_month<10)(v_monthStr="0"+v_monthStr);
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
        const v_timeStampString = "now" + v_fullYear + v_month + v_day + v_hour + v_minute + v_second + v_millisecond;
        // if(v_clientOS=="Windows"){console.log("v_timeStampString:- ",v_timeStampString);}
        return v_timeStampString;
}

function popCalendar(){

    var v_date = new Date();
    // var v_date = new Date(2021,1,1);
    var v_year = v_date.getFullYear();
    var v_month = v_date.getMonth()+1;

    var v_thisMonth = new Array(12);
    v_thisMonth[1] = "Jan";
    v_thisMonth[2] = "Feb";
    v_thisMonth[3] = "Mar";
    v_thisMonth[4] = "Apr";
    v_thisMonth[5] = "May";
    v_thisMonth[6] = "Jun";
    v_thisMonth[7] = "Jul";
    v_thisMonth[8] = "Aug";
    v_thisMonth[9] = "Sep";
    v_thisMonth[10] = "Oct";
    v_thisMonth[11] = "Nov";
    v_thisMonth[12] = "Dec";
    var v_monthString = v_thisMonth[v_month];

    var v_monthStartDate = new Date(v_year,v_month-1,1);
    var a_currentMonthDates = [];
    var v_dayStr = "";
    var v_monthStr = v_month;
    if ( v_monthStr * 1 < 10 ){v_monthStr = "0" + v_monthStr;}
    var v_withinonthDate;
    for (x = 0; x < 31; x++){
        v_withinonthDate = new Date(v_year,v_month-1,v_monthStartDate.getDate()+x);
        if (v_withinonthDate.getMonth()+1 == v_month){
            // if(v_clientOS=="Windows"){console.log(v_withinonthDate);}
            v_dayStr = x + 1;
            if ( v_dayStr * 1 < 10 ) {v_dayStr = "0" + v_dayStr;}
            a_currentMonthDates.push([v_withinonthDate.getFullYear()+v_monthStr+v_dayStr]);
            a_currentMonthDates[x].push(0); // for count of sessions
            a_currentMonthDates[x].push(0); // for session alive minutes
        }
    }
    // if(v_clientOS=="Windows"){console.log(a_currentMonthDates);}

    // COUNT SESSIONS start
    for (i1 = 0; i1 < v_analyticsArray.length; i1++){
        for ( i2 = 0; i2 < a_currentMonthDates.length; i2++){
            if ( v_analyticsArray[i1][0].slice(2,10)*1 == a_currentMonthDates[i2][0]*1 && v_analyticsArray[i1][3] == "Session started" ){
                // if(v_clientOS=="Windows"){console.log(a_consolidatedTable[i1][3],a_consolidatedTable[i1][0].slice(2,10),a_currentMonthDates[i2],"matched");}
                a_currentMonthDates[i2][1] += 1;
            }
        }
    }
    console.log(a_currentMonthDates);
    // var a_countSessions = a_consolidatedTable.map(function countSessions(a_consolidatedTable,v_month)
    // function countSessions(a,v_month){
    //     for (i = 0; i < a_consolidatedTable.length; i++){            
    //     }
    // }
    // COUNT SESSIONS end

    // SESSION ALIVE MINUTES start
    for (i1 = 0; i1 < v_analyticsArray.length; i1++){
        for ( i2 = 0; i2 < a_currentMonthDates.length; i2++){
            if ( v_analyticsArray[i1][0].slice(2,10)*1 == a_currentMonthDates[i2][0]*1 && v_analyticsArray[i1][3] == "Session cumulative minutes alive" ){
                // if(v_clientOS=="Windows"){console.log(a_consolidatedTable[i1][3],a_consolidatedTable[i1][0].slice(2,10),a_currentMonthDates[i2],"matched");}
                a_currentMonthDates[i2][2] += v_analyticsArray[i1][4];
            }
        }
    }
    if(v_clientOS=="Windows"){console.log(a_currentMonthDates);}
    // SESSION ALIVE MINUTES end
    

    // var v_yearStart = new Date(v_year*1,0,1); /* 1 Jan yyyy*/
    // var v_testDate = v_yearStart;
    // var v_trottersMeetDate = v_yearStart;
    // var v_trottersMeetDateString = new Date(v_yearStart).toLocaleDateString("en-AU");
    // var v_initialOffsetDays = 0;
    // var v_today = new Date();
    // var weekday = new Array(7);
    // weekday[1] = "Sun";
    // weekday[2] = "Mon";
    // weekday[3] = "Tue";
    // weekday[4] = "Wed";
    // weekday[5] = "Thu";
    // weekday[6] = "Fri";
    // weekday[7] = "Sat";
    // var v_day = weekday[v_today.getDay()+1];
    // var v_todayString = v_day + ', ' + v_today.toLocaleDateString("en-AU") ;
    // var v_startDate = new Date();
    // var v_endDate = new Date();
    // if(v_clientOS=="Windows"){console.log('v_today',v_today,'\nv_startDate',v_startDate,'\nv_endDate',v_endDate);}

}

// SESSION STATISTICS RECORDING start -----------------------------------------------------------------------------
    // GEOLOCATION start
    // if (navigator.geolocation) {
    //         var v_geoLoc = await navigator.geolocation.getCurrentPosition(showPosition);
    //         window.sessionStorage.setItem("geoLoc",v_geoLoc);
    //         if(v_clientOS=="Windows"){console.log(sessionStorage.getItem("geoLoc"));}
    // } else {
    //         // x.innerHTML = "Geolocation is not supported by this browser.";
    // }
    // GEOLOCATION end

// function showPosition(position) {
//         // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
//         // if(v_clientOS=="Windows"){console.log(position);}
//         if(v_clientOS=="Windows"){console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);}
//         return "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
// }

function currentDateTimeFullNumbersStringPlusRand(){
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
    const v_dateNowFullNumbersString = "id" + v_fullYear + v_month + v_day + v_hour + v_minute + v_second + v_millisecond + "-" + Math.round(Math.random()*10000);
    return v_dateNowFullNumbersString ;
}
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
    // if(v_clientOS=="Windows"){console.log("v_timeStampString:- ",v_timeStampStr);}
    return v_timeStampStr;
}

function recordSessionStart(){
    const sessionStartPromise = new Promise((resolve,reject) => {
        if (sessionStorage.sessionId){
        } else {
            sessionStorage.setItem("sessionId",currentDateTimeFullNumbersStringPlusRand());
            sessionStorage.setItem("sessionStartDateTime",timeStampString());
            sessionStorage.setItem("sessionStart",new Date().getTime());
            sessionStorage.setItem("sessionResume",new Date().getTime());
            sessionStorage.setItem("sessionEnd",new Date().getTime());
            sessionStorage.setItem("sessionSecondsAlive",0);
            sessionStorage.setItem("sessionSecondsDuration",0);
        }
        if (sessionStorage.sessionId){
            resolve(sessionStorage.getItem("sessionId"));
        } else {
            reject('store sessionId in sessionStorage failed');
        }
    });
    sessionStartPromise.then((p_resolvedPromise) => {
        txtToServer("Session:- started, YES. With Id " + p_resolvedPromise);
        sendAnalyticsToServer();
    }).catch((p_rejectedPromise) => {
        txtToServer("Session:- started, NO." + p_rejectedPromise);
    });
    // if (sessionStorage.sessionId){
    //     var v_sessionId = sessionStorage.getItem("sessionId");
    //     txtToServer("Session:- already started check, YES. With Id " + v_sessionId);
    // } else {
    //     sessionStorage.setItem("sessionId",currentDateTimeFullNumbersStringPlusRand());
    //     sessionStorage.setItem("sessionStartDateTime",timeStampString());
    //     sessionStorage.setItem("sessionStart",new Date().getTime());
    //     sessionStorage.setItem("sessionResume",new Date().getTime());
    //     sessionStorage.setItem("sessionEnd",new Date().getTime());
    //     sessionStorage.setItem("sessionSecondsAlive",0);
    //     sessionStorage.setItem("sessionSecondsDuration",0);
    //     txtToServer("Session:- started with Id " + v_sessionId);
    //     sendAnalyticsToServer();
    // }
}
function recordSessionResume(){
    txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " resumed.");
    var v_sessionResume = sessionStorage.getItem("sessionResume");
    if (v_sessionResume===null || v_sessionResume===undefined || v_sessionResume*1 < new Date().getTime()){
        sessionStorage.setItem("sessionResume",new Date().getTime());
        // v_sessionResume = sessionStorage.getItem("sessionResume");
        // if(v_clientOS=="Windows"){console.log("sessionResume:- ",v_sessionResume);}
    }
    sendAnalyticsToServer();
}
function recordSessionEnd(){
    txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " ended.");
    var v_end = sessionStorage.getItem("sessionEnd");
    if (v_end===null || v_end===undefined || v_end*1 < new Date().getTime() ){
        v_end = new Date().getTime();
        sessionStorage.setItem("sessionEnd",v_end);
        // if(v_clientOS=="Windows"){console.log("sessionEnd:- ",v_end);}
        // update live seconds start
        var v_resume = sessionStorage.getItem("sessionResume");
        var v_secondsAlive = sessionStorage.getItem("sessionSecondsAlive")*1 + ((v_end*1 - v_resume*1)/1000);
        sessionStorage.setItem("sessionSecondsAlive",v_secondsAlive);
        // if(v_clientOS=="Windows"){console.log("sessionSecondsAlive:- ",v_secondsAlive);}
        // update live seconds end
        // update duration seconds start
        var v_start = sessionStorage.getItem("sessionStart");
        var v_secondsDuration = sessionStorage.getItem("sessionSecondsDuration")*1 + ((v_end*1 - v_start*1)/1000);
        sessionStorage.setItem("sessionSecondsDuration",v_secondsDuration);
        // if(v_clientOS=="Windows"){console.log("sessionSecondsDuration:- ",v_secondsDuration);}
        // update duration seconds end
    }
    sendAnalyticsToServer();
}
function recordWheelEvent(e){
    txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " mouse wheel event.");
    var v_wheelRolls = sessionStorage.getItem("wheelRolls")*1;
    if (v_wheelRolls===null || v_wheelRolls===undefined){v_wheelRolls=0;}
    v_wheelRolls += 1;
    sessionStorage.setItem("wheelRolls",v_wheelRolls);
    // if(v_clientOS=="Windows"){console.log("v_wheelRolls:- ",v_wheelRolls);}
    // sendAnalyticsToServer();
}
function recordKeydownEvent(e){
    txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " key pressed event.");
    var v_navKeyPresses = sessionStorage.getItem("navKeyPresses")*1;
    if (v_navKeyPresses===null || v_navKeyPresses===undefined){v_navKeyPresses=0;}
    v_keyPressed = e.key
    switch (v_keyPressed){
        case "PageDown":
            v_navKeyPresses += 1;
            break;
        case "PageUp":
            v_navKeyPresses += 1;
            break;
        case "ArrowDown":
            v_navKeyPresses += 1;
            break;
        case "ArrowUp":
            v_navKeyPresses += 1;
            break;
        case "Home":
            v_navKeyPresses += 1;
            break;
        case "End":
            v_navKeyPresses += 1;
            break;
        }
    sessionStorage.setItem("navKeyPresses",v_navKeyPresses);
    // if(v_clientOS=="Windows"){console.log("v_navKeyPresses:- ",v_navKeyPresses);}
    // sendAnalyticsToServer();
}
function recordMenuClicks(p_id){
    txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " menu item click event:- " + p_id);
    var v_menuClicks = sessionStorage.getItem("menuClicks")*1;
    if (v_menuClicks===null || v_menuClicks===undefined){v_menuClicks=0;}
    v_menuClicks += 1;
    sessionStorage.setItem("menuClicks",v_menuClicks);
    // if(v_clientOS=="Windows"){console.log("v_menuClicks:- ",v_menuClicks);}
    v_menuClickName = "";
    switch (p_id){
        case "run":
            v_menuClickName = "run";
            break;
        case "walk":
            v_menuClickName = "walk";
            break;
        case 'cycle':
            v_menuClickName = "cycle";
            break;
        case 'coffee':
            v_menuClickName = "coffee";
            break;
        case 'where':
            v_menuClickName = "where";
            break;
        case 'when':
            v_menuClickName = "when";
            break;
        case 'about':
            v_menuClickName = "about";
            break;
        case 'contact':
            v_menuClickName = "contact";
            break;
        case 'c2sCountdown':
            v_menuClickName = "C2S countdown";
            break;
        case 'cySchedule':
            v_menuClickName = "training schedule";
            break;
        // case 'index.html#trekkers':
        //     v_menuClickName = "Trekkers Profile";
        //     break;
        // case 'index.html#cyclists':
        //     v_menuClickName = "Cyclists Profile";
        //     break;
        // case 'index.html#linksToFavSites':
        //     v_menuClickName = "Links";
        //     break;
        // case 'index.html#about':
        //     v_menuClickName = "About";
        //     break;
    }
    var v_menuClickHistory = sessionStorage.getItem("menuClickHistory");
    if (v_menuClickHistory===null || v_menuClickHistory===undefined){v_menuClickHistory="";}
    v_menuClickHistory = v_menuClickHistory + " | " + v_menuClickName;
    sessionStorage.setItem("menuClickHistory",v_menuClickHistory);
    if(v_clientOS=="Windows"){console.log("v_menuClickHistory:- ",v_menuClickHistory);}
    // sendAnalyticsToServer();
}
function recordVisibilityChangeEvent(){
    txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " visibility change event.");
    if (document.visibilityState === 'hidden') {
        txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " visibility change event - hidden.");
        recordSessionEnd();
    }
    if (document.visibilityState === 'visible') {
        txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " visibility change event - visible.");
        recordSessionResume();
    }
    // if (document.visibilityState === 'prerender') {
    //     txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " visibility change event - prerender.");
    //     recordSessionEnd();
    // }
    if (document.visibilityState === 'unloaded') {
        // txtToServer("Session:- " + sessionStorage.getItem("sessionId") + " visibility change event - unloaded.");
        recordSessionEnd();
    }
}
function sendAnalyticsToServer(){
    const v_sessionId = sessionStorage.getItem("sessionId");
    const v_sessionStartDateTime = sessionStorage.getItem("sessionStartDateTime");
    const v_dateNow = new Date();
    const v_timeNow = v_dateNow.getHours() + ":" + v_dateNow.getMinutes() + ":" + v_dateNow.getSeconds();
    const v_timeStampString = timeStampString();
    const v_sessionSecondsAlive = sessionStorage.getItem("sessionSecondsAlive")*1;
    const v_sessionSecondsDuration = sessionStorage.getItem("sessionSecondsDuration")*1;
    const v_wheelRolls = sessionStorage.getItem("wheelRolls")*1;
    const v_navKeyPresses = sessionStorage.getItem("navKeyPresses")*1;
    const v_menuClicks = sessionStorage.getItem("menuClicks")*1;
    const v_menuClickHistory = sessionStorage.getItem("menuClickHistory");
    const v_clientOS = getClientOS();
    var v_browser =  window.navigator.userAgent + " | " + window.navigator.appName + " | " + window.navigator.appVersion + " | " + window.navigator.product;
    v_browser = v_browser.replace(/,/g,";");
    const v_analyticsData = JSON.stringify(
            {
            v_sessionId: v_sessionId,
            v_sessionStartDateTime: v_sessionStartDateTime,
            v_sessionSecondsAlive: Math.round(v_sessionSecondsAlive),
            v_sessionSecondsDuration: Math.round(v_sessionSecondsDuration),
            v_wheelRolls: v_wheelRolls,
            v_navKeyPresses: v_navKeyPresses,
            v_menuClicks: v_menuClicks,
            v_menuClickHistory: v_menuClickHistory,
            v_dateNow: v_dateNow.toLocaleDateString("en-AU"),
            v_timeNow: v_timeNow, 
            v_clientOS: v_clientOS,
            v_browser: v_browser,
            v_timeStampClient: v_timeStampString
            }
    );
    // PUT SEND BEACON IN IT'S OWN FUNCTION
        // let v_headers = {type: 'application/json'};
        // let blob = new Blob([v_analyticsData], v_headers);
        // navigator.sendBeacon('/logAnalytics_Beacon', blob);
    // PUT SEND BEACON IN IT'S OWN FUNCTION
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_analyticsData};
    fetch('/logAnalytics',v_options).then( (res) => {
        return;
    });
}
// SESSION STATISTICS RECORDING end -------------------------------------------------------------------------------