
var todosLosMarcadores = [];
var todosLosMarcadoresDeZonas = []; //array en el que se iran guardando los puntos y lineas de las zonas, para luego poder ser borradas del mapa
var map;
function marcadores() {

  console.log(todosLosMarcadores);

}
function initMap() {

  var centro = new google.maps.LatLng(-33.477622, -63.412971);
  var mapOptions = {
    zoom: 5,
    center: centro,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'OSM', google.maps.MapTypeId.HYBRID],
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    size: (100, 100, '%', '%')
  };
  container = document.getElementById('map-canvas');
  map = new google.maps.Map(container,
          mapOptions);

  //Define OSM map type pointing at the OpenStreetMap tile server
  map.mapTypes.set("OSM", new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
    },
    tileSize: new google.maps.Size(256, 256),
    name: "Mapa 2",
    maxZoom: 18
  }));
  //google.maps.event.addDomListener( container, 'resize', function(e){console.log( 'Resize', e)} );

}

google.maps.event.addDomListener(window, 'load', initMap);

/**
 * Grafica en el mapa todos los moviles que tiene asignado el usuario.
 */
function reloadPosiciones2() {
  if (todosLosMarcadores.length > 0) {
    var marcadores = [];

    p = 0;
    for (i = 0; i < todosLosMarcadores.length; i++) {
      if (todosLosMarcadores[i].id != '' && todosLosMarcadores[i].id != undefined) {
        //alert(todosLosMarcadores[i].id);
        marcadores[p] = todosLosMarcadores[i];
        //todosLosMarcadores.splice(i, 1);
        p++;
      }
    }

    if (marcadores.length > 0) {
      var ids = "";
      for (p = 0; p < marcadores.length; p++) {
        if (p == 0) {
          ids += marcadores[p].id;
        } else {
          ids += "," + marcadores[p].id;
        }
      }
      //alert(ids);
      //return
      //alert(marcadores.length);
      if (marcadores.length < 2) {
        var centro = true;
      } else {
        var centro = false;
      }
      var bounds = new google.maps.LatLngBounds();
      var url = 'index.php?r=flota/recargarposiciones&moviles=' + ids;
      var pos = $.getJSON(url, function (datos) {
        //alert(datos.length);
        for (var i = 0; i < datos.length; i++) {
          for (j = 0; j < marcadores.length; j++) {
            if (datos[i].disp.trim() == marcadores[j].id.trim()) {
              //alert(marcadores[j].id)
              marcadores[j].setPosition(new google.maps.LatLng(datos[i].latitud, datos[i].longitud));
              //bounds.extend(marcadores[j].getPosition());
              if (centro == true) {
                map.setCenter(new google.maps.LatLng(datos[i].latitud, datos[i].longitud));
              }
            }
          }
        }

      });

      if ($("#divDatosPosicion").is(":visible")) {
        $("#cargandoDatosPosicion").show();
        var movil = $("#idDispPosicion").val();
        //alert(movil);
        if (movil != '' && movil != undefined) {

          var url = 'index.php?r=flota/detalleposicion&movil=' + movil;
          var pos = $.getJSON(url, function (datos) {
            var rumbo;
            switch (true) {
              case (datos.rumbo > 0 && datos.rumbo < 20):
                rumbo = "Norte";
                break;
              case (datos.rumbo > 21 && datos.rumbo < 70):
                rumbo = "Noreste";
                break;
              case (datos.rumbo > 71 && datos.rumbo < 115):
                rumbo = "Este";
                break;
              case (datos.rumbo > 116 && datos.rumbo < 155):
                rumbo = "Sureste";
                break;
              case (datos.rumbo > 156 && datos.rumbo < 200):
                rumbo = "Sur";
                break;
              case (datos.rumbo > 201 && datos.rumbo < 250):
                rumbo = "Suroeste";
                break;
              case (datos.rumbo > 251 && datos.rumbo < 290):
                rumbo = "Oeste";
                break;
              case (datos.rumbo > 291 && datos.rumbo < 330):
                rumbo = "Noroeste";
                break;
              case (datos.rumbo > 331 && datos.rumbo < 360):
                rumbo = "Norte";
                break;
            }
            $("#movilPosicion").text(datos.movil);
            $("#dominioPosicion").text(datos.dominio);
            $("#velocidadPosicion").text(datos.velocidad);
            $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
            $("#rumboPosicion").text(rumbo);
            $("#marcaPosicion").text(datos.marca);
            $("#modeloPosicion").text(datos.modelo);
            $("#anioPosicion").text(datos.anio);
            $("#direccionPosicion").text(datos.direccion);
            $("#idDispPosicion").val(datos.disp);
            $("#eventoPosicion").text(datos.tipoEvento);
            $("#mileage").text(datos.mileage);
            if (datos.bateria != '' && datos.bateria != null) {
              if (datos.bateria < 10) {
                $("#bateria1").show();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 9 && datos.bateria < 30) {
                $("#bateria1").hide();
                $("#bateria2").show();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 29 && datos.bateria < 50) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").show();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 49 && datos.bateria < 70) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").show();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 69 && datos.bateria < 90) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").show();
                $("#bateria6").hide();
              } else if (datos.bateria > 89) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").show();
              }
              $("#datoBateria").show();
              $("#bateriaPosicion").text(datos.bateria + "%");
            } else {
              $("#datoBateria").hide();
            }
          }).done(function () {
            $("#cargandoDatosPosicion").hide();
          });
        }
      }
    }

  }
}
function reloadPosiciones() {
  //setAllMap(null); //Oculta cualquier otra posicion que este cerca
  //setAllMap(null); //Oculta cualquier otra posicion que este cerca
  //alert(todosLosMarcadores.length);
  if (todosLosMarcadores.length > 0) {
    var marcadores = [];

    p = 0;
    for (i = 0; i < todosLosMarcadores.length; i++) {
      if (todosLosMarcadores[i].id != '' && todosLosMarcadores[i].id != undefined) {
        //alert(todosLosMarcadores[i].id);
        marcadores[p] = todosLosMarcadores[i];
        //todosLosMarcadores.splice(i, 1);
        p++;
      }
    }

    if (marcadores.length > 0) {
      if (marcadores.length < 2) {
        //marcadores[0].setMap(null);
        buscarPosicionActualizada(marcadores[0].id, true);
      } else {
        for (j = 0; j < marcadores.length; j++) {
          marcadores[j].setMap(null);
          buscarPosicionActualizada(marcadores[j].id, false);
        }
      }
    }

  }
  if ($("#divDatosPosicion").is(":visible")) {
    $("#cargandoDatosPosicion").show();
    var movil = $("#idDispPosicion").val();
    //alert(movil);
    if (movil != '' && movil != undefined) {

      var url = 'index.php?r=flota/detalleposicion&movil=' + movil;
      var pos = $.getJSON(url, function (datos) {
        var rumbo;
        switch (true) {
          case (datos.rumbo > 0 && datos.rumbo < 20):
            rumbo = "Norte";
            break;
          case (datos.rumbo > 21 && datos.rumbo < 70):
            rumbo = "Noreste";
            break;
          case (datos.rumbo > 71 && datos.rumbo < 115):
            rumbo = "Este";
            break;
          case (datos.rumbo > 116 && datos.rumbo < 155):
            rumbo = "Sureste";
            break;
          case (datos.rumbo > 156 && datos.rumbo < 200):
            rumbo = "Sur";
            break;
          case (datos.rumbo > 201 && datos.rumbo < 250):
            rumbo = "Suroeste";
            break;
          case (datos.rumbo > 251 && datos.rumbo < 290):
            rumbo = "Oeste";
            break;
          case (datos.rumbo > 291 && datos.rumbo < 330):
            rumbo = "Noroeste";
            break;
          case (datos.rumbo > 331 && datos.rumbo < 360):
            rumbo = "Norte";
            break;
        }
        $("#movilPosicion").text(datos.movil);
        $("#dominioPosicion").text(datos.dominio);
        $("#velocidadPosicion").text(datos.velocidad);
        $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
        $("#rumboPosicion").text(rumbo);
        $("#mileage").text(datos.mileage);
        $("#marcaPosicion").text(datos.marca);
        $("#modeloPosicion").text(datos.modelo);
        $("#anioPosicion").text(datos.anio);
        $("#mileage").text(datos.mileage);
        $("#direccionPosicion").text(datos.direccion);
        $("#idDispPosicion").val(datos.disp);
        $("#eventoPosicion").text(datos.tipoEvento);
        if (datos.bateria != '' && datos.bateria != null) {
          if (datos.bateria < 10) {
            $("#bateria1").show();
            $("#bateria2").hide();
            $("#bateria3").hide();
            $("#bateria4").hide();
            $("#bateria5").hide();
            $("#bateria6").hide();
          } else if (datos.bateria > 9 && datos.bateria < 30) {
            $("#bateria1").hide();
            $("#bateria2").show();
            $("#bateria3").hide();
            $("#bateria4").hide();
            $("#bateria5").hide();
            $("#bateria6").hide();
          } else if (datos.bateria > 29 && datos.bateria < 50) {
            $("#bateria1").hide();
            $("#bateria2").hide();
            $("#bateria3").show();
            $("#bateria4").hide();
            $("#bateria5").hide();
            $("#bateria6").hide();
          } else if (datos.bateria > 49 && datos.bateria < 70) {
            $("#bateria1").hide();
            $("#bateria2").hide();
            $("#bateria3").hide();
            $("#bateria4").show();
            $("#bateria5").hide();
            $("#bateria6").hide();
          } else if (datos.bateria > 69 && datos.bateria < 90) {
            $("#bateria1").hide();
            $("#bateria2").hide();
            $("#bateria3").hide();
            $("#bateria4").hide();
            $("#bateria5").show();
            $("#bateria6").hide();
          } else if (datos.bateria > 89) {
            $("#bateria1").hide();
            $("#bateria2").hide();
            $("#bateria3").hide();
            $("#bateria4").hide();
            $("#bateria5").hide();
            $("#bateria6").show();
          }
          $("#datoBateria").show();
          $("#bateriaPosicion").text(datos.bateria + "%");
        } else {
          $("#datoBateria").hide();
        }
      }).done(function () {
        $("#cargandoDatosPosicion").hide();
      });
    }
  }
}
function visualizaFlota() {
  setAllMap(null); //Oculta cualquier otra posicion que este cerca
  setAllMap(null); //Oculta cualquier otra posicion que este cerca
  var marcador;
  var vectorMarcadores = [];
  var direccion;
  if ($("#divDatosPosicion").is(":visible")) {
    $("#divDatosPosicion").hide('slow');
    //$("#divDatosPosicion").css('width', 0);
  }
  var bounds = new google.maps.LatLngBounds();

  var pos = $.getJSON("index.php?r=flota/posiciones", function (datos) {

    for (var i = 0; i < datos.length; i++) {


      var posicion = new google.maps.LatLng(datos[i].latitud, datos[i].longitud);

      bounds.extend(posicion);

      var icono = {
        url: datos[i].icono,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 16)
      };

      var marcador = new MarkerWithLabel({
        position: posicion,
        icon: icono,
        map: map,
        id: datos[i].disp,
        title: datos[i].movil,
        labelContent: "<span style='color:#15DAE2;'>" + datos[i].dominio + "</span>",
        labelClass: "label-marker",
        labelStyle: {padding: "5px"}
      });
      vectorMarcadores.push(marcador);
      var disp_id = datos[i].disp;
      todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
      //vectorMarcadores[i].infobox = new InfoBox(opcionesInfoBox);
      google.maps.event.addListener(marcador, 'click', (function (marcador, i) {
        return function () {
          if (!$("#divDatosPosicion").is(":visible")) {
            $("#divDatosPosicion").show('slow');
          }
          $("#cargandoDatosPosicion").show();
          var url = 'index.php?r=flota/detalleposicion&movil=' + this.id;
          var pos = $.getJSON(url, function (datos) {
            var rumbo;
            switch (true) {
              case (datos.rumbo > 0 && datos.rumbo < 20):
                rumbo = "Norte";
                break;
              case (datos.rumbo > 21 && datos.rumbo < 70):
                rumbo = "Noreste";
                break;
              case (datos.rumbo > 71 && datos.rumbo < 115):
                rumbo = "Este";
                break;
              case (datos.rumbo > 116 && datos.rumbo < 155):
                rumbo = "Sureste";
                break;
              case (datos.rumbo > 156 && datos.rumbo < 200):
                rumbo = "Sur";
                break;
              case (datos.rumbo > 201 && datos.rumbo < 250):
                rumbo = "Suroeste";
                break;
              case (datos.rumbo > 251 && datos.rumbo < 290):
                rumbo = "Oeste";
                break;
              case (datos.rumbo > 291 && datos.rumbo < 330):
                rumbo = "Noroeste";
                break;
              case (datos.rumbo > 331 && datos.rumbo < 360):
                rumbo = "Norte";
                break;
            }
            $("#movilPosicion").text(datos.movil);
            $("#dominioPosicion").text(datos.dominio);
            $("#velocidadPosicion").text(datos.velocidad);
            $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
            $("#rumboPosicion").text(rumbo);
            $("#mileage").text(datos.mileage);
            $("#marcaPosicion").text(datos.marca);
            $("#modeloPosicion").text(datos.modelo);
            $("#anioPosicion").text(datos.anio);
            $("#direccionPosicion").text(datos.direccion);
            $("#idDispPosicion").val(datos.disp);
            $("#eventoPosicion").text(datos.tipoEvento);
            if (datos.bateria != '' && datos.bateria != null) {
              if (datos.bateria < 10) {
                $("#bateria1").show();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 9 && datos.bateria < 30) {
                $("#bateria1").hide();
                $("#bateria2").show();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 29 && datos.bateria < 50) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").show();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 49 && datos.bateria < 70) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").show();
                $("#bateria5").hide();
                $("#bateria6").hide();
              } else if (datos.bateria > 69 && datos.bateria < 90) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").show();
                $("#bateria6").hide();
              } else if (datos.bateria > 89) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").show();
              }
              $("#datoBateria").show();
              $("#bateriaPosicion").text(datos.bateria + "%");
            } else {
              $("#datoBateria").hide();
            }
          }).done(function () {
            $("#cargandoDatosPosicion").hide();

          });

          /*var centro = map.getCenter();
           var bordes = map.getBounds();
           $("#divDatosPosicion").animate({
           width: "200px",
           opacity: 1
           //}, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);map.setBounds(bordes);});
           }, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);});*/
          //map.fitBounds(map.getBounds());
          //map.fitBounds(map.getBounds());
          //map.panBy(100, 0);
          //$("#cargandoDatosPosicion").hide();
        }
      })(marcador, i));

    }

    //Listener para cambiar el title sobre el marcador del clusterer. Muestra los dominios que se encuentran adentro.
    google.maps.event.addListener(markerCluster, 'mouseover', function (c) {
      if (c.clusterIcon_.div_) {
        var title = "";

        for (var i = 0; i < c.markers_.length; i++) {
          title += c.markers_[i].title + "\n";
        }
        c.clusterIcon_.div_.title = title;
      }
    });
  }).done(function () {
    //console.log( "Datos cargados correctamente!" );

  })
          .fail(function () {
            console.log("Se ha producido un error. Intentelo nuevamente, recargando la pagina.");
          });

}

