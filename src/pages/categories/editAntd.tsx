import { useForm, useSelect, SaveButton, Edit } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const EditCategoryAntd = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    redirect: "show",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};