import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
interface HistogramPlotInput {
    values: number[];
    label: string;
    color: string;
    title?: string;
    bins: number;
}
export declare class HistogramPlot extends VisualizationPlugin {
    options: HistogramPlotPluginOptions;
    inputs: HistogramPlotPluginInputs;
    data: HistogramPlotInput;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    visualization(): string;
    setValues(points: number[], label: string): void;
    setColor(color: string): void;
    setTitle(title: string): void;
    setBins(bins: number): void;
}
declare class HistogramPlotPluginInputs extends PluginInputs {
    visualization: HistogramPlot;
    constructor(visualization: HistogramPlot);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class HistogramPlotPluginOptions extends PluginOptions {
    visualization: HistogramPlot;
    state: number;
    constructor(visualization: HistogramPlot);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
