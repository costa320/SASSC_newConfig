import React, { Component } from "react";
/* REACT-ROUTER */
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
/* REDUX */
import { connect } from "react-redux";
import { SetRouting } from "../../redux/actions/RoutingActions.js";
/* ANTD */
import { Menu, Icon, BackTop, Affix } from "antd";
/* IMG */
/* AXIOS */
import axios from "axios";
/* CSS */
import "antd/dist/antd.css";

class Header_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,

      /* MENU */
      currentlySelectedKEY: "/"
    };
  }

  componentWillReceiveProps(nextProps) {
    let currentlySelectedKEY = nextProps.Routing.match.path;
    this.setSTATE("currentlySelectedKEY", currentlySelectedKEY);
  }

  Redirect(RedirectTo) {
    if (this.state.redirect !== RedirectTo)
      this.setSTATE("redirect", RedirectTo);
  }

  handleMenuItemClicked = itemSeleted => {
    console.log(itemSeleted.key);
    this.setSTATE("redirect", itemSeleted.key);
  };

  render() {
    const s = this.state;
    return (
      <div className="container">
        {s.redirect ? <Redirect to={s.redirect} push={true} /> : ""}
        <div className="row">
          <div className="col">
            <Affix>
              <Menu
                onClick={this.handleMenuItemClicked}
                selectedKeys={[s.currentlySelectedKEY]}
                mode="horizontal"
              >
                <Menu.Item key="/">
                  <Icon type="home" />
                  Home
                </Menu.Item>
                <Menu.Item key="/uploadFiles">
                  <Icon type="cloud-upload" />
                  Upload new Files
                </Menu.Item>
                <Menu.Item key="/configureReport">
                  <Icon type="file-pdf" />
                  Create Report
                </Menu.Item>
              </Menu>
            </Affix>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <BackTop />
          </div>
        </div>
      </div>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }
}

const mapStateToProps = state => {
  return { Routing: state.RoutingREDUCER };
};
const mapDispatchToProps = dispatch => {
  return {
    setRouting_: sessione => {
      dispatch(SetRouting(sessione));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header_);
