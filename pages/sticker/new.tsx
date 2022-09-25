import { Button, Form, Input, InputNumber } from "antd";
import { NextRequest, NextResponse } from "next/server";
import React, { useState } from "react";
import PageAlbum from "../collection";

type SizeType = Parameters<typeof Form>[0]["size"];

export default function create() {
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const country = Form.useWatch("country", form);
  const amount = Form.useWatch("amount", form);

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleFinish = async (req: NextRequest) => {
    try {
      let res = await fetch("../api/sticker/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          country: country,
          amount: amount,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        alert("Figurinha adicionada com sucesso");
        window.location.href = "../collection";
      } else {
        alert("Ocorreu um erro no cadastro");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      onFinish={handleFinish}
    >
      <Form.Item label="Nome do jogador" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="País" name="country">
        <Input />
      </Form.Item>
      <Form.Item label="Quantidade" name="amount">
        <InputNumber />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button htmlType="submit">Adicionar</Button>
      </Form.Item>
    </Form>
  );
}
