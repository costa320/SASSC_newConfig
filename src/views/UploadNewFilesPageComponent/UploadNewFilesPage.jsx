import React, { Component } from 'react';
/* COMPONENTS */
import FileUploader from '../../components/fileUploaderComponent/fileUploader.jsx'
/* ANTD */
import { Layout, Icon } from 'antd';
/* CSS */
import '../../assets/styles/css/HomePage.css'
import 'antd/dist/antd.css';

export default class UploadNewFilesPage extends Component {



    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <FileUploader/>
                    </div>
                </div>
            </div>
        );
    }
}


