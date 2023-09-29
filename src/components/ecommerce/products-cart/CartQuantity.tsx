import { useCartContext } from "@/context/CartContext";
import ButtonCustom from "@/custom-components/CustomButton";
import useDebounce from "@/hooks/useDebounce";
import { IProduct } from "@/models/product";
import { Flex, Input } from "@mantine/core";
import { useState } from "react";

interface IProps {
  cartItem: IProduct;
}

const CartQuantity = ({ cartItem }: IProps) => {
  const { decrease, addProduct, updateQuantity } = useCartContext();
  const [inputValue, setInputValue] = useState(cartItem.quantity | 0);
  const [clear] = useDebounce(
    () => {
      cartItem.quantity = inputValue;
      updateQuantity(cartItem);
    },
    100,
    [inputValue]
  );

  const handleChange = (e) => {
      const newInputValue = parseInt(e.target.value);
    setInputValue(newInputValue);
  };

  const handleKeyDown = (e) => {
    const input = e.target.value;
    if (input.length === 1 && e.key == "Backspace" ) {
      e.preventDefault();
    }
  };

 

  return (
    <Flex align="center" columnGap={20} justify="center">
      <ButtonCustom variant="delete" size="xs" onClick={clear}>
        CLEAR
      </ButtonCustom>
      <div onClick={() => decrease(cartItem)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M96 235h320v42H96z" fill="currentColor"></path>
        </svg>
      </div>

      <Input
        type="number"
        value={cartItem.quantity}
        onChange={handleChange}
        min={0}
        onKeyDown={handleKeyDown}
        minLength={1}
      />
      <div onClick={() => addProduct(cartItem)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 112v288m144-144H112"
          ></path>
        </svg>
      </div>
    </Flex>
  );
};

export default CartQuantity;
