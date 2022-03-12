import axios from 'axios';

const xhr = new XMLHttpRequest();
xhr.open("post","http://47.93.114.103:6688/manage/register",false);

xhr.send({username: 'kkkkkk', password: '7hj'});
console.log(xhr.status, xhr);