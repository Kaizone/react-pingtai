import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import {Link, Navigate} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../static/login.less'
import { LoginApi } from '../request/api';
export default class Login extends Component {
    state = {
        userName: '',
        passWord: '',
    }
    // 参数第一位，事件对象第二
    changeTxt(inpType, e){
        // if(inpType === 'username'){
        //     this.setState({
        //         userName: e.target.value
        //     })
        // }else if(inpType === 'password') {
        //     this.setState({
        //         passWord: e.target.value
        //     })
        // }

        switch (inpType) {
					case 'username':
						this.setState({
							userName: e.target.value.trim()
						});
						break;
					case 'password':
						this.setState({
								passWord: e.target.value.trim()
						});
						break;
					default:
						break;
        }
    }
		createHttp(username,password){
			axios({
				method: 'post',
				url: '/api/login',
				data: {username,password}
			}).then((res) => {
				if (res.data.errCode === 0) {
					message.success(`${res.data.message}即将跳转主页`, 1, () => {
					const {data} = res.data;
					window.localStorage.setItem('avatar',data.avatar)
					localStorage.setItem('cms-token', data['cms-token'])
					localStorage.setItem('editable', data.editable);
					localStorage.setItem('username', data.username);
					localStorage.setItem('player', data.player)

					localStorage.setItem('localdata', JSON.stringify(data))
					sessionStorage.setItem('sessionName', data.username)
					sessionStorage.setItem('sessiedit', data.editable)
					window.location.pathname = '/list'
					})
				} else {
					message.error(`登陆失败${res.data.message}`);
				}
			})
		}
		toLogin() {
			const {userName :username, passWord : password} = this.state;
			if (!username){
				message.error('填写用户名')
			}else if (!password){
				message.error('请输入密码')
			}else {
				this.createHttp(username,password);
			}

		}
  render() {
      const {userName, passWord} = this.state;
    return (
      <div className='login_wrap'>
          <h1 className='login_title'>用户管理平台</h1>
          <div>
            <Input value={userName} placeholder='请输入用户名' name='username' prefix={<UserOutlined/>}
                onChange={this.changeTxt.bind(this, 'username')}
            />
            <Input value={passWord} type='password' name='password' placeholder='请输入密码' prefix={<LockOutlined/>}
                onChange={this.changeTxt.bind(this, 'password')}
            />
            <p className='register_anhor'><Link to='/register'>还没有账号？立即注册</Link></p>
            <Button onClick={this.toLogin.bind(this)} type="primary" block>登录</Button>
            
          </div>
      </div>
    )
  }
}
