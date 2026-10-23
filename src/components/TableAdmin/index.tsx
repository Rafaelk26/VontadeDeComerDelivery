"use client";
import Image from "next/image";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

// Data
import { Product } from "@/types/Products";

type ProductTableProps = {
  product: Product;
  onEdit: (product: Product)=> void;
  onDelete: (id: string)=> void;
  onToggleStatus: (id: string, status: boolean)=> void;
};

export function ProductTable({ product, onEdit, onDelete, onToggleStatus }: ProductTableProps) {
  const [active, setActive] = useState(product.status);

  function handleToggle() {
    const nextStatus = !active;
    setActive(nextStatus);
    onToggleStatus(product.id, nextStatus);
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#383838] bg-[#0c0c0c] shrink-0">

      {/* Produto */}
      <div className="grid grid-cols-[42px_minmax(0,1fr)_76px_72px_62px_64px] items-center gap-2 px-4 py-3 transition-colors 
      hover:bg-[#151515]">
        {/* Foto */}
        <Image
          width={1000}
          height={1000}
          src={product.image}
          alt={product.name}
          className="h-10 w-12 rounded-md border border-[#383838] object-cover"
        />

        {/* Nome e descrição */}
        <div className="min-w-0">
          <p className="truncate font-medium text-white font-google text-base">
            {product.name}
          </p>
          <p className="truncate text-sm text-[#929292] font-google">
            {product.description}
          </p>
        </div>

        {/* Categoria */}
        <span className="w-fit max-w-full truncate rounded-full bg-[#414141] px-2 py-1 text-[12px] text-white font-google">
          {product.category}
        </span>

        {/* Preço */}
        <span className="whitespace-nowrap text-sm font-semibold text-white font-google">
          {Number(product.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        {/* Status */}
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={`Produto ${product.name}: ${active ? "ativo" : "inativo"}`}
          onClick={handleToggle}
          className={`relative flex h-3.5 w-7 items-center rounded-full transition-colors cursor-pointer ${
            active ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full bg-white shadow-sm transition-transform ${
              active ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>

        {/* Ações */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => onEdit(product)}
            aria-label="Editar produto"
            className="cursor-pointer"
          >
            <FiEdit2 size={20} color={"#fff"} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
            aria-label="Excluir produto"
            className="cursor-pointer"
          >
            <MdDeleteOutline size={24} color={"#fff"} />
          </button>
        </div>
      </div>
    </div>
  );
}
