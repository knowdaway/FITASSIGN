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
    function updatePieChart() {
      let selectedOptions = Array.from(
        document.getElementById("regionSelect").selectedOptions
      ).map((option) => option.value);
      if (selectedOptions.length > 0){
        pieSpec.transform = pieSpec.transform.filter((t) => !t.filter);
        pieSpec.transform.push({
          filter:{field: "state", oneOf: selectedOptions},
        });
      }else{
        pieSpec.transform = pieSpec.transform.filter((t)=> !t.filter);
      }
      vegaEmbed("#pie-chart", pieSpec).catch(console.error)
      }
      document
      .getElementById("regionSelect")
      .addEventListener("change", updatePieChart);
}
