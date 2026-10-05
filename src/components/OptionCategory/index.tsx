import { IoFastFood } from "react-icons/io5"

// Type
type OptionCategoryProps = {
    id: string;
    menuActive: boolean;
    nameCategory: string;
    onActive?: ()=> void;
}

export function OptionCategory({ id, menuActive, nameCategory, onActive }: OptionCategoryProps){
    return(
        <>
            <li 
             key={id}
             onClick={onActive}
             className={`flex items-center gap-2 p-4 cursor-pointer transition-all
                ${menuActive && `bg-[#F97318] text-black first:rounded-t-xl last:rounded-b-xl`}`}>
                <IoFastFood size={24} color={menuActive ? "#000" : "#fff"} />
                <span className="font-google font-regular font-md">{nameCategory}</span>
            </li>
        </>
    )
}