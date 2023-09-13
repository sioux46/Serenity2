// index.js
//
// Nomenclature : [Années depuis 2020].[Mois].[Jour].[Nombre dans la journée]
var devaVersion = "v3.09.12.1";

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


// ************************************** Tree Handling START
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
// ************************************** Tree Handling END

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
function clearEventModal(ev) {                // clear cal fields
  $("#eventModal").find("#sEventTitle").val("");
  $("#eventModal").find("#sEventTime").val("");
  $("#eventModal").find("#sEventTime2").val("");
}

////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////  D I A L O G
///////////////////////////////////////////////////

////
// time: name, description: description, date: date
// Collecting agenda events the send to ChatGPT
function collectEvents() {
  let events = [];
  let content = "";
  for ( let event of evoCalEvents ) {
    content = "Ajoutez un rendez-vous à mon agenda pour le " + dayFromDate(event.date) + " " + dateFromDate(event.date);
    if ( event.name ) {
      if ( event.name.match(/à/) ) content += " de " + event.name;
      else content += " à " + event.name;
    }
    if ( event.description ) content += " motif: " + event.description + ".";
    else content += ".";
    events.push({ role: "user", content: content});

    content = "Rendez-vous ajouté pour le " + dayFromDate(event.date) + " " + dateFromDate(event.date);
    if ( event.name ) {
      if ( event.name.match(/à/) ) content += " de " + event.name;
      else content += " à " + event.name;
    }
    events.push({ role: "assistant", content: content});
  }

  return events;
}

////
// time: name, description: description, date: date
function addCalEvent(time, description, date) {
  $("#evoCalendar").evoCalendar('addCalendarEvent', [
    {
      id: '' + Math.random(),
      name: time,                 // time/name
      description: description,
      date: date, // calendar.$active.event_date,
      type: "event",
      color: "#009099", // "#fe7f78",
    }]);

    //sortCalendarEvents( date );
    //localStorage.setItem('eventList', JSON.stringify(evoCalEvents));
}

