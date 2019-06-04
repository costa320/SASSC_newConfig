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
      chart.source(data);

      chart.scale("value", {
        tickInterval: 20
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
            fontSize: 11,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)"
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
