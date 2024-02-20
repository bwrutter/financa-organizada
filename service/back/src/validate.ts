import {
  createAccount,
  getAccount,
  deleteAccount,
  updateAccount,
} from "./dynamo.ts";

//TODO: Ajsutar os returns
export async function validategetAccount(params: any) {
  const response = await getAccount(params);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
    }),
  };
}

export async function validatepostAccount(body: Account) {
  const response = await createAccount(body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
    }),
  };
}

export async function validatedeleteAccount(params: any) {
  if (params) {
    const response = await deleteAccount(params);
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

export async function validateUpdateAccount(body: Account) {
  const response = await updateAccount(body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
    }),
  };
}

type Account = {
  id: string;
  name: string;
  value: number;
};
