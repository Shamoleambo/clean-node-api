import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_value') })
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')

    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')

    expect(hash).toBe('hashed_value')
  })

  test('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
