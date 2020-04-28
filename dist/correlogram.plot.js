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
var CorrelogramPlot = /** @class */ (function (_super) {
    __extends(CorrelogramPlot, _super);
    function CorrelogramPlot() {
        var _this = _super.call(this) || this;
        _this.options = new CorrelogramPlotPluginOptions(_this);
        _this.inputs = new CorrelogramPlotPluginInputs(_this);
        _this.data = {};
        return _this;
    }
    CorrelogramPlot.prototype.getOptions = function () {
        return this.options;
    };
    CorrelogramPlot.prototype.getInputs = function () {
        return this.inputs;
    };
    CorrelogramPlot.prototype.visualization = function () {
        return "<!DOCTYPE html>\n        <html>\n        \n        <head>\n            <meta charset=\"utf-8\">\n        \n            <!-- Load d3.js -->\n            <script src=\"https://d3js.org/d3.v4.js\"></script>\n        \n            <!-- Create a div where the graph will take place -->\n            <style>\n                body {\n                    overflow: hidden;\n                }\n            </style>\n        </head>\n        \n        <body>\n            <div id=\"chart\"></div>\n            <script type=\"text/javascript\">\n                var id = '#chart';\n                var values = " + JSON.stringify(this.data.correlations) + ";\n                var labels = " + JSON.stringify(this.data.labels) + ";\n                var title = " + (this.data.title !== undefined ? JSON.stringify(this.data.title) : 'undefined') + ";\n        \n                if (title !== undefined) {\n                    var margin = { top: 60, right: 50, bottom: 10, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 1020 - margin.top - margin.bottom;\n                } else {\n                    var margin = { top: 10, right: 50, bottom: 10, left: 50 },\n                        width = 1020 - margin.left - margin.right,\n                        height = 1020 - margin.top - margin.bottom;\n                }\n        \n                var svg = d3.select(id)\n                    .append('svg')\n                    .attr('width', '100vw')\n                    .attr('height', '100vh')\n                    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))\n                    .attr('preserveAspectRatio', 'xMidYMid meet')\n                    .append('g')\n                    .attr('transform',\n                        'translate(' + margin.left + ',' + margin.top + ')');\n        \n                var color = d3.scaleLinear()\n                    .domain([-1, 0, 1])\n                    .range([\"#B22222\", \"#DDD\", \"#000080\"]);\n        \n                var grid = svg.append('g');\n                var rectWidth = width / values.length;\n                var rectHeight = height / values.length;\n                var min = d3.min([rectWidth, rectHeight]);\n        \n                for (let i = 0; i < values.length; ++i) {\n                    for (let j = 0; j < values.length; ++j) {\n                        if (i > j) {\n                            grid\n                                .append(\"circle\")\n                                .attr('r', ((min) / 2.0) * Math.abs(values[i][j]))\n                                .attr(\"transform\", \"translate(\" + (i * rectWidth + rectWidth / 2) + \",\" + (j * rectHeight + rectHeight / 2) + \")\")\n                                .style(\"fill\", color(values[i][j]))\n                                .style(\"opacity\", 1.0)\n                        } else if (i === j) {\n                            grid.append('text')\n                                .text(labels[i])\n                                .attr(\"transform\", \"translate(\" + (i * rectWidth + rectWidth / 2) + \",\" + (j * rectHeight + rectHeight / 2) + \")\")\n                                .style(\"font-size\", function (d) {\n                                    return Math.min(min / 2, (min / 2 - 8) / this.getComputedTextLength() * 24) + \"px\";\n                                })\n                                .attr(\"dominant-baseline\", \"central\")\n                                .attr(\"text-anchor\", \"middle\")\n                                .style('fill', 'black')\n                        } else {\n                            grid.append('text')\n                                .text(function(d) {\n                                    return values[i][j].toFixed(2);\n                                })\n                                .attr(\"transform\", function (d) {\n                                    return \"translate(\" + (i * rectWidth + rectWidth / 2) + \",\" + (j * rectHeight + rectHeight / 2) + \")\"\n                                })\n                                .style(\"font-size\", function (d) {\n                                    return Math.min(min / 2, (min / 2 - 8) / this.getComputedTextLength() * 24) + \"px\";\n                                })\n                                .attr(\"dominant-baseline\", \"central\")\n                                .attr(\"text-anchor\", \"middle\")\n                                .style('fill', color(values[i][j]))\n        \n                        }\n                    }\n                }\n        \n        \n                if (title !== undefined) {\n                    svg.append(\"text\")\n                        .attr(\"x\", (width / 2))\n                        .attr(\"y\", 0 - (margin.top / 2))\n                        .attr(\"text-anchor\", \"middle\")\n                        .style(\"font-size\", \"30px\")\n                        .style(\"text-decoration\", \"underline\")\n                        .text(title);\n                }\n            </script>\n        </body>";
    };
    CorrelogramPlot.prototype.submit = function (pluginData) {
        this.data.labels = pluginData.features;
        if (pluginData.examples.length === 0) {
            this.data.correlations = [];
        }
        var examples = pluginData.examples.length;
        var averages = pluginData.features.map(function () { return 0.0; });
        pluginData.examples.forEach(function (row, rowCount) {
            row.forEach(function (value, index) {
                averages[index] += (value - averages[index]) / (rowCount + 1);
            });
        });
        var standardDeviations = pluginData.examples[0].map(function () { return 0.0; });
        pluginData.examples.forEach(function (row) {
            row.forEach(function (value, index) {
                standardDeviations[index] += Math.pow((value - averages[index]), 2.0);
            });
        });
        standardDeviations = standardDeviations.map(function (value) {
            return Math.pow((value / examples), 0.5);
        });
        this.data.correlations = Array(pluginData.features.length)
            .fill([])
            .map(function (value) { return Array(pluginData.features.length)
            .fill(0.0); });
        for (var correlationI = 1; correlationI < pluginData.features.length; ++correlationI) {
            for (var correlationJ = 0; correlationJ < correlationI; ++correlationJ) {
                var value = 0.0;
                for (var i = 0; i < pluginData.examples.length; ++i) {
                    var xi = pluginData.examples[i][correlationI];
                    var uX = averages[correlationI];
                    var yi = pluginData.examples[i][correlationJ];
                    var uY = averages[correlationJ];
                    var stdX = standardDeviations[correlationI];
                    var stdY = standardDeviations[correlationJ];
                    value += ((xi - uX) * (yi - uY) / (stdX * stdY) - value) / (i + 1);
                }
                this.data.correlations[correlationI][correlationJ] = value;
                this.data.correlations[correlationJ][correlationI] = value;
            }
        }
    };
    CorrelogramPlot.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    return CorrelogramPlot;
}(data_science_lab_core_1.VisualizationPlugin));
exports.CorrelogramPlot = CorrelogramPlot;
var CorrelogramPlotPluginInputs = /** @class */ (function (_super) {
    __extends(CorrelogramPlotPluginInputs, _super);
    function CorrelogramPlotPluginInputs(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        return _this;
    }
    CorrelogramPlotPluginInputs.prototype.submit = function (inputs) {
        if (inputs['features'] === undefined) {
            throw new Error("Correlogram Plot's submit expecting plugin data with key features");
        }
        else {
            this.visualization.submit(inputs['features']);
        }
    };
    CorrelogramPlotPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to Plot',
                min: 2,
                type: 'number'
            }
        ];
    };
    return CorrelogramPlotPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var CorrelogramPlotPluginOptions = /** @class */ (function (_super) {
    __extends(CorrelogramPlotPluginOptions, _super);
    function CorrelogramPlotPluginOptions(visualization) {
        var _this = _super.call(this) || this;
        _this.visualization = visualization;
        _this.state = 1;
        return _this;
    }
    CorrelogramPlotPluginOptions.prototype.submit = function (inputs) {
        if (inputs['title'] !== '') {
            this.visualization.setTitle(inputs['title']);
        }
        this.state = 2;
    };
    CorrelogramPlotPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.TextOption({
                id: 'title',
                label: 'Provide a title (if you wish to include one)',
                min: 0,
            }),
        ];
    };
    CorrelogramPlotPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return CorrelogramPlotPluginOptions;
}(data_science_lab_core_1.PluginOptions));
