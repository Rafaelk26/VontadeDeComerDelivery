"use client";
import React from "react";

// Components
import { Input } from "@/components/Input";
import { Button, ButtonCancel } from "@/components/Button";

// Data
import { Category } from "@/types/Categories";

type ModalEditCategoryProps = {
  category: Category;
  onClose: ()=> void;
  onSave: (category: Category)=> void;
};

export function ModalEditCategory({ category, onClose, onSave }: ModalEditCategoryProps){
  const [ name, setName ] = React.useState(category.name);
  const [ color, setColor ] = React.useState(category.color);

    const colorInputRef = React.useRef<HTMLInputElement>(null);

    function handleSave() {
        const updatedCategory: Category = {
            ...category,
            name: name.trim(),
            color,
        };

        if (!updatedCategory.name) return;

        onSave(updatedCategory);
    }

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center
      overflow-y-auto bg-black/90 p-4"
      onMouseDown={(event)=> {
        if (event.target === event.currentTarget) onClose();
      }}
    >
        {/* FORM CATEGORY */}
        <div className="max-w-96 w-full h-max bg-[#0C0C0C] border border-[#747474] rounded-xl p-5">
            <h1 className="font-google text-xl font-medium">Editar Categoria</h1>
            <div className="mt-2">
                {/* NAME */}
                <Input 
                onChange={(e)=> setName(e.target.value)}
                name="Nome da categoria"
                value={name}
                type="text"
                placeholder="Ex: Marmita..."
                />

                {/* COLOR */}
                <div className="w-full flex flex-col gap-2 mt-3">
                    <label className="font-google text-sm">Cor da Categoria</label>
                    <div className="w-full h-12 flex items-center border border-[#555555] 
                    rounded-xl bg-[#161616] py-3 px-4 gap-2 hover:border-[#A2A2A2] font-google">
                        <input
                        type="text"
                        value={color?.toUpperCase()}
                        onChange={(e)=> {
                            const value = e.target.value;
                            if(/^#[0-9A-Fa-f]{0,6}$/.test(value)){
                            setColor(value);
                            }
                        }}
                        placeholder="#000"
                        maxLength={7}
                        className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#A2A2A2] placeholder:text-[#777777]"
                        />

                        <button
                        type="button"
                        onClick={()=> colorInputRef.current?.click()}
                        className="w-5 h-5 rounded-full border border-[#E5E5E5] shrink-0 cursor-pointer"
                        style={{ backgroundColor: color }}
                        aria-label="Selecionar cor"
                        />

                        <input
                        ref={colorInputRef}
                        type="color"
                        value={/^#[0-9A-Fa-f]{6}$/.test(color ? color : "") ? color : "#000000"}
                        onChange={(e)=> setColor(e.target.value)}
                        className="sr-only"
                        tabIndex={-1}
                        />
                    </div>
                </div>
            </div>

            {/* BUTTONS CANCEL AND SUBMIT */}
            <div className="mt-6 flex gap-2">
                <ButtonCancel 
                onClick={onClose}
                text="Cancelar" 
                />
                <Button 
                onClick={handleSave}
                text="Salvar" 
                />
            </div>
        </div>
    </section>
  );
}
