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
    <!-- -->
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
  <!-- -->
  <script src="data.js"></script>
  <script src="index.js"></script>
  <script src="speech.js"></script>
<!-- ************************************************************************** -->
  <div id="DEVA">
<!--           -->
<!--  TOOLBAR  -->
<!--           -->
  <div id="toolBar">
    <button id="startButton" class="btn toolbarButton" type="button">
      <img src="icons/splash.png" width=40>
    </button>
    <div id="dialogButtons">
      <button id="micButton" class="btn toolbarButton" type="button">
        <img src="icons/mic-mute-fill.svg" width=30>
      </button>
      <button id="speakerButton" class="btn toolbarButton" type="button">
        <img src="icons/volume-mute-fill.svg" width=30>
      </button>
      <button id="chatParamButton" class="btn toolbarButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#chatParamOffcanvas">
        <img src="icons/list.svg" width=40>
      </button>
    </div>
  </div>
<!--                       -->
<!--   toolbar offcanvas   -->
<!--                       -->
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" id="chatParamOffcanvas" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="chatParamOffcanvasLabel"><strong>Dialoguer avec DEVA</strong></h5>
      <button id="chatParamButton" type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <div class="d-grid gap-2">
          <div id="voyageText" class="container form-floating d-grid gap-2">
            <div><strong>Historique du dialogue:</strong></div>
            <textarea id="logTextarea" autofocus class="form-control"></textarea>
            <button id="logButton" class="btn" type="button">
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

    <button id="showCarButton" class="btn mt-4 ms-2 param-button" type="button">
      <img src="icons/carBlue.svg" width="30">
    </button>

    <button id="showTravellerButton" class="btn mt-4 ms-2 param-button" type="button">
      <img src="icons/people-fill-blue.svg" width="30">
    </button>

    <div id="paramButtonVrap">
      <button id="paramOffcanvasButton" class="btn mt-3 ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#paramOffcanvas">
        <img src="icons/list.svg" width=40>
      </button>
    </div>
<!-- -->
    <div id="carSubpage" class="container param-subpage">
    </div>
<!-- -->
    <div id="travellerSubpage" class="container param-subpage">
<!--
    <div class="row align-items-center">
        <div class="col-md-6">
            <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                <div>
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="List"><i class="bx bx-list-ul"></i></a>
                        </li>
                        <li class="nav-item">
                            <a aria-current="page" href="#" class="router-link-active router-link-exact-active nav-link active" data-bs-toggle="tooltip" data-bs-placement="top" title="Grid"><i class="bx bx-grid-alt"></i></a>
                        </li>
                    </ul>
                </div>
                <div>
                    <a href="#" data-bs-toggle="modal" data-bs-target=".add-new" class="btn btn-primary"><i class="bx bx-plus me-1"></i> Add New</a>
                </div>
                <div class="dropdown">
                    <a class="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
