<?php
/* @var $this UsuariofinalController */
/* @var $data usuariofinal */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idUsuarioFinal')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idUsuarioFinal), array('view', 'id'=>$data->idUsuarioFinal)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioFinalNombre')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioFinalNombre); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioFinalDni')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioFinalDni); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioFinalEstadoUsuario')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioFinalEstadoUsuario); ?>
	<br />
	
	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioFinalTelefono')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioFinalTelefono); ?>
	<br />


</div>