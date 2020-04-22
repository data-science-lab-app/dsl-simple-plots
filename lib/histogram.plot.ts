import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, TextOption, ChoicesOption, NumberOption } from 'data-science-lab-core';
import { ColorChoices } from './colors';

interface HistogramPlotInput {
    values: number[];
    label: string;
    color: string;
    title?: string;
    bins: number;
}

export class HistogramPlot extends VisualizationPlugin {

    options: HistogramPlotPluginOptions;
    inputs: HistogramPlotPluginInputs;

    data: HistogramPlotInput;

    constructor() {
        super();
        this.options = new HistogramPlotPluginOptions(this);
        this.inputs = new HistogramPlotPluginInputs(this);

        this.data = {} as HistogramPlotInput;
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
                var values = ${JSON.stringify(this.data.values)};
                var xlabel = ${JSON.stringify(this.data.label)};
                var ylabel = 'Occurances';
                var color = ${JSON.stringify(this.data.color)};
                var bins = ${JSON.stringify(this.data.bins)};
                var title = ${this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined'};
        
                if (title !== undefined) {
                    var margin = { top: 60, right: 50, bottom: 80, left: 50 },
                        width = 1020 - margin.left - margin.right,
                        height = 780 - margin.top - margin.bottom;
                } else {
                    var margin = { top: 10, right: 50, bottom: 80, left: 50 },
                        width = 1020 - margin.left - margin.right,
                        height = 780 - margin.top - margin.bottom;
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
        
                var x = d3.scaleLinear()
                    .domain([d3.min(values), d3.max(values)])
                    .range([0, width]);
        
                svg.append('g')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(d3.axisBottom(x));
        
                var binArray = [];
                const min = d3.min(values);
                var difference = (d3.max(values) - d3.min(values)) / bins;
                for (var i = 0; i < bins; ++i) {
                    binArray.push(i * difference + min);
                }
        
                var histogram = d3.histogram()
                    .value(function(d) { return d; })
                    .domain(x.domain())
                    .thresholds(binArray);
        
                data = histogram(values);
        
                var y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(data, function(d) { return d.length; })]);
        
                svg.append('g')
                    .call(d3.axisLeft(y));
        
                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('x', 1)
                    .attr('transform', function (d) {
                        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
                    })
                    .attr('width', function (d) { return x(d.x1) - x(d.x0) - 1; })
                    .attr('height', function (d) { return (height) - y(d.length); })
                    .style('fill', color)
        
                svg.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', -margin.left + 20)
                    .attr('x', -(margin.top / 2) - height / 2 + 10)
                    .text(ylabel);
        
                svg.append('text')
                    .attr('text-anchor', 'middle')
                    .style("font-size", "16px")
                    .attr('x', (width / 2))
                    .attr('y', height + margin.bottom / 2)
                    .text(xlabel);
        
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

    setValues(points: number[], label: string) {
        this.data.values = points;
        this.data.label = label;
    }

    setColor(color: string) {
        this.data.color = color;
    }

    setTitle(title: string) {
        this.data.title = title;
    }

    setBins(bins: number) {
        this.data.bins = bins;
    }

}

class HistogramPlotPluginInputs extends PluginInputs {
    constructor(public visualization: HistogramPlot) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['values'] === undefined) {
            throw new Error(`Histogram Plot's submit expecting plugin data with key x`);
        } else {
            this.visualization.setValues(
                inputs['values'].examples.map(value => value[0]),
                inputs['values'].features[0]);
        }
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'values',
                label: 'Values',
                min: 1,
                max: 1,
                type: 'number'
            },
        ];
    }
}

class HistogramPlotPluginOptions extends PluginOptions {
    state: number;

    constructor(public visualization: HistogramPlot) {
        super();
        this.state = 1;
    }

    submit(inputs: { [id: string]: any; }): void {
        if (inputs['title'] !== '') {
            this.visualization.setTitle(inputs['title']);
        }
        if (inputs['hexColor'] !== undefined && inputs['hexColor'] !== '') {
            this.visualization.setColor(inputs['hexColor']);
        } else {
            this.visualization.setColor(inputs['color']);
        }
        this.visualization.setBins(inputs['bins']);
        this.state = 2;
    }
    options(): Option[] {
        return [
            new TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
            new NumberOption({
                id: 'bins',
                label: 'Type the number of desired bins',
                min: 1,
                step: 1
            }),
            new TextOption({
                id: 'hexColor',
                label: 'Type a color in hex (example: #00bfff)',
                pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
                min: 0,
                max: 7
            }),
            new ChoicesOption({
                id: 'color',
                label: 'Select a color',
                choices: ColorChoices
            })
        ];
    }

    noMore(): boolean {
        return this.state === 2;
    }

}


