import Carts from "@/components/ecommerce/cart/Carts";
import { CartContext } from "@/context/CartContext";
import { Header, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";

const HeaderCustom = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const { cartItems } = useContext(CartContext);

  const totalQuantity = (total, currentValue) => {
    return total + (currentValue.quantity | 0);
  };

  const initialValue = 0;
  const TotalCartItem = cartItems.reduce(totalQuantity, initialValue);

  return (
    <Header height={60} p="xs">
      <div
        style={{
          width: "30px",
          marginLeft: "auto",
          marginRight: "40px",
          position: "relative",
          maxHeight: "200px",
        }}
      >
        <Popover
          width={500}
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
        >
          <Popover.Target>
            <div onMouseEnter={open}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z"
                ></path>
              </svg>
            </div>
          </Popover.Target>
          <Popover.Dropdown onMouseLeave={close}>
            <Carts />
          </Popover.Dropdown>
        </Popover>

        {cartItems?.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {TotalCartItem}
          </div>
        )}
      </div>
    </Header>
  );
};

export default HeaderCustom;
