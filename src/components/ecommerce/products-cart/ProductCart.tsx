import { useCartContext } from "@/context/CartContext";
import TitlePage from "../../title-page/TitlePage";
import { Flex, Image, Text } from "@mantine/core";
import { IProduct } from "@/models/product";
import CartQuantity from "./CartQuantity";
import TableCustom from "@/custom-components/CustomTable";
import { useMemo } from "react";


const ViewCart = () => {
  const { cartItems } = useCartContext();

  const totalPrice = useMemo(()=>{

    return cartItems.reduce((total, cartItem) => total + cartItem.price * (cartItem.quantity || 0), 0)
    
  },[cartItems])
 
  return (
    <div>
      <TitlePage title="Cart Detail"></TitlePage>
      <TableCustom
        table={{
          theadCustom: (
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>SubTotal</th>
            </tr>
          ),
        }}
      >
        {cartItems.map((cartItem: IProduct, index) => (
          <tr key={index}>
            <td>
              <Flex
                justify="space-between"
                align="center"
                direction="row"
                wrap="nowrap"
                w={"100%"}
              >
                <div style={{ marginLeft: "40px" }}>
                  <Image
                    maw={100}
                    mx="auto"
                    radius="md"
                    src={cartItem.thumbnail}
                    alt="Product Image"
                  />
                </div>
                <div style={{ marginRight: "40px" }}> {cartItem.title}</div>
              </Flex>
            </td>

            <td>{cartItem.price}</td>

            <td>
              <CartQuantity cartItem={cartItem} />
            </td>

            <td>{cartItem.quantity * cartItem.price || 0}</td>
          </tr>
        ))}
      </TableCustom>

      <Flex
        mih={50}
        gap="md"
        justify="flex-end"
        align="flex-end"
        direction="column"
        wrap="wrap"
        mr={100}
      >
        <Flex columnGap={20}>
          <Text fw={600}>Total Price:</Text>
          <Text> {totalPrice}</Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default ViewCart;
