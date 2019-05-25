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
    this.initBarChart();
  }

  initBarChart() {
    var data = [
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
        return "green";
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
