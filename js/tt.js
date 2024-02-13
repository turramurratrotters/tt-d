// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- word wrap toggle Alt + z -->

// if(document.readyState === "complete") {
//     // Fully loaded!
// }
// else if(document.readyState === "interactive") {
//     // DOM ready! Images, frames, and other subresources are still downloading.
// }
// else {
//     // Loading still in progress.
//     // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.

//     window.addEventListener("DOMContentLoaded", () => {
//         // DOM ready! Images, frames, and other subresources are still downloading.
//     });

    window.addEventListener("load", () => {
        // Fully loaded!

        const datval_city2SurfDate = document.getElementById("futureDate");

        // detect City-2-Surf date change
        datval_city2SurfDate.addEventListener("change", (event) => {
            city2SurfDateChange();
        });
    
    });
// }

// console.log(window.innerWidth);
// console.log(window.innerHeight);
// document.getElementById("bodyElement").innerText = window.innerWidth + " x " + window.innerHeight;
// document.getElementById("headerElement").innerText = window.innerWidth + " x " + window.innerHeight;
// document.getElementById("mainElement").innerText = window.innerWidth + " x " + window.innerHeight;

// Get the root element
var r = document.querySelector(':root');
// Create a function for getting a variable value
function myFunction_get() {
    // Get the styles (properties and values) for the root
        var rs = getComputedStyle(r);
    // Alert the value of the --blue variable
        alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
}
// Create a function for setting a variable value
function myFunction_set(){
    // Set the value of variable --blue to another value (in this case "lightblue")
        // r.style.setProperty('--blue', 'lightblue');
        r.style.setProperty('--device_innerWidth', ( window.innerWidth * .95 ) + "px");
        r.style.setProperty('--device_innerHeight', ( window.innerHeight * .95 ) + "px");
        // r.style.setProperty('--device_innerWidth', ( window.innerWidth * 1.0 ) + "px");
        // r.style.setProperty('--device_innerHeight', ( window.innerHeight * 1.0 ) + "px");
}
myFunction_set();

function calcStats(){
    xMinutes = document.getElementById("xMinutes").value * 1;
    xSeconds = document.getElementById("xSeconds").value * 1;
    xDistance = document.getElementById("xDistance").value * 1;
    let vHTML = ``;
    vHTML += `Run Statistics<br>`;
    // vHTML += `Pace ${(document.getElementById("xMinutes").value + (document.getElementById("xSeconds").value/60))/document.getElementById("xDistance").value*1000}`;
    vHTML += `<div>Pace ${((xMinutes + (xSeconds/60))/xDistance*1000).toFixed(4)}</div>`;
    document.getElementById("runStats").innerHTML = vHTML;
    console.log(vHTML);
}

// city2SurfDateChange START
function city2SurfDateChange(){

    var d1 = new Date();
    // var d2 = document.getElementById("city2SurfDate").value;
    var d2 = document.getElementById("futureDate").value;

    // console.log("d2 ",d2);
    var nDays = (Date.UTC(d2.slice(0,4), d2.slice(5,7)*1-1, d2.slice(8,10)) -
                 Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())) / 86400000;
                //  console.log("UTC calc date diff ",nDays);
    d2 = d2.slice(0,4)+ "-" + d2.slice(5,7)+ "-" + d2.slice(8,10);

    d1Year = d1.getFullYear();
    d1Month = d1.getMonth() + 1;
    if (d1Month < 10){d1Month="0" + d1Month};
    d1Day = d1.getDate();
    if (d1Day < 10){d1Day="0" + d1Day};
    d1 = d1Year + "-" + d1Month + "-" + d1Day;
    // console.log("d1 ",d1);

    document.getElementById("daysCount").innerHTML = daysDiff(d1,d2);

}
// city2SurfDateChange END

// daysDiff START
function daysDiff(d1,d2){

    const date1 = new Date(d1.slice(0,4), ((d1.slice(5,7)*1)-1), d1.slice(8,10));
    // console.log(date1.toDateString());
    const date2 = new Date(d2.slice(0,4), ((d2.slice(5,7)*1)-1), d2.slice(8,10));
    // console.log(date2.toDateString());

    // The number of milliseconds in one day
   const ONE_DAY = 1000 * 60 * 60 * 24;

   // Calculate the difference in milliseconds
   const differenceMs = Math.abs(date1 - date2);

   // Convert back to days and return
//    console.log(Math.round(differenceMs / ONE_DAY));
   return Math.round(differenceMs / ONE_DAY);
}
// daysDiff END

