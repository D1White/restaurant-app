import React, { FC, useEffect, useMemo, useState } from 'react';
import { Drawer, Empty, Space } from 'antd';
import { useUserStore } from 'store';
import { fetchOrders } from 'api';
import { Order } from 'types';
import { OrderCard } from './OrderCard';
import { OrderDetails } from './OrderDetails';

interface UserProfileProps {
  open: boolean;
  onClose: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({ open, onClose }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [detailsOrder, setDetailsOrder] = useState('');

  const { user } = useUserStore();

  useEffect(() => {
    fetchOrders().then((res) => {
      setOrders(res);
    });
  }, [open]);

  const { openDetails, closeDetails } = useMemo(() => {
    return {
      openDetails: (orderId: string) => setDetailsOrder(orderId),
      closeDetails: () => setDetailsOrder(''),
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Drawer
      title={`Hi, ${user.name}`}
      width={600}
      closable={false}
      onClose={onClose}
      open={open}
    >
      {orders.length > 0 ? (
        <Space direction='vertical' style={{ width: '100%' }}>
          {orders.map((order) => (
            <OrderCard order={order} onClick={openDetails} key={order._id} />
          ))}
        </Space>
      ) : (
        <Empty description='Немає замовлень' />
      )}

      <OrderDetails orderId={detailsOrder} onClose={closeDetails} />
    </Drawer>
  );
};
