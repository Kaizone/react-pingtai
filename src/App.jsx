import React, { useEffect,useState } from 'react'
import {Breadcrumb, Layout,Menu,Dropdown,message} from 'antd'
import {Link, Outlet,useNavigate, useLocation} from 'react-router-dom';
import { SettingOutlined, MailOutlined,AppstoreOutlined, HomeOutlined} from '@ant-design/icons';
import './static/App.less'
import defaultAvatar from '../src/static/defaultAvatar.webp';
import {connect} from 'react-redux';

const { Header, Footer, Sider, Content } = Layout;

// const 
function App (props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setuserName] = useState('游客');
  const [defaultKey, setDefaultKey] = useState('list');
  const [breadState, setBreadState] = useState('list')

  useEffect(()=> {
    // 修改资料跳转
    let path = location.pathname;
    console.log(defaultKey);
    let key = path.split('/')[1];
    setDefaultKey(key);

    // 是否登录，和获取存储的用户信息
    // const localAvatar = localStorage.getItem('avatar');
    // const localUserName = localStorage.getItem('username');
    const {avatar: localAvatar, username: localUserName} = localStorage.valueOf();
    if (localAvatar) {
      setAvatar(`http://47.93.114.103:6688/${localAvatar}`);
    }
    if (localUserName) {
      setuserName(localUserName);
    }
    
    
  }, [localStorage.getItem('avatar')])

  const menu = ()=>{
    return(
      <Menu>
      <Menu.Item  onClick={handlcick} key='personal'>
      修改资料
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item>
        <span onClick={logout}>退出登录</span>
      </Menu.Item>
    </Menu>
    )
  }
  // 退出登录
  const logout = () => {
    localStorage.clear();
    message.success('退出将跳转登录页', 1, () => {
      navigate('/login')
    })
  }

  // 跳转到修改个人资料
  const handlcick = (e) => {
    navigate(`/${e.key}`);
    setDefaultKey(e.key);
    setBreadState(e.key)
  }
  
  const breadcrumbRoute = {
    list : "文章列表",
    edit : "编辑文章",
    personal : "个人资料",
  }
    return (
      <div className='app_wrap'>
          <Layout>
            <Header key={props.avatarReload}>
              <h1 className='header_title fl'> <Link to="/">管理平台应用</Link> </h1>
              <Dropdown overlay={menu} placement="bottom">
                <div className='user_wrap fr'>
                  <img src={avatar} className="avatar" alt="头像" />
                  <span className='user_name'>{username}</span>
                </div>
              </Dropdown>
            </Header>
            <Layout>
              <Sider>
                <Menu
                  onClick={handlcick}
                  theme="dark"
                  defaultSelectedKeys={[defaultKey]}
                  selectedKeys={[defaultKey]}
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
              <Content className='content_wrap'>
                <div className="breadcrumb">
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item href="/">
                      <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <span>{breadcrumbRoute[breadState]}</span>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  {/* <Breadcrumb itemRender={itemRender} routes={routes} /> */}
                </div>
                 <Outlet/>
              </Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
      </div>
    )
  
}
const mapStateToProps = (state) => {
  return {
    ...state
  }
}
export default  connect(mapStateToProps, null)(App);
// export default  App;