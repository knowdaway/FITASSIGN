function createBarChart() {
    let selectedRegions = ["New South Wales"];
    var barSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 600,
        height: 400,
        data: {url: "./water-usage.json"},
        transform:[
            {
                fold: ["domestic", "industrial", "irrigation"],
                as:["WaterType", "Amount"],
        },
        {
          filter:{field:"region", oneOf:selectedRegions},
        }
      ],
      mark:"bar",
      encoding:{
        x:{
            field:"region",
            type: "nominal",
            title: "Region"
        },
        y:{
            field:"Amount",
            type: "quantitative",
            title: "Water Usage(ml)"
        },
        color:{
            field:"WaterType",
            type: "nominal",
            title: "Water Type"
        },
        tooltip:[
            {
                field:"region",
                type: "nominal",
                title: "Region"
            },
            {
                field:"Amount",
                type: "quantitative",
                title: "Water Usage(ml)"
            },
            {
                field:"WaterType",
                type: "nominal",
                title: "Water Type"
            },
    ]
      }
    };
    function updateBarChart() {
      let selectedOptions = Array.from(
        document.getElementById("regionSelect").selectedOptions
      ).map((option) => option.value);
  
      selectedRegions = selectedOptions.length
        ? selectedOptions
        : ["New South Wales"];
  
      barSpec.transform[1].filter = { field: "region", oneOf: selectedRegions };
      vegaEmbed("#bar-chart", barSpec).catch(console.error);
    }
  
    document
      .getElementById("regionSelect")
      .addEventListener("change", updateBarChart);
    vegaEmbed("#bar-chart", barSpec).catch(console.error);
}
function createLineChart() {
    var lineSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 600,
        height: 400,
        data: {url: "./water-usage-nsw.json"},
        transform:[
            {
                fold: ["domestic", "industrial", "irrigation"],
                as:["WaterType", "Amount"],
        },
        {
            filter: "datum.region === 'New South Wales'",
        },
        
    ],
    mark:"line",
    encoding:{
        x:{
            field:"year",
            type: "nominal",
            title: "Year"
        },
        y:{
            field:"Amount",
            type: "quantitative",
            title: "Water Usage(ml)"
        },
        color:{
            field:"WaterType",
            type: "nominal",
            title: "Water Type"
        },
        tooltip:[
            {
                field:"year",
                type: "nominal",
                title: "Year"
            },
            {
                field:"Amount",
                type: "quantitative",
                title: "Water Usage(ml)"
            },
            {
                field:"WaterType",
                type: "nominal",
                title: "Water Type"
            },
        ]
    },
    };
    vegaEmbed("#line-chart", lineSpec).catch(console.error);
}
function createScatterPlot(){
    var scatterSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 600,
        height: 400,
        data: {url: "./water-usage.json"},
    mark:"point",
    encoding:{
        x:{
            field:"domestic",
            type: "quantitative",
            title: "Domestic water(ml)"
        },
        y:{
            field:"industrial",
            type: "quantitative",
            title: "Industrial water(ml)"
        },
        color:{
            field:"region",
            type: "nominal",
            title: "Region"
        },
        tooltip:[
            {
                field:"region",
                type: "nominal",
                title: "Region"
            },
            {
                field:"domestic",
                type: "quantitative",
                title: "Domestic water(ml)"
            },
            {
                field:"industrial",
                type: "quantitative",
                title: "Industrial water(ml)"
            },
        ]
    },
    };
    vegaEmbed("#scatter-plot", scatterSpec).catch(console.error);
}
function createPieChart(){
    var pieSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 600,
        height: 400,
        data: {url: "./water-resources.json"},
        mark:"arc",
        encoding:{
            theta:{
                field:"rainfall_mm",
                type: "quantitative",
                title: "Rainfall(mm)"
            },
            color:{
                field:"state",
                type: "nominal",
                title: "Region"
            },
            tooltip:[
                {
                    field:"state",
                    type: "nominal",
                    title: "Region"
                },
                {
                    field:"rainfall_mm",
                    type: "quantitative",
                    title: "Rainfall(mm)"
                },
            ],
        },
        viewer:{stroke:null}
    };
    vegaEmbed("#pie-chart", pieSpec).catch(console.error);
}
function createMap() {
    let selectedRegions = ["New South Wales"];
    var mapSpec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      width: 600,
      height: 400,
      data: {
        url: "./map.json",
        format: {
          type: "topojson",
          feature: "collection",
        },
      },
      transform: [
        {
          lookup: "properties.STATE_NAME",
          from: {
            data: {
              url: "./water-resources.json",
            },
            key: "state",
            fields: ["rainfall_mm"],
          },
        },
        {
          filter:{field:"properties.STATE_NAME", oneOf:selectedRegions},
        }
      ],
      projection: {
        type: "mercator",
        scale: 700,
        center: [133, -27],
        fit: true,
      },
      layer: [
        {
          mark: {
            type: "geoshape",
            stroke: "black",
            strokeWidth: 0.5,
          },
          encoding: {
            color: {
              field: "rainfall_mm",
              type: "quantitative",
              scale: {
                scheme: "blues",
                domain: [200, 1200],
              },
              title: "Rainfall (mm)",
            },
            tooltip: [
              { field: "properties.STATE_NAME", type: "nominal", title: "Region" },
              {
                field: "rainfall_mm",
                type: "quantitative",
                title: "Rainfall (mm)",
              },
            ],
          },
        },
        {
          data: { graticule: true },
          mark: {
            type: "geoshape",
            stroke: "lightgray",
            strokeWidth: 0.5,
          },
        },
      ],
      config: {
        background: "#f0f0f0",
      },
    };
    function updatemap() {
      let selectedOptions = Array.from(
        document.getElementById("regionSelect").selectedOptions
      ).map((option) => option.value);
  
      selectedRegions = selectedOptions.length
        ? selectedOptions
        : ["New South Wales"];
  
      mapSpec.transform[1].filter = { field: "properties.STATE_NAME", oneOf: selectedRegions };
      vegaEmbed("#map", mapSpec).catch(console.error);
    }
  
    document
      .getElementById("regionSelect")
      .addEventListener("change", updatemap);
    vegaEmbed("#map", mapSpec).catch(console.error);
  }