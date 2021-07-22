
<script src='https://www.google.com/recaptcha/api.js'></script>
<?php
$form = $this->beginWidget('booster.widgets.TbActiveForm', array(
    'id' => 'login-form',
    'htmlOptions' => array('class' => 'well', 'style' => 'border:none'), // for inset effect
    'enableClientValidation' => true,
    'clientOptions' => array(
        'validateOnSubmit' => true
    ),
        ));
?>

<?php echo $form->emailFieldGroup($model, 'username', array('widgetOptions' => array('htmlOptions' => array('autocomplete' => 'off', 'placeholder' => '')))); ?>

<?php echo $form->passwordFieldGroup($model, 'password', array('label' => 'Contrase&ntilde;a', 'widgetOptions' => array('htmlOptions' => array('autocomplete' => 'off', 'placeholder' => '')))); ?>


<?php $this->widget('booster.widgets.TbButton', array('buttonType' => 'submit', 'label' => 'Iniciar sesion', 'context' => 'danger', 'htmlOptions' => array('data-ajax' => 'false', 'class' => 'btn-block'))); ?><br>
<?php echo CHtml::link("&iquest;Olvid&oacute; su contrase&ntilde;a?", array('web/recuperarpassoword'), array('style' => 'color:darkred;', 'data-ajax' => 'false')); ?>


<?php $this->endWidget(); ?>