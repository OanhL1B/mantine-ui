import { FC, useEffect, useState, useCallback, useRef } from "react";
import Card from "./Card";
import { IProduct } from "@/models/product";
import { useCartContext } from "@/context/CartContext";
import { ProductService } from "@/service/productService";
import { FixedSizeGrid } from "react-window";
import { useMediaQuery } from "@mantine/hooks";
import { BaseSearch } from "@/models/product-search/product";

const Cards: FC = () => {
  const { addProduct } = useCartContext();
  const handleAddToCart = (product: IProduct) => {
    addProduct(product);
  };

  const refDiv = useRef(null);
  const gridRef = useRef(null);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>();
  const [params, setParams] = useState<BaseSearch>({ limit: 20, skip: 0 });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
    setLoading(false);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [params]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts(params);
      setTotalProduct(data.total);
      setProducts(data?.products || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isLarge = useMediaQuery("(min-width:1240px)");
  const isXLarge = useMediaQuery("(min-width:1512px)");
  const columnCount = isXLarge ? 4 : isLarge ? 3 : 2;
  const rowHeight = 420;

  const handleResize = useCallback(() => {
    const element = refDiv.current;
    setGridWidth(element?.offsetWidth);
  }, []);

  const sibarWidth = document.getElementById("sidebar")?.offsetWidth;
  const [gridWidth, setGridWidth] = useState(window.innerWidth - sibarWidth);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const product = products[index];

    return (
      <div style={style}>
        {product && <Card item={product} AddToCart={handleAddToCart} />}
        <div>{loading && <div>Loading ......</div>}</div>
      </div>
    );
  };

  const handleScroll = () => {
    if (!gridRef.current) return;
    const isScrolledToBottom =
      gridRef.current.state.scrollTop >
      gridRef.current.props.rowHeight * gridRef.current.props.rowCount -
        (window.innerHeight + 25);
    if (params.limit === totalProduct) return;
    if (isScrolledToBottom) {
      loadMoreProducts();
    }
  };
  const loadMoreProducts = () => {
    setParams((prevParams) => ({
      ...prevParams,
      limit: prevParams.limit + 20,
    }));
    setLoading(true);
  };

  return (
    <div
      ref={refDiv}
      style={{
        height: window.innerHeight - 30,
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <FixedSizeGrid
        ref={gridRef}
        width={gridWidth}
        height={window.innerHeight - 40}
        columnCount={columnCount}
        rowCount={Math.ceil(params.limit / columnCount)}
        columnWidth={gridWidth / columnCount}
        rowHeight={rowHeight}
        style={{
          width: "100%",
        }}
        onScroll={handleScroll}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};

export default Cards;
