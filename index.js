// index.js

/*********************************************************************
************************************************************ class
**********************************************************************/

class Person {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  getInfo() {
    return `${this.firstName} ${this.lastName} (Tel: ${this.model})`;
  }
}
/*
const person1 = new Person("Pierre", "Durand", 0673232630);
const car2 = new Car("Toyota", "Corolla", 2020);
console.error(car1); // Car { make: 'Honda', model: 'Civic', year: 2019 }
console.error(car2); // Car { make: 'Toyota', model: 'Corolla', year: 2020 }
car = new Car("Honda", "Civic", 2019);
console.error(car1.getInfo()); // "This car is a 2019 Honda Civic."
*/

////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// F U N C T I O N S
////////////////////////////////////////////////////////////////////

///////////////////////////////////////
function getDateNow() {
  // Créer une nouvelle instance de l'objet Date
  let date = new Date();

  // Retourner la date sous forme de chaîne de caractères
  return date.toLocaleDateString();
}

///////////////////////////////////////

function getDate(day, month,year) {

  // Create a new date
  let theDate = new Date(year, month - 1, day);
  return theDate.toLocaleDateString();
}


/*************************************** Tree Handling START */
///////////////////////////////////////
function findNodeByLabel(label, node) {
  var childs = node[1];
  if ( !childs ) return;
  for ( let i = 0; i < childs.length; i++ ) {
    let child = childs[i];
    if ( child[0] == label ) return child;
  }
}
//

///////////////////////////////////////////
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

/////////////////////////////
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

/////////////////////////////
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
/*************************************** Tree Handling END */

/////       show page
function showPage(pageID) {
  $("#start").animate({"top": "-50rem"}, 400, function() {
      $("#start").css({"display": "none"});
      $("#startButton").css("display", "block");
      activePage = pageID;
      $(pageID).css({"display": "block"});
  });
}

