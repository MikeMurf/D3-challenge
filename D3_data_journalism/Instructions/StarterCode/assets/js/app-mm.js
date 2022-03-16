var svgWidth = 960;
var svgHeight = 625;

var margin = {top: 20, right: 40, bottom: 100, left: 100};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter") // insert chart to tag id "scatter"
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g") 
	.attr("height", height)
	.attr("width", width)
	.attr("transform", `translate(${margin.left}, ${margin.top})`);
	
// initial parameters
var xProperty = "poverty";
var yProperty = "obesity";

// update x-scale function 
function xScale(data, xProperty) {
	// create scale
	var xLinearScale = d3.scaleLinear()
	.domain([d3.min(data, d => d[xProperty]) * 0.8,
	d3.max(data, d => d[xProperty]) * 1.2
	])
	.range([0, width]);
	return xLinearScale;
}

// function to update y-scale var when axis label clicked
function yScale(data, yProperty) {
	// create scale
	var yLinearScale = d3.scaleLinear()
	.domain([d3.min(data, d => d[yProperty]) * 0.8,
	d3.max(data, d => d[yProperty]) * 1.1
	])
	.range([height, 0]);
	return yLinearScale;
}

// function to update x-axis var when x-axis label clicked 
function renderXAxis(newXScale, xAxis) {
	var bottomAxis = d3.axisBottom(newXScale);
	xAxis.transition()
	.duration(1000)
	.call(bottomAxis);
	return xAxis;
}

	// function to update y-axis var when y-axis label clicked
function renderyAxis(newYScale, yAxis) {
	var leftAxis = d3.axisLeft(newYScale); 
	yAxis.transition()
	.duration(1000)
	.call(leftAxis);
	return yAxis;
}

// Function to render circles group with a transition
// to new circles
function renderCircles(circlesGroup, newXScale, xProperty, newYScale, yProperty) {
	circlesGroup.transition()
	.duration(1000)
	.attr("cx", d => newXScale(d[xProperty]))
	.attr("cy", d => newYScale(d[yProperty]));
	return circlesGroup;
}

// Function to render circles text
function renderText(circleText, newXScale, xProperty, newYScale, yProperty) {
	circleText.transition()
	.duration(1000)
	.attr("x", d => newXScale(d[xProperty]))
	.attr("y", d => newYScale(d[yProperty]));
	return circleText;
}