/**
 * Recibe por parametro el ID del movil, busca su ultima posicion mediante ajax, y lo grafica en el mapa junto a sus datos.
 * @param movil
 */

function visualizaVehiculo(movil, evento) {
  limpiarMapa();
  if ($("#divDatosPosicion").is(":visible")) {
    $("#divDatosPosicion").hide('slow');
    //$("#divDatosPosicion").css('width', 0);
  }
  //$("#divDatosPosicion2").hide('slow');
  $("#movilPosicion").text("");
  $("#dominioPosicion").text("");
  $("#velocidadPosicion").text("");
  $("#fechaPosicion").text("");
  $("#rumboPosicion").text("");
  $("#marcaPosicion").text("");
  $("#modeloPosicion").text("");
  $("#anioPosicion").text("");
  $("#direccionPosicion").text("");
  $("#idDispPosicion").val(movil);
  if (movil == '') {
    alert("el movil no puede ser nulo");
    return;
  }

  var url = 'index.php?r=flota/posiciones&movil=' + movil;
  var pos = $.getJSON(url, function (datos) {
    if (datos.latitud == null || datos.longitud == null) {
      alert("MOVIL SIN POSICION");
      return false;
    }
    $("#menuDetallesMovil").remove();

    if (evento == true)
      var tipoEvento = "<div class='DetalleMapa'>" +
              "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
              "<b>Evento</b> " + datos.tipoEvento +
              "</div>";
    else
      var tipoEvento = "";

    var posicion = new google.maps.LatLng(datos.latitud, datos.longitud);
    var icono = {
      url: datos.icono,
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 16)
    };

    var marcador = new MarkerWithLabel({
      position: posicion,
      icon: icono,
      map: map,
      title: datos.movil,
      id: datos.disp,
      labelContent: "<span style='color:#15DAE2;'>" + datos.dominio + "</span>",
      labelClass: "label-marker",
      labelStyle: {padding: "2px"}
    });
    todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
    //var infobox = new InfoBox(opcionesInfoBox);
    google.maps.event.addListener(marcador, 'click', (function (marcador) {
      return function () {
        //infobox.open(map, this);
        if (!$("#divDatosPosicion").is(":visible")) {
          $("#divDatosPosicion").show('slow');
        }
        $("#cargandoDatosPosicion").show();

        var url = 'index.php?r=flota/detalleposicion&movil=' + this.id;
        var pos = $.getJSON(url, function (datos) {
          //alert('leo');
          var rumbo;
          switch (true) {
            case (datos.rumbo > 0 && datos.rumbo < 20):
              rumbo = "Norte";
              break;
            case (datos.rumbo > 21 && datos.rumbo < 70):
              rumbo = "Noreste";
              break;
            case (datos.rumbo > 71 && datos.rumbo < 115):
              rumbo = "Este";
              break;
            case (datos.rumbo > 116 && datos.rumbo < 155):
              rumbo = "Sureste";
              break;
            case (datos.rumbo > 156 && datos.rumbo < 200):
              rumbo = "Sur";
              break;
            case (datos.rumbo > 201 && datos.rumbo < 250):
              rumbo = "Suroeste";
              break;
            case (datos.rumbo > 251 && datos.rumbo < 290):
              rumbo = "Oeste";
              break;
            case (datos.rumbo > 291 && datos.rumbo < 330):
              rumbo = "Noroeste";
              break;
            case (datos.rumbo > 331 && datos.rumbo < 360):
              rumbo = "Norte";
              break;
          }
          $("#movilPosicion").text(datos.movil);
          $("#dominioPosicion").text(datos.dominio);
          $("#velocidadPosicion").text(datos.velocidad);
          $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
          $("#rumboPosicion").text(rumbo);
          $("#mileage").text(datos.mileage);
          $("#marcaPosicion").text(datos.marca);
          $("#modeloPosicion").text(datos.modelo);
          $("#anioPosicion").text(datos.anio);
          $("#direccionPosicion").text(datos.direccion);
          $("#idDispPosicion").val(datos.disp);
          $("#eventoPosicion").text(datos.tipoEvento);
          if (datos.bateria != '' && datos.bateria != null) {
            if (datos.bateria < 10) {
              $("#bateria1").show();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 9 && datos.bateria < 30) {
              $("#bateria1").hide();
              $("#bateria2").show();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 29 && datos.bateria < 50) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").show();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 49 && datos.bateria < 70) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").show();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 69 && datos.bateria < 90) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").show();
              $("#bateria6").hide();
            } else if (datos.bateria > 89) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").show();
            }
            $("#datoBateria").show();
            $("#bateriaPosicion").text(datos.bateria + "%");
          } else {
            $("#datoBateria").hide();
          }
        }).done(function () {
          $("#cargandoDatosPosicion").hide();

        });

        /*var centro = map.getCenter();
         var bordes = map.getBounds();
         $("#divDatosPosicion").animate({
         width: "200px",
         opacity: 1
         //}, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);map.setBounds(bordes);});
         }, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);});*/
        //map.fitBounds(map.getBounds());
        //map.fitBounds(map.getBounds());
        //map.panBy(100, 0);


      }
    })(marcador));
    map.setZoom(16);
    map.setCenter(posicion);
    //console.log( todosLosMarcadores);
  }).done(function () {
    //console.log( "Datos cargados correctamente!" );
  })
          .fail(function (error) {
            console.log("Se ha producido un error. Intentelo nuevamente, recargando la pagina.");
          });
}


