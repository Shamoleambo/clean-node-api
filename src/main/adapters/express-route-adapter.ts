import type { Request, Response, RequestHandler } from 'express'
import type { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller): RequestHandler => {
  const expressHanlder = async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }

  return expressHanlder as RequestHandler
}
