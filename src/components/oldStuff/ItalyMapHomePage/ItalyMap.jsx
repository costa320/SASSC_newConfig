import React, {Component} from 'react';
/* REACT SIMPLE MAPS */
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker
} from "react-simple-maps"
/* ANTD */
import {Icon, message} from 'antd';
/* MAP FILES */
import Italy from '../../assets/geoAssets/Italia/TopoJSON_dettagliRegioni_ITA_1.json';

/* CSS */
import '../../assets/styles/css/ItalyHomePageMap.css'
import 'antd/dist/antd.css';

export default class ItalyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 1,
            radarsPositions: []
        };
    }

    componentDidMount() {
        let radarsPositions = this.props.radarsPositions;
        if (radarsPositions) {
            if (radarsPositions.length >= 1) {
                this.setRadarsPositions(radarsPositions);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        let radarsPositions = nextProps.radarsPositions;
        if (radarsPositions) {
            if (radarsPositions.length >= 1) {
                this.setRadarsPositions(radarsPositions);
            }
        }
    }

    setRadarsPositions(radarsPositions) {
        this.setState({radarsPositions});
    }

    getGeography = (geographies, projection) => {
        return geographies.map((geography, i) => {
            if (geography.id !== "ATA") {
                return <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                    default: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                    },
                    hover: {
                        fill: "#607D8B",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                    },
                    pressed: {
                        fill: "#FF5722",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                    }
                }}/>
            }
        })
    } //end method
    displayMakersInfo = (marker) => {
        message.info('Il radar ' + marker.name + ' ha un raggio di azione di ' + marker.radarRange);
    }

    handleClickOnMarker = (marker, evt) => {
        console.log("Marker data: ", marker)
        this.displayMakersInfo(marker);
    }

    getMarkers = () => {

        return this
            .state
            .radarsPositions
            .map((marker, i) => {
                {/*  onMouseEnter={ this.handleClickOnMarker } */
                }
                let Name = marker
                    .name
                    .split(' ');
                if (Name.length >= 2) {
                    if (Name.length > 2) {
                        Name = Name[-1];
                    } else {
                        Name = Name[0].substring(0, 1) + '.' + Name[1];
                    }
                } else {
                    Name = Name[0]
                }
                return <Marker
                    key={i}
                    marker={marker}
                    onClick={this.handleClickOnMarker}
                    style={{
                    default: {
                        stroke: "#455A64"
                    },
                    hover: {
                        stroke: "#FF5722"
                    },
                    /* pressed: { stroke: "#FF5722" } */
                }}>
                    <g transform="translate(-12, -24)">
                        <path
                            d="M11.112305635207315,0.2378999032924015 C5.062843680637532,0.2378999032924015 0.1413341795743931,4.086525239703895 0.1413341795743931,8.816644385820181 c0,4.55314572375829 9.954152439073981,15.190916317949286 10.377993476462617,15.641377083435875 l0.39555833668447393,0.42091313796264535 c0.04625899352460321,0.0494750972493939 0.1199218467710355,0.07839803920200658 0.19741964248582838,0.07839803920200658 c0.07869621523615578,0 0.15187970067404286,-0.028922941952612864 0.1986180620071909,-0.07839803920200658 l0.39531865278020134,-0.42091313796264535 c0.4240807212929079,-0.45046076548658964 10.377993476462617,-11.088231359677588 10.377993476462617,-15.641377083435875 C22.084235826457327,4.086525239703895 17.16192737904662,0.2378999032924015 11.112305635207315,0.2378999032924015 zM11.112305635207315,5.743753591887188 c2.1675414409714757,0 3.9300969783570907,1.3781813074698561 3.9300969783570907,3.072890793932993 c0,1.6938349266632737 -1.7626354320203723,3.072890793932993 -3.9300969783570907,3.072890793932993 c-2.166263126815356,0 -3.9300969783570907,-1.379055867269719 -3.9300969783570907,-3.072890793932993 C7.182208656850225,7.1219348993570435 8.945962613757198,5.743753591887188 11.112305635207315,5.743753591887188 z"
                            fill="#2b5a88"
                            id="svg_2"/>
                    </g>
                    <text
                        textAnchor="middle"
                        y={marker.markerOffset}
                        style={{
                        fontFamily: "Roboto, sans-serif",
                        fill: "#2b5a88",
                        fontSize: 18,
                        stroke: "#2b5a88"
                    }}>

                        {Name}
                    </text>
                </Marker >
            })
    }

    handleZoomIn = () => {
        this.setState({
            zoom: this.state.zoom * 2
        });
    }

    handleZoomOut = () => {
        this.setState({
            zoom: this.state.zoom / 2
        });
    }
    render() {
        let s = this.state;
        return (
            <div className="h-100 w-100 p-0 m-0">
                <ComposableMap
                    projectionConfig={{
                    scale: 5200,
                    rotation: [0, 0, 0]
                }}
                    height={940}
                    style={{
                    width: "100%",
                    height: "100%"
                }}>

                    <ZoomableGroup zoom={this.state.zoom} center={[9.3, 31.9]}>
                        <Geographies geography={Italy}>
                            {(geographies, projection) => this.getGeography(geographies, projection)}
                        </Geographies>

                        <Markers>
                            {this.getMarkers()}
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>

                <Icon
                    type="plus-square"
                    className="PlusMinusIcons"
                    onClick={this.handleZoomIn}/>
                <Icon
                    type="minus-square"
                    className="PlusMinusIcons"
                    onClick={this.handleZoomOut}/>
            </div>
        );
    }
}
