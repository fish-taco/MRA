// https://observablehq.com/@mootari/embedding-fonts-into-an-svg@171
import define1 from "./576f8943dbfbd395@114.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`
# Embedding Fonts Into An SVG

This notebook demonstrates how to embed fonts (or other external resources) into an SVG.  
Note that this example uses a TrueType font to maximize compatibility. If you only want to rasterize the SVG inside the browser then WOFF/WOFF 2.0 will work just as well.
`
)});
  main.variable(observer("svg_embed")).define("svg_embed", ["svg","toDataURL"], async function(svg,toDataURL){return(
svg`<svg width=300 height=200 xmlns="http://www.w3.org/2000/svg">
  <style>
    @font-face {
      font-family: 'Pacifico';
      font-style: normal;
      font-weight: 400;
      src: url(${await toDataURL('https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6M-Bp0u-.woff')}) format('woff'), url(${await toDataURL('https://rawcdn.githack.com/google/fonts/e9c0bd/ofl/pacifico/Pacifico-Regular.ttf')}) format('truetype');
    }
    rect { fill: lightsalmon }
    text {
      font-size: 40px;
      font-family: Pacifico;
      fill: black;
    }
  </style>
  <rect x=0 y=0 width=300 height=200 />
  <text x=35 y=100>Well, hello!</text>
</svg>
`
)});
  main.variable(observer()).define(["html","DOM","serialize","svg_embed","rasterize"], function(html,DOM,serialize,svg_embed,rasterize){return(
html`
  ${DOM.download(serialize(svg_embed), 'image.svg', 'Download as SVG')}
  ${DOM.download(rasterize(svg_embed), 'image.png', 'Download as PNG')}
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
---
## Compatibility

If you plan to edit the downloaded SVG be aware that many applications do not support <code>@font-face</code> declarations (some may not even support CSS at all). When in doubt use a [web based SVG editor](https://mediatemple.net/blog/tips/browser-based-svg-editors/).
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("toDataURL")).define("toDataURL", function(){return(
async function toDataURL(url) {
  return new Promise(async(resolve, reject) => {
    const res = await fetch(url);
    if(!res.ok) return reject(`Error: ${res.status} ${res.statusText}`);
    const blob = await res.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
  });
}
)});
  const child1 = runtime.module(define1);
  main.import("serialize", child1);
  main.import("rasterize", child1);
  return main;
}
