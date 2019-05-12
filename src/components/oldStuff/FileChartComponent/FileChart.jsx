import React, {Component} from 'react';
/* ANTD */
import {Layout, Menu, Icon, Card} from 'antd';
/* CHARTS */
import {PieChart, Pie, Tooltip} from 'recharts';
/* AXIOS */
import axios from 'axios';
/* CSS */
import '../../assets/styles/css/HomePage.css'
import 'antd/dist/antd.css';

export default class FileChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfAllScannedDays: null,
            detailesOfYears: null
        };
    }

    componentDidMount() {
        let numberOfAllScannedDays = this.props.numberOfAllScannedDays;
        let detailesOfYears = this.props.detailesOfYears;

        if (numberOfAllScannedDays) {
            this.setNumberOfAllScannedDays(numberOfAllScannedDays);
        }

        if (detailesOfYears) {
            if (Object.keys(detailesOfYears).length >= 1) {
                this.setDetailesOfYears(detailesOfYears);
            }

        }
    }

    componentWillReceiveProps = (nextProps) => {
        let numberOfAllScannedDays = nextProps.numberOfAllScannedDays;
        let detailesOfYears = nextProps.detailesOfYears;

        if (numberOfAllScannedDays) {
            this.setNumberOfAllScannedDays(numberOfAllScannedDays);
        }
        if (detailesOfYears) {
            if (Object.keys(detailesOfYears).length >= 1) {
                this.setDetailesOfYears(detailesOfYears);
            }
        }
    }

    setNumberOfAllScannedDays = (numberOfAllScannedDays) => {
        this.setState({numberOfAllScannedDays});
    }
    setDetailesOfYears = (detailesOfYears) => {
        this.setState({detailesOfYears})
    }

    getCustomlableFordetailsFilesChart = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        let SearchedData = {
            text: '',
            value: ''
        };
        let Alldata = this.state.detailesOfYears;
        let i = 0;
        for (var key in Alldata) {
            if (Alldata.hasOwnProperty(key)) {
                if (i === index) {
                    SearchedData.value = Alldata[key];
                    SearchedData.text = key;
                }
                i++;
            }
        }
        return <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx
            ? 'start'
            : 'end'}
            dominantBaseline="central">
            {SearchedData.value}
        </text>
    }
    getCustomlableFordetailsYearFilesChart = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 2.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        let SearchedData = {
            text: '',
            value: ''
        };
        let Alldata = this.state.detailesOfYears;
        let i = 0;
        for (var key in Alldata) {
            if (Alldata.hasOwnProperty(key)) {
                if (i === index) {
                    SearchedData.value = Alldata[key];
                    SearchedData.text = key;
                }
                i++;
            }
        }
        return <text
            x={x}
            y={y}
            fill="#4c7394"
            textAnchor={'middle'}
            dominantBaseline="central">
            {'Anno 20' + SearchedData
                .text
                .split('_')[0]}
        </text>
    }

    getChartDetailsFiles = (detailsOfYears, totalNumOfFiles) => {
        let i = 0;
        if (Object.keys(detailsOfYears).length >= 1) {
            let Valori = [];
            for (var key in detailsOfYears) {
                if (detailsOfYears.hasOwnProperty(key)) {
                    Valori.push({
                        name: key,
                        value: Number(detailsOfYears[key])
                    });
                }
            }

            return <PieChart width={250} height={250}>
                <Pie
                    key={'pieChart1'}
                    labelLine={false}
                    label={this
                    .getCustomlableFordetailsFilesChart
                    .bind(this)}
                    data={Valori}
                    cx={'50%'}
                    cy={'50%'}
                    outerRadius={60}
                    fill="#2b5a88"
                    isAnimationActive={true}
                    animationDuration={1000}/>
                <Pie
                    key={'pieChart2'}
                    label={this
                    .getCustomlableFordetailsYearFilesChart
                    .bind(this)}
                    labelLine={true}
                    data={Valori}
                    cx={'50%'}
                    cy={'50%'}
                    innerRadius={70}
                    outerRadius={90}
                    fill="#6f8ba0"
                    isAnimationActive={true}
                    animationDuration={2000}/>
                <Tooltip/>
            </PieChart>

        }
    }
    render() {
        let s = this.state;
        return (
            <div className="pl-4">
                {s.detailesOfYears
                    ? this.getChartDetailsFiles(s.detailesOfYears, s.numberOfAllScannedDays)
                    : 'Non ci sono file Registrati'}
            </div>
        );
    }
}
