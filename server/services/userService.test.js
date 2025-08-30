import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Repository } from '../repository/userRepository.js';
import { generateUniqueRaId } from './userService.js';

vi.mock('../repository/userRepository.js', () => ({
  Repository: {
    checkRaIdExists: vi.fn(),
  },
}));

describe('generateUniqueRaId', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('retourne les initiales si elles sont uniques', async () => {
    Repository.checkRaIdExists.mockResolvedValue(false);
    const raId = await await generateUniqueRaId('Victor', 'Durant');
    expect(raId).toBe('VD');
    console.log('resultat du raID ( test ) :', raId);
  });

  test('ajoute un suffixe si les initiales existent déjà', async () => {
    Repository.checkRaIdExists.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    const raId = await generateUniqueRaId('Victor', 'Durant');
    expect(raId).toBe('VD1');
    console.log('resultat du raID ( test ) :', raId);
  });
  test("ajoute un suffixe jusqu'a trouver un RA_ID libre", async () => {
    Repository.checkRaIdExists
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    const raId = await generateUniqueRaId('Victor', 'Durant');
    expect(raId).toBe('VD5');
    console.log('resultat du raID ( test ) :', raId);
  });
});
