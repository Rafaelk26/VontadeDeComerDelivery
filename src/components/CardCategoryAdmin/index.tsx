import { BiSolidCategoryAlt } from "react-icons/bi";

// Interface
type CardCategoryAdminProps = {
    name: string;
    quantityItems: number;
    color: string;
    onEdit: ()=> void;
    onDelete: ()=> void;
}

export function CardCategoryAdmin({ name, quantityItems, color, onEdit, onDelete }: CardCategoryAdminProps){
    return(
        <>
            <div 
             className="w-full border border-[#747474] p-4 rounded-lg"
             style={{ backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`}}
            >
                <div className="flex items-center gap-2">
                    <BiSolidCategoryAlt size={40} color="#fff" />
                    <div>
                        <h1 className="font-google font-medium text-xl">{name}</h1>
                        <span className="font-google font-light text-sm">Produtos na categoria: {quantityItems}</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <button 
                        onClick={onEdit}
                        className=" flex w-max justify-center items-center gap-2 rounded-md bg-amber-500/30 px-5 py-2 font-google 
                        text-lg font-semibold text-white transition-all hover:scale-105 hover:cursor-pointer border border-[#8C8C8C] hover:bg-amber-500/80
                        hover:text-white">
                        Editar
                    </button>

                    <button 
                        onClick={onDelete}
                        className=" flex w-max justify-center items-center gap-2 rounded-md bg-red-500/30 px-5 py-2 font-google 
                        text-lg font-semibold text-white transition-all hover:scale-105 hover:cursor-pointer border border-[#8C8C8C] hover:bg-red-500/80
                        hover:text-white">
                        Deletar
                    </button>
                </div>
            </div>
        </>
    )
}