import { Box, TextInput, NumberInput, Group, Button } from "@mantine/core";

import { useForm, zodResolver } from "@mantine/form";
import { productSchema } from "@/schema/schema";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/models/product";
import { ProductService } from "@/service/productService";
import { NotificationHelper } from "@/utils/Notification";

const AddProduct = () => {
  const navigate = useNavigate();
  const Product = new IProduct();
  const form = useForm<IProduct>({
    validate: zodResolver(productSchema),
    initialValues: Product,
    validateInputOnChange: true,
  });
  const handleSubmitForm = async (values: IProduct) => {
    try {
      const data = await ProductService.addProduct(values);
      if (data?.status === 200) {
        form.reset();
        NotificationHelper.showSuccess({
          title: "Added product is successfully",
          message: "Hey there, your code is awesome",
        });
        navigate("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <s title={"Add Product"} />

      <Box maw={340} mx="auto" mt={50}>
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <TextInput
            withAsterisk
            label="description"
            placeholder="Description"
            mt="sm"
            {...form.getInputProps("description")}
          />
          <NumberInput
            withAsterisk
            label="price"
            placeholder="Price"
            mt="sm"
            {...form.getInputProps("price")}
          />

          <Group position="right" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default AddProduct;
