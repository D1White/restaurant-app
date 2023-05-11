import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Header, Categories, Dishes, DishModal } from 'components';
import { useUserStore } from 'store';

const { Content } = Layout;

export const Home = () => {
  const { getUser } = useUserStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <DishModal />

      <Layout>
        <Header />

        <Content
          style={{ maxWidth: '1248px', width: '100%', margin: '30px auto 0' }}
        >
          <Categories />

          <Dishes />
        </Content>
      </Layout>
    </>
  );
};
