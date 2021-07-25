<?php Yii::app()->clientScript->registerScriptFile('https://www.gstatic.com/charts/loader.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/jquery.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/funcionesGmapOSM.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet-src.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.draw-src.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.label-src.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.measurecontrol.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/l.control.geosearch.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/l.geosearch.provider.esri.js'); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl . '/js/leaflet/l.markerrotate.js'); ?>
<?php Yii::app()->clientScript->registerCssFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.css'); ?>
<?php Yii::app()->clientScript->registerCssFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.draw.css'); ?>
<?php Yii::app()->clientScript->registerCssFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.label.css'); ?>
<?php Yii::app()->clientScript->registerCssFile(Yii::app()->request->baseUrl . '/js/leaflet/leaflet.measurecontrol.css'); ?>
<?php Yii::app()->clientScript->registerCssFile(Yii::app()->request->baseUrl . '/js/leaflet/l.geosearch.css'); ?>

<style type="text/css">
  .popover {
    max-width: 600px;
  }

</style>

<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/googlemaps.css" />


<div class="row">
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px; font-size: 11px">

    <div style="float: left; margin-left: 30px"> | </div>
    <div style="float: left; margin-left: 30px"> Referencias: </div>
    <div style="float: left; cursor: pointer; margin-left: 20px">
      <img src="css/images/icons-png/tag-black.png" height="10" /> EN ESPERA
      <img src="css/images/icons-png/star-black.png" height="10" style="margin-left: 10px" /> ENPROCESO
      <img src="css/images/icons-png/search-black.png" height="10" style="margin-left: 10px" /> CERRADA
      <img src="css/images/icons-png/power-black.png" height="10" style="margin-left: 10px" /> ANULADA
    </div>
    
    
  </div>
</div>


<div class="row" style="padding-left: 10px">
  <div id="movilesDiv" class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left: 3px; padding-right: 3px;">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
            Ultimas ALERTAS
          </div>
      </div>
      <div class="panel-content" style="height:650px; overflow:auto; padding: 0px;" id="grillaUltimasPosiciones">
        <div style="position: absolute; background-color: #FFF; width: 100%; height: 400px; z-index: 1000; opacity: 0.7; display:none" id="cargandoUltPosicion">
          <i class="fa fa-spinner fa-spin fa-4x" style="margin-top: 150px; left: 50%; margin-left: -35px; position: absolute"></i>
        </div>
        <div class="tab-pane active" id="resumen">
                <?php
                $form = $this->beginWidget(
                        'booster.widgets.TbActiveForm', array(
                    'id' => 'filtro-posiciones',
                    'type' => 'inline',
                        )
                );
                ?>
                <div class="row">

                    <div class="col-md-3">
                        <div class="form-group">
                            <?php
                            $this->widget('application.extensions.juidatetimepicker.EJuiDateTimePicker', array(
                                'model' => $modelfiltro, //Model object
                                'language' => 'es',
                                'htmlOptions' => array('class' => 'form-control', 'style' => 'width:100%', 'placeholder' => 'Fecha desde'),
                                'attribute' => 'desde',
                                'mode' => 'datetime',
                                'options' => array(
                                    'dateFormat' => 'yy-mm-dd',
                                    'timeFormat' => 'hh:mm', //'hh:mm tt' default
                                ),
                            ));
                            ?>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">	
                            <?php
                            $this->widget('application.extensions.juidatetimepicker.EJuiDateTimePicker', array(
                                'model' => $modelfiltro, //Model object
                                'language' => 'es',
                                'htmlOptions' => array('class' => 'form-control', 'style' => 'width:100%', 'placeholder' => 'Fecha hasta'),
                                'attribute' => 'hasta',
                                'mode' => 'datetime',
                                'options' => array(
                                    'dateFormat' => 'yy-mm-dd',
                                    'timeFormat' => 'hh:mm', //'hh:mm tt' default
                                )
                            ));
                            ?>
                        </div>
                    </div>
               
                    <div class="row-fluid" style="margin-top:10px;"> 
                        <?php
                          $this->widget(
                                  'booster.widgets.TbButton', array('buttonType' => 'button', 'label' => 'Enviar Fechas', 'context' => 'primary', 'htmlOptions' => ['onclick' => 'ultimasPosiciones();'])
                          );
                        ?>
                    </div>
                  </div>
      
                <?php
                $this->endWidget();
                unset($form);
                ?>
            </div>
        <?php
        $this->renderPartial('_grillaUltimasPosiciones', array('arrayDataProvider' => $arrayDataProvider));
        ?>
      </div>
    </div>
  </div>

  <div id="mapaDiv" class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left: 3px; padding-right: 3px;">
    <div id="boxMapa" class="panel panel-default">
      <div class="panel-heading">
        <span>Mapa </span>
        <div style="float:right;">
            <?php
                                  echo CHtml::checkBox('autoRefreshMapa', true);
                                  echo CHtml::label('Actualizar automaticamente', 'autoRefreshMapa');
                                  ?>
        </div>
      </div>
      <div class="panel-content" style="padding:0; height: 650px; width: 100%;">
        <div id="map-canvas" class="box-content olMap" style="height: 100%; width: 100%;padding: 0;">
        </div>
     <!-- mapaaaaa -->


      </div>
    </div>
  </div>
</div> <!-- /.row -->

<?php $this->renderPartial('_modalDetallesPosicion'); ?>
