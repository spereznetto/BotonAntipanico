<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $model AsignacionDispositivoUsuario */

$this->breadcrumbs=array(
	'Asignacion Dispositivo Usuarios'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List AsignacionDispositivoUsuario', 'url'=>array('index')),
	array('label'=>'Manage AsignacionDispositivoUsuario', 'url'=>array('admin')),
);
?>

<h3>Crear  asignacion</h3>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>