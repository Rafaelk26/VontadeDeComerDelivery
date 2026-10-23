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

export function MenuModal({ name, search, categoryId = null }: MenuModalProps) {
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

        return products.filter((product) => {
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
    const safeCurrentPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <IoFastFood size={32} color="#fff" />

        <h1 className="font-google font-bold text-2xl">
          {name}
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 font-google">
          Carregando produtos...
        </p>
      ) : error ? (
        <p className="text-center text-red-400 font-google">
          Não foi possível carregar os produtos. Tente novamente.
        </p>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${
              currentProducts.length === 0
                ? "md:grid-cols-1 xl:grid-cols-1"
                : ""
            }`}
          >
            {currentProducts.length === 0 ? (
              <p className="font-google text-xl text-center">
                Nenhum produto encontrado.
              </p>
            ) : (
              currentProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={safeCurrentPage === page ? "page" : undefined}
                    className={`w-10 h-10 rounded-md font-google font-semibold transition-all ${
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