import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import { UserOutlined,LockOutlined  } from '@ant-design/icons'
import {Link} from 'react-router-dom'

const onFinish = (values) => {
  console.log('Success:', values);
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}
export default class Register extends Component {

  // componentDidMount(){
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("get","http://47.93.114.103:6688/manage/article",false);

  //   xhr.send({username: 'kkkkkk', password: '7hj'});
  //   console.log(xhr.status, xhr);
  // }

  getListData(){
    const xhr = new XMLHttpRequest();
    xhr.open("get","http://47.93.114.103:6688/manage/article",false);

    xhr.send({username: 'kkkkkk', password: '7hj'});
    console.log(xhr.status, xhr);
  }
  render() {
    return (
      <div className='register'>
        <div className='register_wrap'>
          <h1 className='register_title'>注册账号</h1>
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinish}
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
              <Link to='/login'>还没账号？立即注册</Link>
            </Form.Item>
            <Form.Item>
              {/* <Button type="primary" block htmlType="submit">
                注册
              </Button> */}
              <Button onClick={this.getListData.bind(this)} type="primary" block >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
