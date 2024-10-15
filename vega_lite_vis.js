function createBarChart() {
    var barSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 500,
        height: 400,
        data: {url: "./water-usage.json"},
        description:"The bar chart shows the different water consumption in different parts of Australia",
        title:{
          text:"Different regions of Australia have different distribution of water consumption in 2022",
          subtitle:"Author: Junchao | Data Source: Australian Bureau of Statistics",
          anchor:"middle",
          fontSize: 14,
          subtitleFontSize: 10,
        },
        transform:[
            {
                fold: ["domestic", "industrial", "irrigation"],
                as:["WaterType", "Amount"],
        }
      ],
      mark:"bar",
      encoding:{
        x:{
            field:"region",
            type: "nominal",
            title: "Region",
            axis: { labelAngle: -30, labelFontSize:10},
        },
        y:{
            field:"Amount",
            type: "quantitative",
            title: "Water Usage(megaliter)"
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
                title: "Water Usage(megaliter)"
            },
            {
                field:"WaterType",
                type: "nominal",
                title: "Water Type"
            },
    ],
      },
      config: {
        metadata: {
          author: "junchao",
          created: "2024-10-10",
          source: "Different parts of Australia use different water",
        },
      },
    };
    vegaEmbed("#bar-chart", barSpec).catch(console.error);
    function updateBarChart() {
      let selectedOptions = Array.from(
        document.getElementById("regionSelect").selectedOptions
      ).map((option) => option.value);
      if (selectedOptions.length > 0){
        barSpec.transform = barSpec.transform.filter((t) => !t.filter);
        barSpec.transform.push({
          filter:{field: "region", oneOf: selectedOptions},
        });
      }else{
        barSpec.transform = barSpec.transform.filter((t)=> !t.filter);
      }
      vegaEmbed("#bar-chart", barSpec).catch(console.error)
      }
      document
      .getElementById("regionSelect")
      .addEventListener("change", updateBarChart);
}
function createMap() {
  var mapSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 600,
    height: 440,
    description:
      "A map showing rainfall distribution across Australian states, with selected states highlighted.",
    title: {
      text: "Rainfall Distribution Across Australian States in 2022",
      subtitle: "Author: Junchao | Data Source: Australian Bureau of Statistics",
      anchor: "middle",
      fontSize: 14,
      subtitleFontSize: 10,
    },
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
            { field: "properties.STATE_NAME", type: "nominal", title: "State" },
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
      metadata: {
        author: "junchao",
        created: "2024-10-10",
        source: "Australian Rainfall Data",
        license: "Creative Commons Attribution 4.0",
      },
    },
  };

  vegaEmbed("#map", mapSpec).catch(console.error);

  function updateMap() {
    let selectedOptions = Array.from(
      document.getElementById("regionSelect").selectedOptions
    ).map((option) => option.value);

    if (selectedOptions.length > 0) {
      mapSpec.transform = mapSpec.transform.filter((t) => !t.filter);

      mapSpec.transform.push({
        filter: { field: "properties.STATE_NAME", oneOf: selectedOptions },
      });
    } else {
      mapSpec.transform = mapSpec.transform.filter((t) => !t.filter);
    }

    vegaEmbed("#map", mapSpec).catch(console.error);
  }

  document.getElementById("regionSelect").addEventListener("change", updateMap);
}

function createLineChart() {
    var lineSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 600,
        height: 400,
        data: {url: "./water-usage-nsw.json"},
        description:"This line chart shows the annual trend of different water resources",
        title:{
          text:"Water consumption in Australia varies from year to year",
          subtitle:"Author: Junchao | Data Source: Australian Bureau of Statistics",
          anchor:"middle",
          fontSize: 14,
          subtitleFontSize: 10,
        },
        transform:[
            {
                fold: ["domestic", "industrial", "irrigation"],
                as:["WaterType", "Amount"],
        }
        
    ],
    mark:"line",
    encoding:{
        x:{
            field:"year",
            type: "nominal",
            title: "Year",
            axis: { labelAngle: 0, labelFontSize:10}
        },
        y:{
            field:"Amount",
            type: "quantitative",
            title: "Water Usage(megaliter)"
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
                title: "Water Usage(megaliter)"
            },
            {
                field:"WaterType",
                type: "nominal",
                title: "Water Type"
            },
        ]
    },
    config: {
      metadata: {
        author: "junchao",
        created: "2024-10-10",
        source: "Water consumption in Australia varies from year to year",
      },
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
        description:"This scatter plot shows the fit of domestic and industrial water use in Australia",
        title:{
          text:"The fit of domestic and industrial water use in Australia in 2022",
          subtitle:"Author: Junchao | Data Source: Australian Bureau of Statistics",
          anchor:"middle",
          fontSize: 14,
          subtitleFontSize: 10,
        },
    mark:"point",
    encoding:{
        x:{
            field:"domestic",
            type: "quantitative",
            title: "Domestic water(megaliter)"
        },
        y:{
            field:"industrial",
            type: "quantitative",
            title: "Industrial water(megaliter)"
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
                title: "Domestic water(megaliter)"
            },
            {
                field:"industrial",
                type: "quantitative",
                title: "Industrial water(megaliter)"
            },
        ]
    },
    config: {
      metadata: {
        author: "junchao",
        created: "2024-10-10",
        source: "The fit of domestic and industrial water use in Australia",
      },
    },
    };
    vegaEmbed("#scatter-plot", scatterSpec).catch(console.error);
}
function createPieChart() {
  var pieSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 600,
    height: 400,
    data: { url: "./water-resources.json" },
    mark: "arc",
    encoding: {
      theta: {
        field: "rainfall_mm",
        type: "quantitative",
        title: "Rainfall(mm)",
      },
      color: {
        field: "state",
        type: "nominal",
        title: "Region",
      },
      tooltip: [
        {
          field: "state",
          type: "nominal",
          title: "Region",
        },
        {
          field: "rainfall_mm",
          type: "quantitative",
          title: "Rainfall(mm)",
        },
      ],
    },
    view: { stroke: null },
  };
  vegaEmbed("#pie-chart", pieSpec).catch(console.error);
}
