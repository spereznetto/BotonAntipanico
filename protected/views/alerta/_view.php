<?php
/* @var $this AlertaController */
/* @var $data Alerta */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idAlerta')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idAlerta), array('view', 'id'=>$data->idAlerta)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AlertaidAsignacion')); ?>:</b>
	<?php echo CHtml::encode($data->AlertaidAsignacion); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AlertaFechaDesde')); ?>:</b>
	<?php echo CHtml::encode($data->AlertaFechaDesde); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AlertaFechaHasta')); ?>:</b>
	<?php echo CHtml::encode($data->AlertaFechaHasta); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('estadoAlerta')); ?>:</b>
	<?php echo CHtml::encode($data->estadoAlerta); ?>
	<br />


</div>