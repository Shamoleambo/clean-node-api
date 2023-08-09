import { MissingParamError } from '../../errors'
import type { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('should return an error if validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): MissingParamError {
        return new MissingParamError('field')
      }
    }

    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
