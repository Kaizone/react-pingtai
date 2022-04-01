import React , {useEffect, useState}from 'react';
import { Table, Button, message } from 'antd';
import {Link, useNavigate} from  'react-router-dom'
import { ArticleListApi, DeleteArticle} from '../request/api';
import moment from 'moment'
export default function List() {
  
  const navigate = useNavigate();
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      width: '60%' ,
      render: (text, record, index) => {
        return (<div>
          <Link className='article_title' to='/'>{text}</Link>
          <p className='article'>{record.subTitle}</p>
        </div>)
      },
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: text => <span className='fr'>{text}</span>,
    },
    {
      key: 'action',
      render: (item, record) => {
        return (
          <>
          <Button type="primary"  danger onClick={()=>{delArticle(record.key)}}>删除</Button>
          <Button type="primary" onClick={() => {goEditArticle(record.key)}}>编辑</Button>
          </>
        )
      }
    },
  ];
  const [articleLists, updateAricleLists] = useState();
  const [pagination, setPagination] = useState({current:1, pageSize: 8, total: 1});
  const changeGetListData = (arr) => {
    if (arr.length === 0) {
      return;
    }
    return arr.map((item, index) => {
      return {
        key: item.id,
        name: item.title,
        date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
        subTitle: item.subTitle
      }
    })
    
  }
  useEffect(()=>{
    getArticleLists(pagination.current, pagination.pageSize);
  }, [])

  // 请求文章列表数据
  const getArticleLists = (current, pagesize) => { 
    ArticleListApi({num: current, count: pagesize}).then((res)=>{
      const {data:{arr, total, num, count} ,errCode, message: tips} = res;
      if (errCode === 0) {
        const articleLists = changeGetListData(arr);
        updateAricleLists(articleLists);
        setPagination({current: num, pageSize: count, total});
      }
      if (errCode !== 0) {
        message.error(tips);
      }
    });
  }

  // 分页
  const getPagination = ({current, pageSize}) => {
    getArticleLists(current, pageSize);
  }

  //删除文章
  const delArticle = (id) => {
    DeleteArticle({id}).then(res => {
     if (res.errCode === 0) {
      message.success(res.message);
      // 删除成功后，请求数据刷新
      getArticleLists(pagination.current, pagination.pageSize);
     }
     if (res.errCode === 1) {
      message.error(res.message)
     }
    })
  }
  // 跳转编辑文章页
  const goEditArticle = (id) => {
    navigate(`/edit/${id}`)
  }
  return (
    <div className='main_content'>
       <Table 
       showHeader={false} 
       columns={columns} 
       dataSource={articleLists} 
       onChange={getPagination} 
       pagination={pagination}
       />
    </div>
  )
}
