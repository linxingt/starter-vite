import React from "react";
import { useMany,useSelect  } from "@refinedev/core";
import { List, useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProductsMui = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const {
    options: categories,
    queryResult: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
  });

//   const { data: categories, isLoading } = useMany<ICategory>({
//     resource: "categories",
//     ids: dataGridProps?.rows?.map((product) => product.category?.id) ?? [],
//   });

  // We're defining the columns for our table according to the `<DataGrid />` component's `columns` prop.
  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,
        // renderCell: function render({ row }) {
        //   if (isLoading) return "Loading...";

        //   return categories?.data?.find(
        //     (category) => category.id == row.category.id,
        //   )?.title;
        // },

        // We're defining the column type as `singleSelect` and providing the options to the `valueOptions` prop.
        type: "singleSelect",
        valueOptions: categories,
        // Since now the options are in an object format, we need to provide the `valueFormatter` prop to pick the value of the option.
        valueFormatter: (params) => params.value,
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          return categories?.find(
            (category) => category.value == row.category.id,
          )?.label;
        },
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          );
        },
      },
    ],
    [categories, isLoading],
  );

  return (
    // <div>
    //   <h1>Products</h1>
    //   <DataGrid {...dataGridProps} columns={columns} autoHeight />
    // </div>
    // List ajout btn create auto
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

interface IProduct {
  id: number;
  name: string;
  material: string;
  price: string;
  category: ICategory;
}

interface ICategory {
  id: number;
  title: string;
}

{/* 
<CreateButton />, renders a button to navigate to the create route.
<EditButton />, renders a button to navigate to the edit route.
<ListButton />, renders a button to navigate to the list route.
<ShowButton />, renders a button to navigate to the show route.
<CloneButton />, renders a button to navigate to the clone route.
<DeleteButton />, renders a button to delete a record.
<SaveButton />, renders a button to trigger the form submission.
<RefreshButton />, renders a button to refresh/refetch the data.
<ImportButton />, renders a button to trigger import bulk data with CSV/Excel files.
<ExportButton />, renders a button to trigger export bulk data with CSV format. 
*/}