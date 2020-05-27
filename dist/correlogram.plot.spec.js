"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var correlogram_plot_1 = require("./correlogram.plot");
describe('Correlogram Plot Tests', function () {
    var visualization;
    beforeEach(function () {
        visualization = new correlogram_plot_1.CorrelogramPlot();
    });
    it('options should return false for no more', function () {
        expect(visualization.getOptions().noMore()).toBeFalsy();
    });
    it('options should return one options', function () {
        expect(visualization.getOptions().options().length).toBe(1);
    });
    it('submit should be no more afterwards', function () {
        visualization.getOptions().submit({
            title: 'My title',
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    it('inputs should return one inputs', function () {
        expect(visualization.getInputs().inputs().length).toBe(1);
    });
    it('visualize should set data with title', function () {
        visualization.getOptions().submit({
            title: 'My title',
        });
        visualization.getInputs().submit({
            features: {
                features: ['x', 'y'],
                examples: [[1, 5], [2, 20], [4, 40], [5, 80], [8, 100]]
            },
        });
        expect(visualization.data.title).toEqual('My title');
        expect(visualization.data.labels).toEqual(['x', 'y']);
        expect(visualization.data.correlations[0][0]).toBeCloseTo(0);
        expect(visualization.data.correlations[0][1]).toBeCloseTo(0.9684);
        expect(visualization.data.correlations[1][1]).toBeCloseTo(0);
        expect(visualization.data.correlations[1][0]).toBeCloseTo(0.9684);
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
            title: '',
        });
        visualization.getInputs().submit({
            features: {
                features: ['x', 'y'],
                examples: [[1, 5], [2, 20], [4, 40], [5, 80], [8, 100]]
            },
        });
        expect(visualization.data.title).toEqual(undefined);
        expect(visualization.data.labels).toEqual(['x', 'y']);
        expect(visualization.data.correlations[0][0]).toBeCloseTo(0);
        expect(visualization.data.correlations[0][1]).toBeCloseTo(0.9684);
        expect(visualization.data.correlations[1][1]).toBeCloseTo(0);
        expect(visualization.data.correlations[1][0]).toBeCloseTo(0.9684);
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
});
