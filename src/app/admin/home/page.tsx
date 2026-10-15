"use client";
import React from "react";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

// Components
import { HeaderAdmin } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { Input, InputSearch } from "@/components/Input";
import { Button, ButtonCancel } from "@/components/Button";
import { Footer } from "@/components/Footer";

// Data
import { categories, Category } from "@/data/Categories";

// Assets
import examplePNG from "../../../../public/Caldo.png";


export default function AdminHome(){

    const [ categoriesData, setCategoriesData ] = React.useState<Category[]>([]);
    const [ onActive, setOnActive ] = React.useState<boolean>(false);
    const [ search, setSearch ] = React.useState<string>("");

    React.useEffect(()=> {
        function getCategories(){
            setCategoriesData(categories.slice(1, 10));
        }

        getCategories();
    }, []);

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
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <BsBoxSeamFill size={32} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-xs">Produtos</span>
                                        <h1 className="font-google text-2xl font-semibold">3</h1>
                                    </div>
                                </div>
                                <div className="w-max flex">
                                    <span className="font-google text-green-400">+ 2 novos</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <IoCartOutline size={32} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-xs">Pedidos Hoje</span>
                                        <h1 className="font-google text-2xl font-semibold">16</h1>
                                    </div>
                                </div>
                                <div className="w-max flex">
                                    <span className="font-google text-green-400">+ 5%</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border border-[#747474] px-4 py-8 bg-[#0C0C0C] rounded-lg">
                            <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <RiMoneyDollarCircleFill size={32} color="#F97318" />
                                    <div className="flex flex-col">
                                        <span className="font-google text-xs">Faturamento</span>
                                        <h1 className="font-google text-2xl font-semibold">R$ 0,00</h1>
                                    </div>
                                </div>
                                <div className="w-max flex">
                                    <span className="font-google text-green-400">+ 5%</span>
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
                        </div>
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
                                 onChange={(e)=> setSearch(e.target.value)}
                                 placeholder="Buscar produto..." 
                                />
                                <select 
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

                            <table>
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>


                        {/* ADD/EDIT */}
                        <div className="max-w-5/12 w-full bg-[#0C0C0C] border border-[#747474] rounded-xl p-5">
                            <h1 className="font-google text-xl font-medium">Adicionar / Editar Produto</h1>

                            <div className="mt-2">
                                {/* NAME */}
                                <Input 
                                 name="Nome do produto"
                                 type="text"
                                 onClick={()=> {}}
                                 placeholder="Ex: Caldo de mandioca com Carne Seca..."
                                />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="mt-4 flex flex-col gap-2">
                                <label className="font-google font-regular text-sm">Descrição</label>
                                <textarea 
                                placeholder="Ex: Sem carne seca, bem separado, etc..."
                                className="w-full h-40 bg-[#161616] border border-[#A2A2A2] rounded-xl p-2 font-google 
                                hover:border-[#A2A2A2] focus:border-[#A2A2A2]"
                                name="descricao"
                                ></textarea>
                            </div>

                            <div className="mt-4 flex items-center gap-4">
                                {/* PRICE */}
                                <Input 
                                 name="Preço"
                                 type="text"
                                 onClick={()=> {}}
                                 placeholder="R$ 0,00"
                                />

                                {/* CATEGORIA */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-google font-regular text-sm">Categoria</label>
                                    <select 
                                    className="w-max py-3 px-6 border border-[#777777] bg-[#161616] font-google font-regular rounded-xl transition-all
                                    placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]" 
                                    name="categoria"
                                    >
                                        <option key={"0"} value="#">Selecione a categoria</option>
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
                                       
                                        <input
                                         type="file"
                                         className="w-full h-full opacity-0 cursor-pointer"
                                        />

                                        <LiaCloudUploadAltSolid 
                                        className="absolute top-12 right-56"
                                        size={44} 
                                        color="#fff" 
                                        />

                                        <h1 className="absolute top-28 w-full font-google font-medium text-xl text-center">Clique para enviar a imagem aqui</h1>
                                        <h6 className="absolute top-36 w-full font-google font-regular text-sm text-[#9F9F9F] text-center">Formatos: PNG, JPG. Tamanho máximo: 5MB</h6>
                                        
                                        {/* <Image
                                         className="w-full h-60 absolute top-0 rounded-xl object-cover"
                                         alt="Nome produto"
                                         src={examplePNG}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            
                            {/* STATUS */}
                            <div className="w-full flex flex-col gap-2 mt-4">
                                <label className="font-google font-regular text-sm">Status</label>
                                <div className="flex items-center gap-2">
                                    <button
                                     type="button"
                                     role="switch"
                                     aria-checked={onActive}
                                     onClick={() => setOnActive((prev) => !prev)}
                                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
                                     focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${onActive ? "bg-green-500" : "bg-gray-500"}`}
                                    >
                                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${onActive ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </button>

                                    <span className="font-google text-sm">Produto {onActive ? "ativo" : "não ativo"}</span>
                                </div>
                            </div>

                            {/* BUTTONS CANCEL AND SUBMIT */}
                            <div className="mt-6 flex gap-2">
                                <ButtonCancel 
                                 onClick={()=> {alert("CANCELOU PAE")}}
                                 text="Cancelar" />
                                <Button 
                                 onClick={()=> {alert("SALVOU PAE")}}
                                 text="Salvar" />
                            </div>
                        </div>
                    </div>
                </section>

            </Wrapper>
            <Footer />
        </main>
    )
}