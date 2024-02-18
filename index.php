<?php
?>
<!DOCTYPE html>
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
    <!--         -->
    <link rel="stylesheet" href="index.css">
    <!-- bootdey -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
  </head>
  <body>
<!-- ====== Bootstrap script ====== -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/22ad4831d8.js" crossorigin="anonymous"></script>
  <!-- google icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- resizeImg -->
  <script src="jquery.resizeImg.js"></script>
  <script src="mobileBUGFix.js"></script>
  <!--  -->
  <script src="data.js"></script>
  <script src="index.js"></script>
  <script src="speech.js"></script>
<!-- ************************************************************************** -->
  <div id="DEVA">
<!-- -->
  <div class="d-flex flex-row-reverse">
    <div id="record-widget"></div>
  </div>
<!--           -->
<!--  TOOLBAR  -->
<!--           -->
  <div id="toolBar">
    <div id="dialogButtons d-flex" class="mt-2">
      <button id="chatParamButton" class="btn toolbarButton ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#chatParamOffcanvas">
        <img src="icons/chat-left-text.svg" width=30>
      </button>
      <button id="micButton" class="btn toolbarButton" type="button">
        <img src="icons/mic-mute-fill.svg" width=30>
      </button>
      <button id="speakerButton" class="btn toolbarButton" type="button">
        <img src="icons/volume-mute-fill.svg" width=30>
      </button>

      <button id="startButton" class="btn toolbarButton ms-auto" type="button">
        <img src="icons/splash.png" width=40>
      </button>
    </div>
  </div>
<!--                       -->
<!--   toolbar offcanvas   -->
<!--                       -->
  <div id="chatParamOffcanvas" class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1">

    <div id="dialogButtonsOffcanvas" class="d-flex flex-row mt-2">
      <button id="chatParamButtonOffcanvas" class="btn toolbarButton ms-3" data-bs-dismiss="offcanvas" type="button">
        <img src="icons/chat-left-text.svg" width=30>
      </button>

      <!-- style="visibility:hidden;" -->
      <button id="micButtonOffcanvas" class="btn toolbarButton"  type="button">
        <img src="icons/mic-mute-fill.svg" width=30>
      </button>
      <button id="speakerButtonOffcanvas" class="btn toolbarButton"  type="button">
        <img src="icons/volume-mute-fill.svg" width=30>
      </button>

    </div>

    <!--
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="chatParamOffcanvasLabel"><strong>Converser avec DEVA</strong></h5>
      <button id="chatParamButton" type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    -->
    <div class="offcanvas-body">
      <div>
        <div class="d-grid gap-2">
          <div id="voyageText" class="container form-floating d-grid gap-2">
            <div><strong>Historique des conversations:</strong></div>
            <textarea id="logTextarea" autofocus class="form-control"></textarea>
            <button id="clearLogButton" class="btn" type="button">
              <img src="icons/trash.svg" width=30>
            </button>
            <div><strong>Vous avez la parole:</strong></div>
            <textarea id="questionTextarea" class="form-control" autofocus></textarea>
            <button id="questionButton" class="btn" type="button">
              <img src="icons/forward.svg" width=36>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--            -->
<!--   START    -->
<!--            -->
  <!-- <i style="font-size:24px;" class="fas fa-clock"></i> -->
  <div id="start" class="s-page">
    <div class="deva-tittle container-fluid mt-0 p-2 pb-1 mb-4 bg-primary text-white text-center">
      <img src="icons/splash.png" width="60px" style="border-radius: 50%"> <!-- carWhite.svg -->
      <h1 class="s-start display-5">DEVA</h1>
      <small id=devaVersion></small>
    </div>
    <div class="container">
      <div class="d-grid gap-4 text-center">
                                                <!-- data-bs-target="#modalOntoTree" -->
        <button id="sheduleButton" type="button" class="start-page-btn btn btn-outline-primary" >Agenda des voyages</button>
        <button id="voyageButton" type="button" class="start-page-btn btn btn-outline-primary">Le voyage en cours</button>
        <button id="paramButton" type="button" class="start-page-btn btn btn-outline-primary">Paramétrer DEVA</button>
      </div>
    </div>
  </div>
