import { BaseSearch } from "@/models/product-search/product";
import { Pagination, PaginationProps } from "@mantine/core";
import { FC } from "react";

export interface PropsPagination extends Omit<PaginationProps,'total'> {

  params:BaseSearch;
  totalItem:number;
  onChangePage:(data:BaseSearch)=>void;
  
}


const PaginationCustom: FC<PropsPagination> = (
  {params,totalItem,onChangePage,...rest}: PropsPagination

) => {

  const onChange=(e)=>{

    onChangePage?.({
      ...params,
      skip:params.limit*(e-1)
    })

  }
  const total = Math.ceil(totalItem/params.limit)

  return (
  
    <div>
      <Pagination total={total} {...rest} onChange={onChange} style={{ marginTop: "40px" }} />
    </div>
  );
};

export default PaginationCustom;
