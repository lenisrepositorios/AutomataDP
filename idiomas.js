var idiomas = {
    es: {
      app: {
        menu:"menu",
        h2I:"Idioma",
        historialboton:"Historial",
        titulo: "Automata",
        barraDelLenguaje: "Ingresa aquí:",
        validador: "Validar",
        Mvelocidad: "Velocidad"
      },
      
    },
    en: {
      app: {
        menu:"Menu",
        h2I:"Languaje",
        historialboton:"history",
        titulo: "automaton",
        barraDelLenguaje: "Enter here:",
        validador: "Validate",
        Mvelocidad: "Speed",
        
      },
      
    },
    pt: {
      app: {
        menu:"Menu",
        h2I:"língua",
        historialboton:"história",
        titulo: "autómatos",
        barraDelLenguaje: "Entrar aqui:",
        validador: "Validar",
        Mvelocidad: "Velocidade"
      },
      
    }
  };

  function cambiarIdioma(idioma) {
    var datosDeIdioma = idiomas[idioma].app;
  
    document.querySelector("#menu").textContent = datosDeIdioma.menu;
    //document.querySelector("#h2I").textContent = datosDeIdioma.h2I;
    document.querySelector("#titulo").textContent = datosDeIdioma.titulo;
    document.querySelector("#barraDelLenguaje").textContent = datosDeIdioma.barraDelLenguaje;
    document.querySelector("#validador").textContent = datosDeIdioma.validador;
    document.querySelector("#Mvelocidad").textContent = datosDeIdioma.Mvelocidad;
    
    
    document.querySelectorAll("#menuIdioma li").forEach(function(li) {
      li.classList.remove("active");
    });
    document.querySelector("#menuIdioma li a[href='/" + idioma + "']").parentNode.classList.add("active");
    
  }
  
  document.querySelectorAll("#menuIdioma li a").forEach(function(enlace) {
    enlace.addEventListener("click", function(e) {
      e.preventDefault();
      cambiarIdioma(enlace.getAttribute("data-idioma"));
    });
  });
