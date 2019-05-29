import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
/* ANTD */
import { notification, Spin, Icon } from "antd";
/* AXIOS */
import { radar_getRadarDataByDateAndDetection } from "../../axios/radar-resource.jsx";
/* PRINT */
import ReactToPrint from "react-to-print";
/* COMPONENTS */
import BarChart from "../ChartComponent/chart.jsx";
/* CSS */
import "antd/dist/antd.css";
/* EXTRAS */
import { getFormattedRadarsData } from "../../extra/api-result-formatter.js";
import { UUID } from "../../extra/UUID.js";
/* MOCK */
import rawDataRadars from "../../config/mockRawDataRadars.json";

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
      radarsData: undefined,
      /* formattedData */
      formattedRadarsData: undefined
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
        self.processRawData(res.data, self.state.reportConfiguration);
        self.setSTATE("loading", false);
      })
      .catch(function(error) {
        console.log(error);
        self.setSTATE("loading", false);
        if (process.env.enviroment === "DEV_START") {
          self.getGeneralNotification("warning", "STAI IN MODALITA DEV!");
          self.processRawData(rawDataRadars, self.state.reportConfiguration);
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
          {/* PRINT REPORT */}
          <ReactToPrint
            trigger={() => (
              <Icon className="BackIcon" type="printer" theme="outlined" />
            )}
            content={() => this.componentRef}
          />
          <div className="row">
            <div
              className="col-3"
              onClick={() =>
                this.getRadarDataByDateAndDetection(s.reportConfiguration)
              }
            >
              {/*               {s.reportConfiguration.ReportMode} */}
            </div>
          </div>
          {/* GENERATE REPORT */}
          <div className="row" ref={el => (this.componentRef = el)}>
            <div className="col">
              {this.generateCharts(s.formattedRadarsData)}
            </div>
          </div>
        </Spin>
      </div>
    );
  }

  processRawData(rawData, reportConfiguration) {
    let formattedData = getFormattedRadarsData(rawData, reportConfiguration);
    this.setSTATE("formattedRadarsData", formattedData);
  }

  generateCharts(formattedRadarsData) {
    if (formattedRadarsData && formattedRadarsData.length >= 1) {
      return formattedRadarsData.map(r => {
        return Object.keys(r.detections).map(detectionKey => {
          let data = r.detections[detectionKey];
          return (
            <BarChart
              key={UUID()}
              data={data}
              radar={r.radar}
              detection={detectionKey}
            />
          );
        });
      });
    }
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

/* var chartData = [
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
]; */
