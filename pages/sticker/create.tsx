import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import React, { useState } from "react";

type SizeType = Parameters<typeof Form>[0]["size"];

export default function create() {
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
    >
      <Form.Item label="Nome do jogador">
        <Input />
      </Form.Item>
      <Form.Item label="País">
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button htmlType="submit">Cadastrar</Button>
      </Form.Item>
    </Form>
  );
}
