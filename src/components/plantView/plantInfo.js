import React from 'react';
// import plantService from "../../services/plantService";

import SliderComponent from '../reusableComponents/slider';

import Icon from '@mdi/react';
import { mdiWater } from '@mdi/js';
import { mdiWaterOutline } from '@mdi/js';
import {mdiBrightness5} from '@mdi/js';
import {mdiBrightness7} from '@mdi/js';

import './plantInfo.css';

class PlantInfo extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         plant: null,
    //     }
    // }
    //
    // componentDidMount() {
    //     const plant = plantService.fetchPlant(this.props.plant.plantId);
    //     this.setState({
    //         plant
    //     });
    // }

    render() {
        return (
              <div className="plantInfoCard">
                    <div>
                        <h4 className="plantCardBotName"><em>{this.props.plant.botName}</em></h4>
                    </div>
                    <div className="cardInfoGroup">
                        <p className="infoLabel">Light </p>
                        <div className="infoValue">
                            <div style={{display:'flex','alignItems':'center', 'justifyContent': 'space-evenly'}}>
                                <Icon path={mdiBrightness5} title="less light" size={1} color="grey" />
                                <SliderComponent value={this.props.plant.lightPref}/>
                                <Icon path={mdiBrightness7} title="more light" size={1} color="grey" />
                            </div>
                        </div>
                    </div>
                    <div className="cardInfoGroup">
                        <p className="infoLabel">Water</p>
                        <div className="infoValue">
                            <div style={{display:'flex','alignItems':'center', 'justifyContent': 'space-evenly'}}>
                                <Icon path={mdiWaterOutline} title="less water" size={1} color="grey"/>
                                <SliderComponent value={this.props.plant.waterPref} />
                                <Icon path={mdiWater} title="more water" size={1} color="grey" />
                            </div>
                        </div>
                    </div>
                    <div className="cardInfoGroup">
                          <p className="infoLabel">Food</p>
                          <p  className="infoValue">1 - 1 - 1</p>
                    </div>
                    <div className="cardInfoGroup">
                          <p className="infoLabel">Acquired</p>
                          <p className="infoValue">1-1-21</p>
                    </div>
                    <div className="cardInfoGroup">
                          <p className="infoLabel">Location</p>
                          <p className="infoValue">Sunroom</p>
                    </div>
              </div>
        );
    }
}

export default PlantInfo;
