import { useForm, useSelect, SaveButton, Create } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateProductAntd = () => {
    const { formProps, saveButtonProps } = useForm({
        redirect: "edit",
    });

    const { selectProps } = useSelect({
        resource: "categories",
    });

    return (
        // Create inclu header, navigation to list view, back button and breadcrumbs,xxx/ xxx navigation分层导航,  btn save
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Material" name="material">
                    <Input />
                </Form.Item>
                <Form.Item label="Category" name={["category", "id"]}>
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <InputNumber step="0.01" stringMode />
                </Form.Item>
                {/* <SaveButton {...saveButtonProps} /> */}
            </Form>
        </Create>
    );
};