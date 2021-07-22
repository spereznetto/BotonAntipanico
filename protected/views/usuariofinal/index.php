<?php
/* @var $this UsuariofinalController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Usuariofinals',
);

$this->menu=array(
	array('label'=>'Create usuariofinal', 'url'=>array('create')),
	array('label'=>'Manage usuariofinal', 'url'=>array('admin')),
);
?>

<h1>Usuariofinals</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
