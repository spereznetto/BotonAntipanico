<?php

class Gis extends CComponent {

    //el init() es requerido por yii
    public function init() {
        
    }

    /**
     * Mide la distancia entre 2 puntos gps y devuelve su resultado en kilometros.
     * */
    public function medirDistancia($lat1, $lon1, $lat2, $lon2) {

        $radius = 3959;  //approximate mean radius of the earth in miles, can change to any unit of measurement, will get results back in that unit

        $delta_Rad_Lat = deg2rad(floatval($lat2) - floatval($lat1));  //Latitude delta in radians
        $delta_Rad_Lon = deg2rad(floatval($lon2) - floatval($lon1));  //Longitude delta in radians
        $rad_Lat1 = deg2rad(floatval($lat1));  //Latitude 1 in radians
        $rad_Lat2 = deg2rad(floatval($lat2));  //Latitude 2 in radians

        $sq_Half_Chord = sin($delta_Rad_Lat / 2) * sin($delta_Rad_Lat / 2) + cos($rad_Lat1) * cos($rad_Lat2) * sin($delta_Rad_Lon / 2) * sin($delta_Rad_Lon / 2);  //Square of half the chord length
        $ang_Dist_Rad = 2 * asin(sqrt($sq_Half_Chord));  //Angular distance in radians
        $distancia = $radius * $ang_Dist_Rad;

        return $distancia * 1.609344;
    }

    public function detenido($time) {
        if (($time / 60 / 60 / 24 / 7 / 4 / 12) >= 1) {
            return round(($time / 60 / 60 / 24 / 7 / 4 / 12), 0) . "a�";
        } else if (($time / 60 / 60 / 24 / 7 / 4) >= 1) {
            return round(($time / 60 / 60 / 24 / 7 / 4), 0) . "ms";
        } else if (($time / 60 / 60 / 24 / 7) >= 1) {
            return round(($time / 60 / 60 / 24 / 7), 0) . "sm";
        } else if (($time / 60 / 60 / 24) >= 1) {
            return round(($time / 60 / 60 / 24), 0) . "d";
        } else if (($time / 60 / 60) >= 1) {
            $horas = floor($time / 3600);
            $minutos = floor(($time - ($horas * 3600)) / 60);
            return $horas . "hs " . $minutos . "m";
            //return round((($time / 60) / 60), 0) . "h";
        } else if (($time / 60) >= 1) {
            return round(($time / 60), 0) . "m";
            /* if (round((($time / 60) / 15), 0) * 15 == 0) {
              return "";
              } else {
              return round((($time / 60) / 15), 0) * 15 . "m";
              } */
        } else {
            return "";
        }
    }

    /**
     * Devuelve la direccion encontrada a partir de una latitud y longitud
     */
    public function geocodizacionLocal($latitud, $longitud) {
        $direccion = "http://10.2.12.227/geocoder/reverseGeo4.php?lat=$latitud&lon=$longitud";
        $datos = @file_get_contents($direccion);
        $datos = CJSON::decode($datos);

        $direccion = "";

        if (isset($datos['calle']) && trim($datos['calle']) != '' && trim($datos['calle']) != 'null') {
            $direccion.= $datos['calle'];
        }
        if (isset($datos['interseccion']) && trim($datos["interseccion"]) != "" && trim($datos["interseccion"]) != "y") {
            $direccion .= " (" . $datos["interseccion"] . ")";
        }
        if (isset($datos['localidad']) && trim($datos['localidad']) != '' && trim($datos['localidad']) != 'null') {
            $direccion.= ", " . $datos['localidad'];
        }
        if (isset($datos['departamento']) && trim($datos['departamento']) != '' && trim($datos['departamento']) != 'null') {
            $direccion.= ", " . $datos['departamento'];
        }
        if (isset($datos['provincia']) && trim($datos['provincia']) != '' && trim($datos['provincia']) != 'null') {
            $direccion.= ", " . $datos['provincia'];
        }
        return $direccion;
    }

