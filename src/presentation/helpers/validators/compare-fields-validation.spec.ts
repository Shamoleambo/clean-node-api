import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  test('should return an InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('fieldOne', 'fieldTwo')
    const error = sut.validate({ fieldOne: 'value_one', fieldTwo: 'value_two' })

    expect(error).toEqual(new InvalidParamError('fieldTwo'))
  })
})
