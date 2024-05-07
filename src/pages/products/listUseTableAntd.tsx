import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  List,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const ListProductsUseTableAntd = () => {
  // We'll use pass `tableProps` to the `<Table />` component,
  // This will manage the data, pagination, filters and sorters for us.
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: 2 }],
    },
    syncWithLocation: true,//url change selon filtre sorter
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  // select list for category
  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });

  // only implemented the eq filter. 
  // category.id field is best to be filtered with in operator 
  // name field is best to be filtered with contains operators.

  return (
    <div>
      <h1>Products</h1>
      {/* List will automatically add a button for /products/create */}
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title="ID"
            sorter
            defaultSortOrder={getDefaultSortOrder("id", sorters)}
          />
          <Table.Column
            dataIndex="name"
            title="Name"
            sorter
            defaultSortOrder={getDefaultSortOrder("name", sorters)}
            // FilterDropdown will map the value to the filter
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex={["category", "id"]}
            title="Category"
            render={(value) => {
              if (isLoading) {
                return "Loading...";
              }

              return categories?.data?.find((category) => category.id == value)
                ?.title;
            }}
            filterDropdown={(props) => (
              <FilterDropdown
                {...props}
                // We'll store the selected id as number
                mapValue={(selectedKey) => Number(selectedKey)}
              >
                <Select style={{ minWidth: 200 }} {...selectProps} />
              </FilterDropdown>
            )}
            defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
          />
          <Table.Column dataIndex="material" title="Material" />
          {/* <Table.Column dataIndex="price" title="Price" /> */}
          <Table.Column
            dataIndex="price"
            title="Price"
            sorter
            defaultSortOrder={getDefaultSortOrder("price", sorters)}
          />
          <Table.Column
            title="Actions"
            render={(_, record) => (
              <Space>
                {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
                <ShowButton hideText size="small" recordItemId={record.id} />
                <EditButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </div>
  );
};
{/* 
- renders a button to navigate
<CreateButton />, to the create route.
<EditButton />, to the edit route.
<ListButton />, to the list route.
<ShowButton />, to the show route.
<CloneButton />, to the clone route.
- renders a button 
<DeleteButton />, to delete a record记录.
<SaveButton />, to trigger触发 the form submission.
<RefreshButton />, to refresh/refetch刷新 the data.
<ImportButton />, to trigger import bulk批量 data with CSV/Excel files.
<ExportButton />, to trigger export bulk data with CSV format. 
*/}

// // Supported operators:
// type CrudOperators =
// | "eq" // Equal
// | "ne" // Not equal
// | "lt" // Less than
// | "gt" // Greater than
// | "lte" // Less than or equal to
// | "gte" // Greater than or equal to
// | "in" // Included in an array
// | "nin" // Not included in an array
// | "contains" // Contains
// | "ncontains" // Doesn't contain
// | "containss" // Contains, case sensitive
// | "ncontainss" // Doesn't contain, case sensitive
// | "between" // Between
// | "nbetween" // Not between
// | "null" // Is null
// | "nnull" // Is not null
// | "startswith" // Starts with
// | "nstartswith" // Doesn't start with
// | "startswiths" // Starts with, case sensitive
// | "nstartswiths" // Doesn't start with, case sensitive
// | "endswith" // Ends with
// | "nendswith" // Doesn't end with
// | "endswiths" // Ends with, case sensitive
// | "nendswiths" // Doesn't end with, case sensitive
// | "or" // Logical OR
// | "and"; // Logical AND