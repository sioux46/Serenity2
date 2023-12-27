// index.js
//
// Nomenclature : [Années depuis 2020].[Mois].[Jour].[Nombre dans la journée]
var devaVersion = "v3.12.27.1";
/* ********************************************************************
************************************************************ class
********************************************************************* */

class traveller {
  constructor(lastname, firstname, nickname, travellertype ,phone, address, equipment, imgsrc) {
    this.clientid = '' + Math.random();
    this.lastname = lastname;
    this.firstname = firstname;
    this.nickname = nickname;
    this.phone = phone;
    this.address = address;
    this.travellertype = travellertype; // (Conducteur attitré, Conducteur additonnel, Passager)
    this.equipment = equipment;
    this.imgsrc = imgsrc;
  }
  getInfo() {
    return `${this.lastname} ${this.firstname} (Tel: ${this.nickname})`;
  }
}

class Car {
  constructor(brand, type, year) {
    this.brand = brand;
    this.type = type;
    this.year = year;
  }
  getInfo() {
    return `${this.brand} ${this.type} ${this.year}`;
  }
}

/*
person1 = new traveller("Pierre", "Durand", 0673232630);
car2 = new Car("Toyota", "Corolla", 2020);
car2.getInfo();  // 'Toyota Corolla 2020'
JSON.stringify(car2) // '{"brand":"Toyota","type":"Corolla","year":2020}'
*/

////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// F U N C T I O N S
////////////////////////////////////////////////////////////////////

/////  V E R I F I C A T I O N  baseUserName
function verifBaseUserName(baseUserName) {
  if ( baseUserName ) {
    $.ajax({
      url: 'get_user_name.php',
      type: 'post',
      data: { 'baseUserName': baseUserName },
      complete: function(xhr, result) {
        if (result != 'success') {
          window.alert("Erreur réseau. Fermez l'appli et essayez à nouveau.");
        }
        else {
          if ( xhr.responseText == "OK" ) {
            localStorage.setItem('baseUserName', JSON.stringify(baseUserName));

            initContactBook();
            readCalFromDatabase();
            readSettingListFromDatabase();

            $("#singleInputModal input").val("");
            $("#singleInputModal").modal("hide");
            $("#start").css({"display": "block"}); // show start page


            /////       C O N N E C T I O N  count
            var agent;
            try {
              agent = /* window.navigator.platform + ' ' + */ window.navigator.userAgent;
              if ( agent.lastIndexOf("HeadlessChrome") != -1 ) return;
              agent = agent.replace(/Mozilla\/5\.0 /,"");
              agent = agent.replace(/\(KHTML, like Gecko\)/,"");
              agent = agent.replace(/; Win64; x64/,"");
              agent = agent.replace(/Macintosh; Intel Mac /,"");
              agent = agent.replace(/AppleWebKit\/\d*\.\d*/,"");

              if ( !agent ) agent = window.navigator.vendor;
            } catch (e) {}

            $.ajax({
              url: 'connection_count.php',
              type:'post',
              data: {'userAgent':agent, 'userName': JSON.parse(localStorage.getItem('baseUserName')), 'devaVersion': devaVersion}
            });
            /////
          }
          else {
            localStorage.removeItem("baseUserName");
            window.location = window.location.href;
          }
        }
      }
    });
  }
  else window.location = window.location.href;
}

///////////////////////////////////////  settings

/////     init settinglist
function initSettingList() {
  console.log("initSettinglist");

  settinglist.responseStyle = " ";
  settinglist.responseDetail = " de façon concise ";
  settinglist.userName = "Monsieur";
  settinglist.assistantName = "Deva";
  settinglist.reponseTemperature = 0.7;
  settinglist.speechRate = 1.2;
  settinglist.speechPitch = 2;
}

/////     write settinglist to database
function writeSettingListToDatabase() {
  $.ajax({
    url: "setting_write.php",
    type: "post",
    data: {
      "username": JSON.parse(localStorage.getItem('baseUserName')),
      "setting": JSON.stringify(settinglist)
    },
    complete: function(xhr, result) {
      if (result != 'success') {
        console.log("Error writing settinglist to database");
      }
      else {
        console.log("Success writing settinglist to database");
        var reponse = xhr.responseText;
        //reponse = JSON.parse(reponse);
      }
    }
  });
}

/////     read settinglist from database
function readSettingListFromDatabase() {
  $.ajax({
    url: "setting_read.php",
    type: "post",
    data: {
      "username": JSON.parse(localStorage.getItem('baseUserName')),
    },
    complete: function(xhr, result) {
      if (result != 'success') {
        console.log("Error reading settinglist from database");
      }
      else {
        console.log("Success reading settinglist from database");
        if ( xhr.responseText != "empty" )
              settinglist = JSON.parse(JSON.parse(xhr.responseText));
        else  initSettingList();
      }
    }
  });
}



///////////////////////////////////////  traveller
/////
function initContactBook() {
  $.ajax({
    url: "travellerReadAll.php",
    type: "post",
    data: {
      "username": JSON.parse(localStorage.getItem('baseUserName'))},
    complete: function(xhr, result) {
      if (result != 'success') {
        console.log("Error reading traveller from database");
      }
      else {
        console.log("Success reading taveller from database");
        var reponse = xhr.responseText;
        if ( reponse == "empty" ) {
          contactBook = [];
          $("#travellerCards").html("");
        }
        else {
          var jRep = JSON.parse(reponse);
          contactBook = bluidTravellersOjectTable(jRep);
          let html = "";
          for ( let contact of contactBook ) {
            html += buildCardHtml(contact);
          }
          $("#travellerCards").html(html);
        }
      }
    }
  });
}

///// build traveller objects array from arrays array
function bluidTravellersOjectTable(tabsTable) {
  let objsTable = [];
  for ( let tab of tabsTable ) {
    let obj = new traveller( tab[3], tab[4], tab[5], tab[6], tab[7], tab[8], tab[9], tab[10] );
    obj.clientid = tab[1];
    objsTable.push(obj);
  }
  return objsTable;
}

/////  clear traveller modal
function clearTravellerModal() {
  $("#travellerModal").attr("data-client-id", "");
  $("#travellerModal").find("#lastname").val("");
  $("#travellerModal").find("#firstname").val("");
  $("#travellerModal").find("#nickname").val("");
  $("#travellerModal").find("#travellertype").val("");
  $("#travellerModal").find("#phone").val("");
  $("#travellerModal").find("#address").val("");
  $("#travellerModal").find("#equipment").val("");
  $("#travellerModal").find("#imgFromDisk").attr("src", "icons/person-fill.svg");
}

function editTravellerModalLoad(clientid) {
  let traveller;
  for ( let trav of contactBook ) {
    if ( trav.clientid == clientid ) {
      traveller = trav;
      break;
    }
  }
  $("#travellerModal").attr("data-client-id", clientid);
  $("#travellerModal").find("#lastname").val(traveller.lastname);
  $("#travellerModal").find("#firstname").val(traveller.firstname);
  $("#travellerModal").find("#nickname").val(traveller.nickname);
  $("#travellerModal").find("#travellertype").val(traveller.travellertype);
  $("#travellerModal").find("#phone").val(traveller.phone);
  $("#travellerModal").find("#address").val(traveller.address);
  $("#travellerModal").find("#equipment").val(traveller.equipment);
  $("#travellerModal").find("#imgFromDisk").attr("src", traveller.imgsrc);
}

///// build traveller from modal and send to database
function buildEditTravellerFromModal(clientid) {

  let newTraveller = new traveller(
      $("#travellerModal").find("#lastname").val(),
      $("#travellerModal").find("#firstname").val(),
      $("#travellerModal").find("#nickname").val(),
      $("#travellerModal").find("#travellertype").val(),
      $("#travellerModal").find("#phone").val(),
      $("#travellerModal").find("#address").val(),
      $("#travellerModal").find("#equipment").val(),
      $("#travellerModal").find("#imgFromDisk").attr("src")
  );
  if ( clientid ) newTraveller.clientid = clientid; // traveller allready exist (edit)

  $.ajax({
    url: "traveller_write.php",
    type: "post",
    data: {
      "clientid": newTraveller.clientid,
      "username": JSON.parse(localStorage.getItem('baseUserName')),
      "lastname": newTraveller.lastname,
      "firstname": newTraveller.firstname,
      "nickname": newTraveller.nickname,
      "phone": newTraveller.phone,
      "address": newTraveller.address,
      "travellertype": newTraveller.travellertype,
      "equipment": newTraveller.equipment,
      "imgsrc": newTraveller.imgsrc
    },
    complete: function(xhr, result) {
      if (result != 'success') {
        console.log("Error writing traveller to databas");
      }
      else {
        console.log("Success writing taveller to database");
        // contactBook.push(newTraveller);
        initContactBook();
      }
    }
  });
}

/////                                   rezise image
function resizeImage(img, width, height) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0, width, height);
    img.src = canvas.toDataURL('image/png');
}

/////                                  Build card html
function buildCardHtml(card) {
  let html;

  html = '<div class="col-sm-6 col-md-4 col-lg-3 cmb-1">' +
    '<div class="card mb-3">' +
      '<div class="card-body pb-2">' +
        '<div class="d-flex align-items-top">' +
          '<div>';
            if ( card.imgsrc ) html += '<img src="' + card.imgsrc + '"';
            else html += '<img src="icons/person-fill.svg"';
            html += '" width="100" class="avatar-md img-thumbnail" style="border-radius:0!important" />';

          html += '</div>' +
          '<div class="flex-1 ms-3">' +
            '<h6 class="mb-1">';
              if ( card.nickname ) html += '<div class="mb-1" style="font-size:1.3rem; color: hsla(235, 100%, 30%, 1);">' + `"` + card.nickname + `"` + '</div>';
              html += '<div class="text-dark mb-1"><strong>' + card.lastname + '</strong></div>' +
              '<div class="text-dark">' + card.firstname + '</div>';
            html += '</h6>' +
          '</div>' +
        '</div>' +
        '<div class="mt-1 pt-1">';
          if ( card.travellertype ) html +=
              '<h6 class="travellertype"  style="color:#518f97;"><strong>' + card.travellertype + '</strong></h6>';
          if ( card.phone ) html +=
              '<p class="text-dark mb-0"><i class="fa fa-phone" style="font-size:19px; color:#518f97;"></i><span style="position:relative; top:-2px; left:13px;">' + card.phone + '</span></p>';
          if ( card.address ) html +=
              '<p class="text-dark mb-0 mt-1"><i class="material-icons" style="font-size:26px;  color:#518f97;">mail</i><span style="position:relative; top:-8px; left:6px;">' + card.address + '</span></p>';
          if ( card.equipment ) html +=
              '<p class="text-dark mb-0"><i class="fa fa-car-side" style="font-size:20px; color:#518f97;"></i><span style="position:relative; top:-2px; left:10px;">' + card.equipment + '</span></p>';
        html += '</div>' +
        '<div class="d-flex gap-1 pt-2 trash-edit-box">' +
          '<div class="edit-trash" style="display:none">' +
            '<div class="event-trash" style="display: block;">' +
              '<button class="btn trash" data-clientid="' + card.clientid + '" type="button">' +
                '<img src="icons/trash.svg" width="26">' +
              '</button>' +
            '</div>' +
            '<div class="event-edit" style="display: block;">' +
              '<button class="btn edit" data-clientid="' + card.clientid + '" type="button">' +
                '<img src="icons/pencil.svg" width="26">' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  return html;
}

