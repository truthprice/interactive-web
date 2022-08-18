const url = "./data/samples.json";

// Use d3 to load the data and select the test subject for the dropdown list. Structure take from--> https://www.geeksforgeeks.org/d3-js-selection-enter-function/
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

// function init() {
//     let data = [{
//       values: [],
//       labels: [],
//       type: "bar"
//     }];
  
//     let layout = {
//       height: 600,
//       width: 800
//     };
  
//     Plotly.newPlot("bar", data, layout);
// }
//Function created to locate data when a test subject is chosen from the dropdown

function optionChanged(value) {
    d3.json(url).then(function(data){
        // console.log(data);
        var samplesData = data.samples;
        // console.log(samplesData);
        var sample_values = [];
        var otu_ids = [];
        var otu_labels = [];
        var otuIdString =[];
        samplesData.forEach(subject => {
            if (subject.id == value) {
                sample_values = subject.sample_values;
                otu_ids = subject.otu_ids;
                otu_labels = subject.otu_labels;
                otu_ids.map(otu =>{
                    otuIdString.push(`OTU ${otu}`);
                });
            }
        });


    var trace = {
        x: sample_values.slice(0, 10).reverse(),
        y: otuIdString.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        orientation: "h",
        type: 'bar'
    }
    

    Plotly.newPlot('bar', [trace]);
    
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids
        }
    }
   
    var layout = {
        xaxis: {
            title: "OTU IDs"
        },
        title: "Bacteria Levels"
    }

    Plotly.newPlot('bubble', [trace2], layout);

    var metaData=data.metadata;
    metaData.forEach(subject => {
        if (subject.id ==value){
            var dem_info = Object.entries(subject);
            d3.selectAll('p').remove();
            d3.select('#sample-metadata')
            .selectAll('p')
            .data(dem_info)
            .enter()
            .append('p')
            .text(demographics=>{
                return `${demographics[0]}: ${demographics[1]}`;
            });
        }
    });

    });

}
// init();

