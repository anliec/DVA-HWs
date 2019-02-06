
var margin = { top: 110, bottom: 250, left: 200, right: 200 }


var w = window.innerWidth - margin.left - margin.right;

var h = window.innerHeight - margin.top - margin.bottom;

//for the rectangles and the legend

var gridSize = Math.floor(700 / 10),
    legend_width = gridSize * 2;

//color buckets!
buckets = 9;
var svg = d3.select("body")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)
    .append("g")
    .attr("class", "season")
    .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");
var color_scheme = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']
var seasons = ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5", "Season 6"]
var color = d3.scale.quantile().range(color_scheme);

var houses = ["Baratheon", "Greyjoy", "Lannister", "Martell", "Stark", "Targaryen", "Tyrell"];
var x = d3.scale.ordinal().rangeRoundBands([0, w]);  // Episode Scale

var y = d3.scale.ordinal().rangeRoundBands([h, 0]);  // House Scale
var nest_data = {};
var new_structure_baratheon_1 = [];
var new_structure_greyjoy_1 = [];
var new_structure_lannister_1 = [];
var new_structure_martell_1 = [];
var new_structure_stark_1 = [];
var new_structure_targaryen_1 = [];
var new_structure_tyrell_1 = [];
var new_structure_all_1 = [];
var new_structure_baratheon_2 = [];
var new_structure_greyjoy_2 = [];
var new_structure_lannister_2 = [];
var new_structure_martell_2 = [];
var new_structure_stark_2 = [];
var new_structure_targaryen_2 = [];
var new_structure_tyrell_2 = [];
var new_structure_all_2 = [];
var new_structure_baratheon_2 = [];
var new_structure_greyjoy_3 = [];
var new_structure_lannister_3 = [];
var new_structure_martell_3 = [];
var new_structure_stark_3 = [];
var new_structure_targaryen_3 = [];
var new_structure_tyrell_3 = [];
var new_structure_all_3 = [];
var new_structure_baratheon_4 = [];
var new_structure_greyjoy_4 = [];
var new_structure_lannister_4 = [];
var new_structure_martell_4 = [];
var new_structure_stark_4 = [];
var new_structure_targaryen_4 = [];
var new_structure_tyrell_4 = [];
var new_structure_all_4 = [];
var new_structure_baratheon_5 = [];
var new_structure_greyjoy_5 = [];
var new_structure_lannister_5 = [];
var new_structure_martell_5 = [];
var new_structure_stark_5 = [];
var new_structure_targaryen_5 = [];
var new_structure_tyrell_5 = [];
var new_structure_all_5 = [];
var new_structure_baratheon_6 = [];
var new_structure_greyjoy_6 = [];
var new_structure_lannister_6 = [];
var new_structure_martell_6 = [];
var new_structure_stark_6 = [];
var new_structure_targaryen_6 = [];
var new_structure_tyrell_6 = [];
var new_structure_all_6 = [];


var create;

