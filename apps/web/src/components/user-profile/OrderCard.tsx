import { Card, Button, Space, Typography } from 'antd';
import React, { FC } from 'react';
import { Order } from 'types';

interface OrderCardProps {
  order: Order;
  onClick: (orderId: string) => void;
}

export const OrderCard: FC<OrderCardProps> = ({ order, onClick }) => {
  const handleClick = () => {
    onClick(order._id);
  };

  return (
    <Card
      size='small'
      title={order._id}
      extra={<Button onClick={handleClick}>Деталі</Button>}
      style={{ width: '100%' }}
    >
      <Space direction='vertical'>
        <Space size='large'>
          <Typography.Text style={{ fontWeight: 500 }}>Адреса:</Typography.Text>
          <Typography.Text>{order.address}</Typography.Text>
        </Space>
        <Space size='large'>
          <Typography.Text style={{ fontWeight: 500 }}>
            Тип оплати:
          </Typography.Text>
          <Typography.Text>{order.payment_type}</Typography.Text>
        </Space>
        <Space size='large'>
          <Typography.Text style={{ fontWeight: 500 }}>Статус:</Typography.Text>
          <Typography.Text>{order.status}</Typography.Text>
        </Space>
      </Space>
    </Card>
  );
};