function getFutureDate(){
    var myDate = new Date();
    var myYear = myDate.getFullYear();
    var myFutureDate = new Date(myYear*1,7,1); /* 1 Jan yyyy*/
    var myTestDate = myFutureDate;
    var myCount = 0;
    var myMonth = 0;
    for (i=0;i<27;i++){
        myTestDate = new Date(myYear*1,7,i+1) /* i starts at 0 */ 
        // console.log(myTestDate);
        if (myTestDate.getDay()+1==1){ /* = 0 Sunday */
            myCount += 1;
            if (myCount===2){
                myMonth = ((myTestDate.getMonth()*1)+1);
                if (myMonth<10){myMonth = "0" + myMonth;}
                const myFutureDate = myTestDate.getFullYear() + "-" + myMonth + "-" + myTestDate.getDate();
                // console.log(myFutureDate);
                return myFutureDate;
            }
        }
    }
}
function getDaysToFutureDate(){
    var myDate = new Date();
    var myYear = myDate.getFullYear();
    var myFutureDate = new Date(myYear*1,7,1); /* 1 Jan yyyy*/
    var myTestDate = myFutureDate;
    var myCount = 0;
    var myDays = 0;
    for (i=0;i<27;i++){
        myTestDate = new Date(myYear*1,7,i+1) /* i starts at 0 */ 
        // console.log(myTestDate);
        if (myTestDate.getDay()+1==1){ /* = 0 Sunday */
            myCount += 1;
            if (myCount===2){
                myDays = ((myTestDate - myDate)/(24*60*60*1000)).toFixed(1);
                if(myDays < -1){
                // if(myDays < 0){
                    var myCount = 0;
                    var myDays = 0;
                    for (i=0;i<27;i++){
                        myTestDate = new Date((myYear*1)+1,7,i+1) /* i starts at 0 */ 
                        // console.log(myTestDate);
                        if (myTestDate.getDay()+1==1){ /* = 0 Sunday */
                            myCount += 1;
                            if (myCount===2){
                                myMonth = ((myTestDate.getMonth()*1)+1);
                                if (myMonth<10){myMonth = "0" + myMonth;}
                                const myFutureDate = myTestDate.getFullYear() + "-" + myMonth + "-" + myTestDate.getDate();
                                console.log(myFutureDate);
                                document.getElementById("futureDate").value = myFutureDate;
                                myDays = ((myTestDate - myDate)/(24*60*60*1000)).toFixed(1);
                                return myDays + " days.";
                            }
                        }
                    }
                }else{
                    if (myDays < 0){
                        myDays = 0;
                        // myDays = myDays.toFixed(1);
                    }
                    myMonth = ((myTestDate.getMonth()*1)+1);
                    if (myMonth<10){myMonth = "0" + myMonth;}
                    const myFutureDate = myTestDate.getFullYear() + "-" + myMonth + "-" + myTestDate.getDate();
                    console.log(myFutureDate);
                    document.getElementById("futureDate").value = myFutureDate;
                    return myDays + " days.";
                }
            }
        }
    }
}
function getFirstSaturdayDate(){
    var myDate = new Date();
    var myYear = myDate.getFullYear();
    var my1JanDate = new Date(myYear*1,0,1); /* 1 Jan yyyy*/
    var myTestDate = my1JanDate;
    for (i=0;i<27;i++){
        myTestDate = new Date(myYear*1,0,i+1) /* i starts at 0 */ 
        if (myTestDate.getDay()+1==7){ /* = 0 Sunday */
            return myTestDate;
        }
    }
}
const startDate = getFirstSaturdayDate();
// console.log(startDate);