///////////////////////////////////////  END traveller

/////
function getDevaPass() {
  let truePass = "ziva";

  let pass = JSON.parse(localStorage.getItem('devaPass'));
  if ( pass && pass.match(new RegExp("^" + truePass + "$", 'i')) ) {
    $("#start").css({"display": "block"});  // show start page
    return;
  }
  pass = window.prompt("Entez le mot de passe pour Deva:");
  if (  pass.match(new RegExp("^" + truePass + "$", 'i')) ) {
    localStorage.setItem('devaPass', JSON.stringify(pass));
    $("#start").css({"display": "block"});  // show start page
  }
  else window.location = window.location.href;
}

/////
function getDateNow() {
  // Créer une nouvelle instance de l'objet Date
  let date = new Date();

  // Retourner la date sous forme de chaîne de caractères
  return date.toLocaleDateString();
}

/////
function getDate(day, month,year) {

  // Create a new date
  let theDate = new Date(year, month - 1, day);
  return theDate.toLocaleDateString();
}


// ************************************** Tree Handling START
/////
function findNodeByLabel(label, node) {
  var childs = node[1];
  if ( !childs ) return;
  for ( let i = 0; i < childs.length; i++ ) {
    let child = childs[i];
    if ( child[0] == label ) return child;
  }
}
//

/////
function deepFindNodeByLabel(label, node) {

  function deepFindNode(label, node) {
    if ( label == node[0] ) result_deepFindNode = node;
    let childs = node[1];
    if ( !childs ) return;
    for ( var i = 0; i < childs.length; i++ ) {
      let child = childs[i];
      deepFindNode(label, child);
    }
  }

  var result_deepFindNode = [];
  deepFindNode(label, node);
  return result_deepFindNode;
}
//

/////
function deepFindChildsLabels(label) {
  let node = deepFindNodeByLabel(label, ontoTree);
  let subLabels = findChildsLabels(node);
  return subLabels;
}

/////////////////////////////////
function findChildsLabels(node) {
  var labels = [];
  var childs = node[1];
  for ( let i = 0; i < childs.length;i++ ) {
    labels.push(childs[i][0]);
  }
  return labels;
}
//

/////
function importTree(inData) {
// let test = importTree(importData)

  var ligData;
  var level;
  var label;
  var outData = [];
  var nearestParents = [];
  var newNode;
  var parent;

  label = inData[0][0];
  outData[0] = label;
  outData[1] = [];
  outData[2] = "";
  nearestParents[0] = outData;

  for ( let lig = 1; lig < inData.length; lig++ ) {
    ligData = inData[lig];
    level = ligData.length-1;
    label = ligData[level];

    newNode = [];
    newNode[0] = label;
    newNode[1] = [];

    parent = nearestParents[level -1];
    newNode[2] = parent[0]; // parent label
    parent[1].push(newNode);
    nearestParents[level] = newNode;
  }

  return Array.from(outData);
}
//
// ************************************** Tree Handling END

/////       show page
function showPage(pageID) {
  // ajust toolbar buttons borders
  $("#speakerButton").trigger("click");
  $("#speakerButton").trigger("click");

  $("#start").animate({"top": "-50rem"}, 400, function() {
      $("#start").css({"display": "none"});
      $(".toolbarButton").css("display", "inline-block");
      activePage = pageID;
      if ( innerHeight < innerWidth ) $('#evoCalendar').evoCalendar('toggleSidebar', true);
      $(pageID).css({"display": "block"});
  });
}

/////
function initOntoTreeChoose(label, move, labs) {
  let labels;
  if ( labs ) labels = labs;
  else labels = deepFindChildsLabels(label);

  let lastParent = $("#param").find("#ontoTree-parent").text();
  $("#param").find("#ontoTree-parent").text(label);

  // clear
  for ( let i = 0; i < ONTO_TREE_ITEMS_NB; i++ ) {
    let item = "#ontoTree-item" + i;
    $("#param").find(item).css({"border-bottom-width": 0});
    $("#param").find(item).text("");
    $("#param").find(item).css({"display": "none"});
  }
  // feel
  for ( let i = 0; i < labels.length; i++ ) {
    let item = "#ontoTree-item" + i;
    $("#param").find(item).css({"display": "inline-block"});
    $("#param").find(item).text(labels[i]);
  }

  // animate
  if ( move ) {
    if ( move == "up" )
        $("#ontoTree-content").css({"top": "50em"});
    else /* if ( move == "down" ) */
        $("#ontoTree-content").css({"top": "-50em"});

    $("#ontoTree-content").animate({"top": 0}, 400);
  }
}

//////////////////////////////////////////////    C A L E N D A R    Functions ////

/////                      DEB   INITCALENDAR()
function initCalendar() {

  $('#evoCalendar').evoCalendar({
    calendarEvents: evoCalEvents,
    language:'fr',
    todayHighlight: true,
    firstDayOfWeek: 1, // Monday
    sidebarToggler:false,
    sidebarDisplayDefault: false,
    eventListToggler: false,
    eventDisplayDefault: true,
    titleFormat:"MM yyyy",
    eventHeaderFormat:"d MM yyyy",
  });
  calendar = $('#evoCalendar').get(0).evoCalendar;

  removeBeforeCalEvents(evoCalEvents);

  if ( !evoCalEvents.length ) {
    //addCalEvent("18h00", "Piscine avec Anna", actualDateToEvoDate("today"));
    addCalEvent("20h00", "Diner chez mon oncle", actualDateToEvoDate("today"));
    addCalEvent("22h15", "Concert Julie et Diana", actualDateToEvoDate("today"));
    addCalEvent("10h15", "Dentiste", actualDateToEvoDate("tomorrow"));
    addCalEvent("09h00", "Réunion avec Rachid et François", actualDateToEvoDate("afterTomorrow"));
    addCalEvent("18h45", "Aller chercher les filles au concervatoire", actualDateToEvoDate("afterTomorrow"));
    addCalEvent("21h00", "Départ pour la Bretagne", actualDateToEvoDate("afterTomorrow"));
    saveEvoCalEvents();
  }

  ///////////// manage/hide togglers
  $(".calendar-table th").on("click", function(e) {
    $("#evoCalendar").evoCalendar('toggleSidebar');
  });

  // disable toggler buttons
  $("#sidebarToggler").css("display","none");
  $("#eventListToggler").css("display","none");

  $(".calendar-year").css({"padding-top": "15px", "padding-bottom": "5px"});

  $('#evoCalendar').evoCalendar('toggleEventList', true); // show eventList on startup

  ///////////  hide trash on unsel event
  $(".calendar-inner, .calendar-sidebar, #sidebarToggler, #eventListToggler").on("click", function (ev) {
    $(".event-trash, .event-edit").css("display", "none");
  });

  $(".calendar-year").find("p").on("click", function (e) {
    $('#evoCalendar').evoCalendar('toggleSidebar');
  });

  //////////////////////////////////////////////////   selectEvent + edit or trash event
  $("#evoCalendar").on('selectEvent',function(activeEvent) {

    let event = activeEvent.handleObj.handler.arguments[1];

    if ( flagEditTrash == "trash") {                          // trash event
      $("#evoCalendar").evoCalendar('removeCalendarEvent', event.id);
      calendar.selectDate( actualDateToEvoDate("tomorrow") ); // change selected date to refresh date display
      calendar.selectDate( event.date );
      saveEvoCalEvents();
      flagEditTrash = "";
      return;
    }

    if ( flagEditTrash == "edit" ) { //     SHOW eventModal     // edit event
      $("#eventModal").find(".modal-title").text("Modification de l'évènement");
      $("#eventModal").attr("data-event-id", event.id); // save event ID in data attr

      clearEventModal();

      //        feel modal with event description
      $("#eventModal").find("#sEventTitle").val(event.description); // title/description

      let splitTime12 = event.name.split(' à ');   // time/name

      let splitTime1 = splitTime12[0].split('h');
      let time = `${splitTime1[0]}:${splitTime1[1]}`;
      $("#eventModal").find("#sEventTime").val(time);

      if ( splitTime12[1] ) {
        let splitTime2 = splitTime12[1].split('h');
        let time = `${splitTime2[0]}:${splitTime2[1]}`;
        $("#eventModal").find("#sEventTime2").val(time);
      }

      $("#eventModal").modal("show");
    }

    $(".event-container").children(".event-info").children(".event-trash, .event-edit").css("display", "none");
    $(".event-container:hover").children(".event-info").children(".event-trash, .event-edit").css("display", "block");

  });

  ////////////////////////////////////////////////////////    on selectDate
  $("#evoCalendar").on('selectDate',function(newDate, oldDate) {
    //console.log(($('#evoCalendar').get(0).evoCalendar.$current.date));
    let activeDate = calendar.$active.date; // calendar.$active.events[0].date;

    // console.log(activeDate);
    globalSortCalendarEvents();
//    saveEvoCalEvents();
    $("#evoCalendar").evoCalendar('toggleEventList',true);
  });

  /////////////////////////////////////////////////////////////////////    create new event
                                                      //  or update old event

  ///// show eventModal                     ADD NEW EVENT
  $(".event-plus").on("click", function (ev) {
    clearEventModal();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
  //  $("#eventModal").find("#sEventTime").val(`${hours}:${minutes}`);

    $("#eventModal").find(".modal-title").text("Nouvel évènement");
    $("#eventModal").modal("show");
  });

  /////                                                READ eventModal
  $("#newEventOK").on("click", function (ev) {

    let title = $("#eventModal").find("#sEventTitle").val(); // title/description
    let val = $("#sEventTime").val();
    let val2 = $("#sEventTime2").val();

    if ( !val ) val = "12:00";

    if ( !title ) title = "Motif à déterminer";

    if ( val2  &&  val2 < val ) {
      $("#sEventTime2").val(val);
      return;
    }
    if ( !val && val2 ) {
      $("#sEventTime").val(val2);
      return;
    }
    if ( !val && !val2 && !title ) return;

    // let time = $("#eventModal").find("#sEventTime").val();
    let time = val;

    let splitTime = time.split(':');
    time = `${splitTime[0]}h${splitTime[1]}`;

    // let time2 = $("#eventModal").find("#sEventTime2").val();
    time2 = val2;

    if ( time2 ) {
      splitTime = time2.split(':');
      time2 = `${splitTime[0]}h${splitTime[1]}`;
      time += ` à ${time2}`;
    }

    if ( flagEditTrash == "edit") {  // update event
      let eventId = $("#eventModal").attr("data-event-id");

      for ( let event of evoCalEvents ) {
        if ( event.id == eventId ) {
          event.description = title;   // title/description;
          event.name = time;   // name/time;
        }
      }
      // sortCalendarEvents(calendar.$active.date);
//      globalSortCalendarEvents();
//      saveEvoCalEvents();
      flagEditTrash = "";
      postChatBuffer = [];  // forget recent chat
    }

    else {    // new event
      if ( time == "hundefined" ) time = "";
      $("#evoCalendar").evoCalendar('addCalendarEvent', [
        {
          id: '' + Math.random(),
          name: time,                 // time/name
          description: title,
          date: calendar.$active.event_date,
          type: "event",
          color: "#009099", // "#fe7f78",
        }
      ]);
      postChatBuffer = [];  // forget recent chat
    }

    $("#eventModal").modal("hide");   // HIDE MODAL

    let activeDate = calendar.$active.date; // calendar.$active.events[0].date;
    // sortCalendarEvents( activeDate );
    globalSortCalendarEvents();
    //calendar.selectDate( "01/01/2022" ); // change selected date to refresh date display
    //calendar.selectDate( activeDate );
    refreshDateDisplay(activeDate);

    saveEvoCalEvents();
  });
}
///////////////////////////////////////////////  FIN  INITCALENDAR()
/////////////////////////////////////////////////////////////////////

