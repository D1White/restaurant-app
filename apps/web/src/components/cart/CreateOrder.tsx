import React, { FC } from 'react';
import {
  Drawer,
  Space,
  Button,
  Typography,
  Form,
  Input,
  Radio,
  notification,
} from 'antd';
import { useOrderStore } from 'store';
import { PaymenTypeEnum } from 'types';
import { createOrder } from 'api';

const { Text } = Typography;

interface CreateOrderProps {
  orderSum: number;
  orderList: string[];
  open: boolean;
  onClose: () => void;
  onCloseAll: () => void;
}

export const CreateOrder: FC<CreateOrderProps> = ({
  open,
  onClose,
  onCloseAll,
  orderSum,
  orderList,
}) => {
  const { clearCart } = useOrderStore();

  const onCreateOrder = (values: {
    address: string;
    paymentType: PaymenTypeEnum;
  }) => {
    createOrder({
      address: values.address,
      payment_type: values.paymentType,
      order_list: orderList,
    })
      .then(() => {
        onCloseAll();
        clearCart();
        notification.success({
          message: 'Замовлення створено',
          description: 'Відслідковуйте замовлення в профілі',
          duration: 2,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Щось пішло не так',
          description: 'Спробуй трохи пізніше',
          duration: 2,
        });
      });
  };

  return (
    <Drawer width={400} closable={false} onClose={onClose} open={open}>
      <Form name='order' layout='vertical' onFinish={onCreateOrder}>
        <Form.Item
          label='Адреса'
          name='address'
          rules={[
            { min: 5, message: 'Min address length is 5 characters' },
            { required: true, message: 'Please input your address!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Тип оплати'
          name='paymentType'
          rules={[{ required: true, message: 'Please input payment type!' }]}
        >
          <Radio.Group>
            <Radio.Button value={PaymenTypeEnum.card}>Карта</Radio.Button>
            <Radio.Button value={PaymenTypeEnum.cash}>Готівка</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Space style={{ marginBottom: 20 }}>
          <Text>До оплати:</Text>
          <Text style={{ fontWeight: 600 }}>{`${orderSum} ₴`}</Text>
        </Space>

        <Form.Item>
          <Button type='primary' htmlType='submit' size='large'>
            Замовити
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
