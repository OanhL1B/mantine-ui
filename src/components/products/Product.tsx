import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/models/product";
import { ProductService } from "@/service/productService";
import TableCustom from "@/custom-components/CustomTable";
import Header from "../title-page/TitlePage";
import ButtonCustom from "@/custom-components/CustomButton";
import { BaseSearch } from "@/models/product-search/product";
import { CustomModal } from "@/custom-components/CustomModal";
import { NotificationHelper } from "@/utils/Notification";

const Product = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [totalItem, setTotalItem] = useState<number>();
  const [params, setParams] = useState<BaseSearch>(new BaseSearch());

  useEffect(() => {
    fetchProducts();
  }, [params]);

  const fetchProducts = async () => {
    try {
      const data = await ProductService.getProducts(params);

      setTotalItem(data.total);
      setProductData(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetPage = (props) => {
    setParams((prev) => ({
      ...prev,
      ...props,
    }));
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await ProductService.deleteProduct(id);
      if (response?.status === 200) {
        NotificationHelper.showSuccess({
          title: "Delete product is successfully",
          message: "Hey there, your code is awesome",
        });
      }
    } catch (error) {
      NotificationHelper.showError({
        title: "Delete product is Error",
        message: "Hey there, your code is awesome",
      });
    }
  };

  const openDeleteModal = (id: number) => {
    CustomModal.showConfirm({
      title: "Delete your product",
      children: (
        <Text size="sm">
          Are you sure you want to delete your product? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      onConfirm: () => handleDelete(id),
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Header title={"Product Manager"} />
      <ButtonCustom
        variant="add"
        onClick={() => navigate("/product/add")}
        size="xxl"
      >
        ADD
      </ButtonCustom>

      <TableCustom
        pagination={{
          totalItem,
          params,
          onChangePage: handleSetPage,
        }}
        table={{theadCustom:
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Desciption</th>
            <th>Price</th>
            <th>Actions</th>
          </tr> 
        
        }}
      >
        {productData?.map((product: IProduct) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>
              <ButtonCustom
                onClick={() => openDeleteModal(product.id)}
                variant="delete"
                size="xl"
                mr={20}
              >
                Delete
              </ButtonCustom>
              <ButtonCustom
                onClick={() => navigate(`/product/${product.id}`)}
                color="white"
                bg={"blue"}
                size="xl"
                variant={"add"}
              >
                Edit
              </ButtonCustom>
            </td>
          </tr>
        ))}
      </TableCustom>
    </div>
  );
};

export default Product;
