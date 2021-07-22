<?php
/* @var $this MensajehistoricoController */
/* @var $model mensajehistorico */

$this->breadcrumbs=array(
	'Mensajehistoricos'=>array('index'),
	$model->idMensaje=>array('view','id'=>$model->idMensaje),
	'Update',
);

$this->menu=array(
	array('label'=>'List mensajehistorico', 'url'=>array('index')),
	array('label'=>'Create mensajehistorico', 'url'=>array('create')),
	array('label'=>'View mensajehistorico', 'url'=>array('view', 'id'=>$model->idMensaje)),
	array('label'=>'Manage mensajehistorico', 'url'=>array('admin')),
);
?>

<h1>Update mensajehistorico <?php echo $model->idMensaje; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>