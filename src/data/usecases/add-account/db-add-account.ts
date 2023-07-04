import type { Encrypter } from '../../protocols/encrypter'
import type { AddAccount, AddAccountModel } from '../../../domain/usescases/add-account'
import type { AccountModel } from '../../../domain/models/account'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => { resolve(null) })
  }
}