/**
 * Suma el movil al mapa, sin ser centrado en él, ni borrar los otros marcadores.
 *
 * @param movil
 */
function sumarVehiculo(movil) {
  if ($("#divDatosPosicion").is(":visible")) {
    $("#divDatosPosicion").hide('slow');
    //$("#divDatosPosicion").css('width', 0);
  }
  if (movil == '') {
    alert("el movil no puede ser nulo");
    return;
  }

  var url = 'index.php?r=flota/posiciones&movil=' + movil;
  var pos = $.getJSON(url, function (datos) {
    if (datos.latitud == null || datos.longitud == null) {
      alert("MOVIL SIN POSICION");
      return false;
    }

    var posicion = new google.maps.LatLng(datos.latitud, datos.longitud);
    var icono = {
      url: datos.icono,
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 16)
    };
    var marcador = new MarkerWithLabel({
      position: posicion,
      icon: icono,
      map: map,
      id: datos.disp,
      title: 'posicion del movil ' + datos.movil,
      labelContent: "<span style='color:#15DAE2;'>" + datos.dominio + "</span>",
      labelClass: "label-marker",
      labelStyle: {padding: "2px"}
    });

    todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
    // var markerCluster = new MarkerClusterer(map, todosLosMarcadores);
    //var infobox = new InfoBox(opcionesInfoBox);

    map.setZoom(9);
    map.setCenter(posicion);

    google.maps.event.addListener(marcador, 'click', (function (marcador) {
      return function () {
        //infobox.open(map, this);
        if (!$("#divDatosPosicion").is(":visible")) {
          $("#divDatosPosicion").show('slow');
        }
        $("#cargandoDatosPosicion").show();
        var url = 'index.php?r=flota/detalleposicion&movil=' + this.id;
        var pos = $.getJSON(url, function (datos) {
          var rumbo;
          switch (true) {
            case (datos.rumbo > 0 && datos.rumbo < 20):
              rumbo = "Norte";
              break;
            case (datos.rumbo > 21 && datos.rumbo < 70):
              rumbo = "Noreste";
              break;
            case (datos.rumbo > 71 && datos.rumbo < 115):
              rumbo = "Este";
              break;
            case (datos.rumbo > 116 && datos.rumbo < 155):
              rumbo = "Sureste";
              break;
            case (datos.rumbo > 156 && datos.rumbo < 200):
              rumbo = "Sur";
              break;
            case (datos.rumbo > 201 && datos.rumbo < 250):
              rumbo = "Suroeste";
              break;
            case (datos.rumbo > 251 && datos.rumbo < 290):
              rumbo = "Oeste";
              break;
            case (datos.rumbo > 291 && datos.rumbo < 330):
              rumbo = "Noroeste";
              break;
            case (datos.rumbo > 331 && datos.rumbo < 360):
              rumbo = "Norte";
              break;
          }
          $("#movilPosicion").text(datos.movil);
          $("#dominioPosicion").text(datos.dominio);
          $("#velocidadPosicion").text(datos.velocidad);
          $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
          $("#rumboPosicion").text(rumbo);
          $("#marcaPosicion").text(datos.marca);
          $("#modeloPosicion").text(datos.modelo);
          $("#anioPosicion").text(datos.anio);
          $("#mileage").text(datos.mileage);
          $("#direccionPosicion").text(datos.direccion);
          $("#idDispPosicion").val(datos.disp);
          $("#eventoPosicion").text(datos.tipoEvento);
          if (datos.bateria != '' && datos.bateria != null) {
            if (datos.bateria < 10) {
              $("#bateria1").show();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 9 && datos.bateria < 30) {
              $("#bateria1").hide();
              $("#bateria2").show();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 29 && datos.bateria < 50) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").show();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 49 && datos.bateria < 70) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").show();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 69 && datos.bateria < 90) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").show();
              $("#bateria6").hide();
            } else if (datos.bateria > 89) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").show();
            }
            $("#datoBateria").show();
            $("#bateriaPosicion").text(datos.bateria + "%");
          } else {
            $("#datoBateria").hide();
          }
        }).done(function () {
          $("#cargandoDatosPosicion").hide();

        });

        /*var centro = map.getCenter();
         var bordes = map.getBounds();
         $("#divDatosPosicion").animate({
         width: "200px",
         opacity: 1
         //}, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);map.setBounds(bordes);});
         }, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);});*/
        //map.fitBounds(map.getBounds());
        //map.fitBounds(map.getBounds());
        //map.panBy(100, 0);
      }
    })(marcador));
    //console.log( todosLosMarcadores);
  }).done(function () {
    //console.log( "Datos cargados correctamente!" );
  }).fail(function () {
    console.log("Se ha producido un error. Intentelo nuevamente recargando la pagina.");
  });
}

