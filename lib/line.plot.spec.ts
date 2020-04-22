import { LinePlot } from "./line.plot"

describe('Line Plot Tests', () => {
    let visualization: LinePlot;

    beforeEach(() => {
        visualization = new LinePlot();
    });

    it('options should return false for no more', () => {
        expect(visualization.getOptions().noMore()).toBeFalsy();
    });

    it('options should return three options', () => {
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

    it('inputs should return two inputs', () => {
        expect(visualization.getInputs().inputs().length).toBe(2);
    });

    it('visualize should set data with title', () => {
        visualization.getOptions().submit({
            title: 'My title',
            color: 'red',
            curve: 'Step'
        });
        visualization.getInputs().submit({
            x: {
                features: ['x label'],
                examples: [[1],[2],[3],[4],[5]]
            },
            y: {
                features: ['y label'],
                examples: [[1],[2],[3],[4],[5]]
            },
        });
        expect(visualization.data).toEqual({
            x: [1,2,3,4,5],
            y: [1,2,3,4,5],
            xLabel: 'x label',
            yLabel: 'y label',
            title: 'My title',
            color: 'red',
            curve: 'Step'
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });

    it('submit should throw for not providing x', (done) => {
        try {
            visualization.getInputs().submit({
                y: {
                    features: ['y label'],
                    examples: [[1],[2],[3],[4],[5]]
                },
            });
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('submit should throw for not providing y', (done) => {
        try {
            visualization.getInputs().submit({
                x: {
                    features: ['x label'],
                    examples: [[1],[2],[3],[4],[5]]
                },
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
            curve: 'Step'
        });
        visualization.getInputs().submit({
            x: {
                features: ['x label'],
                examples: [[1],[2],[3],[4],[5]]
            },
            y: {
                features: ['y label'],
                examples: [[1],[2],[3],[4],[5]]
            },
        });
        expect(visualization.data).toEqual({
            x: [1,2,3,4,5],
            y: [1,2,3,4,5],
            xLabel: 'x label',
            yLabel: 'y label',
            color: 'red',
            title: undefined,
            curve: 'Step'
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });
    
    it('visualize should set data with hex color', () => {
        visualization.getOptions().submit({
            color: 'red',
            curve: 'Step',
            hexColor: '#000000'
        });
        visualization.getInputs().submit({
            x: {
                features: ['x label'],
                examples: [[1],[2],[3],[4],[5]]
            },
            y: {
                features: ['y label'],
                examples: [[1],[2],[3],[4],[5]]
            },
        });
        expect(visualization.data).toEqual({
            x: [1,2,3,4,5],
            y: [1,2,3,4,5],
            xLabel: 'x label',
            yLabel: 'y label',
            color: '#000000',
            title: undefined,
            curve: 'Step'
        });
        expect(visualization.getOptions().noMore()).toBeTruthy();
    });


});

