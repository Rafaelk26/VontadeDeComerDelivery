"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

// Components
import { Input } from "@/components/Input";
import { Button, ButtonCancel } from "@/components/Button";

// Functions
import { uploadProductImage } from "@/function/uploadProductImage";
import { handleProductUpdate } from "@/function/handleProductUpdate";

// Cache
import { clearAdminDataCache } from "@/lib/cache/adminCache";

// Types
import type { Category } from "@/types/Categories";
import type { Product } from "@/types/Products";

type ModalEditProductProps = {
  product: Product;
  categoriesData: Category[];
  onClose: () => void;
  onSave: (product: Product) => void;
};

export function ModalEditProduct({ product, categoriesData, onClose, onSave }: ModalEditProductProps) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [status, setStatus] = useState(Boolean(product.status));
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!photoPreview) return;
    return () => {
      URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function handlePhotoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.warning("A imagem deve ter no máximo 5 MB.");
      event.target.value = "";
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      toast.warning("Selecione uma imagem PNG, JPG ou WEBP.");
      event.target.value = "";
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSave(){
    if (saving) return;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const normalizedPrice = Number(price.replace(",", "."));

    if (!trimmedName) {
      toast.warning("Informe o nome do produto.");
      return;
    }

    if (!trimmedDescription) {
      toast.warning("Informe a descrição do produto.");
      return;
    }

    if (!Number.isFinite(normalizedPrice) || normalizedPrice <= 0) {
      toast.warning("Informe um preço válido.");
      return;
    }

    if (!category) {
      toast.warning("Selecione uma categoria.");
      return;
    }

    setSaving(true);

    try {
      let photoUrl = product.photo;
      let uploadedPath: string | null = null;

      if (photo) {
        const uploadedImage = await uploadProductImage(photo);
        photoUrl = uploadedImage.url;
        uploadedPath = uploadedImage.path;
      }

      const updatedProduct = await handleProductUpdate(product.id, {
        name: trimmedName,
        description: trimmedDescription,
        price: String(normalizedPrice),
        category,
        status,
        ...(photoUrl ? { photo: photoUrl } : {}),
      });

      clearAdminDataCache();
      onSave(updatedProduct as Product);
      toast.success("Produto atualizado com sucesso.");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Não foi possível atualizar o produto.");
    } finally {
      setSaving(false);
    }
  }

  const currentPhoto = photoPreview ?? product.photo;

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-title"
        className="my-auto h-max max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#747474] bg-[#0C0C0C] p-5"
      >
        <h1
          id="edit-product-title"
          className="font-google text-xl font-medium"
        >
          Editar Produto
        </h1>

        <div className="mt-2">
          <Input
            name="Nome do produto"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Caldo de mandioca com carne seca..."
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label className="font-google text-sm">Descrição</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descrição do produto..."
            name="descricao"
            className="h-24 w-full rounded-xl border border-[#A2A2A2] bg-[#161616] p-2 font-google focus:border-[#A2A2A2]"
          />
        </div>

        <div className="mt-4 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <Input
              name="Preço"
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="font-google text-sm">Categoria</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              name="categoria"
              className="w-full rounded-xl border border-[#777777] bg-[#161616] px-3 py-3 font-google transition-all hover:border-[#A2A2A2]"
            >
              <option value="">Selecione a categoria</option>

              {categoriesData.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label className="font-google text-sm">Foto do Produto</label>

          <div className="relative flex h-60 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#777777] bg-[#161616]">
            {currentPhoto ? (
              <Image
                src={currentPhoto}
                alt="Prévia do produto"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            ) : (
              <div className="absolute inset-0 bg-black/60" />
            )}

            <div className="pointer-events-none absolute inset-0 z-10 bg-black/60" />

            <LiaCloudUploadAltSolid
              size={44}
              color="#fff"
              className="pointer-events-none relative z-10"
            />

            <h2 className="relative z-10 mt-3 text-center font-google text-base">
              Clique para enviar uma nova imagem
            </h2>

            <p className="relative z-10 mt-1 text-center text-xs text-white font-google">
              PNG, JPG ou WEBP. Máximo: 5 MB
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoChange}
              aria-label="Selecionar foto do produto"
              className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label className="font-google text-sm">Status</label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={status}
              onClick={() => setStatus((previous) => !previous)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                status ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  status ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>

            <span className="font-google text-sm">
              Produto {status ? "ativo" : "não ativo"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <ButtonCancel
            onClick={onClose}
            text="Cancelar Edição"
          />

          <Button
            onClick={handleSave}
            text={saving ? "Salvando..." : "Salvar Edição"}
          />
        </div>
      </div>
    </section>
  );
}