import client from './client';

//이미지 업로드
export const uploadImage=(formData)=>
    client.post('/api/test/upload-images', formData);