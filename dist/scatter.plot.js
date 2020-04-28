"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var colors_1 = require("./colors");
var ScatterPlot = /** @class */ (function (_super) {
    __extends(ScatterPlot, _super);
    function ScatterPlot() {
        var _this = _super.call(this) || this;
        _this.options = new ScatterPlotPluginOptions(_this);
        _this.inputs = new ScatterPlotPluginInputs(_this);
        _this.data = {};
        return _this;
    }
    ScatterPlot.prototype.getOptions = function () {
        return this.options;
    };
    ScatterPlot.prototype.getInputs = function () {
        return this.inputs;
    };
    ScatterPlot.prototype.visualization = function () {
        return "\n        <!DOCTYPE html>\n        <html>\n        \n        <head>\n            <meta charset=\"utf-8\">\n        \n            <!-- Load d3.js -->\n            <script src=\"https://d3js.org/d3.v4.js\"></script>\n        \n            <!-- Create a div where the graph will take place -->\n            <style>\n                body {\n                    overflow: hidden;\n                }\n            </style>\n        </head>\n        \n        <body>\n            <div id=\"chart\"></div>\n            <script type=\"text/javascript\">\n                var id = '#chart';\n                var xvalues = " + JSON.stringify(this.data.x) + ";\n                var yvalues = " + JSON.stringify(this.data.y) + ";\n                var color = " + JSON.stringify(this.data.color) + ";\n                var xlabel = " + JSON.stringify(this.data.xLabel) + ";\n                var ylabel = " + JSON.stringify(this.data.yLabel) + ";\n                var title = " + (this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined') + ";\n        \n                if (title !== undefined) {\n                    var margin = { top: 60, right: 50, bottom: 80, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 780 - margin.top - margin.bottom;\n                } else {\n                    var margin = { top: 10, right: 50, bottom: 80, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 780 - margin.top - margin.bottom;\n                }\n        \n        \n                var svg = d3.select(id)\n                    .append('svg')\n                    .attr('width', '100vw')\n                    .attr('height', '100vh')\n                    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))\n                    .attr('preserveAspectRatio', 'xMidYMid meet')\n                    .append('g')\n                    .attr('transform',\n                        'translate(' + margin.left + ',' + margin.top + ')');\n        \n                var x = d3.scaleLinear()\n                    .domain([d3.min(xvalues), d3.max(xvalues)])\n                    .range([0, width]);\n        \n                svg.append('g')\n                    .attr('transform', 'translate(0,' + height + ')')\n                    .call(d3.axisBottom(x));\n        \n                var y = d3.scaleLinear()\n                    .range([height, 0])\n                    .domain([d3.min(yvalues), d3.max(yvalues)]);\n        \n                svg.append('g')\n                    .call(d3.axisLeft(y));\n        \n                var data = d3.entries(yvalues);\n        \n                svg.append('g')\n                    .selectAll('dot')\n                    .data(data)\n                    .enter()\n                    .append(\"circle\")\n                    .attr(\"cx\", function (d, i) { return x(xvalues[i]) })\n                    .attr(\"cy\", function (d, i) { return y(yvalues[i]) })\n                    .attr(\"r\", 5)\n                    .attr(\"fill\", color);\n        \n                svg.append('text')\n                    .attr('text-anchor', 'middle')\n                    .attr('transform', 'rotate(-90)')\n                    .attr('y', -margin.left + 20)\n                    .attr('x', -(margin.top / 2) - height / 2 + 10)\n                    .text(ylabel);\n        \n                svg.append('text')\n                    .attr('text-anchor', 'middle')\n                    .style(\"font-size\", \"16px\")\n                    .attr('x', (width / 2))\n                    .attr('y', height + margin.bottom  / 2)\n                    .text(xlabel);\n        \n                if (title !== undefined) {\n                    svg.append(\"text\")\n                        .attr(\"x\", (width / 2))\n                        .attr(\"y\", 0 - (margin.top / 2))\n                        .attr(\"text-anchor\", \"middle\")\n                        .style(\"font-size\", \"30px\")\n                        .style(\"text-decoration\", \"underline\")\n                        .text(title);\n                }\n            </script>\n        </body>";
    };
    ScatterPlot.prototype.setX = function (points, label) {
        this.data.x = points;
        this.data.xLabel = label;
    };
    ScatterPlot.prototype.setY = function (points, label) {
        this.data.y = points;
        this.data.yLabel = label;
    };
    ScatterPlot.prototype.setColor = function (color) {
        this.data.color = color;
    };
    ScatterPlot.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    return ScatterPlot;
}(data_science_lab_core_1.VisualizationPlugin));
exports.ScatterPlot = ScatterPlot;
var ScatterPlotPluginInputs = /** @class */ (function (_super) {
    __extends(ScatterPlotPluginInputs, _super);
    function ScatterPlotPluginInputs(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        return _this;
    }
    ScatterPlotPluginInputs.prototype.submit = function (inputs) {
        if (inputs['x'] === undefined) {
            throw new Error("Scatter Plot's submit expecting plugin data with key x");
        }
        else {
            this.visualization.setX(inputs['x'].examples.map(function (value) { return value[0]; }), inputs['x'].features[0]);
        }
        if (inputs['y'] === undefined) {
            throw new Error("Scatter Plot's submit expecting plugin data with key y");
        }
        else {
            this.visualization.setY(inputs['y'].examples.map(function (value) { return value[0]; }), inputs['y'].features[0]);
        }
    };
    ScatterPlotPluginInputs.prototype.inputs = function () {
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
    };
    return ScatterPlotPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ScatterPlotPluginOptions = /** @class */ (function (_super) {
    __extends(ScatterPlotPluginOptions, _super);
    function ScatterPlotPluginOptions(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        _this.state = 1;
        return _this;
    }
    ScatterPlotPluginOptions.prototype.submit = function (inputs) {
        if (inputs['title'] !== '') {
            this.visualization.setTitle(inputs['title']);
        }
        if (inputs['hexColor'] !== undefined && inputs['hexColor'] !== '') {
            this.visualization.setColor(inputs['hexColor']);
        }
        else {
            this.visualization.setColor(inputs['color']);
        }
        this.state = 2;
    };
    ScatterPlotPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
            new data_science_lab_core_1.TextOption({
                id: 'hexColor',
                label: 'Type a color in hex (example: #00bfff)',
                pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
                min: 0,
                max: 7
            }),
            new data_science_lab_core_1.ChoicesOption({
                id: 'color',
                label: 'Select a color',
                choices: colors_1.ColorChoices
            })
        ];
    };
    ScatterPlotPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return ScatterPlotPluginOptions;
}(data_science_lab_core_1.PluginOptions));
