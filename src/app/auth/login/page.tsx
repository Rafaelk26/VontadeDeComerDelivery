"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

// Context and server
import { supabase } from "@/server/supabase/supabase";
import { useUser } from "@/context/User/useUser";

// Components
import { Input, InputPassword } from "@/components/Input";
import { Button } from "@/components/Button";

// Assets
import bgLogin from "../../../../public/Caldo.png";
import logoOficial from "../../../../public/Logo.png";


export default function LoginForm(){

  // SERVER
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleUserInContext } = useUser();

  // FORMS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOADING
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(email: string, password: string){
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if(error || !data.user){
        toast.error("Usuário ou senha inválidos!");
        return;
      }

      handleUserInContext({
        id: data.user.id,
        name:
          data.user.user_metadata?.name ??
          data.user.email ??
          "Administrador",
        email: data.user.email ?? "",
      });

      // Recupera a rota original solicitada pelo usuário.
      const next = searchParams.get("next");

      const destination =
        next?.startsWith("/") && !next.startsWith("//")
          ? next
          : "/admin/home";

      console.log("[LOGIN] Autenticação concluída");
      console.log("[LOGIN] Parâmetro next:", next);
      console.log("[LOGIN] Destino:", destination);

      toast.success("Login efetuado!");
      router.replace(destination);
      router.refresh();

    } catch (error) {
      console.error("Erro ao realizar login:", error);
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(){
    if (!email.trim() || !password) {
      toast.error("Preencha seu e-mail e sua senha!");
      return;
    }

    void handleLogin(email.trim(), password);
  }

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Image
        src={bgLogin}
        alt="Plano de fundo"
        width={5000}
        height={5000}
        priority
        className="absolute -z-20 h-screen w-full object-cover opacity-20 blur-xl"
      />

      <div className="flex w-full max-w-96 flex-col items-center rounded-2xl border-[.5px] border-[#F97318]/80 px-6 py-8">
        <Image
          src={logoOficial}
          alt="Logo oficial"
          width={1000}
          height={1000}
          priority
          className="h-24 w-24 object-contain"
        />

        <h1 className="mt-4 font-google text-4xl font-medium text-white">
          Login
        </h1>

        <span className="mt-4 w-48 text-center font-google text-base font-light text-white">
          Faça o login para administrar seu negócio.
        </span>

        <form
          className="mt-10 flex w-full flex-col gap-4"
          onSubmit={(event)=> {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            onChange={(event)=> setEmail(event.target.value)}
            value={email}
            name="Email"
            type="email"
          />

          <InputPassword
            onChange={(event)=> setPassword(event.target.value)}
            value={password}
            name="Senha"
          />

          <div className="mt-4">
            <Button
              onClick={handleSubmit}
              text={isLoading ? "Entrando..." : "Entrar"}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
