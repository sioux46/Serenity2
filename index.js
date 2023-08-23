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
      $(".toolbarButton").css("display", "inline-block");
      activePage = pageID;
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

// click trash
function trashClick() {
  flagEditTrash = "trash";
}

// click edit
function editClick() {
  flagEditTrash = "edit";
}

////
function sortCalendarEvents(date) { // date
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

////
function clearEventModal(ev) {                // clear fields
  $("#eventModal").find("#sEventTitle").val("");
  $("#eventModal").find("#sEventTime").val("");
  $("#eventModal").find("#sEventTime2").val("");
}

////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////  D I A L O G
///////////////////////////////////////////////////

////
function addCalEvent(time, title, date) {
  $("#evoCalendar").evoCalendar('addCalendarEvent', [
    {
      id: '' + Math.random(),
      name: time,                 // time/name
      description: title,
      date: date, // calendar.$active.event_date,
      type: "event",
      color: "#009099", // "#fe7f78",
    }]);
}

////
function questionAnalyse(question) {           // Q U E S T I O N   A N A L Y S E

  if ( !question ) return;
  var reponse = "";

  if ( question.match(/^Monsieur Norbert$/i) ) {
    reponse = "Bonjour Monsieur. Que puij faire pour vous ?";
  }
  //......................................... page change
  else if ( question.match(/(ouvr|affich|montr|voir\s|alle(r|z)\sà)/i) ) {
    if ( question.match(/agenda/i) ) {
      $("#startButton").trigger("click"); $("#sheduleButton").trigger("click");
      reponse = "OK";
    }
    else if ( question.match(/paramètre/i) ) {
      $("#startButton").trigger("click"); $("#paramButton").trigger("click");
      reponse = "OK";
    }
    else if ( question.match(/voyage/i) ) {
      $("#startButton").trigger("click"); $("#voyageButton").trigger("click");
      reponse = "OK";
    }
  }


  //--------------------------------  if reponse
  if ( reponse ) {
    if ( reponseMode == "audio" ) {
      console.log("Réponse audio:");
      doSpeechSynth(reponse);
    }
    else console.log("Réponse texte:"); // afficher dans log
    console.log(reponse);

  }

  else {
    questionAnswer = "chatGPT" ;
    if ( newChat ) {
      chatBuffer = [];
      chatBuffer.push({ role: "system", content: "Vous êtes Norbert, mon chauffeur et mon secrétaire particulier et mon assistant. Je suis votre client. Vous devez répondre gentiment à mes questions et vous devez chercher les réponses sur internet si necessaire." });
      chatBuffer.push({ role: "user", content: "Quel temps fait-il aujourd'hui ?" });
      chatBuffer.push({ role: "assistant", content: "Le temps d'aujourd'hui devrait être ensoleillé avec une température maximale de 25°C." });
      newChat = false;
    }

    // chatBuffer.push({ role: "system", content: "Exprimez-vous dans le style de C3PO, le robot maitre d'hotel de Star Wars" });
    chatBuffer.push({ role: "system", content: "Exprimez-vous comme un chauffeur de maitre" +  reponseStyle + responseDetail });

    chatBuffer.push({ role: "user", content: question });


    //********************************************************** ChatGPT
    // Load globals before call
      chatGPTcall();
    //******************************************************************
  }
}

/////
function chatGPTcall() {       /***** chatGPT call *****/

  $.ajax({
    'url': 'chatGPT.php',
    'type': 'post',
    'data': {
              chatBuffer: JSON.stringify(chatBuffer),
              newChat: JSON.stringify(newChat),
              model: JSON.stringify(reponseModel),
              temperature: JSON.stringify(reponseTemperature),
              style: JSON.stringify(reponseStyle),
              details: JSON.stringify(responseDetail),
            },
    'complete': function(xhr, result) {
      if (result != 'success') {
        alert ( 'Erreur API OpenAI !');
      }
      else {
        var reponse = xhr.responseText;
        console.log("Réponse: " + reponse);
        let assistantMessage = { role: "assistant", content: reponse };
        // assistant response added to buffer, ready for nexte question
        chatBuffer.push(assistantMessage);
        if ( reponseMode == "audio" ) {
          console.log("Réponse audio");
          doSpeechSynth(reponse.replace(/-/g, match => " "));
        }
        else {
          console.log("Réponse texte");
          if ( questionMode == "audio" ) startRecog();
        }
        // return reponse;
      }
    }
  });
}

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
    resetRecog();
  };
  recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        recogResult = event.results[i][0].transcript;
        console.log(recogResult);
        questionAnalyse(recogResult);

      }
    }
  };
  return recognition;
}


