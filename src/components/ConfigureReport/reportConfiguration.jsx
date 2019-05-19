import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
/* MOMENT */
import moment from "moment";
import "moment/locale/it";
/* ANTD */
import { Icon, Select, Button, DatePicker } from "antd";
/* COMPONENTS */
/* CSS */
import "antd/dist/antd.css";
/* CONFIG */
import geoAssets from "../../assets/geoAssets/Radars/RadarsConfig.json";
import reportConfig from "../../config/configReport.json";

class ReportConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RadarsValues: undefined,
      ReportMode: undefined,
      DetectionsValues: undefined,
      /* DATE ZONE */
      date: {
        startMoment: undefined,
        endMoment: undefined
      }
    };
  }

  handleSelectElement = (value, option, stateName) => {
    this.setSTATE(stateName, value);
  };

  handleClickProcedi = () => {
    this.props.setReportConfigurationComplete(true, this.state);
  };

  handleDateChange = (moment, dateString) => {
    this.setSTATE("date", {
      startMoment: moment[0],
      endMoment: moment[1]
    });
  };

  render() {
    let s = this.state;
    let p = this.props;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <Select
              className="w-100"
              mode="multiple"
              onChange={(value, option) =>
                this.handleSelectElement(value, option, "RadarsValues")
              }
              placeholder={"Seleziona uno o piu radar"}
            >
              {this.generateOptions(geoAssets.radarList)}
            </Select>
          </div>
          <div className="col-4">
            <Select
              className="w-100"
              onChange={(value, option) =>
                this.handleSelectElement(value, option, "ReportMode")
              }
              placeholder={"Seleziona una modalità"}
            >
              {this.generateOptions(reportConfig.modalitaReport)}
            </Select>
          </div>
          <div className="col-4">
            <Select
              className="w-100"
              mode="multiple"
              onChange={(value, option) =>
                this.handleSelectElement(value, option, "DetectionsValues")
              }
              placeholder={"Seleziona una detezione"}
            >
              {this.generateOptions(geoAssets.detentionList)}
            </Select>
          </div>
        </div>

        {s.ReportMode === "personalizzato" ? (
          <div className="row mt-4">
            <div className="col-4">
              <DatePicker.RangePicker
                onChange={this.handleDateChange}
                placeholder={["Data inizio", "Data fine"]}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row mt-4">
          <div className="col-9" />
          <div className="col-3">
            <Button
              type="primary"
              onClick={this.handleClickProcedi}
              disabled={
                s.date.startMoment &&
                s.date.endMoment &&
                s.RadarsValues &&
                s.RadarsValues.length >= 1 &&
                s.ReportMode &&
                s.DetectionsValues &&
                s.DetectionsValues.length >= 1
                  ? false
                  : true
              }
            >
              <Icon type="double-right" />
              Procedi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* GENERATIONS */
  generateOptions(list) {
    /* list composed by {value and text} */
    return list.map(elem => {
      return (
        <Select.Option
          key={elem.value + elem.text}
          value={elem.value}
          disabled={elem.disabled}
        >
          {elem.text}
        </Select.Option>
      );
    });
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
)(ReportConfiguration);
