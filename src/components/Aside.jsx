import React from 'react'
import {Menu, Layout,} from 'antd';
import {SettingOutlined, MailOutlined,AppstoreOutlined} from '@ant-design/icons';
const { Sider } = Layout;
export default function Aside() {
  return (
    <div>
      <Sider>
        <Menu
          theme="dark"
          defaultOpenKeys={['list']}
        >
          <Menu.Item key="list" icon={<MailOutlined/>}>
          文章列表
          </Menu.Item>
          <Menu.Item key="edit" icon={<AppstoreOutlined/>}>
          编辑文章
          </Menu.Item>
          <Menu.Item key="personal" icon={<SettingOutlined/>}>
          个人资料
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}
