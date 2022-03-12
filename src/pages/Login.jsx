import React, { Component } from 'react'
import { Input, Button } from 'antd'
import {Link} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../static/login.less'
export default class Login extends Component {
  render() {
    return (
      <div className='login_wrap'>
          <h1 className='login_title'>用户管理平台</h1>
          <div>
            <Input placeholder='请输入用户名' prefix={<UserOutlined/>}/>
            <Input type='password' placeholder='请输入密码' prefix={<LockOutlined/>}/>
            <p className='register_anhor'><Link to='/register'>还没有账号？立即注册</Link></p>
            <Button type="primary" block>登录</Button>
          </div>
      </div>
    )
  }
}
