<?php
/* @var $this EstadoalertaController */
/* @var $model estadoAlerta */

$this->breadcrumbs=array(
	'Estado Alertas'=>array('index'),
	$model->idEstadoAlerta=>array('view','id'=>$model->idEstadoAlerta),
	'Update',
);

$this->menu=array(
	array('label'=>'List estadoAlerta', 'url'=>array('index')),
	array('label'=>'Create estadoAlerta', 'url'=>array('create')),
	array('label'=>'View estadoAlerta', 'url'=>array('view', 'id'=>$model->idEstadoAlerta)),
	array('label'=>'Manage estadoAlerta', 'url'=>array('admin')),
);
?>

<h1>Update estadoAlerta <?php echo $model->idEstadoAlerta; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>