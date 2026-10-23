"use client";
import React from "react";
import { toast } from "react-toastify";

// Components
import { Input } from "@/components/Input";
import { Button, ButtonCancel } from "@/components/Button";

// Functions
import { handleCategoryUpdate } from "@/function/handleCategoryUpdate";
import { clearAdminDataCache } from "@/lib/cache/adminCache";

// Types
import type { Category } from "@/types/Categories";

type ModalEditCategoryProps = {
  category: Category;
  onClose: () => void;
  onSave: (category: Category) => void;
};

export function ModalEditCategory({ category, onClose, onSave }: ModalEditCategoryProps) {
  const [name, setName] = React.useState(category.name);
  const [color, setColor] = React.useState(category.color);
  const [saving, setSaving] = React.useState(false);

  const colorInputRef = React.useRef<HTMLInputElement>(null);

  async function handleSave() {
    if (saving) return;

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.warning("Informe o nome da categoria.");
      return;
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(color ? color : "")) {
      toast.warning("Informe uma cor hexadecimal válida, como #F97316.");
      return;
    }

    setSaving(true);

    try {
      const updatedCategory = await handleCategoryUpdate(category.id, {
        name: trimmedName,
        color,
      });

      clearAdminDataCache();

      onSave(updatedCategory as Category);

      toast.success("Categoria atualizada com sucesso.");
      onClose();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      toast.error("Não foi possível atualizar a categoria.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center
      overflow-y-auto bg-black/90 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-category-title"
        className="h-max w-full max-w-96 rounded-xl border
        border-[#747474] bg-[#0C0C0C] p-5"
      >
        <h1
          id="edit-category-title"
          className="font-google text-xl font-medium"
        >
          Editar Categoria
        </h1>

        <div className="mt-2">
          <Input
            onChange={(event) => setName(event.target.value)}
            name="Nome da categoria"
            value={name}
            type="text"
            placeholder="Ex: Marmita..."
          />

          <div className="mt-3 flex w-full flex-col gap-2">
            <label className="font-google text-sm">
              Cor da Categoria
            </label>

            <div
              className="flex h-12 w-full items-center gap-2 rounded-xl
              border border-[#555555] bg-[#161616] px-4 py-3
              font-google hover:border-[#A2A2A2]"
            >
              <input
                type="text"
                value={color?.toUpperCase()}
                onChange={(event) => {
                  const value = event.target.value;

                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    setColor(value);
                  }
                }}
                placeholder="#F97316"
                maxLength={7}
                className="min-w-0 flex-1 bg-transparent text-sm
                text-[#A2A2A2] outline-none placeholder:text-[#777777]"
              />

              <button
                type="button"
                onClick={() => colorInputRef.current?.click()}
                className="h-5 w-5 shrink-0 cursor-pointer rounded-full
                border border-[#E5E5E5]"
                style={{ backgroundColor: color }}
                aria-label="Selecionar cor"
              />

              <input
                ref={colorInputRef}
                type="color"
                value={
                  /^#[0-9A-Fa-f]{6}$/.test(color ? color : "")
                    ? color
                    : "#000000"
                }
                onChange={(event) => setColor(event.target.value)}
                className="sr-only"
                tabIndex={-1}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <ButtonCancel
            onClick={onClose}
            text="Cancelar"
          />

          <Button
            onClick={handleSave}
            text={saving ? "Salvando..." : "Salvar"}
            disabled={saving}
          />
        </div>
      </div>
    </section>
  );
}
