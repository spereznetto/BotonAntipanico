<?php
/* @var $this UsuariosistemaController */
/* @var $data usuariosistema */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idUsuario')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idUsuario), array('view', 'id'=>$data->idUsuario)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioTipoUsuario')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioTipoUsuario); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioEmail')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioEmail); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioNombre')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioNombre); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioContrasena')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioContrasena); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UsuarioEstadousuario')); ?>:</b>
	<?php echo CHtml::encode($data->UsuarioEstadousuario); ?>
	<br />


</div>