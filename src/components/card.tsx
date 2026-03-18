import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";
import { useCep } from "@/utils/queries";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const cepSchema = z.object({
  cep: z
    .string()
    .length(9, "O CEP deve ter exatamente 9 caracteres (ex: 12345-678)")
    .regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido, use 12345-678"),
});

export const CardForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchCep, setSearchCep] = useState("");
  const cep = useCep(searchCep);

  const form = useForm<z.infer<typeof cepSchema>>({
    resolver: zodResolver(cepSchema),
    defaultValues: {
      cep: "",
    },
  });

  function onSubmit(data: z.infer<typeof cepSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  const handleSearchCep = () => {
    setLoading(true);
    setSearchCep(form.getValues("cep"));
  };

  useEffect(() => {
    if (!cep.isLoading) {
      setLoading(false);
      if (cep.data) {
        setDisabled(true);
      }
    }
  }, [cep.isLoading, cep.data]);

  const handleReset = () => {
    form.reset();
    setDisabled(false);
    setSearchCep("");
  };
  return (
    <div className="container max-w-4xl mx-auto px-4 mt-5">
      <Card className="border border-black">
        <CardHeader>
          <CardTitle>Encontre seu CEP</CardTitle>
          <CardDescription>
            Digite o endereço ou o CEP para localizar rapidamente a região
            desejada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-cep" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="cep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cep">CEP</FieldLabel>
                    <Input
                      {...field}
                      id="cep"
                      disabled={disabled}
                      aria-invalid={fieldState.invalid}
                      className="border border-black rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Field>
            <Button
              type="button"
              variant="outline"
              className="border border-gray-600 rounded-md"
              onClick={() => {
                form.reset();
                handleReset();
              }}
            >
              Limpar
            </Button>
            <Button
              type="submit"
              form="form-cep"
              className="rounded-md"
              onClick={handleSearchCep}
            >
              Buscar
            </Button>
          </Field>

          <Field>
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500 mt-5">
                <Loader2 className="animate-spin h-5 w-5" />
                Buscando Cep...
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rua</TableHead>
                    <TableHead>Bairro</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>UF</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {cep.data && (
                    <TableRow>
                      <TableCell>{cep.data.logradouro}</TableCell>
                      <TableCell>{cep.data.bairro}</TableCell>
                      <TableCell>{cep.data.localidade}</TableCell>
                      <TableCell>{cep.data.uf}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};
