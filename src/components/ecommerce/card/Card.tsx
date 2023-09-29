import { Image, Text, Button, Group } from "@mantine/core";

const Card = ({ item, AddToCart }) => {

  return (
    <div
      style={{
        padding: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius: "20px",
        position: "relative",
        margin:"10px"
      }}
    >
      <Image src={item?.thumbnail} height={160} alt="Product Image" />

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} mih={40}>
          {item?.title}
        </Text>
      </Group>

      <Text size="sm" color="dimmed" mih={130}>
        {item?.description}
      </Text>

      <Button
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => AddToCart(item)}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Card;
