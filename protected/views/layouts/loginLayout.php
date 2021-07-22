<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <title>Rastreo Boton Antipanico TFG</title>
    <meta name="description" content="Rastreo Boton Antipanico TFG">
    <meta name="author" content="sebastianpereznetto
    ">
    <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php
        /*$hostname = $_SERVER['SERVER_NAME'];
        if (strpos($hostname, 'preventcar') !== false) {
            ?>
            <link rel='shortcut icon' type='image/x-icon' href='/images/launcher2.ico' />
            <link rel="apple-touch-icon" sizes="57x57" href="/images/launcher2.ico" />
        <?php

    } else {
        ?>
            <link rel='shortcut icon' type='image/x-icon' href='/images/launcher.ico' />
            <link rel="apple-touch-icon" sizes="57x57" href="/images/launcher.ico" />
        <?php

    }*/
        ?>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/bootstrap.css" rel="stylesheet" />
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/jquery.mobile.min.css" rel="stylesheet" />
    </head>

    <body>
        <div data-role="page">
            <div data-role="header" data-theme="c" style='background-color: rgb(198, 40, 40);border:none;text-align: center; height: 80px'>
                <?php
                /*$hostname = $_SERVER['SERVER_NAME'];
                if(strpos($hostname, 'preventcar') !== false){
                ?>
                    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logoPreventcar.png" height="70px" style="margin-top: 2px;"/>
                <?php
                }else{
                ?>
                    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo-stopcar2.png" height="40px" style="margin-top: 20px"/>
                <?php
                }*/
                ?>
                    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo_moron.png" height="40px" style="margin-top: 20px"/>
            
        </div>
            <!-- /header -->
            <div role="main" class="ui-content" style="max-width: 800px; margin:0 auto;">
                <h3>Iniciar sesi&oacute;n</h3>

                <?php echo $content; ?>

            </div><!-- /content -->
        </div><!-- /page -->
    </body>
</html>
