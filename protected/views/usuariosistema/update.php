<?php
/* @var $this UsuariosistemaController */
/* @var $model usuariosistema */

$this->breadcrumbs=array(
	'Usuariosistemas'=>array('index'),
	$model->idUsuario=>array('view','id'=>$model->idUsuario),
	'Update',
);

$this->menu=array(
	array('label'=>'List usuariosistema', 'url'=>array('index')),
	array('label'=>'Create usuariosistema', 'url'=>array('create')),
	array('label'=>'View usuariosistema', 'url'=>array('view', 'id'=>$model->idUsuario)),
	array('label'=>'Manage usuariosistema', 'url'=>array('admin')),
);
?>

<h1>Update usuariosistema <?php echo $model->idUsuario; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>