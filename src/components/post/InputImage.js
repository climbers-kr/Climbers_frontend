import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import * as postAPI from '../../lib/api/post';
const InputImage=()=> {
    const [img, setImage] = useState(null);
    const onChange = (e) => {
        setImage(e.target.files[0]);
    };

    const onClick = async () => {
        const formData = new FormData();
        formData.append('file', img);
        // 서버의 upload API 호출
        const res = await postAPI.uploadImage(formData);
        console.log(res);
    };

    useEffect(
        ()=>{
            console.log(img);
        }, [img]);

    return (
        <div>
            <input type="file" name="file" onChange={onChange}/>
            <Button variant="outlined" color="primary" onClick={onClick}>
                Primary
            </Button>
        </div>
    );
};

export default InputImage;