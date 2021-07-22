<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Rastreo Boton Antipanico</title>
    <meta name="description" content="Rastreo Boton Antipanico">
    <meta name="author" content="Itego">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
    if (Yii::app()->user->getState("usuEmpresa") == 2) {
      ?>
      <link rel='shortcut icon' type='image/x-icon' href='/images/launcher2.ico' />
      <?php

    } else {
      ?>
      <link rel='shortcut icon' type='image/x-icon' href='/images/launcher.ico' />
      <?php

    }
    ?>
    <?php
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    $cs = Yii::app()->clientScript;
    ?>
    <?php $cs->registerCssFile(Yii::app()->request->baseUrl . "/css/bootstrap.css") ?>
    <?php $cs->registerCssFile(Yii::app()->request->baseUrl . "/font-awesome-4.1.0/css/font-awesome.min.css") ?>
    <?php $cs->registerCssFile("//fonts.googleapis.com/css?family=Righteous") ?>
    <?php $cs->registerCssFile(Yii::app()->request->baseUrl . "/css/style.css") ?>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
                    <script src="http://getbootstrap.com/docs-assets/js/html5shiv.js"></script>
                    <script src="http://getbootstrap.com/docs-assets/js/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <?php $cs->registerCoreScript('jquery.ui'); ?>
    <?php $cs->registerScriptFile(Yii::app()->request->baseUrl . "/js/devoops.js"); ?>
    <?php $cs->registerScriptFile(Yii::app()->request->baseUrl . "/js/funcionesGenerales.js"); ?>
    <?php $cs->registerScriptFile(Yii::app()->request->baseUrl . "/js/ion.sound-3.0.0/ion.sound.min.js"); ?>
    <?php $cs->registerScript("cajasMovibles", "cajasMovibles(); //Habilita las cajas del tipo droppable ", CClientScript::POS_READY); ?>
    <?php
    if ((Yii::app()->user->getState("type") == "CLIENTE") || (Yii::app()->user->getState("type") == "SUB-USUARIO")) {

      $scriptAlertas = "$.ajax({
                                    url: 'index.php?r=alertas/verificarAlertas',
                                    type:'POST',
                                    context: document.body,
                                    success: function (data) {
                                                                    //llama a la funcion para graficar las alertas, solo si recibe registros de alertas.
                                                                    if(data!=''){
                                                                                    mostrarAlerta(data);
                                                                    }
                                                    }
                            }).error(function(e) {
                                            console.log('Se produjo un error.'+e.ResponseText);
                            });
                            timerAlertaDeUsuario =	window.setInterval(buscarAlertas, 80000);";
      $cs->registerScript("verificarAlertasUsuario", $scriptAlertas, CClientScript::POS_READY);
    }

    $scriptSonidos = "ion.sound({
								sounds: [
								{
									name: 'alarma',
									volume: 1.0,
									preload: false,
								},
                                                                {
									name: 'light_bulb_breaking',
									volume: 1.0,
									preload: false,
								},
								{
									name: 'alarma2',
									volume: 1.0,
									preload: false,
								}
								],
								volume: 1.0,
								path:'sounds/',
								preload: true
							});";
    $cs->registerScript("inicializacionSonidos", $scriptSonidos, CClientScript::POS_READY);
    ?>

  </head>
  <body>
    <?php if (Yii::app()->user->isGuest) $this->redirect('index.php?r=web/login'); ?>
    <nav class="navbar navbar-default" style="background-color: rgb(198, 40, 40);">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <?php
          if (Yii::app()->user->getState("usuEmpresa") == 2) {
            ?>
            <a class="navbar-brand" href="index.php"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logoPreventcar.png" id="logoPrevent" /></a>
            <?php

          } else {
            ?>
            <a class="navbar-brand" href="index.php"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo-stopcar2.png" id="logo" /></a>
            <?php

          }
          ?>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <?php if ((Yii::app()->user->getState('type') == "CLIENTE") || (Yii::app()->user->getState('type') == "SUB-USUARIO") || (Yii::app()->user->getState('type') == "FLOTA")) { ?>
              <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('flota/index') ?>"><i class='fa fa-dashboard'>
                  </i> Inicio</a>
              </li>
              <!--<li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('flota/graficarflota') ?>"><i class='fa fa-map-marker'>
                      </i> Mapa</a>
              </li>-->
              <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('zonas/index') ?>"><i class='fa fa-desktop'>
                  </i> Zonas</a></li>

              <!--<li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('informes/index') ?>"><i class='fa fa-table'>
                  </i> Informes</a></li>-->
                  <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i class='fa fa-table'></i> Informes <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('informes/index') ?>">Informes en pantalla</a></li>
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('estadisticoProgramado/programacion') ?>">Programar Informe Estadistico</a></li>
                </ul>
              </li>
            <?php 
          } ?>

            <?php if ((Yii::app()->user->getState('type') != "ADMINISTRATIVO")) { ?>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i class='fa fa-warning'></i> Alertas <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="<?php echo Yii::app()->createAbsoluteUrl('alertas/historico') ?>">Registro historico</a></li>
                  <li><a href="<?php echo Yii::app()->createAbsoluteUrl('alertas/index') ?>">Asistente de alertas</a></li>
                  <?php if(Yii::app()->user->getState("type") == "OPERADOR" || Yii::app()->user->getState("type") == "ADMINISTRADOR" ){?>
                  <li><a href="<?php echo Yii::app()->createAbsoluteUrl('listaNegra/admin') ?>">Administrar Lista Negra</a></li>
                  <?php  }?>
                  <?php if ((Yii::app()->user->getState('type') == "CLIENTE") || ((Yii::app()->user->getState('type') == "SUB-USUARIO") && (Yii::app()->user->getState('subAdmin') == "1"))) { ?> 
                    <li><a href="<?php echo Yii::app()->createAbsoluteUrl('kmMoviles/kilometraje') ?>">Kilometraje</a></li>
                    <li><a href="<?php echo Yii::app()->createAbsoluteUrl('hsMoviles/cronometraje') ?>">Horas de uso</a></li>
                  <?php 
                }
                 
                if(Yii::app()->user->getState('type') == "CLIENTE"){
                  ?>
                  <li><a href="<?php echo Yii::app()->createAbsoluteUrl('controles/listado') ?>">Listado de Controles de Alertas</a></li> 
                  <li><a href="<?php echo Yii::app()->createAbsoluteUrl('alertas/panelAlertas') ?>">Panel Alertas</a></li> 
                  <?php
                }
                ?>

                </ul>
              </li>
            <?php 
          } ?>
            <?php if ((Yii::app()->user->getState('type') == "CLIENTE")) { ?>
              <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionMoviles/iconos') ?>"><i class='fa fa-th'>
                  </i> Iconos</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i class='fa fa-user'></i> Usuarios <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionUsuarios/AdministrarUsuarioCliente') ?>">Administrar</a></li>
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionMoviles/asignarSubusuario') ?>">Asignar moviles</a></li>
                </ul>
              </li>

            <?php 
          } ?>
            <?php if ((Yii::app()->user->getState('type') == "CLIENTE") || ((Yii::app()->user->getState('type') == "SUB-USUARIO") && (Yii::app()->user->getState('subAdmin') == "1"))) { ?>
              <li class="dropdown" style="">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class='fa fa-users'></i> Conductores <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('conductores/admin') ?>">Administrar</a></li>
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('asignacionMovilConductor/admin') ?>">Asignar móvil a conductor</a></li>
                 <!-- <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('conductores/asignaributton') ?>">Asignar iButton</a></li> -->
                </ul>
              </li>
            <?php 
          } ?>

            <?php
            /* PESTAÑA LOGISTICA: Clientes o sub usuarios administradores
              ================================================================== */
            if ((Yii::app()->user->getState('type') == "CLIENTE") || ((Yii::app()->user->getState('type') == "SUB-USUARIO") && (Yii::app()->user->getState('subAdmin') == "1"))) {
              ?>
              <li class="dropdown" style="">
                <a href="<?php echo Yii::app()->CreateAbsoluteUrl('logistica/index') ?>" role="button" aria-haspopup="true" target="_blank"><i class='fa fa-truck'></i> Logistica</a>
              </li>
              <?php

            }
            ?>

            <?php if ((Yii::app()->user->getState('type') == "CLIENTE") || ((Yii::app()->user->getState('type') == "SUB-USUARIO") && (Yii::app()->user->getState('subAdmin') == "1"))) { ?>
              <li class="dropdown" style="">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class='fa fa-car'></i> Móviles <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('datosMoviles/admin') ?>">Administrar</a></li>
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('movil/listaFotos') ?>">Cargar Imagenes</a></li>
                </ul>
              </li>
              <?php
              if (Yii::app()->user->getState("usuEmpresa") != 2) {
                ?>
                <li>
                  <a href="<?php echo Yii::app()->CreateAbsoluteUrl('flota/descargarManual') ?>" style="color: #FFD700">
                    
                      <span class="glyphicon glyphicon-question-sign" aria-hidden="true" ></span> Manual de uso
                    
                  </a>
                </li>
                <?php

              }
              ?>
            <?php 
          } ?>

            <?php if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR") || (Yii::app()->user->getState('type') == "ADMINISTRATIVO")) { ?>
              <li class="dropdown" >
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class='fa fa-users'></i> Informes Operador <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('informes/index') ?>">
                      Informe de Reportes</a></li>
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('informes/mensajes') ?>">
                      Informe de Mensajes</a></li>
                  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('informes/alertas') ?>">
                      Informe de Alertas</a></li>
                </ul>
              </li>
              <?php if ((Yii::app()->user->getState('type') != "ADMINISTRATIVO")) { ?>
                                                                                                                                                                                                            <!--  <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('conductores/asignaributton') ?>">Asignar iButton</a></li> -->

              <?php 
            } ?>
              <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('operador') ?>"><i class='fa fa-user'></i> Panel de Operador</a></li>
              <?php if ((Yii::app()->user->getState('type') != "ADMINISTRATIVO")) { ?>
                <!-- OLD AHORA SE USA _vistaCaidos
              <li><a href="javascript:void(0)"  onClick="$('#modalCaidos').modal('show');">
                    <i class='fa fa-warning'></i> Caidos</a></li>
                -->
                <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('operador/vistaCaidos') ?>">
                    <i class='fa fa-warning'></i> Caidos</a></li>
                <!--                            <li><a href="javascript:void(0)" onClick="window.open('index.php?r=comandosDispositivo/envios', '', 'width=900, height=600');">
                <i class='fa fa-keyboard-o'></i> Envio de Comandos</a></li>
                -->
              <?php 
            } ?>
            <?php 
          } ?>
            <?php if (Yii::app()->user->getState('type') == "ADMINISTRADOR" || (Yii::app()->user->getState('type') == "OPERADOR") || (Yii::app()->user->getState('type') == "ADMINISTRATIVO")) { ?>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class='fa fa-wrench'></i> Panel de Administracion <span class="caret"></span></a>
                <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">Clientes</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionClientes/admin') ?>">Administrar</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">Dispositivos</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionDispositivos/admin') ?>">Administrar</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('configuracionDispositivos/admin') ?>">Eventos por Equipo</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('operador/dispositivosPuertos') ?>">Equipos por Puerto</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('serverCelular/admin') ?>">Asignación de Celulares</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('envioComandos/enviar') ?>">Envio de Comandos</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('operador/reportesIccid') ?>">Reportes Iccid</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">Moviles</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionMoviles/admin') ?>">Administrar</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionMoviles/asignar') ?>">Asignacion a Usuarios</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('asignacionMovilesUsuario/admin') ?>">LIstado de Asignaciones</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">Usuarios</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionUsuarios/create') ?>">Crear</a></li>
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionUsuarios/admin') ?>">Administrar</a></li>
                      <?php /* Solo para el usuario de puche */
                      if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") && (Yii::app()->user->getId() == 63)) {
                        ?>
                          <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('mensaje/getMensaje') ?>" target="_blank">Mensaje</a></li>
                          <?php

                        }
                        ?>
                      <?php 
                      if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")) {
                        ?>
                        <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('sugerencia/listado') ?>">Ver Sugerencias</a></li>
                        <?php 
                      }
                      ?>
                      <?php
                       if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")) {
                        ?>
                        <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('gestionUsuarios/eliminarSesionesApp') ?>">Eliminar sesiones de app</a></li>
                        <?php 
                      }
                      ?>
        
                      <?php 
                        if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")){
                      ?>
                        <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('parking/listadoParking') ?>">Inactivar Parking</a></li>
                      <?php 
                        }
                      ?>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">Comandos de equipos</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('comandosDispositivo/admin') ?>">Administrar</a></li>

                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">iButton</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('ibutton/admin') ?>">Administrar</a></li>

                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:void(0)">Integradores</a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('IntegradoresEmpresas/admin') ?>">Administrar</a></li>


                    </ul>
                  </li>
                </ul>
              </li>
            <?php 
          } ?>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <?php if ((Yii::app()->user->getState('type') == "CLIENTE") || (Yii::app()->user->getState('type') == "SUB-USUARIO") || (Yii::app()->user->getState('type') == "FLOTA")) { ?>
              <li><a href="javascript:void(0)" class="modal-link" onClick="ticketsUserPopup('<?php echo Yii::app()->user->name; ?>')">
                  <i class="fa fa-comment"></i>
                  <span class="badge" id="contador-notificaciones"></span>
                </a>
              </li>
            <?php 
          } ?>
            <?php if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")) { ?>
              <li>
                <a href="#"  id="verModulos" data-toggle="popover" data-template='<div class="popover" id="popoverModulos" role="tooltip" style="width:600px; height: 630px;"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" style=""></div></div>' data-html="true" data-container="body"
                   data-content='
                   <span style="font-size:16px;">Módulos</span><div style="float:right;"><?php echo CHtml::button('Reiniciar Módulos', array('onclick' => "$('#modalReinicio').modal('show')", 'class' => 'btn btn-primary')); ?></div>
                   <br /><br />
                   <div id="estadoModulos">
                   <div id="loadingmessage" style="display:block;">
                   <img src="images/loading.gif" style="position:absolute; margin:auto; top:0; bottom:0; left:0; right:0;"/>
                   </div>
                   </div>'
                   data-placement="bottom">
                  <i class="glyphicon glyphicon-tasks" id="iconoModulos"></i>
                </a>
              </li>
              <li><a href="javascript:void(0)" onClick="reportesPopup()">
                  <i class="glyphicon glyphicon-map-marker"></i>
                </a>
              </li>
              <li><a href="javascript:void(0)" class="modal-link" onClick="ticketsOperadorPopup('<?php echo Yii::app()->user->name; ?>')">
                  <i class="fa fa-comment"></i>
                  <span class="badge" id="contador-notificaciones-op"></span>
                </a>
              </li>
            <?php 
          } ?>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class='fa fa-user'></i> <span><?php echo Yii::app()->user->name; ?></span> <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('usuario/datos') ?>">Datos de Usuario</a></li>
                <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('usuario/cambiarcontrasena') ?>">Cambio de Password</a></li>
                <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('web/logout') ?>">Cerrar Sesion</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <!--End Nav-->
    <div id="main" class="container-fluid" style="padding-top: 30px">
      <?php echo $content; ?>
    </div>
    <!--End Content-->

    <?php // Render del modal, el cual detalla los datos del movil clickeado en el menu de moviles    ?>
    <?php $this->renderPartial('application.views.alertas._modalUltimasAlertas'); ?>
    <?php $this->renderPartial('application.views.alertas._modalUltimasAlertasCliente'); ?>
    <?php $this->renderPartial('application.views.flota._modalDireccionesEncontradas'); ?>

    <?php // Render del modal para verificar los moviles caidos por el operadors     ?>
    <?php if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")) { ?>
      <!-- SE REEMPLAZA _modalCaidos POR _vistaCaidos (operador/vistaCaidos) NOTA: motivo: no se podia abrir un popup andetro de otro porque boostrap no lo soporta
      <?php //$this->renderPartial('application.views.operador._modalCaidos', array());    ?>
      -->
      <?php $this->renderPartial('application.views.operador._modalCargarTicket', array()); ?>



      <!-- Modal -->
      <div class="modal fade" id="modalReinicio" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

        <div class="modal-dialog" style="width:400px; height: 100px;">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title" id="myModalLabel">Reiniciar Módulos</h4>
            </div>

            <div class="modal-body" style="text-align: center;">
              <div class="alert alert-danger">
                <strong>¡Atención!</strong> Haga sólo un click por botón.
              </div> <br>
              <input onclick="reinicioModulo1()" class="btn btn-danger" name="yt6" type="button" value="Reiniciar modulos"> <br><br>
              <input onclick="reinicioModulo2()" class="btn btn-danger" name="yt7" type="button" value="Reiniciar modulos2"> <br><br>
              <input onclick="reinicioModulo3()" class="btn btn-danger" name="yt8" type="button" value="Reiniciar modulos3"> <br><br>
              <input onclick="reinicioModulo4()" class="btn btn-danger" name="yt8" type="button" value="Reiniciar modulos4"> <br><br>
            </div>
          </div> <!-- /.modal-content -->
        </div>
      </div>
    <?php 
  } ?>
  </body>
  <script>
    function ticketsUserPopup(variable) {
      if (variable != '' || variable == undefined) {
        window.open("https://gps.divisiongps.com.ar/tickets/user/index.php?id=" + variable, "", "width=900, height=600");
      }
    }
    function ticketsOperadorPopup(variable) {
      if (variable != '' || variable == undefined) {
        window.open("https://gps.divisiongps.com.ar/tickets/admin/index.php?id=" + variable, "", "width=900, height=600");
      }
    }

