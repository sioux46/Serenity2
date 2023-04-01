// index.js

////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// F U N C T I O N S
////////////////////////////////////////////////////////////////////

function importTree(inData) {
/*////////
let test = importTree(importData)
/////////*/
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

////////////////////////////////////////////////  Fin F U N C T I O N S
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//*********************************************************************
//*********************************************************************
// ********************************************************** R E A D Y
$(document).ready(function () {




}); // ******************************************************  F I N   R E A D Y
//  ****************************************************************************

// var treeTest = [{a: [{b: []}, {c: []}, {d: [{e: []}]}]}];

          var ttest = ['a', [['b', []], ['c', []], ['d', [['e', []]]]]];

var importData = [
  ["BESOINS"],
  ["","PERSONNE"],
  ["","","CONDUCTEUR"],
  ["","","","CAPACITES"],
  ["","","","","VISUELLES"],
  ["","","","","","Acuité visuelle"],
  ["","","","","","Daltonisme"],
  ["","","","","","Sensibilité contrastes"],
  ["","","","","AUDITIVES"],
  ["","","","","ATTENTION"],
  ["","","","","REFLEXES"],
  ["","","","","PHYSIQUES"],
  ["","","","","LOGIQUE"],
  ["","","","","MECANIQUE"],
  ["","","","PERSONNALITE"],
  ["","","","","Calme"],
  ["","","","","Tendu"],
  ["","","","","Imprudent"],
  ["","","","","Agité"],
  ["","","","","Triste"]
];

var ontoTree = [];
// Array à 2 cases représente un noeud: case 0 = étiquette, 1 = ensemble (Array) des descendants immédiats (fils). Si pas de descendant, l'Array est vide ([]).
// exemple: ["meuble", [["chaise",[]], ["table", []]]
