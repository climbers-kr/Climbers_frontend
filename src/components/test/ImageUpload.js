/*0321 파일 업로드 구현
files-upload.component.js => 함수형 컴포넌트로 작성 & redux-saga 적용 */
import React, {useState} from 'react';
import styled from 'styled-components';
import logo from '../../images/ClimbersLogo.png';
const ImgSelector=styled.img`
    width: 100px;
    height: 100px;
`;
const Input=styled.input`
    overflow: hidden;
    width: 0;
    height: 0;
`;
const ImageUpload = ({onChange,file, onSubmit})=> {
    const url=logo;
    console.dir(file)
    return (
        <div className="container">
            <div className="row">
                <form >
                    <div className="form-group">
                        <label>
                            <ImgSelector src={url} alt="..."/>
                        <Input type="file" name="imgCollection" multiple onChange={onChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" onClick={onSubmit}>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ImageUpload;