////
function startRecog() {
  if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  $("#micButton img").attr("src", "icons/mic-fill.svg");
  recognition.start();
  recognizing = true;
  console.log("Écoute");
}

////
function stopRecog() {
  if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  recognition.stop();
  resetRecog();
  recogResult = "";
}

////
function startStopRecog() { // and stop speech
  if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  if (recognizing) {
    recognition.stop();
    resetRecog();
  }
  else {
    recognition.start();
    recognizing = true;
    console.log("Écoute");
  }
}

////
function resetRecog() {
  recognizing = false;
  recogResult = "";
  console.log("Fin d'écoute");
  $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
  if ( questionMode == "paused" ) {
    console.log("paused");
  }
  else {
    // questionMode = "text";
    // $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
  }
}

////                                         ***  Speech SYTHESIS ***
function doSpeechSynth (text) {
  var ut = new SpeechSynthesisUtterance();
  ut.text = text;
  ut.lang = 'fr-FR';
  ut.rate = 0.97;

  ut.onstart = function(e) {
    if ( questionMode == "audio" ) {
      questionMode = "paused";
      $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
    }
  };

  ut.onend = function(e) {
    recogResult = "";
    if ( questionMode == "paused" && !recognizing ) {
      questionMode = "audio";
      $("#micButton img").attr("src", "icons/mic-fill.svg");
      startRecog();
    }
  };

  window.speechSynthesis.speak(ut);
}

////                            KEYBOARD EVENTS
/* $(document).keydown(function (event) {
  if ( event.which == 32 ) {
    // if ( window.speechSynthesis.paused ) window.speechSynthesis.resume();
    // else window.speechSynthesis.pause();
    if ( window.speechSynthesis.speaking ) window.speechSynthesis.cancel();
  }
}); */

/////////////////////////////////////////////////////
////                             TRIPLE PLAY
function recogChatSynt() {
  startStopRecog();
}




