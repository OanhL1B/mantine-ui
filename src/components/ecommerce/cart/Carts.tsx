import { useCartContext } from "@/context/CartContext";
import Cart from "./Cart";
import { Button, Flex, ScrollArea } from "@mantine/core";
import { Link } from "react-router-dom";
import { FC } from "react";

const Carts: FC = () => {
  const { cartItems } = useCartContext();

  return (
    <div>
      <ScrollArea h={250}>
        <div
          style={{
            padding: "20px",
            width: "100%",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {cartItems.map((cartItem, index) => (
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
              mb={10}
              key={index}
            >
              <Cart item={cartItem} />
            </Flex>
          ))}
        </div>
      </ScrollArea>
      <div
        style={{
          position: "sticky",
          bottom: 0,
          marginTop: "auto",
          padding: "10px 0",
          backgroundColor: "white",
          borderTop: "1px solid #ccc",
        }}
      >
        <Link to="/view-cart">
          <Button w={"100%"} mt={20}>
            VIEW CART
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Carts;
