
const width = 960;
const height = 600;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

Promise.all([
  d3.json("data/states-albers-10m.json"),
  d3.json("data/treemap_witness_by_state.json")
]).then(([us, sightings]) => {
  const path = d3.geoPath();

  const stateData = new Map(sightings.children.map(d => [d.name, d.value]));
  const maxValue = d3.max(sightings.children, d => d.value);

  const color = d3.scaleSequential([0, maxValue], d3.interpolateReds);

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
    .attr("fill", d => color(stateData.get(d.properties.name) || 0))
    .attr("d", path)
    .append("title")
    .text(d => `${d.properties.name}: ${stateData.get(d.properties.name) || 0}`);
});