-->
    <div class="row mt-2">
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Charles Durant (dit Jim)</a></h5>
                            <span class="badge badge-soft-success mb-0">Full Stack Developer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 98 76 54 32 10</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> Durant@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 42 place de la gare, Lyon, 54321</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div><img src="" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Jolanta Durant</a></h5>
                            <span class="badge badge-soft-success mb-0">Full Stack Developer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 046 5685 6969</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> Durant@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 42 place de la gare, Lyon, 54321</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Darlene Smith</a></h5>
                            <span class="badge badge-soft-danger mb-0">UI/UX Designer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 012 6587 1236</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> DarleneSmith@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 57 Guildry Street GAMRIE</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="avatar-md">
                            <div class="avatar-title bg-soft-primary text-primary display-6 m-0 rounded-circle"><i class="bx bxs-user-circle"></i></div>
                        </div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">William Swift</a></h5>
                            <span class="badge badge-soft-warning mb-0">Backend Developer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 012 6587 1236</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> WilliamSwift@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 80 South Street MONKW 7BR</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="avatar-md">
                            <div class="avatar-title bg-soft-primary text-primary display-6 m-0 rounded-circle"><i class="bx bxs-user-circle"></i></div>
                        </div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Kevin West</a></h5>
                            <span class="badge badge-soft-success mb-0">Full Stack Developer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 052 6524 9896</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> KevinWest@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 88 Tadcaster PINCHBECK 6UB</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Tommy Hayes</a></h5>
                            <span class="badge badge-soft-warning mb-0">Backend Developer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 065 2563 6587</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> TommyHayes@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 5 Boar Lane SELLING 2LG</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div><img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Diana Owens</a></h5>
                            <span class="badge badge-soft-danger mb-0">UI/UX Designer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 087 6321 3235</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> DianaOwens@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 52 Ilchester MYBSTER 9WX</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-end">
                        <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Remove</a></div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Paul Sanchez</a></h5>
                            <span class="badge badge-soft-success mb-0">Full Stack Developer</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-1">
                        <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 021 0125 5689</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> DianaOwens@spy.com</p>
                        <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 80 South Street MONKW 7BR</p>
                    </div>
                    <div class="d-flex gap-2 pt-4">
                        <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>
                        <button type="button" class="btn btn-primary btn-sm w-50"><i class="bx bx-message-square-dots me-1"></i> Contact</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row g-0 align-items-center pb-4">
        <div class="col-sm-6">
            <div><p class="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
        </div>
        <div class="col-sm-6">
            <div class="float-sm-end">
                <ul class="pagination mb-sm-0">
                    <li class="page-item disabled">
                        <a href="#" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                    </li>
                    <li class="page-item active"><a href="#" class="page-link">1</a></li>
                    <li class="page-item"><a href="#" class="page-link">2</a></li>
                    <li class="page-item"><a href="#" class="page-link">3</a></li>
                    <li class="page-item"><a href="#" class="page-link">4</a></li>
                    <li class="page-item"><a href="#" class="page-link">5</a></li>
                    <li class="page-item">
                        <a href="#" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- -->
  </div>
<!-- **************************************************************************************** -->
<!-- ************************************************* C A N V A S    &    M O D A L   ****** -->
  <!--                       -->
  <!--   param offcanvas     -->
  <!--                       -->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" id="paramOffcanvas" tabindex="-1">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="paramOffcanvasLabel"><strong>Titre ici</strong></h5>
        <button id="paramOffcanvasButton" type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
          <div>
            <div class="d-grid gap-2">
              <div class="mb-2">
                <label for="chatParamUserName" class="form-label">Nom du conducteur:</label>
                <input id="chatParamUserName" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamAssistantName" class="form-label">Nom de l'assistant:</label>
                <input id="chatParamAssistantName" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamSpeechRate" class="form-label">Vitesse de la voix:</label>
                <input id="chatParamSpeechRate" placeholder="De 0.8 à 1.2" type="number" min="0.8" max="1.2" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamSpeechPitch" class="form-label">Hauteur de la voix:</label>
                <input id="chatParamSpeechPitch" placeholder="De 0.2 à 2" type="number" min="0.2" max="2" class="form-control"/>
              </div>
              <!--  disabled -->
              <div class="mb-2">
                <label for="chatParamStyle" class="form-label">Style des réponses:</label>
                <input disabled id="chatParamStyle" placeholder="Exemple: dans le style de..." type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamDetail" class="form-label">Détails des réponses:</label>
                <input disabled id="chatParamDetail" placeholder="Exemple: de façon concise" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="chatParamTemperature" class="form-label">Variabilité des réponses:</label>
                <input disabled id="chatParamTemperature" placeholder="De 0 à O.9" type="number" min="0" class="form-control"/>
              </div>
              <div class="mt-4">
                <button id="chatParamChangeUserButton" type="button" class="btn btn-light" >Changer d'identifiant</button>
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
                <label for="sEventTitle" class="form-label">Motif:</label>
                <input id="sEventTitle" type="text" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="sEventTime" class="form-label">Heure de début:</label>
                <input id="sEventTime" type="time" class="form-control"/>
              </div>
              <div class="mb-2">
                <label for="sEventTime2" class="form-label">Heure de fin:</label>
                <input id="sEventTime2" disabled type="time" class="form-control"/>
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
  <!--                       -->
  <!--   singleInputModal    -->
  <!--                       -->
    <div id="singleInputModal" class="modal fade" data-bs-backdrop="static" tabindex="-1">
      <div class="modal-dialog">
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
</DEVA>
  </body>
</html>
