import React, { Component } from "react";
/* ANTD */
import { Upload, Icon, message } from "antd";
/* Styles */
import { uploader } from "../../assets/styles/less/components/FileUploader.less";

import "antd/dist/antd.css";

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: ""
    };
  }

  render() {
    const props = {
      name: "file",
      multiple: true,
      action: "/upload",
      onChange(info) {
        const status = info.file.status;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        /* if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              } */
      }
    };

    return (
      <Upload.Dragger {...props} className={uploader}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload</p>
      </Upload.Dragger>
    );
  }
}
