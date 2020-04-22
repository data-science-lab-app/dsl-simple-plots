import { HistogramPlot } from "./histogram.plot"

describe('Histogram Plot Tests', () => {
    let visualization: HistogramPlot;

    beforeEach(() => {
        visualization = new HistogramPlot();
    });

    it('options should return false for no more', () => {
        expect(visualization.getOptions().noMore()).toBeFalsy();
    });

    it('options should return four options', () => {
        expect(visualization.getOptions().options().length).toBe(4);
    });

    it('submit should be no more afterwards', () => {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red',
            curve: 'Step'
        });

        expect(visualization.getOptions().noMore()).toBeTruthy();
    });

    it('inputs should return one inputs', () => {
        expect(visualization.getInputs().inputs().length).toBe(1);
    });

    it('visualize should set data with title', () => {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red',
            bins: 3
        });
        visualization.getInputs().submit({
            values: {
                features: ['x label'],
                examples: [[1],[2],[3],[4],[5]]
            },
        });
        expect(visualization.data).toEqual({
            values: [1,2,3,4,5],
            label: 'x label',
            title: 'My title',
            color: 'red',
            bins: 3,
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });

    it('submit should throw for not providing values', (done) => {
        try {
            visualization.getInputs().submit({
            });
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    
    it('visualize should set data without title', () => {
        visualization.getOptions().submit({
            color: 'red',
            bins: 3,
        });
        visualization.getInputs().submit({
            values: {
                features: ['x label'],
                examples: [[1],[2],[3],[4],[5]]
            },
        });
        expect(visualization.data).toEqual({
            values: [1,2,3,4,5],
            label: 'x label',
            color: 'red',
            title: undefined,
            bins: 3
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    
    it('visualize should set data with hex color', () => {
        visualization.getOptions().submit({
            color: 'red',
            bins: 3,
            hexColor: '#000000',
        });
        visualization.getInputs().submit({
            values: {
                features: ['x label'],
                examples: [[1],[2],[3],[4],[5]]
            },
        });
        expect(visualization.data).toEqual({
            values: [1,2,3,4,5],
            label: 'x label',
            color: '#000000',
            title: undefined,
            bins: 3
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });


});

