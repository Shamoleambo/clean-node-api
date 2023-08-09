import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  test('should return an InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'value_one', fieldToCompare: 'value_two' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeeds', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const validate = jest.spyOn(sut, 'validate')

    expect(validate).not.toReturn()
  })
})
