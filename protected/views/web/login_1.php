<div style="width:400px!important;margin: 0 auto!important;">
	<?php $form=$this->beginWidget('booster.widgets.TbActiveForm', array(
		'id'=>'login-form',
		'htmlOptions' => array('class'=>'well','style'=>'width:350px;background:#9CA0A9;color: cornsilk;border:none'), // for inset effect
		'enableClientValidation'=>true,
		'clientOptions'=>array(
			'validateOnSubmit'=>true,
		),
	)); ?>

	<div class="form-group" style="text-align:center">
		<img src="<?php echo Yii::app()->request->baseUrl;?>/images/logo-stopcar.jpg">
	</div>

	<?php echo $form->textFieldGroup($model, 'username',array('widgetOptions'=>array('htmlOptions'=>array('autocomplete'=>'off','style'=>'border: solid 1px #484D4E;'))));?>

	<?php echo $form->passwordFieldGroup($model, 'password',array('widgetOptions'=>array('htmlOptions'=>array('autocomplete'=>'off','style'=>'border: solid 1px #484D4E;'))));?>
	
	<div class="form-group">
	<?php  echo CHtml::activeCheckBox($model, 'rememberMe')?>
	<?php echo CHtml::activeLabelEx($model, 'rememberMe') ?>
	<?php //echo $form->checkboxGroup($model, 'rememberMe',array('widgetOptions'=>array('htmlOptions'=>array('style'=>'border: solid 1px #484D4E;'))));?>
	</div>
	
	<?php 
	$this->widget(
			'booster.widgets.TbButton',
			array('buttonType' => 'submit', 'label' => 'Iniciar sesion', 'context'=>'danger')
	);
	?><br>
	<?php echo CHtml::link("¿Olvidó su contraseña?",array('web/recuperarpassoword'),array('style'=>'color:darkred;'));?>
	
	
	<?php $this->endWidget(); ?>
        
</div><!-- form -->
<!--<div align="center" style="margin-top: 30px;">
<a href="http://www.macroseguridad.net/ssl" style="font-family: arial; font-size: 10px; color: #212121; text-decoration: none;">
    <img src="http://www.positivessl.com/images-new/PossitiveSSL_tl_trans2.gif" alt="Certificado SSL" title="Certificado SSL" border="0" style="width: 70px" /></a>
</div>-->

