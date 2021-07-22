<?php

class InicioController extends Controller {

    /**
     * @return array action filters
     */
    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    /**
     * Especifica las reglas de acceso para el controlador segun el tipo de usuario.
     * Este metodo es utilizado por el 'accessControl' del metodo filter.
     */
    public function accessRules() {
        if (!Yii::app()->user->isGuest) {
            $permisos = array(
                'index', 'posiciones', 'detallarmovil', 
                'vermovilevento', 'menudeusuario', 'RecorridoEnAlerta', 'detalleposicion',
                'posicionesmobile', 'recargarposiciones', 'getPrecisionCelular'
                 // acceso a todos los action para los usuarios 
            );
        } else {
            //Si no es un usuario logueado, devuelve el array vacio de manera que no deje utilizar ninguna accion
            $permisos = array('vermovilevento');
        }

        return array(
            array(
                'allow',
                'actions' => $permisos, //Acciones permitidas a el usuario logueado
            //'users'=>array('@'),
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }
    /**
     * Action inicial de la aplicacion.
     * Instancia el modelo de las ultimas posiciones de cada vehiculo y renderiza una grilla que se auto-refresca cada 30 segundos
     * con los vehiculos correspondientes al usuario logueado.
     */
    

    public function actionIndex() {
    
        $this->layout = 'column2';

        $modelfiltro = new filtro();

        $model = new mensajehistorico();
        $model = $model->obternerPosiciones();

        
        $arrayDataProvider = new CArrayDataProvider($model , array(
            'keyField' => 'MensajeIMEI',
            'pagination' => false
        ));
        
        $this->render('index', array('arrayDataProvider' => $arrayDataProvider, 'modelfiltro' => $modelfiltro));
    }
    /*
        //Si le llegan por ajax los parametros filtrados que se buscan.
        if (Yii::app()->request->isAjaxRequest) {


            if (isset($_GET['FiltersForm']))
                $filtersForm->filters = $_GET['FiltersForm'];

            for ($i = 0; $i < count($model); $i++) {
                if (trim($model[$i]['Reporte_Direccion']) != '') {
                    $direccion = $model[$i]['Reporte_Direccion'];
                } else {
                    $direccion = Yii::app()->gis->geocodizacionLocal($model[$i]['Reporte_Latitud'], $model[$i]['Reporte_Longitud']);
                }
                //$direccion = "";
                $datosUltPos[$i]['id'] = $i;
                $datosUltPos[$i]['movil'] = $model[$i]['Movil_Nombre'];   //Se cambio el "Disp_ID" por el alias del movil para que lo muestre en la grilla
                $datosUltPos[$i]['idMovil'] = $model[$i]['Disp_ID'];
                $datosUltPos[$i]['idM'] = $model[$i]['IdMovil'];
                $datosUltPos[$i]['dominio'] = $model[$i]['Movil_Dominio'];
                $datosUltPos[$i]['ignicion'] = $model[$i]['Reporte_Ignicion'];
                $datosUltPos[$i]['icono'] = $model[$i]["Movil_Icono"];
                $datosUltPos[$i]['conductor'] = $model[$i]["Conductor_Nombre"] . ' ' . $model[$i]["Conductor_Apellido"];
                // $datosUltPos[$i]['apellido'] = $model[$i]["Conductor_Apellido"];
                if ($model[$i]["Conductor2"] != "") {
                    $datosUltPos[$i]['conductor'] = $model[$i]["Conductor2"] . ' ' . $model[$i]["Conductor2_apellido"];
                } else {
                    $datosUltPos[$i]['conductor'] = $model[$i]["Conductor"] . ' ' . $model[$i]["Conductor_Apellido"];
                }

                $str = strtotime($model[$i]['Reporte_FechaGPS']);
                $strahora = strtotime('now');

                $datosUltPos[$i]['tiempoReporte'] = round(($strahora - $str) / 60); //diferencia en minutos, entre la ultima vez que reporto el movil y el tiempo actual. Usadp para que la grilla marcara la fila en rojo si son msa de 60 min desde el ultimo.

                if ($model[$i]['Reporte_FechaGPS'] == '' || $model[$i]['Reporte_FechaGPS'] == null) {
                    $datosUltPos[$i]['fechaHora'] = 'MOVIL SIN POSICION';
                } else {
                    $datosUltPos[$i]['fechaHora'] = date('d-m-Y H:i:s', $str);
                }
                $datosUltPos[$i]['latitud'] = $model[$i]['Reporte_Latitud'];
                $datosUltPos[$i]['longitud'] = $model[$i]['Reporte_Longitud'];
                $datosUltPos[$i]['direccion'] = $direccion;
                $datosUltPos[$i]['velocidad'] = $model[$i]['Reporte_Velocidad'];
            }

            $filteredData = $filtersForm->filter($datosUltPos);

            $j = 0;
            $datosOrdenados = array(); //Es necesario ordenar los datos filtrados en un array que empiece de 0 a N, debido a que el gridview lo necesita;

            foreach ($filteredData as $value) {
                $datosOrdenados[$j] = $value;
                $j++;
            }

            $arrayDataProvider = new CArrayDataProvider($datosOrdenados, array(
                'keyField' => 'dominio',
                'pagination' => false,
                'sort' => array(
                    'attributes' => array(
                        'dominio' => array(
                            'asc' => 'dominio',
                            'desc' => 'dominio DESC',
                        ),
                        'direccion' => array(
                            'asc' => 'direccion',
                            'desc' => 'direccion DESC',
                        ),
                        'velocidad' => array(
                            'asc' => 'velocidad',
                            'desc' => 'velocidad DESC',
                        ),
                        'movil' => array(
                            'asc' => 'movil',
                            'desc' => 'movil DESC',
                        ),
                        'fechaHora' => array(
                            'asc' => 'fechaHora',
                            'desc' => 'fechaHora DESC',
                        ),
                        'ignicion' => array(
                            'asc' => 'ignicion',
                            'desc' => 'ignicion DESC',
                        ),
                        'conductor' => array(
                            'asc' => 'conductor',
                            'desc' => 'conductor DESC',
                        ),
                        'tiempoReporte' => array(
                            'asc' => 'tiempoReporte',
                            'desc' => 'tiempoReporte DESC',
                        ),
                        '*',
                    ),
                )
            ));

            $this->renderPartial('_grillaUltimasPosiciones', array('arrayDataProvider' => $arrayDataProvider, 'filtersForm' => $filtersForm));
            Yii::app()->end();
        }

    }
*/



}
