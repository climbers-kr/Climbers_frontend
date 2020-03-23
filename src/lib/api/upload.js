import client from './client';

//이미지 업로드
export const imageUpload=({fileObject}) => {
    console.dir(fileObject);


    const formData=new FormData();

    formData.append('imgCollection', fileObject);

    return client.post("http://localhost:4000/api/test/upload-images", formData, {
        onUploadProgress: ({interval: 300}, (progressEvent) => {
            console.dir(progressEvent);
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            console.log(percentCompleted);

        })
    });
};