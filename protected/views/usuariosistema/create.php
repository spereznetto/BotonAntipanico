<?php
/* @var $this UsuariosistemaController */
/* @var $model usuariosistema */

$this->breadcrumbs=array(
	'Usuariosistemas'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List usuariosistema', 'url'=>array('index')),
	array('label'=>'Manage usuariosistema', 'url'=>array('admin')),
);
?>

<h1>Create usuariosistema</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>