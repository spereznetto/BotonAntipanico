var timerAlertaDeUsuario;


//usado por cajasMoviles() para hacer el intercambio de posicion entre 2 cajas draggables
jQuery.fn.swap = function (b) {
  b = jQuery(b)[0];
  var a = this[0];
  var t = a.parentNode.insertBefore(document.createTextNode(''), a);
  b.parentNode.insertBefore(a, b);
  t.parentNode.insertBefore(b, t);
  t.parentNode.removeChild(t);
  return this;
};

//Funcion para hacer las cajas de clase ".box" movibles
function cajasMovibles() {
  $("div.box").not('.no-drop')
    .draggable({
      revert: true,
      zIndex: 2000,
      cursor: "crosshair",
      handle: '.box-name',
      opacity: 0.8
    })
    .droppable({
      tolerance: 'pointer',
      drop: function (event, ui) {
        var draggable = ui.draggable;
        var droppable = $(this);
        var dragPos = draggable.position();
        var dropPos = droppable.position();
        draggable.swap(droppable);
        setTimeout(function () {
          var dropmap = droppable.find('[id^=map-]');
          var dragmap = draggable.find('[id^=map-]');
          if (dragmap.length > 0 || dropmap.length > 0) {
            dragmap.resize();
            dropmap.resize();
          } else {
            draggable.resize();
            droppable.resize();
          }
        }, 50);
        setTimeout(function () {
          draggable.find('[id^=map-]').resize();
          droppable.find('[id^=map-]').resize();
        }, 250);
      }
    });
}

/**
 * Abre el menu para realizar la descarga del recorrido, con el movil que fue clickeado.
 * @param movil
 */

function menuDescargaRecorrido(movil) {

  //var dominio = $("#" + movil + "").attr("alt");

  $("#dialogRecorridoHist #recorridoHistoricoMovil").val(movil);

  $("#recorridoHistorico-movil").empty();
  $("#recorridoHistorico-movil").append("<div><h6>Recorrido del movil</div></h6>");
  $("#dialogRecorridoHist").dialog("open");

}

/**
 * Recibe el ID de movil y genera el recorrido en .kml para ser decargado.
 * @param movil
 */

function descargaRecorrido() {

  var fechaDesde = $("#recorridoHistoricoFechaDesde").val();
  var fechaHasta = $("#recorridoHistoricoFechaHasta").val();
  //var movil = $("#recorridoHistoricoMovil").attr("alt");
  var movil = $("#recorridoHistoricoMovil").val();

  if (fechaDesde == "") {
    alert("Debe seleccionar la fecha inicial");
    return;
  }
  if (fechaHasta == "") {
    alert("Debe seleccionar la fecha final");
    return;
  }
  if (movil == "") {
    alert("No se ha seleccionado un movil");
    return;
  }

  if ((Date.parse(fechaDesde)) > (Date.parse(fechaHasta))) {
    alert("La fecha inicial no puede ser mayor que la fecha final");
    return;
  }


  //Falta hacer un validador ajax para verificar si hay datos o no.

  $.ajax({
    url: "index.php?r=informes/descargarecorrido&recorridoHistorico%5Bdesde%5D=" + fechaDesde + "&recorridoHistorico%5Bhasta%5D=" + fechaHasta + "&recorridoHistorico%5Bmovil%5D=" + movil + "",
    type: 'GET',
    context: document.body,
    success: function (data) {
      if (data == null) {

        console.log("no hay datos");
        console.log(data);
        return;

      } else {
        console.log(data);
        console.log("hay datos");
        window.location.assign("index.php?r=informes/descargarecorrido&recorridoHistorico%5Bdesde%5D=" + fechaDesde + "&recorridoHistorico%5Bhasta%5D=" + fechaHasta + "&recorridoHistorico%5Bmovil%5D=" + movil + "");
        return false;
      }
    }
  });



}


/**
 * Abre el menu para realizar la descarga del recorrido, con el movil que fue clickeado.
 * @param movil
 */