/////////////////////////////////////////////////////////////////////////////////
////
function questionAnalyse(question) {   // ********************** Q U E S T I O N   A N A L Y S E *********
  if ( !question ) return;
  console.log("question: " + question);
  let prevResponse;
  if ( response ) prevResponse = response.replace(/"/g, ' '); // quotes sup
  response = ""; // global



  if ( question.match(new RegExp("^Merci " + assistantName, 'i'))) { // stopRecog handled in fillLog()
    response = "Je vous en pris";
  }
  else if ( question.match(new RegExp("^Bonjour " + assistantName, 'i'))) {
    response = "Bonjour " + userName + ". Que puij faire pour vous ?";
  }

  //////////////////////////////////////////////////////////////////  Q U E S T I O N   a n a l y s e
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


    else if ( question.match(/paramètre/i) ) {
      $("#startButton").trigger("click"); $("#paramButton").trigger("click");
      response = "OK";
    }
    else if ( question.match(/voyage/i) ) {
      $("#startButton").trigger("click"); $("#voyageButton").trigger("click");
      response = "OK";
    }
  }


  //--------------------------------  if reponse
  if ( response ) {

    if ( reponseMode != "text" ) {
      console.log("Réponse audio:");
      doSpeechSynth(response);
    }
    else {
      console.log("Réponse texte:");
    }
    console.log(response);
    fillLog("response", response);
  }

  else {                                   //            send question to ChatGPT
    questionAnswer = "chatGPT" ;
    console.log("Réponse chatGPT");
    if ( question.match(/à (mon|l') agenda/) ) question.replace(/à (mon|l') agenda/, "");

    chatBuffer = [];
    if ( newChat ) {
      postChatBuffer = [];
      newChat = false;
    }


    chatBuffer.push({ role: "system", content: "Vous êtes " + assistantName + ", mon chauffeur et mon secrétaire particulier et mon assistant. Je suis votre client. Appelez-moi " + userName + ".  Vous devez répondre à mes questions." });
    // chatBuffer.push({ role: "user", content: "Quel temps fait-il aujourd'hui à Paris ?" });
    // chatBuffer.push({ role: "assistant", content: "A Paris, le temps d'aujourd'hui devrait être ensoleillé avec une température maximale de 25 degrès." });
    // chatBuffer.push({ role: "user", content: "Et demain ?" });
    // chatBuffer.push({ role: "assistant", content: "Demain à Paris, le temps devrait être pluvieux avec une température moyenne de 19 degrès." });
    chatBuffer.push({ role: "system", content: "Répondez " +  responseStyle + " " + responseDetail + "." });

    // date et heure
    chatBuffer.push({ role: "system", content: "Aujourd'hui, nous sommes le " + actualDate() + ". Le jour de la semaine est " + actualDay(actualDate()) + "." });
    chatBuffer.push({ role: "system", content: "L'heure actuelle est " + actualTime() + "." });

    chatBuffer.push({ role: "system", content: "Demain nous serons le " + nextDayDate(actualDate()) + ". Le jour de la semaine pour demain est " + actualDay(nextDayDate(actualDate())) + "." });
    chatBuffer.push({ role: "system", content: "Après-demain nous serons le " + nextDayDate(nextDayDate(actualDate())) + ". Le jour de la semaine pour après-demain est " + actualDay(nextDayDate(nextDayDate(actualDate()))) + "." });

    // consigne agenda
    chatBuffer.push({ role: "system", content: "Vous gérez mon agenda. Vous ajoutez et supprimez des rendez-vous dans mon agenda quand je vous le demande." });

    chatBuffer.push({ role: "user", content: "Supprimez tous les rendez-vous de mon agenda." });
    chatBuffer.push({ role: "assistant", content: "Tous les rendez-vous de votre agenda ont été supprimés. Votre agenda est vide" });

    chatBuffer.push({ role: "user", content: "Ajoutez un rdv à mon agenda pour le premier janvier 2024 à 9 heure, motif: Diane picine" });
    chatBuffer.push({ role: "assistant", content: "Rendez-vous ajouté pour le lundi premier janvier 2024 à 9 heure, motif: Picine avec Diane" });

    chatBuffer.push({ role: "user", content: "Supprimez mon rdv pour le premier janvier avec Diane" });
    chatBuffer.push({ role: "assistant", content: "Rendez-vous supprimé pour le lundi premier janvier 2024 à 9 heure, motif: Picine avec Diane" });

    chatBuffer.push({ role: "user", content: "Ajoutez un rendez-vous pour après-demain à 9h, motif: dentiste" });
    chatBuffer.push({ role: "assistant", content: "Rendez-vous ajouté pour le " +  actualDay(nextDayDate(nextDayDate(actualDate()))) + " " + nextDayDate(nextDayDate(actualDate())) + " à 9h, motif: dentiste" });

    chatBuffer.push({ role: "system", content: "Si l'heure du rendez-vous n'est pas donnée, demandez l'heure"});
    chatBuffer.push({ role: "user", content: "Ajouter un rendez-vous pour aujourd'hui"});
    chatBuffer.push({ role: "assistant", content: "A quelle heure souhaitez-vous ajouter ce rendez-vous ?"});

    chatBuffer.push({ role: "system", content: "Si le motif du rendez-vous n'est pas donnée, demandez le motif"});
    chatBuffer.push({ role: "user", content: "Ajouter un rendez-vous pour aujourd'hui à 9h"});
    chatBuffer.push({ role: "assistant", content: "Quel est le motif de ce rendez-vous ?"});

    // ajout de l'agenda
    chatBuffer = chatBuffer.concat(collectEvents());

    //chatBuffer.push({ role: "system", content: "Vous gérez mon agenda. Vous ajoutez, suppimer les rendez-vous que je vous communique. Vous répondez aux question sur ces rendez-vous." });
    chatBuffer.push({ role: "system", content: "Quand vous répondez au sujet d'un rendez-vous, donnez toujour le jour, le mois, l'année, l'heure et le motif."});
    chatBuffer.push({ role: "system", content: "Quand je vous demande d'ajouter, de supprimer, ou de lister des rendez-vous, répondez toujour en précisant le jour, le mois, l'année, l'heure et le motif du rendez-vous." });

    chatBuffer.push({ role: "system", content: "Si le rendez-vous est pour aujourd'hui, répondez en donnant le jour et la date d'aujourd'hui." });

    chatBuffer.push({ role: "user", content: "Ajoutez un rendez-vous pour aujourd'hui à 9h, motif: cinéma avec Annick" });
    chatBuffer.push({ role: "assistant", content: "Rendez-vous ajouté pour le " +  actualDay((actualDate())) + " " + actualDate() + " à 9h, motif: cinéma avec Annick" });

    chatBuffer.push({ role: "user", content: "Supprimez ce dernier rdv" });
    chatBuffer.push({ role: "assistant", content: "Rendez-vous supprimé pour le " + actualDay((actualDate())) + " " + actualDate() + " à 9h, motif: Picine avec Diane" });

///////

    postChatBuffer.push({ role: "user", content: question }); // real chat part

    globalChatBuffer = chatBuffer.concat(postChatBuffer);  // send to GPT


    // ********************************************************** ChatGPT
    // Load globals before call
      chatGPTcall();
    // ******************************************************************
  }
}

/////
function chatGPTcall() {       // **** chatGPT call ****

  waitingForGPT = true;
  $.ajax({
    'url': 'chatGPT.php',
    'type': 'post',
    'data': {
              chatBuffer: JSON.stringify(globalChatBuffer),
              // newChat: JSON.stringify(newChat),
              model: JSON.stringify(reponseModel),
              temperature: JSON.stringify(parseFloat(reponseTemperature)),
              style: JSON.stringify(responseStyle),
              details: JSON.stringify(responseDetail),
            },
    'complete': function(xhr, result) {
      waitingForGPT = false;
      if (result != 'success') {
        console.log("Fatal error API OpenAI!!!!");
      }
      else {
        var reponse = xhr.responseText;
        fillLog("response", reponse);
        console.log("Réponse: " + reponse);

        if ( reponse.match(/^Error/) ) {
          console.log("Error API OpenAI !");
        }
        else {
          let assistantMessage = { role: "assistant", content: reponse };

          // assistant response added to buffer, ready for nexte question
          postChatBuffer.push(assistantMessage);
          handleResponse(reponse);
        }

        if ( reponseMode == "audio" ) {
          console.log("Réponse audio");
          doSpeechSynth(reponse.replace(/-/g, match => " ")); // hypen don't work
        }
        else {
          console.log("Réponse texte");
          if ( questionMode == "audio" && !reponse.match(/^Error/) ) startRecog();
        }
        response = reponse; // local to glob

      }
    }
  });
}

/////////////////////////////////////////////////////////////////////////// R E S P O N S E    a n a l y s e
////
function handleResponse(reponse) {
  let rep = reponse;
  let action = "";
  let time = "";
  let description = "";
  if ( rep.match(/(ajouté|ajouter|nouveau rendez-vous)/i) ) action = "add";
  else if ( rep.match(/(supprimé|enlevé)/i) ) action = "remove";

  if ( action ) {
    if ( rep.match(/Premier/i) ) rep = rep.replace(/Premier/i, "01");
    if ( rep.match(/1er/i) ) rep = rep.replace(/1er/i, "01");

    let dateForEvo;
    let date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
    if ( date ) dateForEvo = chatToEvoDate(date);
    else {
      if ( rep.match(/aujourd'hui/) ) {
        rep = rep.replace(/aujourd'hui/, actualDate());
        date = rep.match(new RegExp("(\\d{1,2}).*(" + frenchMonthNamesForRegExp() + ")(.*)", 'i'));
        if ( date ) dateForEvo = chatToEvoDate(date);
        else return; // no date
      }
    }

    if ( action == "add") {
      let hours = rep.match(/(\d{1,2})h/i);
      if ( !hours ) return;
      hours = hours[1];

      if ( hours.length == 1 ) hours = "0" + hours;

      let minutes = rep.match(/(\d{1,2})h(\d{1,2})/i);
      if ( minutes ) {
        minutes = minutes[2];
        if ( minutes.length == 1 ) minutes = "0" + minutes;
        time = hours + "h" + minutes;
      }
      else time = hours + "h";

      console.log(time);
    }
    if ( rep.match(/ajouté à votre agenda/) ) rep = rep.replace(/ajouté à votre agenda/, "");

    description = date[3];
    if ( description.match(/\d{4}/) ) description = description.replace(/\d{4}/, "");
    if ( description.match(/^\s+à\s+/) ) description = description.replace(/^\s+à\s+/, "");
    if ( description.match(/\d{1,2}h\d{1,2}/i) ) description = description.replace(/\d{1,2}h\d{1,2}/i, "");
    if ( description.match(/\d{1,2}h/i) ) description = description.replace(/\d{1,2}h/i, "");
    if ( description.match(/,\s+/) ) description = description.replace(/,\s+/, "");
    if ( description.match(/motif:\s+/) ) description = description.replace(/motif:\s+/i, "");
    if ( description.match(/motif\s+/) ) description = description.replace(/motif\s+/, "");
    if ( description.match(/\.$/) ) description = description.replace(/\.$/, "");

    console.log(description);
    console.log(dateForEvo);

    if ( action == "add" ) $('#evoCalendar').evoCalendar('addCalendarEvent', addCalEvent(time, description, dateForEvo));

    else if (action == "remove") {
      for ( let event of evoCalEvents ) {
        if ( event.date != dateForEvo ) continue;
        if ( event.name == time || event.name.match(RegExp(time)) ) {
          $('#evoCalendar').evoCalendar('removeCalendarEvent', event.id);
        }
      }
    }
    sortCalendarEvents( dateForEvo );
    localStorage.setItem('eventList', JSON.stringify(evoCalEvents));
    // newChat = true;

  }
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
        fillLog("question", recogResult);
        questionAnalyse(recogResult);

      }
    }
  };
  return recognition;
}


