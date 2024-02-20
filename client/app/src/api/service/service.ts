import { getAll } from "../controller/controller";

//TODO: Implementar/Ajustar a função all
export async function all(): Promise<AccountFormated[] | Error> {
  try {
    const response = await getAll();

    if (!response.data || !response.data.message) {
      throw new Error("Resposta inválida");
    }

    const dadosFormatados = formatarDados(response.data.message);
    return dadosFormatados;
  } catch (error) {
    console.error("Erro ao obter dados:", (error as Error).message);
    return new Error("Falha ao obter dados");
  }
}

function formatarDados(dadosBrutos: Account[]): AccountFormated[] {
  return dadosBrutos.map((objeto) => ({
    nome: objeto._name.S,
    valor: Number(objeto.value.N),
    id: objeto._id.S,
  }));
}

type Account = {
  _name: { S: string };
  value: { N: string };
  _id: { S: string };
};

type AccountFormated = {
  nome: string;
  valor: number;
  id: string;
};
