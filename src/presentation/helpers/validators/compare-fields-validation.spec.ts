import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('CompareFields Validation', () => {
  test('should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'value_one', fieldToCompare: 'value_two' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'value', fieldToCompare: 'value' })

    expect(error).toBeFalsy()
  })
})
