<?php
/* @var $this AgenteController */
/* @var $model agente */

$this->breadcrumbs=array(
	'Agentes'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List agente', 'url'=>array('index')),
	array('label'=>'Create agente', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#agente-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h3>Administrar  Agentes</h3>


<a href="<?php echo Yii::app()->CreateAbsoluteUrl('agente/create') ?>" role="button" aria-haspopup="true" >Crear Agente</a><nr>

<?php $this->widget('booster.widgets.TbExtendedGridView', array(
	'id'=>'agente-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'idAgente',
		'AgenteNombre',
		'AgenteTelefono',
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
