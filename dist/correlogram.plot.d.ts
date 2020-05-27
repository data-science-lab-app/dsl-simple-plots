import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
interface CorrelogramPlotInput {
    correlations: number[][];
    labels: string[];
    title?: string;
}
export declare class CorrelogramPlot extends VisualizationPlugin {
    options: CorrelogramPlotPluginOptions;
    inputs: CorrelogramPlotPluginInputs;
    data: CorrelogramPlotInput;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    visualization(): string;
    submit(pluginData: PluginData): void;
    setTitle(title: string): void;
}
declare class CorrelogramPlotPluginInputs extends PluginInputs {
    visualization: CorrelogramPlot;
    constructor(visualization: CorrelogramPlot);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class CorrelogramPlotPluginOptions extends PluginOptions {
    visualization: CorrelogramPlot;
    state: number;
    constructor(visualization: CorrelogramPlot);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
