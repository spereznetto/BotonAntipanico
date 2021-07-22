<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $model AsignacionDispositivoUsuario */

$this->breadcrumbs=array(
	'Asignacion Dispositivo Usuarios'=>array('index'),
	$model->idAsignacion,
);

$this->menu=array(
	array('label'=>'List AsignacionDispositivoUsuario', 'url'=>array('index')),
	array('label'=>'Create AsignacionDispositivoUsuario', 'url'=>array('create')),
	array('label'=>'Update AsignacionDispositivoUsuario', 'url'=>array('update', 'id'=>$model->idAsignacion)),
	array('label'=>'Delete AsignacionDispositivoUsuario', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idAsignacion),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage AsignacionDispositivoUsuario', 'url'=>array('admin')),
);
?>

<h3>Ver  asignacion numero <?php echo $model->idAsignacion; ?></h3>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idAsignacion',
		'AsignacionIMEI',
		'AsignacionIdUsuarioFinal',
		'AsignacionFechaAlta',
	),
)); ?>
