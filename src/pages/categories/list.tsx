// import { AntdInferencer } from "@refinedev/inferencer/antd";

// export const ListCategories = () => {
//   return (
//     // generate a list view auto

//     (<AntdInferencer
//     // resource="categories" // We're omitting this prop because it's inferred from the route
//     // action="list" // We're omitting this prop because it's inferred from the route
//     />)
//   );
// };

import React from "react";
import { BaseRecord, useNavigation, getDefaultFilter } from "@refinedev/core";
import { useTable, List, useSelect, EditButton, DeleteButton, ShowButton, getDefaultSortOrder, FilterDropdown } from "@refinedev/antd";
import { Table, Space, Input } from "antd";

export const ListCategories = () => {
    const { tableProps, sorters, filters } = useTable({
        sorters: { initial: [{ field: "id", order: "asc" }] },
        filters: {
            initial: [{ field: "title", operator: "contains", value: "a" }],
        },
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" sorter defaultSortOrder={getDefaultSortOrder("id", sorters)} />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <DeleteButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
