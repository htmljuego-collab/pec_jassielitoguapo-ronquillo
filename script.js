// script.js - animaciones sencillas y bolita azul del puntero

(function () {
  "use strict";

  var menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var conRaton = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // 1. Animaciones de la portada (la parte visual está en estilos.css)
  if (!menosMovimiento) {
    document.documentElement.classList.add("js-anim");
  }

  // 2. Bolita azul que sigue al cursor (solo con ratón)
  if (!conRaton) {
    return;
  }

  var bolita = document.createElement("div");
  bolita.className = "puntero";
  bolita.setAttribute("aria-hidden", "true");
  document.body.appendChild(bolita);

  var objetivoX = 0, objetivoY = 0;
  var x = 0, y = 0;
  var visible = false;
  var corriendo = false;
  // Con menos movimiento no hay retraso: la bolita va pegada al cursor
  var suavidad = menosMovimiento ? 1 : 0.22;

  function mover() {
    x += (objetivoX - x) * suavidad;
    y += (objetivoY - y) * suavidad;
    bolita.style.transform = "translate(" + x + "px, " + y + "px)";

    // Se detiene cuando ya llegó, para no gastar recursos
    if (Math.abs(objetivoX - x) > 0.1 || Math.abs(objetivoY - y) > 0.1) {
      requestAnimationFrame(mover);
    } else {
      corriendo = false;
    }
  }

  document.addEventListener("mousemove", function (e) {
    objetivoX = e.clientX;
    objetivoY = e.clientY;
    if (!visible) {
      x = objetivoX;
      y = objetivoY;
      visible = true;
      bolita.classList.add("activo");
    }
    if (!corriendo) {
      corriendo = true;
      requestAnimationFrame(mover);
    }
  });

  document.addEventListener("mouseleave", function () {
    visible = false;
    bolita.classList.remove("activo");
  });
})();
