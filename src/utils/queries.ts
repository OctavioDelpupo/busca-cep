import { getCep } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

// export const useCep = () => {
//   const query = useQuery({ queryKey: ["cep"], queryFn: getPosts });
//   return query;
// };

export const useCep = (cep: string) => {
  const query = useQuery({
    queryKey: ["cep", cep],
    queryFn: () => getCep(cep),
  });
  return query;
};
