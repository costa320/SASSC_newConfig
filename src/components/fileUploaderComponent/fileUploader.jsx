import React, { Component } from "react";
/* ANTD */
import { Upload, Icon, message, Button } from "antd";
/* Styles */
import { uploader } from "../../assets/styles/less/components/FileUploader.less";

import reqwest from "reqwest";
import "antd/dist/antd.css";

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      fileList: [],
      uploading: false
    };
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files", file);
    });

    this.setState({
      uploading: true
    });

    // You can use any AJAX library you like
    reqwest({
      url: "/upload",
      method: "post",
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      }
    });
  };

  render() {
    // const props = {
    //   name: "file",
    //   multiple: true,
    //   action: "/upload",
    //   onChange(info) {
    //     const status = info.file.status;
    //     if (status !== "uploading") {
    //       console.log(info.file, info.fileList);
    //     }
    //     /* if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //           } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //           } */
    //   }
    // };
    const { uploading, fileList } = this.state;
    const props = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div className={uploader + " mt-5 mb-5"}>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>

        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
    );
  }
}
