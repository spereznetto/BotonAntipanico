<?php
/* @var $this AgenteController */
/* @var $model agente */

$this->breadcrumbs=array(
	'Agentes'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List agente', 'url'=>array('index')),
	array('label'=>'Manage agente', 'url'=>array('admin')),
);
?>

<h1>Create agente</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>