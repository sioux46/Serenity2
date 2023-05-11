evoCalEvents = [
  {
    id:"required-id-1",
    name:"New Year",
    date:"Tue May 02 2023 00:00:00 GMT-0800 (Pacific Standard Time)",
    type:"holiday",
    everyYear:true
  },
  {
    id:"required-id-2",
    name:"Valentine's Day",
    date:"Fri Feb 14 2023 00:00:00 GMT-0800 (Pacific Standard Time)",
    type:"holiday",
    everyYear:true,
    color:"#222"
  },
  {
    id:"required-id-3",
    name:"Custom Date",
    badge:"08/03-08/05",
    date: ["August/03/2023","August/05/2023"],
    description:"Description here",
    type:"event"
  }
];


// console.error(persons[1].telephones[0].type) ---> fixe
var persons = [
////////////////////////////////////
  {
    "nom": "Dupont",
    "prenom": "Jean",
    "age": 32,
    "rue": "rue des Lilas",
    "ville": "Paris",
    "pays": "France",
    "fixe": "01 23 45 67 89",
    "mobile": "06 12 34 56 78",
    "email": "jean.dupont@example.com"
  },
/////////////////////////////////////
    {
    "nom": "Dubois",
    "prenom": "Alain",
    "age": 45,
    "rue": "rue du Pont",
    "ville": "Lyon",
    "pays": "France",
    "fixe": "01 23 45 67 89",
    "mobile": "06 12 34 56 78",
    "email": "alain.dubois@toto.com"
  }
///////////////////////////////////
];