function buscarPosicionActualizada(movil, centrado) {

  if (movil == '') {
    //alert("el movil no puede ser nulo");
    return;
  }

  var url = 'index.php?r=flota/posiciones&movil=' + movil;
  var pos = $.getJSON(url, function (datos) {
    if (datos.latitud == null || datos.longitud == null) {
      //alert("MOVIL SIN POSICION");
      return false;
    }

    var posicion = new google.maps.LatLng(datos.latitud, datos.longitud);
    var icono = {
      url: datos.icono,
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 16)
    };
    var marcador = new MarkerWithLabel({
      position: posicion,
      icon: icono,
      map: map,
      id: datos.disp,
      title: 'posicion del movil ' + datos.movil,
      labelContent: "<span style='color:#15DAE2;'>" + datos.dominio + "</span>",
      labelClass: "label-marker",
      labelStyle: {padding: "2px"}
    });

    //todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
    // var markerCluster = new MarkerClusterer(map, todosLosMarcadores);
    //var infobox = new InfoBox(opcionesInfoBox);

    if (centrado == true) {
      map.setZoom(16);
      map.setCenter(posicion);
    }

    google.maps.event.addListener(marcador, 'click', (function (marcador) {
      return function () {
        //infobox.open(map, this);
        $("#cargandoDatosPosicion").show();
        var url = 'index.php?r=flota/detalleposicion&movil=' + this.id;
        var pos = $.getJSON(url, function (datos) {
          var rumbo;
          switch (true) {
            case (datos.rumbo > 0 && datos.rumbo < 20):
              rumbo = "Norte";
              break;
            case (datos.rumbo > 21 && datos.rumbo < 70):
              rumbo = "Noreste";
              break;
            case (datos.rumbo > 71 && datos.rumbo < 115):
              rumbo = "Este";
              break;
            case (datos.rumbo > 116 && datos.rumbo < 155):
              rumbo = "Sureste";
              break;
            case (datos.rumbo > 156 && datos.rumbo < 200):
              rumbo = "Sur";
              break;
            case (datos.rumbo > 201 && datos.rumbo < 250):
              rumbo = "Suroeste";
              break;
            case (datos.rumbo > 251 && datos.rumbo < 290):
              rumbo = "Oeste";
              break;
            case (datos.rumbo > 291 && datos.rumbo < 330):
              rumbo = "Noroeste";
              break;
            case (datos.rumbo > 331 && datos.rumbo < 360):
              rumbo = "Norte";
              break;
          }
          $("#movilPosicion").text(datos.movil);
          $("#dominioPosicion").text(datos.dominio);
          $("#velocidadPosicion").text(datos.velocidad);
          $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
          $("#rumboPosicion").text(rumbo);
          $("#mileage").text(datos.mileage);
          $("#marcaPosicion").text(datos.marca);
          $("#modeloPosicion").text(datos.modelo);
          $("#anioPosicion").text(datos.anio);
          $("#direccionPosicion").text(datos.direccion);
          $("#idDispPosicion").val(datos.disp);
          $("#eventoPosicion").text(datos.tipoEvento);
          if (datos.bateria != '' && datos.bateria != null) {
            if (datos.bateria < 10) {
              $("#bateria1").show();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 9 && datos.bateria < 30) {
              $("#bateria1").hide();
              $("#bateria2").show();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 29 && datos.bateria < 50) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").show();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 49 && datos.bateria < 70) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").show();
              $("#bateria5").hide();
              $("#bateria6").hide();
            } else if (datos.bateria > 69 && datos.bateria < 90) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").show();
              $("#bateria6").hide();
            } else if (datos.bateria > 89) {
              $("#bateria1").hide();
              $("#bateria2").hide();
              $("#bateria3").hide();
              $("#bateria4").hide();
              $("#bateria5").hide();
              $("#bateria6").show();
            }
            $("#datoBateria").show();
            $("#bateriaPosicion").text(datos.bateria + "%");
          } else {
            $("#datoBateria").hide();
          }
        }).done(function () {
          $("#cargandoDatosPosicion").hide();

        });

        /*var centro = map.getCenter();
         var bordes = map.getBounds();
         $("#divDatosPosicion").animate({
         width: "200px",
         opacity: 1
         //}, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);map.setBounds(bordes);});
         }, 500, function(){google.maps.event.trigger(map, "resize"); map.setCenter(centro);});*/
        //map.fitBounds(map.getBounds());
        //map.fitBounds(map.getBounds());
        //map.panBy(100, 0);
      }
    })(marcador));
    //console.log( todosLosMarcadores);
  }).done(function () {
    //console.log( "Datos cargados correctamente!" );
  }).fail(function () {
    console.log("Se ha producido un error. Intentelo nuevamente recargando la pagina.");
  });
}
/**
 * Funcion que recibe un array de datos (latitud, longitud, velocidad, rumbo, etc) y grafica el recorrido con dichos datos.
 * Esta funcion debe ser llamada mediente otra, que realiza la consula ajax a la base de datos con sus filtros correspondientes y devuelve los datos a ser graficados.
 * @var datos : es un array que contiene: movil, fecha, latitud, longitud, velocidad y rumbo.
 */

