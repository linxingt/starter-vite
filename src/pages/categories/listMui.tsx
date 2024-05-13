import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListCategoriesMui = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                flex: 1,
                headerName: "Title",
                minWidth: 200,
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const ListCategories = () => {
//   return (
//     <MuiInferencer
//     // resource="categories" // We're omitting this prop because it's inferred from the route
//     // action="list" // We're omitting this prop because it's inferred from the route
//     />
//   );
// };