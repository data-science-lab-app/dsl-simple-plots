"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var histogram_plot_1 = require("./histogram.plot");
describe('Histogram Plot Tests', function () {
    var visualization;
    beforeEach(function () {
        visualization = new histogram_plot_1.HistogramPlot();
    });
    it('options should return false for no more', function () {
        expect(visualization.getOptions().noMore()).toBeFalsy();
    });
    it('options should return four options', function () {
        expect(visualization.getOptions().options().length).toBe(4);
    });
    it('submit should be no more afterwards', function () {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red',
            curve: 'Step'
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('inputs should return one inputs', function () {
        expect(visualization.getInputs().inputs().length).toBe(1);
    });
    it('visualize should set data with title', function () {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red',
            bins: 3
        });
        visualization.getInputs().submit({
            values: {
                features: ['x label'],
                examples: [[1], [2], [3], [4], [5]]
            },
        });
        expect(visualization.data).toEqual({
            values: [1, 2, 3, 4, 5],
            label: 'x label',
            title: 'My title',
            color: 'red',
            bins: 3,
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('submit should throw for not providing values', function (done) {
        try {
            visualization.getInputs().submit({});
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('visualize should set data without title', function () {
        visualization.getOptions().submit({
            color: 'red',
            bins: 3,
        });
        visualization.getInputs().submit({
            values: {
                features: ['x label'],
                examples: [[1], [2], [3], [4], [5]]
            },
        });
        expect(visualization.data).toEqual({
            values: [1, 2, 3, 4, 5],
            label: 'x label',
            color: 'red',
            title: undefined,
            bins: 3
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('visualize should set data with hex color', function () {
        visualization.getOptions().submit({
            color: 'red',
            bins: 3,
            hexColor: '#000000',
        });
        visualization.getInputs().submit({
            values: {
                features: ['x label'],
                examples: [[1], [2], [3], [4], [5]]
            },
        });
        expect(visualization.data).toEqual({
            values: [1, 2, 3, 4, 5],
            label: 'x label',
            color: '#000000',
            title: undefined,
            bins: 3
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
});
