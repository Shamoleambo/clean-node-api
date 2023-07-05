import type { AddAccountModel } from '../../domain/usescases/add-account'
import type { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
