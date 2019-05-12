import React, { Component } from 'react';
/* COMPONENTS */
import ConfigReport from '../../components/ConfigReportWrapperComponent/configReport';
/* MOCK */
import mockDATI from '../../config/mockDati.json';
/* ANTD */
import { Icon, Card, Spin, Divider } from 'antd';
/* AXIOS */
import axios from 'axios';
/* EXTRAS */
import { getMonthName } from '../../components/Extras/DateManager+';
/* CONFIG  */
import RadarsConfig from '../../assets/geoAssets/Radars/RadarsConfig.json';
/* CSS */
import '../../assets/css/ReportPage.css'
import 'antd/dist/antd.css';

export default class ReportRadarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    componentDidMount() {
        let data = this.props.data;
        if (data && data.length >= 1) {
            this.setData(data)
        }
    }

    componentWillReceiveProps(nextPorps) {
        let data = nextPorps.data;
        if (data && data.length >= 1) {
            this.setData(data)
        }
    }

    setData = (data) => {
        this.setState({ data })
    }

    render() {
        let s = this.state;
        return (
            <div className="w-100 h-100">


            </div>
        );
    }
}
