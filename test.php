
<!DOCTYPE html><html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DEVA</title>
<!-- ====== Bootstrap link ====== -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<!-- jQuery library -->
  <script src="https://code.jquery.com/jquery-3.6.4.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.rawgit.com/mgalante/jquery.redirect/master/jquery.redirect.js"></script>
  <!-- -->
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="test.css">
</head>
<body>

  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
    Open Sidebar
  </button>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Sidebar</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p>Some content goes here...</p>
    </div>
  </div>

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
</body>
</html>

<!--                       -->
<!--   ontoTree offcanvas  -->
<!--                       -->
<!--
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" id="ontoTreeOffcanvas" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="ontoTreeOffcanvasLabel"><strong>Titre ici</strong></h5>
      <button id="ontoTreeButton" type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div id="param">
        <div id="ontoTree-content" class="d-grid">
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
  </div>
-->



<!--                                                     EXEMPLE DE MODAL        -->
<!--   inputModal  choose label in ontoTree     -->
<!--
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
  </div>   -->


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


  <!--
  <p class="text-dark mb-0 mt-1"><i class="material-icons" style="font-size:22px;  color:#518f97;">place</i><span style="position:relative; top:-6px; left:8px;">Durant@spy.com</span></p>
  -->
  <!-- card
  <div class="col-sm-6 col-md-4 col-lg-3 cmb-1">
      <div class="card mb-3">
          <div class="card-body pb-2">
              <div class="d-flex align-items-top">
                  <div><img src="icons/femmeGrec2.png" width="90" class="avatar-md rounded-circle img-thumbnail" /></div>
                  <div class="flex-1 ms-3">
                      <h5 class="mb-1">
                        <div class="text-dark"><strong>Sébatien</strong></div>
                        <div class="text-dark"><strong>Durant</strong></div>
                        <div class="text-dark">"Jim"</div>
                      </h5>
                  </div>
              </div>
              <div class="mt-3 pt-1">
                <p class="travellertype"><strong>Conducteur attitré</strong></p>
                <p class="text-dark mb-0"><i class="fa fa-phone" style="font-size:19px; color:#518f97;"></i><span style="position:relative; top:-2px; left:13px;">98 76 54 32 10</span></p>
                <p class="text-dark mb-0 mt-1"><i class="material-icons" style="font-size:26px;  color:#518f97;">mail</i><span style="position:relative; top:-8px; left:6px;">42 place de la gare, Lyon, 54321</span></p>
                <p class="text-dark mb-0"><i class="fa fa-car-side" style="font-size:20px; color:#518f97;"></i><span style="position:relative; top:-2px; left:10px;">Siège enfant</span></p>
              </div>
              <div class="d-flex gap-1 pt-2 trash-edit-box">
                <div class="edit-trash" style="display:none">
                  <div class="event-edit" style="display: block;">
                    <button class="btn" type="button" onclick="">
                      <img src="icons/pencil.svg" width="26">
                    </button>
                  </div>
                  <div class="event-trash" style="display: block;">
                    <button class="btn" type="button" onclick="">
                      <img src="icons/trash.svg" width="26">
                    </button>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div> -->
  <!-- card
  <div class="col-sm-6 col-md-4 col-lg-3 cmb-1">
      <div class="card mb-3">
          <div class="card-body pb-2">
              <div class="d-flex align-items-center">
                  <div><img src="icons/hommeGrec1.png" width="90" class="avatar-md rounded-circle img-thumbnail" /></div>
                  <div class="flex-1 ms-3">
                      <h5 class="mb-1">
                        <div class="text-dark"><strong>Charles Durant</strong></div>
                        <div class="text-dark">"Jim"</div>
                      </h5>
                  <div class="driver"><strong>Passager</strong></div>
                  </div>
              </div>
              <div class="mt-3 pt-1">
                  <p class="text-dark mb-0"><i class="fa fa-phone" style="font-size:19px; color:#518f97;"></i><span style="position:relative; top:-2px; left:13px;">98 76 54 32 10</span></p>
                  <p class="text-dark mb-0 mt-1"><i class="material-icons" style="font-size:26px;  color:#518f97;">mail</i><span style="position:relative; top:-8px; left:6px;">42 place de la gare, Lyon, 54321</span></p>
                  <p class="text-dark mb-0"><i class="fa fa-car-side" style="font-size:20px; color:#518f97;"></i><span style="position:relative; top:-2px; left:10px;">Siège enfant</span></p>
              </div>
              <div class="d-flex gap-1 pt-2 trash-edit-box">
                <div class="edit-trash" style="display:none">
                  <div class="event-edit" style="display: block;">
                    <button class="btn" type="button" onclick="">
                      <img src="icons/pencil.svg" width="26">
                    </button>
                  </div>
                  <div class="event-trash" style="display: block;">
                    <button class="btn" type="button" onclick="">
                      <img src="icons/trash.svg" width="26">
                    </button>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div> -->