<!--                -->
<!--    shedule     -->
<!--                -->
  <div id="shedule" class="s-page">
      <div id="voyage-title" class="container-fluid pt-3 pb-0 mb-0 text-white text-center">
        <div id="voyage-content"> <!--  class="container-fluid" -->
          <div class="s-page-title container-fluid"><h1>Agenda</h1></div>
        </div>
      </div>
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
<!--               -->
<!--     param     -->
<!--               -->
  <div id="paramPage" class="s-page">
    <div class="d-grid gap-2">
      <div id="param-title" class="container-fluid mb-2 text-white text-center">
        <div id="param-content">
          <div class="s-page-title container-fluid"><h1>Paramètres</h1></div>
        </div>
      </div>
    </div>

    <button id="paramOffcanvasButton" class="btn mt-4 ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#paramOffcanvas">
      <img src="icons/gear.svg" width=30>
    </button>

    <button id="showCarButton" class="btn mt-4 ms-0 param-button" type="button">
      <img src="icons/carBlue.svg" width="30">
    </button>

    <button id="showTravellerButton" class="btn mt-4 ms-0 param-button" type="button">
      <img src="icons/people-fill-blue.svg" width="30">
    </button>

    <button id="travellerPlus" class="btn" type="button">
      <img src="icons/plus-circle-fill.svg" width="40">
    </button>

<!-- -->
    <div id="carSubpage" class="container-fluid param-subpage">
    </div>
<!-- -->
    <div id="travellerSubpage" class="container-fluid param-subpage">
<!--      <button id="travellerPlus" class="btn" type="button">
        <img src="icons/plus-circle-fill.svg" width="40">
      </button> -->
    <div id="travellerCards" class="row mt-2">
    </div>
  </div>