function visualizaRecorrido(datos) {
  var bounds = new google.maps.LatLngBounds();

  var inicalPos = new google.maps.LatLng(datos[0].Reporte_Latitud, datos[0].Reporte_Longitud);

  map.setZoom(12);
  map.setCenter(inicalPos);

  var marcador;
  var vectorMarcadores = [];
  var polilinea = [];

  for (var i = 0; i < datos.length; i++) {

    var posicion = new google.maps.LatLng(datos[i].Reporte_Latitud, datos[i].Reporte_Longitud);
    polilinea[i] = posicion;
    bounds.extend(posicion);
    var divDetallesInfowindow = "<div id='menuDetallesMovilInfowindow'>" +
            "<div id='DetalleMapaTit'>Detalle del Vehiculo</div>" +
            "<div class='DetalleMapa'>" +
            "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
            "<b>Velocidad</b> " + datos[i].Reporte_Velocidad +
            " km/h</div>" +
            "<div class='DetalleMapa'>" +
            "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
            "<b>Fecha</b> " + datos[i].Reporte_FechaGPS +
            "</div>" +
            "</div>";

    if (datos[i].Reporte_Velocidad < 5)
      var colorMarcador = 'red';
    else
      var colorMarcador = '#0066FF';

    marcador = new MarkerWithLabel({
      position: posicion,
      map: map,
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: colorMarcador,
        fillColor: '#000000',
        rotation: parseInt(datos[i].Reporte_Rumbo),
        scale: 4.5
      },
      title: 'Posicion numero ' + i,
      labelContent: "<span style='color:#15DAE2;'>" + i + "<span/>",
      labelClass: "label-marker",
      labelStyle: {padding: "2px"}
    });

    var opcionesInfoBox = {
      content: divDetallesInfowindow,
      disableAutoPan: true,
      maxWidth: 0,
      zIndex: null,
      boxStyle: {
        background: "url(http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.9/examples/tipbox.gif) no-repeat",
        opacity: 0.95
      },
      closeBoxMargin: "-13px -10px 0px 0px;",
      closeBoxURL: "images/close.gif",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: true
    };


    todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
    vectorMarcadores.push(marcador);
    vectorMarcadores[i].infobox = new InfoBox(opcionesInfoBox);

    google.maps.event.addListener(marcador, 'click', (function (marcador, i) {
      return function () {
        vectorMarcadores[i].infobox.open(map, this);
      }
    })(marcador, i));
  }
  map.setCenter(bounds.getCenter());
  map.fitBounds(bounds);
  var lineas = new google.maps.Polyline({
    path: polilinea,
    map: map,
    strokeColor: '#009933',
    strokeWeight: 6,
    strokeOpacity: 0.7,
    clickable: true
  });

  todosLosMarcadores.push(lineas); //Guarda las lineas que se agregaron para poder ser borradas

  setTimeout(function () {

    var menuHerramientas = "<div id='menuHerramientas'>" +
            "<button onclick='limpiarMapa();' data-toggle='tooltip' data-placement='right' data-original-title='Limpiar mapa' class='' type='button'><span class='glyphicon glyphicon-refresh'></span></button>" +
            "<button onclick='visualizaFlota();' style='margin-left:5px;' data-toggle='tooltip' data-placement='bottom' data-original-title='Graficar flota' class='' type='button'><span class='glyphicon glyphicon-map-marker'></span></button>" +
            "<button style='margin-left:5px;' onclick='medirDistancia();' data-toggle='tooltip' data-placement='bottom' data-original-title='Medir distancia' class='' type='button'><span class='glyphicon glyphicon-screenshot'></span></button>" +
            "<button style='margin-left:5px;' onclick='$(\"#modalCercas\").modal(\"show\");' data-toggle='tooltip' data-placement='bottom' data-original-title='Crear zona' class='' type='button'><span class='glyphicon glyphicon-edit'></span></button>" +
            "</div>";

    $("#map-canvas").append(menuHerramientas);

    $('[data-toggle=popover]').popover();
    $('[data-toggle=tooltip]').tooltip();

  }, 2000); //Aguarda 2 segundos para realizar la grafica de la flota, debido a que al agregar el mapa de arcGis tira un conflicto si no se espera.

}


