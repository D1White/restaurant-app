import React, { FC, useMemo, useState } from 'react';
import { Drawer, Space, Empty, Button, Typography } from 'antd';
import { useOrderStore } from 'store';
import { CartItem } from './CartItem';
import { CreateOrder } from './CreateOrder';

const { Text } = Typography;

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export const Cart: FC<CartProps> = ({ open, onClose }) => {
  const { cart } = useOrderStore();

  const [isSecondStep, setIsSecondStep] = useState(false);

  const orderSum = useMemo(() => {
    return cart.reduce((prev, curr) => {
      return prev + curr.price * curr.count;
    }, 0);
  }, [cart]);

  const orderList = useMemo(() => cart.map((dish) => dish._id), [cart]);

  const { openSecondStep, closeSecondStep, closeAll } = useMemo(() => {
    return {
      openSecondStep: () => setIsSecondStep(true),
      closeSecondStep: () => setIsSecondStep(false),
      closeAll: () => {
        setIsSecondStep(false);
        onClose();
      },
    };
  }, []);

  return (
    <Drawer
      title='Кошик'
      width={600}
      closable={false}
      onClose={onClose}
      open={open}
    >
      {cart.length > 0 ? (
        <Space direction='vertical' style={{ width: '100%' }}>
          {cart.map((dish) => (
            <CartItem dish={dish} key={dish._id} />
          ))}

          <Space style={{ marginTop: 20 }}>
            <Text>Разом:</Text>
            <Text style={{ fontWeight: 600 }}>{`${orderSum} ₴`}</Text>
          </Space>

          <Button
            type='primary'
            size='large'
            style={{ marginTop: 20 }}
            onClick={openSecondStep}
          >
            Доставка
          </Button>
        </Space>
      ) : (
        <Empty description='Кошик пустий' />
      )}

      <CreateOrder
        open={isSecondStep}
        onClose={closeSecondStep}
        onCloseAll={closeAll}
        orderSum={orderSum}
        orderList={orderList}
      />
    </Drawer>
  );
};
