var myDiagram = new go.Diagram("myDiagramDiv")
var gojs = go.GraphObject.make;

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "p" },
      { key: "q" },
      { key: "r" }
    ],
    [
      { from: "p", to: "p" },
      { from: "p", to: "q" },
      { from: "q", to: "q" },
      { from: "q", to: "r" }
    ]
  );

  myDiagram.nodeTemplate =
  gojs(go.Node, "Auto",
    gojs(go.Shape, "Circle", { fill: "#33FFDD" }),
    gojs(go.TextBlock, { margin: 8 }, new go.Binding("text", "key"))

    // Dibujar el nodo de aceptacion
    
    /*gojs(go.Shape, "Circle", { width: 20, height: 20, fill: "white", strokeWidth: 2 },
      new go.Binding("visible", "", function(data) {
        return data.key === "r";  // mostrar solo en el nodo r
      })),
      /*gojs(go.Shape, "Circle", { width: 16, height: 16, fill: "green" },
      new go.Binding("visible", "", function(data) {
        return data.key === "r";  // mostrar solo en el nodo r
      }))*/
  );

  myDiagram.linkTemplate =
  gojs(go.Link,
    gojs(go.Shape),
    gojs(go.Shape, { toArrow: "Standard"}),
    gojs(go.TextBlock, { segmentOffset: new go.Point(0, -10), segmentIndex: 5 },
      new go.Binding("text", "", function(data) {
        if (data.from === "p" && data.to === "p") return "b, b/bb";
        
        if (data.from === "p" && data.to === "q") return "b, b/$";

        if (data.from === "q" && data.to === "q") return "b, b/$";

        if (data.from === "q" && data.to === "r") return "$, #/#";

      }))
  );