/**
 * Funcion de la "regla" que mide distancias en el mapa, creando una polilinea con cada click.
 * Al apretar el click derecho, quiere decir que se termino de verificar la distancia y muestra un alert con los datos.
 **/

function medirDistancia() {

  map.setOptions({draggableCursor: 'crosshair'});

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };

  var poly = new google.maps.Polyline(polyOptions);

  todosLosMarcadores.push(poly); //Guarda las lineas que se agregaron para poder ser borradas

  poly.setMap(map);

  var distancia = 0;
  var path = poly.getPath();
  var puntos = [];
  var contador = 0;

  var cuadroDistanciaTotal = "<div id='cuadroDistanciaTotal'> Distancia : " + distancia + " km</div>";

  $("#map-canvas").append(cuadroDistanciaTotal);

  var listenerClickIzquierdo = google.maps.event.addListener(map, 'click', function (event) {
    path.push(event.latLng);

    if (contador == 0) {
      puntos[0] = event.latLng;
    } else if (contador == 1) {
      puntos[1] = event.latLng;
      distancia += (google.maps.geometry.spherical.computeDistanceBetween(puntos[0], puntos[1])) / 1000; //divido por 100 para pasar a kilometros
    } else if (contador > 1) {
      puntos.push(event.latLng);
      distancia += (google.maps.geometry.spherical.computeDistanceBetween(puntos[contador - 1], puntos[contador])) / 1000; //divido por 100 para pasar a kilometros
    }
    contador++;
    $("#cuadroDistanciaTotal").empty();
    $("#cuadroDistanciaTotal").html("Distancia : " + distancia.toFixed(2) + " km");

  });

  var listenerlClickDerecho = google.maps.event.addListener(map, 'rightclick', function (event) {

    alert("La distancia total es de " + distancia.toFixed(2) + "km");
    $("#cuadroDistanciaTotal").remove()
    google.maps.event.removeListener(listenerClickIzquierdo);
    google.maps.event.removeListener(listenerlClickDerecho);
    map.setOptions({draggableCursor: 'hand'});
    return;
  });
}


