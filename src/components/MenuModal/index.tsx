"use client";
import React from "react";
import { IoFastFood } from "react-icons/io5";

// Data
import { products } from "@/data/Products";

// Components
import { Card } from "../Card";

// Type
type MenuModalProps = {
  name: string;
  search: string;
};

export function MenuModal({ name, search }: MenuModalProps){
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;

    const filteredProducts = products.filter((product) => {
        const matchesCategory = name === "Todos os produtos" || product.category === name;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    React.useEffect(() => {
        function changeCurrent(){
            setCurrentPage(1);
        }
        changeCurrent()
    }, [name]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <IoFastFood size={32} color="#fff" />

        <h1 className="font-google font-bold text-2xl">
          {name}
        </h1>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6
        ${currentProducts.length === 0 && `md:grid-cols-1 xl:grid-cols-1`}`}>
        {currentProducts.length === 0 ? (
            <>
                <h1 className="font-google text-2xl text-center">Nenhum produto encontrado.</h1>
            </>
        ):(
            <>
                {currentProducts.map((product) => (
                    <Card
                     key={product.id}
                     product={product}
                    />
                ))}
            </>
        )}
      </div>
      <div className="flex justify-end items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`
                        w-10 h-10 rounded-md
                        font-google font-semibold
                        transition-all
                    ${
                        currentPage === page
                        ? "bg-[#F97318] text-black"
                        : "border border-[#505050] text-white hover:bg-[#1D1D1D]"
                    }
                    `}>
                    {page}
                </button>
                );
            })}
        </div>
    </div>
  );
}