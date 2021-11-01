<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Ratreo Boton Antipanico',
	'defaultController' => 'inicio',
	// preloading 'log' component
	'preload'=>array('log', 'booster'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'ext.rest-yii.RestController',
		'application.extentions.*'
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'1234',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		
	),

	// application components
	'components'=>array(
		'user'=>array(
			'allowAutoLogin' => true, // habilita la autenticacion basada en cookies
            'loginUrl' => array('web/login'),
            'returnUrl' => array('inicio/index') //Url a la que lleva al usuario luego de loguearse
		),
		'booster' => array(
            'class' => 'application.extensions.booster.components.Booster',
            'responsiveCss' => false,
            'coreCss' => false,
            'minify' => true,
            //'fontAwesomeCss'=>true,
            //'enableNotifierJS'=>false,
            //'enableBootboxJS'=>false,
            //'enableJS'=>false,
            //'jqueryCss'=>false,
            'yiiCss' => false,
            'bootstrapCss' => false
        ),
		'gis' => array(
            'class' => 'application.components.Gis',
        ),
		// uncomment the following to enable URLs in path-format
		/*
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		*/
		'curl' => array(
			'class' => 'ext.curl.Curl',
			//'options' => array(/.. additional curl options ../)
	   ),
		
	
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=gps_efip',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);