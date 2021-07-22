

<?php


$this->widget('booster.widgets.TbExtendedGridView', array(
'id' => 'ultpos-inicio-grid',
 'dataProvider' => $arrayDataProvider,
 'filter' => $filtersForm,
 'template' => "{items}",
 'type' => 'striped condensed bordered hover',
 'ajaxUrl' => Yii::app()->createUrl('flota/index'),
'columns' => array(
array(
'name' => 'MensajeIMEI',
 'header' => 'MensajeIMEI',
 ),
 array(
'name' => 'UsuarioFinalNombre',
 'header' => 'UsuarioFinalNombre'
),
 array(
'name' => 'MensajeFechaHora',
 'header' => 'Fecha',
 ),
 array(
'name' => 'MensajeNivelBateria',
 'header' => 'Nivel Bateria'
),

 array(
'name' => 'AlertaEstado',
 'header' => 'AlertaEstado'
),

 /*array(
'header' => '',
 'type' => 'raw',
 'value' => '"<div class=\"btn-group\">
  <button class=\"btn btn-default btn-xs dropdown-toggle icono\" type=\"button\" data-toggle=\"dropdown\" rel=\"tooltip\" data-original-title=\"Imprimir el Contrato\" aria-haspopup=\"true\" aria-expanded=\"false\" style=\"margin:0 0 0 0\">
    <span class=\"glyphicon glyphicon-cog\"></span>
  </button>
  <ul class=\"dropdown-menu pull-right\">
    <li><a id=\"".$data["idMovil"]."\" href=\"javascript:void(0)\" onclick=\"visualizaVehiculo(this.id);\">Ver en el mapa</a></li>
    <li><a id=\"".$data["idMovil"]."\" href=\"javascript:void(0)\" onclick=\"sumarVehiculo(this.id);\">Sumar al mapa</a></li>
    <li><a id=\"".$data["idMovil"]."\" href=\"javascript:void(0)\" onclick=\"menuVisualizaRecorrido(this.id);\">Ver Recorrido</a></li>
    <li><a id=\"".$data["idMovil"]."\" href=\"javascript:void(0)\" onclick=\"menuDescargaRecorrido(this.id);\">Descargar Recorrido</a></li>
    <!--<li><a id=\"".$data["idMovil"]."\" href=\"javascript:void(0)\" onclick=\"verSeguimiento(this.id);\">Ver Seguimiento</a></li>-->
    <li><a id=\"".$data["dominio"]."\" href=\"javascript:void(0)\" onclick=\"verificarUltimasAlertas(this.id);\">Últimas Alertas</a></li>
    <li><a id=\"".$data["idM"]."\" href=\"javascript:void(0)\" onclick=\"modificarAlias(this.id,\'".$data["dominio"]."\');\">Cambiar Alias</a></li>
    <li><a id=\"sensores\" href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>
  </ul>
                </div>"',
 ),*/
  array(
  'class' => 'booster.widgets.TbButtonColumn',
  'header' => 'Acciones',
  'template'=>'{direccion}{verposiciones}{envio}{descarga}',
 
    'buttons' => array
    (
      'direccion' => array
      (
      'label'=>'Ver Alerta en el mapa',
      'icon'=>'globe',
      'url'=>'$data["MensajeLatitud"].",".$data["MensajeLongitud"]',
      'options'=>array(
      'onclick'=>'return false;',
      'style'=>'margin:7px;',
      'class'=>'verDireccion'
      ),
    ), 
    'verposiciones' => array
    (
      'label' => 'Ver Posiciones',
      'icon' => 'search',
      'url' => 'Yii::app()->createUrl("alerta/verposiciones", array("movil"=>$data["idMensaje"]))',
      'options' => array(
      'style' => 'margin:7px;',
     
      ),
   ),
  'envio' => array
  (
    'label' => 'Compartir Ubicacion',
    'icon' => 'map-marker',
    'url' => 'Yii::app()->createUrl("alerta/enviosms", array("movil"=>$data["idMensaje"]))',
    'options' => array(
    'style' => 'margin:7px;',
    
    ),
 ),
 'descarga' => array
  (
      'label' => 'Descargar Alerta',
      'icon' => 'download',
      'url' => 'Yii::app()->createUrl("informes/descargarposicion", array("movil"=>$data["idMensaje"]))',
      'options' => array(
      'style' => 'margin:7px;'
      ),
  ),
 ),
 'htmlOptions' => array(
'style' => 'width: 110px',
 ),
 )
)
));

//".$data["fechaHora"]!="MOVIL SIN POSICION" ? "<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>" : ""
//<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>
?>