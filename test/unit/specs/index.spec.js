
import pkg from '../../../';

export default function IndexSpec() {
  describe('sanity', () => {
    it('should be a function', () => {
      expect(pkg).to.be.a.function;
    });
  });

  describe('happy path', () => {
  });

  describe('sad path', () => {
  });

  describe('bad path', () => {
  });
}