    public function geocodizacionLocalOLD($latitud, $longitud) {

        $direccion = "http://10.2.12.222/nominatim/reverse.php?lat=$latitud&lon=$longitud&addressdetails=1&accept-language=es&format=json";

        $opts = array('http' => array('header' => "User-Agent:MyAgent/1.0\r\n"));
        $context = stream_context_create($opts);
        set_time_limit(45); //a veces desde la vpn tarda en acceder a nominatim, esto impide que se interrumpa el script. El default es 30
        $datos = file_get_contents($direccion, false, $context);
        $datos = CJSON::decode($datos);

        $direccion2 = "http://10.2.12.227/geocoder/reverseGeo.php?lat=$latitud&lon=$longitud";
        //echo $direccion;
        //die;
        $datos2 = @file_get_contents($direccion2);
        $datos2 = CJSON::decode($datos2);

        $interseccion = $datos2["interseccion"];

        if (trim($interseccion) != "" && trim($interseccion) != "y") {
            $direccion = $datos['address']['road'] . " " . (isset($datos['address']['house_number']) ? $datos['address']['house_number'] : "") . " (" . $interseccion . ")";
        } else {
            $direccion = $datos['address']['road'] . " " . (isset($datos['address']['house_number']) ? $datos['address']['house_number'] : "");
        }
        if (isset($datos['address']['city']) && trim($datos['address']['city']) != '') {
            $direccion.= ", " . $datos['address']['city'];
        } else {
            if (isset($datos['address']['suburb']) && trim($datos['address']['suburb']) != '') {
                $direccion.= ", " . $datos['address']['suburb'];
            }
        }
        if (isset($datos['address']['state_district']) && trim($datos['address']['state_district']) != '') {
            $direccion.= ", " . $datos['address']['state_district'];
        }
        if (isset($datos['address']['state']) && trim($datos['address']['state']) != '') {
            $direccion.= ", " . $datos['address']['state'];
        }
        return $direccion;
    }

    public function geocodizacionRemota($latitud, $longitud) {
        $direccion = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=$longitud%2C$latitud&langCode=fr&outSR=&forStorage=false&f=pjson";
        $datos = @file_get_contents($direccion);
        $datos = CJSON::decode($datos);

        $geocodizacion = $datos["address"]["Match_addr"];

        if ($geocodizacion !== '' && $geocodizacion != NULL) {
            return $geocodizacion;
        } else {

            $direccion = "https://api.tomtom.com/lbs/services/reverseGeocode/3/json?point=$latitud,$longitud&type=All&projection=EPSG4326&language=es&key=8un36h59t5mqw6ys6h2nqftp";
            $datos = @file_get_contents($direccion);
            $datos = CJSON::decode($datos);

            $geocodizacion = $datos["reverseGeoResponse"]["reverseGeoResult"][0]["formattedAddress"];

            if ($geocodizacion !== '' && $geocodizacion != NULL) {
                return $geocodizacion . "-";
            } else {

                /**
                 * Geocodizacion de Google
                 */
                $direccion = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latitud,$longitud&sensor=false&language=es";

                $datos = @file_get_contents($direccion);
                $datos = CJSON::decode($datos);

                $geocodizacion = $datos["results"][0]["formatted_address"];

                if ($geocodizacion !== '' && $geocodizacion != NULL) {
                    return $geocodizacion;
                } else {
                    $direccion = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latitud,$longitud&sensor=false&language=es";

                    $datos = file_get_contents($direccion);
                    $datos = CJSON::decode($datos);

                    $geocodizacion = $datos["results"][0]["formatted_address"];
                    if ($geocodizacion !== '' && $geocodizacion != NULL) {
                        return $geocodizacion;
                    } /* else {
                      $direccion = "http://10.2.12.222/nominatim/reverse.php?lat=$latitud&lon=$longitud&addressdetails=1&accept-language=es&format=json";

                      $opts = array('http' => array('header' => "User-Agent:MyAgent/1.0\r\n"));
                      $context = stream_context_create($opts);
                      $datos = file_get_contents($direccion, false, $context);

                      $datos = CJSON::decode($datos);

                      $geocodizacion = $datos['display_name'];

                      return $geocodizacion;
                      } */
                }
            }
        }
    }

    public function traerInterseccion($latitud, $longitud) {
        $direccion = "http://10.2.12.227/geocoder/reverseGeo.php?lat=$latitud&lon=$longitud";
        //echo $direccion;
        //die;
        $datos = @file_get_contents($direccion);
        $datos = CJSON::decode($datos);

        $geocodizacion = $datos["interseccion"];
        return $geocodizacion;
    }

