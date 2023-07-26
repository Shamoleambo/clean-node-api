import type { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import type { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { LogControllerDecorator } from './log'
import type { AccountModel } from '../../domain/models/account'

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => { resolve(ok(makeFakeAccount())) })
    }
  }
  return new ControllerStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepository implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }

  return new LogErrorRepository()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => { resolve(makeFakeServerError()) }))

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
