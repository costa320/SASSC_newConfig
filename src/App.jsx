import React, { Component } from "react";
/* REACT-ROUTER */
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
/* ANTD */
import { Layout, Menu, Icon, message } from "antd";
/* IMG */
import logo_sideBar from "./assets/img/ENAV_logo.svg";
import just_logoSideBar from "./assets/img/ENAV_Just_Logo.png";
/* VIEWS COMPONENTS */
import HomePage from "./views/HomePageComponent/HomePage.jsx";
import UploadDocumentsPage from "./views/UploadNewFilesPageComponent/UploadNewFilesPage.jsx";
import ReportPage from "./views/CreateReportComponent/ReportPage.jsx";
/* AXIOS */
import axios from "axios";
/* CSS */
import "./assets/styles/css/main.css";
import "antd/dist/antd.css";

const { Header, Sider, Content } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      redirect: null
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  succesUpdateMessage() {
    message.success("L'aggiornamento è avvenuto con successo");
  }
  failureUpdateMessage() {
    message.error("L'aggiornamento è fallito");
  }

  handleUpdateClick = () => {
    let self = this;
    axios
      .get("/update")
      .then(function(res) {
        // handle success
        /*  console.log(res.data.numberOfAllScannedDays); */
        self.succesUpdateMessage();
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        self.failureUpdateMessage();
      });
  };

  Redirect(RedirectTo) {
    if (this.state.redirect !== RedirectTo)
      this.setState({ redirect: RedirectTo });
  }

  render() {
    const state = this.state;
    return (
      <BrowserRouter>
        {state.redirect ? <Redirect to={state.redirect} /> : ""}
        <Layout className="h-100">
          {/* REDIRECT HERE */}

          {/* END REDIRECT HERE */}
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div
              className={
                state.collapsed ? "logoCompressed" : "logoDecompressed"
              }
            >
              <img
                className="w-100"
                src={state.collapsed ? just_logoSideBar : logo_sideBar}
              />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" onClick={() => this.Redirect("/")}>
                <Icon type="home" />
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={() => this.Redirect("/upload")}>
                <Icon type="upload" />
                <span>Aggiungi File</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={() => this.Redirect("/creaReport")}>
                <Icon type="plus-circle" />
                <span>Crea Report</span>
              </Menu.Item>
              <Menu.Item key="4" onClick={() => this.Redirect("/areaGrafici")}>
                <Icon type="area-chart" />
                <span>Area Grafici</span>
              </Menu.Item>
              <Menu.Item key="5" onClick={this.handleUpdateClick}>
                <Icon type="setting" />
                <span>UPDATE</span>
              </Menu.Item>
              <Menu.Item key="6" onClick={() => this.Redirect("/impostazioni")}>
                <Icon type="setting" />
                <span>Impostazioni</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0
              }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              className="bckTransparent"
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              {/* ROUTER------------------------ */}
              <Route exact path="/" component={HomePage} />
              <Route exact path="/upload" component={UploadDocumentsPage} />
              <Route exact path="/creaReport" component={ReportPage} />{" "}
              {/* ROUTER--------------------------- */}
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
