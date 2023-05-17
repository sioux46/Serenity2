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
  $("#start").animate({"top": "-50rem"}, 300, function() {
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

    $("#ontoTree-content").animate({"top": 0}, 300);
  }
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
    $("#start").animate({"top": 0}, 300);
  }
});

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

/////        change ontoTree-parent within ontoTree-choose
$("#ontoTree-parent").on("click", function (ev) {
  $("#inputModal").modal("show");
  // $("#inputModal").find("input").focus();
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

///////////////////////////////////////   EVO CALENDAR   /////
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

/*
$("#evoCalendar").evoCalendar('addCalendarEvent', [
  {
    id: "event1",
    name:"21h-23h",
    description: "Prendre Pierre et Paul et Jacques",
    date:"05/15/2023",
    type:"birthday",
    color:"#b44"
  }
]);
*/

$(".calendar-body, #sidebarToggler, #eventListToggler").on("click", function (ev) {
  $(".event-trash").css("display", "none");
});

$("#evoCalendar").on('selectEvent',function(activeEvent) {  // selectEvent
  //prompt(calendar.$current.date);
  //alert(activeEvent.handleObj.handler.arguments[1].id);
  console.log("selectEvent");
  $(".event-container").children(".event-trash").css("display", "none");
  $(".event-container:hover").children(".event-trash").css("display", "block");

});

$("#evoCalendar").on('selectDate',function(newDate, oldDate) {
  //prompt($('#evoCalendar').get(0).evoCalendar.$current.date);
  $("#evoCalendar").evoCalendar('toggleEventList',true);

});

$(".event-plus").on("click", function (ev) {
  let event = prompt("Nouvel event");
  $("#evoCalendar").evoCalendar('addCalendarEvent', [
    {
      id: '' + Math.random(),
      name: "24h",
      description: event,
      date: calendar.$active.event_date,
      type: "event",
      color: "#fe7f78",
      tata: "test"
    }
  ]);


//  $("#evoCalendar").evoCalendar('removeCalendarEvent', eventID);


});


// prompt("Je n'ai rien entendu."); alert("Je n'ai rien entendu.")

}); // *********************************************  F I N   R E A D Y
//  *******************************************************************

const ONTO_TREE_ITEMS_NB = 10;

var activePage = "";

var ontoTree = [];
// Array à 2 cases représente un noeud: case 0 = étiquette, 1 = ensemble (Array) des descendants immédiats (fils). Si pas de descendant, l'Array est vide ([]).
// exemple: ["meuble", [["chaise",[]], ["table", []]]

ontoTree = importTree(importData);

var calendar;




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