<!-- -->
</div>
<!-- **************************************************************************************** -->
<!-- ************************************************* C A N V A S    &    M O D A L   ****** -->
  <!--                       -->
  <!--   param offcanvas     -->
  <!--                       -->
    <div id="paramOffcanvas" class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="paramOffcanvasLabel"><strong>Préférences</strong></h5>
        <button id="paramOffcanvasButton" type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
          <div>
            <div class="d-grid gap-2">
              <div class="mb-2">
                <label for="chatParamUserName" class="form-label">Nom du conducteur</label>
                <input id="chatParamUserName" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamUserAdress" class="form-label">Adresse du conducteur</label>
                <input id="chatParamUserAdress" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamAssistantName" class="form-label">Nom de l'assistant</label>
                <input id="chatParamAssistantName" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamSpeechRate" class="form-label">Vitesse de la voix</label>
                <input id="chatParamSpeechRate" placeholder="De 0.8 à 1.2" type="number" min="0.8" max="1.2" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamSpeechPitch" class="form-label">Hauteur de la voix</label>
                <input id="chatParamSpeechPitch" placeholder="De 0.2 à 2" type="number" min="0.2" max="2" class="form-control"/>
              </div>
              <!--  disabled -->
              <div class="mb-2">
                <label for="chatParamStyle" class="form-label">Style des réponses</label>
                <input disabled id="chatParamStyle" placeholder="Exemple: dans le style de..." type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamDetail" class="form-label">Détails des réponses</label>
                <input disabled id="chatParamDetail" placeholder="Exemple: de façon concise" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamTemperature" class="form-label">Variabilité des réponses</label>
                <input disabled id="chatParamTemperature" placeholder="De 0 à O.9" type="number" min="0" class="form-control"/>
              </div>
              <div class="mt-4">
                <button id="chatParamChangeUserButton" type="button" class="btn btn-light" style="float:right;" >Fermer la session</button>
              </div>
            </div>
          </div>
        <!--
          <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        -->
        </div>
      </div>
    </div>
  <!--                                     -->
  <!--    eventModal  create new event     -->
  <!--                                     -->
    <div id="eventModal" data-event-id= "" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Nouvel évènement</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-grid gap-2">
              <div class="mb-2">
                <label for="sEventTitle" class="form-label">Motif</label>
                <input id="sEventTitle" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="sEventTime" class="form-label">Heure de début</label>
                <input id="sEventTime" type="time" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="sEventTime2" class="form-label">Heure de fin</label>
                <input id="sEventTime2" disabled type="time" class="form-control"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button id="newEventOK"  type="button" class="btn btn-success">OK</button>
          </div>
        </div>
      </div>
    </div>
    <!--                                                 -->
    <!--    travellerModal  create or edit traveller     -->
    <!--                                                 -->
      <div id="travellerModal" class="modal fade" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Voyageur</h3>
              <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
            </div>
            <div class="modal-body">
              <div>
                <label for="imgFromDiskInput" class="form-label img-select">
                  <img id="imgFromDisk" src="icons/person-fill.svg" width="90" class="avatar-md style="border-radius:0!important" img-thumbnail">
                </label>
                <input id="imgFromDiskInput" type="file" style="opacity:0">
              </div>
              <div class="d-grid gap-2">
                <div class="mb-2">
                  <label for="lastname" class="form-label">Nom</label>
                  <input id="lastname" type="text" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label for="firstname" class="form-label">Prénom</label>
                  <input id="firstname" type="text" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label for="nickname" class="form-label">Surnom</label>
                  <input id="nickname" type="text" class="form-control"/>
                </div>

                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Type de voyageur</button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="javascript:$('#travellertype').val('Conducteur attitré');">Conducteur attitré</a></li>
                    <li><a class="dropdown-item" href="javascript:$('#travellertype').val('Conducteur additionnel');">Conducteur additionnel</a></li>
                    <li><a class="dropdown-item" href="javascript:$('#travellertype').val('Passager');">Passager</a></li>
                  </ul>
                  <input id="travellertype" type="text" class="form-control">
                </div>

                <div class="mb-2">
                  <label for="phone" class="form-label">Téléphone</label>
                  <input id="phone" type="tel" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label for="address" class="form-label">Adresse</label>
                  <input id="address" type="text" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label for="equipment" class="form-label">Équipement</label>
                  <input id="equipment" type="text" class="form-control"/>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button id="newTravellerOK"  type="button" class="btn btn-success">OK</button>
            </div>
          </div>
        </div>
      </div>
      <!--                       -->
      <!--   singleInputModal    -->
      <!--                       -->
      <div id="singleInputModal" class="modal fade" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Entrez votre identifiant:</h5>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal"></button> -->
            </div>
            <div class="modal-body">
              <p><input type="text" class="form-control"/></p>
            </div>
            <div class="modal-footer">
              <button id="singleInputModalOK" type="button" class="btn btn-success">OK</button>
            </div>
          </div>
        </div>
      </div>
      <!--                   -->
      <!--   confirmModal    -->
      <!--                   -->
      <div id="confirmModal" class="modal fade" data-deva-confirm="" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <!--<button type="button" class="btn-close" data-bs-dismiss="modal"></button>-->
            </div>
            <div class="modal-body">
              <p></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button id="confirmModalOK" type="button" class="btn btn-success">OK</button>
            </div>
          </div>
        </div>
      </div>
      <!--                 -->
      <!--   protoModal    -->
      <!--                 -->
      <div id="protoModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog  modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Gestion des protocoles</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <h5>Enregistrer</h5>
              <br/>
              <div class="d-grid gap-2">
                <div class="mb-2">
                  <label for="tester" class="form-label">Nom du testeur</label>
                  <input id="tester" type="text" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label for="participant" class="form-label">Nom du paticipant</label>
                  <input id="participant" type="text" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label for="condition" class="form-label">Condition expérimentale</label>
                  <input id="condition" type="text" class="form-control"/>
                </div>
                <button id="record" class="btn btn-success mt-1">Commencer l'enregistrement</button>
                <br/>
                <h5>Télécharger</h5>
                <div class="mt-0">
                  <button id="down-last" class="btn btn-light">Mon dernier protocole</button>
                </div>
                <div class="mt-1">
                  <button id="down-my" class="btn btn-light">Mes protocoles</button>
                </div>
                <div class="mt-1">
                  <button id="down-all" class="btn btn-light">Tous les protocoles</button>
                </div>
                <h5  class="mt-4">Supprimer</h5>
                <div class="mt-0">
                  <button id="sup-last" class="btn btn-light">Mon dernier protocole</button>
                </div>
                <div class="mt-1">
                  <button id="sup-my" class="btn btn-light">Mes protocoles</button>
                </div>
              </div>
            </div>
            <!--
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button id="confirmModalOK" type="button" class="btn btn-success">OK</button>
            </div>
            -->
          </div>
        </div>
      </div>
</DEVA>
</body>
</html>
