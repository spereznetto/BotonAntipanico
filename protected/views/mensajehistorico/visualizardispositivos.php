<?php
/* @var $this AlertaController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Alertas',
);

?>

<h3>Visualizacion de Dispositivos</h3>

<h5>Este modulo muestra una grilla con los ultimos mensajes recibidos dese los diferentes moviles, sean o no alertas, esten o no asignados o vincualdos a un usuario final.</h5>

<div class="row" style="padding-left: 10px">
  <div id="movilesDiv" colspan="2" class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="padding-left: 3px; padding-right: 3px;">
    <div class="panel panel-default">
      <div class="panel-content" style="height:400px; overflow:auto; padding: 0px;" id="grillaUltimasPosiciones">
        <div style="position: absolute; background-color: #FFF; width: 100%; height: 100%; z-index: 1000; opacity: 0.7; display:none" id="cargandoUltPosicion">
          <i class="fa fa-spinner fa-spin fa-4x" style="margin-top: 150px; left: 50%; margin-left: -35px; position: absolute"></i>
        </div>
        
        <?php
        $this->renderPartial('_grillaUltimasPosiciones', array('arrayDataProvider' => $arrayDataProvider));
        ?>
      </div>
    </div>
  </div>

  <div id="mapaDiv" class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding-left: 3px; padding-right: 3px;">
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
      <div class="panel-content" style="padding:0; height: 400px; width: 100%;">
        <div id="map-canvas" class="box-content olMap" style="height: 100%; width: 100%;padding: 0;">
        </div>
     <!-- mapaaaaa -->
      </div>
    </div>
  </div>
</div> <!-- /.row -->