import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { RegisterRequest, register } from 'api';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'utils/constants';

export const SignupForm = () => {
  const navigate = useNavigate();

  const onFinish = (values: RegisterRequest) => {
    console.log(values);

    register({ ...values, phone: `+380${values.phone}` })
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
        label='Name'
        name='name'
        rules={[
          { min: 2, message: 'Min name length is 2 characters' },
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Phone Number'
        name='phone'
        rules={[
          {
            pattern: /\d{9}/,
            message: 'Please input correct phone number!',
          },
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input addonBefore='+380' />
      </Form.Item>

      <Form.Item
        label='Email'
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
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[
          { min: 2, message: 'Min name length is 2 characters' },
          { required: true, message: 'Please input your Password!' },
        ]}
      >
        <Input type='password' />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ maxWidth: '150px', width: '100%' }}
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};
