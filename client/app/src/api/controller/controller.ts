import axios from "axios";

//TODO: Quando for dado Deploy, mudar a url para a url do servidor
const apiUrl = "http://localhost:3000/local/api/getAll";

export async function getAll() {
  const response = await axios.get(apiUrl);
  return response;
}
