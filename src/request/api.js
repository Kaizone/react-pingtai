import request from './request'

export const RegisterApi = (params) => request.post('/register', params);

export const LoginApi = (params) => request.post('/login', params);

// 获取文章列表
export const ArticleListApi = (params) => request.get('/article', {params});

// 删除文章
export const deleteArticle = (params) => request.post('/article/remove')
