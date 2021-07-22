<?php
/* @var $this DispositivoController */
/* @var $model dispositivo */

$this->breadcrumbs=array(
	'Dispositivos'=>array('index'),
	'Manage',
);
$this->menu=array(
	array('label'=>'Create dispositivo', 'url'=>array('create')),

);


Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#dispositivo-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h3>Administrar Dispositivos</h3>

<a href="<?php echo Yii::app()->CreateAbsoluteUrl('dispositivo/create') ?>" role="button" aria-haspopup="true" >Crear Dispositivos</a><nr>

<?php $this->widget('booster.widgets.TbExtendedGridView', array(
	'id'=>'dispositivo-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'IMEI',
		'tipoDispositivo',
		'estadoDispositivo',
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
