import React, { FC } from 'react';
import { Button, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { CartDish } from 'types';
import { useOrderStore } from 'store';

const { Text, Title } = Typography;

interface CartItemProps {
  dish: CartDish;
}

export const CartItem: FC<CartItemProps> = ({ dish }) => {
  const { removeFromCart } = useOrderStore();

  const handleRemove = () => {
    removeFromCart(dish);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
      }}
    >
      <img
        src={dish.photo}
        alt={dish.name}
        style={{
          width: 60,
          height: 60,
          borderRadius: '4px',
          objectFit: 'cover',
        }}
      />

      <Space direction='vertical'>
        <Title level={5}>{dish.name}</Title>

        <Text>{dish.weight}</Text>
      </Space>

      <Space style={{ marginLeft: 'auto' }} size='large'>
        <Text>
          {`${dish.count} x `}
          <Text style={{ fontWeight: 500 }}>{`${dish.price} ₴`}</Text>
        </Text>

        <Button icon={<CloseOutlined />} onClick={handleRemove} />
      </Space>
    </div>
  );
};
