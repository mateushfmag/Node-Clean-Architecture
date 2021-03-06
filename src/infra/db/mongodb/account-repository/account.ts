import { AddAccountRepository } from "@data/protocols/add-account-repository";
import { AccountModel } from "@domain/models/Account";
import { AddAccountModel } from "@domain/usecases/add-account";
import { mongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = mongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);

    return mongoHelper.map(result, accountData);
  }
}
