import { Cep } from "@/types/Cep";
import axios from "axios";

const req = axios.create({
  baseURL: `https://viacep.com.br/ws/01001000/json/`,
});

// let cep = "01001000";

export const getCep = async (cep: string): Promise<Cep> => {
  const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return result.data;
};
