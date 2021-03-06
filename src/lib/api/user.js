import client from './client';
import qs from 'qs';
/* 유저 프로필 api */

//이미지 업로드
export const imageUpload=({fileObject}) => {
    console.dir(fileObject);
    //fileObject -> type:File
    const formData=new FormData();
    formData.append('img', fileObject);
    //note: ex)http://localhost:5000/api/community/upload-image 으로 하니 쿠키가 제대로 안넘어감
    return client.post("/api/community/upload-image", formData);
};

//포스트 전체 업로드
export const writePost=({imgUrlList, body, tags, centerTag, category})=>
    client.post('/api/community/post', {imgUrlList, body, tags, centerTag, category});

export const writeComment=({postId, comment})=>
    client.post(`/api/community/${postId}/comment`, {comment});

//Get post list
export const listPosts=({page, username, tag, category})=> {
    const queryString = qs.stringify({
        page,
        username,
        tag,
        category,
    });
    console.log(queryString)
    return client.get(`/api/community?${queryString}`);
};

//Get single user profile
export const loadProfile= id => client.get(`/api/users/${id}`);

//Get single user profile
export const loadProfileByUsername= username => client.get(`/api/users/${username}`);
