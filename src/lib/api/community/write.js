import client from '../client';

//이미지 업로드
export const imageUpload=({fileObject}) => {
    console.dir(fileObject);
    //fileObject -> type:File
    const formData=new FormData();

    formData.append('imgCollection', fileObject);

    //note: ex)http://localhost:5000/api/community/upload-image 으로 하니 쿠키가 제대로 안넘어감
    return client.post("/api/community/upload-image", formData);
};

//포스트 전체 업로드
export const writePost=({imgUrlList, body, tags})=>
    client.post('/api/posts', {imgUrlList, body, tags})
;