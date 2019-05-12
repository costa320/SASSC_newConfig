import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRouting } from "../../redux/actions/RoutingActions.js";
/* COMPONENTS */
import Header from "../../components/header/header.jsx";
/* CSS */
import "antd/dist/antd.css";

class ConfigureReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let match = this.props.match;
    this.props.setRouting_(match);
  }

  render() {
    let s = this.state;
    let p = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-3" />
          <div className="col">{p.Routing.match.url}</div>
          <div className="col-3" />
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
)(ConfigureReport);