/////
function initOntoTreeChoose(label, move, labs) {
  let labels;
  if ( labs ) labels = labs;
  else labels = deepFindChildsLabels(label);

  let lastParent = $("#ontoTree-choose").find("#ontoTree-parent").text();
  $("#ontoTree-choose").find("#ontoTree-parent").text(label);

  // clear
  for ( let i = 0; i < ONTO_TREE_ITEMS_NB; i++ ) {
    let item = "#ontoTree-item" + i;
    $("#ontoTree-choose").find(item).css({"border-bottom-width": 0});
    $("#ontoTree-choose").find(item).text("");
    $("#ontoTree-choose").find(item).css({"display": "none"});
  }
  // feel
  for ( let i = 0; i < labels.length; i++ ) {
    let item = "#ontoTree-item" + i;
    $("#ontoTree-choose").find(item).css({"display": "inline-block"});
    $("#ontoTree-choose").find(item).text(labels[i]);
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

// click trash
function trashClick() {
  flagEditTrash = "trash";
}

// click edit
function editClick() {
  flagEditTrash = "edit";
}

////
function sortEvents(date) { // date
  // let test = evoCalEvents;
  let eventIndex = [];
  let eventRank = 0;

  for (let i = 0; i < evoCalEvents.length; i++) {
    if ( evoCalEvents[i].date == calendar.$active.date ) eventIndex[eventRank++] = i;
  }
  let eventNumber = eventIndex.length;

  if ( eventNumber == 0 || eventNumber == 1 ) return;
  let sorted = true;
  let newEvent;

  for ( let i = eventNumber-1; i > 0 ; i-- ) {
    if ( evoCalEvents[eventIndex[i]].name > evoCalEvents[eventIndex[i-1]].name ) return;

    newEvent = evoCalEvents[eventIndex[i]];
    evoCalEvents[eventIndex[i]] = evoCalEvents[eventIndex[i-1]];
    evoCalEvents[eventIndex[i-1]] = newEvent;
    // return;
  }
  // return newEventList; // ?
}

////////////////////////////////////////////////  Fin F U N C T I O N S
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//*********************************************************************
//*********************************************************************
// ********************************************************** R E A D Y
$(document).ready(function () {

/*      open text file from client device   ****************

  <input id="openTxtFileInput" type="file" accept=".txt" style="display:none;">

  <button id="boutInputPhase3" class="btn btn-lg btn-success btn-block"  style="display:none";>Choisir la liste des mots</button>

  // click on #boutInputPhase3
  $("#boutInputPhase3").on("click", function () {
    $("#openTxtFileInput").attr("accept", ".txt");
    $("#openTxtFileInput").trigger("click");
  });

  // lecture fichier .txt pour phase 3
function readFile(ev) {
  var file = ev.target.files[0];
  if ( !file || !( file.name.match(/\.txt$/)) ) return;
  var reader = new FileReader();
  reader.onload = function(ev2) {
    try {
      custom_Phase3 = JSON.parse(ev2.target.result);
      objTest3 = buildObjTab(custom_Phase3);
    } catch (ex) {
      alert("Erreur de lecture: vérifier la syntaxe du fichier");
    }
    $("#openTxtFileInput").val(""); // erase previous value
  };
  reader.readAsText(file);
}

// From GPT
<!DOCTYPE html>
<html>
  <head>
    <title>Load Text File</title>
  </head>
  <body>
    <input type="file" id="file-input">
    <pre id="file-content"></pre>
    <script>
      function loadTextFile() {
        const fileInput = document.getElementById('file-input');
        const fileContent = document.getElementById('file-content');

        fileInput.addEventListener('change', (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();

          reader.onload = () => {
            fileContent.innerText = reader.result;
          };

          reader.readAsText(file);
        });
      }

      loadTextFile();
    </script>
  </body>
</html>

*/

//////////////////////////////////////////////////////////////////////


/////       show start page
$("#start").css({"display": "block"});

/////       open start page
$("#startButton").on("click", function (ev) {
  if ( activePage ) {
    $("#startButton").css("display", "none");
    $(activePage).css("display", "none");
    activePage = "";
    $("#start").css({"display": "block", "top": "-50rem"});
    $("#start").animate({"top": 0}, 400);
  }
});

/////////////////////////////////////////////////   ONTO TREE   /////

/////       show ontoTree-choose page
$("#sheduleButton").on("click", function (ev) {
  showPage("#shedule");
  initOntoTreeChoose(ontoTree[0]);
});

/////       show ontoTree-choose page
$("#paramButton").on("click", function (ev) {
  showPage("#ontoTree-choose");
  initOntoTreeChoose(ontoTree[0]);
});

/////        change ontoTree-parent within ontoTree-choose WITH DIALOG
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
  $("#ontoTree-choose").trigger("click");
});

////////
$("#ontoTree-title").on("click", function (ev) {
  let node = deepFindNodeByLabel($("#ontoTree-parent").text(), ontoTree);
  initOntoTreeChoose(node[2], "down");
});



////////////////////////////////////////// event modal



/////////////////////////////////////////////////   EVO CALENDAR   /////

/////////////////               init evoCalendar

evoCalEvents = JSON.parse(localStorage.getItem('eventList'));

$('#evoCalendar').evoCalendar({
  calendarEvents: evoCalEvents,
  language:'fr',
  todayHighlight: true,
  firstDayOfWeek: 1, // Monday
  sidebarToggler:true,
  sidebarDisplayDefault: false,
  titleFormat:"MM yyyy",
  eventHeaderFormat:"d MM, yyyy",
});

calendar = $('#evoCalendar').get(0).evoCalendar;
// evoCalEvents = JSON.parse(localStorage.getItem('eventList'));

///////////  hide trash on unsel event
$(".calendar-inner, .calendar-sidebar, #sidebarToggler, #eventListToggler").on("click", function (ev) {
  $(".event-trash, .event-edit").css("display", "none");
});


//////////////////////////////////////////////////   selectEvent + edit or trash event
$("#evoCalendar").on('selectEvent',function(activeEvent) {

  let event = activeEvent.handleObj.handler.arguments[1];

  if ( flagEditTrash == "trash") {                          // trash event
    $("#evoCalendar").evoCalendar('removeCalendarEvent', event.id);
    flagEditTrash = "";
    return;
  }

  if ( flagEditTrash == "edit" ) { //     SHOW eventModal     // edit event
    $("#eventModal").attr("data-event-id", event.id); // save event ID in data attr

    //        clear fields
    $("#eventModal").find("#sEventTitle").val("");
    $("#eventModal").find("#sEventTime").val("");
    $("#eventModal").find("#sEventTime2").val("");

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
  console.log(calendar.$active.event_date);
  $("#evoCalendar").evoCalendar('toggleEventList',true);
});

//////////////////////////////////////////////////////    create new event
                                                    //  or update old event

///// show eventModal                     ADD NEW EVENT
$(".event-plus").on("click", function (ev) {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  $("#eventModal").find("#sEventTime").val(`${hours}:${minutes}`);
  $("#eventModal").modal("show");
});

/////                                                READ eventModal
$("#newEventOK").on("click", function (ev) {
  let time = $("#eventModal").find("#sEventTime").val();
  let splitTime = time.split(':');
  time = `${splitTime[0]}h${splitTime[1]}`;

  let time2 = $("#eventModal").find("#sEventTime2").val();
  if ( time2 ) {
    splitTime = time2.split(':');
    time2 = `${splitTime[0]}h${splitTime[1]}`;
    time += ` à ${time2}`;
  }

  let title = $("#eventModal").find("#sEventTitle").val(); // title/description

  if ( flagEditTrash == "edit") {  // update event
    let eventId = $("#eventModal").attr("data-event-id");

    for ( let event of evoCalEvents ) {
      if ( event.id == eventId ) {
        event.description = title;   // title/description;
        event.name = time;   // name/time;
      }
    }
    flagEditTrash = "";
  }

  else {    // new event
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
  }

  $("#eventModal").modal("hide");

  let activeDate = calendar.$active.events[0].date;
  sortEvents( activeDate );
  calendar.selectDate( "01/01/2022" ); // refresh date display
  calendar.selectDate( activeDate );

  localStorage.setItem('eventList', JSON.stringify(evoCalEvents));
});


}); // *********************************************  F I N   R E A D Y
//  *******************************************************************

const ONTO_TREE_ITEMS_NB = 10;

var activePage = "";

var ontoTree = [];
// Array à 2 cases représente un noeud: case 0 = étiquette, 1 = ensemble (Array) des descendants immédiats (fils). Si pas de descendant, l'Array est vide ([]).
// exemple: ["meuble", [["chaise",[]], ["table", []]]

ontoTree = importTree(importData);

var calendar;
var flagEditTrash;
var evoCalEvents;




// *****************************************************  */
/* $(some button).on("click", function (ev) {
  let label = $("#modalOntoTree").find("#ontoTree-title").text();
  let node = deepFindNodeByLabel(label, ontoTree);
  let subLabels = deepFindChildsLabels(label);
  for ( let i = 0; i < ONTO_TREE_ITEMS_NB; i++ ) {
    var item = "#ontoTree-item" + i;
    $("#modalOntoTree").find(item).text(subLabels[i]);
  }
  $("#modalOntoTree").modal("handleUpdate").modal("show");
}); */
// *********************************************************
