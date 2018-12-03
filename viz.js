let width = 600,
    height = 600,
    padding = 1.5, 
    maxRadius = 40,
    centerX = (width / 2),
    centerY = (height / 2),
    maxSalary = 350000,
    cluster = true

const labels = [["> $300k", 120], ["> $200k", 220], ["> $150k", 320], ["> $125k", 420], ["$100k", 520]]

const calcRadius = (salary) => {
    return ((salary / maxSalary) * (salary / maxSalary) * maxRadius);
}

const category = d => {
    const salary = parseInt(d.salary_paid)
        if(salary > 300000) {
            return 80
        }
        else if (salary > 200000) {
            return 180
        }
        else if (salary > 150000 ) {
            return 280
        }
        else if (salary > 125000){
            return 380
        } 
        else {
            return 500
        }
}

var nodeData = data.map(itm => {
    return {radius: calcRadius(parseInt(itm.salary_paid)), ...itm}
})


let svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

const createCircles = () => { 
    svg.selectAll('circle')
        .data(nodeData)
        .enter()
        .append('circle')
        .attr('x', centerX)
        .attr('y', centerY)
        .attr('r', d => d.radius)
        .style("fill", "green")
}

const clearSVG = () => {
    svg.selectAll("*").remove()
}

const groupForce = () => {
    clearSVG()
    createCircles()

    var g = svg.append("g")

    labels.forEach(label => {
        g.append("svg:text")
        .attr("x", 70)
        .attr("y", label[1])
        .style("text-anchor", "end")
        .text(label[0])

        g.append("line")
        .attr("x1", 80)
        .attr("y1", label[1])
        .attr("x2", 600)
        .attr("y2", label[1])
        .attr("stroke", "black")
    });

    d3.forceSimulation(nodeData)
        .force('charge', d3.forceManyBody().strength(1))
        .force('center', d3.forceCenter(centerX, centerY+120))
        .force('y', d3.forceY().y(category))
        .force('collision', d3.forceCollide().radius(d => d.radius + padding).iterations(5))
        .on('tick', onTick)
        .on('end', () => input.disabled = false)
}

const clusterForce = () => {
    clearSVG()
    createCircles()

    d3.forceSimulation(nodeData)
        .force('charge', d3.forceManyBody().strength(1))
        .force('y', d3.forceY().y(centerY).strength(0.1))
        .force('x', d3.forceX().x(centerX).strength(0.1))
        .force('center', d3.forceCenter(centerX, centerY))
        .force('collision', d3.forceCollide().radius(d => d.radius + padding).iterations(5))
        .on('tick', onTick)
        .on('end', () => input.disabled = false)
}

const onTick = () => {
    svg.selectAll('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);
}

const switchViz = () => {

    input.disabled = true;

    if (cluster) {
        groupForce()
    } else {
        clusterForce()
    }

    cluster = !cluster
}

const input = document.querySelector("input")
input.addEventListener("click", switchViz, true)

clusterForce()