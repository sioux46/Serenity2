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

  label = importData[0][0];
  outData[0] = label;
  outData[1] = [];
  nearestParents[0] = outData;

  for ( let lig = 1; lig < inData.length; lig++ ) {
    ligData = inData[lig];
    level = ligData.length-1;
    label = ligData[level];

    newNode = [];
    newNode[0] = label;
    newNode[1] = [];

    parent = nearestParents[level -1];
    parent[1].push(newNode);
    nearestParents[level] = newNode;
  }

  return Array.from(outData);
}
//
/*************************************** Tree Handling END */



function initOntoTreeChoose(label, labels) {
  $("#ontoTree-choose").find("#ontoTree-parent").text(label);
// clear
  for ( let i = 0; i < 7; i++ ) {
    let item = "#ontoTree-item" + i;
    $("#ontoTree-choose").find(item).text("");
    $("#ontoTree-choose").find(item).css({"display": "none"});
  }
// feel
  for ( let i = 0; i < 7; i++ ) {
    let item = "#ontoTree-item" + i;
    if ( labels[i] ) {
      $("#ontoTree-choose").find(item).css({"display": "inline-block"});
      $("#ontoTree-choose").find(item).text(labels[i]);
    }
  }
}

////////////////////////////////////////////////  Fin F U N C T I O N S
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//*********************************************************************
//*********************************************************************
// ********************************************************** R E A D Y
$(document).ready(function () {

  $("#start").css({"display": "block"});
  // $("#modalOntoTree").find("#ontoTreeTitle").text([ontoTree[1][0][0]]);


// *****************************************************  */
/* $(some button).on("click", function (ev) {
  let label = $("#modalOntoTree").find("#ontoTree-title").text();
  let node = deepFindNodeByLabel(label, ontoTree);
  let subLabels = deepFindChildsLabels(label);
  for ( let i = 0; i < 7; i++ ) {
    var item = "#ontoTree-item" + i;
    $("#modalOntoTree").find(item).text(subLabels[i]);
  }
  $("#modalOntoTree").modal("handleUpdate").modal("show");
}); */
// *********************************************************

/////       show ontoTree-choose
$("#pretravel").on("click", function (ev) {
  $("#start").css({"display": "none"});
  $("#ontoTree-choose").css({"display": "block"});
  // initOntoTreeChoose(ontoTree[0], deepFindChildsLabels(ontoTree[0]));
  initOntoTreeChoose("CAPACITES", deepFindChildsLabels("CAPACITES"));
});
/////        change ontoTree-parent in ontoTree-choose
$("#ontoTree-parent").on("click", function (ev) {
  $("#inputModal").modal("show");
  $("#inputModal").find("input").focus();
});

/////         handling modal input
$("#inputModal").find("#inputModalOK").on("click", function (ev) {
  let newLabel = $("#inputModal").find("input").val();
  $("#inputModal").modal("hide");
  initOntoTreeChoose(newLabel, deepFindChildsLabels(newLabel));
});

}); // *********************************************  F I N   R E A D Y
//  *******************************************************************

var ontoTree = [];
// Array à 2 cases représente un noeud: case 0 = étiquette, 1 = ensemble (Array) des descendants immédiats (fils). Si pas de descendant, l'Array est vide ([]).
// exemple: ["meuble", [["chaise",[]], ["table", []]]

ontoTree = importTree(importData);
