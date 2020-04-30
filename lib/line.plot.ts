import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, TextOption, ChoicesOption } from 'data-science-lab-core';
import { ColorChoices } from './colors';
import { CurvesChoices } from './curves';

interface LinePlotInput {
    x: number[];
    y: number[];
    xLabel: string;
    yLabel: string;
    color: string;
    title?: string;
    curve: string;
}

export class LinePlot extends VisualizationPlugin {

    options: LinePlotPluginOptions;
    inputs: LinePlotPluginInputs;

    data: LinePlotInput;

    constructor() {
        super();
        this.options = new LinePlotPluginOptions(this);
        this.inputs = new LinePlotPluginInputs(this);

        this.data = {} as LinePlotInput;
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
                var xvalues = ${JSON.stringify(this.data.x)};
                var yvalues = ${JSON.stringify(this.data.y)};
                var color = ${JSON.stringify(this.data.color)};
                var xlabel = ${JSON.stringify(this.data.xLabel)};
                var ylabel = ${JSON.stringify(this.data.yLabel)};
                var title = ${this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined'};
                var curve = ${JSON.stringify(this.data.curve)};
        
                var curves = {
                    'Linear': d3.curveLinear,
                    'Natural': d3.curveNatural,
                    'Step': d3.curveStep,
                    'Step Before': d3.curveStepBefore,
                    'Step After': d3.curveStepAfter,
                    'Basis': d3.curveBasis,
                    'Cardinal': d3.curveCardinal,
                    'Monotone X': d3.curveMonotoneX,
                    'Catmull Rom': d3.curveCatmullRom
                }
        
                if (title !== undefined) {
                    var margin = { top: 60, right: 50, bottom: 80, left: 50 },
                        width = 1020 - margin.left - margin.right,
                        height = 780 - margin.top - margin.bottom;
                } else {
                    var margin = { top: 10, right: 50, bottom: 80, left: 50 },
                        width = 1020 - margin.left - margin.right,
                        height = 780 - margin.top - margin.bottom;
                }
        
                var list = xvalues.map((value, index) => ({ x: value, y: yvalues[index]}));
                list.sort((a, b) => {
                    return a.x - b.x;
                });
                xvalues = list.map((value) => value.x);
                yvalues = list.map((value) => value.y);
        
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
                    .domain([d3.min(xvalues), d3.max(xvalues)])
                    .range([0, width]);
        
                svg.append('g')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(d3.axisBottom(x));
        
                var y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([d3.min(yvalues), d3.max(yvalues)]);
        
                svg.append('g')
                    .call(d3.axisLeft(y));
        
                var data = d3.entries(yvalues);
        
                svg.append('path')
                    .datum(data)
                    .attr('fill', 'none')
                    .attr('stroke', color)
                    .attr('stroke-width', 1.5)
                    .attr('d', d3.line().curve(curves[curve])
                        .x(function (d, i) { return x(xvalues[i]) })
                        .y(function (d, i) { return y(yvalues[i]) }));
        
        
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

    setX(points: number[], label: string) {
        this.data.x = points;
        this.data.xLabel = label;
    }

    setY(points: number[], label: string) {
        this.data.y = points;
        this.data.yLabel = label;
    }

    setColor(color: string) {
        this.data.color = color;
    }

    setTitle(title: string) {
        this.data.title = title;
    }

    setCurve(curve: string) {
        this.data.curve = curve;
    }

}

class LinePlotPluginInputs extends PluginInputs {
    constructor(public visualization: LinePlot) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['x'] === undefined) {
            throw new Error(`Line Plot's submit expecting plugin data with key x`);
        } else {
            this.visualization.setX(
                inputs['x'].examples.map(value => value[0]),
                inputs['x'].features[0]);
        }

        if (inputs['y'] === undefined) {
            throw new Error(`Line Plot's submit expecting plugin data with key y`);
        } else {
            this.visualization.setY(
                inputs['y'].examples.map(value => value[0]),
                inputs['y'].features[0]);
        }
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'x',
                label: 'X Points',
                min: 1,
                max: 1,
                type: 'number'
            },
            {
                id: 'y',
                label: 'Y Points',
                min: 1,
                max: 1,
                type: 'number'
            },
        ];
    }
}

class LinePlotPluginOptions extends PluginOptions {
    state: number;

    constructor(public visualization: LinePlot) {
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
        this.visualization.setCurve(inputs['curve']);
        this.state = 2;
    }
    options(): Option[] {
        return [
            new TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
            new ChoicesOption({
                id: 'curve',
                label: 'Select a curve type',
                choices: CurvesChoices
            }),
            new TextOption({
                id: 'hexColor',
                label: 'Type a color in hex (example: #00bfff)',
                pattern: '^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
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


