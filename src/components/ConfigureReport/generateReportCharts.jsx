import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
/* COMPONENTS */
/* CSS */
import "antd/dist/antd.css";

class GenerateReportCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    let s = this.state;
    let p = this.props;
    return (
      <div className="container">
        <div className="row">GenerateReportCharts</div>
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
)(GenerateReportCharts);
