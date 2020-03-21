import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageUpload from '../../components/test/ImageUpload';
import {selectImage, submitButton} from "../../modules/upload";
import {initializeForm} from "../../modules/auth";

const UploadContainer = ()=> {
  const [file, setFile]=useState(null);
  const { imgList} = useSelector(({ upload }) => ({
    imgList: upload.queue.imgList,

  }));
  const dispatch = useDispatch();
    useEffect(() => {
      console.dir(imgList);
    }, [imgList]);
  const onFileChange = e=> {
    const fileObject= e.target.files[0];
    setFile(e.target.files[0]);
    console.dir(file)
    let formData=new FormData();
    formData.append('selectedImg', e.target.files[0]);



    dispatch(
        selectImage({file: e.target.files[0]})
    )
  };

  const onUploadSingleFile=()=>{

  }

  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(
        submitButton()
    )
  }
  return (
      <ImageUpload
        onChange={onFileChange}
        onSubmit={onSubmit}
        file={file}
      />
  )
};

export default UploadContainer;