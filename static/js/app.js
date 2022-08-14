const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use d3 to load the data and select the names for the dropdown list. Structure take from--> https://www.geeksforgeeks.org/d3-js-selection-enter-function/
d3.json(url).then(function(data) {
    d3.select("#selDataset")
    .selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
    .text((data) => {
        return data;
    });
    
});

