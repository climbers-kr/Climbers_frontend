import React, {Component, useCallback} from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            imgCollection: '',
            loadPercent: 0,
        }

    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
        console.log("e.target.files 객체 확인");
        console.dir(e.target.files);
        console.log("e.target.files[0] 객체 확인");
        console.dir(e.target.files[0]);
        console.dir(this.state.imgCollection);
    }

    onSubmit(e) {
        e.preventDefault()

        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            console.log("test");
            console.dir(this.state.imgCollection);
            console.dir(this.state.imgCollection[key]);
            formData.append('imgCollection', this.state.imgCollection[key])
        }

        const trackProcess=(progressEvent) => {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(progressEvent.lengthComputable);
            console.log(percentCompleted);
            console.log(this.state.loadPercent)

        };
        axios.post("http://localhost:4000/api/test/upload-images", formData, {
            onUploadProgress: ({ interval : 250 }, trackProcess)

        }).then(res => {
            console.log(res.data)
            console.log(this.state.loadPercent)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit" >Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}