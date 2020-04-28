import { VisualizationPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
interface LinePlotInput {
    x: number[];
    y: number[];
    xLabel: string;
    yLabel: string;
    color: string;
    title?: string;
    curve: string;
}
export declare class LinePlot extends VisualizationPlugin {
    options: LinePlotPluginOptions;
    inputs: LinePlotPluginInputs;
    data: LinePlotInput;
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
declare class LinePlotPluginInputs extends PluginInputs {
    visualization: LinePlot;
    constructor(visualization: LinePlot);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class LinePlotPluginOptions extends PluginOptions {
    visualization: LinePlot;
    state: number;
    constructor(visualization: LinePlot);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