/////     save evoCalEvents to database
function saveEvoCalEvents() {
  writeCalToDatabase();
}

/////     write evoCalEvents to database
function writeCalToDatabase() {
  $.ajax({
    url: "calendar_write.php",
    type: "post",
    data: {
      "username": JSON.parse(localStorage.getItem('baseUserName')),
      "evoCalEvents": JSON.stringify(evoCalEvents)
    },
    complete: function(xhr, result) {
      if (result != 'success') {
        console.log("Error writing evoCalEvents to database");
      }
      else {
        console.log("Success writing evoCalEvents to database");
        var reponse = xhr.responseText;
        //reponse = JSON.parse(reponse);
      }
    }
  });
}

/////     read evoCalEvents from database
function readCalFromDatabase() {
  $.ajax({
    url: "calendar_read.php",
    type: "post",
    data: {
      "username": JSON.parse(localStorage.getItem('baseUserName')),
    },
    complete: function(xhr, result) {
      if (result != 'success') {
        console.log("Error reading evoCalEvents from database");
      }
      else {
        console.log("Success reading evoCalEvents from database");
        if ( xhr.responseText != "empty" )
              evoCalEvents = JSON.parse(JSON.parse(xhr.responseText));
        initCalendar();
      }
    }
  });
}

///// click trash
function trashClick() {
  flagEditTrash = "trash";
  postChatBuffer = [];  // forget recent chat
}

///// click edit
function editClick() {
  flagEditTrash = "edit";
  postChatBuffer = [];  // forget recent chat
}

////
function globalSortCalendarEvents() {
  for ( let event of evoCalEvents ) {
    sortCalendarEvents(event.date);
  }
//  saveEvoCalEvents();
}

/////
function sortCalendarEvents(date) {
  let eventIndex = [];
  let eventRank = 0;

  for (let i = 0; i < evoCalEvents.length; i++) {
    if ( evoCalEvents[i].date == date ) eventIndex[eventRank++] = i;
  }
  let eventNumber = eventIndex.length;
  let rounds = eventNumber - 1;

  for ( let r = rounds; r > 0; r-- ) {
    if ( eventNumber == 0 || eventNumber == 1 ) return;
    let newEvent;

    for ( let i = eventNumber-1; i > 0 ; i-- ) {
      if ( evoCalEvents[eventIndex[i]].name > evoCalEvents[eventIndex[i-1]].name ) continue;
      newEvent = evoCalEvents[eventIndex[i]];
      evoCalEvents[eventIndex[i]] = evoCalEvents[eventIndex[i-1]];
      evoCalEvents[eventIndex[i-1]] = newEvent;
    }
  }
//  saveEvoCalEvents();
}

/////
function date1CompareDate2(date1, date2) {

  // let today = actualDateToEvoDate("today");

  let month1 = date1.match(/^\d{2}/);
  let day1 = date1.match(/\/(\d{2})/)[1];
  let year1 = date1.match(/\d{4}/);
  let dateNumber1 = year1 + month1 + day1;

  let month2 = date2.match(/^\d{2}/);
  let day2 = date2.match(/\/(\d{2})/)[1];
  let year2 = date2.match(/\d{4}/);
  let dateNumber2 = year2 + month2 + day2;

  if( dateNumber1 < dateNumber2 ) return "before";
  if( dateNumber1 > dateNumber2 ) return "after";
  return "same";
}

////
function removeBeforeCalEvents(events) {
  let ids = [];
  for ( let event of events ) {
    if ( date1CompareDate2(event.date, actualDateToEvoDate("today")) == "before" )
          ids.push(event.id);
  }
  $('#evoCalendar').evoCalendar('removeCalendarEvent', ids);
}

////
function clearEventModal() {                // clear cal fields
  $("#eventModal").find("#sEventTitle").val("");
  $("#eventModal").find("#sEventTime").val("");
  $("#eventModal").find("#sEventTime2").val("");
}

////
function clearCalendar() {
  evoCalEvents = [];
  saveEvoCalEvents();
  // evoCalEvents = JSON.parse(localStorage.getItem('eventList'));
  window.location = window.location.href;
}

/////////////////////////////////////////////////////////////////////////////////////////////
                                            //  chatGPT S E R V I C E   C A L L
////////////////////////////////////////////////////////////////////////////////////////////
function chatGPTserviceCall(serviceBuffer) {

  waitingForGPT = true;

  $.ajax({
    'url': 'chatGPT.php',
    'type': 'post',
    'data': {
              chatBuffer: JSON.stringify(serviceBuffer),
              model: JSON.stringify("gpt-4-1106-preview"), // "gpt-4-1106-preview" "gpt-4-0613"  "gpt-3.5-turbo-0613"
              temperature: JSON.stringify(0), // reponseTemperature // force to 0 for GPT-4
              style: JSON.stringify(""), // responseStyle
              details: JSON.stringify("de façon concise"), // responseDetail
            },
    'complete': function(xhr, result) {

      waitingForGPT = false;

      if (result != 'success') {
        console.log("Fatal error A P I Open A I !!!!");
      }
      else {
        var reponse = xhr.responseText;
        if ( reponse.match(/^Error/) ) {
          console.log("Error A P I Open A I !");
        }
        else {
          console.log("Response gpt-4-1106-preview serviceCall:\n" + reponse);
          newEventListFromServiceCall(reponse);
        }
      }
    }
  });
}

///////////////////////////////////////////////////////////////////////////
function newEventListFromServiceCall(reponse) {    // event list response from GPT4
  let rep = reponse;
  let eventList = [];
  let lig = "";
  let time = "";
  let description = "";
  let date ="";
  let hours;
  let minutes;

// saving actual evoCalEvents
  evoCalEvents_OLD =[];
  for ( let event of evoCalEvents ) {
    evoCalEvents_OLD.push( event );
  }
  // erasing evoCalEvents
  while ( evoCalEvents.length ) {
    $('#evoCalendar').evoCalendar('removeCalendarEvent', evoCalEvents[0].id);
//    saveEvoCalEvents();
  }
  saveEvoCalEvents();

  // agenda non vide
  if ( reponse.match(/^agenda vide\.?/i) ) rep = response;  // reSponse is a globlal

  try {
    rep = rep.replace(/.*\n\n/, "");
    // rep = rep.replace(/\n\n.*/, "");
    rep = rep + "\n";


    do {
      lig = rep.match(/.*\n+?/)[0];

      hours = lig.match(/(\d{1,2})h/i);                     // HOURS
      if ( hours ) {
        hours = hours[1];
        if ( hours.length == 1 ) hours = "0" + hours;
        minutes = lig.match(/(\d{1,2})h(\d{1,2})/i);
        if ( minutes ) {
          minutes = minutes[2];
          if ( minutes.length == 1 ) minutes = "0" + minutes;
          time = hours + "h" + minutes;
        }
        else time = hours + "h00";
      }
      else time = textTimeToNumTime(lig);  // "12h00" if not found;

      description = lig.match(/\d{2}h\d{2}: (.*)/);   // MOTIF (description)
      if ( description ) {
        description = description[1];
      }
      else {
        description = lig.match(/\d{1,2}h\d{1,2},? (.*)/);   // MOTIF (description)
        if ( description ) {
          description = description[1];
          if ( description.match(/: /) ) description = description.replace(/: /, "");
        }
        else {
          description = lig.match(/( - |: |motif |, )(.*)/i);
          if ( description ) description = description[2];
          else description = "Motif à préciser";
        }
        if ( description.match(/^- /) ) description = description.replace(/^- /, "");
        if ( description.match(/\.$/) ) description = description.replace(/\.$/, "");
        if ( description.match(/motif/i) ) description = description.replace(/motif/i, "");
      }

      date = lig.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);          // DATE
      if ( date ) {    // permuter jour et date
        if ( date[1].length == 1 ) date[1] = "0" + date[1];
        if ( date[2].length == 1 ) date[2] = "0" + date[2];
        date = date[2] + "/" + date[1] + "/" + date[3];
      }
      else date = textDateToNumDate(lig);

      console.log("Add event from GPT4 > time: " + time + ", description: " + description + ", date: " + date);
      if ( !addCalEvent(time, description, date) ) throw new Error("Bad format from serviceCall in the loop");

      rep = rep.replace(/.*\n+?/, "");
    } while ( rep );

    refreshDateDisplay(date); // select the agenda date of the modified event
    globalSortCalendarEvents();
//    saveEvoCalEvents();


  } catch(e) {
    console.log("***** Mauvais format réponse serviceCall ******");
    // fillLog("service", "Mauvais format réponse:\n" + rep );

    // erasing evoCalEvents
    while ( evoCalEvents.length ) {
      $('#evoCalendar').evoCalendar('removeCalendarEvent', evoCalEvents[0].id);
//      saveEvoCalEvents();
    }

    // restoring evoCalEvents
    for ( let event of evoCalEvents_OLD ) {
      console.log("restore event bad format GPT4 > time: " + event.name + ", description: " + event.description + ", date: " + event.date);
      addCalEvent(event.name, event.description, event.date);
//      saveEvoCalEvents();
    }
    saveEvoCalEvents();
  }

  let activeDate = calendar.getActiveDate();
  refreshDateDisplay(activeDate);

  $(".calendar-events").css("opacity", 0.1);
  setTimeout( function() { $(".calendar-events").animate({"opacity": 1}, 10); }, 350);

}

////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////  E V E N T   STUFF
///////////////////////////////////////////////////

