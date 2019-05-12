import React, { Component } from 'react';
/* RECHART COMPONENTS */
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
/* CSS */
import '../../assets/styles/css/HomePage.css'
import 'antd/dist/antd.css';

export default class BarChartBrush extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let data = this.props.data;
        if (data) {
            if (data.length >= 1) {
                this.setData(data);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        let data = nextProps.data;
        if (data) {
            if (data.length >= 1) {
                this.setData(data);
            }
        }
    }
    setData = (data) => {
        this.setState({ data });
    }

    getBarChart = (data) => {
        return <BarChart width={680} height={260} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={95} stroke='#dc3545' />
            <Brush dataKey='day' height={30} stroke="#6f8ba0" />
            <Bar dataKey="value" fill="#2b5a88" />
        </BarChart>
    }

    render() {
        let s = this.state;
        return (
            <div className="p-0 m-0">
                {s.data
                    ? (s.data.length >= 1
                        ? this.getBarChart(s.data)
                        : "Non ci sono dati per questo mese, Selezionare un'altro mese")
                    : "Non ci sono dati per questo mese, Selezionare un'altro mese"}
            </div>
        );
    }
}
