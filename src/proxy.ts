
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  
  const { data: { user }, error } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Bloqueia o acesso ao admin sem usuário válido.
  if(pathname.startsWith("/admin") && (error || !user)){
    const url = request.nextUrl.clone();

    url.pathname = "/auth/login";
    url.search = "";
    url.searchParams.set("next", pathname);

    return NextResponse.redirect(url);
  }

  // Se já estiver autenticado, não precisa voltar ao login.
  if(pathname === "/auth/login" && !error && user){
    const next = request.nextUrl.searchParams.get("next");

    const destination =
      next?.startsWith("/") && !next.startsWith("//")
      ? next
      : "/admin/home";

    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.search = "";

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};