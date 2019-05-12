import React, { Component } from "react";
/* COMPONENTS */
import ConfigReport from "../../components/ConfigReportWrapperComponent/configReport.jsx";
import BarChartBrush from "../../components/BarChartBrushComponent/BarChartBrush.jsx";
/* MOCK */
import mockDATI from "../../config/mockDati.json";
/* ANTD */
import { Icon, Card, Spin, Divider } from "antd";
/* AXIOS */
import axios from "axios";
/* PRINT */
import ReactToPrint from "react-to-print";
/* EXTRAS */
import { getMonthName } from "../../components/Extras/DateManager+";
/* CONFIG  */
import RadarsConfig from "../../assets/geoAssets/Radars/RadarsConfig.json";
/* CSS */
import "../../assets/styles/css/ReportPage.css";
import "antd/dist/antd.css";

export default class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfSelectedElements: undefined,

      /* CHILD */
      tableDataChild: undefined,

      /* loading screen */
      reportLoading: false
    };
  }

  componentDidMount() {}

  handleChangeSelectConfigReport = arrayOfSelectedElements => {
    this.setArrayOfSelectedElements(arrayOfSelectedElements);
  };

  handleClickTornaAllaConfigurazioneReport = () => {
    this.setReportLoading(false);
    this.setTableDataChild(undefined);
    this.setArrayOfSelectedElements(undefined);
  };

  setArrayOfSelectedElements = arrayOfSelectedElements => {
    this.setSTATE("arrayOfSelectedElements", arrayOfSelectedElements);
  };

  setTableDataChild = tableDataChild => {
    this.setState({ tableDataChild }, this.setReportLoading(true));
  };

  setReportLoading = reportLoading => {
    if (reportLoading !== this.state.reportLoading) {
      this.setSTATE("reportLoading", reportLoading);
    }
  };

  getTitleZonaReport = () => {
    return (
      <span className="capletters c-1">
        <Icon
          type="rollback"
          className="BackIcon mr-3"
          onClick={this.handleClickTornaAllaConfigurazioneReport}
        />
        Torna alla configurazione Report
      </span>
    );
  };

  /* GENERATION  */

  generateCharts = tableData => {
    /* per ogni radar presente in table data  ci sarà un set di oggetti*/

    /* setDi oggetti FALSO => datiGiorno*/

    let allBarCharts = tableData.map((radar, i) => {
      let valoreMedio = 0;
      mockDATI.datiGiorno.map(r => {
        valoreMedio += r.value;
      });

      valoreMedio = (valoreMedio / mockDATI.datiGiorno.length - 1).toFixed(2);
      return (
        <div className="row" key={radar.radarValue + i}>
          <div className="col-3 pt-4 d-table">
            <Divider>
              <div className="d-flex">
                <span className="c-1 mr-3 capletters">Radar: </span>
                <span className="c-2">{radar.radarText}</span>
              </div>
            </Divider>
            <Divider>
              <div className="d-flex">
                <span className="c-1 mr-3 capletters">Detezione: </span>
                <span className="c-2">{radar.detezione}</span>
              </div>
            </Divider>
            <Divider>
              <div className="d-flex">
                <span className="c-1 mr-3 capletters">
                  Periodo di osservazione:{" "}
                </span>
                {/* <span className="c-2">{radar.data}</span> */}
              </div>
            </Divider>
            <Divider>
              <div className="d-flex">
                <span className="c-1 mr-3 capletters">Valore Medio: </span>
                <span className="c-2">{valoreMedio}</span>
              </div>
            </Divider>
          </div>

          <div className="col-5">
            <BarChartBrush data={mockDATI.datiGiorno} />
          </div>
          <Divider />
        </div>
      );
    });
    this.setReportLoading(false);
    return allBarCharts;
  };

  render() {
    let s = this.state;
    return (
      <div className="w-100 h-100">
        {!s.tableDataChild ? (
          <div className="row minW mb-3">
            <div className="col bckWhite p-0">
              <ConfigReport setTableDataChild={this.setTableDataChild} />
            </div>
          </div>
        ) : (
          ""
        )}

        {s.tableDataChild ? (
          <div className="row minW mb-3">
            <div className="col minH bckWhite p-0">
              <Card title={this.getTitleZonaReport()} className="h-100">
                <Spin spinning={this.state.reportLoading}>
                  <ReactToPrint
                    trigger={() => (
                      <Icon
                        className="BackIcon"
                        type="printer"
                        theme="outlined"
                      />
                    )}
                    content={() => this.componentRef}
                  />

                  <div
                    className="w-100 h-100"
                    ref={el => (this.componentRef = el)}
                  >
                    <div className="row">
                      <div className="col">
                        <Divider>Zona Report</Divider>
                      </div>
                    </div>
                    <div className="pt-3">
                      {this.generateCharts(s.tableDataChild)}
                    </div>
                  </div>
                </Spin>
              </Card>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }
}
