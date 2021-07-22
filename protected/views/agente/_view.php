<?php
/* @var $this AgenteController */
/* @var $data agente */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('idAgente')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->idAgente), array('view', 'id'=>$data->idAgente)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AgenteNombre')); ?>:</b>
	<?php echo CHtml::encode($data->AgenteNombre); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('AgenteTelefono')); ?>:</b>
	<?php echo CHtml::encode($data->AgenteTelefono); ?>
	<br />


</div>