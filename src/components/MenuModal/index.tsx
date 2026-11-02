"use client";
import React from "react";
import { IoFastFood } from "react-icons/io5";

// Types
import type { Product } from "@/types/Products";

// Functions
import { getAllProducts } from "@/function/getAllProducts";

// Components
import { Card } from "../Card";

type MenuModalProps = {
  name: string;
  search: string;
  categoryId?: string | null;
};

export function MenuModal({ name, search, categoryId = null }: MenuModalProps){
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const itemsPerPage = 6;

  React.useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(false);

        const data = await getAllProducts();

        if (!cancelled) {
          setProducts(data ?? []);
        }
      } catch (err) {
        console.error("Erro ao carregar produtos do cardápio:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = React.useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    return products.filter((product)=> {
      const matchesCategory =
        categoryId != null
          ? String(product.category) === categoryId
          : name === "Todos os produtos" || product.category === name;

      const matchesSearch = product.name
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, categoryId, name, search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full min-w-0 flex flex-col gap-5 sm:gap-6 md:gap-8">

      {/* TÍTULO DA CATEGORIA */}
      <div className="flex items-center gap-2 min-w-0">
        <IoFastFood
          size={26}
          color="#fff"
          className="shrink-0 md:w-8 md:h-8"
        />

        <h1 className="font-google font-bold text-lg sm:text-xl md:text-2xl truncate">
          {name}
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 font-google py-8">
          Carregando produtos...
        </p>
      ) : error ? (
        <p className="text-center text-red-400 font-google py-8">
          Não foi possível carregar os produtos. Tente novamente.
        </p>
      ) : (
        <>
          {/* PRODUTOS */}
          <div
            className={`w-full min-w-0 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 ${
              currentProducts.length === 0
                ? "grid-cols-1 md:grid-cols-1 xl:grid-cols-1"
                : ""
            }`}
          >
            {currentProducts.length === 0 ? (
              <p className="col-span-full font-google text-sm sm:text-base md:text-xl text-center py-8">
                Nenhum produto encontrado.
              </p>
            ) : (
              currentProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))
            )}
          </div>

          {/* PAGINAÇÃO */}
          {totalPages > 1 && (
            <div className="flex justify-center md:justify-end items-center flex-wrap gap-2 mt-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={
                      safeCurrentPage === page ? "page" : undefined
                    }
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md font-google font-semibold text-sm sm:text-base transition-all ${
                      safeCurrentPage === page
                        ? "bg-[#F97318] text-black"
                        : "border border-[#505050] text-white hover:bg-[#1D1D1D]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
