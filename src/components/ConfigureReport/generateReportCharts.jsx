import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
/* ANTD */
import { notification, Spin } from "antd";
/* AXIOS */
import { radar_getRadarDataByDateAndDetection } from "../../axios/radar-resource.jsx";
/* COMPONENTS */
/* CSS */
import "antd/dist/antd.css";

class GenerateReportCharts extends Component {
  /* {
      RadarsValues: undefined,
      ReportMode: undefined,
      DetectionsValues: undefined,
      date: {
        startMoment: undefined,
        endMoment: undefined
      }
    } */
  constructor(props) {
    super(props);
    this.state = {
      reportConfiguration: undefined,
      radarsData: undefined
    };
  }

  componentWillMount() {
    let reportConfiguration = this.props.reportConfiguration;
    if (reportConfiguration) {
      this.setSTATE("reportConfiguration", reportConfiguration);
      this.getRadarDataByDateAndDetection(reportConfiguration);
    }
  }

  getRadarDataByDateAndDetection(reportConfiguration) {
    let self = this;
   /*  this.setSTATE("loading", true); */
    radar_getRadarDataByDateAndDetection(reportConfiguration)
      .then(res => {
        console.log(res);
        self.getGeneralNotification(
          "success",
          "Operazione completata con successo"
        );
        self.setSTATE("radarsData", res.data);
        self.setSTATE("loading", false);
      })
      .catch(function(error) {
        console.log(error);
        self.setSTATE("loading", false);
        if (process.env.enviroment === "DEV_START") {
          self.getGeneralNotification("warning", "STAI IN MODALITA DEV!");
        } else {
          self.getGeneralNotification(
            "error",
            "Non è stato possibile effettuare il caricamento dei dati"
          );
        }
      });
  }

  render() {
    let s = this.state;
    let p = this.props;
    return (
      <div className="container mt-5">
        <Spin spinning={s.loading} size="large">
          <div className="row">
            <div
              className="col-3"
              onClick={() =>
                this.getRadarDataByDateAndDetection(s.reportConfiguration)
              }
            >
              {s.reportConfiguration.ReportMode}
            </div>
          </div>
        </Spin>
      </div>
    );
  }

  getGeneralNotification(type, message, description) {
    notification[type]({ message: message, description: description });
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
