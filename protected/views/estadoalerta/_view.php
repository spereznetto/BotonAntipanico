<?php
/* @var $this EstadoalertaController */
/* @var $data estadoAlerta */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idEstadoAlerta')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idEstadoAlerta), array('view', 'id'=>$data->idEstadoAlerta)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('Descripcion')); ?>:</b>
	<?php echo CHtml::encode($data->Descripcion); ?>
	<br />


</div>