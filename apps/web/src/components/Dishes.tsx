import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spin, Row, Col, Empty } from 'antd';
import { fetchDishes } from 'api';
import { Dish } from 'types';
import { DishCard } from './DishCard';

export const Dishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    fetchDishes(queryCategory)
      .then((res) => {
        setDishes(res);
      })
      .finally(() => setLoading(false));
  }, [queryCategory]);

  return (
    <section style={{ marginTop: 30 }}>
      {loading ? (
        <div
          style={{
            padding: '20px 0',
            margin: '10px auto',
            width: 'fit-content',
          }}
        >
          <Spin size='large' />
        </div>
      ) : !dishes || dishes.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Row gutter={[16, 16]}>
          {dishes.map((dish) => (
            <Col span={8} key={dish._id}>
              <DishCard data={dish} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
};
