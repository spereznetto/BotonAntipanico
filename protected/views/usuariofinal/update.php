<?php
/* @var $this UsuariofinalController */
/* @var $model usuariofinal */

$this->breadcrumbs=array(
	'Usuariofinals'=>array('index'),
	$model->idUsuarioFinal=>array('view','id'=>$model->idUsuarioFinal),
	'Update',
);

$this->menu=array(
	array('label'=>'List usuariofinal', 'url'=>array('index')),
	array('label'=>'Create usuariofinal', 'url'=>array('create')),
	array('label'=>'View usuariofinal', 'url'=>array('view', 'id'=>$model->idUsuarioFinal)),
	array('label'=>'Manage usuariofinal', 'url'=>array('admin')),
);
?>

<h1>Update usuariofinal <?php echo $model->idUsuarioFinal; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>