function menuVisualizaRecorrido(movil) {

  var dominio = $("#" + movil + "").attr("alt");

  $("#visualizaRecorridoHistorico-movil").empty();
  $("#visualizaRecorridoHistorico-movil").append("<div><h6>Recorrido del movil<div id='visualizaRecorridoHistoricoMovil' title=\"" + movil + "\" ></div></div></h6>");
  $("#dialogVisualizaRecorridoHist").dialog("open");

}

function modificarAlias(idmovil, dominio) {
  //alert($("#tipoUsuarioAlias").val());
  if ($("#tipoUsuarioAlias").val() == 'FLOTA') {
    alert("EL USUARIO FLOTA NO PUEDE MODIFICAR ALIAS");
    return false;
  }
  //var dominio = $("#"+idmovil+"").attr("alt");

  $("#modificaAlias-movil").empty();
  $("#modificaAlias-movil").append("<div><h6>Modificar Alias del Dominio<div id='modificaAliasMovil' title=\"" + idmovil + "\" >" + dominio + "</div></div></h6>");
  $("#dialogModificarAlias").dialog("open");

}

function guardarAlias() {
  var movil = $("#modificaAliasMovil").attr("title");
  var alias = $("#Alias").val();
  $.ajax({
    url: "index.php?r=gestionMoviles/guardaralias&idmovil=" + movil + "&alias=" + alias,
    type: 'GET',
    //data:datos,
    context: document.body,
    success: function (data) {
      alert(data);
      if (data == 'ACTUALIZADO CORRECTAMENTE') {
        window.location = window.location;
      }
    }


  }).error(function (e) {
    console.log("Se produjo un error.\n");
  });
}
/**
 * Busca los parametros fechainicial, fechafinal, y id del disp de movil en el menu de visualizacion de recorrido del movil (dialog de jquyeryui).
 *
 */
function verRecorrido() {
  var fechaDesde = $("#visualizaRecorridoHistoricoFechaDesde").val();
  var fechaHasta = $("#visualizaRecorridoHistoricoFechaHasta").val();
  var movil = $("#visualizaRecorridoHistoricoMovil").attr("title");

  if (fechaDesde == "") {
    alert("Debe seleccionar la fecha inicial");
    return;
  }
  if (fechaHasta == "") {
    alert("Debe seleccionar la fecha final");
    return;
  }
  if (movil == "") {
    alert("No se ha seleccionado un movil");
    return;
  }

  if ((Date.parse(fechaDesde)) > (Date.parse(fechaHasta))) {
    alert("La fecha inicial no puede ser mayor que la fecha final");
    return;
  }

  datos = {
    "movil": movil,
    "desde": fechaDesde,
    "hasta": fechaHasta
  };

  $.ajax({
    url: "index.php?r=informes/recorrido",
    type: 'POST',
    data: datos,
    context: document.body,
    success: function (data) {

      if (data.length === 0) {
        alert("No se encontraron registros en el rango de fechas seleccionado");
        return;
      }
      if (data.length > 500) {
        alert("Se encontraron mas de 500 registros. Por favor acote su busqueda");
        return;
      }

      $("#dialogVisualizaRecorridoHist").dialog("close");
      visualizaRecorrido(data); //llama a la funcion que visualiza el recorrido, que se encuentra en funcionesGmap.js
    }
  }).error(function (e) {
    console.log("Se produjo un error.\n");
  });
}



function verSeguimiento(movil, manual) {
  datos = {
    "movil": movil
  };

  $.ajax({
    url: "index.php?r=informes/seguimiento",
    type: 'POST',
    data: datos,
    context: document.body,
    success: function (data) {

      if (data.length == 0) {
        alert("No se encontraron registros en el rango de fechas seleccionado");
        if (todosSeguimientos.indexOf(movil) !== -1) {
          todosSeguimientos.splice(todosSeguimientos.indexOf(movil), 1);
        }
        return;
      }
      if (data.length === 1 && data[0] === null) {
        alert("No existen reportes en la última hora.");
        if (todosSeguimientos.indexOf(movil) !== -1) {
          todosSeguimientos.splice(todosSeguimientos.indexOf(movil), 1);
        }
        return;
      }

      visualizaSeguimiento(data, manual); //llama a la funcion que visualiza el recorrido, que se encuentra en funcionesGmap.js
    }
  }).error(function (e) {
    console.log("Se produjo un error.\n");
  });
}


