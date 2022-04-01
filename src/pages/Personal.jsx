import React, {useState, useEffect}from 'react'
import {connect} from 'react-redux'
import {Form, Button, Upload, Input, message} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {GetUserInfo, ChangeUserInfo} from '../request/api'
import { useNavigate } from 'react-router-dom';
import store from '../store/index.js'

function Personal(props) {
  const [initUserData, setUserData] = useState({avatar: '', password: '', username: 'a'});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    GetUserInfo()
    .then((res) => {
      const {errCode, data:{avatar, password, username}} = res;
      sessionStorage.setItem('avatar', avatar);
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('username', username);
      setUserData({avatar, password, username});
      // changeUserData(avatar, password, username)
    })
  }, []);

  const onFinish = (values) => {
    const {newUsername, oldPassword, newPassword, confirmPassword} = values;
    const {password, username} = sessionStorage.valueOf();
    if (password !== oldPassword && username !== newUsername && newPassword !== '') {
      ChangeUserInfo({username: newUsername, password: newPassword})
      .then((res) => {
        if (res.errCode === 0) {
          message.success(`${res.message}即将重新登录`,1, () => {
            navigate('/login');
          });
          
        } else {
          message.error(res.message)
        }

      })
    }
    
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false);
        setImgUrl(imageUrl);
        localStorage.setItem('avatar', info.file.response.data.filePath);
        // window.location.reload();
        // 上传修改头像后，更新header组建的图像
        // store.dispatch({
        //   type: 'RELOADAVATAR'
        // });
        props.dispatch({
          type: 'RELOADAVATAR'
        });
      }
      );
    }
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const uploadButton = () => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  }
  return (
    <div className='main_content'>
      <div className="personal_wrap">
        <Form
        name="basic"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 4,
        }}
        initialValues={{username: initUserData.username, password: ''}}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off">
          <Form.Item
          label="修改用户名"
          rules={[{required: false, message: '请输入用户名'}]}
          name="newUsername">
            <Input value={initUserData.username}/>
          </Form.Item>
          <Form.Item
          label="输入旧密码"
          rules={[{required: false, message: '请输入密码'}]}
          name="oldPassword">
            <Input.Password/>
          </Form.Item>
          <Form.Item
          label="输入新密码"
          rules={[{required: false, message: '请输入密码'}]}
          name="newPassword">
            <Input.Password/>
          </Form.Item>
          <Form.Item
          label="请确认密码"
          dependencies={['newPassword']}
          rules={[{required: false, message: '请输入密码'},
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('两次输入密码不一致'));
            },
          }),
        ]}
          name="confirmPassword">
            <Input.Password/>
          </Form.Item>
          <Form.Item 
            wrapperCol={{
            offset: 2,
            span: 4,
          }}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
        <p>修改头像</p>
        <Upload
        name='avatar' // name值必须与后端约定的值相同
        listType='picture-card'
        className='avatar_upload'
        showUploadList={false}
        action='/api/upload'
        headers={{'cms-token': localStorage.getItem('cms-token')}}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        >
          {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton()}
          
        </Upload>
        
      </div>
    </div>
  )
}
const state = (state) => {
  return state
}
export default connect(state, null)(Personal)
// export default Personal