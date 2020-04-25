import client from '../client';
import qs from 'qs';

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
export const writePost=({imgUrlList, body, tags})=>
    client.post('/api/community/post', {imgUrlList, body, tags});

export const writeComment=({postId, comment})=>
    client.post(`/api/community/${postId}/comment`, {comment});

//Get post list
export const listPosts=({page, username, tag})=> {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/community?${queryString}`);
};

//Get single post
export const readPost=id=>client.get(`/api/posts/${id}`);


