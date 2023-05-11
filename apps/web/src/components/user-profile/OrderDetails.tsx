import { Drawer, Space, Spin, Typography } from 'antd';
import { fetchOrder } from 'api';
import React, { FC, useEffect, useState } from 'react';
import { OrderFull } from 'types';

const { Text } = Typography;

interface OrderDetailsProps {
  orderId: string;
  onClose: () => void;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<OrderFull>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      fetchOrder(orderId)
        .then((res) => {
          setOrder(res);
        })
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  return (
    <Drawer
      width={400}
      closable={false}
      onClose={onClose}
      open={!!orderId}
      title={order?._id || ''}
    >
      {loading || !order ? (
        <Spin size='large' />
      ) : (
        <Space direction='vertical'>
          <Space size='large'>
            <Text style={{ fontWeight: 500 }}>Адреса:</Text>
            <Text>{order.address}</Text>
          </Space>
          <Space size='large'>
            <Text style={{ fontWeight: 500 }}>Тип оплати:</Text>
            <Text>{order.payment_type}</Text>
          </Space>
          <Space size='large'>
            <Text style={{ fontWeight: 500 }}>Статус:</Text>
            <Text>{order.status}</Text>
          </Space>

          <Text style={{ fontWeight: 500 }}>Замовлення:</Text>

          {order.order_list?.map((dish) => (
            <Space key={dish._id}>
              <img
                src={dish.photo}
                alt={dish.name}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '4px',
                  objectFit: 'cover',
                }}
              />

              <Space direction='vertical'>
                <Text style={{ fontSize: '18px', fontWeight: 500 }}>
                  {dish.name}
                </Text>

                <Space size='large'>
                  <Text>{dish.weight}</Text>
                  <Text
                    style={{ marginLeft: 'auto' }}
                  >{`${dish.price} ₴`}</Text>
                </Space>
              </Space>
            </Space>
          ))}
        </Space>
      )}
    </Drawer>
  );
};
