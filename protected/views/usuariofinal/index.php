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

<h3>Vista de Usuario Final</h3>
<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
