<?php
/* @var $this EstadoalertaController */
/* @var $model estadoAlerta */

$this->breadcrumbs=array(
	'Estado Alertas'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List estadoAlerta', 'url'=>array('index')),
	array('label'=>'Manage estadoAlerta', 'url'=>array('admin')),
);
?>

<h1>Create estadoAlerta</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>