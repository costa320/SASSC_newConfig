import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRouting } from "../../redux/actions/RoutingActions.js";
/* COMPONENTS */
import Header from "../../components/header/header.jsx";
import BarChart from "../../components/ChartComponent/chart.jsx";
/* REPORT */
import ReportConfiguration from "../../components/ConfigureReport/reportConfiguration.jsx";
import GenerateReportCharts from "../../components/ConfigureReport/generateReportCharts.jsx";

/* CSS */
import "antd/dist/antd.css";

class ConfigureReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportConfigurationComplete: false,
      reportConfiguration: {}
    };
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
            {p.Routing.match.url}
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {!s.reportConfigurationComplete ? (
              <ReportConfiguration
                setReportConfigurationComplete={
                  this.setReportConfigurationComplete
                }
              />
            ) : (
              <GenerateReportCharts
                reportConfiguration={s.reportConfiguration}
              />
            )}

            <BarChart />
          </div>
        </div>
      </div>
    );
  }

  setReportConfigurationComplete = (complete, data) => {
    this.setSTATE("reportConfigurationComplete", complete);
    this.setSTATE("reportConfiguration", data);
  };

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
