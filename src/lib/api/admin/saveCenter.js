import client from '../client';
import qs from 'qs';

//이미지 업로드
export const imageUpload=({fileObject}) => {
    console.dir(fileObject);
    //fileObject -> type:File
    const formData=new FormData();

    formData.append('img', fileObject);

    //note: ex)http://localhost:5000/api/community/upload-image 으로 하니 쿠키가 제대로 안넘어감
    return client.post("/api/admin/uploadCenterImage", formData);
};

//암장 정보 전체 업로드
export const saveCenter = (data) =>
    client.post('/api/admin/saveCenter', data);

export const listCenters=({page, username, tag})=> {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/community?${queryString}`);
};