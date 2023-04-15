// index.js

////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// F U N C T I O N S
////////////////////////////////////////////////////////////////////

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

/////       show ontoTree-choose page
function showOntoTreeChoose(label) {

}

/////
function initOntoTreeChoose(label, labs) {
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
    $("#ontoTree-choose").find(item).css({"display": "inline-block"});      $("#ontoTree-choose").find(item).text(labels[i]);
  }
  // animate
  $(".ontoTree-content").css({"top": "50em"});
  $(".ontoTree-content").animate({"top": 0}, 400);
}

////////////////////////////////////////////////  Fin F U N C T I O N S
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//*********************************************************************
//*********************************************************************
// ********************************************************** R E A D Y
$(document).ready(function () {

/////       show start page
  $("#start").css({"display": "block"});

/////       show ontoTree-choose page
$("#pretravel").on("click", function (ev) {
  $("#start").css({"display": "none"});
  $("#ontoTree-choose").css({"display": "block"});
  initOntoTreeChoose("BESOINS");
});

/////        change ontoTree-parent in ontoTree-choose
$("#ontoTree-parent").on("click", function (ev) {
  $("#inputModal").modal("show");
  $("#inputModal").find("input").focus();
});

/////        change ontoTree-btn list
$(".ontoTree-btn").on("click", function(ev) {
  let label = $(this).text();
  initOntoTreeChoose(label);
});

/////         handling modal INPUT choose label
$("#inputModalChooseLabelOK").on("click", function (ev) {
  let newLabel = $("#inputModal").find("input").val();
  if ( !newLabel ) newLabel = "BESOINS";
  $("#inputModal").modal("hide");
  initOntoTreeChoose(newLabel);
});

/////         handling modal  BUTTON PARENT choose label
$("#buttonParentModalChooseLabel").on("click", function (ev) {
  let node = deepFindNodeByLabel($("#ontoTree-parent").text(), ontoTree);
  $("#inputModal").modal("hide");
  initOntoTreeChoose(node[2]);
});

////////
$(".ontoTree-btn").on("mouseup", function (ev) {
  $("#ontoTree-choose").trigger("click");
});

}); // *********************************************  F I N   R E A D Y
//  *******************************************************************

const ONTO_TREE_ITEMS_NB = 10;
var ontoTree = [];
// Array à 2 cases représente un noeud: case 0 = étiquette, 1 = ensemble (Array) des descendants immédiats (fils). Si pas de descendant, l'Array est vide ([]).
// exemple: ["meuble", [["chaise",[]], ["table", []]]

ontoTree = importTree(importData);




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
