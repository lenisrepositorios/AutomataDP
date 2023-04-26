var myDiagram = new go.Diagram("myDiagramDiv")
var gojs = go.GraphObject.make;

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "p" , loc: new go.Point(-150, 0)},
      { key: "q" , loc: new go.Point(0, 0)},
      { key: "r" , loc: new go.Point(150, 0)},
      { key: "stack" , loc: new go.Point(150, 0) , stack: ["#"], top: 1},
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

    gojs(go.Shape, "Circle", { width: 32, height: 32, fill: "transparent", strokeWidth: 1 },
      new go.Binding("visible", "", function(data) {
        return data.key === "r";
      }))
  );

  myDiagram.nodeTemplateMap.add("stack",
  gojs(go.Node, "Auto",
    { location: new go.Point(0, 0) },
    gojs(go.Shape, "Rectangle", { fill: "lightgray", stroke: null }),
    gojs(go.Panel, "Vertical",
      {
        defaultAlignment: go.Spot.Left,  // Alineación de los nodos hijos
        defaultStretch: go.GraphObject.Horizontal,  // El tamaño de los nodos hijos se estira horizontalmente
        itemTemplate:
          gojs(go.Panel, "Horizontal",
            gojs(go.Shape, "Rectangle", { width: 12, height: 12, fill: "white" }), // Representación del símbolo en la pila
            gojs(go.TextBlock, { margin: new go.Margin(4, 0, 0, 0), font: "bold 12px sans-serif" }, // Etiqueta con el símbolo
              new go.Binding("text", "key"))
          )
      },
      new go.Binding("itemArray", "stack") // Asociamos el array de elementos de la pila a la propiedad itemArray del panel
    )
  )
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
      console.log(simboloActual, palabra.length)
      // Buscamos una transición para el símbolo actual desde el estado actual
      const transicion = myDiagram.model.linkDataArray.find(
        (t) => t.from === estadoActual && t.text.includes(`${simboloActual},`)
      );
  
      if (!transicion) {
        console.log("existe?")
        // No se encontró una transición válida para el símbolo actual
        return false;
      }
      console.log("sigue?")
      // Realizamos la transición sacando y agregando símbolos a la pila
      const [, sacar, agregar] = transicion.text.split("/");
      if (sacar !== "#") {
        const simboloEnPila = pila.pop();
        console.log("Valor actual de ", simboloEnPila, "y sacar: ",sacar)
        if (simboloEnPila !== sacar) {
          console.log("sigue?2: ", simboloEnPila)
          // El símbolo a sacar de la pila no coincide con el que está en la cima
          return false;
        }
        console.log("sigue?3")
      }
      if (agregar !== "#") {
        const nuevosSimbolos = agregar.split("").reverse();
        pila.push(...nuevosSimbolos);
      }
      console.log("sigue?4")
      // Actualizamos el estado actual
      estadoActual = transicion.to;
    }
  console.log("tam de pila", pila.length)
    // Llegamos al final de la palabra, ahora debemos vaciar la pila
    while (pila.length > 1) {
      const transicion = myDiagram.model.linkDataArray.find(
        (t) => t.from === estadoActual && t.text.includes(`#,`)
      );
      console.log("transicion", transicion)
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
    console.log("")
    // Verificamos si la palabra es palíndroma
    return palabra === palabra.split("").reverse().join("");
  }
  
  
  console.log(validarPalindromoPar("aabbaa")); // true
  
