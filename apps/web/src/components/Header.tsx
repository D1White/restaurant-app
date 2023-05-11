import React, { useMemo, useState } from 'react';
import { Layout, Avatar, Typography, Space, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { useUserStore } from 'store';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'utils/constants';
import { UserProfile, Cart } from './index';

export const Header = () => {
  const navigate = useNavigate();

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { user } = useUserStore();
  const isUserAuthorized = Boolean(user?._id);

  const { openCart, closeCart, openUserProfile, closeUserProfile } =
    useMemo(() => {
      return {
        openUserProfile: () => setUserProfileOpen(true),
        closeUserProfile: () => setUserProfileOpen(false),
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
      };
    }, []);

  const onClick = (): void => {
    if (isUserAuthorized) {
      openUserProfile();
    } else {
      navigate(RoutesEnum.auth);
    }
  };

  return (
    <>
      <Layout.Header
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Text>MagniGusto</Typography.Text>

        <Space size='middle'>
          <Avatar
            icon={!isUserAuthorized && <UserOutlined />}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          >
            {isUserAuthorized && user?.name.slice(0, 1)}
          </Avatar>

          {isUserAuthorized && (
            <Button
              shape='circle'
              icon={<ShoppingCartOutlined />}
              onClick={openCart}
            />
          )}
        </Space>
      </Layout.Header>

      <UserProfile open={userProfileOpen} onClose={closeUserProfile} />

      <Cart open={cartOpen} onClose={closeCart} />
    </>
  );
};
