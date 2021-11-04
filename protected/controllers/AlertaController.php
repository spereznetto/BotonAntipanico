<?php

class AlertaController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view','cambiarestado'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update','gestionalertas','envioSMS','compartirubicacion','cambiarestado','verposicionalerta'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Alerta;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Alerta']))
		{
			$model->attributes=$_POST['Alerta'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->idAlerta));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Alerta']))
		{
			$model->attributes=$_POST['Alerta'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->idAlerta));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Alerta');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Alerta('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Alerta']))
			$model->attributes=$_GET['Alerta'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Alerta the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Alerta::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Alerta $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='alerta-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

	public function actionGestionalertas() {
    
        $this->layout = 'column2';

        $modelfiltro = new filtro();

        $model = new alerta();
        $model = $model->obternerAlertas();

        
        $arrayAlertas = new CArrayDataProvider($model , array(
            'keyField' => 'IdAlerta',
            'pagination' => false
        ));
        
        $this->render('index', array('arrayAlertas' => $arrayAlertas));
    }

	public function actionenvioSMS($idAlerta) {
    
        $this->layout = 'column2';

        $model = new alerta();

		if(!($_POST['numeroaenviar'])){

        $model = $model->envioSMS($idAlerta);
		// model tiene ahora el nombre dle usuario y el telefono lo tiene que amndar al render


        $this->render('envioSMS', array('arrayDatos' => $model));

		}else{

			$data = Yii::app()->curl->post('http://servicio.smsmasivos.com.ar/enviar_sms.asp?',FALSE,

			array(
		
			'api'=>'1','usuario'=>'MITESIA','clave'=>'Q1W2E3R4','tos'=>$_POST['numeroaenviar'],'texto'=> 'Hola... Su alerta a sido recibida, nos podremos en contacto lo antes posible. COM'
		
			)
		
		);
		

			//print_r($data);
				//echo "respuesta de envio " . $data;
			
				$this->render('envioSMS', array('respuestaSMS' => $data));
		}

    }

	public function actionCambiarestado() {
    
		//echo $_POST["idalerta"];
		
        $this->layout = 'column2';

        $model = new alerta();
		//echo "cambio estado";

		if(($_POST['estado'])){

			$model = $model->findByPK($_POST['idalerta']);
			$model->estadoAlerta = $_POST['estado'];

				if ($model->save()) {
					echo '<script language="javascript">alert("estado cambiado");</script>';
					
				}else {
					echo '<script language="javascript">alert("estado NO cambiado");</script>';
				}
			
							
		}

		
        $model = new alerta();
        $model = $model->obternerAlertas();

        
        $arrayAlertas = new CArrayDataProvider($model , array(
            'keyField' => 'IdAlerta',
            'pagination' => false
        ));
        
        $this->render('index', array('arrayAlertas' => $arrayAlertas));
		
    }


	public function actionVerposicionalerta() {
    
		$this->layout = 'column1';
	
		$model = new mensajehistorico();
		$model = $model->verUltimasPosiciones();
	
		
		$arrayDataProvider = new CArrayDataProvider($model , array(
			'keyField' => 'idreporte',
			'pagination' => false
		));
		
		$this->render('_grillaVerUltimasPosiciones', array('arrayDataProvider' => $arrayDataProvider));
	
	
	}

	public function actioncompartirubicacion($idAlerta) {
    
		
        $this->layout = 'column2';

        $model = new alerta();

		if(!isset($_POST['Agente'])){
			
			$agentes = new agente();
			
			$dataProvider= $agentes->search();

			//envio a todos los agentes para que puedan compartir la ubiacion

			$this->render('vistacompartirubicacion', array(

				'dataProvider' => $dataProvider,
	
				'model' => $agentes,
	
			));

		}else{
			$agentes = new agente();

			$agentes->attributes=$_POST['Agente'];

			$datalocalizacion = $model->alertultpos($idAlerta);
			extract($datalocalizacion[0]);
			//die;
			
			$numero =$agentes->AgenteTelefono;

			$texto = 'Hola... Te enviamos la ubicacion a revisar <a href = "https://www.google.com.ar/maps?q='.$MensajeLatitud.','.$MensajeLongitud.'"	>Haga Click aquí para ver la posicion...</a>. COM';

			$link = 'https://api.whatsapp.com/send?phone='.$numero.'&test='.$texto;
			//echo $link;
			//die; 
			$this->redirect($link, array('target' => '_blank'));
		
		}

    }




}
