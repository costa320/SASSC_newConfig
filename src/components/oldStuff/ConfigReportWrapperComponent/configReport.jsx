import React, { Component } from 'react';
/* COMPONENTS */
/* MOCK */
import mockDATI from '../../config/mockDati.json';
/* ANTD */
import {
    Icon,
    Card,
    Select,
    Switch,
    DatePicker,
    Button,
    Divider
} from 'antd';
import 'moment/locale/it'
/* AXIOS */
import axios from 'axios';
/* EXTRAS */
import { getMonthName } from '../../components/Extras/DateManager+.js';
/* CONFIG  */
import RadarsConfig from '../../assets/geoAssets/Radars/RadarsConfig.json';
/* CSS */
import '../../assets/styles/css/ReportPage.css';
import 'antd/dist/antd.css';
import TableOfRadars from './TableOfRadars.jsx';

export default class ConfigReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayOfSelectedElements: undefined,
            selectedAllRadars: false,
            selectModeConfigReport: undefined,
            selectDetezioneConfigReport: undefined,
            /* date pickers */
            dateConfig: undefined,
            /* NEXT Step */
            nextStepEnabled: false,

            /* TABLEDATA */
            tableDataChild: undefined
        };
    }

    componentDidMount() { }

    handleChangeSelectConfigReport = (arrayOfSelectedElements) => {
        if (RadarsConfig.radarList.length === arrayOfSelectedElements.length) {
            this.setSelectedAllRadars(true);
        } else {
            this.setSelectedAllRadars(false);
        }
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
        this.setArrayOfSelectedElements(arrayOfSelectedElements);
    }

    selectAllRadars = () => {
        this.setArrayOfSelectedElements(RadarsConfig.radarList.map(radar => radar.value));
    }
    deselectAllRadars = () => {
        this.setArrayOfSelectedElements(undefined);
    }

    handleSelectDeselectAllRadars = (checked) => {
        this.setSelectedAllRadars(checked);
        if (checked) {
            this.selectAllRadars();
        } else {
            this.deselectAllRadars();
        }
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
    }

    handleChangeSelectModeConfigReport = (value) => {
        this.setSelectModeConfigReport(value);
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
    }

    handleChangeMesePicker = (dateMoment_js, dateString) => {
        this.setDateConfig(dateMoment_js);
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
    }

    handleChangePersonalizzatoDataPicker = (dateMoment_js, dateString) => {
        this.setDateConfig(dateMoment_js);
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
    }

    handleClickResetConfigFields = () => {
        this.setArrayOfSelectedElements(undefined);
        this.setSelectModeConfigReport(undefined);
        this.setDateConfig('');
        this.setSelectedAllRadars(false);
        this.setSelectDetezioneConfigReport(undefined);
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
    }

    handleChangeSelectDetezioneConfigReport = (value, element) => {
        this.setSelectDetezioneConfigReport(value);
        this.setNextStepEnabled(false);
        this.setTableDataChild(undefined);
    }

    handleClickProcedi = () => {
        this.setNextStepEnabled(true);
        this.setState();
    }

    handleClickCreaReport = () => {
        this.props.setTableDataChild(this.state.tableDataChild);
    }

    setSelectModeConfigReport = (selectModeConfigReport) => {
        this.setState({ selectModeConfigReport })
    }

    setArrayOfSelectedElements = (arrayOfSelectedElements) => {
        this.setState({ arrayOfSelectedElements });
    }

    setSelectedAllRadars = (selectedAllRadars) => {
        this.setState({ selectedAllRadars });
    }

    setDateConfig = (dateConfig) => {
        this.setState({ dateConfig });
    }

    setSelectDetezioneConfigReport = (selectDetezioneConfigReport) => {
        this.setState({ selectDetezioneConfigReport })
    }

    setNextStepEnabled = (nextStepEnabled) => {
        this.setState({ nextStepEnabled });
    }

    setTableDataChild = (tableDataChild) => {
        this.setState({ tableDataChild });
    }

    getTitleOfConfigReport = () => {
        return <span className="capletters c-1">
            <Icon type="profile" className="configReportIcon mr-3" />Configurazione Report
            </span>
    }


    getDataContainer = (mode) => {
        let datePicker;
        switch (mode) {
            case 'mese':
                datePicker = this.getMeseDataPicker();
                break;
            case 'personalizzato':
                datePicker = this.getPersonalizzatoDataPicker();
                break;
        }
        return <div className="row mt-3">
            <div className="col p-0 m-0">{datePicker}</div>
        </div>
    }

    getMeseDataPicker = () => {
        return <DatePicker.MonthPicker
            className="w-100"
            placeholder="Seleziona il mese"
            onChange={this.handleChangeMesePicker} />
    }
    getPersonalizzatoDataPicker = () => {
        return <DatePicker.RangePicker
            placeholder={["Data da", "Data a"]}
            size={'default'}
            className="w-100"
            placeholder="Seleziona il periodo"
            onChange={this.handleChangePersonalizzatoDataPicker} />
    }

    getNextButtons() {
        let s = this.state;
        return <Divider>
            {!s.nextStepEnabled ?
                <span><Button type="primary" onClick={this.handleClickProcedi}>Procedi</Button>
                    <Divider type="vertical" /></span> : ''}
            <Button type="danger" onClick={this.handleClickResetConfigFields}>Reset</Button>
        </Divider>
    }

    getButtonCreateReport = (tableData) => {

        if (tableData && tableData.length >= 1) {
            return <Divider>
                <Button type="default" onClick={this.handleClickCreaReport}>Crea il Report</Button>
            </Divider>
        }
        else {
            return '';
        }

    }

    render() {
        let s = this.state;
        return (

            <Card title={this.getTitleOfConfigReport()} className="h-100">
                <div className="w-100 h-100 m-0 p-0">
                    <div className="row">
                        <div className="col-4">
                            <Select
                                mode="multiple"
                                className="w-100"
                                placeholder={'Seleziona uno o piu radar'}
                                value={s.arrayOfSelectedElements}
                                onChange={this.handleChangeSelectConfigReport}>
                                {RadarsConfig
                                    .radarList
                                    .map((radar) => {
                                        return <Select.Option key={radar.value} value={radar.value}>{radar.text}</Select.Option>
                                    })}
                            </Select>
                        </div>
                        <div className="col-3">
                            <div className="container p-0 m-0">
                                <div className="row">
                                    <Switch
                                        className="switchConfigReportSelectAll mt-1"
                                        checked={s.selectedAllRadars}
                                        checkedChildren="Deseleziona tutti i radar"
                                        unCheckedChildren="seleziona tutti i radar"
                                        onChange={this.handleSelectDeselectAllRadars} />
                                </div>
                                <div className="row mt-3">
                                    <div className="col p-0 m-0">
                                        <Select
                                            className="selectConfigReportMode"
                                            placeholder={'Seleziona la modalità con cui iniziare'}
                                            value={s.selectModeConfigReport}
                                            onChange={this.handleChangeSelectModeConfigReport}>
                                            {RadarsConfig
                                                .modalitaReport
                                                .map((mode) => {
                                                    return <Select.Option key={mode.value} value={mode.value}>{mode.text}</Select.Option>
                                                })}
                                        </Select>
                                    </div>
                                </div>
                                {s.selectModeConfigReport
                                    ? this.getDataContainer(s.selectModeConfigReport)
                                    : ''}
                                <div className="row mt-3">
                                    <div className="col p-0 m-0">
                                        <Select
                                            mode="multiple"
                                            className="selectConfigReportMode"
                                            placeholder={'Seleziona la detezione con cui iniziare'}
                                            value={s.selectDetezioneConfigReport}
                                            onChange={this.handleChangeSelectDetezioneConfigReport}>
                                            {RadarsConfig
                                                .detentionList
                                                .map((detezione) => {
                                                    return <Select.Option key={detezione.value} value={detezione.value}>{detezione.text}</Select.Option>
                                                })}
                                        </Select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {s.arrayOfSelectedElements && s.selectModeConfigReport
                            ? (s.arrayOfSelectedElements.length >= 1
                                ? this.getNextButtons()
                                : '')
                            : ''}
                    </div>

                    {s.nextStepEnabled
                        ? <div className="row justify-content-center">
                            <div className="col-7">
                                <TableOfRadars
                                    radar={s.arrayOfSelectedElements}
                                    modalita={s.selectModeConfigReport}
                                    detezione={s.selectDetezioneConfigReport}
                                    data={s.dateConfig}
                                    setTableDataChild={this.setTableDataChild}
                                />
                            </div>
                        </div>
                        : ''}

                    {this.getButtonCreateReport(s.tableDataChild)}

                </div>
            </Card>
        );
    }
}
