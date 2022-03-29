import React, {useEffect, useState} from 'react'
import {PageHeader, Modal, Button, Form, Input, message} from 'antd'
import { useNavigate, useParams} from 'react-router-dom'
import moment from 'moment'
import E from 'wangeditor'
import {AddArticle, DisplayArticle, UpdateArticle} from '../request/api';

let editor = null;
export default function Edit() {
  const [content, setContent] = useState('');
  const [isShowModal, setModalVisible] = useState(false);
  const [isShowBack, setIsShowBack] = useState(true);
  const [initArticle, setInitArticle] = useState({initTitle: '', initSubTitle: '', id: ''});
  const [form] = Form.useForm();;
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    // 创建编辑器
    editor = new E('#editor_container');
    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    }

    editor.create()
    //  根据是否有Id,显示某文章数据
    if (params.id) {
      setIsShowBack(false);
      DisplayArticle(params.id)
      .then((res) => {
        const {errCode, data:{id, subTitle, title, content: updateContent}} = res;
        console.log(res, id, subTitle, title, updateContent);
        // 初始化文章更新数据, 编辑器添加内容
        setContent(updateContent);
        editor.txt.append(updateContent);
        setInitArticle({initTitle: title, initSubTitle: subTitle, id});
      })
    }
    // 组件卸载时，销毁editor;
    return () => {
      editor.destroy();
    }
  }, []);

  const handleOk = () => {
    setModalVisible(false)
    // 取得form中的值, 发送提交文章请求
    form
      .validateFields()
      .then((values) => {
        const{title, subtitle: subTitle} = values;
        const content = editor.txt.text();
        console.log();
        if (params.id) {
          updateArticle({
            content: content,
            id: params.id,
            subTitle: subTitle,
            title: title,
          });

          return;
        }
        AddArticle({
          title,
          subTitle,
          content
        }).then((res) => {
          if (res.errCode === 1 ) {
            message.error(res.message);
          }
          if (res.errCode === 0 ) {
            message.success(`${res.message},返回列表页`, 1, () => {
              navigate('/list')
            });
          }
        })
      })
      .catch((error) => {
        console.log(error);
      })  
  }
  const handleCancel = () => {
    setModalVisible(false)
  }
  const showSubmitModal = () => {
    if (content === '') {
      message.warning('请输入文章内容');
      return;
    }
    setModalVisible(true);
  }

  const updateArticle = (args) => {
    console.log(args);
    UpdateArticle(args)
    .then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
      }
      if (res.errCode === 1) {
        message.error(res.message)
      }
    })
  }

  function onFinish (values){
    console.log(values);
  } 
  function onFinishFailed (values){
    console.log(values);
  } 
  return (
    <div className='main_content'>
      <PageHeader
            ghost={false}
            onBack={isShowBack ? () => {console.log('返回');} : false}
            title="文章编辑"
            subTitle={`当前日期${moment(new Date()).format('YYYY-MM-DD')}`}
            extra={<Button onClick={showSubmitModal} key="1" type="primary">
            提交文章
          </Button>}
        >
        </PageHeader>
      <div id='editor_container'>
      </div>
      <Modal title="请填写文章标题" 
        visible={isShowModal} onOk={handleOk} 
        onCancel={handleCancel}
        zIndex='99999'
        >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true, title: initArticle.initTitle, subtitle: initArticle.initSubTitle }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
          label="title"
          name="title"
          rules={[{required: true, message: '请输入标题啊' }]}
          >
            <Input type="text"/>
          </Form.Item>
          <Form.Item
          label="subtitle"
          name="subtitle"
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
