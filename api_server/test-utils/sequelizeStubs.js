import { jest } from '@jest/globals';

/**
 * Create a stubbed Sequelize-style model where every common method is a jest.fn().
 * Tests pre-program these with mockResolvedValueOnce / mockRejectedValueOnce.
 */
export function makeModelStub() {
  return {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findOrCreate: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
  };
}
