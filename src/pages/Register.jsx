import React, { Component } from 'react'
import {Form, Input, Button,message} from 'antd'
import { UserOutlined,LockOutlined  } from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { RegisterApi } from '../request/api';

// 
export default  function Register  () {
  const navigate = useNavigate();
  
  function getListData(username, password){
    axios({
      method: 'post',
      url: '/api/register',
      data: {username,password}
    }).then((res) => {
      console.log(res);
      if(res.data && res.data.errCode === 0){
        message.success('注册成功，将返回登录页',1,()=>{
          // 注册成功跳入登录页
          // window.location.pathname = '/login'
          navigate('/login')
        });
        
      }else if(res.data && res.data.errCode === 1){
        message.error('已存在用户名注册失败');
      }
    })
  }
  // 提交且输入完成时，请求数据
  function onFinish (values)   {
    const {password, username} = values;
    console.log(12212);
    RegisterApi({
      username, password
    }).then((data)=>{
      if(data.errCode === 0) {
        message.success('注册成功，将返回登录页',1 , () => {
          navigate('/login')
        })
      }
      if(data.errCode === 1) {
        message.error('已存在用户名注册失败')
      }
    }, ()=> {})
    // getListData(username, password);
  }

  // 输入数据不完整
  function onFinishFailed (errorInfo)  {
    console.log('Failed:', errorInfo);
  }
    return (
      <div className='register'>
        <div className='register_wrap'>
          <h1 className='register_title'>注册账号</h1>
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input prefix={<UserOutlined/>} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input type='password' placeholder="请输入密码" prefix={<LockOutlined/> }/>
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认你的密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码不匹配!'));
                  },
                }),
              ]}
            >
              <Input type='password' prefix={<LockOutlined/>} placeholder='请确认密码' />
            </Form.Item>
            <Form.Item>
              <Link to='/login'>已有账号？前往登录</Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                注册
              </Button>
              {/* <Button onClick={this.getListData.bind(this)} type="primary" block >
                注册
              </Button> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  

}
