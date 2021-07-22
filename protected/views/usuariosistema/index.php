<?php
/* @var $this UsuariosistemaController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Usuariosistemas',
);

$this->menu=array(
	array('label'=>'Create usuariosistema', 'url'=>array('create')),
	array('label'=>'Manage usuariosistema', 'url'=>array('admin')),
);
?>

<h1>Usuariosistemas</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
