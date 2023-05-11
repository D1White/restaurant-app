import React from 'react';
import { Layout, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { LoginForm, SignupForm } from 'components';

const { Content } = Layout;

enum AuthTabsEnum {
  login = 'login',
  signup = 'signup',
}

const tabs: TabsProps['items'] = [
  {
    key: AuthTabsEnum.login,
    label: `Log In`,
    children: <LoginForm />,
  },
  {
    key: AuthTabsEnum.signup,
    label: `Sign Up`,
    children: <SignupForm />,
  },
];

export const Auth = () => {
  return (
    <Layout style={{ maxHeight: '100vh' }}>
      <Content
        style={{ maxWidth: '960px', width: '100%', margin: '20px auto' }}
      >
        <Tabs
          defaultActiveKey={AuthTabsEnum.login}
          items={tabs}
          centered
          size='large'
        />
      </Content>
    </Layout>
  );
};