/**
 *	Pide mediante ajax las zonas que tiene creadas el usuario logueado, y las grafica en el mapa de google.
 **/

function cargarZonas() {

  $.ajax({
    url: "index.php?r=zonas/zonasdeusuario&completa=true",
    type: 'POST',
    context: document.body,
    success: function (data) {
      if (data != "") {

        var bounds = new google.maps.LatLngBounds();
        var len = Object.keys(data).length;

        for (var i = 0; i < len; i++) {

          if (data[i].tipo == "CIRCULAR") {

            var posicion = new google.maps.LatLng(data[i].puntos[0].latitud, data[i].puntos[0].longitud);
            var icono = {url: "images/iconosMap/marker-zona.png"};
            bounds.extend(posicion);

            var opciones = {
              strokeColor: data[i].color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: data[i].color,
              fillOpacity: 0.35,
              map: map,
              center: posicion,
              radius: data[i].diametro / 2   //en unidades de metros
            };
            var dibujoCercaCircular = new google.maps.Circle(opciones);

            todosLosMarcadoresDeZonas.push(dibujoCercaCircular);

            //MarkerWithLabel
            var marcador = new google.maps.Marker({
              position: posicion,
              icon: icono,
              map: map,
              title: 'Zona ' + data[i].nombre,
            });
            todosLosMarcadoresDeZonas.push(marcador);
          } else if (data[i].tipo == "IRREGULAR") {

            var extremosPoligono = [];
            var icono = {url: "images/iconosMap/marker-zona.png"};

            for (var j = 0; j < Object.keys(data[i].puntos).length; j++) {
              extremosPoligono[j] = new google.maps.LatLng(data[i].puntos[j].latitud, data[i].puntos[j].longitud);

            }

            var poligonoDeZona = new google.maps.Polygon({
              paths: extremosPoligono
              , map: map
              , strokeColor: data[i].color
              , strokeWeight: 3
              , strokeOpacity: 0.5
              , fillColor: data[i].color
              , fillOpacity: 0.3
              , clickable: true
            });

            todosLosMarcadoresDeZonas.push(poligonoDeZona);

            var bounds = new google.maps.LatLngBounds();

            //for(var k=0; k < extremosPoligono.length ;k++){
            for (var k = 0; k < 1; k++) {

              bounds.extend(extremosPoligono[k]);

              var marker = new google.maps.Marker({
                icon: icono,
                position: extremosPoligono[k],
                title: 'Zona ' + data[i].nombre,
                map: map
              });
              todosLosMarcadoresDeZonas.push(marker);
            }
          } else if (data[i].tipo == "RUTA") {

            var posicion = new google.maps.LatLng(data[i].puntos[0].latitud, data[i].puntos[0].longitud);
            var icono = {url: "images/iconosMap/marker-zona.png"};
            var puntosRuta = [];

            for (var j = 0; j < data[i].puntos.length; j++) {

              var pos = new google.maps.LatLng(data[i].puntos[j].latitud, data[i].puntos[j].longitud);
              puntosRuta.push(pos);
            }

            var polyOptions = {
              path: puntosRuta,
              strokeColor: data[i].color,
              strokeOpacity: 0.8,
              strokeWeight: 5,
              geodesic: true,
              editable: false,
              scale: 3
            };
            var polylinea = new google.maps.Polyline(polyOptions);

            polylinea.setMap(map);

            var marker = new google.maps.Marker({
              icon: icono,
              title: 'Ruta ' + data[i].nombre,
              position: posicion,
              map: map
            });

            todosLosMarcadoresDeZonas.push(polylinea); //Guarda cada marcador que se agrega para poder ser borrado
            todosLosMarcadoresDeZonas.push(marker);
          }
        }
        map.setCenter(bounds.getCenter());
      }
    }
  });

}

