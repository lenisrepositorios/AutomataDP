var myDiagram = new go.Diagram("myDiagramDiv")
var gojs = go.GraphObject.make;

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "p" },
      { key: "q" },
      { key: "r" }
    ],
    [
      { from: "p", to: "p" , text: "b, b/bb\na, b/ba\nb, a/ab\na, a/aa\nb, #/#b\na, #/#a" },
      { from: "p", to: "q" , text: "b, b/λ\na, a/λ" },
      { from: "q", to: "q" , text: "b, b/λ\na, a/λ" },
      { from: "q", to: "r" , text: "λ, #/#" }
    ]
  );

  myDiagram.nodeTemplate =
  gojs(go.Node, "Auto",
    gojs(go.Shape, "Circle", { fill: "#33FFDD" }),
    gojs(go.TextBlock, { margin: 8 }, new go.Binding("text", "key")),

    // Dibujar el nodo de aceptacion

    gojs(go.Shape, "Circle", { width: 32, height: 32, fill: "transparent", strokeWidth: 1 },
      new go.Binding("visible", "", function(data) {
        return data.key === "r";  // mostrar solo en el nodo r
      }))
  );

  myDiagram.linkTemplate =
  gojs(go.Link,
    gojs(go.Shape),
    gojs(go.Shape, { toArrow: "Standard"}),
    gojs(go.TextBlock, { segmentOffset: new go.Point(45, -15), segmentIndex: 5 },
      new go.Binding("text", "", function(data) {
        if (data.from === "p" && data.to === "p") return "b, b/bb\na, b/ba\nb, a/ab\na, a/aa\nb, #/#b\na, #/#a";

        if (data.from === "p" && data.to === "q") return "b, b/λ\na, a/λ";

        if (data.from === "q" && data.to === "q") return "b, b/λ\na, a/λ";

        if (data.from === "q" && data.to === "r") return "λ, #/#";

      }))
  );

  function validarPalindromoPar(palabra) {
    const pila = ["#"]; // Inicializamos la pila con el símbolo de pila inicial '#'
    let estadoActual = "p"; // El estado inicial es p
    
    for (let i = 0; i < palabra.length; i++) {
      const simboloActual = palabra[i];
      console.log(simboloActual)
      // Buscamos una transición para el símbolo actual desde el estado actual
      const transicion = myDiagram.model.linkDataArray.find(
        (t) => t.from === estadoActual && t.text.includes(`${simboloActual},`)
      );
  
      if (!transicion) {
        // No se encontró una transición válida para el símbolo actual
        return false;
      }
  
      // Realizamos la transición sacando y agregando símbolos a la pila
      const [, sacar, agregar] = transicion.text.split("/");
      if (sacar !== "#") {
        const simboloEnPila = pila.pop();
        if (simboloEnPila !== sacar) {
          // El símbolo a sacar de la pila no coincide con el que está en la cima
          return false;
        }
      }
      if (agregar !== "#") {
        const nuevosSimbolos = agregar.split("").reverse();
        pila.push(...nuevosSimbolos);
      }
  
      // Actualizamos el estado actual
      estadoActual = transicion.to;
    }
  
    // Llegamos al final de la palabra, ahora debemos vaciar la pila
    while (pila.length > 1) {
      const transicion = myDiagram.model.linkDataArray.find(
        (t) => t.from === estadoActual && t.text.includes(`${simboloActual},`)
      );

      if (!transicion) {
        // No se encontró una transición válida para el símbolo #
        return false;
      }
      const [, sacar, agregar] = transicion.text.split("/");
      if (sacar !== "#") {
        const simboloEnPila = pila.pop();
        if (simboloEnPila !== sacar) {
          // El símbolo a sacar de la pila no coincide con el que está en la cima
          return false;
        }
      }
      if (agregar !== "#") {
        const nuevosSimbolos = agregar.split("").reverse();
        pila.push(...nuevosSimbolos);
      }
      estadoActual = transicion.to;
    }
  
    // Verificamos si la palabra es palíndroma
    return palabra === palabra.split("").reverse().join("");
  }
  
  
  console.log(validarPalindromoPar("aabbaa")); // true
  
