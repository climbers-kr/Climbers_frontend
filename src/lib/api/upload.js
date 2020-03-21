import client from './client';

//이미지 업로드
/*
* 파라미터-formData, onUploadProgress 이벤트 처리 함수
* */
export const imageUpload=(paramObject) => {
    console.dir(paramObject);
    const trackProgress=paramObject.trackProcess
    //const formData=paramObject.formData;
    const formData=new FormData();
    const fileObject=paramObject.fileObject;
    console.dir(fileObject)
    formData.append('imgCollection', fileObject)
    console.dir((progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(progressEvent.lengthComputable);
        console.log(percentCompleted);
        console.log(this.state.loadPercent)

    })
    return client.post("http://localhost:4000/api/test/upload-images", formData, {
        onUploadProgress: ({interval: 300}, trackProgress)
    });
}


/*
export const uploadImage=(formData)=>
    client.post('/api/test/upload-images', formData);*/