d3.csv("heatmap.csv", function (data) {


    //defining the various datasets, it's not pretty at all but it works

    new_structure_baratheon_1 = data.slice(0, 10).map(function (d, i) {
        for (var key in d) {
            if (key == 'Baratheon') {
                return { house: 0, episode: +d.episode, value: +d['Baratheon'] };
            }

        }
    });
    console.log(new_structure_baratheon_1);

    new_structure_greyjoy_1 = data.slice(0, 10).map(function (d, i) {

        for (var key in d) {
            if (key == "Greyjoy") {
                return { house: 1, episode: + d.episode, value: + d["Greyjoy"] };
            }
        }
    });
    console.log(new_structure_greyjoy_1);

    new_structure_lannister_1 = data.slice(0, 10).map(function (d, i) {

        for (var key in d) {
            if (key == "Lannister") {
                return { house: 2, episode: + d.episode, value: + d["Lannister"] };
            }
        }
    });
    console.log(new_structure_lannister_1);
    new_structure_martell_1 = data.slice(0, 10).map(function (d, i) {

        for (var key in d) {
            if (key == "Martell") {
                return { house: 3, episode: + d.episode, value: + d["Martell"] };
            }
        }
    });
    console.log(new_structure_martell_1);
    new_structure_stark_1 = data.slice(0, 10).map(function (d, i) {
        if (i >= 10) {
            return
        }
        for (var key in d) {
            if (key == "Stark") {
                return { house: 4, episode: + d.episode, value: + d["Stark"] };
            }
        }
    });
    console.log(new_structure_stark_1);
    new_structure_targaryen_1 = data.slice(0, 10).map(function (d, i) {

        for (var key in d) {
            if (key == "Targaryen") {
                return { house: 5, episode: + d.episode, value: + d["Targaryen"] };
            }
        }
    });
    console.log(new_structure_targaryen_1);
    new_structure_tyrell_1 = data.slice(0, 10).map(function (d, i) {

        for (var key in d) {
            if (key == "Tyrell") {
                return { house: 6, episode: + d.episode, value: + d["Tyrell"] };
            }
        }
    });
    console.log(new_structure_tyrell_1);
    new_structure_all_1 = new_structure_baratheon_1
        .concat(new_structure_greyjoy_1,
        new_structure_lannister_1,
        new_structure_martell_1,
        new_structure_stark_1,
        new_structure_targaryen_1,
        new_structure_tyrell_1);

    //season 2
    new_structure_baratheon_2 = data.slice(10, 20).map(function (d, i) {
        for (var key in d) {
            if (key == 'Baratheon') {
                return { house: 0, episode: +d.episode, value: +d['Baratheon'] };
            }

        }
    });
    console.log(new_structure_baratheon_2);

    new_structure_greyjoy_2 = data.slice(10, 20).map(function (d, i) {

        for (var key in d) {
            if (key == "Greyjoy") {
                return { house: 1, episode: + d.episode, value: + d["Greyjoy"] };
            }
        }
    });
    console.log(new_structure_greyjoy_2);

    new_structure_lannister_2 = data.slice(10, 20).map(function (d, i) {

        for (var key in d) {
            if (key == "Lannister") {
                return { house: 2, episode: + d.episode, value: + d["Lannister"] };
            }
        }
    });
    console.log(new_structure_lannister_2);
    new_structure_martell_2 = data.slice(10, 20).map(function (d, i) {

        for (var key in d) {
            if (key == "Martell") {
                return { house: 3, episode: + d.episode, value: + d["Martell"] };
            }
        }
    });
    console.log(new_structure_martell_2);
    new_structure_stark_2 = data.slice(10, 20).map(function (d, i) {
        if (i >= 10) {
            return
        }
        for (var key in d) {
            if (key == "Stark") {
                return { house: 4, episode: + d.episode, value: + d["Stark"] };
            }
        }
    });
    console.log(new_structure_stark_2);
    new_structure_targaryen_2 = data.slice(10, 20).map(function (d, i) {

        for (var key in d) {
            if (key == "Targaryen") {
                return { house: 5, episode: + d.episode, value: + d["Targaryen"] };
            }
        }
    });
    console.log(new_structure_targaryen_2);
    new_structure_tyrell_2 = data.slice(10, 20).map(function (d, i) {

        for (var key in d) {
            if (key == "Tyrell") {
                return { house: 6, episode: + d.episode, value: + d["Tyrell"] };
            }
        }
    });
    console.log(new_structure_tyrell_2);
    new_structure_all_2 = new_structure_baratheon_2
        .concat(new_structure_greyjoy_2,
        new_structure_lannister_2,
        new_structure_martell_2,
        new_structure_stark_2,
        new_structure_targaryen_2,
        new_structure_tyrell_2);


    //season 3
    new_structure_baratheon_3 = data.slice(20, 30).map(function (d, i) {
        for (var key in d) {
            if (key == 'Baratheon') {
                return { house: 0, episode: +d.episode, value: +d['Baratheon'] };
            }

        }
    });
    console.log(new_structure_baratheon_3);

    new_structure_greyjoy_3 = data.slice(20, 30).map(function (d, i) {

        for (var key in d) {
            if (key == "Greyjoy") {
                return { house: 1, episode: + d.episode, value: + d["Greyjoy"] };
            }
        }
    });
    console.log(new_structure_greyjoy_3);

    new_structure_lannister_3 = data.slice(20, 30).map(function (d, i) {

        for (var key in d) {
            if (key == "Lannister") {
                return { house: 2, episode: + d.episode, value: + d["Lannister"] };
            }
        }
    });
    console.log(new_structure_lannister_3);
    new_structure_martell_3 = data.slice(20, 30).map(function (d, i) {

        for (var key in d) {
            if (key == "Martell") {
                return { house: 3, episode: + d.episode, value: + d["Martell"] };
            }
        }
    });
    console.log(new_structure_martell_3);
    new_structure_stark_3 = data.slice(20, 30).map(function (d, i) {
        for (var key in d) {
            if (key == "Stark") {
                return { house: 4, episode: + d.episode, value: + d["Stark"] };
            }
        }
    });
    console.log(new_structure_stark_3);
    new_structure_targaryen_3 = data.slice(20, 30).map(function (d, i) {

        for (var key in d) {
            if (key == "Targaryen") {
                return { house: 5, episode: + d.episode, value: + d["Targaryen"] };
            }
        }
    });
    console.log(new_structure_targaryen_3);
    new_structure_tyrell_3 = data.slice(20, 30).map(function (d, i) {

        for (var key in d) {
            if (key == "Tyrell") {
                return { house: 6, episode: + d.episode, value: + d["Tyrell"] };
            }
        }
    });
    console.log(new_structure_tyrell_3);
    new_structure_all_3 = new_structure_baratheon_3
        .concat(new_structure_greyjoy_3,
        new_structure_lannister_3,
        new_structure_martell_3,
        new_structure_stark_3,
        new_structure_targaryen_3,
        new_structure_tyrell_3);

    console.log("season 3");
    console.log(new_structure_all_3);


    //season 4
    new_structure_baratheon_4 = data.slice(30, 40).map(function (d, i) {
        for (var key in d) {
            if (key == 'Baratheon') {
                return { house: 0, episode: +d.episode, value: +d['Baratheon'] };
            }

        }
    });
    console.log(new_structure_baratheon_4);

    new_structure_greyjoy_4 = data.slice(30, 40).map(function (d, i) {

        for (var key in d) {
            if (key == "Greyjoy") {
                return { house: 1, episode: + d.episode, value: + d["Greyjoy"] };
            }
        }
    });
    console.log(new_structure_greyjoy_4);

    new_structure_lannister_4 = data.slice(30, 40).map(function (d, i) {

        for (var key in d) {
            if (key == "Lannister") {
                return { house: 2, episode: + d.episode, value: + d["Lannister"] };
            }
        }
    });
    console.log(new_structure_lannister_4);
    new_structure_martell_4 = data.slice(30, 40).map(function (d, i) {

        for (var key in d) {
            if (key == "Martell") {
                return { house: 3, episode: + d.episode, value: + d["Martell"] };
            }
        }
    });
    console.log(new_structure_martell_4);
    new_structure_stark_4 = data.slice(30, 40).map(function (d, i) {
        for (var key in d) {
            if (key == "Stark") {
                return { house: 4, episode: + d.episode, value: + d["Stark"] };
            }
        }
    });
    console.log(new_structure_stark_4);
    new_structure_targaryen_4 = data.slice(30, 40).map(function (d, i) {

        for (var key in d) {
            if (key == "Targaryen") {
                return { house: 5, episode: + d.episode, value: + d["Targaryen"] };
            }
        }
    });
    console.log(new_structure_targaryen_4);
    new_structure_tyrell_4 = data.slice(30, 40).map(function (d, i) {

        for (var key in d) {
            if (key == "Tyrell") {
                return { house: 6, episode: + d.episode, value: + d["Tyrell"] };
            }
        }
    });
    console.log(new_structure_tyrell_4);
    new_structure_all_4 = new_structure_baratheon_4
        .concat(new_structure_greyjoy_4,
        new_structure_lannister_4,
        new_structure_martell_4,
        new_structure_stark_4,
        new_structure_targaryen_4,
        new_structure_tyrell_4);

    console.log("season 4");
    console.log(new_structure_all_4);


    //season 5
    new_structure_baratheon_5 = data.slice(40, 50).map(function (d, i) {
        for (var key in d) {
            if (key == 'Baratheon') {
                return { house: 0, episode: +d.episode, value: +d['Baratheon'] };
            }

        }
    });
    console.log(new_structure_baratheon_5);

    new_structure_greyjoy_5 = data.slice(40, 50).map(function (d, i) {

        for (var key in d) {
            if (key == "Greyjoy") {
                return { house: 1, episode: + d.episode, value: + d["Greyjoy"] };
            }
        }
    });
    console.log(new_structure_greyjoy_5);

    new_structure_lannister_5 = data.slice(40, 50).map(function (d, i) {

        for (var key in d) {
            if (key == "Lannister") {
                return { house: 2, episode: + d.episode, value: + d["Lannister"] };
            }
        }
    });
    console.log(new_structure_lannister_5);
    new_structure_martell_5 = data.slice(40, 50).map(function (d, i) {

        for (var key in d) {
            if (key == "Martell") {
                return { house: 3, episode: + d.episode, value: + d["Martell"] };
            }
        }
    });
    console.log(new_structure_martell_5);
    new_structure_stark_5 = data.slice(40, 50).map(function (d, i) {
        for (var key in d) {
            if (key == "Stark") {
                return { house: 4, episode: + d.episode, value: + d["Stark"] };
            }
        }
    });
    console.log(new_structure_stark_5);
    new_structure_targaryen_5 = data.slice(40, 50).map(function (d, i) {

        for (var key in d) {
            if (key == "Targaryen") {
                return { house: 5, episode: + d.episode, value: + d["Targaryen"] };
            }
        }
    });
    console.log(new_structure_targaryen_5);
    new_structure_tyrell_5 = data.slice(40, 50).map(function (d, i) {

        for (var key in d) {
            if (key == "Tyrell") {
                return { house: 6, episode: + d.episode, value: + d["Tyrell"] };
            }
        }
    });
    console.log(new_structure_tyrell_5);
    new_structure_all_5 = new_structure_baratheon_5
        .concat(new_structure_greyjoy_5,
        new_structure_lannister_5,
        new_structure_martell_5,
        new_structure_stark_5,
        new_structure_targaryen_5,
        new_structure_tyrell_5);

    console.log("season 5");
    console.log(new_structure_all_5);


    //season 6
    new_structure_baratheon_6 = data.slice(50, 60).map(function (d, i) {
        for (var key in d) {
            if (key == 'Baratheon') {
                return { house: 0, episode: +d.episode, value: +d['Baratheon'] };
            }

        }
    });
    console.log(new_structure_baratheon_6);

    new_structure_greyjoy_6 = data.slice(50, 60).map(function (d, i) {

        for (var key in d) {
            if (key == "Greyjoy") {
                return { house: 1, episode: + d.episode, value: + d["Greyjoy"] };
            }
        }
    });
    console.log(new_structure_greyjoy_6);

    new_structure_lannister_6 = data.slice(50, 60).map(function (d, i) {

        for (var key in d) {
            if (key == "Lannister") {
                return { house: 2, episode: + d.episode, value: + d["Lannister"] };
            }
        }
    });
    console.log(new_structure_lannister_6);
    new_structure_martell_6 = data.slice(50, 60).map(function (d, i) {

        for (var key in d) {
            if (key == "Martell") {
                return { house: 3, episode: + d.episode, value: + d["Martell"] };
            }
        }
    });
    console.log(new_structure_martell_6);
    new_structure_stark_6 = data.slice(50, 60).map(function (d, i) {
        for (var key in d) {
            if (key == "Stark") {
                return { house: 4, episode: + d.episode, value: + d["Stark"] };
            }
        }
    });
    console.log(new_structure_stark_6);
    new_structure_targaryen_6 = data.slice(50, 60).map(function (d, i) {

        for (var key in d) {
            if (key == "Targaryen") {
                return { house: 5, episode: + d.episode, value: + d["Targaryen"] };
            }
        }
    });
    console.log(new_structure_targaryen_6);
    new_structure_tyrell_6 = data.slice(50, 60).map(function (d, i) {

        for (var key in d) {
            if (key == "Tyrell") {
                return { house: 6, episode: + d.episode, value: + d["Tyrell"] };
            }
        }
    });
    console.log(new_structure_tyrell_6);
    new_structure_all_6 = new_structure_baratheon_6
        .concat(new_structure_greyjoy_6,
        new_structure_lannister_6,
        new_structure_martell_6,
        new_structure_stark_6,
        new_structure_targaryen_6,
        new_structure_tyrell_6);

    console.log("season 6");
    console.log(new_structure_all_6);

    x.domain(d3.range(1, 10 + 1, 1));
    y.domain(houses);
    color.domain([0, buckets - 1, d3.max(new_structure_all_1, function (d) {
        return d.value; //finds max of value
    })]);


    //attributed to http://bl.ocks.org/tjdecke/5558084- creating heatmap for the first season
    var house_labels = svg.selectAll(".houseLabel")
        .data(houses)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize - 70; })
        .style("text-anchor", "end")
        .style("font-family", "arial")
        .attr("transform", "translate(-6," + gridSize / 2 + ")");

    var episode_labels = svg.selectAll(".episodeLabel")
        .data(x.domain())
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) { return i * gridSize - 5; })
        .attr("y", h + 150)
        .style("text-anchor", "middle")
        .style("font-family", "arial")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)");

    svg.append("g")
        .append("text")
        .text("Episode")
        .style("font-weight", "bold")
        .attr("transform", "translate(" + (w - margin.right) + "," + (h + margin.top + 33) + ")")
        .style("font-family", "arial");
    svg.append("g")
        .append("text")
        .text("House")
        .style("font-weight", "bold")
        .attr("transform", "translate(" + (-60) + "," + (-93) + ")")
        .style("font-family", "arial");

    svg.append("g")
        .append("text")
        .text("No. of appearances per season")
        .attr("transform", "translate(" + (0) + "," + (1080) + ")")
        .style("font-family", "arial")
        .style("font-size", "13px");

    svg.append("g")
        .append("text")
        .text("A Visualization of Ice and Fire")
        .attr("transform", "translate(" + (w - margin.right) + "," + (100) + ")")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "arial");


    var cards = svg.selectAll(".episode")
        .data(new_structure_all_1, function (d) { return d.episode + ':' + d.house; })


    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function (d) { return (d.episode - 1) * gridSize; })
        .attr("y", function (d) { return (d.house - 1) * gridSize; })
        .attr("class", "bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", color[0]);

    cards.transition().duration(0)
        .style("fill", function (d) { return color(d.value); });

    d3.selectAll(".legend").remove();

    var legend = svg.selectAll(".legend")
        .data([0].concat(color.quantiles()), function (d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function (d, i) { return legend_width / 2 * i; })
        .attr("y", h + 200)
        .attr("width", legend_width / 2)
        .attr("height", gridSize / 6)
        .style("fill", function (d, i) { return color(d); });

    legend.append("text")
        .attr("class", "legendText")
        .text(function (d) { return Math.round(d); })
        .attr("x", function (d, i) { return legend_width / 2 * i + 2.5; })
        .attr("y", h + gridSize + 110);

});

