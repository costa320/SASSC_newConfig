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
            {/* <button onClick={this.handleClickHtmlToSVG}>HTML TO SVG</button>
            <BarChart data={chartData} /> */}
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

var chartData = [
  {
    date: "18/05/01",
    radar: "Fiumicino",
    value: 89.9
  },
  {
    date: "18/05/02",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/03",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/04",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/05",
    radar: "Fiumicino",
    value: 83
  },
  {
    date: "18/05/06",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/07",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/08",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/09",
    radar: "Fiumicino",
    value: 60
  },
  {
    date: "18/05/10",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/11",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/12",
    radar: "Fiumicino",
    value: 89.9
  },
  {
    date: "18/05/13",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/14",
    radar: "Fiumicino",
    value: 90.87
  },
  {
    date: "18/05/15",
    radar: "Fiumicino",
    value: 87
  }
];
