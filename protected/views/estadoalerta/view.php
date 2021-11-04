<?php
/* @var $this EstadoalertaController */
/* @var $model estadoAlerta */

$this->breadcrumbs=array(
	'Estado Alertas'=>array('index'),
	$model->idEstadoAlerta,
);

$this->menu=array(
	array('label'=>'List estadoAlerta', 'url'=>array('index')),
	array('label'=>'Create estadoAlerta', 'url'=>array('create')),
	array('label'=>'Update estadoAlerta', 'url'=>array('update', 'id'=>$model->idEstadoAlerta)),
	array('label'=>'Delete estadoAlerta', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idEstadoAlerta),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage estadoAlerta', 'url'=>array('admin')),
);
?>

<h1>View estadoAlerta #<?php echo $model->idEstadoAlerta; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idEstadoAlerta',
		'Descripcion',
	),
)); ?>