////
                          // time: name, description: description, date: date
                          // Collecting agenda events to send to ChatGPT
function collectEvents(type) {
  let events = [];
  let content = "";

  if ( type == "service" ) events.push({ role: "system", content: "Vous êtes mon assistant. Vous notez dans votre agenda mes rdv et mes dates de voyage. Si votre agenda est vide, répondez 'Agenda vide'. Sinon listez votre agenda."});

  for ( let event of evoCalEvents ) {

    // user
      content = "Ajoutez un rendez-vous à votre agenda pour le " + dayFromDate(event.date) + " " + dateFromDate(event.date);

    if ( event.name ) {
      if ( event.name.match(/à/) ) content += " de " + event.name;
      else content += " à " + event.name;
    }
    if ( event.description ) content += " motif: " + event.description + ".";
    else content += ".";

    events.push({ role: "user", content: content});

    // assistant
    if ( type == "normal" ) {
      flagFirstEvent = false;
      content = "Rendez-vous ajouté pour le " + dayFromDate(event.date) + " " + dateFromDate(event.date);
      if ( event.name ) {
        if ( event.name.match(/à/) ) content += " de " + event.name;
        else content += " à " + event.name;
      }

      if ( event.description ) content += " motif: " + event.description + ".";
      else content += ".";

      events.push({ role: "assistant", content: content});
    }
  }


  return events;
}

////
// time: name, description: description, date: date
function addCalEvent(time, description, date) {
  if ( !time || !description || !date ) {
    if ( !time ) console.log("No time !  ");
    if ( !date ) console.log("No date !  ");
    return false;
  }
  if ( !description ) console.log("No description !  ");
  $("#evoCalendar").evoCalendar('addCalendarEvent', [
    {
      id: '' + Math.random(),
      name: time,                 // time/name
      description: description,
      date: date, // calendar.$active.event_date,
      type: "event",
      color: "#009099", // "#fe7f78",
    }]);

    // sortCalendarEvents( date );
    globalSortCalendarEvents();
//    saveEvoCalEvents();
    return true;
}