// function to update circles group with new tooltip
function updateToolTip(xProperty,yProperty, circlesGroup) {
	console.log("update tool tip", xProperty);
	var label;
	
	// set x and y axis label on tooltip based on selection
	if (xProperty === "poverty") {
	label = "Poverty:";
	}
	else if (xProperty === "age") {
	label = "Age:";
	}
	else {
	label = "Household Income:";
	}
	
	if (yProperty === "obesity") {
	ylabel = "Obesity:";
	}
	else if (yProperty === "smokes") {
	ylabel = "Smokes:";
	}
	else {
	ylabel = "Lacks Healthcare:";
	}

	// Initialise tooltip
	var toolTip = d3.tip()
	.attr("class", "d3-tip")
	.offset([80, -60])
	.html(function (d) {
			if (xProperty === "poverty") {
			return (`${d.state}<br>${label} ${d[xProperty]}%<br>${ylabel} ${d[yProperty]}%`); 
			}
			else
			return (`${d.state}<br>${label} ${d[xProperty]}<br>${ylabel} ${d[yProperty]}%`);
	});

	// Display tooltip on click
	circlesGroup.call(toolTip);
	circlesGroup.on("mouseover", function (data) {
	toolTip.show(data,this);
	})
	// Hide tooltip on mouseout
	.on("mouseout", function (data, index) {
		toolTip.hide(data,this);
	});
	return circlesGroup;
}

	// Load data from csv file
	d3.csv("assets/data/data.csv").then(function (data) {

	// Parse data
	data.forEach(d => {
	d.poverty = +d.poverty;
	d.healthcare = +d.healthcare;
	d.age = +d.age;
	d.income = +d.income;
	d.obese = + d.obese;
	d.smokes = +d.smokes
});

	// LinearScale functions 
	var xLinearScale = xScale(data, xProperty);
	var yLinearScale = yScale(data, yProperty);
	
	// Create axis functions
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	// Append x-axis
	var xAxis = chartGroup.append("g")
	.classed("x-axis", true)
	.attr("transform", `translate(0, ${height})`)
	.call(bottomAxis);

	// Append y-axis
	chartGroup.append("g")
	.call(leftAxis); 

	// Append initial circles
	var circlesGroup = chartGroup.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", d => xLinearScale(d[xProperty])) 
	.attr("cy", d => yLinearScale(d[yProperty])) 
	.attr("r", "15")
	.attr("fill", "blue") 
	.attr("opacity", ".5");

	// Create group for x-axis labels
	var labelsGroup = chartGroup.append("g")
	.attr("transform", `translate(${width / 2}, ${height + 20})`);

	var povertyLabel = labelsGroup.append("text")
	.attr("x", 0)
	.attr("y", 15)
	.attr("value", "poverty")
	.classed("active", true)
	.text("In Poverty %");

	var incomeLabel = labelsGroup.append("text")
	.attr("x", 0)
	.attr("y", 30)
	.attr("value", "income")
	.classed("inactive", true)
	.text("Household Income (Median)");

	var ageLabel = labelsGroup.append("text")
	.attr("x", 0)
	.attr("y", 45)
	.attr("value", "age") 
	.classed("inactive", true)
	.text("Age (Median)");  

	var obesityLabel = labelsGroup.append("text")
	.attr("transform","rotate(-90)")
	.attr("x", (margin.left) * 2.5)
	.attr("y", 0 - (height -60))
	.attr("value", "obesity") 
	.classed("active", true)
	.text("Obesity (%)");

	var smokesLabel = labelsGroup.append("text")
	.attr("transform","rotate(-90)")
	.attr("x", (margin.left) * 2.5)
	.attr("y", 0 - (height -40))
	.attr("value", "smokes") 
	.classed("inactive", true)
	.text("Smokes (%)");

	var healthcareLabel = labelsGroup.append("text")
	.attr("transform","rotate(-90)")
	.attr("x", (margin.left) * 2.5)
	.attr("y", 0 - (height -20))
	.attr("value", "healthcare") 
	.classed("inactive", true)
	.text("Lacks Healthcare (%)");  

	//  add text to Circle
	var circleText = chartGroup.selectAll()
	.data(data)
	.enter()
	.append("text")
	.text(d => d.abbr)
	.attr("x", d => xLinearScale(d[xProperty])) 
	.attr("y", d => yLinearScale(d[yProperty])) 
	.attr("class", "stateText") 
	.attr("font-size", "9");

	// updateToolTip function above csv import
	var circlesGroup = updateToolTip(xProperty, yProperty,circlesGroup);

	// x axis labels event listener
	labelsGroup.selectAll("text")
	.on("click", function () { 
		// get value of selection
		var value = d3.select(this).attr("value");

		if(true){   
		if (value == "poverty" || value=="income" || value=="age") { 
		console.log(value)
		// replace x-property with value
		xProperty = value;
		
		xLinearScale = xScale(data, xProperty);

		// update x-axis with transition
		xAxis = renderXAxis(xLinearScale, xAxis);
		
		// change classes to change bold text
		if (xProperty === "income") {
			incomeLabel
			.classed("active", true)
			.classed("inactive", false);
			povertyLabel
			.classed("active", false)
			.classed("inactive", true);
			ageLabel
			.classed("active", false)
			.classed("inactive", true); 
		}
		else if(xProperty == "age"){
			ageLabel
			.classed("active", true)
			.classed("inactive", false);  
			povertyLabel
			.classed("active", false)
			.classed("inactive", true);
			incomeLabel
			.classed("active", false)
			.classed("inactive", true);
		}
		else {
			povertyLabel
			.classed("active", true)
			.classed("inactive", false);
			incomeLabel
			.classed("active", false)
			.classed("inactive", true);
			ageLabel
			.classed("active", false)
			.classed("inactive", true); 
		}

		} 
		else
			
		// replace y-property with value
		yProperty = value;
		yLinearScale = yScale(data, yProperty);
				
		// change classes to change bold text
		if (yProperty === "obesity") {
			obesityLabel
			.classed("active", true)
			.classed("inactive", false);
			healthcareLabel
			.classed("active", false)
			.classed("inactive", true);
			smokesLabel
			.classed("active", false)
			.classed("inactive", true); 
		}
		else if(yProperty == "healthcare"){
			healthcareLabel
			.classed("active", true)
			.classed("inactive", false);  
			obesityLabel
			.classed("active", false)
			.classed("inactive", true);
			smokesLabel
			.classed("active", false)
			.classed("inactive", true);

		}
		else {
			smokesLabel
			.classed("active", true)
			.classed("inactive", false);
			healthcareLabel
			.classed("active", false)
			.classed("inactive", true);
			obesityLabel
			.classed("active", false)
			.classed("inactive", true); 
		}
	
		// update circles with new values
		circlesGroup = renderCircles(circlesGroup, xLinearScale, xProperty, yLinearScale, yProperty);
		//  update circle text
		circleText = renderText(circleText, xLinearScale, xProperty, yLinearScale, yProperty); 

		// update tooltips with new values
		circlesGroup = updateToolTip(xProperty, yProperty, circlesGroup);

	} 
	
	}); 

}).catch(function (error) {
	console.log(error);
});

