<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    include 'clases.php';
?>

<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <style>
        .fakeimg {
          height: 200px;
          background: #aaa;
        }
        </style>
        <meta charset="UTF-8">
        <title>Pagina web de muestra y acciones para TFG - Sebastian Perez NEtto</title>
        <script>
            function showHide2(obj) {
              var div = document.getElementById(obj);
              if (div.style.display == 'none') {
                div.style.display = '';
              }
              else {
                div.style.display = 'none';
              }
            }
        </script>
    </head>
    
    <body>
        <div class="container-fluid " style="margin-top:30px">
          <div class="row">
                <div class="col-sm-12">
                    <h4>Este apartado fue creado exclusivamente com SIMULADOR de prueba de envio de mensajes al Backoffice de Boton Antipanico - TFG.</h4><br>
                </div>
          </div>  
          <div class="row">
                <div class="col-sm-6">
                    <h5><strong>Historia de usuario-03</strong> Recibir los mensajes desde el dispositivo, interpretarlos, 
                        desecharlo o guardarlos en base de datos según regla de negocio.</h5><br>
                    <h7>
                        Dado que el backofice puede recibir mensajes tanto de una Aplicacion de Boton Antipanico como de un dispositivo GPS Mobiles tipo boton antipanico<br>
                        Se creo entonces esta herramienta que simula los 2 aparatos, con el fin de enviar paquetes al sistema.

                        Para recibir los mensajes, que llegan por puerto de red via protocolo UDP,<br>
                        se creo un programa ejecutable, (en Java) el cual escucha un puerto en particular a la espera de mensajaes.<br>
                        
                        Cuando un mensaje llega es automaticamente se coloca en el Buffer(espacio en memoria interna) a la espera de<br>
                        ser procesado.  Cuando el hilo recorre el buffer toma el mensaje, lo traduce a codigo ASCII <br>
                        y lo reserva en una variable tipo String(mensaje).<br>
                         
                    </h7>
                </div>
                <div class="col-sm-6">   
                <h7> 
                        Luego toma esa variable, la analiza y verifica si el formato es correcto (sino graba un error).<br>
                        Si es correcto desmembra ese mensaje, cortandolo por los caracteres entre comas (,) y le da a cada grupo
                        de caractecres (que reconoce por medio de un manual del fabricante) el nombre de variable que se le asigno.<br>
                        Si toda esa operatoria fue exitosa (de no serlo se graba un error), se graba en la base de datos y tabla correspondiente
                        al puerto desde donde llego el mensaje.

                        Luego se graba en el hisotrico de mensajes (opcion Visualizar Dispositivos de backoffice).
                        Si es un mensaje de tipo alerta, tambien se carga la misma, la cual se vera en el backoffice (Gestion Alertas)
                        En todos los casos de error se graba una linea en la base de datos, tabler de error del puerto correspondiente.
                        </h7>
                        <div class="row">
                          
                            <div class="col-sm-6"><img src="gpsportatil.png" width="100px" height="150px"> GPS PORTATIL</div>
                            <div class="col-sm-6"><img src="aplicacion.png" width="100px" height="200px">  APLICACION CELULAR</div>
                        </div>
                        <br><br>
                        <h9><br> Fecha y Hora servidor Web: <?php echo date("Y-m-d H:m:s");?></h9>    
                </div>
          </div>
        </div>  
<div class="container-fluid " style="margin-top:30px">
        <div class="row">
            
                <div class="col-sm-3">
                    <button type="button" class="btn btn-primary" onclick="showHide2('enviarmensajes');return false;">Enviar Mensajes</button>
                </div>   
                <div class="col-sm-3">
                    <button type="button" class="btn btn-info" onclick="showHide2('verMensajesEnviados');return false;">Ver Mensajes Enviados</button>
                </div>   
                <div class="col-sm-3">
                    <button type="button" class="btn btn-success" onclick="showHide2('verMensajes');return false;">Ver Mensajes OK</button>
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-warning" onclick="showHide2('verErrores');return false;">Ver Mensajes Error</button>
                </div>
            
          <div class="row" id="enviarmensajes" style="display:none">
                <div class="col-sm-4">
                    <form action="index.php" method="get"> 
                        <table class="table">
                            <thead>
                              <tr>
                                <th>Dato</th>
                                <th>Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                                <tr>
                                  <td>Mensajes:</td>
                                  <td><input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==2) return false;" class="form-control" name= "cantidadMensajes" id="cantidadMensajes" maxlength="2"></td>
                                 </tr>      
                                <tr class="table-primary">
                                  <td>Equipos:</td>
                                  <td><input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==1) return false;" class="form-control" name= "cantidadEquipos" id="cantidadEquipos" maxlength="1"></td>
                                </tr>
                                <tr class="table-primary">
                                  <td>Tipo Equipo:</td>
                                  <td><select class="form-control" name= "tipoEquipo" id="tipoEquipo" >
                                    <option value="1">APLICACION</option>
                                    <option value="2">GPSMOBILE</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr class="table-success">
                                  <td colspan="2">
                                      <input type="submit" value="Enviar mensajes de prueba" class="btn-info"></td>
                                </tr>
                              <input type="hidden" id="enviarMensajes" name="enviarMensajes" value="1">
                            </tbody>
                          </table>
                    </form>
                </div>    
            </div>
            <div class="row" id="verMensajesEnviados" style="display:none;margin-left: 15px">   
                    <?php
                           if(!empty($_REQUEST['enviarMensajes'])){

                               $cantidadMensajes = $_REQUEST["cantidadMensajes"];
                               $cantidadEquipos = $_REQUEST["cantidadEquipos"];
                               $tipoEquipo = $_REQUEST["tipoEquipo"];

                               if(isset($_REQUEST["cantidadMensajes"]) && isset($_REQUEST["cantidadEquipos"]) && isset($_REQUEST["tipoEquipo"])){
                               enviarMensajes($cantidadMensajes,$cantidadEquipos,$tipoEquipo);
                               }else{
                                   echo "no se envio nada";
                               }
                           }
                    ?> 
            </div>  
            <div class="row" id="verMensajes" style="display:none;margin-left: 15px">   
                    <?php
                        echo "<table class='table'>";
                        echo " <thead>";
                        echo " <tr>";
                        echo "  <th scope='col'>id</th>
                                <th scope='col'>Fecha</th>
                                <th scope='col'>Reporte</th>
                                <th scope='col'>TipoMensaje</th>
                                <th scope='col'>TipoEvento</th>
                                <th scope='col'>IMEI</th>
                               </tr>
                               </thead>";
                         verMensajes($mysqli);
                        echo "</table>";
                    ?> 
            </div>    
            <div class="row" id="verErrores" style="display:none;margin-left: 15px">   
                      <?php
                        echo "<table class='table'>";
                        echo " <thead>";
                        echo " <tr>";
                        echo "  <th scope='col'>idError</th>
                                <th scope='col'>Fecha</th>
                                <th scope='col'>Reporte</th>
                                <th scope='col'>DescripcionError</th>
                                </tr>
                               </thead>";
                         verErrores($mysqli);
                        echo "</table>";
                    ?> 
            </div>      
         </div>
    </div>     
    </body>
</html>