/**
 * Recibe por parametro el dominio del movil, latitud, longitud, fecha y tipo de alerta, para ser graficada en el mapa.
 * Esta funcion es usada en las grillas de alerta generadas en el menu de operador.
 *
 * @var datos : es un array asociativo con dominio,lat,long,fecha y tipo de alerta
 */

function verPosiciondDeAlerta(dominio, latitud, longitud, tipoAlerta) {

  var geocoder = new google.maps.Geocoder();
  var posicion = new google.maps.LatLng(latitud, longitud);

  var icono = {
    url: "images/alerta-rojo.gif",
  };

  geocoder.geocode({latLng: posicion}, function (results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var direccion = results[0].formatted_address;
    } else {
      direccion = "Direccion no disponible";
    }

    var marcador = new MarkerWithLabel({
      position: posicion,
      map: map,
      title: 'Dominio: ' + dominio,
      labelContent: "Alerta: <span style='color:red !important;'>" + tipoAlerta + "</span><br>Dominio: " + dominio + "<br>Direccion: " + direccion,
      labelClass: "label-marker", // the CSS class for the label
    });

    todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado

  });

  setAllMap(null); //Oculta cualquier otra posicion que este cerca
  setAllMap(null); //Oculta cualquier otra posicion que este cerca

  map.setZoom(16);
  map.setCenter(posicion);

}


/**
 * Recibe el texto capturado desde un input, lo busca con google, y en caso de encontrar direcciones, abre un modal con el listado de resultados.
 * En el listado del modal, al hacer click sobre una direccion la grafica en el mapa.
 */

function buscarDireccion(direccion) {

  if (direccion != '') {

    geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': direccion}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

        $("#resultadosEncontrados").empty();
        $("#cantidadResutados").html("Se encontraron " + results.length + " resultados");

        for (var i = 0; i < results.length; i++) {

          var direccion = results[i].formatted_address;
          var latitud = results[i].geometry.location.lat();
          var longitud = results[i].geometry.location.lng();
          $("#resultadosEncontrados").append("<li><a href='javascript:void(0)' onclick='graficarDireccion(\"" + latitud + "\",\"" + longitud + "\",\"" + direccion + "\")'>" + direccion + "</a></li>");
        }

        $("#modalDireccionesEncontradas").modal("show");



      } else {
        switch (status) {
          case "ZERO_RESULTS":
            alert("No se ha encontrado la direccion especificada");
            break;
          default:
            alert("Se produjo un error. Codigo:" + status)
            break;
        }
      }
    });
  }
}

function graficarDireccion(latitud, longitud, direccion) {

  $("#modalDireccionesEncontradas").modal("hide");

  var posicion = new google.maps.LatLng(latitud, longitud);
  var contentString = '' + direccion + '';

  map.setCenter(posicion);
  map.setZoom(15);

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marcador = new google.maps.Marker({
    map: map,
    position: posicion,
    draggable: false
  });

  google.maps.event.addListener(marcador, 'click', function () {
    infowindow.open(map, marcador);
  });
  todosLosMarcadores.push(marcador);

}


// Setea los marcadores en el array para ser borradoss
function setAllMapZonas(map) {
  for (var i = 0; i < todosLosMarcadoresDeZonas.length; i++) {
    todosLosMarcadoresDeZonas[i].setMap(map); //verificar por qué mierda no funciona! esta linea tira como undefined.
  }
}

function clearMarkers() {
  setAllMap(null);
  poly.setMap(null);
}


function limpiarMapaDeZonas() {

  setAllMapZonas(null); //Oculta cualquier otra posicion que este cerca
  setAllMapZonas(null); //Oculta cualquier otra posicion que este cerca
  var todosLosMarcadoresDeZonas = [];
}

// Setea los marcadores en el array para ser borradoss
function setAllMap(map) {
  for (var i = 0; i < todosLosMarcadores.length; i++) {
    todosLosMarcadores[i].setMap(map);
  }
}

function limpiarMapa() {
  setAllMap(null); //Oculta cualquier otra posicion que este cerca
  setAllMap(null); //Oculta cualquier otra posicion que este cerca
  todosLosMarcadores = [];
}

