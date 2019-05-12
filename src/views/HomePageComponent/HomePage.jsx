import React, { Component } from "react";
/* COMPONENTS */
import FileChart from "../../components/FileChartComponent/FileChart.jsx";
import ItalyMap from "../../components/ItalyMapHomePage/ItalyMap.jsx";
import BarChartBrush from "../../components/BarChartBrushComponent/BarChartBrush.jsx";
/* MOCK */
import mockDATI from "../../config/mockDati.json";
/* ANTD */
import { Icon, Card, Spin, Select, Drawer } from "antd";
/* AXIOS */
import axios from "axios";
/* CONFIG  */
import RadarsConfig from "../../assets/geoAssets/Radars/RadarsConfig.json";
/* EXTRAS */
import { getMonthName } from "../../components/Extras/DateManager+";
/* CSS */
import "../../assets/styles/css/HomePage.css";
import "antd/dist/antd.css";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* TILE1 */
      numberOfAllScannedDays: 0,
      detailesOfYears: {},
      /* TILE 2 */
      barChartData: [],
      radarsPositions: [],
      lastMonthData: {},
      chosenRadarBarChart: "fm",
      chosenDetezioneBarChart: "pdRC",
      visibilityDrawerBarChart: false,
      /* loading states */
      loadingFileChart: true,
      loadingBarChartData: true,
      loadingitalyMap: true
    };
  }

  componentDidMount() {
/*     this.getLastMonthData();
    this.getNumberOfAllScannedDays();
    this.setRadarsPositions(RadarsConfig.positions); */
  }

  getLastMonthData() {
    let self = this;
    let s = this.state;
    let chosenRadarBarChart_ = s.chosenRadarBarChart,
      chosenDetezioneBarChart_ = s.chosenDetezioneBarChart;
    let url =
      "/getLastMonthData?radar=" +
      chosenRadarBarChart_ +
      "&detezione=" +
      chosenDetezioneBarChart_;

    if (chosenRadarBarChart_ && chosenDetezioneBarChart_) {
      axios
        .get(url)
        .then(function(res) {
          // handle success
          /*  console.log(res.data.numberOfAllScannedDays); */
          let data = res.data.result;
          self.setLastMonthData(data);
          self.setBarChartData(data.values);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          self.setLoadingBarChartData(false);
          /*                     let data = mockDATI.datiGiorno;
                                        self.setBarChartData(data);
                                        self.setLastMonthData({data_mm: '07', data_yy: '18', radar: 'fm', values: data}) */
        });
    }
  }

  getNumberOfAllScannedDays() {
    let self = this;
    axios
      .get("/getNumberOfAllScannedDays")
      .then(function(res) {
        // handle success
        /*  console.log(res.data.numberOfAllScannedDays); */
        let data = res.data.detailedResults;
        self.setNumberOfAllScannedDays(data.TotalFiles);
        self.setDetailesOfYears(data.yearDetails);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        /*                 self.setNumberOfAllScannedDays(784);
                                self.setDetailesOfYears({'18_yy': '34', '16_yy': '55'}); */
      });
  }
  setNumberOfAllScannedDays = numberOfAllScannedDays => {
    this.setState({ numberOfAllScannedDays }, this.setLoadingFileChart(false));
  };
  setDetailesOfYears = detailesOfYears => {
    this.setState({ detailesOfYears }, this.setLoadingFileChart(false));
  };
  setBarChartData = barChartData => {
    this.setState({ barChartData }, this.setLoadingBarChartData(false));
  };
  setRadarsPositions(radarsPositions) {
    this.setState({ radarsPositions }, this.setLoadingItalyMap(false));
  }

  setLoadingFileChart(loadingFileChart) {
    this.setState({ loadingFileChart });
  }
  setLoadingBarChartData(loadingBarChartData) {
    this.setState({ loadingBarChartData });
  }
  setLoadingItalyMap(loadingitalyMap) {
    this.setState({ loadingitalyMap });
  }

  getTitleOfFileDetails() {
    return (
      <div>
        <Icon type="eye-o" className="mr-3 iconFileDetails c-1" />
        Visuale generica sui file
      </div>
    );
  }
  getTitleBarChart() {
    let s = this.state;
    return (
      <div className="container p-0 m-0">
        <div className="row p-0 m-0 d-flex">
          <div className="col-4 p-0 m-0">
            <Icon type="bar-chart" className="mr-3 iconFileDetails c-1" />
            <span>
              Visuale sul ultimo mese disponibile -{" "}
              {getMonthName(s.lastMonthData.data_mm)}
              {" 20" + s.lastMonthData.data_yy}
            </span>
          </div>
          <div className="col-3 align-self-end p-0 m-0" />

          <div className="col-5 align-self-end p-0 m-0">
            <Icon
              type="setting"
              className="iconSettings c-1 float-right"
              onClick={this.showDrawerBarChart}
            />
            <Drawer
              title={
                "Impostazioni di visualizzazione dell'ultimo mese disponibile - " +
                getMonthName(s.lastMonthData.data_mm) +
                " 20" +
                s.lastMonthData.data_yy
              }
              width={720}
              placement="right"
              onClose={this.hideDrawerBarChart}
              maskClosable={true}
              visible={this.state.visibilityDrawerBarChart}
              className="drawerHomeBarChart"
            >
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <Select
                      className="mWSelectbarChart"
                      defaultValue={"pdRC"}
                      onChange={
                        this.handleChangeSelectRadarDetenzioneBarChartTile
                      }
                    >
                      {RadarsConfig.detentionList.map(radar => {
                        return (
                          <Select.Option key={radar.value} value={radar.value}>
                            {radar.text}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="col-4">
                    <Select
                      className="mWSelectbarChart"
                      defaultValue={"fm"}
                      onChange={this.handleChangeSelectRadarBarChartTile}
                    >
                      {RadarsConfig.radarList.map(radar => {
                        return (
                          <Select.Option key={radar.value} value={radar.value}>
                            {radar.text}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </div>

              {/*                         <Button
                            style={{
                            marginRight: 8
                        }}
                            onClick={this.hideDrawerBarChart}>
                            Cancel
                        </Button>
                        <Button onClick={this.hideDrawerBarChart} type="primary">Submsit</Button> */}
            </Drawer>
          </div>
        </div>
      </div>
    );
  }

  getTitleItalyMap() {
    return (
      <div>
        <Icon type="wifi" className="mr-3 iconFileDetails c-1" />
        Mappa dei radar
      </div>
    );
  }

  handleChangeSelectRadarBarChartTile = (value, e) => {
    this.setChosenRadarBarChart(value);
  };
  handleChangeSelectRadarDetenzioneBarChartTile = (value, e) => {
    this.setChosenDetezioneBarChart(value);
  };

  hideDrawerBarChart = () => {
    this.setState({ visibilityDrawerBarChart: false });
  };
  showDrawerBarChart = () => {
    this.setState({ visibilityDrawerBarChart: true });
  };

  setChosenRadarBarChart = chosenRadarBarChart => {
    this.setState(
      {
        chosenRadarBarChart
      },
      this.getLastMonthData()
    );
  };

  setChosenDetezioneBarChart = chosenDetezioneBarChart => {
    this.setState(
      {
        chosenDetezioneBarChart
      },
      this.getLastMonthData()
    );
  };

  setLastMonthData = lastMonthData => {
    this.setSTATE("lastMonthData", lastMonthData);
  };

  render() {
    let s = this.state;
    return (
      <div className="w-100 h-100">
        <div className="row minW mb-3">
          <div className="col-4 mr-1 bckWhite p-0">
            <Card title={this.getTitleOfFileDetails()} className="h-100">
              <Spin spinning={s.loadingFileChart}>
                <FileChart
                  detailesOfYears={s.detailesOfYears}
                  numberOfAllScannedDays={s.numberOfAllScannedDays}
                />
              </Spin>
            </Card>
          </div>
          <div className="col bckWhite p-0">
            <Card title={this.getTitleBarChart()} className="h-100 NOM_NOP">
              <Spin spinning={s.loadingBarChartData}>
                <BarChartBrush data={s.barChartData} />
              </Spin>
            </Card>
          </div>
        </div>
        <div className="row minW mb-3">
          <div className="col mr-1 minH bckWhite p-0">
            <Card title={this.getTitleItalyMap()} className="h-100">
              <Spin spinning={s.loadingitalyMap}>
                <ItalyMap radarsPositions={s.radarsPositions} />
              </Spin>
            </Card>
          </div>
          <div className="col minH bckWhite p-0">
            <Card title="" className="h-100">
              {/* <ItalyMap/> */}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }
}
