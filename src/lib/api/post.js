import client from './client';

//이미지 업로드
export const uploadImage=(formData)=>
    client.post('/api/upload', formData);