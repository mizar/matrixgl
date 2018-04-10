import { Quaternion } from '../src/quaternion';
import { Vector3 } from '../src/float32vector';
import './lib/array_close_to';

const delta = 0.001;

describe('Quaternion', () => {
  test('toRotationMatrix4', () => {
    const axis = new Vector3(1, 2, 3).normalize();
    const rad = 45.6 * Math.PI / 180;
    const quaternion = Quaternion.rotationAround(axis, rad);
    const rotationMatrix = quaternion.toRotationMatrix4();
    const expected = [
      0.7211159467697144, 0.6157578229904175, -0.3175438642501831, 0,
      -0.5299473404884338, 0.7854738235473633, 0.3196665644645691, 0,
      0.4462595582008362, -0.062235139310359955, 0.8927369117736816, 0,
      0, 0, 0, 1,
    ];

    expect(rotationMatrix.values).arrayToBeCloseTo(expected, delta);
  });

  test('normalize', () => {
    const normalized = new Quaternion(1, 2, 3, 4).normalize();
    const expected = [0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214];

    expect(normalized.values).arrayToBeCloseTo(expected, delta);
  });

  test('normalize with zero norm', () => {
    const normalized = new Quaternion(0, 0, 0, 0).normalize();
    expect(normalized.values).arrayToBeCloseTo([0, 0, 0, 0], delta);
  });

  test('slerp', () => {
    const q1 = new Quaternion(1, 2, 3, 4).normalize();
    const q2 = new Quaternion(5, 6, 7, 8).normalize();
    const s = q1.slerp(q2, 0.123);
    const expected = [0.20761071976221868, 0.37753696937382647, 0.5474632189854343, 0.717389468597042];

    expect(s.values).arrayToBeCloseTo(expected, delta);
  });
});
