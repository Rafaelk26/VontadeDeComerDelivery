"use client";
import React from "react";
import { toast } from "react-toastify";

// Components
import { Button, ButtonCancel } from "@/components/Button";
import { HeaderAdmin } from "@/components/Header";
import { Input } from "@/components/Input";
import { Wrapper } from "@/components/Wrapper";
import { CardCategoryAdmin } from "@/components/CardCategoryAdmin";
import { ModalEditCategory } from "@/components/ModalEditCategory";
import { ModalDeleteCategory } from "@/components/ModalDeleteCategory";
import { Footer } from "@/components/Footer";

// Data
import { categories, Category } from "@/data/Categories";
import { Product, products } from "@/data/Products";

export default function AdminCategoria(){

    // PAGE
    const [ categoriesPage, setCategoriesPage ] = React.useState<Category[]>([]);
    const [ productsPage, setProductsPage ] = React.useState<Product[]>([]);

    // FORM
    const [ nameForm, setNameForm ] = React.useState<string>("");
    const [ colorForm, setColorForm ] = React.useState<string>("");
    const colorInputRef = React.useRef<HTMLInputElement>(null);

    // MODAIS
    const [ showModalEditCategory, setShowModalEditCategory ] = React.useState<boolean>(false);
    const [ showModalDeleteCategory, setShowModalDeleteCategory ] = React.useState<boolean>(false);
    const [ categoryEditSelected, setCategoryEditSelected ] = React.useState<Category | null>(null);
    const [ categoryDeleteSelected, setCategoryDeleteSelected ] = React.useState<Category | null>(null);

    React.useEffect(()=> {
        function getCategories(){
            setCategoriesPage(categories);
        }
        
        function getProducts(){
            setProductsPage(products);
        }

        getCategories();
        getProducts();
    }, []);
    
    function handleSubmitNewCategory(){
        const name = nameForm.trim();
        const color = colorForm.toUpperCase();

        // Validar o nome
        if(!name){
            toast.warning("Informe o nome da categoria.");
            return;
        }

        // Validar a cor hexadecimal
        if(!/^#[0-9A-Fa-f]{6}$/.test(color)){
            toast.warning("Selecione uma cor válida.");
            return;
        }

        const categoryExists = categoriesPage.some((category)=> category.name.toLowerCase() === name.toLowerCase());

        if(categoryExists){
            toast.warning("Já existe uma categoria com esse nome.");
            return;
        }

        const newCategory: Category = {
            id: crypto.randomUUID(),
            name,
            color,
        };

        setCategoriesPage((previous)=> [
            ...previous,
            newCategory,
        ]);

        setNameForm("");
        setColorForm("");
    }

    function handleDeleteCategory(categoria: Category){
        setCategoryDeleteSelected(categoria)
        setCategoriesPage((prev)=> 
            prev.filter((c)=> c.id !== categoryDeleteSelected?.id)
        );

        setShowModalDeleteCategory(true);
    }


    return(
        <main className="relative min-h-screen overflow-hidden">
            <HeaderAdmin />
            <Wrapper>
                <section className="mt-30">
                    {/* PRESENTATIONS */}
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="font-google text-2xl font-medium">Categorias</h1>
                            <span className="font-google text-sm font-light">Veja todas as categorias que estão atreladas aos seus itens.</span>
                        </div>
                    </div>
                </section>

                {/* CARDS */}
                <div className="w-full flex mt-4 gap-6 mb-16">
                    <div className="max-w-8/12 w-full h-150 bg-[#0C0C0C] border border-[#747474] rounded-xl p-5">
                        <div className="w-full grid grid-cols-2 gap-4">
                            {categoriesPage.slice(1).map((category) => (
                                <CardCategoryAdmin
                                 key={category.id}
                                 name={category.name}
                                 color={category.color ? category.color : ""}
                                 quantityItems={productsPage.filter((p) => category.name === p.category).length}
                                 onEdit={() => {
                                  setCategoryEditSelected(category);
                                  setShowModalEditCategory(true);
                                 }}
                                 onDelete={() => {
                                  setCategoryDeleteSelected(category);
                                  setShowModalDeleteCategory(true);
                                 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* FORM CATEGORY */}
                    <div className="max-w-4/12 w-full h-max bg-[#0C0C0C] border border-[#747474] rounded-xl p-5">
                        <h1 className="font-google text-xl font-medium">Adicionar Categoria</h1>
                        <div className="mt-2">
                            {/* NAME */}
                            <Input 
                             onChange={(e)=> setNameForm(e.target.value)}
                             name="Nome da categoria"
                             value={nameForm}
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
                                     value={colorForm.toUpperCase()}
                                     onChange={(e)=> {
                                        const value = e.target.value;
                                        if(/^#[0-9A-Fa-f]{0,6}$/.test(value)){
                                         setColorForm(value);
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
                                     style={{ backgroundColor: colorForm }}
                                     aria-label="Selecionar cor"
                                    />

                                    <input
                                     ref={colorInputRef}
                                     type="color"
                                     value={/^#[0-9A-Fa-f]{6}$/.test(colorForm) ? colorForm : "#000000"}
                                     onChange={(e)=> setColorForm(e.target.value)}
                                     className="sr-only"
                                     tabIndex={-1}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* BUTTONS CANCEL AND SUBMIT */}
                        <div className="mt-6 flex gap-2">
                            <ButtonCancel 
                             onClick={()=> {
                                setNameForm("");
                                setColorForm("");
                             }}
                             text="Cancelar" 
                            />
                            <Button 
                             onClick={handleSubmitNewCategory}
                             text="Criar categoria" 
                            />
                        </div>
                    </div>
                </div>
            </Wrapper>

            {/* MODAL EDIT CATEGORY */}
            { showModalEditCategory && categoryEditSelected && (
                <ModalEditCategory
                 category={categoryEditSelected}
                 onClose={()=> {
                    setShowModalEditCategory(false);
                    setCategoryEditSelected(null);
                 }}
                 onSave={(updatedCategory)=> {
                    const oldName = categoryEditSelected.name;

                    setCategoriesPage((previous) =>
                        previous.map((category) =>
                        category.id === updatedCategory.id
                            ? updatedCategory
                            : category
                        )
                    );

                    setProductsPage((previous) =>
                        previous.map((product) =>
                        product.category === oldName
                            ? { ...product, category: updatedCategory.name }
                            : product
                        )
                    );

                    setShowModalEditCategory(false);
                    setCategoryEditSelected(null);
                    toast.success("Categoria editada com sucesso.");
                }}
                />
            )}

            
            {/* MODAL DELETE CATEGORY */}
            {showModalDeleteCategory && categoryDeleteSelected && (
                <ModalDeleteCategory
                 category={categoryDeleteSelected}
                 product={productsPage.filter((p) => p.category === categoryDeleteSelected.name).length}
                 onClose={() => {
                  setShowModalDeleteCategory(false);
                  setCategoryDeleteSelected(null);
                 }}
                 onDelete={()=> {
                  handleDeleteCategory(categoryDeleteSelected);
                  setShowModalDeleteCategory(false);
                  toast.success("Categoria deletada com sucesso.");
                 }}
                />
            )}

            <Footer />
        </main>
    )
}