///////////////////////////////////////////////////////////////////////////////////
//                                                          P R E C H A T    BUFFER
function collectPreChatBuffer() {
  var chatBuffer = [];

  chatBuffer.push({ role: "system", content: "Vous êtes " + assistantName + ", mon chauffeur et mon secrétaire particulier et mon assistant. Je suis votre client.  Appelez-moi " + userName + ".  Vous devez répondre à mes questions." });
  chatBuffer.push({ role: "system", content: "Répondez " +  responseStyle + " " + responseDetail + "." });

  // date
  chatBuffer.push({ role: "system", content: "La date pour aujourd'hui est le " + actualDate() + ". Le jour de la semaine est " + actualDay(actualDate()) + "." });

  chatBuffer.push({ role: "system", content: "La date pour demain est le " + nextDayDate(actualDate()) + ". Le jour de la semaine pour demain est " + actualDay(nextDayDate(actualDate())) + "." });
  chatBuffer.push({ role: "system", content: "La date pour après-demain est le " + nextDayDate(nextDayDate(actualDate())) + ". Le jour de la semaine pour après-demain est " + actualDay(nextDayDate(nextDayDate(actualDate()))) + "." });

  chatBuffer.push({ role: "system", content: "Vous tenez à jour votre propre agenda avec mes déplacement, mes rendez-vous, mes réservations et mes dates de voyage pour pouvoir venir me cherchez et me conduire là où je vais."});

  chatBuffer.push({ role: "user", content: "Ajoutez un rdv à votre agenda pour le premier janvier 2024 à 1h59, motif: Tour du quartier avec Tatata" });
  chatBuffer.push({ role: "assistant", content: "Rendez-vous ajouté pour le lundi premier janvier 2024 à 9 heure, motif: Tour du quartier avec Tatata" });

  chatBuffer.push({ role: "user", content: "Supprimez le rdv pour le premier janvier avec Tatata" });
  chatBuffer.push({ role: "assistant", content: "Rendez-vous supprimé pour le lundi premier janvier 2024 à 1h59 heure, motif: Tour du quartier avec Tatata" });

  chatBuffer.push({ role: "user", content: "Ajoutez un rendez-vous pour après-demain à 2h01 avec mon arrière cousine Guendeline" });
  chatBuffer.push({ role: "assistant", content: "Rendez-vous ajouté pour le " +  actualDay(nextDayDate(nextDayDate(actualDate()))) + " " + nextDayDate(nextDayDate(actualDate())) + " à 9h avec votre arrière cousine Guendeline" });

  chatBuffer.push({ role: "user", content: "Supprimez le rdv pour après-demain avec mon arrière cousine Guendeline" });
  chatBuffer.push({ role: "assistant", content: "Rendez-vous supprimé pour le "  +  actualDay(nextDayDate(nextDayDate(actualDate()))) + " " + nextDayDate(nextDayDate(actualDate())) + " à 9 heure avec votre arrière cousine Guendeline" });

  chatBuffer.push({ role: "user", content: "Ajoutez un rendez-vous pour aujourd'hui à 1h59, motif: tour de piste avec Tititi" });
  chatBuffer.push({ role: "assistant", content: "Rendez-vous ajouté pour le " +  actualDay((actualDate())) + " " + actualDate() + " à 1h59, motif: tour de piste avec Tititi" });

  chatBuffer.push({ role: "user", content: "Supprimez ce dernier rdv" });
  chatBuffer.push({ role: "assistant", content: "Rendez-vous supprimé pour le " + actualDay((actualDate())) + " " + actualDate() + " à 1h59, motif: tour de piste avec Tititi" });

  chatBuffer.push({ role: "user", content: "Videz entièrement votre agenda. Supprimez tous les rendez-vous." });
  chatBuffer.push({ role: "assistant", content: "Tous les rendez-vous ont été supprimés. Mon agenda est vide" });

  chatBuffer.push({ role: "system", content: "Si l'heure du rendez-vous n'est pas donnée, demandez l'heure"});
  chatBuffer.push({ role: "user", content: "Ajouter un rendez-vous pour aujourd'hui"});
  chatBuffer.push({ role: "assistant", content: "A quelle heure souhaitez-vous ajouter ce rendez-vous ?"});

  chatBuffer.push({ role: "system", content: "Si le motif du rendez-vous n'est pas donnée, demandez le motif"});
  chatBuffer.push({ role: "user", content: "Ajouter un rendez-vous pour aujourd'hui à 9h"});
  chatBuffer.push({ role: "assistant", content: "Quel est le motif de ce rendez-vous ?"});

  chatBuffer.push({ role: "system", content: "Comme vous êtes mon chauffeur et mon assistant, vous avez un agenda où vous notez les dates et les motifs de mes déplacements pour pouvoir venir me chercher et me conduire où je vais."});

  // consigne agenda
  chatBuffer.push({ role: "system", content: "Vous ajoutez, modifiez et supprimez des rendez-vous, des dates de voyage. Quand je vous demande de faire une réservation d'hôtel, de restaurant, de train, d'avion, ou de taxi; ajoutez le comme un rendez-vous dans votre agenda. Vous notez ces réservations dans votre agenda."});

  chatBuffer.push({ role: "system", content: "Notez mes demandes de résevation de vol dans votre agenda."});

  chatBuffer.push({ role: "system", content: "faite une réponse courte."});

  chatBuffer.push({ role: "system", content: "Ne terminez pas votre réponse par une clause 'Veuillez noter'"});

  chatBuffer.push({ role: "system", content: "votre réponse doit inclure <nom du jour> <numéro du jour> <nom du mois> <année> à <heure> ainsi que le motif du déplacement, dans le cas ou vous ajoutez, modifiez, supprimez ou listez un événement dans votre agenda. Demandez-moi de préciser si il y a des informations manquantes." });

  chatBuffer.push({ role: "system", content: "L'heure actuelle est " + actualTrueTime() + "." });

  return chatBuffer;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////
function questionAnalyse(question) {   // ************************** Q U E S T I O N   A N A L Y S E *********
  if ( !question ) return;

  if ( question.match(/\bD(e|i)va\b/i)) question = question.replaceAll(/\bD(e|i)va\b/gi, "Deva"); // write 'Deva'
  fillLog("question", question);

  if ( question.match(/^\s*gpt4\s*$/i) ) {  // force gpt4
    forceGPT4 = true; fillLog("service", "GPT-4 activé");
    reponseModel = 'gpt-4-1106-preview';
    // window.location = window.location.href;
    return;
  }

  if ( question.match(/^\s*gpt3\s*$/i) ) {  // force gpt3
    forceGPT4 = false; fillLog("service", "GPT-3.5 activé");
    reponseModel = 'gpt-3.5-turbo-1106';
    // window.location = window.location.href;
    return;
  }
  if ( question.match(/^\s*clear\s*$/i) ) {  // clear the calendar
    clearCalendar(); return; }

  clearPostChatTimeout(); // re-init timeout

  console.log("question: " + question);
  let prevResponse;
  if ( response ) prevResponse = response.replace(/"/g, ' '); // quotes sup

  response = ""; // global

  if ( question.match(new RegExp("^Merci " + assistantName, 'i'))) { // stopRecog handled in fillLog()
    response = "Je vous en pris";
  }
  else if ( question.match(new RegExp("^Coucou " + assistantName, 'i'))) {
    response = "Bonjour " + userName + ". Que puij faire pour vous ?";
  }

  //////////////////////////////////////////////////////////////////
  else  {
    let action = "";
    if ( question.match(/(consulte|ouvr|affich|montr|voir\s|alle(r|z)\sà).*agenda/i) ) action = "showAgenda";

    if ( action == "showAgenda" ) {
      $("#startButton").trigger("click"); $("#sheduleButton").trigger("click");

      let prevR = prevResponse;
      if ( prevR.match(/Premier/i) ) prevR = prevR.replace(/Premier/i, "01");
      if ( prevR.match(/1er/i) ) prevR = prevR.replace(/1er/i, "01");

      let date = prevR.match(new RegExp("\\s+(\\d{1,2})\\s+(" + frenchMonthNamesForRegExp() + ")\\s+(\\d{4})", 'i'));
      if ( date ) {
        let dateForEvo = chatToEvoDate(date);
        console.log(dateForEvo);
        $('#evoCalendar').evoCalendar('selectDate', dateForEvo);
      }
      response = "OK";
    }
  }

  //--------------------------------  if response
  if ( response ) {

    if ( reponseMode != "text" ) {
      console.log("Réponse audio:");
      doSpeechSynth(response);
    }
    else {
      console.log("Réponse texte:");
    }
    console.log(response);
    if ( response.match(/ puij /)) response = response.replace(/ puij /, " puis-je ");
    fillLog("response", response);
  }

  // --------------------------------- if !response
  else {                                   //            send question to ChatGPT
    questionAnswer = "chatGPT" ;

  //  if ( question.match(/à (mon |l')agenda/) ) question.replace(/à (mon |l')agenda/, "");

    if ( newChat ) {
      postChatBuffer = [];
      newChat = false;
    }

    // Load globals before ChatGPT call

    preChatBuffer = collectPreChatBuffer(); // consignes générales

    chatBuffer = preChatBuffer;
    chatBuffer.push({ role: "user", content: "Ajouter les rendez-vous suivant à votre agenda" });
    calendarBuffer = collectEvents("normal"); // Agenda
    chatBuffer = chatBuffer.concat(calendarBuffer);

    //------------------------------------------------------------------
    question = replaceDateWordsByTrueDateText(question); // out ce soir, demain etc...
    //-------------------------------------------------------------------
    console.log("envoyé à ChatGPT: " + question);
    postChatBuffer.push({ role: "user", content: question });
    lastQuestion = question;

    globalChatBuffer = chatBuffer.concat(postChatBuffer);  // send to GPT


    // ********************************************************** ChatGPT
      chatGPTcall(globalChatBuffer);
    // ******************************************************************
  }
}

///////////////////////////////////////////////////////////////////////////////////
function chatGPTcall(globalChatBuffer) {                  // **** chatGPT call ****

  waitingForGPT = true;
  $.ajax({
    'url': 'chatGPT.php',
    'type': 'post',
    'data': {
              chatBuffer: JSON.stringify(globalChatBuffer),
              model: JSON.stringify(reponseModel),
              temperature: JSON.stringify(parseFloat(reponseTemperature)),
              style: JSON.stringify(responseStyle),
              details: JSON.stringify(responseDetail),
            },
    'complete': function(xhr, result) {

      waitingForGPT = false;

      if (result != 'success') {
        console.log("Fatal error A P I Open A I !!!!");
        fillLog("response", "Error A P I Open A I !!!!");
      }
      else {
        var reponse = xhr.responseText;
        // fillLog("response", reponse);
        console.log("Response " + reponseModel + " for user: " + reponse);

        if ( reponse.match(/^Error/) ) {
          reponse = "Désolé mais je n'ai pas compris votre question. Pouvez-vous la reformuler ?";
          postChatBuffer = [];  // forget recent chat
        }
        else {
          let assistantMessage = { role: "assistant", content: reponse };

          // assistant response added to buffer, ready for nexte question
          postChatBuffer.push(assistantMessage);
          handleResponse(reponse);
        }
        fillLog("response", reponse);
        // console.log("response");
        response = reponse; // local to glob

        if ( reponseMode == "audio" ) {
          console.log("Réponse audio");
          let repToSpeech = reponse;

          repToSpeech = repToSpeech.replace(/ :/g, "");
          repToSpeech = repToSpeech.replace(/\n\n/g, "\n");  // sup double \n
          repToSpeech = repToSpeech.replace(/\n/g, "\.\n");  // point before new line

          repToSpeech = repToSpeech.replace(/-/g, " ");   // hypen don't work
          if ( !repToSpeech.match(/\.$/) ) repToSpeech = repToSpeech + ".";

          doSpeechSynth(repToSpeech);
        }
        else {
          console.log("Réponse texte");
          if ( questionMode == "audio" && !reponse.match(/^Error/) ) startRecog();
        }
      }
    }
  });
}

//////////////////////////////////////////////////////// R E S P O N S E    a n a l y s e
////
function handleResponse(reponse) {
  let rep;
  let action = "";
  let time = "";
  let description = "";
  let subDesc;
  let dateForEvo;
  let date;
  // let serviceBuffer;

  if ( reponse.match(/Voici( la liste| les dates| la date)/i) ) return;
  if ( reponse.match(/( modifié| enlevé|remplacé| changé| déplacé| décalé| repoussé| reporté| avancé| reculé| complété| annulé| inchangé| désormais)/i) ) action = "modify";
  else if ( reponse.match(/( noté| ajouté|nouveau rendez-vous|nouveau rdv|réservation|réservé| retenu)/i) ) action = "modify"; // "add";
  else if ( reponse.match(/( supprimé| enlevé| retiré| effacé| ôté)/i) ) action = "modify"; // "remove";
  // else if ( reponse.match(new RegExp(" " + frenchMonthNamesForRegExp(), 'i')) ) action = "modify";
  // else if ( reponse.match(/\b\d{4}\b/) )  action = "modify";
  if ( !action ) return;

  rep = reponse;

  if ( rep.match(/ à votre agenda/) ) rep = rep.replace(/ à votre agenda/, "");


  ////////////////////////////////////
  if ( action == "modify" ) {

    // date
    if ( rep.match(/Premier/i) ) rep = rep.replace(/Premier/i, "01");
    if ( rep.match(/1er/i) ) rep = rep.replace(/1er/i, "01");

    date = rep.match(new RegExp("\\bau\\b.*\\b(\\d{1,2})\\b.*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( !date ) date = rep.match(new RegExp("\\ble\\b.*\\b(\\d{1,2})\\b.*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( !date ) date = rep.match(new RegExp("\\b(\\d{1,2})\\b.*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));

    if ( date ) dateForEvo = chatToEvoDate(date);
    else dateForEvo = textDateToNumDate(rep);

    if ( dateForEvo ) { // select the agenda date of the modified event
      refreshDateDisplay(dateForEvo);
    }

    serviceBuffer = [];
    serviceBuffer = collectEvents("service").concat(postChatBuffer); // Agenda - assistant message + postChatBuffer

    // serviceBuffer.push({ role: "user", content: "Listez mes rendez-vous dans le format suivant: donnez en premier <2 chiffres pour le numéro du jour> suivit d'un slash, puis <2 chiffres pour le numéro du mois>/<année> et l'heure au format <2 chiffres pour les heures>h<2 chiffres pour les minutes> en ajoutant le motif. Répondez sans ajouter d'autre remarque"});

    // serviceBuffer.push({ role: "user", content: "Listez mes rdv au format numérique <2 chiffres pour le jour>/<2 chiffres pour le mois>/<année> à <2 chiffres>h<2 chiffres> en ajoutant le motif. Répondez sans ajouter d'autre remarque"});

    // Listez mon agenda pour serviceCall
    //serviceBuffer.push({ role: "user", content: "Listez votre agenda au format numérique <2 chiffres pour le jour>/<2 chiffres pour le mois>/<année> à <2 chiffres pour l'heure>h<2 chiffres pour les minutes> en ajoutant le motif et en remplaçant aujourd'hui, demain et après-demain par la date correspondante. Répondez sans ajouter d'autre remarque"});
    serviceBuffer.push({ role: "user", content: "Listez votre agenda au format numérique <2 chiffres pour le jour>/<2 chiffres pour le mois>/<année> à <2 chiffres pour l'heure>h<2 chiffres pour les minutes> en ajoutant le motif et en placant le dernier rendez-vous dont on a parlé à la fin de la liste. Répondez sans ajouter d'autre remarque"});


    chatGPTserviceCall(serviceBuffer);
    // postChatBuffer = [];             // forget recent chat
  }
  /////////////////////////////////////////////

  else if ( action ) {          // calendar is to be updated for add or remove
    if ( rep.match(/Premier/i) ) rep = rep.replace(/Premier/i, "01");
    if ( rep.match(/1er/i) ) rep = rep.replace(/1er/i, "01");

    // date
    date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( date ) dateForEvo = chatToEvoDate(date);
    else {
      if ( rep.match(/aujourd'hui/) ) {
        rep = rep.replace(/aujourd'hui/, actualDate());
        date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
        if ( date ) dateForEvo = chatToEvoDate(date);
        else return; // no date
      }
    }

    // time
    let hours = rep.match(/(\d{1,2})h/i);
    if ( hours ) {
      hours = hours[1];
      if ( hours.length == 1 ) hours = "0" + hours;

      let minutes = rep.match(/(\d{1,2})h(\d{1,2})/i);
      if ( minutes ) {
        minutes = minutes[2];
        if ( minutes.length == 1 ) minutes = "0" + minutes;
        time = hours + "h" + minutes;
      }
      else time = hours + "h00";
      console.log(time);
    }

    // description
    try { description = date[3]; } catch(e) {}

    if ( description.match(/\d{4}/) ) description = description.replace(/\d{4}/, "");

    if ( description.match(/^\s+à\s+/) ) description = description.replace(/^\s+à\s+/, "");
    if ( description.match(/\d{1,2}h\d{1,2}/i) ) description = description.replace(/\d{1,2}h\d{1,2}/i, "");
    if ( description.match(/\d{1,2}h/i) ) description = description.replace(/\d{1,2}h/i, "");
    if ( description.match(/,\s+/) ) description = description.replace(/,\s+/, "");
    if ( description.match(/motif:\s+/i) ) description = description.replace(/motif:\s+/i, "");
    if ( description.match(/motif\s+/i) ) description = description.replace(/motif\s+/, "");
    if ( description.match(/^à ,/) ) description = description.replace(/^à ,/, "");
    if ( description.match(/^\s+/) ) description = description.replace(/^\s+/, "");
    subDesc = description.match(/(.*\.)\s+/);
    if ( subDesc ) description = subDesc[1];
    if ( description.match(/\.$/) ) description = description.replace(/\.$/, "");

    if ( !description ) {

      subDesc = rep.match(/.*\s+(avec\s+|chez\s+|dans\s+|aller\s+|voir\s+|pour\s+les\s+)(.*)\s+pour\s+le\s+.*/i);
      if ( subDesc ) description= subDesc[1];
    }
    console.log(description);
    console.log(dateForEvo);

    ///////////////////////////
    if ( action == "add" ) {
      console.log("Add event from GPT 3 > time: " + time + ", description: " + description + ", date: " + dateForEvo);
      if ( !addCalEvent(time, description, dateForEvo) ) return;
      // sortCalendarEvents( dateForEvo );
      globalSortCalendarEvents();
//      saveEvoCalEvents();
      //calendar.selectDate( "01/01/2022" ); // change selected date to refresh date display
      //calendar.selectDate( dateForEvo );
      refreshDateDisplay(dateForEvo);
    }

    /////////////////////////////
    if ( action == "remove" ) {
      for ( let event of evoCalEvents ) {
        if ( event.date != dateForEvo ) continue;
        if ( event.name.match(RegExp(time)) ) {
          $('#evoCalendar').evoCalendar('removeCalendarEvent', event.id);
//          saveEvoCalEvents();

          refreshDateDisplay(dateForEvo);
          break;
        }
      }
      saveEvoCalEvents();
    }

    ///////////////////////////////////////////////// FIN ACTION
    // postChatBuffer = [];  // forget recent chat
  }
}

////////////////////////////////////////////////////////
function clearPostChatTimeout() {
  clearTimeout(postChatTimeout);
  postChatTimeout = setTimeout( function() {
    postChatBuffer = [];  // forget recent chat
    // $("#startButton").trigger("click");
    fillLog("service", "Fin du dialogue");
    // window.location = window.location.href;
  }, clearPostChatValue); // 10 min = 600000,  5 min = 300000, 1 min = 60000
}


////////////////////////////////////////////////////////////////////////
//                                          *** Speech RECOGNITION ***

////
function initRecognition() {

  let SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecog();

  recognition.continuous = false;
  recognition.lang = "fr-FR";
  // recognition.interimResults = true;


  // resetRecog();
  recognition.onend =  function (event) {
    if ( recogResult == "waitinggggg" ) {
      recognition.start();
      // console.log("waitinggggg");
    }
    else resetRecog();
  };
  recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        recogResult = event.results[i][0].transcript;

        // if ( recogResult.match(/\bD(e|i)va\b/i)) recogResult = recogResult.replaceAll(/\bD(e|i)va\b/gi, "Deva"); // write 'Deva'
        // fillLog("question", recogResult);
        questionAnalyse(recogResult);

      }
    }
  };
  return recognition;
}


////
function startRecog() {
  if ( window.speechSynthesis.speaking ) return;
  if ( !activePage ) return; // No audio in startPage

  $("#micButton img").attr("src", "icons/mic-fill.svg");
  $("#micButton").css("border", "3px solid #fa0039");
  try { recognition.start(); recogResult = "waitinggggg"; } catch(e) {}
  recognizing = true;
  clearTimeout(recogTimeout);
  recogTimeout = setTimeout( function() {
    if ( recognizing ) $("#micButton").trigger("click");
  }, stopRecogValue);  // 15000 = 15 seconds, 60000 = 1 minute
  console.log("Écoute");
}

////
function stopRecog() {
  // if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  recognition.stop();
  resetRecog();
  recogResult = "";
}

/*
////
function startStopRecog() { // and stop speech
  // if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  if (recognizing) {
    recognition.stop();
    resetRecog();
  }
  else {
    recognition.start();
    recognizing = true;
    console.log("Écoute");
  }
} */

////
function resetRecog() {
  recognizing = false;
  recogResult = "";
  console.log("Fin d'écoute");
  $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
  $("#micButton").css("border", "3px solid white");

  // else {
    // questionMode = "text";
    // $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
  // }
}

////                                                       ********  Speech SYTHESIS ********
function doSpeechSynth (text) {
  if ( !window.speechSynthesis ) return;  // if android webview
  if ( !activePage ) return; // No audio in #start page
  speechSynthesis.cancel(); // removes anything 'stuck'

  if ( !voices ) {
    voices = speechSynthesis.getVoices();
    // actualVoice = voices[0]; // Rocko
  }

  if ( text.match(/\bD(e|i)va\b/i)) text = text.replaceAll(/\bD(e|i)va\b/gi, "Diva"); // prononce 'Diva'

  var ut = new SpeechSynthesisUtterance();
  ut.text = text;
  ut.lang = 'fr-FR';
  ut.rate = parseFloat(speechRate);
  ut.pitch = parseFloat(speechPitch); // girl = 2
  // ut.voiceURI = 'native';
  ut.volume = 1;
  // Thomas, Amélie, Google UK English, Grandma (Français (Canada)), Flo (Français (Canada))
  ut.voice = voices.filter(function(voice) {return voice.name == 'Thomas';})[0];
  // ut.voice = actualVoice;
  ut.onstart = function(e) {
    //
  };
  ut.onend = function(e) {
    recogResult = "";
    if ( questionMode == "audio" && response != "Je vous en pris" ) {
      startRecog();
      return;
    }
    questionMode = "audio";
    $("#micButton").trigger("click");
    $("#micButton").trigger("click");
  };
  window.speechSynthesis.speak(ut);
}

////                                  fillLog
function fillLog(who, text) {
  let debText = "> ";
  if ( $("#logTextarea").val() != "" ) debText = "\n\n> ";
  if ( who == "question" )
          $("#logTextarea").val( $("#logTextarea").val() + debText + userName + ": " + text + "\n");
  else if ( who == "response")  {
    $("#logTextarea").val( $("#logTextarea").val() + "> " + assistantName + ": " + text );
    // document.getElementById("logTextarea").scrollTop = document.getElementById("logTextarea").scrollHeight;
    if ( text == "Je vous en pris" ) {
      questionMode = "audio";
      $("#micButton").trigger("click");
      $("#micButton").trigger("click");
      $("#micButton").trigger("click");
    }
  }
  else if ( who == "service" ) {
    $("#logTextarea").val( $("#logTextarea").val() + "\n*** " + text + "\n");
  }
  document.getElementById("logTextarea").scrollTop = document.getElementById("logTextarea").scrollHeight;
}

////                                audioState
function audioState() {
  let state = {};
  state.questionMode = questionMode;
  state.recognizing = recognizing;
  state.reponseMode = reponseMode;
  state.speaking = window.speechSynthesis.speaking;
  return state;
}

////                            KEYBOARD EVENTS
/* $(document).keydown(function (event) {
  if ( event.which == 32 ) {
    // if ( window.speechSynthesis.paused ) window.speechSynthesis.resume();
    // else window.speechSynthesis.pause();
    if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  }
}); */

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////   D A T E   &   T I M E

////
function frenchMonthNamesForRegExp() {
  return "\\bjanvier\\b|\\bfévrier\\b|\\bmars\\b|\\bavril\\b|\\bmai\\b|\\bjuin\\b|\\bjuillet\\b|\\baoût\\b|\\bseptembre\\b|\\boctobre\\b|\\bnovembre\\b|\\bdécembre\\b";
}

////
function frenchDayNamesForRegExp() {
  return "\\blundi\\b|\\bmardi\\b|\\bmercredi\\b|\\bjeudi\\b|\\bvendredi\\b|\\bsamedi\\b|\\bdimanche\\b";
}

////
function nextDayDate(dateStr) {
  // Exemple d'utilisation
  // const dateEntree = '10 septembre 2023';
  // const dateLendemain = dateDuLendemain(dateEntree);
  // console.log(dateLendemain); // Affiche '11 septembre 2023'

  // Tableau des noms de mois pour la conversion
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  // Divisez la date d'entrée en jour, mois et année
  const dateParts = dateStr.split(' ');
  const jour = parseInt(dateParts[0], 10);
  const moisStr = dateParts[1];
  const annee = parseInt(dateParts[2], 10);

  // Trouvez l'index du mois dans le tableau des mois
  const moisIndex = mois.indexOf(moisStr.toLowerCase());

  // Créez un objet Date à partir des parties de la date
  const date = new Date(annee, moisIndex, jour);

  // Ajoutez un jour à la date
  date.setDate(date.getDate() + 1);

  // Obtenez le jour, le mois et l'année de la date du lendemain
  const jourDuLendemain = date.getDate();
  const moisDuLendemain = mois[date.getMonth()];
  const anneeDuLendemain = date.getFullYear();

  // Formatez la date du lendemain dans le même format
  const dateLendemainStr = `${jourDuLendemain} ${moisDuLendemain} ${anneeDuLendemain}`;

  return dateLendemainStr;
}

function refreshDateDisplay(targetDate) { // change selected date to refresh date display
  calendar.selectDate(actualDateToEvoDate("tomorrow"));
  calendar.selectDate(actualDateToEvoDate("today"));
  calendar.selectDate(targetDate);
}

////
function actualDateToEvoDate(day) {   // '21 septembre 2023'  --->  '09/21/2023'
  if ( day == "today")
    return chatToEvoDate(actualDate().match(new RegExp("(\\d{1,2})\\s+(" + frenchMonthNamesForRegExp() + ")\\s+(\\d{4})", 'i')));
  else if ( day == "tomorrow" )
    return chatToEvoDate(nextDayDate(actualDate()).match(new RegExp("(\\d{1,2})\\s+(" + frenchMonthNamesForRegExp() + ")\\s+(\\d{4})", 'i')));
  else if ( day == "afterTomorrow" )
    return chatToEvoDate(nextDayDate(nextDayDate(actualDate())).match(new RegExp("(\\d{1,2})\\s+(" + frenchMonthNamesForRegExp() + ")\\s+(\\d{4})", 'i')));
}

////
function chatToEvoDate(date) {
  // date[0]  "30 août 2023"
  d = date;
  const monthNum = {
    "janvier": "01", "février": "02", "mars": "03", "avril": "04", "mai": "05", "juin": "06", "juillet": "07", "août": "08", "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12" };

  if ( d[1].length == 1 ) d[1] = "0" + d[1];
  if ( d[2].length == 1 ) d[2] = "0" + d[2];

  let year = date[0].match(/(\d{4})/);
  if ( year ) year = year[1];
  else year = actualDate().match(/(\d{4})/)[1];

  let date2 = monthNum[d[2]] + "/" + d[1] + "/" + year;
  return date2;
}

////
function chatToEvoDate2(rep) {  // not used
  const monthNum = {
    "janvier": "01", "février": "02", "mars": "03", "avril": "04", "mai": "05", "juin": "06", "juillet": "07", "août": "08", "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12" };

  let d = rep.match(new RegExp("(" + frenchDayNamesForRegExp() + ").*\\b(\\d{1,2})\\b.*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));


  if ( d[1].length == 1 ) d[1] = "0" + d[1];
  if ( d[2].length == 1 ) d[2] = "0" + d[2];

  let year = date[0].match(/(\d{4})/);
  if ( year ) year = year[1];
  else year = actualDate().match(/(\d{4})/)[1];

  let date2 = monthNum[d[2]] + "/" + d[1] + "/" + year;
  return date2;
}

////
function actualDate() {
  // Obtenir la date actuelle
  const dateActuelle = new Date();

  // Noms des mois en français
  const nomsMois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  // Obtenir le jour, le mois et l'année
  const jour = dateActuelle.getDate().toString().padStart(2, '0');
  const moisEnChiffres = (dateActuelle.getMonth() + 1).toString().padStart(2, '0'); // Notez que les mois sont indexés à partir de 0
  const moisEnLettres = nomsMois[dateActuelle.getMonth()];
  const annee = dateActuelle.getFullYear().toString();

  // Format final : jour + mois en lettres + année
  const dateFormatee = jour + " " + moisEnLettres + " " + annee;

  // Afficher la date formatée
  return dateFormatee;
}

////
// Fonction pour obtenir une date en français à partir d'une date au format 'MM/DD/YYYY'
function dateFromDate(dateStr) {
  // Divisez la chaîne de date en mois, jour et année
  const dateParts = dateStr.split('/');
  const mois = parseInt(dateParts[0]) - 1; // Les mois sont indexés à partir de 0
  const jour = parseInt(dateParts[1]);
  const annee = parseInt(dateParts[2]);

  // Créez un objet Date
  const date = new Date(annee, mois, jour);

  // Obtenez la date formatée en français
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  var dateEnFrancais = new Intl.DateTimeFormat('fr-FR', options).format(date);

  if ( dateEnFrancais.match(/^1/) && !dateEnFrancais.match(/^1\d{1}/) )
      dateEnFrancais = dateEnFrancais.replace(/^1/, "premier ");
  return dateEnFrancais;
}

////
function actualDay(dateString) {
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const daysOfWeek = [
        "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"
    ];

    const parts = dateString.split(" ");
    const day = parseInt(parts[0]);
    const month = months.indexOf(parts[1]);
    const year = parseInt(parts[2]);

    const dateObject = new Date(year, month, day);
    const dayOfWeek = dateObject.getDay();

    return daysOfWeek[dayOfWeek];

    // const inputDate = "29 Août 2023";
    // const dayOfWeek = getDayOfWeek(inputDate);
    // console.log(`Le ${inputDate} était un ${dayOfWeek}.`);
}

////
// Fonction pour obtenir le jour de la semaine à partir d'une date au format 'MM/DD/YYYY'
function dayFromDate(dateStr) {
  // Divisez la chaîne de date en mois, jour et année
  const dateParts = dateStr.split('/');
  const mois = parseInt(dateParts[0]) - 1; // Les mois sont indexés à partir de 0
  const jour = parseInt(dateParts[1]);
  const annee = parseInt(dateParts[2]);

  // Créez un objet Date
  const date = new Date(annee, mois, jour);

  // Obtenez le nom du jour de la semaine
  const options = { weekday: 'long' };
  const jourSemaine = new Intl.DateTimeFormat('fr-FR', options).format(date);

  return jourSemaine;
}

////
function actualTrueTime() {
  const now = new Date();
  // const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
  var hours = now.getHours();
  if ( hours.length == 1 ) hours = "0" + hours;
  var minutes = now.getMinutes();
  if ( minutes.length == 1 ) minutes = "0" + hours;
  return hours + ":" + minutes; // + ":" + seconds;
}

////
function actualTime() {
  // Obtenir la date et l'heure actuelles à Paris
  const parisTimezoneOffset = 2; // Décalage horaire de Paris en heures (UTC+2 pendant l'heure d'été)
  const dateActuelle = new Date();
  const utcMilliseconds = dateActuelle.getTime() + (dateActuelle.getTimezoneOffset() * 60000); // Convertir en UTC
  const parisMilliseconds = utcMilliseconds + (parisTimezoneOffset * 3600000); // Ajouter le décalage horaire de Paris

  const heureParis = new Date(parisMilliseconds);

  const heures = heureParis.getHours().toString().padStart(2, '0');
  const minutes = heureParis.getMinutes().toString().padStart(2, '0');
  const secondes = heureParis.getSeconds().toString().padStart(2, '0');

//  console.log("Heure à Paris : " + `${heures}:${minutes}:${secondes}`);
  return `${heures}:${minutes}:${secondes}`;
}

////
function textDateToNumDate(text) {
  let rep = text;
  let date = "";

  if ( rep.match(/aujourd'hui/i) ) {                     //  aujourd'hui
    rep = rep.replace(/aujourd'hui/i, actualDate());
    date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( date ) date = chatToEvoDate(date);
  }
  else if ( rep.match(/après(-| )demain/i) ) {                // après demain
    rep = rep.replace(/après(-| )demain/i, nextDayDate(nextDayDate(actualDate())));
    date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( date ) date = chatToEvoDate(date);
  }
  else if ( rep.match(/demain/i) ) {                     //   demain
    rep = rep.replace(/demain/i, nextDayDate(actualDate()));
    date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( date ) date = chatToEvoDate(date);
  }
  return date;
}

////
function replaceDateWordsByTrueDateText(text) {
  let rep = text;

  if ( rep.match(/\baujourd'hui\b/i) ) {                     //  aujourd'hui
    rep = rep.replace(/\baujourd'hui\b/i, "aujourd'hui le " + actualDate());
  }

  if ( rep.match(/\bce matin\b/i) ) {                         //  ce matin
    rep = rep.replace(/\bce matin\b/i, "ce matin le " + actualDate());
  }

  if ( rep.match(/\bce soir\b/i) ) {                         //  ce soir
    rep = rep.replace(/\bce soir\b/i, "ce soir le " + actualDate());
  }

  if ( rep.match(/\bcet après(-| )midi\b/i) ) {              //  cet après-midi
    rep = rep.replace(/\bcet après(-| )midi\b/i, "cet après-midi le " + actualDate());
  }


  else if ( rep.match(/\baprès(-| )demain\b/i) ) {            // après demain
    rep = rep.replace(/\baprès(-| )demain\b/i, "après-demain le " + nextDayDate(nextDayDate(actualDate())));
  }
  else if ( rep.match(/\bdemain\b/i) ) {                     //   demain
    rep = rep.replace(/\bdemain\b/i, "demain le " + nextDayDate(actualDate()));
  }
  return rep;
}

////
function textTimeToNumTime(text) {

  if ( text.match(/début.* journée/i) ) return "09h00";
  if ( text.match(/milieu.* journée/i) ) return "16h00";
  if ( text.match(/fin.* journée/i) ) return "19h00";
  if ( text.match(/journée/i) ) return "15h00";

  if ( text.match(/début.* matin/i) ) return "08h00";
  if ( text.match(/milieu.* matin/i) ) return "10h00";
  if ( text.match(/fin.* matin/i) ) return "11h30";
  if ( text.match(/matin/i) ) return "10h00";

  if ( text.match(/début.* après(-| )midi/i) ) return "14h00";
  if ( text.match(/milieu.* après(-| )midi/i) ) return "16h00";
  if ( text.match(/fin.* après(-| )midi/i) ) return "18h00";
  if ( text.match(/après(-| )midi/i) ) return "16h00";

  if ( text.match(/début.* soir/i) ) return "19h00";
  if ( text.match(/milieu.* soir/i) ) return "21h00";
  if ( text.match(/fin.* soir/i) ) return "23h00";
  if ( text.match(/ tardive/i) ) return "23h00";
  if ( text.match(/ tard /i) ) return "23h00";
  if ( text.match(/soir/i) ) return "21h00";

  return "12h00";
}



/////////////////////////////////////////////////////////////////////  Fin F U N C T I O N S
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// ****************************************************************************************
// ****************************************************************************************
// **************************************************************************     R E A D Y

$(document).ready(function () {

//////////////////
$("#devaVersion").text(devaVersion);
if ( window.location.origin.match(/paris8/) ) getDevaPass();

//////////////////   handle baseUserName
if (!window.location.origin.match(/paris8/) ) {
  let baseUserName = JSON.parse(localStorage.getItem('baseUserName'));
  if ( !baseUserName ) {
    $("#singleInputModal input").val("");
    $("#singleInputModal").modal("show");
  }
  else {

  //  $("#start").css({"display": "block"});  // show start page

  //  initContactBook();
  //  readCalFromDatabase();

    verifBaseUserName(baseUserName);
  }
}

////// V E R I F I C A T I O N  baseUserName
$("#singleInputModalOK").on("click", function(e) {
  let baseUserName = $("#singleInputModal input").val();
  verifBaseUserName(baseUserName);
});

/////////////////////////////////////////////////////////
if ( window.speechSynthesis ) { // if not android webview
  speechSynthesis.addEventListener("voiceschanged", () => { voices = speechSynthesis.getVoices(); });
}


////////////////////////////////////////////////////  TOOLBAR BUTTONS

//                                                      toggle mic
$("#micButton").on("click", function (ev) {
  if ( !window.speechSynthesis ) return; // if android webview
  if ( window.speechSynthesis.speaking || waitingForGPT == true ) return;

  if ( !recognizing ) {
    questionMode = "text"; // bug fix
  }

  if ( questionMode == "text" ) {
    questionMode = "audio";
    $("#micButton img").attr("src", "icons/mic-fill.svg");
    $("#micButton").css("border", "3px solid #fa0039");

    //                    force audio to true
    //reponseMode = "audio";
    //$("#speakerButton img").attr("src", "icons/volume-up-fill.svg");

    if ( !window.speechSynthesis.speaking  && !recognizing ) startRecog();
  }
  else {
    questionMode = "text";
    $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
    $("#micButton").css("border", "3px solid white");
    stopRecog();
  }
  setTimeout( function() { console.log(audioState()); }, 500);
});
//-------------------------------------------------------------
//                                                        toggle speaker
$("#speakerButton").on("click", function (ev) {
  // init speech
  // let ut = new SpeechSynthesisUtterance("");
  // window.speechSynthesis.speak(ut);

  if ( !window.speechSynthesis ) return; // if android webview

  if ( speechFlag ) {
    speechFlag = false;
    let ut = new SpeechSynthesisUtterance("");
    // ut.text = "";
    // ut.lang = 'fr-FR';
    // ut.voiceURI = 'native';
    window.speechSynthesis.speak(ut);
  }
  //........ fin init

  if ( reponseMode == "text" ) {
    reponseMode = "audio";
    $("#speakerButton img").attr("src", "icons/volume-up-fill.svg");
    $("#speakerButton").css("border", "3px solid #fa0039");

  }
  else {
    reponseMode = "text";
    $("#speakerButton img").attr("src", "icons/volume-mute-fill.svg");
    $("#speakerButton").css("border", "3px solid white");
    if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  }
  setTimeout( function() { console.log(audioState()); }, 500);
});

/////////////////////////////////////////////////////////////////////         P A R A M   P A G E
//----------------------------------------------------  toggle param buttons
// Toggle between multiple subpages of param page with class .param-subpage
//
$("#showCarButton").on("click", function (e) {  // car button
  if ( activeParamDisplay == "car" ) return;
  $(".param-button").css("border", "3px solid white");
  $("#showCarButton").css("border", "3px solid #fa0039");
  activeParamDisplay = "car";
  $(".param-subpage").css("display", "none");
  $("#carSubpage").css("display", "block");
});

$("#showTravellerButton").on("click", function (e) {  // Traveller button
  if ( activeParamDisplay == "traveller" ) return;
  $(".param-button").css("border", "3px solid white");
  $("#showTravellerButton").css("border", "3px solid #fa0039");
  activeParamDisplay = "Traveller";
  $(".param-subpage").css("display", "none");
  $("#travellerSubpage").css("display", "block");
  $(".edit-trash").css("display", "none");
});

$("#showTravellerButton").trigger("click");  // show traveller display on startup

//////////// card edit-trash show-hide, trash record, edit record ////////////////
$("#travellerCards").on("click", function(e) {

  //  trash click
  let trashClick = $(e.target).closest(".trash");
  if ( trashClick.get(0) ) { // trash click
    console.log("trash");
    $.ajax({
      url: 'traveller_delete.php',
      type:'post',
      data: {'clientid': trashClick.attr("data-clientid")},
      complete: function(xhr, result) {
        if (result != 'success') {
          console.log("Error deleting traveller from database");
        }
        else {
          console.log("Success deleting taveller from database");
          initContactBook();
        }
      }
    });
    return;
  }

  //    edit click
  let editClick = $(e.target).closest(".edit");
  if ( editClick.get(0) ) { // edit click
    console.log("edit");
    editTravellerModalLoad(editClick.attr("data-clientid"));
    $("#travellerModal").modal("show");
    return;
  }

  //    edit-trash show-hide
  let card = $(e.target).closest(".card-body").find(".edit-trash");
  if ( card.css("display") == "block" ) {
    card.css("display", "none");
  }
  else {
    $(".edit-trash").css("display", "none");
    card.css("display", "block");
  }
});

///////////////////////////////////////////// create or edit new traveller
$("#travellerPlus").on("click", function(e) {
  clearTravellerModal();
  $("#travellerModal").modal("show");
});
/////////////////////////////////////////////   OK travellerModal
$("#newTravellerOK").on("click", function(e) {
  buildEditTravellerFromModal($("#travellerModal").attr("data-client-id"));
  $("#travellerModal").modal("hide");
});

////////////////////////////////////////////       READER without plugin
//$("#travellerModal").find("#imgFromDiskInput").on("change", function (e) {
//  let file = e.target.files[0];
//  if ( !file || (!file.type.match(/image.*/)) ) return;

//  const reader = new FileReader();
//  reader.addEventListener('loadend', () => {
//    $("#imgFromDisk").attr("src", reader.result);
//  });
//  reader.readAsDataURL(event.target.files[0]);
//});

////////////////////////////////////////// choose photo & resize
$("#imgFromDiskInput").resizeImg({
  mode: 1,
  val: 400, // px
});

$("#imgFromDiskInput").resizeImg({
  type:"image/png"
});

$("#imgFromDiskInput").resizeImg({
  capture:false
});

$("#imgFromDiskInput").resizeImg({
quality: 0.8// 80%
});

$("#imgFromDiskInput").resizeImg({
  before:function(file) {
    console.log("kiki");
  },
  callback:function(result) {
    console.log("coucou");
    $("#imgFromDisk").attr("src", result);
  }
});




///////////////////////////////////////////////  ontoTree OFFCANVAS /////

$("#ontoTreeButton").on("click", function(e) {
  initOntoTreeChoose(ontoTree[0]);
});


///////////////////////////////////////////////  chatParam OFFCANVAS  (settinglist) /////

$("#paramOffcanvasButton").on("click", function(e) { // load paramOffcanvas modal
  $("#chatParamUserName").val(settinglist.userName);
  $("#chatParamAssistantName").val(settinglist.assistantName);
  $("#chatParamStyle").val(settinglist.responseStyle);
  $("#chatParamDetail").val(settinglist.responseDetail);
  $("#chatParamTemperature").val(settinglist.reponseTemperature);
  $("#chatParamSpeechRate").val(settinglist.speechRate);
  $("#chatParamSpeechPitch").val(settinglist.speechPitch);
});

$("#paramOffcanvas").on("hidden.bs.offcanvas", function(e) {
  writeSettingListToDatabase();
});

$("#chatParamChangeUserButton").on("click", function(e) {
  localStorage.setItem('baseUserName', JSON.stringify(""));
  window.location = "";
});

$("#chatParamUserName").on("change", function (e) {
  if ( userName != $("#chatParamUserName").val() ) {
    $("#clearLogButton").trigger("click"); // clear textarea + newChat
  }
  settinglist.userName = $("#chatParamUserName").val();
});

$("#chatParamAssistantName").on("change", function (e) {
  if ( assistantName != $("#chatParamAssitantName").val() ) {
    $("#clearLogButton").trigger("click"); // clear textarea + newChat
  }
  settinglist.assistantName = $("#chatParamAssistantName").val();
});

$("#chatParamStyle").on("change", function (e) {
  settinglist.responseStyle = $("#chatParamStyle").val();
});

$("#chatParamDetail").on("change", function (e) {
  settinglist.responseDetail = $("#chatParamDetail").val();
});

$("#chatParamTemperature").on("change", function (e) {
  settinglist.reponseTemperature = $("#chatParamTemperature").val();
});

$("#chatParamSpeechRate").on("change", function (e) {
  settinglist.speechRate = $("#chatParamSpeechRate").val();
});

$("#chatParamSpeechPitch").on("change", function (e) {
  settinglist.speechPitch = $("#chatParamSpeechPitch").val();
});

$("#questionButton").on("click", function(e) {
  let question = $("#questionTextarea").val();
  if ( question ) {
    $("#questionTextarea").val("");
    questionAnalyse(question);
  }
});

$("#clearLogButton").on("click", function(e) { // clear textarea + newChat
  $("#logTextarea").val("");
  newChat = true;
});

///////////////////////////////////////////////  SHOW PAGES   /////

/////                        open start page
$("#startButton").on("click", function (ev) {
  if ( activePage ) {
    $("#startButton").css("display", "none");
    $("#toolBar").css("display", "none");
    $(activePage).css("display", "none");
    activePage = "";
    $("#start").css({"display": "block", "top": "-50rem"});
    $("#start").animate({"top": 0}, 400);
  }
});

/////       show shedule page
$("#sheduleButton").on("click", function (ev) {
  showPage("#shedule");
  $("#toolBar").css("display", "block");
  //initOntoTreeChoose(ontoTree[0]);
});

/////       show voyage page
$("#voyageButton").on("click", function (ev) {
  showPage("#voyage");
  $("#toolBar").css("display", "block");
  //initOntoTreeChoose(ontoTree[0]);
});

/////       show param page
$("#paramButton").on("click", function (ev) {
  showPage("#paramPage");
  $("#toolBar").css("display", "block");
  //initOntoTreeChoose(ontoTree[0]);
});

/////////////////////////////////////////////////////////////////////

/////        change ontoTree-parent within param WITH DIALOG
$("#ontoTree-parent").on("click", function (ev) {
//  $("#inputModal").modal("show");
});

/////        change ontoTree-btn list
$(".ontoTree-btn").on("click", function(ev) {
  let label = $(this).text();
  initOntoTreeChoose(label, "up");
});

/////         handling modal INPUT choose label
$("#inputModalChooseLabelOK").on("click", function (ev) {
  let newLabel = $("#inputModal").find("input").val();
  if ( !newLabel ) newLabel = ontoTree[0];
  $("#inputModal").modal("hide");
  initOntoTreeChoose(newLabel);
});

/////         handling modal  BUTTON PARENT choose label
$("#buttonParentModalChooseLabel").on("click", function (ev) {
  let node = deepFindNodeByLabel($("#ontoTree-parent").text(), ontoTree);
  $("#inputModal").modal("hide");
  initOntoTreeChoose(node[2], "down");
});

////////
$(".ontoTree-btn").on("mouseup", function (ev) {
  $("#param").trigger("click");
});

////////
$("#ontoTree-title").on("click", function (ev) {
  let node = deepFindNodeByLabel($("#ontoTree-parent").text(), ontoTree);
  initOntoTreeChoose(node[2], "down");
});

//////////   same as typing "clear" in prompt
$("#devaVersion").on("click", function (e) {
  $("#start").css("opacity", 0.1);
  $("#start").animate( {"opacity": 1 }, 2000);
  setTimeout( function() {
     clearCalendar();
  }, 360);
});
//

/*
$('#evoCalendar').on('selectMonth', function(event, activeMonth, monthIndex) {
  if ( event.isTrigger ) return;
  let year = $(".calendar-year p").text();
  let month = monthIndex + 1;
  $('#evoCalendar').evoCalendar("selectDate", month + "/01/" + year );
  // if portrait mode
  if ( innerHeight > innerWidth ) $('#evoCalendar').evoCalendar('toggleSidebar', false);
});
*/

// $('#evoCalendar').on('selectYear', function(event, activeYear) {
$("button[data-year-val]").on("click", function(e) {
  let month;
  if ( $(this).attr("data-year-val") == "next" ) month = 0; // janvier
  else month = 11; // décembre
  $('#evoCalendar').evoCalendar('toggleEventList', false);
  $('#evoCalendar').evoCalendar('selectMonth', month);
  // $('#evoCalendar').evoCalendar('toggleEventList', true);
});

$(".month").on("click", function(e) {
  // $('#evoCalendar').evoCalendar('toggleEventList', false);
  let year = $(".calendar-year p").text();
  let month = (Number($(".calendar-months > li.active-month").attr("data-month-val")) + 1).toString();
  $('#evoCalendar').evoCalendar("selectDate", month + "/01/" + year );
  // if portrait mode
  if ( innerHeight > innerWidth ) $('#evoCalendar').evoCalendar('toggleSidebar', false);
});

/////
$("#sEventTime, #sEventTime2").on("click", function (ev) {
//  if ( !$("#sEventTime2").val() ) $("#sEventTime2").val($("#sEventTime").val());
});

}); // *********************************************  F I N   R E A D Y
//  *******************************************************************

const ONTO_TREE_ITEMS_NB = 10;

var activePage = "";

var ontoTree = [];
// Array à 2 cases représente un noeud: case 0 = étiquette, 1 = ensemble (Array) des descendants immédiats (fils). Si pas de descendant, l'Array est vide ([]).
// exemple: ["meuble", [["chaise",[]], ["table", []]]

ontoTree = importTree(importData);

/////////////////////               CONTACTBOOK

var contactBook = [];

/////////////////////              CALENDAR

var calendar;     // exemple: calendar.getActiveDate();
var evoCalEvents = [];
var evoCalEvents_OLD =[];
$(".calendar-sidebar > .calendar-year").css("padding", "20px");

var flagEditTrash;

var questionAnswer = "chatGPT"; // chatGPT v DEVA

var questionMode = "text"; // audio v text
var reponseMode = "text"; // audio v text

var activeParamDisplay = ""; // to toogle between car and traveller

//                              init SpeechRecognition
var recognizing = false;
var recognition = initRecognition();
var recogResult = "";

//                              init speechSynthesis
var response;
var voices;
var actualVoice;
var speechFlag = true; // init speech
var speechRate = 1;
var speechPitch = 1;

//                              init ChatGPT
var chatBuffer = [];
var preChatBuffer = [];
var calendarBuffer = [];
var postChatBuffer = [];
var globalChatBuffer = [];
var serviceBuffer = [];
var lastQuestion = "";

var newChat = true;
var waitingForGPT = false;

var postChatTimeout;
var recogTimeout;
var stopRecogValue = 60000;  // 15000 = 15 seconds, 60000 = 1 minute
var clearPostChatValue = 120000; // 10 min = 600000,  5 min = 300000, 2 min = 120000, 1 min = 60000

//                        Paramètres chatGPT
var forceGPT4 = false; // gpt4 allways
var reponseModel = "gpt-4-1106-preview";  //  'gpt-3.5-turbo-1106';  //   'gpt-4-0613'; // 'gpt-3.5-turbo-1106'  'gpt-3.5-turbo-0613'
var reponseTemperature;
var userName;
var assistantName;
var responseStyle;
// var responseStyle = " dans le style de C3PO, le robot maitre d'hotel de Star Wars"
var responseDetail;
//                        Settings list
var settinglist = {};
