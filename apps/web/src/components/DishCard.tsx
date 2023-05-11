import React, { FC } from 'react';
import { Card, Typography } from 'antd';
import { Dish } from 'types';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

interface DishCardProps {
  data: Dish;
}

export const DishCard: FC<DishCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    navigate(`/${data._id}?${searchParams.toString()}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      cover={
        <img
          src={data.photo}
          alt={data.name}
          height='270px'
          style={{ objectFit: 'cover' }}
        />
      }
    >
      <Title level={5}>{data.name}</Title>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text>{`${data.price} ₴`}</Text>
        <Text style={{ fontWeight: 500 }}>{data.weight}</Text>
      </div>
    </Card>
  );
};
