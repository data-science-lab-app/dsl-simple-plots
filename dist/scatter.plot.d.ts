import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
interface ScatterPlotInput {
    x: number[];
    y: number[];
    xLabel: string;
    yLabel: string;
    color: string;
    title?: string;
}
export declare class ScatterPlot extends VisualizationPlugin {
    options: ScatterPlotPluginOptions;
    inputs: ScatterPlotPluginInputs;
    data: ScatterPlotInput;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    visualization(): string;
    setX(points: number[], label: string): void;
    setY(points: number[], label: string): void;
    setColor(color: string): void;
    setTitle(title: string): void;
}
declare class ScatterPlotPluginInputs extends PluginInputs {
    visualization: ScatterPlot;
    constructor(visualization: ScatterPlot);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ScatterPlotPluginOptions extends PluginOptions {
    visualization: ScatterPlot;
    state: number;
    constructor(visualization: ScatterPlot);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