//function to create the heatmap - creating heatmap for all other options

var create = function (data) {

    x.domain(d3.range(1, 10 + 1, 1));
    y.domain(houses);
    color.domain([0, buckets - 1, d3.max(data, function (d) {
        return d.value; //finds max of value
    })]);

    d3.selectAll(".houseLabel").remove();
    d3.selectAll(".episodeLabel").remove();
    //attributed to http://bl.ocks.org/tjdecke/5558084
    var house_labels = svg.selectAll(".houseLabel")
        .data(houses)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize - 70; })
        .style("text-anchor", "end")
        .style("font-family", "arial")
        .attr("transform", "translate(-6," + gridSize / 2 + ")");

    var episode_labels = svg.selectAll(".episodeLabel")
        .data(x.domain())
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) { return i * gridSize - 5; })
        .attr("y", h + 150)
        .style("text-anchor", "middle")
        .style("font-family", "arial")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)");

    svg.append("g")
        .append("text")
        .text("Episode")
        .style("font-weight", "bold")
        .attr("transform", "translate(" + (w - margin.right) + "," + (h + margin.top + 33) + ")")
        .style("font-family", "arial");
    svg.append("g")
        .append("text")
        .text("House")
        .style("font-weight", "bold")
        .attr("transform", "translate(" + (-60) + "," + (-93) + ")")
        .style("font-family", "arial");

    svg.append("g")
        .append("text")
        .text("No. of appearances per season")
        .attr("transform", "translate(" + (0) + "," + (880) + ")")
        .style("font-family", "arial")
        .style("font-size", "13px");

    svg.append("g")
        .append("text")
        .text("A Visualization of Ice and Fire")
        .attr("transform", "translate(" + (w - margin.right) + "," + (100) + ")")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "arial");


    var cards = svg.selectAll(".episode")
        .data(data, function (d) { return d.episode + ':' + d.house; })


    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function (d) { return (d.episode - 1) * gridSize; })
        .attr("y", function (d) { return (d.house - 1) * gridSize; })
        .attr("class", "bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", color[0]);

    cards.transition().duration(0)
        .style("fill", function (d) { return color(d.value); });


    d3.selectAll(".legend").remove();
    d3.selectAll(".houseLabel").remove();
    d3.selectAll(".episodeLabel").remove();
   
    var legend = svg.selectAll(".legend")
        .data([0].concat(color.quantiles()), function (d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function (d, i) { return legend_width / 2 * i; })
        .attr("y", h + 200)
        .attr("width", legend_width / 2)
        .attr("height", gridSize / 6)
        .style("fill", function (d, i) { return color(d); });

    legend.append("text")
        .attr("class", "legendText")
        .text(function (d) { return Math.round(d); })
        .attr("x", function (d, i) { return legend_width / 2 * i + 2.5; })
        .attr("y", h + gridSize + 110);



};

var select = d3.select('body')
    .append('select')
    .attr('class', 'select')
    .on('change', onchange)



var options = select
    .selectAll('option')
    .data(seasons).enter()
    .append('option')
    .text(function (d) { return d; });



function onchange() {
    selectValue = d3.select('select').property('value');

    console.log(selectValue)
    switch (selectValue){

    case "Season 1":
        create(new_structure_all_1);
        break;

    case "Season 2":
        create(new_structure_all_2);
        break;

    case "Season 3":
        create(new_structure_all_3);
        break;

    case "Season 4":
        create(new_structure_all_4);
        break;

    case "Season 5":
        create(new_structure_all_5);
        break;

    case "Season 6":
        create(new_structure_all_6);
        break;

    case "Season 7":
        create(new_structure_all_7);
        break;

    case "Season 8":
        create(new_structure_all_8);
        break;

    case "Season 9":
        create(new_structure_all_9);
        break;
}

};
