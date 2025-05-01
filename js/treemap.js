
const width = 960;
const height = 600;

const svg = d3.select("#treemap")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("data/treemap_witness_by_state.json").then(data => {
  const root = d3.hierarchy(data).sum(d => d.value);

  d3.treemap()
    .size([width, height])
    .padding(2)(root);

  const color = d3.scaleSequential([0, d3.max(root.leaves(), d => d.value)], d3.interpolateBlues);

  svg.selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.value));

  svg.selectAll("text")
    .data(root.leaves())
    .join("text")
    .attr("x", d => d.x0 + 5)
    .attr("y", d => d.y0 + 20)
    .text(d => `${d.data.name} (${d.data.value})`)
    .attr("font-size", "12px")
    .attr("fill", "black");
});
