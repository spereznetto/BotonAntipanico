<?php
/* @var $this AgenteController */
/* @var $model agente */

$this->breadcrumbs=array(
	'Agentes'=>array('index'),
	$model->idAgente=>array('view','id'=>$model->idAgente),
	'Update',
);

$this->menu=array(
	array('label'=>'List agente', 'url'=>array('index')),
	array('label'=>'Create agente', 'url'=>array('create')),
	array('label'=>'View agente', 'url'=>array('view', 'id'=>$model->idAgente)),
	array('label'=>'Manage agente', 'url'=>array('admin')),
);
?>

<h3>Actualizar  agente <?php echo $model->idAgente; ?></h3>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>