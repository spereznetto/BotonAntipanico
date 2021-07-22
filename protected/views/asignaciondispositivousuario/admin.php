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

<h3>Asignacion Dispositivo Usuarios</h3>

<p>
Todos los usuarios inales necesitan estar asociados a un dispositivo por medio de un IMEI, sea un telefono o un GPS Movil</p>


<a href="<?php echo Yii::app()->CreateAbsoluteUrl('asignaciondispositivousuario/create') ?>" role="button" aria-haspopup="true" >Crear Asignacion</a><nr>

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