/**
 * Trae los moviles caidos en formato JSON, con el tiempo que fue especificado por el operador en su menu.
 * Rellena una grilla con los datos encontrados y la completa en el modal de caidos para el operador.
 */

function verificarCaidos(idIntranet) {
  //alert(idIntranet)
  $('#caidos-grid table tbody tr').remove(); //Limpio la grilla de cualquier resultado previo.
  $('#cargandoCaidos').show();
  $('#caidos-grid table tbody').append("<tr></tr>");

  var tiempo = $("#minutosCaido").val(); //minutos especificados por el operador
  var ultEnvio = $("#ultEnvio").val();
  var cli = 0;
  var mov = 0;

  if ($('#checkCli').is(":checked"))
    cli = 1;
  if ($('#checkMov').is(":checked"))
    mov = 1;

  $.ajax({
    url: "index.php?r=operador/caidos&tiempo=" + tiempo + "&cli=" + cli + "&mov=" + mov + "&ultEnvio=" + ultEnvio,
    type: 'POST',
    context: document.body,
    success: function (data) {
      $('#cargandoCaidos').hide();
      if (Object.keys(data).length < 1) {
        alert("No se encontraron moviles caidos.");
        return;
      } else {
        for (var i = 0; i < Object.keys(data).length; i++) {
          $('#caidos-grid table tbody tr:last').after('<tr></tr>').append("<td>" + (i + 1) + "</td>" +
            "<td>" + data[i].Clie_RazonSocial + "</td>" +
            "<td>" + data[i].Movil_Dominio + "</td>" +
            "<td>" + data[i].Disp_ID + "</td>" +
            "<td>" + data[i].EstadoMovil_Descripcion + "</td>" +
            "<td>" + data[i].Reporte_FechaServidor + "</td>" +
            "<td>" + (data[i].Clie_Tel || "") + "</td>" +
            "<td>" + (data[i].Clie_Tel2 || "") + "</td>" +
            "<td>" + (data[i].Clie_Email || "") + "</td>" +
            "<td>" + (data[i].Disp_Linea || "") + "</td>" +
            "<td>" + (data[i].Disp_Linea2 || "") + "</td>" +
            "<td>" + (data[i].LogFecha || "") + "</td>" +
            "<td style='text-align: center;'>" +
            "<a onclick='modalTicket(\"" + data[i].Clie_NumeroOtroSistema + "\", \"" + data[i].Movil_Dominio + "\", \"" + idIntranet + "\", \"" + data[i].IdCliente + "\", \"" + data[i].Clie_Email + "\", \"" + data[i].Reporte_FechaServidor + "\", \"caido\", \"\")' title='' data-toggle='tooltip' href='javascript:void()' data-original-title='Generar ticket'>" +
            "<i class='glyphicon glyphicon-flag'></i></a>"
            +"<a style='margin-left:8px;' onclick='whatsappCaidos(\"" + data[i].Clie_NumeroOtroSistema + "\",\"" + data[i].Clie_Tel + "\",\"" + data[i].Movil_Dominio + "\", \"" + data[i].IdCliente + "\", \"" + data[i].Clie_Empresa + "\")' title='' data-toggle='tooltip'  data-original-title='Generar aviso por WhatsApp al cliente'>"
            +"<i class='glyphicon glyphicon-earphone'></i></a>"
            +
            "</td>");
        }
      }
    }
  }).done(function () {
    $('[data-toggle=popover]').popover();
    $('[data-toggle=tooltip]').tooltip();
  }).error(function (e) {
    console.log("Se produjo un error.\n");
  });
}

