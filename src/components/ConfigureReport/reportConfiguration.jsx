import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
/* ANTD */
import { Icon, Select, Button } from "antd";
/* COMPONENTS */
/* CSS */
import "antd/dist/antd.css";
/* CONFIG */
import geoAssets from "../../assets/geoAssets/Radars/RadarsConfig.json";

class ReportConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RadarValue: undefined,
      ReportMode: undefined,
      DetectionValue: undefined
    };
  }

  handleSelectElement = (value, option, stateName) => {
    this.setSTATE(stateName, value);
  };

  handleClickProcedi = () => {
    this.props.setReportConfigurationComplete(true, this.state);
  };

  render() {
    let s = this.state;
    let p = this.props;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <Select
              className="w-100"
              onChange={(value, option) =>
                this.handleSelectElement(value, option, "RadarValue")
              }
              defaultValue={"Seleziona un radar"}
            >
              {this.generateOptions(geoAssets.radarList)}
            </Select>
          </div>
          <div className="col-3">
            <Select
              className="w-100"
              onChange={(value, option) =>
                this.handleSelectElement(value, option, "ReportMode")
              }
              defaultValue={"Seleziona una modalità"}
            >
              {this.generateOptions(geoAssets.modalitaReport)}
            </Select>
          </div>
          <div className="col-3">
            <Select
              className="w-100"
              onChange={(value, option) =>
                this.handleSelectElement(value, option, "DetectionValue")
              }
              defaultValue={"Seleziona una detezione"}
            >
              {this.generateOptions(geoAssets.detentionList)}
            </Select>
          </div>
          <div className="col">
            <Button
              type="primary"
              onClick={this.handleClickProcedi}
              disabled={
                s.RadarValue && s.ReportMode && s.DetectionValue ? false : true
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