    public function traerDireccion2($latitud, $longitud) {

        $direccion = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=$longitud%2C$latitud&langCode=fr&outSR=&forStorage=false&f=pjson";
        $datos = @file_get_contents($direccion);
        $datos = CJSON::decode($datos);

        $geocodizacion = $datos["address"]["Match_addr"];

        if ($geocodizacion !== '' && $geocodizacion != NULL) {
            return $geocodizacion;
        } else {

            $direccion = "https://api.tomtom.com/lbs/services/reverseGeocode/3/json?point=$latitud,$longitud&type=All&projection=EPSG4326&language=es&key=8un36h59t5mqw6ys6h2nqftp";
            $datos = @file_get_contents($direccion);
            $datos = CJSON::decode($datos);

            $geocodizacion = $datos["reverseGeoResponse"]["reverseGeoResult"][0]["formattedAddress"];

            if ($geocodizacion !== '' && $geocodizacion != NULL) {
                return $geocodizacion . "-";
            } else {

                /**
                 * Geocodizacion de Google
                 */
                $direccion = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latitud,$longitud&sensor=false&language=es";

                $datos = @file_get_contents($direccion);
                $datos = CJSON::decode($datos);

                $geocodizacion = $datos["results"][0]["formatted_address"];

                if ($geocodizacion !== '' && $geocodizacion != NULL) {
                    return $geocodizacion;
                } else {
                    $direccion = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latitud,$longitud&sensor=false&language=es";

                    $datos = file_get_contents($direccion);
                    $datos = CJSON::decode($datos);

                    $geocodizacion = $datos["results"][0]["formatted_address"];
                    if ($geocodizacion !== '' && $geocodizacion != NULL) {
                        return $geocodizacion;
                    } /* else {
                      $direccion = "http://10.2.12.222/nominatim/reverse.php?lat=$latitud&lon=$longitud&addressdetails=1&accept-language=es&format=json";

                      $opts = array('http' => array('header' => "User-Agent:MyAgent/1.0\r\n"));
                      $context = stream_context_create($opts);
                      $datos = file_get_contents($direccion, false, $context);

                      $datos = CJSON::decode($datos);

                      $geocodizacion = $datos['display_name'];

                      return $geocodizacion;
                      } */
                }
            }
        }
    }

    public function traerDireccion($latitud, $longitud) {
        if (!$latitud || !$longitud) {
            $direccion = "";
        } else {
            $direccion = "http://10.2.12.227/geocoder/reverseGeo4.php?lat=$latitud&lon=$longitud";
            $datos = @file_get_contents($direccion);
            $datos = CJSON::decode($datos);

            $direccion = "";

            if (isset($datos['calle']) && trim($datos['calle']) != '' && trim($datos['calle']) != 'null') {
                $direccion.= $datos['calle'];
            }
            if (isset($datos['interseccion']) && trim($datos["interseccion"]) != "" && trim($datos["interseccion"]) != "y") {
                $direccion .= " (" . $datos["interseccion"] . ")";
            }
            if (isset($datos['localidad']) && trim($datos['localidad']) != '' && trim($datos['localidad']) != 'null') {
                $direccion.= ", " . $datos['localidad'];
            }
            if (isset($datos['departamento']) && trim($datos['departamento']) != '' && trim($datos['departamento']) != 'null') {
                $direccion.= ", " . $datos['departamento'];
            }
            if (isset($datos['provincia']) && trim($datos['provincia']) != '' && trim($datos['provincia']) != 'null') {
                $direccion.= ", " . $datos['provincia'];
            }
            return $direccion;
        }
    }

    public function traerLocalidad($latitud, $longitud) {
        $direccion = "http://10.2.12.227/geocoder/reverseGeo4.php?lat=$latitud&lon=$longitud";
        $datos = @file_get_contents($direccion);
        $datos = CJSON::decode($datos);

        $direccion = "";

        if (isset($datos['localidad']) && trim($datos['localidad']) != '' && trim($datos['localidad']) != 'null') {
            $direccion.= $datos['localidad'];
        }
        if (isset($datos['departamento']) && trim($datos['departamento']) != '' && trim($datos['departamento']) != 'null') {
            $direccion.= ", " . $datos['departamento'];
        }
        if (isset($datos['provincia']) && trim($datos['provincia']) != '' && trim($datos['provincia']) != 'null') {
            $direccion.= ", " . $datos['provincia'];
        }
        return $direccion;
    }

}
