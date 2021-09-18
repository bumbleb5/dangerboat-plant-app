import React from 'react';
import SliderComponent from '../reusableComponents/slider';
import Icon from '@mdi/react';
import { mdiWater } from '@mdi/js';
import { mdiWaterOutline } from '@mdi/js';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

import './plantInfo.css';

class PlantInfo extends React.Component {
    render() {
        return (
              <div className="plantInfoCard">
                    <div>
                        <h4 class="plantCardBotName"><em>Botanical Name</em></h4>
                    </div>
                    <div class="cardInfoGroup">
                        <p class="infoLabel">Light </p>
                        <div class="infoValue">
                            <div style={{display:'flex','align-items':'center'}}>
                                <Icon path={BrightnessLowIcon} title="less light" size={1} color="grey" />
                                <SliderComponent value="5"/>
                                <Icon path={BrightnessHighIcon} title="more light" size={1} color="grey" />
                            </div>
                        </div>
                    </div>
                    <div class="cardInfoGroup">
                        <p class="infoLabel">Water</p>
                        <div class="infoValue">
                            <div style={{display:'flex','align-items':'center'}}>
                                <Icon path={mdiWaterOutline} title="less water" size={1} color="grey"/>
                                <SliderComponent value="2" />
                                <Icon path={mdiWater} title="more water" size={1} color="grey" />
                            </div>
                        </div>
                    </div>
                    <div class="cardInfoGroup">
                          <p class="infoLabel">Food</p>
                          <p  class="infoValue">1 - 1 - 1</p>
                    </div>
                    <div class="cardInfoGroup">
                          <p class="infoLabel">Acquired</p>
                          <p class="infoValue">1-1-21</p>
                    </div>
                    <div class="cardInfoGroup">
                          <p class="infoLabel">Location</p>
                          <p class="infoValue">Sunroom</p>
                    </div>
              </div>
        );
    }
}

export default PlantInfo;
