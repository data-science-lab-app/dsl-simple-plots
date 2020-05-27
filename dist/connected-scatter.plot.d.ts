import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
interface ConnectedScatterPlotInput {
    x: number[];
    y: number[];
    xLabel: string;
    yLabel: string;
    color: string;
    title?: string;
    curve: string;
}
export declare class ConnectedScatterPlot extends VisualizationPlugin {
    options: ConnectedScatterPlotPluginOptions;
    inputs: ConnectedScatterPlotPluginInputs;
    data: ConnectedScatterPlotInput;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    visualization(): string;
    setX(points: number[], label: string): void;
    setY(points: number[], label: string): void;
    setColor(color: string): void;
    setTitle(title: string): void;
    setCurve(curve: string): void;
}
declare class ConnectedScatterPlotPluginInputs extends PluginInputs {
    visualization: ConnectedScatterPlot;
    constructor(visualization: ConnectedScatterPlot);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ConnectedScatterPlotPluginOptions extends PluginOptions {
    visualization: ConnectedScatterPlot;
    state: number;
    constructor(visualization: ConnectedScatterPlot);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
