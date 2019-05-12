import React, { Component } from 'react';
/* COMPONENTS */

/* MOCK */
import mockDATI from '../../config/mockDati.json';
/* ANTD */
import { Icon, Table, Select, DatePicker } from 'antd';
import 'moment/locale/it'
/* EXTRAS */
import { getMonthName } from '../../components/Extras/DateManager+.js';
import { getRadarByID, getRadarIndexByRadarID } from '../../components/Extras/RadarsManager+.js';
/* CONFIG  */
import RadarsConfig from '../../assets/geoAssets/Radars/RadarsConfig.json';
/* CSS */
import '../../assets/styles/css/ReportPage.css'
import 'antd/dist/antd.css';

export default class TableOfRadars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* dati analizzati e parsati  */
            tableData: [],
            columns: []
        };
    }

    componentDidMount() {
        let radar = this.props.radar;
        let modalita = this.props.modalita;
        let detezione = this.props.detezione;
        let data = this.props.data;
        if (radar && modalita) {
            if (radar.length >= 1) {
                this.initTableData(radar, modalita, detezione, data);
                this.initColumns();
            }
        }
    }
    /*     componentWillUpdate(nextProps) {
            let radar = nextProps.radar;
            let modalita = nextProps.modalita;
            let detezione = nextProps.detezione;
            let data = nextProps.data;
            if (radar && modalita) {
                if (radar.length >= 1) {
                    this.initTableData(radar, modalita, detezione, data);
                    this.initColumns();
                }
            }
        } */

    initTableData = (ArrayRadarID, modalita, detezione, data) => {
        let formattedTableData = ArrayRadarID.map((radarID) => {
            return {
                radarValue: getRadarByID(radarID).value,
                radarText: getRadarByID(radarID).text,
                modalita: modalita,
                detezione: detezione,
                data: data
            }
        });
        this.setTableData(formattedTableData);
    }

    initColumns = () => {
        const columns = [
            {
                title: 'Radar',
                dataIndex: 'radarText',
                key: 'radarText_',
                align: 'center'
            }, {
                title: 'Modalità',
                dataIndex: 'modalita',
                key: 'modalita_',
                render: (modalita, radarOBJ) => (
                    <span>
                        {this.getSelectModalita(modalita, radarOBJ)}
                    </span>
                ),
                width: 100,
                align: 'center'
            }, {
                title: 'Detezione',
                dataIndex: 'detezione',
                key: 'detezione_',
                render: (detezione, radarOBJ) => (
                    <span>
                        {this.getSelectDetezione(detezione, radarOBJ)}
                    </span>
                ),
                width: 200,
                align: 'center'
            }, {
                title: 'Periodo',
                dataIndex: 'periodo',
                key: 'periodo_',
                render: (periodo, radarOBJ) => (
                    <span>
                        {this.getDateComponent(periodo, radarOBJ)}
                    </span>
                ),
                width: 270,
                align: 'center'
            }
        ];
        this.setColumns(columns);
    }

    handleChangeSelectModeConfigReport = (selectedValue, radarOBJ) => {
        let s = this.state;
        let UpdatedTableData = s.tableData;
        let RadarIndex = getRadarIndexByRadarID(s.tableData, radarOBJ.radarValue);
        UpdatedTableData[RadarIndex].modalita = selectedValue;

        this.setTableData(UpdatedTableData);
    }

    handleChangeSelectDetezioneConfigReport = (selectedValue, radarOBJ) => {
        let s = this.state;
        let UpdatedTableData = s.tableData;
        let RadarIndex = getRadarIndexByRadarID(s.tableData, radarOBJ.radarValue);
        UpdatedTableData[RadarIndex].detezione = selectedValue;

        this.setTableData(UpdatedTableData);
    }
    handleChangeMesePicker = (dateMoment_js, radarOBJ) => {

        let s = this.state;
        let UpdatedTableData = s.tableData;
        let RadarIndex = getRadarIndexByRadarID(s.tableData, radarOBJ.radarValue);
        UpdatedTableData[RadarIndex].data = dateMoment_js;

        this.setTableData(UpdatedTableData);
    }
    handleChangePersonalizzatoDataPicker = (dateMoment_js, radarOBJ) => {

        let s = this.state;
        let UpdatedTableData = s.tableData;
        let RadarIndex = getRadarIndexByRadarID(s.tableData, radarOBJ.radarValue);
        UpdatedTableData[RadarIndex].data = dateMoment_js;

        this.setTableData(UpdatedTableData);
    }



    setTableData = (tableData) => {
        this.setState({ tableData }, this.props.setTableDataChild(tableData));
    }
    setColumns = (columns) => {
        this.setState({ columns });
    }

    getSelectModalita = (modalita, radarOBJ) => {
        return <Select
            key={radarOBJ.radarValue + '_selModalita'}
            className="selectConfigReportMode"
            placeholder={'Seleziona la modalità'}
            value={radarOBJ.modalita || undefined}
            onChange={(selectedValue) => this.handleChangeSelectModeConfigReport(selectedValue, radarOBJ)}>
            {RadarsConfig
                .modalitaReport
                .map((mode) => {
                    return <Select.Option key={mode.value + 'sel'} value={mode.value}>{mode.text}</Select.Option>
                })}
        </Select>
    }

    getSelectDetezione = (detezione, radarOBJ) => {
        return <Select
            mode="multiple"
            className="selectConfigReportMode"
            placeholder={'Seleziona la detezione'}
            value={radarOBJ.detezione || undefined}
            onChange={(selectedValue) => this.handleChangeSelectDetezioneConfigReport(selectedValue, radarOBJ)}>
            {RadarsConfig
                .detentionList
                .map((mode) => {
                    return <Select.Option key={mode.value + 'selmod'} value={mode.value}>{mode.text}</Select.Option>
                })}
        </Select>
    }

    getDateComponent = (periodo, radarOBJ) => {
        switch (radarOBJ.modalita) {
            case 'mese':
                return <DatePicker.MonthPicker
                    className="w-100"
                    value={radarOBJ.data}
                    placeholder="Seleziona il mese"
                    onChange={(dateMoment_js) => this.handleChangeMesePicker(dateMoment_js, radarOBJ)} />
                break;
            case 'personalizzato':
                return <DatePicker.RangePicker
                    placeholder={["Data da", "Data a"]}
                    value={radarOBJ.data}
                    size={'default'}
                    className="w-100"
                    placeholder="Seleziona il periodo"
                    onChange={(dateMoment_js) => this.handleChangePersonalizzatoDataPicker(dateMoment_js, radarOBJ)} />
                break;
        }
    }

    render() {
        let s = this.state;
        return (
            <div className="w-100">
                {s.tableData.length >= 1 && s.columns.length >= 1
                    ? <Table size={'small'} bordered={true} dataSource={s.tableData} columns={s.columns} />
                    : ''}
            </div>
        );
    }
}
