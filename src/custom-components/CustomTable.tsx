import { Table, TableProps } from "@mantine/core";
import PaginationCustom, { PropsPagination } from "./CustomPagination";
import { FC, ReactNode } from "react";

interface IPropsTable extends TableProps {
  theadCustom: ReactNode;
}
interface IProps {
  table?: IPropsTable;
  children: ReactNode;
  pagination?: PropsPagination;
  
}

const TableCustom: FC<IProps> = ({ table, pagination, children }) => {
  const {theadCustom, ...rest} = table

  return (
    <div>
      <Table
        highlightOnHover
        captionSide="bottom"
        {...rest}
        verticalSpacing="sm"
        styles={{ thumb: { backgroundColor: "red" } }}
        withBorder
        withColumnBorders
      >

        <thead>
          {theadCustom}
        </thead>

        <tbody>{children}</tbody>
      </Table>
      {pagination && (
        <PaginationCustom
          position="center"
          {...pagination}
          style={{ marginTop: "40px" }}
        />
      )}
    </div>
  );
};

export default TableCustom;
