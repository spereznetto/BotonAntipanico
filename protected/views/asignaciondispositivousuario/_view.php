<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $data AsignacionDispositivoUsuario */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idAsignacion')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idAsignacion), array('view', 'id'=>$data->idAsignacion)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AsignacionIMEI')); ?>:</b>
	<?php echo CHtml::encode($data->AsignacionIMEI); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AsignacionIdUsuarioFinal')); ?>:</b>
	<?php echo CHtml::encode($data->AsignacionIdUsuarioFinal); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AsignacionFechaAlta')); ?>:</b>
	<?php echo CHtml::encode($data->AsignacionFechaAlta); ?>
	<br />


</div>