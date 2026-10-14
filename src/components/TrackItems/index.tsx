import { LuSoup } from "react-icons/lu";

export function TrackItems({ quantity }:{ quantity: number }){
  return (
    <>
      {Array.from({ length: quantity }, (_, index) => (
        <div
          key={index}
          className="flex shrink-0 items-center gap-2"
        >
          <LuSoup size={24} color="#F97318" />

          <span className="font-google font-regular">
            Vontade de Comer Delivery
          </span>
        </div>
      ))}
    </>
  );
}