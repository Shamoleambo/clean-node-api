import { MongoHelper } from '../helpers/mongo-helper'
import type { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import type { AddAccountModel } from '../../../../domain/usescases/add-account'
import type { AccountModel } from '../../../../domain/models/account'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const { _id, ...account } = await accountCollection.findOne({ _id: insertedId })

    account.id = _id.toString()
    return account as AccountModel
  }
}
