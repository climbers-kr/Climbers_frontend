import React, { Component } from 'react';
import styled from "styled-components";

/*참고
* https://www.positronx.io/react-single-and-multiple-images-upload-preview/
* */
const ImgPreview=styled.img`
    max-width: 300px;
    
`;
export default class MultipleImageUploadComponent extends Component {


    fileArray = [];
    constructor(props) {
        super(props)
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {

        console.dir(e.target.files);

        this.fileArray.push(URL.createObjectURL(e.target.files[0]))
        /*
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }*/
        this.setState({ file: this.fileArray })
        console.log(this.state.file);
        console.log(this.fileArray)
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        return (
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <ImgPreview src={url} alt="..." />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
            </form >
        )
    }
}