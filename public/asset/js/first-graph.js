
import axios from "axios";
const slider = document.getElementById("slider-first-graph")
const svgContainer = document.getElementById("first-graph")

// set the dimensions and margins of the graph
let margin = { top: 10, right: 30, bottom: 30, left: 60 }
let width = 800 - margin.left - margin.right
let height = 400 - margin.top - margin.bottom


const generateFirstGraph = (data) => {
    // append the svg object to the body of the page
    let svg = d3.select("#first-graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 13000])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 60])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => { return x(d.budjet); })
        .attr("cy", (d) => { return y(d.medals); })
        .attr("r", 10)
        .style("fill", "#69b3a2")



}



(async () => {
    console.log(slider.value)

    const { data } = await axios.get(process.env.VPS + '/medals-and-budjet?year=' + slider.value)
    generateFirstGraph(data)

    slider.addEventListener("mouseup", async () => {
        const svg = svgContainer.children[0]

        if (svgContainer.children.length > 0) svg.remove()
        console.log('svg:', svg)

        const { data } = await axios.get(process.env.VPS + '/medals-and-budjet?year=' + slider.value)
        generateFirstGraph(data)
    })
})()