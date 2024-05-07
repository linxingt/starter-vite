import { useShow, useOne } from "@refinedev/core";
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowCategoryAntd = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // Show inclu xxx / xxx navigation,title, back flech, 3 btn (menu produit edit et refresh)
    (<Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={data?.data?.id} />
      <Typography.Title level={5}>Title</Typography.Title>
      <TextField value={data?.data?.title} />
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