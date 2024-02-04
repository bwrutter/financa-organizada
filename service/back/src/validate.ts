import { createAccount, getAccounts, deleteAccount } from "./dynamo.ts";

//TODO: Ajsutar os returns
export async function validateGetAccounts(params: any) {
  const response = await getAccounts(params);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
    }),
  };
}

export async function validatePostAccounts(body: Account) {
  const response = await createAccount(body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
    }),
  };
}

export async function validateDeleteAccounts(params: any) {
  if (params) {
    const response = await deleteAccount(params.accountId);
    return {
      statusCode: 200,
      body: response,
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Campo não informado",
      }),
    };
  }
}

type Account = {
  id: string;
  name: string;
  value: number;
};
