<?php
/* @var $this AlertaController */
/* @var $model Alerta */

$this->breadcrumbs=array(
	'Alertas'=>array('index'),
	$model->idAlerta,
);

$this->menu=array(
	array('label'=>'List Alerta', 'url'=>array('index')),
	array('label'=>'Create Alerta', 'url'=>array('create')),
	array('label'=>'Update Alerta', 'url'=>array('update', 'id'=>$model->idAlerta)),
	array('label'=>'Delete Alerta', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idAlerta),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Alerta', 'url'=>array('admin')),
);
?>

<h1>View Alerta #<?php echo $model->idAlerta; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idAlerta',
		'AlertaidAsignacion',
		'AlertaFechaDesde',
		'AlertaFechaHasta',
		'estadoAlerta',
	),
)); ?>
