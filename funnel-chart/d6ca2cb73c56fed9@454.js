// https://observablehq.com/@leonelgalan/funnel-chart@454
import define1 from "./848ede03e6b8a9d1@163.js";
import define2 from "./2f5bc64de12c3563@867.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Funnel Chart

A D3 clone of [FunnelGraph.js](https://github.com/greghub/funnel-graph-js)`
)});
  main.variable(observer("viewof background")).define("viewof background", ["colorPicker","pickrOptions"], function(colorPicker,pickrOptions){return(
colorPicker('#393961', undefined, pickrOptions)
)});
  main.variable(observer("background")).define("background", ["Generators", "viewof background"], (G, _) => G.input(_));
  main.variable(observer("viewof gradient1")).define("viewof gradient1", ["colorPicker","pickrOptions"], function(colorPicker,pickrOptions){return(
colorPicker('#FEAF7F', undefined, pickrOptions)
)});
  main.variable(observer("gradient1")).define("gradient1", ["Generators", "viewof gradient1"], (G, _) => G.input(_));
  main.variable(observer("viewof gradient2")).define("viewof gradient2", ["colorPicker","pickrOptions"], function(colorPicker,pickrOptions){return(
colorPicker('#FD4290', undefined, pickrOptions)
)});
  main.variable(observer("gradient2")).define("gradient2", ["Generators", "viewof gradient2"], (G, _) => G.input(_));
  main.variable(observer("viewof labels")).define("viewof labels", ["colorPicker","pickrOptions"], function(colorPicker,pickrOptions){return(
colorPicker('#32FDAE', undefined, pickrOptions)
)});
  main.variable(observer("labels")).define("labels", ["Generators", "viewof labels"], (G, _) => G.input(_));
  main.variable(observer("viewof values")).define("viewof values", ["colorPicker","pickrOptions"], function(colorPicker,pickrOptions){return(
colorPicker('#FFFFFF', undefined, pickrOptions)
)});
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer("viewof percentages")).define("viewof percentages", ["colorPicker","pickrOptions"], function(colorPicker,pickrOptions){return(
colorPicker('#9B9AE0', undefined, pickrOptions)
)});
  main.variable(observer("percentages")).define("percentages", ["Generators", "viewof percentages"], (G, _) => G.input(_));
  main.variable(observer("viewof ledge")).define("viewof ledge", ["html"], function(html){return(
html `<input type="range" min="0", max="0.2" step="0.01" value="0.1"/>`
)});
  main.variable(observer("ledge")).define("ledge", ["Generators", "viewof ledge"], (G, _) => G.input(_));
  main.variable(observer("curve")).define("curve", ["d3"], function(d3){return(
d3.curveCatmullRom.alpha(0.999999999)
)});
  main.variable(observer("data2")).define("data2", ["data","ledge"], function(data,ledge)
{
  const result = [];
  data.forEach((point, index) => {
    const { step, value } = point;
    if (index !== 0) {
      result.push({ step: step - ledge, value });
    }
    result.push(point);
    if (index !== data.length - 1) {
      result.push({ step: step + ledge, value });
    } else {
      result.push({ step: step + 1, value });
    }
  })
  return result;
}
);
  main.variable(observer("chart")).define("chart", ["d3","width","height","addWebFont","background","x","gradient1","gradient2","data2","area","areaMirror","data","values","labels","percentages"], function(d3,width,height,addWebFont,background,x,gradient1,gradient2,data2,area,areaMirror,data,values,labels,percentages)
{
  const svg = d3.create('svg')
      .attr('viewBox', [0, 0, width, height])
      .call(addWebFont, 'Lato', 'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2')
      .call(addWebFont, 'Lato-Bold', 'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2')
      .attr('style', `
        background-color: ${background};
        font-family: 'Lato';
      `);
  
  svg.append('linearGradient')
    .attr('id', 'temperature-gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', x(1)).attr('y1', 0)
    .attr('x2', x(3)).attr('y2', 0)
    .selectAll('stop')
      .data([
        {offset: '0%', color: gradient1 },
        {offset: '100%', color: gradient2 },
      ])
    .enter().append('stop')
      .attr('offset', function(d) { return d.offset; })
      .attr('stop-color', function(d) { return d.color; });
  
  svg.append('path')
      .datum(data2)
      .attr('fill', 'url(#temperature-gradient)')
      .attr('d', area);
  
  svg.append('path')
    .datum(data2)
    .attr('fill', 'url(#temperature-gradient)')
    .attr('d', areaMirror);

  svg.selectAll('.values')
    .data(data)
    .enter()
    .append('text')
      .attr('class', 'values')
      .attr('x', ({ step }) => x(step) + 10)
      .attr('y', 30)
      .text(({ value }) => d3.format(',')(value))
      .attr('style', `
        fill: ${values};
        font-size: 22px;
      `);
  
  svg.selectAll('.labels')
    .data(data)
    .enter()
    .append('text')
      .attr('class', 'labels')
      .attr('x', ({ step }) => x(step) + 10)
      .attr('y', 50)
      .text(({ label }) => label)
      .attr('style', `
          fill: ${labels};
          font-family: 'Lato-Bold';
          font-size: 14px;
      `);
  
  svg.selectAll('.percentages')
    .data(data)
    .enter()
    .append('text')
      .attr('class', 'percentages')
      .attr('x', ({ step }) => x(step) + 10)
      .attr('y', 70)
      .text(({ value }, index) => index === 0 ? '' : d3.format('.1%')(value / data[0].value))
      .attr('style', `
          fill: ${percentages};
          font-size: 18px;
      `);
      
  svg.selectAll('line')
    .data(d3.range(2, data.length + 1))
    .enter()
    .append('line')
      .attr('x1', value => x(value))
      .attr('y1', 10)
      .attr('x2', value => x(value))
      .attr('y2', height - 30)
      .style('stroke-width', 1)
      .style('stroke', percentages)
      .style('fill', 'none');
  
  return svg.node();
}
);
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 30, left: 30}
)});
  main.variable(observer("x")).define("x", ["d3","data2","margin","width"], function(d3,data2,margin,width){return(
d3.scaleUtc()
    .domain(d3.extent(data2, ({step}) => step))
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([-d3.max(data, ({value}) => value), d3.max(data, ({value}) => value)]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("area")).define("area", ["d3","curve","x","y"], function(d3,curve,x,y){return(
d3.area()
    .curve(curve)
    .x(({step}) => x(step))
    .y0(y(0))
    .y1(({value}) => y(value))
)});
  main.variable(observer("areaMirror")).define("areaMirror", ["d3","curve","x","y"], function(d3,curve,x,y){return(
d3.area()
    .curve(curve)
    .x(({step}) => x(step))
    .y0(y(0))
    .y1(({value}) => y(-value))
)});
  main.variable(observer("data")).define("data", function(){return(
[
  {step: 1, value: 50130, label: 'All M Users'},
  {step: 2, value: 6724, label: 'Clicked Upgrade'},
  {step: 3, value: 6385, label: 'Viewed Pricing'},
  {step: 4, value: 1258, label: 'Payment Details'},
  {step: 5, value: 301, label: 'Subscribers'},
  {step: 6, value: 301, label: 'Subscribed Teams'},
]
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@^5.9')
)});
  const child1 = runtime.module(define1);
  main.import("addWebFont", child1);
  main.variable(observer("pickrOptions")).define("pickrOptions", function(){return(
{ components: { preview: false, opacity: true, hue: true, interaction: { input: true, save: true }}}
)});
  const child2 = runtime.module(define2);
  main.import("colorPicker", child2);
  return main;
}
