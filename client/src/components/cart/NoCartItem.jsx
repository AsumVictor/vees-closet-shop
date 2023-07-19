import { Link } from 'react-router-dom';
import CartLogo from '../../assets/images/cart.png'

function NoCartItem({wishList}) {

  const message = wishList ? 'wishList' : 'cart'
  return (
    <div className="flex flex-col items-center mt-10">
      <img src={CartLogo} alt="cart logo" className="w-[5cm] md:w-[7cm]" />
      <p className="font-semibold text-[17px]">{`No item in ${message}`}</p>
      <Link
        to="/products"
        className="underline font-bold mt-10 "
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        Continue shopping
      </Link>
    </div>
  );
}

export default NoCartItem;
