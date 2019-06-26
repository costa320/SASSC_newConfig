import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
/* ANTD */
/* ANTV G2 DATASET*/
import G2 from "@antv/g2";
import { DataSet } from "@antv/data-set";
/* AXIOS */
/* COMPONENTS */
/* CSS */
import "antd/dist/antd.css";
/* EXTRA */
import { UUID } from "../../extra/UUID.js";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      data: undefined,
      radarName: "",
      detectionName: ""
    };
  }

  componentWillMount() {
    let id = this.props.id;
    console.log(id);
    this.setSTATE("id", id);
  }

  componentDidMount() {
    let data = this.props.data;
    let radarName = this.props.radar;
    let detectionName = this.props.detection;

    if (data && data.length >= 1) {
      this.setSTATE("data", data);
      this.setSTATE("radarName", radarName);
      this.setSTATE("detectionName", detectionName);
    }
  }
  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;
    let radarName = nextProps.radar;
    let detectionName = nextProps.detection;
    if (data && data.length >= 1) {
      this.setSTATE("data", data);
      this.setSTATE("radarName", radarName);
      this.setSTATE("detectionName", detectionName);
    }
  }

  initBarChart(data, id) {
    if (data && data.length >= 1) {
      var chart = new G2.Chart({
        container: id,
        forceFit: true,
        height: 290,
        padding: { top: 40, right: 20, bottom: 40, left: 30 },
        background: {
          /*           fill: {string}, //Chart background color
          fillOpacity: {number}, //Chart background transparency */
          /*  stroke: 'black', //Chart border color */
          /*           strokeOpacity: {number}, //Chart border transparency
          opacity: {number}, //Overall transparency of charts
          lineWidth: {number}, //Chart border thickness
          radius: {number} //Chart fillet size */
        }
      });
      /* AXIS */
      chart.axis("value", {
        line: {
          lineWidth: 2,
          stroke: "black"
        },
        tickLine: {
          lineWidth: 2,
          length: 5,
          stroke: "black",
          alignWithLabel: true
        },
        label: {
          textStyle: {
            fontSize: 14,
            fontWeight: "bold",
            fill: "black"
          }
        }
      });
      chart.axis("date", {
        line: {
          lineWidth: 2,
          stroke: "black"
        },
        tickLine: {
          lineWidth: 2,
          length: 7,
          stroke: "black",
          alignWithLabel: true
        },
        label: {
          htmlTemplate: (val, item, index) => {
            return `<span style="
                                  font-weight:bold;
                                  font-size:14px;
                                  color:"black">
                      ${val.substring(6, 8)}
                    </span>`;
          }
        }
      });
      /* END AXIS */

      /* TOOLTIP */
      chart.tooltip({
        triggerOn: "click"
      });

      chart.source(data);
      /* TICKS */
      chart.scale("value", {
        tickInterval: 10
      });

      chart
        .interval()
        .position("date*value")
        .color("value", value => {
          if (value < 90) {
            return "red";
          }
          return "blue";
        })
        .label("value", {
          offset: 15,
          textStyle: {
            textAlign: "center",
            fontSize: 13,
            fontWeight: "bold"
          },
          htmlTemplate: (text, item, index) => {
            let value;
            let error_ = false;
            try {
              value = Number(text);
            } catch (err) {
              error_ = true;
            }
            if (!value) error_ = true;
            if (item && !error_) {
              let color = value < 90 ? "red" : "black";
              return `<span style="
                                  font-weight:bold;
                                  font-size:14px;
                                  color:${color}">
                      ${value}
                    </span>`;
            } else {
              return "<span></span>";
            }
          }
        });

      chart.render();
    }
  }

  render() {
    let s = this.state;
    let p = this.props;
    return (
      <div>
        {/* when state chage is detected chart is reloaded */}
        {this.initBarChart(s.data, s.id)}
        <h3>{s.radarName + " " + s.detectionName}</h3>
        <div className="w-100" id={s.id} />
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
)(BarChart);
