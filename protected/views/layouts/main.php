<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Rastreo Boton Antipanico</title>
    <meta name="description" content="Rastreo Boton Antipanico">
    <meta name="author" content="Itego">
    <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel='shortcut icon' type='image/x-icon' href='/images/launcher.ico' />
    <?php
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    $cs = Yii::app()->clientScript;
    ?>
    <?php $cs->registerCssFile(Yii::app()->request->baseUrl . "/css/bootstrap.css") ?>
    <?php $cs->registerCssFile(Yii::app()->request->baseUrl . "/css/font-awesome-4.7.0/css/font-awesome.min.css") ?>
    <?php $cs->registerCssFile("//fonts.googleapis.com/css?family=Righteous") ?>
    <?php $cs->registerCssFile(Yii::app()->request->baseUrl . "/css/style.css") ?>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
                    <script src="http://getbootstrap.com/docs-assets/js/html5shiv.js"></script>
                    <script src="http://getbootstrap.com/docs-assets/js/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/jquery.js'); ?>
    <?php // $cs->registerScriptFile(Yii::app()->request->baseUrl . "/js/funcionesGenerales.js"); ?>
    <?php //$cs->registerScript("cajasMovibles", "cajasMovibles(); //Habilita las cajas del tipo droppable ", CClientScript::POS_READY); ?>

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
            <a class="navbar-brand" href="index.php"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo_moron.png" id="logo" width="30 px" height="30 px" /></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('mensajehistorico/verultimasposiciones') ?>" role="button" aria-haspopup="true" ><i class='fa fa-align-justify'></i>  Ver Ultimos Mensajes</a>
              </li>
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('inicio/index') ?>" role="button" aria-haspopup="true" ><i class='fa fa-bullhorn'></i>  Gestion Alertas</a>
              </li>
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('mensajehistorico/visualizardispositivos') ?>" role="button" aria-haspopup="true" ><i class='fa fa-clipboard'></i>  Visualizar Dispositivos</a>
              </li>
               <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('dispositivo/admin') ?>" role="button" aria-haspopup="true" ><i class='fa fa-mobile'></i>  Dispositivos</a>
              </li>
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('usuariofinal/admin') ?>" role="button" aria-haspopup="true"><i class='fa fa-address-card'></i>  Usuario Final</a>
              </li>
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('asignaciondispositivousuario/admin') ?>" role="button" aria-haspopup="true" ><i class='fa fa-address-book'></i>  Asignacion Usuarios a Dispositivos</a>
              </li>
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('agente/admin') ?>" role="button" aria-haspopup="true" ><i class='fa fa-brush'></i>  Agentes</a>
              </li>
              <li class="waves-effect waves-light">
                      <a href="<?php echo Yii::app()->CreateAbsoluteUrl('usuariosistema/admin') ?>" role="button" aria-haspopup="true" ><i class='fa fa-user'></i>  Usuario Sistema</a>
              </li>
                <li><a href="<?php echo Yii::app()->CreateAbsoluteUrl('web/logout') ?>"><span><?php echo Yii::app()->user->name; ?></span>  <br> (Cerrar Sesion)</a></li>
          </ul>
        </div>
   
      </div><!-- /.container-fluid -->
    </nav>
    <!--End Nav-->
    <div id="main" class="container-fluid" style="padding-top: 60px; padding-left: 10px ">
      <?php echo $content; ?>
    </div>
    <!--End Content-->

  </body>
 
</html>
