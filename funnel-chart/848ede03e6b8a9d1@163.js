// https://observablehq.com/@leonelgalan/embedding-fonts-into-an-svg@163
import define1 from "./576f8943dbfbd395@114.js";
import define2 from "./51d2d5aac86ca4c0@171.js";
import define3 from "./55bed46f68a80641@366.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`
# Embedding Fonts Into An SVG

Helper function written on top of [@mootari/embedding-fonts-into-an-svg](https://observablehq.com/@mootari/embedding-fonts-into-an-svg) with Google Fonts in mind:

## Signature

\`\`\`javascript
async function addWebFont(selection, fontName, fontURL, fontType = 'woff2')
\`\`\`

## Example:

\`\`\`javascript
// From https://fonts.googleapis.com/css?family=Pacifico, pick the url under /* latin */
selection.call(addWebFont, 'Pacifico', 'https://fonts.gstatic.com/s/pacifico/v13/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2');
\`\`\`
`
)});
  main.variable(observer("addWebFont")).define("addWebFont", ["toDataURL"], function(toDataURL){return(
async function addWebFont(selection, fontName, fontURL, fontType = 'woff2') {
  const fontData = await toDataURL(fontURL);
  return selection.append('style').text(`
    @font-face {
      font-family: '${fontName}';
      src: url(${fontData}) format('${fontType}');
    }
  `);
}
)});
  main.variable(observer()).define(["DOM","rasterize","chart"], function(DOM,rasterize,chart){return(
DOM.download(() => rasterize(chart), undefined, "Save as PNG")
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","addWebFont"], function(d3,DOM,addWebFont)
{
  const width = 600;
  const height = 400;
  const svg = d3.select(DOM.svg(width, height));
  
  svg.append('text')
    // From https://fonts.googleapis.com/css?family=Pacifico, pick the url under `/* latin */`
    .call(addWebFont, 'Pacifico', 'https://fonts.gstatic.com/s/pacifico/v13/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2')
    .attr('style', "font-size: 175px; font-family: 'Pacifico';")
    .text('Pacifico')
    .attr('x', width / 2)
    .attr('y', height / 2)
    .attr('dominant-baseline', 'middle')
    .attr('text-anchor', 'middle');
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
## Setup
`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('https://d3js.org/d3.v5.min.js')
)});
  const child1 = runtime.module(define1);
  main.import("rasterize", child1);
  const child2 = runtime.module(define2);
  main.import("toDataURL", child2);
  const child3 = runtime.module(define3);
  main.import("getMetadata", child3);
  main.variable(observer()).define(["md"], function(md){return(
md `
## "Backup"
`
)});
  main.variable(observer("latestVersion")).define("latestVersion", ["getMetadata"], async function(getMetadata)
{
  const metaData = await getMetadata('@mootari/embedding-fonts-into-an-svg')
  return +metaData.version;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### \`toDataURL\` source as of **@171**

\`\`\`javascript
async function toDataURL(url) {
  return new Promise(async(resolve, reject) => {
    const res = await fetch(url);
    if(!res.ok) return reject(\`Error: \${res.status} \${res.statusText}\`);
    const blob = await res.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
  });
}
\`\`\`
`
)});
  return main;
}
