<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DEVA</title>
    <!-- ====== Bootstrap ====== -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <!-- jQuery library -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.rawgit.com/mgalante/jquery.redirect/master/jquery.redirect.js"></script>
    <!-- -->
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="data.js"></script>
    <script src="index.js"></script>
    <script src="papaparse.min.js"></script>
<!--            -->
<!--   START    -->
<!--            -->
    <div id="start" class="s-page">
      <div class="container-fluid mt-0 pt-2 pb-0 mb-5 bg-primary text-white text-center">
        <h1 class="display-5">DEVA</h1>
        <h3>Sérénité</h3>
      </div>
      <div class="container">
        <div class="d-grid gap-4 text-center">
          <!-- data-bs-target="#modalOntoTree" -->
          <button id="pretravel" type="button" class="s-btn btn btn-outline-primary btn-lg" data-bs-toggle="modal" >Préparer un voyage</button>
          <button type="button" class="s-btn btn btn-outline-primary btn-lg">Exécute un voyage</button>
          <button type="button" class="s-btn btn btn-outline-primary btn-lg">Terminer</button>
        </div>
      </div>
    </div>
<!--                     -->
<!--  ontoTree-choose    -->
<!--                     -->
    <div id="ontoTree-choose" class="s-page">
      <div class="container-fluid mt-0 ps-3 pt-2 pb-5 mb-4 bg-success text-white">
        <h1 id="ontoTree-parent" class="display-5"></h1>
      </div>
      <div class="container ontoTree-content">
        <div  class="d-grid gap-2">
          <button id="ontoTree-item0" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item1" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item2" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item3" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item4" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item5" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item6" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item7" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item8" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
          <button id="ontoTree-item9" type="button" class="ontoTree-btn btn btn-outline-success btn-lg overflow-hidden"></button>
        </div>
      </div>
    </div>
<!--                                M O D A L S     -->
<!--                    -->
<!--   modalOntoTree    -->
<!--
<div id="modalOntoTree" class="modal fade" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 id="ontoTree-title" class="modal-title fs-5"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div  class="d-grid gap-4 text-center">
            <button id="ontoTreeItem0" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
            <button id="ontoTreeItem1" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
            <button id="ontoTreeItem2" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
            <button id="ontoTreeItem3" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
            <button id="ontoTreeItem4" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
            <button id="ontoTreeItem5" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
            <button id="ontoTreeItem6" type="button" class="ontoTree-btn btn btn-outline-primary btn-lg"></button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> -->
<!--                    -->
<!--   input modal      -->
<!--                    -->
<div id="inputModal" class="modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Taper un nom de rubrique</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button id="inputModalOK" type="button" class="btn btn-primary">OK</button>
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
  </body>
</html>