function whatsappCaidos(idCliente,telefono, dominio, cliente2, empresa){
  if(empresa == 2){
    alert('Accion No Valida Para Clientes Preventcar');
    die; 
  }
  $.ajax({
    url: "index.php?r=operador/cargarticket&idCliente=" + idCliente + "&idCliente2=" + cliente2 + "&dominio=" + dominio + "&observaciones=Envio de mensaje por Whastsapp&mails=" + null + "&fecha=" + null + "&tipo=caido&tipoAlerta=" + null,
    type: 'GET',
    context: document.body,
    success: function (data) {
      alert(data);
    }
  });
  window.open("sendBoton.php?Telefono=" + telefono + "&Dominio=" + dominio +" ", "PopUp", "width=800,height=600");

}

function excelCaidos(idIntranet) {
  //alert(idIntranet)
  $('#caidos-grid table tbody tr').remove(); //Limpio la grilla de cualquier resultado previo.
  $('#cargandoCaidos').show();
  $('#caidos-grid table tbody').append("<tr></tr>");

  var tiempo = $("#minutosCaido").val(); //minutos especificados por el operador
  var ultEnvio = $("#ultEnvio").val();
  var cli = 0;
  var mov = 0;

  if ($('#checkCli').is(":checked"))
    cli = 1;
  if ($('#checkMov').is(":checked"))
    mov = 1;

  window.location = "index.php?r=operador/caidosExcel&tiempo=" + tiempo + "&cli=" + cli + "&mov=" + mov + "&ultEnvio=" + ultEnvio;
}

///****** funcion para descargar en excel el listado de asignacion de moviles a usuarios **/
function excelAsignacionMovilesUsuarios(idIntranet) {
  //Esto trae toda la url con los filtros
  var url = decodeURIComponent($("#asignacion-moviles-usuario-grid>.keys").attr("title"));
  //Te movi la funcion a donde tiene que estar, el mismo controller, pero a otra funcion
  url = url.replace('r=asignacionMovilesUsuario/admin', 'r=asignacionMovilesUsuario/ListadoAsignacionMovilesExcel');
  window.location = url;
}

function mailCaidos(clien) {
  $.ajax({
    url: "index.php?r=operador/mailcaidos&cliente=" + clien,
    type: 'POST',
    context: document.body,
    success: function (data) {
      alert(data);
    }
  })
}


function modalTicket(clien, dominio, idIntranet, idClien, email, fecha, tipo, tipoAlerta, alerta_id, ocultDest) {
  //alert(tipo);
  if (idIntranet == '' || idIntranet == 'undefined') {
    alert("NO TIENE ASOCIADO UN USUARIO DE INTRANET, COMUNIQUESE CON SISTEMAS");
  } else {
    $('#tipoModal').val(tipo);
    $('#tipoAlertaModal').val(tipoAlerta);
    $('#clienteModal').val(clien);
    $('#dominioModal').val(dominio);
    $('#idClienteModal').val(idClien);
    $('#fechaModal').val(fecha);
    $('#frameMails').empty();
    $('#frameMailCliente').empty();
    $("#myModalLabe2,#myModalLabe3").show();
    $("input[id='alerta_id']").val(-1);
    //if (typeof (alerta_id) === 'undefined') {
    if (typeof (ocultDest) === 'undefined') {
      $('#frameMailCliente').append("<div><input type='checkbox' value='" + email + "'> " + email + "</div>");
      $.ajax({
        url: "index.php?r=operador/mostrarautorizados&cliente=" + idClien + "&dominio=" + dominio,
        type: 'POST',
        context: document.body,
        success: function (data) {
          for (var i = 0; i < Object.keys(data).length; i++) {
            //alert(data[i].mail);
            $('#frameMails').append("<div><input type='checkbox' value='" + data[i].mail + "'> " + data[i].mail + "</div>");
          }
        }
      });
    } else {
      $("#myModalLabe2,#myModalLabe3").hide();
    }

    if (typeof (alerta_id) !== 'undefined') {
      $("input[id='alerta_id']").val(alerta_id);
      $.ajax({
        url: 'index.php?r=alertas/verificarBloqueada&alertaID=' + alerta_id,
        method: 'GET',
        success(data) {
          console.log(data);
          if (data != "1") {
            alert(data);
          } else {
            $('#observacionesModal').val("");
            $('#modalTicket').modal('show');
          }
        }
      });
    } else {
      $('#observacionesModal').val("");
      $('#modalTicket').modal('show');
    }
  }
  //var dato = prompt('Por favor ingrese su ticket');
  //alert(dato);
}

