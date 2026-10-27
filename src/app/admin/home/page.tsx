"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

// Database
import { supabase } from "@/server/supabase/supabase";

// Components
import { Wrapper } from "@/components/Wrapper";
import { HeaderAdmin } from "@/components/Header";
import { ProductTable } from "@/components/TableAdmin";
import { Input, InputSearch } from "@/components/Input";
import { Button, ButtonCancel } from "@/components/Button";
import { ModalEditProduct } from "@/components/ModalEditProduct";
import { ModalDeleteProduct } from "@/components/ModalDeleteProduct";
import { Footer } from "@/components/Footer";

// Functions
import { getAllProducts } from "@/function/getAllProducts";
import { getAllCategories } from "@/function/getAllCategory";
import { handleProductInServer } from "@/function/handleProductInServer";
import { uploadProductImage } from "@/function/uploadProductImage";
import { clearAdminDataCache } from "@/lib/cache/adminCache";

// Types
import type { Category } from "@/types/Categories";
import type { Product } from "@/types/Products";

export default function AdminHome(){
    // PAGE
    const [ categoriesData, setCategoriesData ] = React.useState<Category[]>([]);
    const [ yourProducts, setYourProducts ] = React.useState<Product[]>([]);
    const [ searchCategories, setSearchCategories ] = React.useState<string>("");
    const [ searchProducts, setSearchProducts ] = React.useState<string>("");

    // MODAIS
    const [ showModalEdit, setShowModalEdit ] = React.useState<boolean>(false);
    const [ selectedProductEdit, setSelectedProductEdit ] = React.useState<Product | null>(null);
    const [ showModalDelete, setShowModalDelete ] = React.useState<boolean>(false);
    const [ selectedProductDel, setSelectedProductDel ] = React.useState<Product | null>(null);

    // FORMS
    const [ nameForm, setNameForm ] = React.useState<string>("");
    const [ descriptionForm, setDescriptionForm ] = React.useState<string>("");
    const [ priceForm, setPriceForm ] = React.useState<string>("");
    const [ categoryForm, setCategoryForm ] = React.useState<string>("");
    const [ imageFileForm, setImageFileForm ] = React.useState<File | null>(null);
    const [ imageForm, setImageForm ] = React.useState<string>("");
    const [ statusForm, setStatusForm ] = React.useState<boolean>(false);

    React.useEffect(()=> {
        let cancelled = false;

        async function loadAdminData() {
            try {
            const [productsResult, categoriesResult] = await Promise.all([
                getAllProducts(),
                getAllCategories(),
            ]);

            if (cancelled) return;

            if (productsResult !== null) {
                setYourProducts(productsResult);
            }

            if (categoriesResult !== null) {
                setCategoriesData(categoriesResult);
            }
            } catch (error) {
                console.error("Erro ao carregar dados da Home:", error);
            }
        }

        void loadAdminData();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredProducts = React.useMemo(()=> {
        const searchTerm = searchProducts.trim().toLowerCase();
        const searchTermCategories = searchCategories.trim().toLowerCase();

        return yourProducts.filter((product)=>
            product.name.toLowerCase().includes(searchTerm) && product.category.toLowerCase().includes(searchTermCategories)
        );
    }, [yourProducts, searchProducts, searchCategories]);

    function handleToggleStatus(){
        alert("VAMOS MUDAR OS STATUS DISSO MEU");
    }

    function handleEditProduct(product: Product){
        setSelectedProductEdit(product);
        setShowModalEdit(true);
    }
    
    function handleDeleteProduct(product: Product){
        setSelectedProductDel(product);
         setYourProducts((prev) =>
            prev.filter((product) => product.id !== selectedProductDel?.id)
        );

        setShowModalDelete(true);
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];

        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        setImageFileForm(file);
        setImageForm(previewUrl);
    }

    async function handleSubmitNewProduct(){
        const name = nameForm.trim();
        const description = descriptionForm.trim();
        const category = categoryForm.trim();
        const price = Number(priceForm.replace(",", "."));

        if (!name || !description || !category) {
            toast.warning("Preencha nome, descrição e categoria.");
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            toast.warning("Informe um preço válido.");
            return;
        }

        if (!imageFileForm) {
            toast.warning("Selecione uma imagem para o produto.");
            return;
        }

        let uploadedPath: string | null = null;

        try {
            const uploadedImage = await uploadProductImage(imageFileForm);
            uploadedPath = uploadedImage.path;

            const createdProduct = await handleProductInServer({
                name,
                description,
                price: String(price),
                category,
                photo: uploadedImage.url,
                status: statusForm,
            });

            setYourProducts((previous) => [
                createdProduct,
                ...previous,
            ]);

            clearAdminDataCache();

            setNameForm("");
            setDescriptionForm("");
            setPriceForm("");
            setCategoryForm("");
            setStatusForm(false);
            setImageFileForm(null);
            setImageForm("");

            toast.success("Produto cadastrado com sucesso.");
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);

            // Se o upload ocorreu, mas o cadastro falhou,
            // tenta remover o arquivo órfão.
            if (uploadedPath) {
                const { error: cleanupError } = await supabase.storage
                    .from("produtos_imagem")
                    .remove([uploadedPath]);

                if (cleanupError){
                    console.error("Erro ao limpar imagem:", cleanupError);
                    toast.error("Erro ao limpar imagem.")
                }
            }

            toast.error("Não foi possível cadastrar o produto.");
        }
    }

    return(
        <main className="relative min-h-screen overflow-hidden">
            
            <HeaderAdmin />

            <Wrapper>
                <section className="mt-30">
                    {/* PRESENTATIONS */}
                    <div className="flex items-center gap-3">
                        <FaUserAlt color="#F97318" size={40} />
                        <div>
                            <h1 className="font-google text-2xl font-medium">Olá, Administrador(a)!</h1>
                            <span className="font-google text-sm font-light">Aqui está o resumo do seu negócio atualmente.</span>
                        </div>
                    </div>
                    {/* CARDS */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <BsBoxSeamFill size={40} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-base">Produtos registrados</span>
                                        <h1 className="font-google text-3xl font-semibold">{yourProducts.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <BiSolidCategoryAlt size={40} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-base">Categorias registradas</span>
                                        <h1 className="font-google text-3xl font-semibold">{categoriesData.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <RiMoneyDollarCircleFill size={32} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-xs">Faturamento</span>
                                        <h1 className="font-google text-2xl font-semibold">R$ 0,00</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <FaGoogle size={32} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-xs">Avaliação dos Clientes</span>
                                        <h1 className="font-google text-2xl font-semibold">5.0</h1>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>

                <section className="mt-10 mb-40">
                    <h1 className="font-google text-2xl font-medium">Produtos</h1>
                    <span className="font-google text-sm font-light">Gerencie o cardápio do seu delivery.</span>


                    {/* SEARCH AND TABLE */}
                    <div className="w-full flex mt-4 gap-6">
                        <div className="max-w-7/12 w-full">
                            <div className="w-full flex items-center justify-between gap-4">
                                <InputSearch 
                                 onChange={(e)=> setSearchProducts(e.target.value)}
                                 placeholder="Buscar produto..." 
                                />
                                <select 
                                 onChange={(e)=> setSearchCategories(e.target.value)}
                                 className="w-max py-3 px-6 border border-[#777777] bg-[#161616] font-google font-regular rounded-xl transition-all
                                 placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]" 
                                 name="categoria"
                                >
                                    <option key={-1} value="">Todos os produtos</option>
                                    {categoriesData.map((c)=> (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-full flex flex-col mt-4">
                                {/* Cabeçalho */}
                                <div className="grid grid-cols-[42px_minmax(0,1fr)_76px_68px_62px_54px] 
                                items-center gap-2 px-4 py-3 text-[10px] text-[#c4c4c4]">
                                    <span className="font-google text-sm">Foto</span>
                                    <span className="font-google text-sm">Nome</span>
                                    <span className="font-google text-sm">Categoria</span>
                                    <span className="font-google text-sm">Preço</span>
                                    <span className="font-google text-sm">Status</span>
                                    <span className="font-google text-sm">Ações</span>
                                </div>

                                <div className="w-full h-200 flex flex-col gap-2 overflow-y-auto">
                                    {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product)=> (
                                        <ProductTable
                                         key={product.id}
                                         product={product}
                                         onEdit={()=> handleEditProduct(product)}
                                         onDelete={()=> handleDeleteProduct(product)}
                                         onToggleStatus={handleToggleStatus}
                                        />
                                        ))
                                    ):(
                                        <p className="py-8 text-center text-base text-zinc-600 font-google">
                                            Nenhum produto encontrado.
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                        </div>


                        {/* ADD PRODUCT FORM */}
                        <div className="max-w-5/12 w-full bg-[#0C0C0C] border border-[#747474] rounded-xl p-5">
                            <h1 className="font-google text-xl font-medium">Adicionar Produto</h1>

                            <div className="mt-2">
                                {/* NAME */}
                                <Input 
                                 onChange={(e)=> setNameForm(e.target.value)}
                                 name="Nome do produto"
                                 type="text"
                                 placeholder="Ex: Caldo de mandioca com Carne Seca..."
                                />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="mt-4 flex flex-col gap-2">
                                <label className="font-google font-regular text-sm">Descrição</label>
                                <textarea 
                                 onChange={(e)=> setDescriptionForm(e.target.value)}
                                 placeholder="Ex: Sem carne seca, bem separado, etc..."
                                 className="w-full h-40 bg-[#161616] border border-[#A2A2A2] rounded-xl p-2 font-google 
                                 hover:border-[#A2A2A2] focus:border-[#A2A2A2]"
                                 name="descricao"
                                ></textarea>
                            </div>

                            <div className="mt-4 flex items-center gap-4">
                                {/* PRICE */}
                                <Input 
                                 onChange={(e)=> setPriceForm(e.target.value)}
                                 name="Preço"
                                 type="text"
                                 placeholder="R$ 0,00"
                                />

                                {/* CATEGORIA */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-google font-regular text-sm">Categoria</label>
                                    <select 
                                     onChange={(e)=> setCategoryForm(e.target.value)}
                                     className="w-max py-3 px-6 border border-[#777777] bg-[#161616] font-google font-regular rounded-xl transition-all
                                     placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]" 
                                     name="categoria"
                                    >
                                        <option key={"0"} value="">Selecione a categoria</option>
                                        {categoriesData.map((c)=> (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* INPUT */}
                            <div className="mt-4">
                                <div className="w-full max-w-full flex flex-col gap-2">
                                    <label className="font-google font-regular text-sm">Foto do Produto</label>
                                    <div className="relative h-60 border border-dashed border-[#777777] bg-[#161616] font-google 
                                    font-regular rounded-xl transition-all placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]">
                                       
                                        {imageForm ? (
                                            <div className="relative w-full z-10 flex flex-col justify-center items-center">
                                                <Image
                                                width={400}
                                                height={250}
                                                unoptimized
                                                className="w-full h-60 top-0 rounded-xl object-cover opacity-30"
                                                alt="Nome produto"
                                                src={imageForm}
                                                />

                                                <MdDeleteOutline
                                                 onClick={()=> setImageForm("")}
                                                 className="absolute z-20 cursor-pointer bounce-limited"
                                                 size={80} 
                                                 color={"#fff"} 
                                                />
                                            </div>
                                        ):(
                                            <>
                                                <input
                                                 onChange={handleImageChange}
                                                 type="file"
                                                 className="w-full h-full opacity-0 cursor-pointer"
                                                />

                                                <LiaCloudUploadAltSolid 
                                                 className="absolute top-12 right-56"
                                                 size={44} 
                                                 color="#fff" 
                                                />

                                                <h1 className="absolute top-28 w-full font-google font-medium text-xl text-center">
                                                    Clique para enviar a imagem aqui
                                                </h1>
                                                <h6 className="absolute top-36 w-full font-google font-regular text-sm text-[#9F9F9F] text-center">
                                                    Formatos: PNG, JPG ou WEBP. Tamanho máximo: 5MB
                                                </h6>
                                            </>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            
                            {/* STATUS */}
                            <div className="w-full flex flex-col gap-2 mt-4">
                                <label className="font-google font-regular text-sm">Status</label>
                                <div className="flex items-center gap-2">
                                    <button
                                     onClick={() => setStatusForm((prev) => !prev)}
                                     type="button"
                                     role="switch"
                                     aria-checked={statusForm}
                                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
                                     focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${statusForm ? "bg-green-500" : "bg-gray-500"}`}
                                    >
                                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${statusForm ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </button>

                                    <span className="font-google text-sm">Produto {statusForm ? "ativo" : "não ativo"}</span>
                                </div>
                            </div>

                            {/* BUTTONS CANCEL AND SUBMIT */}
                            <div className="mt-6 flex gap-2">
                                <ButtonCancel 
                                 onClick={()=> {
                                    setNameForm("");
                                    setDescriptionForm("");
                                    setPriceForm("");
                                    setCategoryForm("");
                                    setImageForm("");
                                    setStatusForm(false);
                                 }}
                                 text="Cancelar" />
                                <Button 
                                 onClick={handleSubmitNewProduct}
                                 text="Salvar" />
                            </div>
                        </div>
                    </div>
                </section>
            </Wrapper>

            {/* SHOW MODAL EDIT */}
            {showModalEdit && selectedProductEdit && (
                <ModalEditProduct
                 product={selectedProductEdit}
                 categoriesData={categoriesData}
                 onClose={()=> {
                  setShowModalEdit(false);
                  setSelectedProductEdit(null);
                 }}
                 onSave={(updatedProduct)=> {
                 setYourProducts((previous)=>
                    previous.map((product)=>
                    product.id === updatedProduct.id
                     ? updatedProduct
                     : product
                    )
                 );
                 setShowModalEdit(false);
                 setSelectedProductEdit(null);
                 }}
                />
            )}


            {/* SHOW MODAL DELETE */}
            {showModalDelete && selectedProductDel && (
                <ModalDeleteProduct 
                 product={selectedProductDel}
                 onClose={()=> {
                  setShowModalEdit(false);
                  setSelectedProductDel(null);
                 }}
                 onDelete={()=> {
                    handleDeleteProduct(selectedProductDel);
                    setShowModalDelete(false);
                 }}
                />
            )}
            <Footer />
        </main>
    )
}