////
function startRecog() {
  if ( window.speechSynthesis.speaking ) return;
  $("#micButton img").attr("src", "icons/mic-fill.svg");
  $("#micButton").css("border", "3px solid #fa0039");
  try { recognition.start(); recogResult = "waitinggggg"; } catch(e) {}
  recognizing = true;
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
  speechSynthesis.cancel(); // removes anything 'stuck'

  if ( !voices ) {
    voices = speechSynthesis.getVoices();
    // actualVoice = voices[0]; // Rocko
  }

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
  else  {
    $("#logTextarea").val( $("#logTextarea").val() + "> " + assistantName + ": " + text );
    document.getElementById("logTextarea").scrollTop = document.getElementById("logTextarea").scrollHeight;
    if ( text == "Je vous en pris" ) {
    questionMode = "audio";
    $("#micButton").trigger("click");
    $("#micButton").trigger("click");
    $("#micButton").trigger("click");
  }
  }
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

/////////////////////////////////////////////////////   DATE @ TIME

////
function frenchMonthNamesForRegExp() {
  return "janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre";
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

////
function chatToEvoDate(date) {
  // date[0]  "30 août 2023"
  d = date;
  const monthNum = {
    "janvier": "01", "février": "02", "mars": "03", "avril": "04", "mai": "05", "juin": "06", "juillet": "07", "août": "08", "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12" };

  if ( d[1].length == 1 ) d[1] = "0" + d[1];
  if ( d[2].length == 1 ) d[2] = "0" + d[2];

  let year = date[0].match(/(\d{4})/)[1];
  if ( !year ) year = actualDate().match(/(\d{4})/)[1];

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

  console.log("Heure à Paris : " + `${heures}:${minutes}:${secondes}`);
  return `${heures}:${minutes}:${secondes}`;
}


////////////////////////////////////////////////  Fin F U N C T I O N S
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// *********************************************************************
// *********************************************************************
// ********************************************************** R E A D Y
$(document).ready(function () {

$("#devaVersion").text(devaVersion);
//////////////////////////////////////////////////////////////////////


/////       show start page
$("#start").css({"display": "block"});
/////        get voices
if ( window.speechSynthesis ) { // if not android webview
speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();
});
}
////////////////////////////////////////////////////  TOOLBAR BUTTONS

//                                                      toggle mic
$("#micButton").on("click", function (ev) {
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

///////////////////////////////////////////////  DIALOG OFFCANVAS /////

$("#chatParamButton").on("click", function(e) {
  $("#chatParamUserName").val(userName);
  $("#chatParamAssistantName").val(assistantName);
  $("#chatParamStyle").val(responseStyle);
  $("#chatParamDetail").val(responseDetail);
  $("#chatParamTemperature").val(reponseTemperature);
  $("#chatParamSpeechRate").val(speechRate);
  $("#chatParamSpeechPitch").val(speechPitch);
});

$("#chatParamUserName").on("change", function (e) {
  if ( userName != $("#chatParamUserName").val() ) {
    $("#logButton").trigger("click");
  }
  userName = $("#chatParamUserName").val();
  localStorage.setItem('userName', JSON.stringify(userName));
});
$("#chatParamAssistantName").on("change", function (e) {
  if ( assistantName != $("#chatParamAssitantName").val() ) {
    $("#logButton").trigger("click");
  }
  assistantName = $("#chatParamAssistantName").val();
  localStorage.setItem('assistantName', JSON.stringify(assistantName));
  });
$("#chatParamStyle").on("change", function (e) {
  responseStyle = $("#chatParamStyle").val();
  localStorage.setItem('responseStyle', JSON.stringify(responseStyle));
});
$("#chatParamDetail").on("change", function (e) {
  responseDetail = $("#chatParamDetail").val();
  localStorage.setItem('responseDetail', JSON.stringify(responseDetail));
});
$("#chatParamTemperature").on("change", function (e) {
  reponseTemperature = $("#chatParamTemperature").val();
  localStorage.setItem('reponseTemperature', JSON.stringify(reponseTemperature));
});

$("#chatParamSpeechRate").on("change", function (e) {
  speechRate = $("#chatParamSpeechRate").val();
  localStorage.setItem('speechRate', JSON.stringify(speechRate));
});

$("#chatParamSpeechPitch").on("change", function (e) {
  speechPitch = $("#chatParamSpeechPitch").val();
  localStorage.setItem('speechPitch', JSON.stringify(speechPitch));
});

$("#questionButton").on("click", function(e) {
  let question = $("#questionTextarea").val();
  if ( question ) {
    fillLog("question", question);
    $("#questionTextarea").val("");
    questionAnalyse(question);
  }
});

$("#logButton").on("click", function(e) {
  $("#logTextarea").val("");
  newChat = true;
});

///////////////////////////////////////////////  SHOW PAGES   /////

/////                        open start page
$("#startButton").on("click", function (ev) {
  if ( activePage ) {
    $("#startButton").css("display", "none");
    $("#toolBar").css("display", "block");
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
  showPage("#paramPage");
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



////////////////////////////////////////////////////////////////   EVO CALENDAR   /////

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
  sidebarToggler:false,
  sidebarDisplayDefault: false,
  eventListToggler: false,
  eventDisplayDefault: true,
  titleFormat:"MM yyyy",
  eventHeaderFormat:"d MM yyyy",
});

calendar = $('#evoCalendar').get(0).evoCalendar;
// evoCalEvents = JSON.parse(localStorage.getItem('eventList'));

///////////// manage/hide togglers
$(".calendar-table th").on("click", function(e) {
  $("#evoCalendar").evoCalendar('toggleSidebar');
});

// disable toggler buttons
$("#sidebarToggler").css("display","none");
$("#eventListToggler").css("display","none");

$('#evoCalendar').evoCalendar('toggleEventList', true); // show eventList on startup

///////////  hide trash on unsel event
$(".calendar-inner, .calendar-sidebar, #sidebarToggler, #eventListToggler").on("click", function (ev) {
  $(".event-trash, .event-edit").css("display", "none");
});

$(".calendar-year").find("p").on("click", function (e) {
  $('#evoCalendar').evoCalendar('toggleSidebar');
});

$(".month").on("click", function(e) {
  $('#evoCalendar').evoCalendar('toggleEventList', false);
  $('#evoCalendar').evoCalendar('toggleSidebar', false);
});

//////////////////////////////////////////////////   selectEvent + edit or trash event
$("#evoCalendar").on('selectEvent',function(activeEvent) {

  let event = activeEvent.handleObj.handler.arguments[1];

  if ( flagEditTrash == "trash") {                          // trash event
    $("#evoCalendar").evoCalendar('removeCalendarEvent', event.id);
    localStorage.setItem('eventList', JSON.stringify(evoCalEvents));
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

  if ( !val ) return;

  if ( !title ) return;

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

//                              init speechSynthesis
var response;
var voices;
var actualVoice;
var speechFlag = true; // init speech
var speechRate = 1;
var speechPitch = 1;

//                              init ChatGPT
var chatBuffer = [];
var postChatBuffer = [];
var globalChatBuffer = [];

var newChat = true;
var waitingForGPT = false;

//                        Paramètres chatGPT
var reponseModel = 'gpt-3.5-turbo-16k-0613'; // 'gpt-3.5-turbo-0613';  //'gpt-4'; //   'gpt-4-0613'; //
var reponseTemperature;
var userName;
var assistantName;
var responseStyle;
// var responseStyle = " dans le style de C3PO, le robot maitre d'hotel de Star Wars"
var responseDetail;

if ( localStorage.responseStyle ) {
  responseStyle = JSON.parse(localStorage.getItem('responseStyle'));
}
else responseStyle = " ";

if ( localStorage.responseDetail ) {
  responseDetail = JSON.parse(localStorage.getItem('responseDetail'));
}
else responseDetail = " de façon concise ";

if ( localStorage.userName ) {
  userName = JSON.parse(localStorage.getItem('userName'));
}
else userName = "Monsieur";

if ( localStorage.assistantName ) {
  assistantName = JSON.parse(localStorage.getItem('assistantName'));
}
else assistantName = "Norbert";

if ( localStorage.reponseTemperature ) {
  reponseTemperature = JSON.parse(localStorage.getItem('reponseTemperature'));
}
else reponseTemperature = 0;

if ( localStorage.speechRate ) {
  speechRate = JSON.parse(localStorage.getItem('speechRate'));
}
else speechRate = 1;

if ( localStorage.speechPitch ) {
  speechPitch = JSON.parse(localStorage.getItem('speechPitch'));
}
else speechPitch = 1;
