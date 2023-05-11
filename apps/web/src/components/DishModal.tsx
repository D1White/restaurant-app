import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import {
  Button,
  Modal,
  Typography,
  Spin,
  Empty,
  Space,
  Divider,
  InputNumber,
} from 'antd';
import { DishFull } from 'types';
import { fetchDish } from 'api';
import { useUserStore, useOrderStore } from 'store';
import { RoutesEnum } from 'utils/constants';

const { Title, Text } = Typography;

export const DishModal = () => {
  const navigate = useNavigate();
  const { dishId } = useParams();
  const [searchParams] = useSearchParams();

  const [dish, setDish] = useState<DishFull | null>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<1 | 30 | null | undefined>(1);

  const { user } = useUserStore();
  const { addCartItem, dishAddedToCart, removeFromCart } = useOrderStore();
  const isUserAuthorized = Boolean(user?._id);

  useEffect(() => {
    if (dishId) {
      setLoading(true);
      setCount(1);
      fetchDish(dishId)
        .then((res) => setDish(res))
        .finally(() => setLoading(false));
    }
  }, [dishId]);

  const handleCancel = () => {
    navigate(`/?${searchParams.toString()}`);
    setDish(null);
  };

  const handleCountChange = useCallback((value: 1 | 30 | null) => {
    setCount(value);
  }, []);

  const addToCart = () => {
    if (dish) {
      if (isUserAuthorized) {
        addCartItem({ ...dish, count: count as number });
      } else {
        navigate(RoutesEnum.auth);
      }
    }
  };

  const handleRemove = () => {
    if (dish) {
      removeFromCart(dish);
    }
  };

  return (
    <Modal
      open={!!dish?._id}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
    >
      {loading ? (
        <div style={{ margin: 'auto', width: 'fit-content' }}>
          <Spin size='large' />
        </div>
      ) : !dish ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <img
            src={dish.photo}
            alt={dish.name}
            style={{
              width: 'calc(100% + 24px * 2)',
              height: '400px',
              objectFit: 'cover',
              margin: '-20px -24px 0',
              borderRadius: '8px 8px 0 0',
            }}
          />

          <Space direction='vertical' style={{ marginTop: 10 }}>
            <Title level={5}>{dish.name}</Title>

            <Text>{dish.description}</Text>

            <Text>{dish.weight}</Text>
          </Space>

          <Divider />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontWeight: 500 }}>{`${dish.price} ₴`}</Text>

            <Space>
              <InputNumber
                size='large'
                min={1}
                max={30}
                value={count}
                onChange={handleCountChange}
              />

              <Button type='primary' size='large' onClick={addToCart}>
                Додати
              </Button>

              {dishAddedToCart(dish) && (
                <Button danger size='large' onClick={handleRemove}>
                  Видалити
                </Button>
              )}
            </Space>
          </div>
        </>
      )}
    </Modal>
  );
};
