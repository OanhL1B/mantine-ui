import { Flex, Image, Text } from "@mantine/core";



const Cart = ({ item }) => {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="nowrap"
      w={"100%"}
    >
      <Image maw={100} radius="md" src={item?.thumbnail} alt="Random image" />
      <Text fw={700}>{item?.title}</Text>
      <Text fw={700}>${item.price}</Text>
    </Flex>
  );
};

export default Cart;
