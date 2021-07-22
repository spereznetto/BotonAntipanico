/*!codex-infobox*/
/**

 *
 * Version: 1.0.0 (16/07/2014)
 * Requires: jQuery v1.6+
 *
 * Copyright (c) 2014 Anish
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * Developer :Anish
 */

(function ($) {

  $.fn.infobox = function (options) {
    // Establish our default settings
    var settings = $.extend({
      type: 'normal',
      tittle: 'tittle',
      message: 'message',
      effect: 'on',
      anim: 'bounce',
      overlay: 'true',
      vposition: 'left',
      hposition: 'top',
      timeout: '1000',
      speed: '500',
      animatefrom: 'up'
    }, options);

    return this.each(function () {

      var element_select = this;

      mbox_type = settings.type;
      mbox_tittle = settings.tittle;
      mbox_message = settings.message;
      vertical_position = settings.vposition;
      horizontal_position = settings.hposition;
      hide_timeout = settings.timeout;
      overlay_element = settings.overlay;
      //animation_effect = settings.effect;
      animation_effect = "off";
      animation_type = settings.anim;
      animation_from = settings.animatefrom;
      animation_speed = parseInt(settings.speed);

      if (mbox_type === "error") {
        tittle = "<div class='infobox_title _error'>" + mbox_tittle + "<a href='javascript:void(0);' class='infobox_close'><span class='glyphicon glyphicon-remove'></span></a></div>";
      } else if (mbox_type === "sucess") {
        tittle = "<div class='infobox_title _sucess'>" + mbox_tittle + "<a href='javascript:void(0);' class='infobox_close'><span class='glyphicon glyphicon-remove'></span></a></div>";
      } else {
        tittle = "<div class='infobox_title _normal'>" + mbox_tittle + "<a href='javascript:void(0);' class='infobox_close'><span class='glyphicon glyphicon-remove'></span></a></div>";
      }
      box_element = "<div class='infobox_messgae' data-timeout='" + hide_timeout + "'>" + tittle + "<div class='infobox_messagetext'>" + mbox_message + "</div></div>";
      overlay = "<div class='infobox_overlay'></div>";

      $(box_element).appendTo(element_select);
      if (overlay_element === "true") {
        $(overlay).appendTo(element_select);
      }

      var mm_box = $(".infobox_messgae");
      var overlay_box = $(".infobox_overlay");



      if ($(mm_box).length > 0) {
        $(mm_box).stop(true, false).hide();
      }


      if (animation_effect === "on") {
        $(mm_box).show(animation_type, {
          direction: animation_from
        }, animation_speed);
      } else {
        $(mm_box).stop(true, false).slideDown("fast");
      }

      var botonCerrar = $(this).find(".infobox_close");
      botonCerrar.click(function () {
        removeall();
      });

      var removeall = function () {
        if ($(mm_box).length > 0) {
          $(mm_box).slideUp("fast", function () {
            $(mm_box).remove();
          });
        }
        if ($(overlay_box).length > 0) {
          $(overlay_box).fadeOut("fast", function () {
            $(overlay_box).remove();
          });
        }
        return true;
      };
    });
  };
}(jQuery));

function mensajeBoxError(titulo, msj) {
  $("body").infobox({
    type: 'error',
    tittle: titulo.toUpperCase(),
    message: '<b>' + msj + '</b>'
  });
}

function mensajeBoxNormal(titulo, msj) {
  $("body").infobox({
    type: 'normal',
    tittle: titulo.toUpperCase(),
    message: '<b>' + msj + '</b>'
  });
}

function mensajeBoxSuccess(titulo, msj) {
  $("body").infobox({
    type: 'sucess',
    tittle: titulo.toUpperCase(),
    message: '<b>' + msj + '</b>'
  });
}