$(document).on('click', '#guardarTicket', function () {
  var onSuccess;
  if ($("input#alerta_id").val() != '-1') {
    var alerta_id = $("input#alerta_id").val();

    onSuccess = function () {
      $("td").children("#" + alerta_id).trigger("marcar");
    };
  }

  cargarTicket(onSuccess);
});




function cargarTicket(onSuccessCallBack) {

  var mails = [];
  $("input:checkbox:checked").each(function () {
    //cada elemento seleccionado
    mails.push($(this).val());
  });
  var stringMails = mails.join("~");
  var idCliente = $('#clienteModal').val();
  var idCliente2 = $('#idClienteModal').val();
  var dominio = $('#dominioModal').val();
  var observaciones = $('#observacionesModal').val();
  var fecha = $('#fechaModal').val();
  var tipo = $('#tipoModal').val();
  var tipoAlerta = $('#tipoAlertaModal').val();
  //alert(encodeURIComponent(observaciones));
  //alert($('#observacionesModal').val());

  $.ajax({
    url: "index.php?r=operador/cargarticket&idCliente=" + idCliente + "&idCliente2=" + idCliente2 + "&dominio=" + dominio + "&observaciones=" + encodeURIComponent(observaciones) + "&mails=" + stringMails + "&fecha=" + fecha + "&tipo=" + tipo + "&tipoAlerta=" + tipoAlerta,
    type: 'GET',
    context: document.body,
    success: function (data) {
      if (typeof onSuccessCallBack !== 'undefined') {
        if ($.isFunction(onSuccessCallBack)) {
          onSuccessCallBack();
        }
      }

      alert(data);
    }
  });
  $('#modalTicket').modal('hide');
}

$(document).on('hidden.bs.modal', '#modalTicket', function () {
  if (idUsuarioIntranet) {
    alerta_id = $("input[id='alerta_id']").val();
    $.ajax({
      url: 'index.php?r=alertas/limpiarBloqueada&alertaID=' + alerta_id + '&operador=' + idUsuarioIntranet,
      method: 'GET',
      success(data) {
        console.log(data);
      }
    });
  }
});

/**
 * Recibe por parametro el movil que se desea verificar las ultimas alertas y abre el modal "_modalUltimasAlertas.php" con la grilla de
 * las alertas del movil.
 */

function verificarUltimasAlertas(dominio, tipo) {

  $('#ultimas-alertas-grid2 table tbody tr').remove(); //Limpio la grilla de cualquier resultado previo.
  $('#ultimas-alertas-grid2 table tbody').append("<tr></tr>");

  $("#tituloUltimasAlertas2").empty();
  $("#tituloUltimasAlertas2").html("Ultimas alertas del movil " + dominio);
  $("body").addClass("cargando2");

  $.ajax({
    url: "index.php?r=alertas/ultimas&dominioMovil=" + dominio,
    type: 'POST',
    context: document.body,
    success: function (data) {

      if (Object.keys(data).length < 1) {
        alert("No se encontraron registros de alertas.");
        return;
      } else {
        for (var i = 0; i < Object.keys(data).length; i++) {
          $('#ultimas-alertas-grid2 table tbody tr:last').after('<tr></tr>').append("<td>" + data[i].dominio + "</td>" +
            "<td>" + data[i].nombreMovil + "</td>" +
            "<td>" + data[i].fecha + "</td>" +
            "<td>" + data[i].ubicacion + "</td>" +
            "<td>" + data[i].tipo + "</td>" +
            "<td>" + data[i].descripcion + "</td>");
          //+ "<td id='" + data[i].idAlerta + "' style='text-align:center;'><a title='Marcar como leido' data-toggle='tooltip' href='javascript:void(0)' id='" + data[i].idAlerta + "' data-original-title='Marcar como leido' onclick='marcarAlertaLeida(this.id)'><i class='glyphicon glyphicon-check'></i></a></td>");

          $("#modalUltimasAlertasCliente").modal("show");

        }
      }
    }
  }).done(function () {
    $("body").removeClass("cargando2");
  }).error(function (e) {
    $("body").removeClass("cargando2");
    console.log("Se produjo un error.\n");
  });

}

