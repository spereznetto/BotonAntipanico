
# rest-yii

Extensión de Yii1 para desarrollar APIs REST

## Instalación

 1. Clonar el repositorio en la carpeta *protected/extensions/rest-yii*
 
 3. Modificar el archivo *protected/config/main.php* y agregar a la lista de componentes:
	 ```php 
	 'components'=>array(
		//...
		'rest'=>array(
			'class'=>'ext.rest-yii.Rest',
		),
		//...
	),
	```

3. Ejecutar el código SQL ubicado en *yii-rest/data/rest_sessions_table.sql* para crear la tabla de sesiones en la DB que se utilice en el proyecto de Yii.

4. En caso de querer heredar la clase **RestController** para los controladores (recomendado), modificar el archivo *protected/config/main.php* y agregar a la lista de import:
	 ```php 
	 'import'=>array(
		'application.models.*',
		'application.components.*',
		'ext.rest-yii.RestController'
		//...
	),
	```