////////////////////////////////////////////////  Fin F U N C T I O N S
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//*********************************************************************
//*********************************************************************
// ********************************************************** R E A D Y
$(document).ready(function () {


//////////////////////////////////////////////////////////////////////


/////       show start page
$("#start").css({"display": "block"});

/////////////////////////////////////////////  toolBar buttons  /////

//                                       open start page
$("#startButton").on("click", function (ev) {
  if ( activePage ) {
    $("#toolBar").css("display", "none");
    $(activePage).css("display", "none");
    activePage = "";
    $("#start").css({"display": "block", "top": "-50rem"});
    $("#start").animate({"top": 0}, 400);
  }
});
//------------------------------------------
//                                             toggle mic
$("#micButton").on("click", function (ev) {
  if ( questionMode == "text" ) {
    questionMode = "audio";
    $("#micButton img").attr("src", "icons/mic-fill.svg");
    if ( !window.speechSynthesis.speaking  && !recognizing ) startRecog();
  }
  else {
    questionMode = "text";
    $("#micButton img").attr("src", "icons/mic-mute-fill.svg");
    stopRecog();
  }
});
//------------------------------------------
//                                          toggle speaker
$("#speakerButton").on("click", function (ev) {
  if ( reponseMode == "text" ) {
    reponseMode = "audio";
    $("#speakerButton img").attr("src", "icons/volume-up-fill.svg");

  }
  else {
    reponseMode = "text";
    $("#speakerButton img").attr("src", "icons/volume-mute-fill.svg");
  }
});

///////////////////////////////////////////////  SHOW PAGES   /////

/////       show shedule page
$("#sheduleButton").on("click", function (ev) {
  showPage("#shedule");
  $("#toolBar").css("display", "block");
  initOntoTreeChoose(ontoTree[0]);
});

/////       show voyage page
$("#voyageButton").on("click", function (ev) {
  showPage("#voyage");
  $("#toolBar").css("display", "block");
  initOntoTreeChoose(ontoTree[0]);
});

/////       show param page
$("#paramButton").on("click", function (ev) {
  showPage("#param");
  $("#toolBar").css("display", "block");
  initOntoTreeChoose(ontoTree[0]);
});

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



////////////////////////////////////////// event modal



/////////////////////////////////////////////////   EVO CALENDAR   /////

/////////////////               init evoCalendar

if ( localStorage.eventList ) {
  evoCalEvents = JSON.parse(localStorage.getItem('eventList'));
}
else evoCalEvents = [];

$('#evoCalendar').evoCalendar({
  calendarEvents: evoCalEvents,
  language:'fr',
  todayHighlight: true,
  firstDayOfWeek: 1, // Monday
  sidebarToggler:true,
  sidebarDisplayDefault: false,
  eventDisplayDefault: true,
  titleFormat:"MM yyyy",
  eventHeaderFormat:"d MM yyyy",
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
  console.log(calendar.$active.event_date);
  $("#evoCalendar").evoCalendar('toggleEventList',true);
});

//////////////////////////////////////////////////////    create new event
                                                    //  or update old event

///// show eventModal                     ADD NEW EVENT
$(".event-plus").on("click", function (ev) {
  clearEventModal();
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
//  $("#eventModal").find("#sEventTime").val(`${hours}:${minutes}`);
  $("#eventModal").modal("show");
});

/////                                                READ eventModal
$("#newEventOK").on("click", function (ev) {

  let title = $("#eventModal").find("#sEventTitle").val(); // title/description
  let val = $("#sEventTime").val();
  let val2 = $("#sEventTime2").val();

  if ( val2  &&  val2 < val ) {
    $("#sEventTime2").val(val);
    return;
  }
  if ( !val && val2 ) {
    $("#sEventTime").val(val2);
    return;
  }
  if ( !val && !val2 && !title ) return;

  let time = $("#eventModal").find("#sEventTime").val();
  let splitTime = time.split(':');
  time = `${splitTime[0]}h${splitTime[1]}`;

  let time2 = $("#eventModal").find("#sEventTime2").val();
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

  $("#eventModal").modal("hide");   // HIDE MODAL

  let activeDate = calendar.$active.events[0].date;
  sortCalendarEvents( activeDate );
  calendar.selectDate( "01/01/2022" ); // refresh date display
  calendar.selectDate( activeDate );

  localStorage.setItem('eventList', JSON.stringify(evoCalEvents));
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

$("#micButton img").attr("src", "icons/mic-mute-fill.svg");
$("#micButton").css("background-color", "yellow !important");
$("#speakerButton img").css("src", "icons/volume-mute-fill.svg");

//                                      calendar

var calendar;     // exemple: calendar.getActiveDate();
var evoCalEvents;
$(".calendar-sidebar > .calendar-year").css("padding", "20px");

var flagEditTrash;

var questionAnswer = "chatGPT"; // chatGPT v DEVA

var questionMode = "text"; // audio v text
var reponseMode = "text"; // audio v text

//                              init SpeechRecognition
var recognizing = false;
var recognition = initRecognition();
var recogResult = "";
//                              init ChatGPT
var chatBuffer = [];
var newChat = true;
var reponseModel = 'gpt-3.5-turbo-0613';
var responseDetail = " de façon peu détaillée. ";
// var responseDetail = ". ";
var reponseStyle = " ";
// var reponseStyle = " dans le style de C3PO, le robot maitre d'hotel de Star Wars ";
var reponseTemperature = 0.5;
