
<?php
// Nomenclature : [Années depuis 2020].[Mois].[Jour].[Nombre dans la journée]
$version = "3.06.26.1"; 
?>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DEVA</title>
<!-- ====== Bootstrap link ====== -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<!-- jQuery library -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.rawgit.com/mgalante/jquery.redirect/master/jquery.redirect.js"></script>
<!-- Evo Calendar -->
    <link rel="stylesheet" href="evo-calendar.css" />
    <link rel="stylesheet" href="evo-calendar.midnight-blue.css" />
    <script src="evo-calendar.js"></script>
    <!-- -->
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
<!-- ====== Bootstrap script ====== -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/22ad4831d8.js" crossorigin="anonymous"></script>
  <!-- -->
  <script src="data.js"></script>
  <script src="index.js"></script>
  <script src="papaparse.min.js"></script>
<!-- ************************************************************************** -->
  <div id="DIVA">
<!-- TOP BAR -->
  <div id="topBar">
    <button id="startButton" class="btn" type="button">
      <img src="icons/carBlue.svg" width=40>
    </button>
  </div>
<!--            -->
<!--   START    -->
<!--            -->
  <!-- <i style="font-size:24px;" class="fas fa-clock"></i> -->
  <div id="start" class="s-page">
    <div class="deva-tittle container-fluid mt-0 p-2 pb-1 mb-5 bg-primary text-white text-center">
      <img src="icons/carWhite.svg" width=40>
      <h1 class="s-start display-5">DEVA</h1>
    </div>
    <div class="container">
      <div class="d-grid gap-4 text-center">
                                                <!-- data-bs-target="#modalOntoTree" -->
        <button id="sheduleButton" type="button" class="start-page-btn btn btn-outline-primary" >Planifier/Consulter l'agenda des voyages</button>
        <button id="voyageButton" type="button" class="start-page-btn btn btn-outline-primary">Le voyage en cours</button>
        <button id="paramButton" type="button" class="start-page-btn btn btn-outline-primary">Paramétrer DEVA</button>
      </div>
    </div>
  </div>
  <!--                -->
  <!--    shedule     -->
  <!--                -->
  <div id="shedule" class="s-page">
    <div id="shedule-content"> <!--  class="container-fluid" -->
      <div id="evoCalendar"></div>
    </div>
  </div>
  <!--                -->
  <!--    voyage      -->
  <!--                -->
  <div id="voyage" class="s-page">
    <div  class="d-grid gap-2">
      <div id="voyage-title" class="container-fluid pt-3 pb-3 mb-2 text-white text-center">
        <div id="voyage-content"> <!--  class="container-fluid" -->
          <div class="s-page-title container-fluid"><h1>Le voyage en cours</h1></div>
        </div>
      </div>
    </div>
  </div>
  <!--                     -->
  <!--  ontoTree-choose    -->
  <!--                     -->
  <div id="ontoTree-choose" class="s-page">
    <div id="ontoTree-content" class="container">
      <div  class="d-grid gap-2">
        <div id="ontoTree-title" class="container-fluid pt-3 pb-3 mb-2 bg-success text-white">
          <h1 id="ontoTree-parent" class="mb-0"></h1>
        </div>
        <button id="ontoTree-item0" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item1" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item2" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item3" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item4" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item5" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item6" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item7" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item8" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
        <button id="ontoTree-item9" type="button" class="ontoTree-btn btn btn-outline-success overflow-hidden"></button>
      </div>
    </div>
  </div>
<!-- **************************************************************************************** -->
<!-- *******************************************************************   M O D A L   ****** -->
<!--                                             -->
<!--   inputModal  choose label in ontoTree     -->
<!--                                             -->
  <div id="inputModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title"><b>Choisir une rubrique</b></h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-grid gap-2">
            <button id="buttonParentModalChooseLabel" type="button" class="btn btn-lg btn-success inputModalChooseLabelOK" data-bs-dismiss="modal">Rubrique parente</button>
            <h5 class="modal-title">Ou taper un nom de rubrique</h5>
            <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button id="inputModalChooseLabelOK"  type="button" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
  <!--                                     -->
  <!--    eventModal  create new event     -->
  <!--                                     -->
    <div id="eventModal" data-event-id= "" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Nouvel évènement</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-grid gap-2">
              <div class="mb-2">
                <label for="sEventTitle" class="form-label">Titre:</label>
                <input id="sEventTitle" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="sEventTime" class="form-label">Heure de début:</label>
                <input id="sEventTime" type="time" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="sEventTime2" class="form-label">Heure de fin:</label>
                <input id="sEventTime2" type="time" class="form-control"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button id="newEventOK"  type="button" class="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
<!--
    <div  class="row justify-content-evenly mt-5">
      <div class="col-sm-5 border border-2 m-3">
        <h5>coucou</h5>
      </div>
      <div class="col-sm-5 border border-2 m-3">
        <p>cici</p>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-4">
          <h3>Column 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
        <div class="col-sm-4">
          <h3>Column 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
        <div class="col-sm-4">
          <h3>Column 3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
      </div>
    </div>
-->
  </DIVA>
  </body>
</html>
