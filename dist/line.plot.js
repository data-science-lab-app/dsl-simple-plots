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
var curves_1 = require("./curves");
var LinePlot = /** @class */ (function (_super) {
    __extends(LinePlot, _super);
    function LinePlot() {
        var _this = _super.call(this) || this;
        _this.options = new LinePlotPluginOptions(_this);
        _this.inputs = new LinePlotPluginInputs(_this);
        _this.data = {};
        return _this;
    }
    LinePlot.prototype.getOptions = function () {
        return this.options;
    };
    LinePlot.prototype.getInputs = function () {
        return this.inputs;
    };
    LinePlot.prototype.visualization = function () {
        return "<!DOCTYPE html>\n        <html>\n        \n        <head>\n            <meta charset=\"utf-8\">\n        \n            <!-- Load d3.js -->\n            <script src=\"https://d3js.org/d3.v4.js\"></script>\n        \n            <!-- Create a div where the graph will take place -->\n            <style>\n                body {\n                    overflow: hidden;\n                }\n            </style>\n        </head>\n        \n        <body>\n            <div id=\"chart\"></div>\n            <script type=\"text/javascript\">\n                var id = '#chart';\n                var xvalues = " + JSON.stringify(this.data.x) + ";\n                var yvalues = " + JSON.stringify(this.data.y) + ";\n                var color = " + JSON.stringify(this.data.color) + ";\n                var xlabel = " + JSON.stringify(this.data.xLabel) + ";\n                var ylabel = " + JSON.stringify(this.data.yLabel) + ";\n                var title = " + (this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined') + ";\n                var curve = " + JSON.stringify(this.data.curve) + ";\n        \n                var curves = {\n                    'Linear': d3.curveLinear,\n                    'Natural': d3.curveNatural,\n                    'Step': d3.curveStep,\n                    'Step Before': d3.curveStepBefore,\n                    'Step After': d3.curveStepAfter,\n                    'Basis': d3.curveBasis,\n                    'Cardinal': d3.curveCardinal,\n                    'Monotone X': d3.curveMonotoneX,\n                    'Catmull Rom': d3.curveCatmullRom\n                }\n        \n                if (title !== undefined) {\n                    var margin = { top: 60, right: 50, bottom: 80, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 780 - margin.top - margin.bottom;\n                } else {\n                    var margin = { top: 10, right: 50, bottom: 80, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 780 - margin.top - margin.bottom;\n                }\n        \n                var list = xvalues.map((value, index) => ({ x: value, y: yvalues[index]}));\n                list.sort((a, b) => {\n                    return a.x - b.x;\n                });\n                xvalues = list.map((value) => value.x);\n                yvalues = list.map((value) => value.y);\n        \n                var svg = d3.select(id)\n                    .append('svg')\n                    .attr('width', '100vw')\n                    .attr('height', '100vh')\n                    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))\n                    .attr('preserveAspectRatio', 'xMidYMid meet')\n                    .append('g')\n                    .attr('transform',\n                        'translate(' + margin.left + ',' + margin.top + ')');\n        \n                var x = d3.scaleLinear()\n                    .domain([d3.min(xvalues), d3.max(xvalues)])\n                    .range([0, width]);\n        \n                svg.append('g')\n                    .attr('transform', 'translate(0,' + height + ')')\n                    .call(d3.axisBottom(x));\n        \n                var y = d3.scaleLinear()\n                    .range([height, 0])\n                    .domain([d3.min(yvalues), d3.max(yvalues)]);\n        \n                svg.append('g')\n                    .call(d3.axisLeft(y));\n        \n                var data = d3.entries(yvalues);\n        \n                svg.append('path')\n                    .datum(data)\n                    .attr('fill', 'none')\n                    .attr('stroke', color)\n                    .attr('stroke-width', 1.5)\n                    .attr('d', d3.line().curve(curves[curve])\n                        .x(function (d, i) { return x(xvalues[i]) })\n                        .y(function (d, i) { return y(yvalues[i]) }));\n        \n        \n                svg.append('text')\n                    .attr('text-anchor', 'middle')\n                    .attr('transform', 'rotate(-90)')\n                    .attr('y', -margin.left + 20)\n                    .attr('x', -(margin.top / 2) - height / 2 + 10)\n                    .text(ylabel);\n        \n                svg.append('text')\n                    .attr('text-anchor', 'middle')\n                    .style(\"font-size\", \"16px\")\n                    .attr('x', (width / 2))\n                    .attr('y', height + margin.bottom / 2)\n                    .text(xlabel);\n        \n                if (title !== undefined) {\n                    svg.append(\"text\")\n                        .attr(\"x\", (width / 2))\n                        .attr(\"y\", 0 - (margin.top / 2))\n                        .attr(\"text-anchor\", \"middle\")\n                        .style(\"font-size\", \"30px\")\n                        .style(\"text-decoration\", \"underline\")\n                        .text(title);\n                }\n            </script>\n        </body>";
    };
    LinePlot.prototype.setX = function (points, label) {
        this.data.x = points;
        this.data.xLabel = label;
    };
    LinePlot.prototype.setY = function (points, label) {
        this.data.y = points;
        this.data.yLabel = label;
    };
    LinePlot.prototype.setColor = function (color) {
        this.data.color = color;
    };
    LinePlot.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    LinePlot.prototype.setCurve = function (curve) {
        this.data.curve = curve;
    };
    return LinePlot;
}(data_science_lab_core_1.VisualizationPlugin));
exports.LinePlot = LinePlot;
var LinePlotPluginInputs = /** @class */ (function (_super) {
    __extends(LinePlotPluginInputs, _super);
    function LinePlotPluginInputs(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        return _this;
    }
    LinePlotPluginInputs.prototype.submit = function (inputs) {
        if (inputs['x'] === undefined) {
            throw new Error("Line Plot's submit expecting plugin data with key x");
        }
        else {
            this.visualization.setX(inputs['x'].examples.map(function (value) { return value[0]; }), inputs['x'].features[0]);
        }
        if (inputs['y'] === undefined) {
            throw new Error("Line Plot's submit expecting plugin data with key y");
        }
        else {
            this.visualization.setY(inputs['y'].examples.map(function (value) { return value[0]; }), inputs['y'].features[0]);
        }
    };
    LinePlotPluginInputs.prototype.inputs = function () {
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
    return LinePlotPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var LinePlotPluginOptions = /** @class */ (function (_super) {
    __extends(LinePlotPluginOptions, _super);
    function LinePlotPluginOptions(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        _this.state = 1;
        return _this;
    }
    LinePlotPluginOptions.prototype.submit = function (inputs) {
        if (inputs['title'] !== '') {
            this.visualization.setTitle(inputs['title']);
        }
        if (inputs['hexColor'] !== undefined && inputs['hexColor'] !== '') {
            this.visualization.setColor(inputs['hexColor']);
        }
        else {
            this.visualization.setColor(inputs['color']);
        }
        this.visualization.setCurve(inputs['curve']);
        this.state = 2;
    };
    LinePlotPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
            new data_science_lab_core_1.ChoicesOption({
                id: 'curve',
                label: 'Select a curve type',
                choices: curves_1.CurvesChoices
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
    LinePlotPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return LinePlotPluginOptions;
}(data_science_lab_core_1.PluginOptions));
