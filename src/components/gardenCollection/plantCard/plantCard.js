import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import './plantCard.css';

class PlantCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant
        }
    }

    // componentDidMount() {
    //     console.log('Hello Plant Card');
    //     console.log(this.state.plant);
    // }

    render() {
        return (
            <div className="plantCard">
                <div>
                    <Link className="plantCardName" to={ "/plantView/" + this.state.plant.plantId } plant={ this.state.plant }><h2>{ this.state.plant.commonName }</h2></Link>
                </div>
                <div>
                    <table className="plantInfoTable">
                        <tbody>
                            {this.state.plant.waterPref && <tr>
                                <td className="plantCardLabel">Water needs:</td>
                                <td className="plantCardData">{this.state.plant.waterPref ? this.state.plant.waterPref : 'add water needs'}</td>
                            </tr>}
                            {this.state.plant.lightPref && <tr>
                                <td className="plantCardLabel">Light needs:</td>
                                <td className="plantCardData">{this.state.plant.lightPref ? this.state.plant.lightPref : 'add light needs'}</td>
                            </tr>}
                            {this.state.plant.npkPref && <tr>
                                <td className="plantCardLabel">Fertilizer needs:</td>
                                <td className="plantCardData">{this.state.plant.npkPref ? this.state.plant.npkPref : 'add fertilizer needs'}</td>
                            </tr>}
                            {this.state.plant.location && <tr>
                                <td className="plantCardLabel">Location:</td>
                                <td className="plantCardData">{this.state.plant.location ? this.state.plant.location : 'add location'}</td>
                            </tr>}
                            {this.state.plant.acqDate && <tr>
                                <td className="plantCardLabel">Acquired:</td>
                                <td className="plantCardData">{this.state.plant.acqDate ? moment(this.state.plant.acqDate).format("MMM Do YY") : 'add acquisition date'}</td>
                            </tr>}
                        </tbody>
                    </table>
                    </div>
            </div>
        );    
    }
}

export default PlantCard;