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
var HistogramPlot = /** @class */ (function (_super) {
    __extends(HistogramPlot, _super);
    function HistogramPlot() {
        var _this = _super.call(this) || this;
        _this.options = new HistogramPlotPluginOptions(_this);
        _this.inputs = new HistogramPlotPluginInputs(_this);
        _this.data = {};
        return _this;
    }
    HistogramPlot.prototype.getOptions = function () {
        return this.options;
    };
    HistogramPlot.prototype.getInputs = function () {
        return this.inputs;
    };
    HistogramPlot.prototype.visualization = function () {
        return "<!DOCTYPE html>\n        <html>\n        \n        <head>\n            <meta charset=\"utf-8\">\n        \n            <!-- Load d3.js -->\n            <script src=\"https://d3js.org/d3.v4.js\"></script>\n        \n            <!-- Create a div where the graph will take place -->\n            <style>\n                body {\n                    overflow: hidden;\n                }\n            </style>\n        </head>\n        \n        <body>\n            <div id=\"chart\"></div>\n            <script type=\"text/javascript\">\n                var id = '#chart';\n                var values = " + JSON.stringify(this.data.values) + ";\n                var xlabel = " + JSON.stringify(this.data.label) + ";\n                var ylabel = 'Occurances';\n                var color = " + JSON.stringify(this.data.color) + ";\n                var bins = " + JSON.stringify(this.data.bins) + ";\n                var title = " + (this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined') + ";\n        \n                if (title !== undefined) {\n                    var margin = { top: 60, right: 50, bottom: 80, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 780 - margin.top - margin.bottom;\n                } else {\n                    var margin = { top: 10, right: 50, bottom: 80, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 780 - margin.top - margin.bottom;\n                }\n        \n        \n        \n                var svg = d3.select(id)\n                    .append('svg')\n                    .attr('width', '100vw')\n                    .attr('height', '100vh')\n                    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))\n                    .attr('preserveAspectRatio', 'xMidYMid meet')\n                    .append('g')\n                    .attr('transform',\n                        'translate(' + margin.left + ',' + margin.top + ')');\n        \n                var x = d3.scaleLinear()\n                    .domain([d3.min(values), d3.max(values)])\n                    .range([0, width]);\n        \n                svg.append('g')\n                    .attr('transform', 'translate(0,' + height + ')')\n                    .call(d3.axisBottom(x));\n        \n                var binArray = [];\n                const min = d3.min(values);\n                var difference = (d3.max(values) - d3.min(values)) / bins;\n                for (var i = 0; i < bins; ++i) {\n                    binArray.push(i * difference + min);\n                }\n        \n                var histogram = d3.histogram()\n                    .value(function(d) { return d; })\n                    .domain(x.domain())\n                    .thresholds(binArray);\n        \n                data = histogram(values);\n        \n                var y = d3.scaleLinear()\n                    .range([height, 0])\n                    .domain([0, d3.max(data, function(d) { return d.length; })]);\n        \n                svg.append('g')\n                    .call(d3.axisLeft(y));\n        \n                svg.selectAll('rect')\n                    .data(data)\n                    .enter()\n                    .append('rect')\n                    .attr('x', 1)\n                    .attr('transform', function (d) {\n                        return \"translate(\" + x(d.x0) + \",\" + y(d.length) + \")\";\n                    })\n                    .attr('width', function (d) { return x(d.x1) - x(d.x0) - 1; })\n                    .attr('height', function (d) { return (height) - y(d.length); })\n                    .style('fill', color)\n        \n                svg.append('text')\n                    .attr('text-anchor', 'middle')\n                    .attr('transform', 'rotate(-90)')\n                    .attr('y', -margin.left + 20)\n                    .attr('x', -(margin.top / 2) - height / 2 + 10)\n                    .text(ylabel);\n        \n                svg.append('text')\n                    .attr('text-anchor', 'middle')\n                    .style(\"font-size\", \"16px\")\n                    .attr('x', (width / 2))\n                    .attr('y', height + margin.bottom / 2)\n                    .text(xlabel);\n        \n                if (title !== undefined) {\n                    svg.append(\"text\")\n                        .attr(\"x\", (width / 2))\n                        .attr(\"y\", 0 - (margin.top / 2))\n                        .attr(\"text-anchor\", \"middle\")\n                        .style(\"font-size\", \"30px\")\n                        .style(\"text-decoration\", \"underline\")\n                        .text(title);\n                }\n            </script>\n        </body>";
    };
    HistogramPlot.prototype.setValues = function (points, label) {
        this.data.values = points;
        this.data.label = label;
    };
    HistogramPlot.prototype.setColor = function (color) {
        this.data.color = color;
    };
    HistogramPlot.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    HistogramPlot.prototype.setBins = function (bins) {
        this.data.bins = bins;
    };
    return HistogramPlot;
}(data_science_lab_core_1.VisualizationPlugin));
exports.HistogramPlot = HistogramPlot;
var HistogramPlotPluginInputs = /** @class */ (function (_super) {
    __extends(HistogramPlotPluginInputs, _super);
    function HistogramPlotPluginInputs(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        return _this;
    }
    HistogramPlotPluginInputs.prototype.submit = function (inputs) {
        if (inputs['values'] === undefined) {
            throw new Error("Histogram Plot's submit expecting plugin data with key x");
        }
        else {
            this.visualization.setValues(inputs['values'].examples.map(function (value) { return value[0]; }), inputs['values'].features[0]);
        }
    };
    HistogramPlotPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'values',
                label: 'Values',
                min: 1,
                max: 1,
                type: 'number'
            },
        ];
    };
    return HistogramPlotPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var HistogramPlotPluginOptions = /** @class */ (function (_super) {
    __extends(HistogramPlotPluginOptions, _super);
    function HistogramPlotPluginOptions(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        _this.state = 1;
        return _this;
    }
    HistogramPlotPluginOptions.prototype.submit = function (inputs) {
        if (inputs['title'] !== '') {
            this.visualization.setTitle(inputs['title']);
        }
        if (inputs['hexColor'] !== undefined && inputs['hexColor'] !== '') {
            this.visualization.setColor(inputs['hexColor']);
        }
        else {
            this.visualization.setColor(inputs['color']);
        }
        this.visualization.setBins(inputs['bins']);
        this.state = 2;
    };
    HistogramPlotPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
            new data_science_lab_core_1.NumberOption({
                id: 'bins',
                label: 'Type the number of desired bins',
                min: 1,
                step: 1
            }),
            new data_science_lab_core_1.ChoicesOption({
                id: 'color',
                label: 'Select a color',
                choices: colors_1.ColorChoices
            })
        ];
    };
    HistogramPlotPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return HistogramPlotPluginOptions;
}(data_science_lab_core_1.PluginOptions));