/**
 * Recibe el id de la alerta que marcará como leida, y lo guarda en la base de datos.
 */

function marcarAlertaLeida(id) {

  $.ajax({
    url: "index.php?r=alertas/marcarleida&id=" + id,
    type: 'POST',
    context: document.body,
    success: function (data) {
      //$("td").children("#"+id).remove();
      $("td").children("#" + id).closest('tr').remove();
    }
  }).error(function (e) {
    console.log("Se produjo un error.\n");
  });

}

/**
 * Funcion que es llamada por el timerAlertaDeUsuario que se encuentra en $(document).ready(), y verifica si existen alertas.
 * Si encuentra, llama a la funcion que muestra el cartel emergente con las que se produjeron.
 *
 */

function buscarAlertas() {

  $.ajax({
    url: "index.php?r=alertas/verificarAlertas",
    type: 'POST',
    context: document.body,
    success: function (data) {
      //llama a la funcion para graficar las alertas, solo si recibe registros de alertas.
      if (data != "") {
        mostrarAlerta(data);
      }
    }
  }).error(function (e) {
    console.log("Se produjo un error.\n" + e.ResponseText);
  });
}

function contarTickets() {
  $.ajax({
    url: "index.php?r=operador/contarTickets",
    type: 'GET',
    context: document.body,
    success: function (data) {
      if (data !== "NO") {
        $("#contador-notificaciones-op").text(data);
      }
    }
  });
}

function mostrarAlerta(datosAlertas) {

  var datos = "";
  $.notify(".", {
    position: "top right",
    clickToHide: false,
    style: "metro",
    autoHide: true,
    gap: 50,
    autoHideDelay: 50000,
  });
  $("#contenido-alerta").empty();

  for (var i = 0; i < Object.keys(datosAlertas).length; i++) {

    if (datosAlertas[i].ControlAlerta_Sonido == 1)
      ion.sound.play("alarma");

    datos = "Dominio: " + datosAlertas[i].Movil_Dominio + "<br>Movil: " +
      datosAlertas[i].Movil_Nombre + "<br>Tipo: " +
      datosAlertas[i].TiAl_descripcion + "<br>Fecha :" +
      datosAlertas[i].AlerControl_FechaGPS + "<br>Velocidad: " +
      datosAlertas[i].AlerControl_Velocidad + " km/h<br>Descripcion: " +
      datosAlertas[i].AlerControl_TextoInforme + "<br>Ubicacion:" +
      datosAlertas[i].Direccion +
      "<hr style='margin-top:10px;margin-bottom:10px;'>";

    $("#contenido-alerta").append(datos);
  }
}

//Evento de click sobre la cruz que cierra la ventana de la notificacion.
$(document).on('click', '#cerrar-alerta', function () {
  $(this).trigger('notify-hide');
});

//Evento de click sobre el cartel de STOP, el cual detiene las notificaciones.
$(document).on('click', '#detener-alerta', function () {
  //Puche 11/12/2018, no se frena el timer de alertas cuando el usuario le da stop, se siguen buscando
  //window.clearInterval(timerAlertaDeUsuario);
  $("#detener-alerta").trigger('notify-hide');

  $.post("index.php?r=alertas/desactivarbusqueda", function (data) {
    console.log("Mensajes de alertas desactivadas");
  });
});

