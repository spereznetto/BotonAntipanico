<?php
/* @var $this MensajehistoricoController */
/* @var $data mensajehistorico */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idMensaje')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idMensaje), array('view', 'id'=>$data->idMensaje)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeIdTemporal')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeIdTemporal); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajetipoMensaje')); ?>:</b>
	<?php echo CHtml::encode($data->MensajetipoMensaje); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeIMEI')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeIMEI); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeidAsignacion')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeidAsignacion); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeCompleto')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeCompleto); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('Mensajedireccion')); ?>:</b>
	<?php echo CHtml::encode($data->Mensajedireccion); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeFechaHora')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeFechaHora); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeLatitud')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeLatitud); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeLongitud')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeLongitud); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('MensajeAlertaEstado')); ?>:</b>
	<?php echo CHtml::encode($data->MensajeAlertaEstado); ?>
	<br />

	*/ ?>

</div>