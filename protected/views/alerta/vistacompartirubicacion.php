
<div class="container">
	
	
	<?php $form = $this->beginWidget('booster.widgets.TbActiveForm', array(
		'id' => 'envio-sms',
		// Please note: When you enable ajax validation, make sure the corresponding
		// controller action is handling ajax validation correctly.
		// There is a call to performAjaxValidation() commented in generated controller code.
		// See class documentation of CActiveForm for details on this.
		'enableAjaxValidation' => false,
	)); ?>
	
		<div class="row">
			Envio de ubicacion por WhastApp para agentes 
		</div>
		<div class="row">
	
		   <h3>Elija el agente</h3>
				
		   <?php
             echo $form->select2Group(
                    $model,
                    'AgenteTelefono',
                    array(
                        'widgetOptions' => array(
                            'data' => CHtml::listData(Agente::model()->findAll(), 'AgenteTelefono', 'AgenteNombre'),
                            'options' => array(
                                'placeholder' => 'Seleccione un Agente',
                            )
                        )
                    )
                );
            
            ?>     
				<br />
				
		  </div>
		  <div class="row">
			<?php echo CHtml::submitButton('Enviar'); ?>
		  </div>
		</div>
	  </div>
	
	
	<div class="row buttons">
	
	</div>
	
	</div>
	</div>
	
	<?php $this->endWidget(); ?> 
	
	</div>
