<template>
  <div>
     <div class="container">
      <div :id="myPaletteDiv"
            style="width: 200px; height: 500px; margin-right: 2px; background-color: whitesmoke; border: 1px solid black; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;">
            <canvas tabindex="0" width="98" height="748"
                style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; width: 200px; height: 500px; cursor: auto;">This
                text is displayed if your browser does not support the Canvas HTML element.</canvas>
            <div style="position: absolute; overflow: auto; width: 98px; height: 748px; z-index: 1;">
                <div style="position: absolute; width: 1px; height: 1px;"></div>
            </div>
        </div>
        <div :id="diagram" :style="style"></div>
    </div>
     <div :style="style">{{myDiagramInfo}}</div>
  </div>
</template>
<script>
let G='';
let go = '';
export default {
  name:'diagram',
  data() {
    return {
      diagram:'myDiagramDiv',
      myPaletteDiv: 'myPaletteDiv',
      myDiagram: '',
      myDiagramInfo:'',
      style: {
        height:'500px',
        border:'1px solid red'
      }
    }
  },
  created() {
    G = this.$go.GraphObject.make;
    go = this.$go;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
       this.myDiagram =
                G(go.Diagram, this.diagram,  // must name or refer to the DIV HTML element
                    {
                      "LinkDrawn": this.showLinkLabel,  // this DiagramEvent listener is defined below
                      "LinkRelinked": this.showLinkLabel,
                      "undoManager.isEnabled": true,  // enable undo & redo
                      "grid.visible": true,
                      "commandHandler.copiesTree": false,  // 禁用复制快捷键
                      "commandHandler.deletesTree": false, // 禁用删除快捷键
                      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //启用视图放大缩小
                      allowLink: true,//是否允许拖拽连线
                      allowRelink: true,//是否允许重新连线
                      padding: 10,
                      layout: G(go.LayeredDigraphLayout,{
                        direction: 0,
                        layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
                        })//0向右，90向下，180向左，270向上。默认值是0
                    });

     this.myDiagram.nodeTemplateMap.add("",  // the default category
                G(go.Node, "Table", this.nodeStyle(),
                { selectionChanged: this.nodeSelectionChanged },
                    // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                    G(go.Panel, "Auto",
                        G(go.Shape, "Rectangle",
                            { fill: "#00A9C9", strokeWidth: 0 },
                            new go.Binding("figure", "figure")),
                        G(go.TextBlock, this.textStyle(),
                            {
                                margin: 8,
                                maxSize: new go.Size(160, NaN),
                                wrap: go.TextBlock.WrapFit,
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    ),
                    // four named ports, one on each side:
                    this.makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
                    this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
                    this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
                ));
     this.myDiagram.nodeTemplateMap.add("Conditional",
                G(go.Node, "Table", this.nodeStyle(),
                { selectionChanged: this.nodeSelectionChanged },
                    // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                    G(go.Panel, "Auto",
                        G(go.Shape, "Diamond",
                            { fill: "#00A9C9", strokeWidth: 0 },
                            new go.Binding("figure", "figure")),
                        G(go.TextBlock, this.textStyle(),
                            {
                                margin: 8,
                                maxSize: new go.Size(160, NaN),
                                wrap: go.TextBlock.WrapFit,
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    ),
                    // four named ports, one on each side:
                    this.makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.Left, true, true),
                    this.makePort("R", go.Spot.Right, go.Spot.Right, true, true),
                    this.makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
                ));
    this.myDiagram.nodeTemplateMap.add("Start",
                G(go.Node, "Table", this.nodeStyle(),
                { selectionChanged: this.nodeSelectionChanged },
                    G(go.Panel, "Auto",
                        G(go.Shape, "Circle",
                            { minSize: new go.Size(40, 40), fill: "#79C900", strokeWidth: 0 }),
                        G(go.TextBlock, "Start", this.textStyle(),
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the top, all output only:
                    this.makePort("L", go.Spot.Left, go.Spot.Left, true, false),
                    this.makePort("R", go.Spot.Right, go.Spot.Right, true, false),
                    this.makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
                ));
    this.myDiagram.nodeTemplateMap.add("End",
                G(go.Node, "Table", this.nodeStyle(),
                { selectionChanged: this.nodeSelectionChanged },
                    G(go.Panel, "Auto",
                        G(go.Shape, "Circle",
                            { minSize: new go.Size(40, 40), fill: "#DC3C00", strokeWidth: 0 }),
                        G(go.TextBlock, "End", this.textStyle(),
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the bottom, all input only:
                    this.makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.Left, false, true),
                    this.makePort("R", go.Spot.Right, go.Spot.Right, false, true)
                ));

            this.myDiagram.nodeTemplateMap.add("wyatt",
                G(go.Node, "Table", this.nodeStyle(),
                    { selectionChanged: this.nodeSelectionChanged },
                    G(go.Panel, "Auto",
                        G(go.Shape, "TriangleUp",
                            { minSize: new go.Size(40, 40), fill: "#4185E6", strokeWidth: 0 }),
                        G(go.TextBlock, "wyatt", this.textStyle(),
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the bottom, all input only:
                    this.makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.Left, false, true),
                    this.makePort("R", go.Spot.Right, go.Spot.Right, false, true)
                ));


            // taken from ../extensions/Figures.js:
            go.Shape.defineFigureGenerator("File", function (shape, w, h) {
                var geo = new go.Geometry();
                var fig = new go.PathFigure(0, 0, true); // starting point
                geo.add(fig);
                fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
                fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
                fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
                fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
                var fig2 = new go.PathFigure(.75 * w, 0, false);
                geo.add(fig2);
                // The Fold
                fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
                fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
                geo.spot1 = new go.Spot(0, .25);
                geo.spot2 = go.Spot.BottomRight;
                return geo;
            });
            this.myDiagram.nodeTemplateMap.add("Comment",
                G(go.Node, "Auto", this.nodeStyle(),
                { selectionChanged: this.nodeSelectionChanged },
                    G(go.Shape, "File",
                        { fill: "#DEE0A3", strokeWidth: 0 }),
                    G(go.TextBlock, this.textStyle(),
                        {
                            margin: 5,
                            maxSize: new go.Size(200, NaN),
                            wrap: go.TextBlock.WrapFit,
                            textAlign: "center",
                            editable: true,
                            font: "bold 12pt Helvetica, Arial, sans-serif",
                            stroke: '#454545'
                        },
                        new go.Binding("text").makeTwoWay())
                    // no ports, because no links are allowed to connect with a comment
                ));
            // replace the default Link template in the linkTemplateMap
            this.myDiagram.linkTemplate =
                G(go.Link,  // the whole link panel
                    {
                        routing: go.Link.AvoidsNodes,
                        curve: go.Link.JumpOver,
                        corner: 20,
                        toShortLength: 4,
                        relinkableFrom: true,
                        relinkableTo: true,
                        reshapable: true,
                        resegmentable: true,
                        // mouse-overs subtly highlight links:
                        mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
                        mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
                        selectionAdorned: false
                    },
                    new go.Binding("points").makeTwoWay(),
                    G(go.Shape,  // the highlight shape, normally transparent
                        { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
                    G(go.Shape,  // the link path shape
                        { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
                        new go.Binding("stroke", "isSelected", function (sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
                    G(go.Shape,  // the arrowhead
                        { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
                    G(go.Panel, "Auto",  // the link label, normally not visible
                        { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
                        new go.Binding("visible", "visible").makeTwoWay(),
                        G(go.Shape, "RoundedRectangle",  // the label shape
                            { fill: "#F8F8F8", strokeWidth: 0 }),
                        G(go.TextBlock, "Yes",  // the label
                            {
                                textAlign: "center",
                                font: "10pt helvetica, arial, sans-serif",
                                stroke: "#333333",
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    ),
                    G(go.TextBlock, new go.Binding('text', 'wyatt'))
                );
               this.myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
               this.myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

                G(go.Palette, this.myPaletteDiv,  // must name or refer to the DIV HTML element
                    {
                        nodeTemplateMap: this.myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
                        model: new go.GraphLinksModel([  // specify the contents of the Palette
                            { category: "Start", text: "Start" },
                            { text: "Step" },
                            { category: "Conditional", text: "判断条件" },
                            { category: "End", text: "End" },
                            { category: "Comment", text: "评论注释" },
                            { category: "wyatt", text: "wyatt" }
                        ])
                    });
    },
    makePort(name, align, spot, output, input) {
        var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
        // the port is basically just a transparent rectangle that stretches along the side of the node,
        // and becomes colored when the mouse passes over it
        return G(go.Shape,
            {
                fill: "transparent",  // changed to a color in the mouseEnter event handler
                strokeWidth: 0,  // no stroke
                width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
                height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
                alignment: align,  // align the port on the main Shape
                stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
                portId: name,  // declare this object to be a "port"
                fromSpot: spot,  // declare where links may connect at this port
                fromLinkable: output,  // declare whether the user may draw links from here
                toSpot: spot,  // declare where links may connect at this port
                toLinkable: input,  // declare whether the user may draw links to here
                cursor: "pointer",  // show a different cursor to indicate potential link point
                mouseEnter: function (e, port) {  // the PORT argument will be this Shape
                    if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
                },
                mouseLeave: function (e, port) {
                    port.fill = "transparent";
                }
            });
    },
    textStyle () {
        return {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            stroke: "whitesmoke"
        }
    },
    nodeStyle () {
        return [
            // The Node.location comes from the "loc" property of the node data,
            // converted by the Point.parse static method.
            // If the Node.location is changed, it updates the "loc" property of the node data,
            // converting back using the Point.stringify static method.
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                // the Node.location is at the center of each node
                locationSpot: go.Spot.Center
            }
        ];
    },
    nodeSelectionChanged (node) {
        if (node.isSelected) {//
            //节点选中执行的内容
            window.console.log(node.data);//节点的属性信息
            window.console.log(node.data.key);//拿到节点的Key,拿其他属性类似
            this.myDiagramInfo = JSON.stringify(node.data);
            // let node1 = this.myDiagram.model.findNodeDataForKey(node.data.key);
            // this.myDiagram.model.setDataProperty(node1, "fill", "#ededed");
        } else {
            //节点取消选中执行的内容
            // let node2 = this.myDiagram.model.findNodeDataForKey(node.data.key);
            // this.myDiagram.model.setDataProperty(node2, 'fill', "1F4963 ");
        }
    },
    showLinkLabel (e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
    }
  }
}
</script>
<style lang="scss">
.container {
  display: flex;

  >div:nth-last-child(1) {
    flex: 1;
  }
}
canvas{border:0px;outline:none;}
</style>
