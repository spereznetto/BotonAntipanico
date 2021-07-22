<?php
/* @var $this UsuariofinalController */
/* @var $model usuariofinal */

$this->breadcrumbs=array(
	'Usuariofinals'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List usuariofinal', 'url'=>array('index')),
	array('label'=>'Manage usuariofinal', 'url'=>array('admin')),
);
?>

<h1>Create usuariofinal</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>