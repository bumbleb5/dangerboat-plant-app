import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import './plantCard.css';

function PlantCard (props) {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         plant: this.props.plant
    //     }
    // }

    const [plant, setPlant] = useState(props.plant);

    // useEffect(() => {
    //     setPlant(props.plant);
    //     console.log(plant);
    // }, []);

    // componentDidMount() {
    //     console.log('Hello Plant Card');
    //     console.log(this.state.plant);
    // }
     return (
            <div className="plantCard">
                <div>
                    <Link className="plantCardName" to={ "/plantView/" + plant.plantId } plant={ plant }><h2>{ plant.commonName }</h2></Link>
                </div>
                <div>
                    <table className="plantInfoTable">
                        <tbody>
                            {plant.waterPref && <tr>
                                <td className="plantCardLabel">Water needs:</td>
                                <td className="plantCardData">{plant.waterPref ? plant.waterPref : 'add water needs'}</td>
                            </tr>}
                            {plant.lightPref && <tr>
                                <td className="plantCardLabel">Light needs:</td>
                                <td className="plantCardData">{plant.lightPref ? plant.lightPref : 'add light needs'}</td>
                            </tr>}
                            {plant.npkPref && <tr>
                                <td className="plantCardLabel">Fertilizer needs:</td>
                                <td className="plantCardData">{plant.npkPref ? plant.npkPref : 'add fertilizer needs'}</td>
                            </tr>}
                            {plant.location && <tr>
                                <td className="plantCardLabel">Location:</td>
                                <td className="plantCardData">{plant.location ? plant.location : 'add location'}</td>
                            </tr>}
                            {plant.acqDate && <tr>
                                <td className="plantCardLabel">Acquired:</td>
                                <td className="plantCardData">{plant.acqDate ? moment(plant.acqDate).format("MMM Do YY") : 'add acquisition date'}</td>
                            </tr>}
                        </tbody>
                    </table>
                    </div>
            </div>
     );
}

export default PlantCard;