// const { Transform } = require("nodemailer/lib/xoauth2");

const v_clientOS="Windows";


function scrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    // console.log(height);
    // console.log(scrolled);
    document.getElementById("scroll-indicator").style.width = scrolled + "%";
    document.getElementById("vertical-scroll-indicator").style.height = scrolled + "%";
}
window.onscroll = function() {scrollIndicator()};
function doThisOnLoad(){
    parseRawCSV_TTevents();
    // return;
    let a = document.getElementsByClassName('i06-collapsable-button');
    let aArray = Array.from(a);
    aArray.forEach(e => {
        e.style.position = "fixed";
    });
    let b = document.getElementsByClassName('i06-collapsable-content');
    let bArray = Array.from(b);
    bArray.forEach(e => {
        e.style.display = "none";
    });
    document.getElementById("homeContent").style.display="grid";
    return;
}
function doThisPageHide(){
    return;
}
function ourYears(){
    var date = new Date();
    var year = date.getFullYear();
    var ourYears = year - 1974*1;
    let x = document.getElementsByClassName("ourYears");
    let xArray = Array.from(x);
    // console.log(xArray);
    xArray.forEach(element => {
        element.innerHTML = ourYears
    });
}
ourYears();
function slideOutMenu(){
    document.getElementById("nav-container").classList.toggle("nav-container-show");
    document.getElementById("nav-container").classList.toggle("nav-container-hide");
    // console.log(document.getElementById("nav-container").className);
    window.scrollTo(0,0);
}
function slideAwayMenu(){
    document.getElementById("nav-container").classList.toggle("nav-container-show");
    document.getElementById("nav-container").classList.toggle("nav-container-hide");
    // console.log(document.getElementById("nav-container").className);
    window.scrollTo(0,0);
}

// BUTTON PLACEMENT
function placeButtons(){
    let myButtons = document.getElementsByClassName("i06-collapsable-button");
    let myButtonsArray = Array.from(myButtons);
    myButtonsArray.forEach(element => {
        element.style.top = element.getAttribute("data-top") + "%";
        element.style.left = element.getAttribute("data-left") + "%";
    });
}
placeButtons();

// BUTTON PLACEMENT

// COLLAPSABLES start
function toggleCollapsables(buttonID){

    // document.getElementById("home-page-background").style.display="none";

    // window.scrollTo(0,0);
    document.getElementById("scroll-indicator").style.width = 0 + "%";
    document.getElementById("vertical-scroll-indicator").style.height = 0 + "%";

    // document.getElementById("nav-container").classList.toggle("nav-container-show");
    // document.getElementById("nav-container").classList.toggle("nav-container-hide");
    // // console.log(document.getElementById("nav-container").className);

    let contentID = buttonID + 'Content';
    // console.log(buttonID + " position:- " + document.getElementById(buttonID).style.position);
    // console.log(contentID + " display:- " + document.getElementById(contentID).style.display);
    let a = document.getElementsByClassName('i06-collapsable-button');
    let aArray = Array.from(a);
    aArray.forEach(e => {
        e.style.display = "none";
    });
    let b = document.getElementsByClassName('i06-collapsable-content');
    let bArray = Array.from(b);
    bArray.forEach(e => {
        e.style.display = "none";
        if(buttonID + 'Content' === e.id){
            e.style.display = "grid";
        }
        // console.log(e.id + " " + document.getElementById(e.id).style.display);
    });
    // if (document.getElementById(buttonID).style.position === "fixed"){
    //     console.log(contentID + " display:- " + document.getElementById(contentID).style.display);
    //     document.getElementById(buttonID).style.display = "block";
    //     document.getElementById(buttonID).style.position = "relative";
    //     // document.getElementById(buttonID).style.zIndex = "2000";
    //     document.getElementById(buttonID).style.top = "0";
    //     document.getElementById(buttonID).style.left = "0";
    //     // console.log(contentID + " " + document.getElementById(contentID).style);
    //     document.getElementById(contentID).style.display = "grid";
    //     window.scrollTop;
    //     alert("d")
    // }else{
    //     // window.location.reload();
        // window.scrollTop;
        // alert("e")
    // }
}
// COLLAPSABLES end

