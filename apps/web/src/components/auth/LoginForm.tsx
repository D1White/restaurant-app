import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginRequest, login } from 'api';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'utils/constants';

export const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginRequest) => {
    login(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Redirecting...',
          duration: 2,
        });

        navigate(RoutesEnum.home);
      })
      .catch(() => {
        notification.error({
          message: 'Error!',
          description: 'Wrong email or password',
          duration: 2,
        });
      });
  };

  return (
    <Form
      layout='vertical'
      size='large'
      style={{ maxWidth: 400, margin: '20px auto' }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Email'
        />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ maxWidth: '150px', width: '100%' }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
