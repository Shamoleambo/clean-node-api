import { MissingParamError } from '../../errors'
import type { Validation } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): MissingParamError {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}
const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationStubs)

  return { sut, validationStubs }
}

describe('Validation Composite', () => {
  test('should return an error if validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new Error())
  })

  test('should not return if validations succeed', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })

    expect(error).toBeFalsy()
  })
})