function currentYearSchedule(){
    var v_date = new Date();
    var v_year = v_date.getFullYear();
    // v_year=2020
    // if(v_clientOS=="Windows"){console.log(v_year);}
    var v_yearStart = new Date(v_year*1,0,1); /* 1 Jan yyyy*/
    var v_testDate = v_yearStart;
    var v_trottersMeetDate = v_yearStart;
    var v_trottersMeetDateString = new Date(v_yearStart).toLocaleDateString("en-AU");
    var v_initialOffsetDays = 0;
    var v_today = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var v_day = weekday[v_today.getDay()];
    var v_todayString = v_day + ', ' + v_today.toLocaleDateString("en-AU") ;
    var v_startDate = new Date();
    var v_endDate = new Date();
    var v_endDateLastWeek = v_startDate;
    // if(v_clientOS=="Windows"){console.log('v_today:- ',v_today,'\n\nv_todayString:- ',v_todayString,'\n\nv_startDate:- ',v_startDate,'\n\nv_endDate:- ',v_endDate);}
    // if(v_clientOS=="Windows"){console.log('v_today',v_today,'\nv_startDate',v_startDate,'\nv_endDate',v_endDate);}
//  find first Saturday
    for (i=0;i<27;i++){
        v_testDate = new Date(v_year*1,0,i+1) /* i starts at 0 */ 
        // if(v_clientOS=="Windows"){console.log('v_testDate:- ',v_testDate);}
        if (v_testDate.getDay()+1==7){ /* = 0 Sunday */
            v_trottersMeetDate = new Date(v_testDate);
            break;
        }
    }
    var v_html = ``;
    // v_html += `<h1>Current training schedule</h1>`;
    v_html += `<h2>Prep for the City-2-Surf</h2>`;
    v_html += `<table>`;
        v_html += `<tr>`;
            v_html += `<th class="table-simple">Start date</th>`;
            v_html += `<th class="table-simple">End date</th>`;
            v_html += `<th  class="table-simple">Course</th>`;
            v_html += `<th  class="table-simple">Repetitions</th>`;
            v_html += `<th  class="table-simple">Where are we now?</th>`;
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 2 January	6 February	8.6km	6 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate()));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                // if(v_clientOS=="Windows"){console.log('v_trottersMeetDate.getDate()+(7*(6-1)) :- ',v_trottersMeetDate.getDate()+(7*(6-1)-v_initialOffsetDays*0));}
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(6-1)-v_initialOffsetDays*0)));
                v_endDate = new Date(v_trottersMeetDate);
                // if(v_clientOS=="Windows"){console.log('v_trottersMeetDate:- ',v_trottersMeetDate);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
                // if(v_clientOS=="Windows"){console.log('v_trottersMeetDateString:- ',v_trottersMeetDateString);}
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">8.6km</td>`;
            v_html += `<td class="table-simple">6</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 13 February	20 March	10.2km	6 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(6-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">10.2km</td>`;
            v_html += `<td class="table-simple">6</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 27 March	1 May	12.0km	6 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(6-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">12.0km</td>`;
            v_html += `<td class="table-simple">6</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 8 May	19 June	14.0km	7 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(7-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">14.0km</td>`;
            v_html += `<td class="table-simple">7</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 26 June	31 July	15.1km	6 OR 7 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(7-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">15.1km</td>`;
            v_html += `<td class="table-simple">7</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 6 August	OR 13 August Mass start, pre- C2S	6.5km	1 time
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate()));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">6.5km</td>`;
            v_html += `<td class="table-simple">1</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 7 August	OR 14 August City to Surf (C2S)	14.0km	
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 1));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate()));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">14.0km</td>`;
            v_html += `<td class="table-simple">City-2-Surf</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 14 August	28 August	12.0km	3 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 6));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(3-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">12.0km</td>`;
            v_html += `<td class="table-simple">3</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 4 September	18 September	10.2km	3 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(3-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">10.2km</td>`;
            v_html += `<td class="table-simple">3</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 25 September	9 October	8.6km	3 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(3-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">8.6km</td>`;
            v_html += `<td class="table-simple">3</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 16 October	25 December	6.5km	11 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(11-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">6.5km</td>`;
            v_html += `<td class="table-simple">11</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
    v_html += `</table>`;

    document.getElementById('currentYearSchedule').innerHTML = v_html;

}
currentYearSchedule();

function timeToFutureDateTime(){
    const   v_second = 1000,
            v_minute = v_second * 60,
            v_hour = v_minute * 60,
            v_day = v_hour * 24;
    let dateTime = new Date();
    let thisYear = dateTime.getFullYear();

    // var v_futureDateTimeString = "Aug 13, 2023 07:30:00";
    var futureDateTimeString = `Aug 01, ${thisYear} 07:30:00`;
    // console.log(futureDateTimeString);

    var futureDateTime = new Date(futureDateTimeString);
    // console.log(dateTime);
    // console.log(dateTime.toDateString());
    // console.log(futureDateTime);
    // console.log(futureDateTime.toDateString());

    futureDateTime = new Date(futureDateTime.setDate(futureDateTime.getDate() + 6));
    if (futureDateTime.toDateString().slice(0,3) !== "Sun"){
        let i = 0;
        while (i < 10) {
            futureDateTime = new Date(futureDateTime.setDate(futureDateTime.getDate() + 1));
            if (futureDateTime.toDateString().slice(0,3) === "Sun"){
                // console.log(futureDateTime.toDateString().slice(0,3));
                // console.log(futureDateTime.toDateString());
                futureDateTimeString = new Date(futureDateTime);
                // console.log(futureDateTimeString);
                document.getElementById("c2sDate").innerText = futureDateTimeString; 
            }else{
                // console.log(futureDateTime.toDateString().slice(0,3));
            }
            i++;
        }
    }

    // console.log(v_futureDateTime);
    // do while 
    // v_futureDateTime = new Date(v_futureDateTimeString).setDate(v_futureDateTime.getDate());
    // console.log(v_futureDateTime.toLocaleDateString);
    // v_futureDateTime = new Date(v_futureDateTimeString).setDate(v_futureDateTime.getDate() + 1);
    // console.log(v_futureDateTime);

    futureDateTime = new Date(futureDateTimeString).getTime();
    // console.log(futureDateTime);
    var dateNow = new Date().getTime();
    var difference = futureDateTime - dateNow;
    document.getElementById("f_days").innerText = Math.floor(difference / v_day);
    document.getElementById("f_hours").innerText = Math.floor((difference % v_day) / v_hour);
    document.getElementById("f_minutes").innerText = Math.floor((difference % v_hour) / v_minute);
    document.getElementById("f_seconds").innerText = Math.floor((difference % v_minute) / v_second);
    // document.getElementById("f_futureDateTimeString").innerText = v_futureDateTimeString;
}
timeToFutureDateTime();

// PARSE TT-FAVOURITE-EVENTS start
async function parseRawCSV_TTevents(){
    const p_fileName = "tt_favourite_events.csv";
    if(v_clientOS=="Windows"){console.log(p_fileName);}
    v_csvTitlesArray = new Array ("Date(s)","Day(s)","Event Name","Distances","Comments","info as at","URL");
    // document.getElementById("tt-favourite-events-CSV-parsed-titles").innerHTML = '';
    // C:\fakepath\
    // const v_sourceFilePathAndName = `C:\\!netIT\\hosting\\sites\\tt\\resources\\${p_fileName}`;
    // const v_sourceFilePathAndName = `C:\\! NetITdevelopment\\hosting\\sites\\tt\\resources\\${p_fileName}`;
    const v_sourceFilePathAndName = "C:\\! NetITdevelopment\\hosting\\sites\\tt\\resources\\" + p_fileName;
    if(v_clientOS=="Windows"){console.log(v_sourceFilePathAndName);}
    var v_rowsArray = [];
    var v_columnsArray = [];
    // const v_data = JSON.stringify(
    const v_data = JSON.stringify(
        {
        v_filePathAndName: v_sourceFilePathAndName
        }
    );
    // const options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // const v_data = (document.getElementById("uberStatement_FilePathAndName").value).toString();
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(v_clientOS=="Windows"){console.log(JSON.stringify(options));}
    if(v_clientOS=="Windows"){console.log(options);}
    await fetch('/parseRawCSV_TTevents',options)
    .then(res => {
        return res.json();
    })
    .then(res_data => {
        if(v_clientOS=="Windows"){console.log('res_data.v_csvData:- LENGTH: ',res_data.v_csvData.length + `\n DATA: \n`,res_data.v_csvData);}
        v_csvTableArray = res_data.v_csvData;
        if(v_clientOS=="Windows"){console.log('v_csvTableArray:- ',v_csvTableArray.toString());}
        if(v_clientOS=="Windows"){console.log('document.getElementById("events-table"):- ',document.getElementById("csvTableArray"));}
        document.getElementById("events-table").innerText = v_csvTableArray.toString();
        v_csvTitlesArray = res_data.v_csvData[0].split(",");
        if(v_clientOS=="Windows"){console.log('v_csvTitlesArray:- LENGTH: ',v_csvTitlesArray.length + `\n DATA: \n`,v_csvTitlesArray);}
        v_html = `<table class="events-table"><tbody>`;
        for (i=0; i<v_csvTableArray.length;i++){
            v_csvRowArray = res_data.v_csvData[i].split(",");
            if (i===0){
                v_html += `<tr class="events-headings">`;
                for (i2=0; i2<v_csvRowArray.length; i2++){
                    v_html += `<th>` + v_csvRowArray[i2] + "</th>";
                }
                v_html += "</tr>";
            }else{
                v_html += `<tr class="events-row">`;
                for (i2=0; i2<v_csvRowArray.length; i2++){
                    if (i2===6){
                        v_html += `<td class="events-cell"><a href="${v_csvRowArray[i2]}" target="_blank" class="events-cell-link"><span class="material-symbols-outlined">link</span></a></td>`;
                    }else {
                        v_html += `<td class="events-cell">` + v_csvRowArray[i2] + `</td>`;
                    }
                }
                v_html += "</tr>";
            }
        }
        v_html += "</tbody></table>";
        document.getElementById("events-table").innerHTML = v_html;
    })
}
// PARSE TT-FAVOURITE-EVENTS end


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// OLD CODE STARTS HERE - OLD CODE STARTS HERE - OLD CODE STARTS HERE - OLD CODE STARTS HERE - OLD CODE STARTS HERE - OLD CODE STARTS HERE - OLD CODE STARTS HERE - 
function siteAccessPasswordPrompt(){
    if (localStorage.getItem("pwd")=="ok" | localStorage.getItem("pwd")=="ok-captions"){
    }else{
        const v_pw = prompt("please enter password to access web site","");
        if (v_pw==="tt1974"){
            localStorage.setItem("pwd","ok");
        }else if (v_pw==="tt1974captions"){
            localStorage.setItem("pwd","ok-captions");
        }else{
            localStorage.setItem("pwd","");
            window.location.href=("https://www.facebook.com/TurramurraTrotters/");
            alert("Password is incorrect but don't worry, you can check out our Facebook page.");
        }
    }
}
function resetPassword(){
    localStorage.setItem("pwd","");
    siteAccessPasswordPrompt();
}

function OLDcurrentYearScheduleOLD(){
    var v_date = new Date();
    var v_year = v_date.getFullYear();
    // v_year=2020
    // if(v_clientOS=="Windows"){console.log(v_year);}
    var v_yearStart = new Date(v_year*1,0,1); /* 1 Jan yyyy*/
    var v_testDate = v_yearStart;
    var v_trottersMeetDate = v_yearStart;
    var v_trottersMeetDateString = new Date(v_yearStart).toLocaleDateString("en-AU");
    var v_initialOffsetDays = 0;
    var v_today = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var v_day = weekday[v_today.getDay()];
    var v_todayString = v_day + ', ' + v_today.toLocaleDateString("en-AU") ;
    var v_startDate = new Date();
    var v_endDate = new Date();
    var v_endDateLastWeek = v_startDate;
    // if(v_clientOS=="Windows"){console.log('v_today:- ',v_today,'\n\nv_todayString:- ',v_todayString,'\n\nv_startDate:- ',v_startDate,'\n\nv_endDate:- ',v_endDate);}
    // if(v_clientOS=="Windows"){console.log('v_today',v_today,'\nv_startDate',v_startDate,'\nv_endDate',v_endDate);}
//  find first Saturday
    for (i=0;i<27;i++){
        v_testDate = new Date(v_year*1,0,i+1) /* i starts at 0 */ 
        // if(v_clientOS=="Windows"){console.log('v_testDate:- ',v_testDate);}
        if (v_testDate.getDay()+1==7){ /* = 0 Sunday */
            v_trottersMeetDate = new Date(v_testDate);
            break;
        }
    }
    var v_html = ``;
    v_html += `<h1>Current training schedule</h1>`;
    v_html += `<h2>Prep for the City-2-Surf</h2>`;
    v_html += `<table>`;
        v_html += `<tr>`;
            v_html += `<th class="table-simple">Start date</th>`;
            v_html += `<th class="table-simple">End date</th>`;
            v_html += `<th  class="table-simple">Course</th>`;
            v_html += `<th  class="table-simple">Repetitions</th>`;
            v_html += `<th  class="table-simple">Where are we now?</th>`;
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 2 January	6 February	8.6km	6 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate()));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                // if(v_clientOS=="Windows"){console.log('v_trottersMeetDate.getDate()+(7*(6-1)) :- ',v_trottersMeetDate.getDate()+(7*(6-1)-v_initialOffsetDays*0));}
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(6-1)-v_initialOffsetDays*0)));
                v_endDate = new Date(v_trottersMeetDate);
                // if(v_clientOS=="Windows"){console.log('v_trottersMeetDate:- ',v_trottersMeetDate);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
                // if(v_clientOS=="Windows"){console.log('v_trottersMeetDateString:- ',v_trottersMeetDateString);}
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">8.6km</td>`;
            v_html += `<td class="table-simple">6</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 13 February	20 March	10.2km	6 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(6-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">10.2km</td>`;
            v_html += `<td class="table-simple">6</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 27 March	1 May	12.0km	6 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(6-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">12.0km</td>`;
            v_html += `<td class="table-simple">6</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 8 May	19 June	14.0km	7 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(7-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">14.0km</td>`;
            v_html += `<td class="table-simple">7</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 26 June	31 July	15.1km	6 OR 7 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(7-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">15.1km</td>`;
            v_html += `<td class="table-simple">7</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 6 August	OR 13 August Mass start, pre- C2S	6.5km	1 time
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate()));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">6.5km</td>`;
            v_html += `<td class="table-simple">1</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 7 August	OR 14 August City to Surf (C2S)	14.0km	
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 1));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate()));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">14.0km</td>`;
            v_html += `<td class="table-simple">City-2-Surf</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 14 August	28 August	12.0km	3 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 6));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(3-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">12.0km</td>`;
            v_html += `<td class="table-simple">3</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 4 September	18 September	10.2km	3 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(3-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">10.2km</td>`;
            v_html += `<td class="table-simple">3</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 25 September	9 October	8.6km	3 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(3-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">8.6km</td>`;
            v_html += `<td class="table-simple">3</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
        v_html += `<tr>`;
            // 16 October	25 December	6.5km	11 times
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + 7));
                v_startDate = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_trottersMeetDate);
                v_endDateLastWeek = new Date(v_endDateLastWeek.setDate(v_endDateLastWeek.getDate()-7));
                // if(v_clientOS=="Windows"){console.log('v_startDate:- ',v_startDate,'v_endDateLastWeek:- ',v_endDateLastWeek);}
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
                v_trottersMeetDate = new Date(v_trottersMeetDate.setDate(v_trottersMeetDate.getDate() + (7*(11-1))));
                v_endDate = new Date(v_trottersMeetDate);
                v_trottersMeetDateString = new Date(v_trottersMeetDate).toLocaleDateString("en-AU");
            v_html += `<td class="table-simple">${v_trottersMeetDateString}</td>`;
            v_html += `<td class="table-simple">6.5km</td>`;
            v_html += `<td class="table-simple">11</td>`;
            if (v_endDateLastWeek < v_today && v_endDate >= v_today){v_html += `<td class="table-simple">${v_todayString}</td>`;}else{v_html += `<td class="table-simple"></td>`;}
        v_html += `</tr>`;
    v_html += `</table>`;

    document.getElementById('currentYearSchedule').innerHTML = v_html;

}

// function timeToFutureDateTime(){
//     const   v_second = 1000,
//             v_minute = v_second * 60,
//             v_hour = v_minute * 60,
//             v_day = v_hour * 24;
//     var v_futureDateTimeString = "Aug 13, 2023 07:30:00";
//     var v_futureDateTime = new Date(v_futureDateTimeString).getTime();
//     var v_now = new Date().getTime();
//     var v_difference = v_futureDateTime - v_now;
//     document.getElementById("f_days").innerText = Math.floor(v_difference / v_day);
//     document.getElementById("f_hours").innerText = Math.floor((v_difference % v_day) / v_hour);
//     document.getElementById("f_minutes").innerText = Math.floor((v_difference % v_hour) / v_minute);
//     document.getElementById("f_seconds").innerText = Math.floor((v_difference % v_minute) / v_second);
//     document.getElementById("f_futureDateTimeString").innerText = v_futureDateTimeString;
// }

// // COUNTDOWN TIMER start
// (function () {
//     const   second = 1000,
//             minute = second * 60,
//             hour = minute * 60,
//             day = hour * 24;
 
//     let countdownToDate = "Aug 8, 2021 07:30:00",
//     countDown = new Date(countdownToDate).getTime(),
//     x = setInterval(function () {
//         let now = new Date().getTime(),
//         distance = countDown - now;

//         (
//             document.getElementById("days").innerText = Math.floor(
//                 distance / day
//             )
//         ),
//         (
//             document.getElementById("hours").innerText = Math.floor(
//                 (distance % day) / hour
//             )
//         ),
//         (
//             document.getElementById("minutes").innerText = Math.floor(
//                 (distance % hour) / minute
//             )
//         ),
//         (
//             document.getElementById("seconds").innerText = Math.floor(
//                 (distance % minute) / second
//             )
//         );

//         //do something later when date is reached
//         if (distance < 0) {
//             let headline = document.getElementById("headline"),
//                 countdown = document.getElementById("countdown"),
//                 content = document.getElementById("content");

//             headline.innerText = "Countdown Date Reached!";
//             countdown.style.display = "none";
//             content.style.display = "block";

//             clearInterval(x);
//         }
//         //seconds
//     }, 0);
// })();
// // COUNTDOWN TIMER end

                // // With modern functions, we attach our callbacks to the returned promises instead, forming a promise chain:
                // doSomething()
                // .then(function(result) {
                // return doSomethingElse(result);
                // })
                // .then(function(newResult) {
                // return doThirdThing(newResult);
                // })
                // .then(function(finalResult) {
                // console.log('Got the final result: ' + finalResult);
                // })
                // .catch(failureCallback);
                // // The arguments to then are optional, and catch(failureCallback) is short for then(null, failureCallback). You might see this expressed with arrow functions instead:
                // doSomething()
                // .then(result => doSomethingElse(result))
                // .then(newResult => doThirdThing(newResult))
                // .then(finalResult => {
                // console.log(`Got the final result: ${finalResult}`);
                // })
                // .catch(failureCallback);
                // // Important: Always return results, otherwise callbacks won't catch the result of a previous promise (with arrow functions () => x is short for () => { return x; }).


                // // Chaining after a catch
                // // It's possible to chain after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain. Read the following example:
                // new Promise((resolve, reject) => {
                //     console.log('Initial');
                //     resolve();
                // })
                // .then(() => {
                //     throw new Error('Something failed');
                //     console.log('Do this');
                // })
                // .catch(() => {
                //     console.error('Do that');
                // })
                // .then(() => {
                //     console.log('Do this, no matter what happened before');
                // });
                // // This will output the following text:
                // // Initial
                // // Do that
                // // Do this, no matter what happened before
                // // Note: The text Do this is not displayed because the Something failed error caused a rejection.

// PACE CALCULATOR start
function updatePaceCalc(){
    var v_distance = document.getElementById("f_distance").value*1;
    var v_hours = document.getElementById("f_hours").value*1;
    var v_minutes = document.getElementById("f_minutes").value*1;
    var v_seconds = document.getElementById("f_seconds").value*1;
    var v_time = (v_hours * 60) + v_minutes + (v_seconds / 60);
    var v_pace = v_time/v_distance*1000;
    var v_paceInt = parseInt(v_pace);
    var v_paceMod = (60 * (v_pace - v_paceInt)).toFixed(0);
    // pace = time / distance
    document.getElementById("f_pace").value = v_paceInt + ":" + v_paceMod;
}
// PACE CALCULATOR end

// // PARSE TT-FAVOURITE-EVENTS start
// // STEP 1 OF 2
// async function parseRawCSV_TTevents_Step1(){
//     var p_fileName = "tt_favourite_events.csv";
//     if(v_clientOS=="Windows"){console.log(p_fileName);}
//     v_csvTitlesArray = new Array ("Date(s)","Day(s)","Event Name","Distances","Comments","info as at","URL");
//     document.getElementById("tt-favourite-events-CSV-parsed-titles").innerHTML = '';
//     // C:\fakepath\
//     const v_sourceFilePathAndName = `C:\\!netITdevelopment\\hosting\\sites\\tt\\resources\\${p_fileName}`;
//     // const v_sourceFilePathAndName = `C:\\!netIT\\hosting\\sites\\tt\\resources\\${p_fileName}`;
//     if(v_clientOS=="Windows"){console.log(v_sourceFilePathAndName);}
//     var v_rowsArray = [];
//     var v_columnsArray = [];
//     const v_data = JSON.stringify(
//         {
//         // v_filePathAndName: document.getElementById("uberStatement_FilePathAndName").value
//         v_filePathAndName: v_sourceFilePathAndName
//         }
//     );
//     // const options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
//     // const v_data = (document.getElementById("uberStatement_FilePathAndName").value).toString();
//     const options = {method: 'POST', headers: {'Content-Type': 'text/plain'},body: v_data};
//     if(v_clientOS=="Windows"){console.log(JSON.stringify(options));}
//     await fetch('/parseRawCSV_TTevents',options).then(res => {
//         return res.json();
//     })
//     .then(res_data => {
//         if(v_clientOS=="Windows"){console.log('res_data.v_csvData:- LENGTH: ',res_data.v_csvData.length + `\n DATA: \n`,res_data.v_csvData);}
//         v_csvTableArray = res_data.v_csvData;
//         // document.getElementById("v_csvTableArray").value = res_data.v_csvData;
//         v_csvTitlesArray = res_data.v_csvData[0].split(",");
//         if(v_clientOS=="Windows"){console.log('v_csvTitlesArray:- LENGTH: ',v_csvTitlesArray.length + `\n DATA: \n`,v_csvTitlesArray);}
//         // return v_csvTableArray,v_csvTitlesArray;
//         var v_mappedFieldName = '';
//         v_html = ``;
//         v_html += `<form>`;
//             for (i=0;i<v_csvTitlesArray.length;i++){
//                 v_html += `<label for="frm_mappedTitle${i}">Column title:-<span style="color: brown">${v_csvTitlesArray[i]}</span></label>`;
//                     // v_html += `<input list="list_mappedTitles" name="frm_mappedTitle${i}" id="frm_mappedTitle${i}"`;
//                         // v_html += `<datalist id="list_mappedTitles">`;
//                         // v_html += `</datalist>`;
//                 v_mappedFieldName = '';
//                 for (i2=0;i2<v_mappedTitlesArray.length;i2++){
//                     // if (v_mappedTitlesArray[i2] == v_csvTitlesArray[i]){
//                     if ( v_csvTitlesArray[i].includes(v_mappedTitlesArray[i2]) > 0 ) {
//                         v_mappedFieldName = v_mappedFieldsArray[i2];
//                     }
//                 }
//                 v_html += `<label for="frm_mappedField${i}">- mapped to field name:-<span style="color: brown;">${v_mappedFieldName}</span></label>`;
//                     // v_html += `<input list="list_mappedFields" name="frm_mappedField${i}" id="frm_mappedField${i}" style="color:blue" onfocus="popDataListOptions(this.id)" onchange="updateMapping(this.id)">`;
//                     // v_html += `<datalist id="list_mappedFields">`;
//                     // v_html += `</datalist>`;
//                     v_html += `<input name="frm_mappedField${i}" id="frm_mappedField${i}" style="color:blue" value=${v_csvTitlesArray[i]}><br>`;
//                 }
//         v_html += `</form>`;
//         document.getElementById("tt-favourite-events-CSV-parsed-titles").innerHTML = (v_html);
//         // document.getElementById("tt-favourite-events-CSV-parsed").style="display: inline; color:brown;";
//     })
//     .then(() => {
//         parseStatement_Step2();
//     })
// }
// parseRawCSV_TTevents_Step1();
// // STEP 2 OF 2
// async function parseStatement_Step2(){
//     var v_html = ``;
//     v_html += `<h1>Events popular with Trotters</h1>`;
//     v_html += `<h2>events that you are most likely to see Trotters attending</h2>`;
//     v_html += `<table id="uberStatementMapped" style="text-align: left">`;
//     // v_html += `<tr>`;
//     // v_html += `<th>events that you are most likely to see Trotters attending</th>`;
//     // v_html += `</tr>`;
//     // for ( i = 0; i < v_csvTableArray.length; i++){
//     //     v_html += `<tr>`;
//     //     v_html += `<td id="${v_csvTableArray[i]}">${v_csvTableArray[i]}</td>`;
//     //     v_html += `</tr>`;
//     // }
//     // v_html += `</table><br>`;
//     // v_html += `<br>`;
//     // UBER STATEMENT DATA - PARSED AND MAPPED
//     var v_rowTitlesArray = [];
//     var v_rowDataArray = [];
//     v_rowTitlesArray = v_csvTableArray[0].split(",");
//     // if(v_clientOS=="Windows"){console.log(v_rowTitlesArray);}
//     var v_matched = 0;
//     for ( i = 0; i < v_rowTitlesArray.length-1; i++){
//         v_matched = 0;
//         for ( iCSV = 0; iCSV < v_mappedTableArray.length; iCSV++ ){
//             if ( v_rowTitlesArray[i].includes(v_mappedTableArray[iCSV].f_columnHeading) > 0 ) {
//                 v_matched++;
//                 v_rowTitlesArray[i] = v_mappedTableArray[iCSV].f_columnHeading;
//             }
//             if(v_clientOS=="Windows"){console.log(v_rowTitlesArray[i],v_matched,v_mappedTableArray[iCSV].f_columnHeading);}
//         }
//         // if(v_clientOS=="Windows"){console.log('v_rowTitlesArray:- ',i,"|" + v_rowTitlesArray[i] + "|",v_matched,v_mappedTableArray.length);}
//     }
//     var v_mappedFieldName = "";
//     v_html += `<table id="uberStatementParsed" style="text-align: left">`;
//     v_html += `<tr>`;
//     for ( i = 0; i < v_csvTitlesArray.length-1; i++){
//         // v_mappedFieldName = "";
//         // for (iMAP=0;iMAP<v_mappedTitlesArray.length;iMAP++){
//         //     if ( v_csvTitlesArray[i].includes(v_mappedTitlesArray[iMAP]) > 0 ) {
//         //         v_mappedFieldName = v_mappedFieldsArray[iMAP];
//         //     }
//         // }
//         v_mappedFieldName = v_rowTitlesArray[i];
//         // if(v_clientOS=="Windows"){console.log(i,v_rowTitlesArray[i],v_mappedFieldName);}
//         v_html += `<th class="table-simple">${v_mappedFieldName}</th>`;
//     }
//     v_html += `</tr>`;
//     v_html += `<tr>`;
//     // allows comparison to mapped titles START
//     // for ( i = 0; i < v_csvTitlesArray.length; i++){
//     //     v_html += `<td>${v_rowTitlesArray[i]}</td>`;
//     // }
//     // v_html += `</tr>`;
//     // allows comparison to mapped titles END
//     // 
//     for ( iRow = 1; iRow < v_csvTableArray.length; iRow++){
//         if ( v_csvTableArray[iRow].length > 0 ) {
//             // if(v_clientOS=="Windows"){console.log('row:- ',iRow,v_csvTableArray[iRow]);}
//             v_html += `<tr>`;
//             v_csvTableArray[iRow] = v_csvTableArray[iRow].replace(/-A\$/g,"");
//             v_csvTableArray[iRow] = v_csvTableArray[iRow].replace(/A\$/g,"");
//             v_rowDataArray = v_csvTableArray[iRow].split(',');
//             if (v_rowDataArray.length != v_rowTitlesArray.length) {
//                 alert(iRow + ":- " + v_rowDataArray.length + " <> " + v_rowTitlesArray.length);
//                 // if(v_clientOS=="Windows"){console.log(iRow + ":- " + v_rowDataArray.length + " <> " + v_rowTitlesArray.length);}
//             } else {
//                 // for ( i = 0; i < v_csvTitlesArray.length; i++){
//                 for ( iCol = 0; iCol < v_rowDataArray.length-1; iCol++){
//                     // if(v_clientOS=="Windows"){console.log('column:- ',iCol,v_rowDataArray[iCol]);}
//                     if ( v_rowDataArray[iCol].length > 0 ){
//                         // v_html += `<td>${v_rowDataArray[iCol]}</td>`;
//                         // v_html += `<td class="table-simple">${v_rowDataArray[iCol].replace(/\"/,"")}</td>`;
//                         if (iCol==2){
//                             // if (typeof v_rowDataArray[5] === "undefined"){
//                             if ( v_rowDataArray[6].length > 3 ){
//                                     v_html += `<td class="table-simple" style="text-align:left" ><a href="${v_rowDataArray[6]}" target="_blank">${v_rowDataArray[iCol].replace(/\"/,"")}</a></td>`;
//                                 } else {
//                                     v_html += `<td class="table-simple" style="text-align:left" >${v_rowDataArray[iCol]}</td>`;
//                                 }
//                         } else {
//                             // v_html += `<td class="table-simple" style="text-align:left" >${v_rowDataArray[iCol].replace(/\"/,"")}</td>`;
//                             v_html += `<td class="table-simple" style="text-align:left" >${v_rowDataArray[iCol]}</td>`;
//                         }
//                     } else {
//                         v_html += `<td class="table-simple" style="text-align:left" ></td>`;
//                         // alert("sfsd");
//                     }
//                 }
//                 v_html += `</tr>`;
//             }
//         }
//     }
//     v_html += `</table>`;
//     v_html += `<br>`;
//     document.getElementById("tt-favourite-events-CSV-parsed-table").innerHTML = (v_html);
//     // if(v_clientOS=="Windows"){console.log(v_html);}
// }
// // PARSE TT-FAVOURITE-EVENTS end

function getClientOS() {
    // returns i)@ | Windows | Android
    const isIOS = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
        ].indexOf(navigator.platform) !== -1;
    const isWindows = [
        'Win32'
        ].indexOf(navigator.platform) !== -1;
    const isAndroid = [
        'Linux armv8l'
        ].indexOf(navigator.platform) !== -1;
    // alert('navigator.platform:- '+navigator.platform); 
    // /* DETECTS "iPhone" on an iPhone using: Edge; Safari; Chrome */
    // /* DETECTS "Macintel" on an iPad using: Safari;  */
    // /* DETECTS "iPad" on an iPad using: Chrome;  */
    // /* DETECTS "Win32" on Windows10Pro using: Edge; Chrome; Mozilla */
    // /* DETECTS "Linux armv8l" on Android11 Nokia3.4 using: Chrome; */
    // /* DETECTS "Linux aarch64"  on Android11 Nokia3.4 using: Edge; */
    // alert('navigator.userAgent:- '+navigator.userAgent);
    // /* DETECTS "iPhone" on an iPhone using: Edge; Safari; Chrome */
    // /* DETECTS "Macintosh" on an iPad using: Safari;  */
    // /* DETECTS "iPad" on an iPad using: Chrome;  */
    // /* DETECTS "Windows NT 10" on Windows10Pro using: Edge; Chrome; Mozilla */
    // /* DETECTS "Linux; Android 10" on Android11 Nokia3.4 using: Edge; Chrome; */
    // alert('navigator.vendor:- '+navigator.vendor); 
    // /* DETECTS "Apple Computer, Inc." on an iPhone using: Edge; Safari; Chrome */
    // /* DETECTS "Apple Computer, Inc." on an iPad using: Safari; Chrome; */
    // /* DETECTS "Google Inc." on Windows10Pro using: Edge; Chrome */
    // /* DETECTS "Google Inc." on Android11 Nokia3.4 using: Edge; Chrome; */
        if (isIOS==true) {return 'iOS';}
        if (isWindows==true) {return 'Windows';}
        if (isAndroid==true) { return 'Android';}
}
function txtToServer(p_txt){
    const v_data = JSON.stringify(
        {
        v_txt: p_txt
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    fetch('/txtFromClient',v_options).then( (res) => {
        return;
    });
}


    // BOUNCE IMAGE AROUND VIEWPORT start
    var v_speedH = 1;
    var v_speedV = 1;
    function bounceImageAroundViewport(){
        const v_image = document.getElementById('bounceAroundViewportImage');
        var v_top = v_image.style.top.replace('px','')*1;
        var v_left = v_image.style.left.replace('px','')*1;
        // if(v_clientOS=="Windows"){console.log(v_top ,v_left);}
        if (v_top <= 0){
            v_speedV = 1;
        }
        if (v_left <= 0){
            v_speedH = 1;
        }
        if (v_top + v_image.height >= window.innerHeight){
            v_speedV = -1;
        }
        if (v_left + v_image.width >= window.innerWidth){
            v_speedH = -1;
        }
        v_image.style.top = (v_image.style.top.replace('px','')*1 + v_speedV) + 'px';
        v_image.style.left = (v_image.style.left.replace('px','')*1 + v_speedH) + 'px';
        // if(v_clientOS=="Windows"){console.log(v_image.style.top + ' (' + window.innerHeight + ')',v_image.style.left + ' (' + window.innerWidth + ')');}
    }
    function stopAnimation(p_id){
        if (p_id=='bounceAroundViewportImage'){
            document.getElementById('bounceAroundViewportImage').style.display="none";
            clearInterval(v_interval);
            setTimeout(function() {
                // the code in here will run some time in the future
                // bounceImageAroundViewport();
                // document.getElementById('bounceAroundViewportImage').style.top=Math.round(window.innerHeight/2) + 'px';
                // document.getElementById('bounceAroundViewportImage').style.left=Math.round(window.innerWidth/2) + 'px';
                document.getElementById('bounceAroundViewportImage').style.display="block";
                v_interval = setInterval('bounceImageAroundViewport()', 10); // 1000 = every second
            }, 5000*2);
        }
    }
    // BOUNCE IMAGE AROUND VIEWPORT end