var importData = [
  ["BESOINS"],
  ["","PERSONNE"],
  ["","","CONDUCTEUR"],
  ["","","","CAPACITES"],
  ["","","","","VISUELLES"],
  ["","","","","","Acuité visuelle"],
  ["","","","","","Daltonisme"],
  ["","","","","","Sensibilité aux contrastes"],
  ["","","","","AUDITIVES"],
  ["","","","","ATTENTION / CONCENTRATION"],
  ["","","","","REFLEXES / REACTIONS"],
  ["","","","","PHYSIQUES"],
  ["","","","","LOGIQUE"],
  ["","","","","MECANIQUE"],
  ["","","","PERSONNALITE"],
  ["","","","","Calme"],
  ["","","","","Tendu"],
  ["","","","","Imprudent"],
  ["","","","","Agité"],
  ["","","","","Triste"],
  ["","","","INFORMATIONS DE CONTACT"],
  ["","","","","Nom"],
  ["","","","","Ville / Code postal"],
  ["","","","","Contact en cas d'urgences"],
  ["","","","DEMOGRAPHIE"],
  ["","","","","Age"],
  ["","","","","Genre"],
  ["","","","","Langue"],
  ["","","","","Niveau d'études"],
  ["","","","ETAT EMOTIONNEL"],
  ["","","","","(voir Corps humain)"],
  ["","","","ETAT MENTAL"],
  ["","","","","(voir Corps humain)"],
  ["","","","ETAT PHYSIOLOGIQUE"],
  ["","","","","(voir Corps humain)"],
  ["","","","PARAMETRES PHYSIOLOGIQUES"],
  ["","","","","Rythme cardiaque"],
  ["","","","","Pression sanguine"],
  ["","","","","Température"],
  ["","","","EXPRESSION FACIALE"],
  ["","","","","Joie"],
  ["","","","","Tristesse"],
  ["","","","","Colère"],
  ["","","","","Dégoût"],
  ["","","","","Neutre"],
  ["","","","","Surprise"],
  ["","","","","Peur"],
  ["","","","CONNAISSANCES GENERALES"],
  ["","","","","Informatique / Technologie"],
  ["","","","","Mécanique"],
  ["","","","EXPERIENCE DE CONDUITE"],
  ["","","","","Familiarité avec la route"],
  ["","","","","Nb d'années de permis"],
  ["","","","","Nb d'accidents / accrochages"],
  ["","","","ATTITUDE DE CONDUITE"],
  ["","","","","STYLE DE DE CONDUITE"],
  ["","","","","","Nerveux"],
  ["","","","","","Calme"],
  ["","","","","COURTOISIE / POLITESSE"],
  ["","","","ATTITUDE FACE AUX RISQUES"],
  ["","","","","Recherche de sensations"],
  ["","","","","Implications dans des accidents ?"],
  ["","","","PREFERENCES D'INTERFACE UX"],
  ["","","","","Police"],
  ["","","","","Couleurs"],
  ["","","","","Mise en page"],
  ["","","","","Modalités"],
  ["","","","HANDICAP ET CONDITIONS MEDICALES"],
  ["","","","","Surdité"],
  ["","","","","Malvoyance"],
  ["","","","","Maladie de Parkinson"],
  ["","","","","Maladie d'Alzheimer"],
  ["","","","","Maladies cardiovasculaires"],
  ["","","","","Problèmes de sommeil"],
  ["","","","","Troubles psychiatriques"],
  ["","","","HISTORIQUE ET STATISTIQUES"],
  ["","","","","Avertissements précèdents"],
  ["","","","","Réactions du conducteur"],
  ["","","","","Antécédents de somnolence"],
  ["","","PASSAGER"],
  ["","","","PERSONNALITE"],
  ["","","","","Calme"],
  ["","","","","Tendu"],
  ["","","","","Imprudent"],
  ["","","","","Agité"],
  ["","","","","Triste"],
  ["","","","INFORMATIONS DE CONTACT"],
  ["","","","","Nom"],
  ["","","","","Ville / Code postal"],
  ["","","","","Contact en cas d'urgences"],
  ["","","","DEMOGRAPHIE"],
  ["","","","","Age"],
  ["","","","","Genre"],
  ["","","","","Langue"],
  ["","","","","Niveau d'études"],
  ["","","","ETAT EMOTIONNEL"],
  ["","","","","(voir Corps humain)"],
  ["","","","ETAT MENTAL"],
  ["","","","","(voir Corps humain)"],
  ["","","","ETAT PHYSIOLOGIQUE"],
  ["","","","","(voir Corps humain)"],
  ["","","","EXPRESSION FACIALE"],
  ["","","","","Joie"],
  ["","","","","Tristesse"],
  ["","","","","Colère"],
  ["","","","","Dégoût"],
  ["","","","","Neutre"],
  ["","","","","Surprise"],
  ["","","","","Peur"],
  ["","","","PREFERENCES D'INTERFACE UX"],
  ["","","","","Police"],
  ["","","","","Couleurs"],
  ["","","","","Mise en page"],
  ["","","","","Modalités"],
  ["","","","HANDICAP ET CONDITIONS MEDICALES"],
  ["","","","","Surdité"],
  ["","","","","Malvoyance"],
  ["","","","","Maladie de Parkinson"],
  ["","","","","Maladie d'Alzheimer"],
  ["","","","","Maladies cardiovasculaires"],
  ["","","","","Problèmes de sommeil"],
  ["","","","","Troubles psychiatriques"],
  ["","","","PARAMETRES PHYSIOLOGIQUES"],
  ["","","","","Rythme cardiaque"],
  ["","","","","Pression sanguine"],
  ["","","","","Température"],
  ["","","CORPS HUMAIN"],
  ["","","","CORPS PHYSIQUE"],
  ["","","","","ALIMENTATION"],
  ["","","","","","Petit déjeuner"],
  ["","","","","","Déjeuner"],
  ["","","","","","Dîner"],
  ["","","","","","En cas"],
  ["","","","","BESOIN NATUREL"],
  ["","","","","","rapidement"],
  ["","","","","","conséquemment"],
  ["","","","","FATIGUE"],
  ["","","","","","attentionnelle"],
  ["","","","","","","se changer l'esprit"],
  ["","","","","","","se reconcentrer"],
  ["","","","","","mentale"],
  ["","","","","","","se détendre mentalement"],
  ["","","","","","","penser à autre chose"],
  ["","","","","","corporelle"],
  ["","","","","","","se détendre physiquement"],
  ["","","","","","","faire de l'exercice physique"],
  ["","","","COGNITION/ ACTIVITE MENTALE"],
  ["","","","","RESOLUTION DE TACHE"],
  ["","","","","RESOLUTION DE PROBLEME"],
  ["","","","EMOTION"],
  ["","","","","VOLONTE / INTENTION"],
  ["","","","","RATIONALITE"],
  ["","","","","STRESS"],
  ["","","","","SERENITE"],
  ["","VEHICULE"],
  ["","","AUTONOME"],
  ["","","","TYPE"],
  ["","","","","Voiture"],
  ["","","","","Camion"],
  ["","","","","Camping car"],
  ["","","","","Bus"],
  ["","","","","Moto"],
  ["","","","","Scooter"],
  ["","","","","Trottinette ?"],
  ["","","","","Vélo ?"],
  ["","","","SPECIFICATIONS"],
  ["","","","","Vitesse maximum"],
  ["","","","","Nb de chevaux"],
  ["","","","","Consommation d'essence"],
  ["","","","","Performance de freinage"],
  ["","","","","Direction assistée"],
  ["","","","INTERIEUR"],
  ["","","","","Portes"],
  ["","","","","Vitres"],
  ["","","","","Toits"],
  ["","","","","Pédales"],
  ["","","","","Levier de vitesse"],
  ["","","","","Volant"],
  ["","","","","Frein à main"],
  ["","","","","Compteur de vitesse"],
  ["","","","","Sièges"],
  ["","","","","Ceintures"],
  ["","","","","Airbags"],
  ["","","","EXTERIEUR"],
  ["","","","","Coffre"],
  ["","","","","Feux"],
  ["","","","","Rétroviseurs"],
  ["","","","","Essuis-glaces"],
  ["","","","ATTRIBUTS PHYSIQUES"],
  ["","","","","Dimensions"],
  ["","","","","Poids"],
  ["","","","","Position dans le véhicule"],
  ["","","","","Attaché ou non"],
  ["","","","DETECTEURS"],
  ["","","","","GPS"],
  ["","","","","Caméra"],
  ["","","","","Radar"],
  ["","","","","Niveau de luminosité"],
  ["","","","","Température"],
  ["","","","ELEMENTS IHM"],
  ["","","","","Haut-parleurs"],
  ["","","","","Microphones"],
  ["","","","","Ecrans"],
  ["","","","COMPORTEMENT"],
  ["","","","","Vitesse"],
  ["","","","","Accélération"],
  ["","","","","Freinage"],
  ["","","","","Localisation"],
  ["","","","","Orientation"],
  ["","","","STATUT INTERNE"],
  ["","","","","Niveau d'ouverture des fenetres"],
  ["","","","","Condition des feux"],
  ["","","","","Condition des essuis-glaces"],
  ["","","","","Niveau sonore"],
  ["","","","TYPE D'INTERACTIONS"],
  ["","","","","ENTREES"],
  ["","","","","","Toucher"],
  ["","","","","","Parole"],
  ["","","","","","Gestes"],
  ["","","","","","Boutons"],
  ["","","","","","Commandes du tableau de bord"],
  ["","","","","SORTIES"],
  ["","","","","","Ecran du tableau de bord"],
  ["","","","","","Sons"],
  ["","","","","","Vibrations"],
  ["","","","","","Climatisation"],
  ["","","","","","Chauffage"],
  ["","","","","IMPLICITE"],
  ["","","","","","Gestes"],
  ["","","","","","Poses"],
  ["","","","","","Attracteurs visuels"],
  ["","","","","","Lumière ambiante"],
  ["","","","","","Retour de force"],
  ["","","","","EXPLICITE"],
  ["","","","","","Interface graphique"],
  ["","","","","","Commandes vocales"],
  ["","","","","","Notifications du tableau de bord"],
  ["","","","TYPES DE MODALITE"],
  ["","","","","Visuelle"],
  ["","","","","Auditive"],
  ["","","","","Haptique"],
  ["","","","ENVIRONNEMENT"],
  ["","","","","METEO"],
  ["","","","","","Conditions lumineuses"],
  ["","","","","","Pare-soleil"],
  ["","","","","","Brouillard"],
  ["","","","","","Pluie"],
  ["","","","","","Vent"],
  ["","","","","","Neige"],
  ["","","","","","Grêle"],
  ["","","","","TRAFIC"],
  ["","","","","","Flux"],
  ["","","","","","Accidents"],
  ["","","","","","Déviations"],
  ["","","","","","Routes barrées"],
  ["","","","","OBSTACLES PROCHES"],
  ["","","","","","Autres véhicules"],
  ["","","","","","Piétons"],
  ["","","","","","Gravier / pierres "],
  ["","","","","DANGERS A PROXIMITE"],
  ["","","","","","Poteaux"],
  ["","","","","","Dos d'âne"],
  ["","","","","","Flaque d'essence"],
  ["","","","","","Verglas"],
  ["","","","CONTEXTE"],
  ["","","","","REGULATION"],
  ["","","","","","Feux de circulation"],
  ["","","","","","Panneaux"],
  ["","","","","","Limites de vitesse"],
  ["","","","","","Priorités"],
  ["","","","","TYPE DE ROUTE"],
  ["","","","","","Autoroute"],
  ["","","","","","Départementales"],
  ["","","","","","Nationales"],
  ["","","","","","Ville"],
  ["","","","","SEGMENT DE ROUTE"],
  ["","","","","","Rond-point"],
  ["","","","","","Intersection"],
  ["","","","","","Nb de voies"],
  ["","","","","","Voie de bus"],
  ["","","","","","Passages piéton"],
  ["","","","","SESSION DE CONDUITE"],
  ["","","","","","Départ"],
  ["","","","","","Arrivée"],
  ["","","","","","Route"],
  ["","","","","BUT DE LA CONDUITE"],
  ["","","","","","Routine"],
  ["","","","","","Professionnel"],
  ["","","","","","Urgence"],
  ["","","","","","Loisirs"],
  ["","","SEMI-AUTONOME"],
  ["","","","TYPE"],
  ["","","","","Voiture"],
  ["","","","","Camion"],
  ["","","","","Camping car"],
  ["","","","","Bus"],
  ["","","","","Moto"],
  ["","","","","Scooter"],
  ["","","","","Trottinette ?"],
  ["","","","","Vélo ?"],
  ["","","","SPECIFICATIONS"],
  ["","","","","Vitesse maximum"],
  ["","","","","Nb de chevaux"],
  ["","","","","Consommation d'essence"],
  ["","","","","Performance de freinage"],
  ["","","","","Direction assistée"],
  ["","","","INTERIEUR"],
  ["","","","","Portes"],
  ["","","","","Vitres"],
  ["","","","","Toits"],
  ["","","","","Pédales"],
  ["","","","","Levier de vitesse"],
  ["","","","","Volant"],
  ["","","","","Frein à main"],
  ["","","","","Compteur de vitesse"],
  ["","","","","Sièges"],
  ["","","","","Ceintures"],
  ["","","","","Airbags"],
  ["","","","EXTERIEUR"],
  ["","","","","Coffre"],
  ["","","","","Feux"],
  ["","","","","Rétroviseurs"],
  ["","","","","Essuis-glaces"],
  ["","","","ATTRIBUTS PHYSIQUES"],
  ["","","","","Dimensions"],
  ["","","","","Poids"],
  ["","","","","Position dans le véhicule"],
  ["","","","","Attaché ou non"],
  ["","","","DETECTEURS"],
  ["","","","","GPS"],
  ["","","","","Caméra"],
  ["","","","","Radar"],
  ["","","","","Niveau de luminosité"],
  ["","","","","Température"],
  ["","","","ELEMENTS IHM"],
  ["","","","","Haut-parleurs"],
  ["","","","","Microphones"],
  ["","","","","Ecrans"],
  ["","","","COMPORTEMENT"],
  ["","","","","Vitesse"],
  ["","","","","Accélération"],
  ["","","","","Freinage"],
  ["","","","","Localisation"],
  ["","","","","Orientation"],
  ["","","","STATUT INTERNE"],
  ["","","","","Niveau d'ouverture des fenetres"],
  ["","","","","Condition des feux"],
  ["","","","","Condition des essuis-glaces"],
  ["","","","","Niveau sonore"],
  ["","","","TYPE D'INTERACTIONS"],
  ["","","","","ENTREES"],
  ["","","","","","Toucher"],
  ["","","","","","Parole"],
  ["","","","","","Gestes"],
  ["","","","","","Boutons"],
  ["","","","","","Commandes du tableau de bord"],
  ["","","","","SORTIES"],
  ["","","","","","Ecran du tableau de bord"],
  ["","","","","","Sons"],
  ["","","","","","Vibrations"],
  ["","","","","","Climatisation"],
  ["","","","","","Chauffage"],
  ["","","","","IMPLICITE"],
  ["","","","","","Gestes"],
  ["","","","","","Poses"],
  ["","","","","","Attracteurs visuels"],
  ["","","","","","Lumière ambiante"],
  ["","","","","","Retour de force"],
  ["","","","","EXPLICITE"],
  ["","","","","","Interface graphique"],
  ["","","","","","Commandes vocales"],
  ["","","","","","Notifications du tableau de bord"],
  ["","","","TYPES DE MODALITE"],
  ["","","","","Visuelle"],
  ["","","","","Auditive"],
  ["","","","","Haptique"],
  ["","","","ENVIRONNEMENT"],
  ["","","","","METEO"],
  ["","","","","","Conditions lumineuses"],
  ["","","","","","Pare-soleil"],
  ["","","","","","Brouillard"],
  ["","","","","","Pluie"],
  ["","","","","","Vent"],
  ["","","","","","Neige"],
  ["","","","","","Grêle"],
  ["","","","","TRAFIC"],
  ["","","","","","Flux"],
  ["","","","","","Accidents"],
  ["","","","","","Déviations"],
  ["","","","","","Routes barrées"],
  ["","","","","OBSTACLES PROCHES"],
  ["","","","","","Autres véhicules"],
  ["","","","","","Piétons"],
  ["","","","","","Gravier / pierres "],
  ["","","","","DANGERS A PROXIMITE"],
  ["","","","","","Poteaux"],
  ["","","","","","Dos d'âne"],
  ["","","","","","Flaque d'essence"],
  ["","","","","","Verglas"],
  ["","","","CONTEXTE"],
  ["","","","","REGULATION"],
  ["","","","","","Feux de circulation"],
  ["","","","","","Panneaux"],
  ["","","","","","Limites de vitesse"],
  ["","","","","","Priorités"],
  ["","","","","TYPE DE ROUTE"],
  ["","","","","","Autoroute"],
  ["","","","","","Départementales"],
  ["","","","","","Nationales"],
  ["","","","","","Ville"],
  ["","","","","SEGMENT DE ROUTE"],
  ["","","","","","Rond-point"],
  ["","","","","","Intersection"],
  ["","","","","","Nb de voies"],
  ["","","","","","Voie de bus"],
  ["","","","","","Passages piéton"],
  ["","","","","SESSION DE CONDUITE"],
  ["","","","","","Départ"],
  ["","","","","","Arrivée"],
  ["","","","","","Route"],
  ["","","","","BUT DE LA CONDUITE"],
  ["","","","","","Routine"],
  ["","","","","","Professionnel"],
  ["","","","","","Urgence"],
  ["","","","","","Loisirs"],
  ["","","MANUEL"],
  ["","","","TYPE"],
  ["","","","","Voiture"],
  ["","","","","Camion"],
  ["","","","","Camping car"],
  ["","","","","Bus"],
  ["","","","","Moto"],
  ["","","","","Scooter"],
  ["","","","","Trottinette ?"],
  ["","","","","Vélo ?"],
  ["","","","SPECIFICATIONS"],
  ["","","","","Vitesse maximum"],
  ["","","","","Nb de chevaux"],
  ["","","","","Consommation d'essence"],
  ["","","","","Performance de freinage"],
  ["","","","","Direction assistée"],
  ["","","","INTERIEUR"],
  ["","","","","Portes"],
  ["","","","","Vitres"],
  ["","","","","Toits"],
  ["","","","","Pédales"],
  ["","","","","Levier de vitesse"],
  ["","","","","Volant"],
  ["","","","","Frein à main"],
  ["","","","","Compteur de vitesse"],
  ["","","","","Sièges"],
  ["","","","","Ceintures"],
  ["","","","","Airbags"],
  ["","","","EXTERIEUR"],
  ["","","","","Coffre"],
  ["","","","","Feux"],
  ["","","","","Rétroviseurs"],
  ["","","","","Essuis-glaces"],
  ["","","","ATTRIBUTS PHYSIQUES"],
  ["","","","","Dimensions"],
  ["","","","","Poids"],
  ["","","","","Position dans le véhicule"],
  ["","","","","Attaché ou non"],
  ["","","","DETECTEURS"],
  ["","","","","GPS"],
  ["","","","","Caméra"],
  ["","","","","Radar"],
  ["","","","","Niveau de luminosité"],
  ["","","","","Température"],
  ["","","","ELEMENTS IHM"],
  ["","","","","Haut-parleurs"],
  ["","","","","Microphones"],
  ["","","","","Ecrans"],
  ["","","","COMPORTEMENT"],
  ["","","","","Vitesse"],
  ["","","","","Accélération"],
  ["","","","","Freinage"],
  ["","","","","Localisation"],
  ["","","","","Orientation"],
  ["","","","STATUT INTERNE"],
  ["","","","","Niveau d'ouverture des fenetres"],
  ["","","","","Condition des feux"],
  ["","","","","Condition des essuis-glaces"],
  ["","","","","Niveau sonore"],
  ["","","","TYPE D'INTERACTIONS"],
  ["","","","","ENTREES"],
  ["","","","","","Toucher"],
  ["","","","","","Parole"],
  ["","","","","","Gestes"],
  ["","","","","","Boutons"],
  ["","","","","","Commandes du tableau de bord"],
  ["","","","","SORTIES"],
  ["","","","","","Ecran du tableau de bord"],
  ["","","","","","Sons"],
  ["","","","","","Vibrations"],
  ["","","","","","Climatisation"],
  ["","","","","","Chauffage"],
  ["","","","","IMPLICITE"],
  ["","","","","","Gestes"],
  ["","","","","","Poses"],
  ["","","","","","Attracteurs visuels"],
  ["","","","","","Lumière ambiante"],
  ["","","","","","Retour de force"],
  ["","","","","EXPLICITE"],
  ["","","","","","Interface graphique"],
  ["","","","","","Commandes vocales"],
  ["","","","","","Notifications du tableau de bord"],
  ["","","","TYPES DE MODALITE"],
  ["","","","","Visuelle"],
  ["","","","","Auditive"],
  ["","","","","Haptique"],
  ["","","","ENVIRONNEMENT"],
  ["","","","","METEO"],
  ["","","","","","Conditions lumineuses"],
  ["","","","","","Pare-soleil"],
  ["","","","","","Brouillard"],
  ["","","","","","Pluie"],
  ["","","","","","Vent"],
  ["","","","","","Neige"],
  ["","","","","","Grêle"],
  ["","","","","TRAFIC"],
  ["","","","","","Flux"],
  ["","","","","","Accidents"],
  ["","","","","","Déviations"],
  ["","","","","","Routes barrées"],
  ["","","","","OBSTACLES PROCHES"],
  ["","","","","","Autres véhicules"],
  ["","","","","","Piétons"],
  ["","","","","","Gravier / pierres "],
  ["","","","","DANGERS A PROXIMITE"],
  ["","","","","","Poteaux"],
  ["","","","","","Dos d'âne"],
  ["","","","","","Flaque d'essence"],
  ["","","","","","Verglas"],
  ["","","","CONTEXTE"],
  ["","","","","REGULATION"],
  ["","","","","","Feux de circulation"],
  ["","","","","","Panneaux"],
  ["","","","","","Limites de vitesse"],
  ["","","","","","Priorités"],
  ["","","","","TYPE DE ROUTE"],
  ["","","","","","Autoroute"],
  ["","","","","","Départementales"],
  ["","","","","","Nationales"],
  ["","","","","","Ville"],
  ["","","","","SEGMENT DE ROUTE"],
  ["","","","","","Rond-point"],
  ["","","","","","Intersection"],
  ["","","","","","Nb de voies"],
  ["","","","","","Voie de bus"],
  ["","","","","","Passages piéton"],
  ["","","","","SESSION DE CONDUITE"],
  ["","","","","","Départ"],
  ["","","","","","Arrivée"],
  ["","","","","","Route"],
  ["","","","","BUT DE LA CONDUITE"],
  ["","","","","","Routine"],
  ["","","","","","Professionnel"],
  ["","","","","","Urgence"],
  ["","","","","","Loisirs"]];
