<?php
/* @var $this AgenteController */
/* @var $model agente */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'idAgente'); ?>
		<?php echo $form->textField($model,'idAgente'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AgenteNombre'); ?>
		<?php echo $form->textField($model,'AgenteNombre',array('size'=>30,'maxlength'=>30)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AgenteTelefono'); ?>
		<?php echo $form->textField($model,'AgenteTelefono'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->