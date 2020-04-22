import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, TextOption } from 'data-science-lab-core';

interface CorrelogramPlotInput {
    correlations: number[][];
    labels: string[];
    title?: string;
}

export class CorrelogramPlot extends VisualizationPlugin {

    options: CorrelogramPlotPluginOptions;
    inputs: CorrelogramPlotPluginInputs;

    data: CorrelogramPlotInput;

    constructor() {
        super();
        this.options = new CorrelogramPlotPluginOptions(this);
        this.inputs = new CorrelogramPlotPluginInputs(this);

        this.data = {} as CorrelogramPlotInput;
    }

    getOptions(): PluginOptions {
        return this.options;
    }
    getInputs(): PluginInputs {
        return this.inputs;
    }

    visualization(): string {
        return `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="utf-8">
        
            <!-- Load d3.js -->
            <script src="https://d3js.org/d3.v4.js"></script>
        
            <!-- Create a div where the graph will take place -->
            <style>
                body {
                    overflow: hidden;
                }
            </style>
        </head>
        
        <body>
            <div id="chart"></div>
            <script type="text/javascript">
                var id = '#chart';
                var values = ${JSON.stringify(this.data.correlations)};
                var labels = ${JSON.stringify(this.data.labels)};
                var title = ${this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined'};
        
                if (title !== undefined) {
                    var margin = { top: 60, right: 50, bottom: 10, left: 50 },
                        width = 1020 - margin.left - margin.right,
                        height = 1020 - margin.top - margin.bottom;
                } else {
                    var margin = { top: 10, right: 50, bottom: 10, left: 50 },
                        width = 1020 - margin.left - margin.right,
                        height = 1020 - margin.top - margin.bottom;
                }
        
                var svg = d3.select(id)
                    .append('svg')
                    .attr('width', '100vw')
                    .attr('height', '100vh')
                    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                    .attr('preserveAspectRatio', 'xMidYMid meet')
                    .append('g')
                    .attr('transform',
                        'translate(' + margin.left + ',' + margin.top + ')');
        
                var color = d3.scaleLinear()
                    .domain([-1, 0, 1])
                    .range(["#B22222", "#DDD", "#000080"]);
        
                var grid = svg.append('g');
                var rectWidth = width / values.length;
                var rectHeight = height / values.length;
                var min = d3.min([rectWidth, rectHeight]);
        
                for (let i = 0; i < values.length; ++i) {
                    for (let j = 0; j < values.length; ++j) {
                        if (i > j) {
                            grid
                                .append("circle")
                                .attr('r', ((min) / 2.0) * Math.abs(values[i][j]))
                                .attr("transform", "translate(" + (i * rectWidth + rectWidth / 2) + "," + (j * rectHeight + rectHeight / 2) + ")")
                                .style("fill", color(values[i][j]))
                                .style("opacity", 1.0)
                        } else if (i === j) {
                            grid.append('text')
                                .text(labels[i])
                                .attr("transform", "translate(" + (i * rectWidth + rectWidth / 2) + "," + (j * rectHeight + rectHeight / 2) + ")")
                                .style("font-size", function (d) {
                                    return Math.min(min / 2, (min / 2 - 8) / this.getComputedTextLength() * 24) + "px";
                                })
                                .attr("dominant-baseline", "central")
                                .attr("text-anchor", "middle")
                                .style('fill', 'black')
                        } else {
                            grid.append('text')
                                .text(function(d) {
                                    return values[i][j].toFixed(2);
                                })
                                .attr("transform", function (d) {
                                    return "translate(" + (i * rectWidth + rectWidth / 2) + "," + (j * rectHeight + rectHeight / 2) + ")"
                                })
                                .style("font-size", function (d) {
                                    return Math.min(min / 2, (min / 2 - 8) / this.getComputedTextLength() * 24) + "px";
                                })
                                .attr("dominant-baseline", "central")
                                .attr("text-anchor", "middle")
                                .style('fill', color(values[i][j]))
        
                        }
                    }
                }
        
        
                if (title !== undefined) {
                    svg.append("text")
                        .attr("x", (width / 2))
                        .attr("y", 0 - (margin.top / 2))
                        .attr("text-anchor", "middle")
                        .style("font-size", "30px")
                        .style("text-decoration", "underline")
                        .text(title);
                }
            </script>
        </body>`;
    }

    submit(pluginData: PluginData) {
        this.data.labels = pluginData.features;
        if (pluginData.examples.length === 0) {
            this.data.correlations = [];
        }

        const examples = pluginData.examples.length;
        const averages = pluginData.features.map(() => 0.0);


        pluginData.examples.forEach((row, rowCount) => {
            row.forEach((value, index) => {
                averages[index] += (value - averages[index]) / (rowCount + 1);
            });
        });
        
        let standardDeviations = pluginData.examples[0].map(() => 0.0);
        pluginData.examples.forEach((row) => {
            row.forEach((value, index) => {
                standardDeviations[index] += (value - averages[index]) ** 2.0;
            });
        });
        
        standardDeviations = standardDeviations.map((value) => {
            return (value / examples) ** 0.5
        });
        
        this.data.correlations = Array(pluginData.features.length)
            .fill([])
            .map((value) => Array(pluginData.features.length)
                .fill(0.0));

        for (let correlationI = 1; correlationI < pluginData.features.length; ++correlationI) {
            for (let correlationJ = 0; correlationJ < correlationI; ++correlationJ) {
                let value = 0.0;
                for (let i = 0; i < pluginData.examples.length; ++i) {
                    let xi = pluginData.examples[i][correlationI];
                    let uX = averages[correlationI];
                    let yi = pluginData.examples[i][correlationJ];
                    let uY = averages[correlationJ];
                    let stdX = standardDeviations[correlationI];
                    let stdY = standardDeviations[correlationJ];

                    value += ((xi - uX) * (yi - uY) / (stdX * stdY) - value) / (i + 1);
                }

                this.data.correlations[correlationI][correlationJ] = value;
                this.data.correlations[correlationJ][correlationI] = value;
            }
        }
    }

    setTitle(title: string) {
        this.data.title = title;
    }

}

class CorrelogramPlotPluginInputs extends PluginInputs {
    constructor(public visualization: CorrelogramPlot) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['features'] === undefined) {
            throw new Error(`Correlogram Plot's submit expecting plugin data with key features`);
        } else {
            this.visualization.submit(inputs['features']);
        }
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to Plot',
                min: 2,
                type: 'number'
            }
        ];
    }
}

class CorrelogramPlotPluginOptions extends PluginOptions {
    state: number;

    constructor(public visualization: CorrelogramPlot) {
        super();
        this.state = 1;
    }

    submit(inputs: { [id: string]: any; }): void {
        if (inputs['title'] !== '') {
            this.visualization.setTitle(inputs['title']);
        }
        this.state = 2;
    }
    options(): Option[] {
        return [
            new TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
        ];
    }

    noMore(): boolean {
        return this.state === 2;
    }

}


