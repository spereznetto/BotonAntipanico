<?php
/* @var $this AgenteController */
/* @var $model agente */

$this->breadcrumbs=array(
	'Agentes'=>array('index'),
	$model->idAgente,
);

$this->menu=array(
	array('label'=>'List agente', 'url'=>array('index')),
	array('label'=>'Create agente', 'url'=>array('create')),
	array('label'=>'Update agente', 'url'=>array('update', 'id'=>$model->idAgente)),
	array('label'=>'Delete agente', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idAgente),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage agente', 'url'=>array('admin')),
);
?>

<31>Ver informacion de agente numero<?php echo $model->idAgente; ?></h3>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idAgente',
		'AgenteNombre',
		'AgenteTelefono',
	),
)); ?>
