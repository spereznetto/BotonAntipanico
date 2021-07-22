<?php $this->pageTitle=Yii::app()->name . ' - Recuperar password'; ?>

<div class="form">

	<?php $form=$this->beginWidget('booster.widgets.TbActiveForm', array(
		'id'=>'recupera-password-form',
		'htmlOptions' => array('class' => 'well','style'=>'width:400px;margin:auto;'),
		'enableClientValidation'=>true,
		'clientOptions'=>array(
			'validateOnSubmit'=>true,
		),
	)); ?>

	<h2 style="margin-bottom:25px;">Recuperar password</h2>
	
	<?php	
	$this->widget('booster.widgets.TbAlert', array(
	    'fade' => true,
	    'closeText' => '&times;', // false equals no close link
	    'events' => array(),
	    'htmlOptions' => array(),
	    'userComponentId' => 'user',
	    'alerts' => array( 
	        'success' => array('closeText' => '&times;'),
	        'error' => array('closeText' =>'&times;')
	    ),
	));
	?>
	
	
	<?php echo $form->textFieldGroup($modelForm, 'usuario');?>
	
	<?php 
	$this->widget(
			'booster.widgets.TbButton',
			array('buttonType' => 'submit', 'label' => 'Reestablecer password', 'context'=>'danger')
	);
	?>
	
	<?php $this->endWidget(); ?>
</div><!-- form -->