<?php if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")) { ?>
      function reportesPopup() {
        window.open("index.php?r=operador/reportespopup", "", "width=1200, height=600,scrollbars=yes");
        return false;
      }
      function reinicioModulo1() {
        window.open("http://10.2.12.223/reinicio.php");
        alert("REINICIANDO MODULOS1, POR FAVOR ESPERE.");
      }

      function reinicioModulo2() {
        window.open("http://10.2.12.224/reinicio.php");
        alert("REINICIANDO MODULOS2, POR FAVOR ESPERE.");
      }

      function reinicioModulo3() {
        window.open("http://10.2.12.213/reinicio.php");
        alert("REINICIANDO MODULOS3, POR FAVOR ESPERE.");
      }

      function reinicioModulo4() {
        window.open("http://10.2.12.199/reinicio.php");
        alert("REINICIANDO MODULOS4, POR FAVOR ESPERE.");
      }
<?php 
} ?>

    $(document).ready(function () {
<?php if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR")) { ?>
        verModulos();
        setInterval(contarTickets(), 1000 * 60 * 10); //recarga tickets cada 10 min

        $("#verModulos").click(function () {
          verModulos();
        });
        var timerModulosOp = setInterval(function () {
          verModulos();
        }, 60000); //timer para verificar los modulos cada 1 minuto

        function verModulos() {
          $.ajax({
            url: "index.php?r=operador/estadopuertos",
            cache: false,
            type: 'GET',
            context: document.body,
            success: function (data) {
              if (data) {
                $("#estadoModulos").empty();
                var off = false;

                var titulosFixedTable = "<table class='' style=''><thead><tr style='height: 26px; border-bottom: 2px solid #b9b9b9; background-color:#eff3f8; color:#6e6e6e;'><th style='width:70px;padding-left:3px;'>Puerto</th><th style='width:60px;'>Móviles</th><th style='width:80px; text-align:center;'><input type='button' value='Buffer' style='line-height: 16px;' id='btnBufferModulos'></th><th style='width:140px; text-align:center;'>Última recepción</th><th style='width:100px; text-align:center;'>Servidor</th><th style='width:90px; text-align:center;'>Estado</th></tr></thead></table>";
                var htmlTable = "<div style='height: 530px;overflow:auto;'><table class='' style=''><tbody style=''>";

                var flag_background_color = false; // la primera fila en blanco, porque el titulo tiene color
                for (var i = 0; i < Object.keys(data).length; i++) {
                  var a = new Date(); // Now
                  partes = [];
                  partes2 = [];
                  partes3 = [];
                  partes = data[i].ultimoReporte.split(" ");
                  partes2 = partes[0].split("-");
                  partes3 = partes[1].split(":");
                  var b = new Date(partes2[0], partes2[1] - 1, partes2[2], partes3[0], partes3[1], partes3[2], 0); // 2010
                  var diff = a - b;
                  var minutos = diff / 1000 / 60;

                  var offline_msj = "";
                  if (minutos > (60 * 24)) { // si esta caido mas de 1 dia
                    offline_msj = Math.round(minutos / 60) + " HRS OFF";
                  } else {
                    offline_msj = Math.round(minutos) + " MIN OFF";
                  }
                  var estado = (minutos > 19 ? '<font style="color: red; text-align: right; font-size: 12px;"><b>' + offline_msj + '</b></font>' : '<font style="color: green; text-align: right; font-size: 12px;"><b>ONLINE</b></font>');

                  datos = "<tr style='color:#555555; border-bottom: 1px solid #dcdcdc; background-color: " + ((flag_background_color) ? "#f7f8ff" : "none") + "'><td style='width:70px;padding-left:3px;'>" + data[i].puerto + "</td><td style='width:60px;'>" + data[i].cantidadMoviles + "</td><td style='width:80px; text-align:center;'><div name='bufferCount'>--</div></td><td style='width:140px;'>" + data[i].ultimoReporte + "</td><td style='width:100px; text-align:center;'>" + data[i].PC.toUpperCase() + "</td><td style='width:90px; text-align:center;'>" + estado + "</td></tr>";
                  htmlTable += datos;
                  flag_background_color = !flag_background_color;

                  if (minutos > 19) {
                    ion.sound.play("light_bulb_breaking");
                    off = true;
                    $(".notifyjs-corner").html("");
                    $.notify("ERROR: MÓDULO " + data[i].puerto + " (" + data[i].PC + ") CAÍDO.", {
                      autoHide: false,
                      style: 'bootstrap',
                      className: 'error'
                    });
                  }
                }

                htmlTable += "</tbody></table></div>";
                $("#estadoModulos").append(titulosFixedTable);
                $("#estadoModulos").append(htmlTable);

                if (typeof modulosCargados !== 'undefined' && typeof modulosTraidos !== 'undefined') {
                  if (modulosCargados.length !== modulosTraidos) {
                    $("#btnBufferModulos").prop('disabled', true);
                    $("#btnBufferModulos").css("color", "#c4c4c4");
                  }
                }

                // boton buffer
                $("#btnBufferModulos").on('click', function () {
                  verModulosBuffer();
                });

                if (off) {
                  $("#iconoModulos").css("color", "red");
                } else {
                  $("#iconoModulos").css("color", "white");
                }
              }
            }
          });
        }

        var modulosCargados; // total de modulos para traer buffer
        var modulosTraidos; // modulos que ya se trajo el buffer
        function verModulosBuffer() {
          $("#btnBufferModulos").prop('disabled', true);
          $("#btnBufferModulos").css("color", "#c4c4c4");

          modulosCargados = [];
          modulosTraidos = 0;

          $.each($("#estadoModulos table tbody tr td:first-child"), function (index, value) {
            modulosCargados.push($(this).html());
          });

          getBufferPuerto();
        }

        function getBufferPuerto() {
          var tr = $("#estadoModulos table tbody tr:eq(" + modulosTraidos + ")");
          var divBufferCount = tr.find("td:eq(2)");

          var loadingGif = '<div id="loadingmessage" style="display:block;"><img src="images/cargando1.gif" style="width:15px; height:15px;"/></div>';
          divBufferCount.empty();
          divBufferCount.append(loadingGif);

          $.ajax({
            url: "index.php?r=operador/getBufferPuerto",
            type: 'GET',
            data: {puerto: modulosCargados[modulosTraidos]},
            dataType: 'HTML',
            success: function (respuesta) {
              var bufferCant = parseInt(respuesta);
              var bufferMensaje = "";

              if (bufferCant < 0) {
                bufferMensaje = "<span style='color: orange; font-size: 12px;'>NO LEIDO</span>";
              } else {
                if (bufferCant < 1000) {
                  bufferMensaje = "<span style='color: rgb(29,100,0);'>" + bufferCant + "</span>";
                } else {
                  if (bufferCant < 10000) {
                    bufferMensaje = "<span style='color: rgb(100,0,100);'>" + bufferCant + "</span>";
                  } else {
                    bufferMensaje = "<span style='color: rgb(100,0,0);'>" + bufferCant + "</span>";
                  }
                }
              }

              if (bufferCant > 100000) {
                tr.css('background-color', '#fff0f0');
              }

              divBufferCount.empty();
              divBufferCount.append(bufferMensaje);
            },
            error: function (xhr, ajaxOptions, thrownError) {
              divBufferCount.empty();
              divBufferCount.append('Error');
            },
            complete: function () {
              modulosTraidos++;
              if (modulosTraidos < modulosCargados.length && $("#estadoModulos").is(":visible")) {
                getBufferPuerto();
              } else {
                // revisar si quedaron filas sin actualizar: (puede pasar porque el popup se actualiza con el timer, pero el buffer no)
                if ($("#estadoModulos").is(":visible")) {
                  var flag_filas_sin_actualizar = false;

                  $.each($("#estadoModulos table tbody tr td:eq(2)").find("div[name='bufferCount']"), function (index, value) {
                    if ($(this).html() === "--") {
                      flag_filas_sin_actualizar = true;
                    }
                  });

                  if (flag_filas_sin_actualizar) {
                    // si al terminar quedaron filas sin actualizar, vuelve a empezar
                    verModulosBuffer();
                  } else {
                    // todos actualizados
                    $("#btnBufferModulos").prop('disabled', false);
                    $("#btnBufferModulos").css('color', '#6e6e6e');
                  }
                } else {
                  // si no es visible reiniciamos las variables
                  modulosCargados = [];
                  modulosTraidos = 0;
                }
              }
            }
          });
        }
<?php 
} ?>
    });
  </script>
</html>