function createTable(){
    var fromDate = startDate;
    var toDate = startDate;
    var v_initialOffsetDays = 0;
    var v_today = new Date();
    // alert(v_today.toISOString().slice(0,10));
    document.getElementById("xDate").value = v_today.toISOString().slice(0,10);
    v_today = v_today.toDateString().slice(0,15);
    var vHTML = ``;
    // vHTML += `<h1>Current training schedule</h1>`;
    vHTML += `<div class="beanie-heading"><h2>Prep for the City-2-Surf</h2></div>`;
    vHTML += `<table class="training-schedule-table">`;
        vHTML += `<tr>`;
            vHTML += `<th class="training-schedule-row">From: / To:</th>`;
            vHTML += `<th  class="training-schedule-row">Distance</th>`;
            vHTML += `<th  class="training-schedule-row">Repetitions</th>`;
            vHTML += `<th  class="training-schedule-row"></th>`;
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 2 January	6 February	8.6km	6 times
            // 
            fromDate = startDate;
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 5)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">8.6km</td>`;
            vHTML += `<td class="training-schedule-row">6</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 13 February	20 March	10.2km	6 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 5)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">10.2km</td>`;
            vHTML += `<td class="training-schedule-row">6</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
                // alert(fromDate.toDateString().slice(0,15)+ " " + toDate.toDateString().slice(0,15) + " " + v_today);
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 27 March	1 May	12.0km	6 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 5)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">12.0km</td>`;
            vHTML += `<td class="training-schedule-row">6</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 8 May	19 June	14.0km	7 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 6)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">14.0km</td>`;
            vHTML += `<td class="training-schedule-row">7</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 26 June	31 July	15.1km	6 OR 7 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 5)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">15.1km</td>`;
            vHTML += `<td class="training-schedule-row">6</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 6 August	OR 13 August Mass start, pre- C2S	6.5km	1 time
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 0)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">6.5km</td>`;
            vHTML += `<td class="training-schedule-row">1</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 7 August	OR 14 August CITY 2 SURF (C2S)	14.0km	
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 0)+1));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}</td>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 0)));
            // vHTML += `<td class="training-schedule-row">${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">14.0km</td>`;
            vHTML += `<td class="training-schedule-row">City-2-Surf</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 14 August	28 August	12.0km	3 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)-1));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 2)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">12.0km</td>`;
            vHTML += `<td class="training-schedule-row">3</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 4 September	18 September	10.2km	3 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 2)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">10.2km</td>`;
            vHTML += `<td class="training-schedule-row">3</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 25 September	9 October	8.6km	3 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 2)));
            vHTML += `${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `<td class="training-schedule-row">8.6km</td>`;
            vHTML += `<td class="training-schedule-row">3</td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
        vHTML += `<tr>`;
            // 
            // 16 October	25 December	6.5km	11 times
            // 
            fromDate = new Date(fromDate.setDate(toDate.getDate()+ (7 * 1)));
            vHTML += `<td class="training-schedule-row">${fromDate.toDateString().slice(0,15)}<br>`;
            toDate = new Date(fromDate.setDate(fromDate.getDate()+ (7 * 7)));
            // vHTML += `<td class="training-schedule-row">${toDate.toDateString().slice(0,15)}</td>`;
            vHTML += `...to end of year</td>`;
            vHTML += `<td class="training-schedule-row">6.5km</td>`;
            vHTML += `<td class="training-schedule-row"></td>`;
            if (fromDate.toDateString().slice(0,15) <= v_today && toDate.toDateString().slice(0,15) >= v_today){
                vHTML += `<td class="training-schedule-row"><span class="material-symbols-outlined">line_start_arrow_notch</span></td>`;
            } else {
                vHTML += `<td class="training-schedule-row"></td>`;
            }
        vHTML += `</tr>`;
    vHTML += `</table>`;
    // console.log(vHTML);
    return vHTML;
}
const weeklyScheduleHTML = createTable();
// console.log(weeklyScheduleHTML);
document.getElementById("weeklySchedule").innerHTML = weeklyScheduleHTML;

function xDistanceUpdate(){
    document.getElementById("xDistance").value = document.getElementById("ttCourse").value;
}
function saveTime(){
    const myTimeDate = new Date()

    var vDistance = document.getElementById("xDistance").value * 1;
    vDistance = vDistance.toFixed(3);
    var vMinutes = document.getElementById("xMinutes").value * 1;
    vMinutes = vMinutes.toFixed(3);
    var vSeconds = document.getElementById("xSeconds").value * 1;
    vSeconds = vSeconds.toFixed(3);
    var xTimeRecord = document.getElementById("xDate").value + " , " + document.getElementById("ttName").value + " , " + vDistance + " metres" + " , " + vMinutes + " min" + " , " + vSeconds + " sec";
    console.log(xTimeRecord);
    window.localStorage.setItem("TT time recorded on:- " + myTimeDate.toDateString() + " at:- " + myTimeDate.toTimeString().slice(0,8), xTimeRecord);

    // document.getElementById("fName").value = "";
    // document.getElementById("lName").value = "";
    document.getElementById("ttName").value = "";
    document.getElementById("xDistance").value = 0;
    document.getElementById("xMinutes").value = 0;
    document.getElementById("xSeconds").value = 0;

    displayTimesHistory();
}
function displayTimesHistory(){
    aTimes = [];
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
        aTimes.push(localStorage.getItem(localStorage.key(i)));
    }
    aTimes.sort();
    aTimes.reverse();
    console.log(aTimes);
    var vHTML = ``;
    for (let i = 0; i < aTimes.length; i++) {
        vHTML += `${aTimes[i]}<br>`;
    }
    console.log(vHTML);
    document.getElementById("timesHistory").innerHTML = vHTML;
}
displayTimesHistory();
function eraseHistory(){
    aTimes = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0,7) == 'TT time') {
            aTimes.push(localStorage.key(i));
        }
    }
    for (var i = 0; i < aTimes.length; i++) {
        localStorage.removeItem(aTimes[i]);
    }
    displayTimesHistory();
}

function emailTimesIn(){
    let aTimes = [];
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ");
        aTimes.push(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ");
    }
    aTimes.sort();
    aTimes.reverse();
    console.log(aTimes);
    let vTEXT = `Run date: , Name , Distance , Minutes , Seconds , Record date ,%0D%0A`;
    var vHTML = ``;
    vHTML += `<div><h2>Turramurra Trotters</h2></div>`;
    vHTML += `<table>`;
    vHTML += `<tr>`;
        vHTML += `<th>Run date:</th>`;
        vHTML += `<th>Name</th>`;
        vHTML += `<th>Distance</th>`;
        vHTML += `<th>Minutes</th>`;
        vHTML += `<th>Seconds</th>`;
        vHTML += `<th>Record Date and Time</th>`;
    vHTML += `</tr>`;
    let runDate="",runnerName="",runDistance="",runMinutes="",runSeconds="",runRecordedDateTime="";
    let nStart=0,nEnd=0,nCount=0;
    for (let i = 0; i < aTimes.length; i++) {
        vHTML += `<tr>`;
        vTEXT += aTimes[i] + `%0D%0A`;
        for (let n1=0; n1 < aTimes[i].length; n1++){
            if (aTimes[i].slice(n1,n1+3)===" , "){
                nEnd = n1;
                switch (nCount){
                    case 0:
                        runDate = aTimes[i].slice(nStart,nEnd);
                        console.log(nStart, nEnd, runDate);
                        vHTML += `<td>${runDate}</td>`;
                        break;
                    case 1:
                        runnerName = aTimes[i].slice(nStart,nEnd);
                        console.log(nStart, nEnd, runnerName);
                        vHTML += `<td>${runnerName}</td>`;
                        break;
                    case 2:
                        runDistance = aTimes[i].slice(nStart,nEnd);
                        console.log(nStart, nEnd, runDistance);
                        vHTML += `<td>${runDistance}</td>`;
                        break;
                    case 3:
                        runMinutes = aTimes[i].slice(nStart,nEnd);
                        console.log(nStart, nEnd, runMinutes);
                        vHTML += `<td>${runMinutes}</td>`;
                        break;
                    case 4:
                        runSeconds = aTimes[i].slice(nStart,nEnd);
                        console.log(nStart, nEnd, runSeconds);
                        vHTML += `<td>${runSeconds}</td>`;
                        break;
                    case 5:
                        runRecordedDateTime = aTimes[i].slice(nStart,nEnd);
                        console.log(nStart, nEnd, runRecordedDateTime);
                        vHTML += `<td>${runRecordedDateTime}</td>`;
                        break;
                }
                nStart = nEnd+3;
                nCount++;
            }
        }
        nStart=0;
        nCount=0;
        vHTML += `</tr>`;
    }
    vHTML += `</table>`;
    console.log(vHTML);
    console.log(vTEXT);
    // for (let i = 0; i < aTimes.length; i++) {
    //     vHTML += `${aTimes[i]}<br>`;
    // }
    var emailSubject = "TT Times";
    // window.open(`mailto:?subject=${emailSubject}&body=${vHTML}`);
    // window.open(`mailto:?subject=${emailSubject}&body=${vTEXT}`);
    window.location.href = "mailto:?subject=" + emailSubject + "&body=" + vTEXT;
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
// /*An array containing all the country names in the world:*/
// var runnerNames = ["Phil South","Alan Cole","Peter Welch","Les Bryce","John Marshall","Margaret Marchall","Brian Matthes","Lyn Matthews","Ralph Pain","Geoff Russell","Clare Pain","Nick Swan","Allison Lilley"];
// /*initiate the autocomplete function on the "ttName" element, and pass along the runnerNames array as possible autocomplete values:*/
// autocomplete(document.getElementById("ttName"), runnerNames);

function userPIN(){
    const vUserPIN = document.getElementById("userPIN").value;
    switch(vUserPIN) {
    case "74192320":
        /*An array containing all the country names in the world:*/
        var runnerNames = ["Phil South","Alan Cole","Peter Welch","Les Bryce","John Marshall","Margaret Marchall","Brian Matthes","Lyn Matthews","Ralph Pain","Geoff Russell","Clare Pain","Nick Swan","Allison Lilley"];
        /*initiate the autocomplete function on the "ttName" element, and pass along the runnerNames array as possible autocomplete values:*/
        autocomplete(document.getElementById("ttName"), runnerNames);
        document.getElementById("timesForm").style.display="block";
        document.getElementById("timesHistoryContainer").style.display="block";
        document.getElementById("userAccess").style.display="none";
        document.getElementById("city2surfCountdownWrapper").style.display="none";
        document.getElementById("weeklySchedule").style.display="none";
        document.getElementById("headerElement").style.display="none";
        document.getElementById("bodyElement").style.display="none";
        break;
    case "":
        // /*An array containing all the country names in the world:*/
        // var runnerNames = [];
        // /*initiate the autocomplete function on the "ttName" element, and pass along the runnerNames array as possible autocomplete values:*/
        // autocomplete(document.getElementById("ttName"), runnerNames);
        // document.getElementById("timesForm").style.display="block";
        // document.getElementById("timesHistoryContainer").style.display="block";
        // document.getElementById("userAccess").style.display="none";
        // document.getElementById("city2surfCountdownWrapper").style.display="none";
        // document.getElementById("weeklySchedule").style.display="none";
        // document.getElementById("headerElement").style.display="none";
        // document.getElementById("bodyElement").style.display="none";
        // break;
    default:
    }
    document.getElementById("userPIN").value = null;
} 

function resetZoom(){
    // var scale = 'scale(1)';
    // document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
    // document.body.style.msTransform =   scale;       // IE 9
    // document.body.style.transform = scale;     // General
}

document.getElementById("xMinutes").addEventListener("change",calcStats());
document.getElementById("xSeconds").addEventListener("change",calcStats());
document.getElementById("xDistance").addEventListener("change",calcStats());
document.getElementById("ttCourse").addEventListener("change",calcStats());
document.getElementById("runStats").addEventListener("mouseover",calcStats());
document.getElementById("runStats").addEventListener("touchstart",calcStats());

// // console.log(getFutureDate());
// var daysToFutureDate = 0;
// var baseDate = new Date();
// // console.log(baseDate);
// daysToFutureDate = document.getElementById("futureDate").value - baseDate;
document.getElementById("daysCount").innerHTML = getDaysToFutureDate();

window.addEventListener("load", () => {
    // Fully loaded!
    // document.getElementById("futureDate").value = getFutureDate();
});



// DON'T FORGET TO DATA VALIDATE FOR ","