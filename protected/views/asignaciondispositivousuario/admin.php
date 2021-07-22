<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $model AsignacionDispositivoUsuario */

$this->breadcrumbs=array(
	'Asignacion Dispositivo Usuarios'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List AsignacionDispositivoUsuario', 'url'=>array('index')),
	array('label'=>'Create AsignacionDispositivoUsuario', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#asignacion-dispositivo-usuario-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Asignacion Dispositivo Usuarios</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('booster.widgets.TbGridView', array(
	'id'=>'asignacion-dispositivo-usuario-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'idAsignacion',
		'AsignacionIMEI',
		['header' => 'Nombre del Usuario',
		'value' => '$data->AsignacionIdUsuarioFinal->UsuarioFinalNombre',
		],
		'AsignacionFechaAlta',
		'AsignacionFechaBaja',
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
