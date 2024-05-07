import { useForm, useSelect, SaveButton, Create } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateCategoryAntd = () => {
    const { formProps, saveButtonProps } = useForm({
        redirect: "edit",
    });

    return (
        // Create inclu header, navigation to list view, back button and breadcrumbs,xxx/ xxx navigation分层导航,  btn save
        <Create resource="categories" saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                {/* <SaveButton {...saveButtonProps} /> */}
            </Form>
        </Create>
    );
};