var a_consolidatedTable = [];
// PARSE site-name...-analytics.csv START
async function parseAnalyticsCSV_Step1(){
    var p_fileName = "turramurra-trotters-analytics.csv";
    // v_csvTitlesArray = new Array ("Date","Time","Analytic description","Analytic value");
    const v_sourceFilePathAndName = `C:\\netIT\\hosting\\SiteStatistics\\${p_fileName}`;
    console.log(v_sourceFilePathAndName);
    const v_data = JSON.stringify(
        {
            v_filePathAndName: v_sourceFilePathAndName
        }
    );
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // console.log(JSON.stringify(options));
    await fetch('/parseAnalyticsCSV',options)
    .then(res => {
        return res.json();
   })
    .then(res_data => {

        // // EXTRACT headers / column titles START
        // v_csvTitlesArray = res_data.v_csvData[0].split(",");
        // // console.log(v_csvTitlesArray);
        // // EXTRACT headers / column titles END

        // PARSE row data START
            // console.log("res_data.v_csvData.length:- ",res_data.v_csvData.length);
            // console.log("res_data.v_csvData:- ",res_data.v_csvData);
            // var myArray = res_data.v_csvData.replace(/[\r]/g, "" );
            var myArray2 = [];
            var str = "";
            for ( i0 = 0; i0 < res_data.v_csvData.length-1; i0++ ){
                // res_data.v_csvData[i0].replace( /[\r\n]+/gm, "" );
                // myArray1 = res_data.v_csvData[i0].replace(/\r/gm,"");
                myArray2 = res_data.v_csvData[i0].split(",");
                str = myArray2[5].replace(/\r/,"");
                v_csvTableArray.push([myArray2[0],myArray2[1],myArray2[2],myArray2[3],myArray2[4],str]);
            }
            // console.log("v_csvTableArray.length:- ",v_csvTableArray.length);
            // console.log("v_csvTableArray:- ",v_csvTableArray);
        // PARSE row data END

        // CONSOLIDATE "Session cumulative seconds alive" into START
            var v_csvTableArrayCopy = v_csvTableArray;
            var v_csvTableArrayOriginalItems = [];
            var v_csvTableArrayConsolidatedItems = [];
            var v_sessionId = "";
            var v_sessionIdAliveMax = 0;
            var v_analyticDescription = "";
            var v_itemMaster = [];
            var v_itemCopy = [];
            var v_found = false;
            // console.log("v_found:- ",v_found);
            for ( i1 = 0; i1 < v_csvTableArray.length; i1++ ){
                v_itemMaster = v_csvTableArray[i1];
                // console.log(v_csvTableArray[i1][2]);
                v_analyticDescription = v_csvTableArray[i1][3];
                // console.log(i1,v_analyticDescription);
                // if ( v_analyticDescription.includes("Session cumulative seconds alive") > 0 ) {
                if ( v_analyticDescription == "Session cumulative seconds alive" ) {
                    v_sessionId = v_csvTableArray[i1][2];
                    // console.log("v_sessionId:- " + v_sessionId);
                    v_sessionIdAliveMax = 0;
                    for ( i2 = 0; i2 < v_csvTableArrayCopy.length; i2++ ){
                        v_itemCopy = v_csvTableArrayCopy[i2];
                        if (v_itemCopy[2] == v_sessionId && v_itemCopy[2] != null) {
                            // console.log(v_itemCopy[2] + " == " + v_sessionId);
                            if (v_itemCopy[3] == "Session cumulative seconds alive") {
                                if (v_sessionIdAliveMax <  ( v_itemCopy[4] * 1 )){
                                    v_sessionIdAliveMax = Math.round(( v_itemCopy[4] * 1 / 60 ),0);
                                }
                            }
                        }
                    }
                    v_found = false;
                    for(var i3 = 0; i3 < v_csvTableArrayConsolidatedItems.length; i3++) {
                        if (v_csvTableArrayConsolidatedItems[i3][2] == v_sessionId) {
                            // console.log(v_csvTableArrayConsolidatedItems[i3][2] + " == " + v_sessionId);
                            v_found = true;
                            // console.log("v_found:- ",v_found);
                            break;
                        }
                    }
                    // if (v_found == false && v_sessionId != null){
                    if (v_found == false && v_itemMaster[2] != "null"){
                        // console.log("v_found???:- ",v_found,v_sessionId);
                        v_csvTableArrayConsolidatedItems.push([v_itemMaster[0],v_itemMaster[1],v_itemMaster[2],"Session cumulative minutes alive",v_sessionIdAliveMax,timeStampString()]);
                        // console.log([v_itemMaster[0],v_itemMaster[1],v_itemMaster[2],"Session cumulative minutes alive",v_sessionIdAliveMax,timeStampString()]);
                    }
                } else {
                    if (v_itemMaster[2] != "null"){
                        v_csvTableArrayOriginalItems.push(v_csvTableArray[i1])
                    }
                }
            }
            // console.log(v_csvTableArrayOriginalItems);
            // console.log(v_csvTableArrayConsolidatedItems);
            a_consolidatedTable = v_csvTableArrayOriginalItems.concat(v_csvTableArrayConsolidatedItems);
            console.log("a_consolidatedTable:- ",a_consolidatedTable);
        // CONSOLIDATE "cumulative seconds alive" END
    })
    .then(() => {
        // a_consolidatedTable.sort( function(a, b) {
        //     return (a[0] - b[0]) || (a[1] - b[1]);
        // });
        // v_sortedArray = a_consolidatedTable.sort( function(a, b) {
        //     return ( a[2] - b[2] );
        // });
        var v_tempColItemDate
        var v_tempColItemTime
        for (i=0;i<a_consolidatedTable.length;i++){
            v_tempColItemDate = a_consolidatedTable[i][0];
            v_tempColItemTime = a_consolidatedTable[i][1];
            a_consolidatedTable[i][0] = a_consolidatedTable[i][2] + a_consolidatedTable[i][5];
            a_consolidatedTable[i][1] = v_tempColItemDate;
            a_consolidatedTable[i][2] = v_tempColItemTime;
        }
        v_sortedArray = a_consolidatedTable.sort();
        // v_sortedArray = v_sortedArray.reverse();
    // v_sortedArray = a_consolidatedTable.sort();
        // a_consolidatedTable.sort();
        // arr = arr.sort(function(a,b) {
        //     return a[1] - b[1];
        // });
        // a_consolidatedTable = a_consolidatedTable.sort(function(a,b) {a[2] - b[2];});
        v_html = ``;
        v_html += `<table>`;
        v_html += `<tr>`;
        v_html += `<th class="table-simple" style="xdisplay:none">Session ID + Now</th>`;
        v_html += `<th class="table-simple">Date</th>`;
        v_html += `<th class="table-simple">Time</th>`;
        v_html += `<th class="table-simple">Analytic</th>`;
        v_html += `<th class="table-simple">Value</th>`;
        v_html += `<th class="table-simple" style="display:none">Time Stamp</th>`;
        v_html += `</tr>`;
        for (i=0;i<v_sortedArray.length;i++){
            if (v_sortedArray[i][0] == "Date" || v_sortedArray[i][0] == "SessionIdTimeStamp"){
            } else {
                v_html += `<tr>`;
                v_html += `<td class="table-simple" style="xdisplay:none">${v_sortedArray[i][0]}</td>`;
                v_html += `<td class="table-simple">${v_sortedArray[i][1]}</td>`;
                v_html += `<td class="table-simple">${v_sortedArray[i][2]}</td>`;
                v_html += `<td class="table-simple">${v_sortedArray[i][3]}</td>`;
                v_html += `<td class="table-simple">${v_sortedArray[i][4]}</td>`;
                v_html += `<td class="table-simple" style="display:none">${v_sortedArray[i][5]}</td>`;
                v_html += `</tr>`;
            }
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
        // console.log("v_timeStampString:- ",v_timeStampString);
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
    var a_currentMonthDates_data = [];
    var v_dayStr = "";
    var v_monthStr = v_month;
    var v_withinonthDate;
    var v_currentMonthDates = [];
    var JSONstring = `{"dates":[]}`;
    var JSONobject = JSON.parse(JSONstring);
    // '{"characters":[{"name":"Tommy Vercetti","location":"Vice City"},{"name":"Carl Johnson","location":"Grove Street"},{"name":"Niko Bellic","location":"Liberty City"}]}'
    // j_currentMonthDates = JSON.parse(v_currentMonthDates);
    // console.log(j_currentMonthDates);
    if ( v_monthStr * 1 < 10 ){v_monthStr = "0" + v_monthStr;}
    for (x = 0; x < 31; x++){
        v_withinonthDate = new Date(v_year,v_month-1,v_monthStartDate.getDate()+x);
        if (v_withinonthDate.getMonth()+1 == v_month){
            // console.log(v_withinonthDate);
            v_dayStr = x + 1;
            if ( v_dayStr * 1 < 10 ) {v_dayStr = "0" + v_dayStr;}
            a_currentMonthDates.push([v_withinonthDate.getFullYear()+v_monthStr+v_dayStr]);
            a_currentMonthDates[x].push(0);
            a_currentMonthDates[x].push(0);
            // JSONobject = JSON.parse(JSONstring);
            JSONobject["dates"].push(`{"date":"${v_withinonthDate.getFullYear()+v_monthStr+v_dayStr}","sessionCount":0}`);
            // JSONstring = JSON.stringify(JSONobject);
            // j_currentMonthDates.push("date:" + v_withinonthDate.getFullYear()+v_monthStr+v_dayStr)
            // // a_currentMonthDates_data["sessionCount"] = 0;
            // // a_currentMonthDates.push(a_currentMonthDates_data);
            // // // j_currentMonthDates[x] = a_currentMonthDates[x] + `:{"sessionCount":0}`;
        }
    }
    console.log(a_currentMonthDates);
    // console.log(j_currentMonthDates);
    console.log(JSON.stringify(JSONobject));

    // COUNT SESSIONS start
    var v_matchedDate;
    for (i1 = 0; i1 < a_consolidatedTable.length; i1++){
        v_countSessionsStarted = 0;
        for ( i2 = 0; i2 < a_currentMonthDates.length; i2++){
            // console.log(a_consolidatedTable[i1][0].slice(2,10),a_currentMonthDates[i2]);
            if ( a_consolidatedTable[i1][0].slice(2,10)*1 == a_currentMonthDates[i2]*1 && a_consolidatedTable[i1][3] == "Session started" ){
                console.log(a_consolidatedTable[i1][3],a_consolidatedTable[i1][0].slice(2,10),a_currentMonthDates[i2]);
                console.log("matched");
                v_countSessionsStarted += 1;
                v_matchedDate = a_currentMonthDates[i2];
                // JSONobject["dates"]["date":]["sessionCount"] += 1;
                // j_currentMonthDates[i2].sessionCount += 1;
                // console.log(j_currentMonthDates[i2].sessionCount);
            }
        }
        console.log(v_countSessionsStarted);
    }
    // console.log(j_currentMonthDates);
    console.log(JSON.stringify(JSONobject));
    console.log(a_consolidatedTable);
    // var a_countSessions = a_consolidatedTable.map(function countSessions(a_consolidatedTable,v_month)
    // function countSessions(a,v_month){
    //     for (i = 0; i < a_consolidatedTable.length; i++){
            
    //     }
    // }
    // COUNT SESSIONS end



    var v_yearStart = new Date(v_year*1,0,1); /* 1 Jan yyyy*/
    var v_testDate = v_yearStart;
    var v_trottersMeetDate = v_yearStart;
    var v_trottersMeetDateString = new Date(v_yearStart).toLocaleDateString("en-AU");
    var v_initialOffsetDays = 0;
    var v_today = new Date();
    var weekday = new Array(7);
    weekday[1] = "Sun";
    weekday[2] = "Mon";
    weekday[3] = "Tue";
    weekday[4] = "Wed";
    weekday[5] = "Thu";
    weekday[6] = "Fri";
    weekday[7] = "Sat";
    var v_day = weekday[v_today.getDay()+1];
    var v_todayString = v_day + ', ' + v_today.toLocaleDateString("en-AU") ;
    var v_startDate = new Date();
    var v_endDate = new Date();
    console.log('v_today',v_today,'\nv_startDate',v_startDate,'\nv_endDate',v_endDate)

}