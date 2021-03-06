import { mongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";
import env from "@main/config/env";

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await mongoHelper.connect(env.mongoUrl);
  });
  beforeEach(async () => {
    const accountCollection = await mongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });
  afterAll(async () => {
    await mongoHelper.disconnect();
  });
  it("should return an account on success", async () => {
    const sut = makeSut();
    const data = {
      name: "valid-name",
      email: "valid-email@mail.com",
      password: "valid-password",
    };
    const account = await sut.add(data);
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe(data.name);
    expect(account.email).toBe(data.email);
    expect(account.password).toBe(data.password);
  });
});
