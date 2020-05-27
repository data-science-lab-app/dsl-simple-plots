"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scatter_plot_1 = require("./scatter.plot");
describe('Scatter Plot Tests', function () {
    var visualization;
    beforeEach(function () {
        visualization = new scatter_plot_1.ScatterPlot();
    });
    it('options should return false for no more', function () {
        expect(visualization.getOptions().noMore()).toBeFalsy();
    });
    it('options should return three options', function () {
        expect(visualization.getOptions().options().length).toBe(2);
    });
    it('submit should be no more afterwards', function () {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red'
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('inputs should return two inputs', function () {
        expect(visualization.getInputs().inputs().length).toBe(2);
    });
    it('visualize should set data with title', function () {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red'
        });
        visualization.getInputs().submit({
            x: {
                features: ['x label'],
                examples: [[1], [2], [3], [4], [5]]
            },
            y: {
                features: ['y label'],
                examples: [[1], [2], [3], [4], [5]]
            },
        });
        expect(visualization.data).toEqual({
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 3, 4, 5],
            xLabel: 'x label',
            yLabel: 'y label',
            title: 'My title',
            color: 'red'
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('submit should throw for not providing x', function (done) {
        try {
            visualization.getInputs().submit({
                y: {
                    features: ['y label'],
                    examples: [[1], [2], [3], [4], [5]]
                },
            });
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('submit should throw for not providing y', function (done) {
        try {
            visualization.getInputs().submit({
                x: {
                    features: ['x label'],
                    examples: [[1], [2], [3], [4], [5]]
                },
            });
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('visualize should set data without title', function () {
        visualization.getOptions().submit({
            color: 'red'
        });
        visualization.getInputs().submit({
            x: {
                features: ['x label'],
                examples: [[1], [2], [3], [4], [5]]
            },
            y: {
                features: ['y label'],
                examples: [[1], [2], [3], [4], [5]]
            },
        });
        expect(visualization.data).toEqual({
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 3, 4, 5],
            xLabel: 'x label',
            yLabel: 'y label',
            color: 'red',
            title: undefined
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('visualize should set data with hex color', function () {
        visualization.getOptions().submit({
            color: 'red',
            hexColor: '#000000'
        });
        visualization.getInputs().submit({
            x: {
                features: ['x label'],
                examples: [[1], [2], [3], [4], [5]]
            },
            y: {
                features: ['y label'],
                examples: [[1], [2], [3], [4], [5]]
            },
        });
        expect(visualization.data).toEqual({
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 3, 4, 5],
            xLabel: 'x label',
            yLabel: 'y label',
            color: '#000000',
            title: undefined
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
});
