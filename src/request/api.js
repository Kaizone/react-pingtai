import request from './request'

export const RegisterApi = (params) => request.post('/register', params);

export const LoginApi = (params) => request.post('/login', params);

// 获取文章列表
export const ArticleListApi = (params) => request.get('/article', {params});

// 删除文章
export const DeleteArticle = (params) => request.post('/article/remove', params);

// 添加文章
export const AddArticle = (params) => request.post('/article/add', params);
// 查看文章
export const DisplayArticle = (params) => request.get(`/article/${params}`);
// update 文章
export const UpdateArticle = (params) => request.put('/article/update', params);
