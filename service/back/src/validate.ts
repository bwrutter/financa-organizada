import { createAccount, getAccounts, deleteAccount } from "./dynamo.ts";

export async function validateGetAccounts(params: any) {
  if (params) {
    const response = await getAccounts(params.userId);
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

export async function validatePostAccounts(body: Account) {
  const { nome, valor, tipo } = body;
  if (nome || valor || tipo) {
    await createAccount(body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Account criada com sucesso",
      }),
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

//TODO: Verificar se é necessario incluir userId no delete, tendo em vista que o accountId(uuid) é unico
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
  userId: string;
  nome: string;
  valor: number;
  tipo: string;
};
