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

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let data = this.props.data;
    this.initBarChart(data);
  }
  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;
    this.initBarChart(data);
  }

  initBarChart(data) {
    var chart = new G2.Chart({
      container: "BarChartMountNode",
      forceFit: true,
      height: 290
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

  render() {
    let s = this.state;
    let p = this.props;
    return <div className="w-100" id="BarChartMountNode" />;
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
