<?php
   
// datos para la conexion a la base de datos
    $mybd_host = "localhost";
    $mybd_usuario = "efip"; 
    $mybd_password = "efip";
    $mybd_base = "gps_EFIP";
    $mysqli = new mysqli($mybd_host, $mybd_usuario, $mybd_password, $mybd_base);
   
        
    function enviarMensajes($cantidadMensajes,$cantidadEquipos){ 
            //Esta funcion inventa mensajes de dispositivos, con una estructura en particular  que posee el mensaje
            // la funcion genera multiples mensajes de multipls equipos *hasta 10 diferentes
            // inventa de forma aleatoria mensajes validos e invalidos.
            // por ejemplo este es un tipo de mensaje de POSICION de un equipo con id 861074020216811
             // +RESP:GTFRI,060212,861074020216811,gv300,,10,1,1,0.0,186,25.6,-58.645018,-34.782937,20150209185506,0722,0007,1141,2415,00,0.0,,,,70,110000,,,,20150209185509,7183$
         $direccion = 'localhost';
        $puerto = 9001;
        $periodo = 1;
            $fp = stream_socket_client("udp://$direccion:$puerto", $errno, $errstr);
                if (!$fp) {
                 die("ERROR de envio: $errno - $errstr");
                }
            echo "fecha de envio:   ".date("Y-m-d H:m:s"). "<br>";
            
            for($i = 1; $i<=$cantidadMensajes; $i++) {
            
               
               $digitos = 5;
               
               //$latitud = "-58.".str_pad(rand(0, pow(10, $digitos)-1), $digitos, '0', STR_PAD_LEFT);
               //$longitud = "-34.".str_pad(rand(0, pow(10, $digitos)-1), $digitos, '0', STR_PAD_LEFT);
               $latitud = "-34.6222683". rand(100,999);
               $longitud = "-58.6988489". rand(100,999);
               // direccion verdadera ituzaingo-34.62226839548438, -58.69884890399579
               $randomice = rand(0,$cantidadEquipos);
               $bateria = rand(0,100);
               $imei = '8681'.$randomice; // para probar con imemi valido
               //$imei = '8681'.$randomice;  // para probar con imei de menos caracteres
               
               $randomiceMensajes = rand(0,9);
               
               if($randomiceMensajes < 3){ //0.1.2.3
                   $tipo_mensaje = '+RESP:GTFRI';
               }else{
                    if($randomiceMensajes < 8 ){//3.4,5,6,7
                        $tipo_mensaje = '+RESP:GTSOS';
                    }else{
                         if($randomiceMensajes >= 7 ){//8.9
                        $tipo_mensaje = 'RESPXXXXX';
                         }else{ //6.7
                             $tipo_mensaje = '+RESP:ZZZFI';
                         }
                      }
                }
               
               $fecha = date("YmdHms");
               
             echo "<br> Numero de Mensaje: $randomice -  IMEI: $imei  -  Fecha: $fecha   - Tipo Mensaje: $tipo_mensaje  ";
             $message = $tipo_mensaje.",060212,".$imei.",gv300,,10,1,1,0.0,186,25.".$bateria.",".$latitud.",".$longitud.",".$fecha.",0722,0007,1141,2415,00,0.0,,,,70,110000,,,,".$fecha.",".$randomice."$";
             fwrite($fp, $message);
             
             sleep($periodo);
            }  
        }
        
        function verMensajes($mysqli){// muestra los ultimos 50 mensajes exitosos de la tabla temporal_9001
          
            $query = $mysqli->query("SELECT IdReporte,Temporal_FechaServidor,SUBSTRING(Temporal_Completo, 1, 25), Temporal_TipoMensaje,Temporal_Evento, Temporal_IdDispositivo  FROM gps_efip.temporal_9001 ORDER BY idreporte DESC LIMIT 50 ");
            
            if($query->num_rows > 0){
               
            
                while($row = $query->fetch_array()){
                   echo "<tr>";
                   echo "<th scope='row'>".$row[0]."</th>";
                   echo "<td>".$row[1]."</td>";
                   echo "<td>".$row[2]."</td>";
                   echo "<td>".$row[3]."</td>";
                   echo "<td>".$row[4]."</td>";
                   echo "<td>".$row[5]."</td>";
                   echo "</tr>";
                }
                echo "</table>";
            }    
        }
        
        function verErrores($mysqli){ // muestra los ultimo 50 mensajes de la lista de errores de envio de mensaje de la tabla error_9001
          
            $query = $mysqli->query("SELECT idMensajeError,Error_FechaServidor,SUBSTRING(Error_Completo, 1, 25), SUBSTRING(Error_Descripcion, 1, 35)  FROM gps_efip.error_9001 ORDER BY idMensajeError DESC LIMIT 50");
            
            if($query->num_rows > 0){
               
            
                while($row = $query->fetch_array()){
                   echo "<tr>";
                   echo "<th scope='row'>".$row[0]."</th>";
                   echo "<td>".$row[1]."</td>";
                   echo "<td>".$row[2]."</td>";
                   echo "<td>".$row[3]."</td>";
                   echo "</tr>";
                }
                echo "</table>";
            }    
        }
        
?>