$.notify.addStyle("metro", {
  html: "<div style='width:280px;height:160px;padding:5px;z-index:10;font-size: 11px;margin-top: 50px;'>" +
    "<div id='header-alerta' style='width:100%;height:35px;background:url(\"images/icono-alerta.png\");background-repeat: no-repeat;'>" +
    "<a href='index.php?r=alertas/ultimas'><h4 style='float:left;font-weight:bold;color:#583030;margin-left: 40px;'>ALERTA GENERADA</h4><a/>" +
    "<a class='close' id='cerrar-alerta' style='font-size:24px;'>&times;</a>" +
    "<a class='close' alt='Detener notificaciones en pantalla' id='detener-alerta' style='font-size:24px;'></a>" +
    "</div>" +
    "<div id='contenido-alerta' style='overflow-y:auto;width: 268px;height: 105px;'>" +
    "<span data-notify-text>" +
    " </div>" +
    "</span>" +
    "</div>",
  classes: {
    error: {
      "color": "#fafafa !important",
      "background-color": "#F57F22",
      "border": "1px solid #FF0000",
      "-webkit-border-radius": "10px",
      "-moz-border-radius": "10px",
      "border-radius": "10px"
    },
  }
});

function soloNumeros(e) {

  var keynum = window.event ? window.event.keyCode : e.which;
  if ((keynum == 8) || (keynum == 46))
    return true;
  return /\d/.test(String.fromCharCode(keynum));
}

/*
 * Excel con los datos de la tabla del panel de operador (con los filtros aplicados)
 */
function ultimaPosicionExcel() {
  var parametros = new Object();

  // PASO 1: obtener los filtros de la tabla (para poder hacer la query)
  parametros.filtros = [];
  $.each($("#moviles-grid > table > thead > tr.filters > td div.filter-container input"), function (index, value) {
    var nombre = $(this).attr("name"); // nombre de la columna
    var valor = $(this).attr("value"); // valor del filtro de esa columna
    parametros.filtros.push({
      'atributo': nombre,
      'valor': valor
    });
  });

  var stringJSONfiltros = JSON.stringify(parametros.filtros);
  $("#ultimaPosicionFiltros").val(stringJSONfiltros);
  return true;
}

// SUGERENCIAS
$(document).on('click', 'button[name="sugerencia-bloquear"]', function () {
  var btnCaller = $(this);
  var container = btnCaller.closest('div.sugerencia-container');
  var sugerencia_id = container.attr('data-sugerencia');

  var confirmacion = confirm("Al bloquear la sugerencia ya no podran hacerse mas comentarios. Confirme si desea bloquearla realmente.");

  if (confirmacion) {
    container.addClass("sugerencia-bloqueada");

    $.ajax({
      url: "index.php?r=sugerencia/bloquear",
      data: {
        sugerencia: sugerencia_id
      },
      dataType: "JSON",
      type: "POST",
      success: function (respuesta) {
        if (respuesta.estado != 1) {
          alert(respuesta.mensaje);
        }
      },
      error: function () {
        alert("ERROR: No se pudo bloquear la sugerencia");
        container.removeClass("sugerencia-bloqueada");
      }
    });
  }
});

$(document).on('click', 'button[name="sugerencia-comentar"]', function () {
  var btnCaller = $(this);
  var container = btnCaller.closest('div.sugerencia-container');
  var sugerencia_id = container.attr('data-sugerencia');

  btnCaller.prop("disabled", true);
  btnCaller.css("opacity", 0.5);

  $.ajax({
    url: "index.php?r=sugerencia/comentar",
    data: {
      sugerencia: sugerencia_id,
      comentario: container.find('textarea')[0].value
    },
    dataType: "JSON",
    type: "POST",
    success: function (respuesta) {
      if (respuesta.estado == 1) {
        container.find('textarea')[0].value = "";
        container.find('div.comentarios-anteriores>div.body').empty().append(respuesta.comentarios_actualizados);
      } else {
        alert(respuesta.mensaje);
      }
    },
    error: function () {
      alert("ERROR: No se pudo realizar el comentario");
    },
    complete: function () {
      btnCaller.prop("disabled", false);
      btnCaller.css("opacity", 1);
    }
  });
});