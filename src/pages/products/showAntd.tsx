import { useShow, useOne } from "@refinedev/core";
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProductAntd = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow();

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: data?.data?.category.id || "",
    queryOptions: {
      enabled: !!data?.data,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // Show inclu xxx / xxx navigation,title, back flech, 3 btn (menu produit edit et refresh)
    (<Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={data?.data?.id} />
      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={data?.data?.name} />
      <Typography.Title level={5}>Description</Typography.Title>
      <MarkdownField value={data?.data?.description} />
      <Typography.Title level={5}>Material</Typography.Title>
      <TextField value={data?.data?.material} />
      <Typography.Title level={5}>Category</Typography.Title>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
      />
      <Typography.Title level={5}>Price</Typography.Title>
      <NumberField value={data?.data?.price} />
    </Show>)
  );
};
{/* 
- displays
<BooleanField />, displays a checkbox element for boolean values.
<DateField />, displays a date with customizable formatting.
<EmailField />, displays an email with a mailto anchor.
<FileField />, displays a download anchor for file.
<ImageField />, displays an image with Ant Design's <Image /> component.
<MarkdownField />, displays a GitHub flavored markdown with react-makrdown library.
<NumberField />, displays a number with localized and customizable formatting.
<TagField />, displays the value with Ant Design's <Tag /> component.
<TextField />, displays the value with Ant Design's <Typography.Text /> component.
<UrlField />, displays the value with a link anchor. 
*/}