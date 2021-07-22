<?php
/* @var $this DispositivoController */
/* @var $data dispositivo */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('IMEI')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->IMEI), array('view', 'id'=>$data->IMEI)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('tipoDispositivo')); ?>:</b>
	<?php echo CHtml::encode($data->tipoDispositivo); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('estadoDispositivo')); ?>:</b>
	<?php echo CHtml::encode($data->estadoDispositivo); ?>
	<br />


</div>