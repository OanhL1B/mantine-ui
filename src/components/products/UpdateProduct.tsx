import  { useEffect } from "react";
import { Box, TextInput, NumberInput, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { productSchema } from "@/schema/schema";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "@/service/productService";
import { IProduct } from "@/models/product";
import Header from "../title-page/TitlePage";
import { NotificationHelper } from "@/utils/Notification";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(productSchema),
  });

  const idProduct = useParams();

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    
    try {
      const res = await ProductService.getProduct(idProduct.id);
      delete res.id;
      setFormData(res);
    } catch (error) {
      console.log(error);
    }
  };


  const setFormData = (data: Omit<IProduct, "id">) => {
    form.setValues(data);
  };

  const handleSubmitForm = async () => {
    try {
      const res = await ProductService.updateProduct(form.values, idProduct.id);
      if (res?.status === 200) {
        form.reset();

        NotificationHelper.showSuccess({
          title: "updated product is successfully",
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
      <Header title={"Update Product"} />
      <Box maw={340} mx="auto" mt={20}>
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="title"
            {...form.getInputProps("title")}
          />
          <TextInput
            withAsterisk
            label="description"
            placeholder="description"
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

export default UpdateProduct;
