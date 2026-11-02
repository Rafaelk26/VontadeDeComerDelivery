import { IoFastFood } from "react-icons/io5";

// Type
type OptionCategoryProps = {
  id: string;
  menuActive: boolean;
  nameCategory: string;
  onActive?: () => void;
};

export function OptionCategory({
  id,
  menuActive,
  nameCategory,
  onActive,
}: OptionCategoryProps) {
  return (
    <li
      key={id}
      onClick={onActive}
      className={`flex shrink-0 md:shrink items-center gap-2 px-3 py-3 md:p-4 cursor-pointer transition-all whitespace-nowrap
        ${
          menuActive
            ? "bg-[#F97318] text-black md:first:rounded-t-xl md:last:rounded-b-xl"
            : "text-white"
        }`}
    >
      <IoFastFood
        size={20}
        color={menuActive ? "#000" : "#fff"}
        className="shrink-0 md:w-6 md:h-6"
      />

      <span className="font-google font-regular text-xs sm:text-sm md:text-base">
        {nameCategory}
      </span>
    </li>
  );
}