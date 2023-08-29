import { HiBadgeCheck } from "react-icons/hi";

export function PaymentRadio({ label, img, id, value, handleChange }) {
  return (
    <div className="payment-check relative">
      <label htmlFor={id} className="h-[1cm] bg-red-400">
        <input
          type="radio"
          name="payment"
          id={id}
          className="payment absolute"
          value={value}
          onChange={handleChange}
        />
        <div className="checkbox w-full py-2 rounded-md flex flex-col justify-center items-center gap-2 px-2 relative">
          <img src={img} alt={label} className="w-[1cm] h-[1cm]" />
          <h2 className="text-[14px] text-center">{label}</h2>
          <HiBadgeCheck className="absolute top-1 right-1 check" size={20} />
        </div>
      </label>
    </div>
  );
}
