import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageUpload from '../../components/test/ImageUpload';
import {selectImage, submitImageList} from "../../modules/upload";

const UploadContainer = ()=> {
  const { imgList, imgCount, curOrder} = useSelector(({ upload }) => ({
    imgList: upload.queue.imgList,
    imgCount: upload.queue.imgCount,
    curOrder: upload.queue.curOrder,
  }));


  const dispatch = useDispatch();

  useEffect(() => {
    console.dir(imgList);
    console.dir(imgCount);
    console.dir(curOrder);
  }, [imgList, imgCount, curOrder]);


  const onFileChange = e=> {
    const fileObject= e.target.files[0];
    console.dir(fileObject);

    dispatch(
        selectImage({file: e.target.files[0]})
    );
  };


  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(
        submitImageList({imgCount, curOrder, imgList})
    )
  };
  return (
      <ImageUpload
        onChange={onFileChange}
        onSubmit={onSubmit}

      />
  )
};

export default UploadContainer;