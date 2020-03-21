import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageUpload from '../../components/test/ImageUpload';
import {selectImage, submitImageList} from "../../modules/upload";
import {initializeForm} from "../../modules/auth";

const UploadContainer = ()=> {
  //const [file, setFile]=useState(null);
  const { imgList, imgCount} = useSelector(({ upload }) => ({
    imgList: upload.queue.imgList,
    imgCount: upload.queue.imgCount

  }));
  const dispatch = useDispatch();
    useEffect(() => {
      console.dir(imgList);
      console.dir(imgCount);
    }, [imgList, imgCount]);


  const onFileChange = e=> {
    const fileObject= e.target.files[0];
    console.dir(fileObject)
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
        submitImageList({imgCount, imgList})
    )
  }
  return (
      <ImageUpload
        onChange={onFileChange}
        onSubmit={onSubmit}

      />
  )
};

export default UploadContainer;