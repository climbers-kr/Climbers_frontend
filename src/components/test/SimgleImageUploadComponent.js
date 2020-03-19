import React, { Component } from 'react';
import styled from 'styled-components';
/*참고
* https://www.positronx.io/react-single-and-multiple-images-upload-preview/
* */
const ImgPreview=styled.img`
    max-width: 300px;
    
`;

export default class SingleImageUploadComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <ImgPreview src={this.state.file} alt='' />;
        }
        return (
            <form>
                <div className="form-group preview">
                    {imgPreview}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadSingleFile} />
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={this.upload}>Upload</button>
            </form >
        )
    }
}