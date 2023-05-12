// sosm = SLIDE OUT SIDE MENU start
/* 
        <div id="sosm" class="sosm-sidebar">
                <a href="javascript:void(0)" class="sosm-closebtn" onclick="sosmClose()">×</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
        </div>
        <div id="main">
                <button class="sosm-openbtn" onclick="sosmOpen()">☰ Open Sidebar</button>  
        </div> 
*/

// // SERVER REQUESTS LOG start
// function pingServer() {
//     const v_data = JSON.stringify(
//         {
//             pingString: 'empty'
//         });
//     const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
//     fetch('/pingServer',v_options)
// }
// // SERVER REQUESTS LOG end

function sosmInsert(){
	// pingServer();
        var html = ``;
        html+=`<div id="sosm" class="sosm-sidebar" onclick="sosmClose()">`;
                html+=`<img class="" src="tt-logo-cropped.png" style="height: 90px; width: auto; position: absolute; left: 0px; top: 0px" >`;
                html+=`<a href="javascript:void(0)" class="sosm-closebtn" onclick="sosmClose()">close menu</a>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html')">Home</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#contacts')">Contacts</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#tt-favourite-events-CSV-parsed-table')">Favourite Events</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#currentYearSchedule')">City2Surf Schedule</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#c2sThenAndNow')">City2Surf Then and Now</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#')">Newsletters - coming soon</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('nutrition-spotlight.html')">Nutrition Spotlight</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#')">Race reports - coming soon</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#runners')">our Runners</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#trekkers')">our Trekkers</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#cyclists')">our Cyclists</button>`;
                // html+=`<a href="group-page-images.html">Gallery</a>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#linksToFavSites')">Links</button>`;
                html+=`<button type="button" class="sosm-btn" onclick="doMenuClick('index.html#about')">About</button>`;
                // html+=`<a href="javascript:void(0)" onclick="resetPassword()">re-set site access password</a>`;
                // html+=`<a href="javascript:void(0)">-- temporary menu items --</a>`;
                // // html+=`<button id="" class="" onclick="displayImagesDump()">...images</button>`;
                // html+=`<a href="old-site-images-dump.html">...images</a>`;
                // html+=`<a href="old-site-documents-dump.html">...documents</a>`;
        html+=`</div>`;
        document.getElementById('sosm-container').innerHTML = html;
}
function sosmOpen() {
        document.getElementById("sosm").style.width = "250px";
        // document.getElementById("sosm").style.height = "250px";
        document.getElementById("sosm-openbtn").style.display = "none";
        // document.getElementById("main").style.marginLeft = "250px";
}
function sosmClose() {
        document.getElementById("sosm").style.width = "0";
        document.getElementById("sosm-openbtn").style.display = "block";
        // document.getElementById("main").style.marginLeft= "0";
}
function doMenuClick(p_navTo){
        const v_menuItemsArray = document.querySelectorAll(".i06-menu-item");
        var p_navToExtract = p_navTo.replace(/index.html#/g,"");
        for (i=0;i<v_menuItemsArray.length;i++){
                if (v_menuItemsArray[i].id == p_navToExtract){
                        v_menuItemsArray[i].style.display = "block";
                        // if(v_clientOS=="Windows"){console.log("v_menuItemsArray[" + [i] + "].style.display = block " + p_navTo,v_menuItemsArray[i].id);}
                } else {
                        v_menuItemsArray[i].style.display = "none";
                        // if(v_clientOS=="Windows"){console.log("v_menuItemsArray[" + [i] + "].style.display = none " + p_navTo,v_menuItemsArray[i].id);}
                }
        }
        if(v_clientOS=="Windows"){console.log("p_navTo:- " + p_navTo);}
        // the following- function, "recordMenuClicks()" requires "siteAnalytics.js"
        recordMenuClicks(p_navTo);
        window.location = p_navTo;
}
// sosm = SLIDE OUT SIDE MENU end

// HAMBURGER MENU start
function menuInsert(){
        var html = ``;
        html+=`<div class="i06-hamburger-menu" onclick="menuPopUp()">`;
                html+=`<div class="i06-hamburger-menu-icon" >`;
                html+=`</div>`;
                html+=`<div class="i06-hamburger-menu-icon" >`;
                html+=`</div>`;
                html+=`<div class="i06-hamburger-menu-icon" >`;
                html+=`</div>`;
        html+=`</div>`;
        document.getElementById('menu-container').innerHTML = html;
}
function menuPopUp(){
        document.getElementById('menuPopUp').style.display="block";
}
function menuClose(){
        document.getElementById('menuPopUp').style.display="none";
}
// HAMBURGER MENU end