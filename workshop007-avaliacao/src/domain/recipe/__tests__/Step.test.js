const Step = require('../Step');
const Id = require('../../Id');

describe('Domain / Recipe / Step', () => {
  describe('#create', () => {
    describe('when valid data is passed with id', () => {
      it('creates a step', () => {
        const step = Step.create({
          id: '21cea63a-b2f0-4ea0-a9dd-bce3e1efa3c1',
          description: 'Appreciate the sound of frying bacon',
          position: 1,
        });

        expect(step).toEqual({
          id: '21cea63a-b2f0-4ea0-a9dd-bce3e1efa3c1',
          description: 'Appreciate the sound of frying bacon',
          position: 1,
        });
      });
    });

    describe('when valid data is passed without an id', () => {
      it('creates a step with a generated id', () => {
        const step = Step.create({
          description: 'Appreciate the sound of frying bacon',
          position: 1,
        });

        expect(step).toEqual({
          id: expect.stringMatching(Id.regex),
          description: 'Appreciate the sound of frying bacon',
          position: 1,
        });
      });
    });

    describe('when invalid data is passed', () => {
      it('throws a BusinessError', () => {
        expect(() => {
          Step.create({ position: -1 });
        }).toThrow(/required.*positive/g);
      });
    });
  });
});
