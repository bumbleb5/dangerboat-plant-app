import React from 'react';
import { Link } from 'react-router-dom';

import './plantCard.css';

class PlantCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant
        }
    }

    render() {
        return (
            <div className="plantCard">
                <div>
                    <Link className="plantCardName" to={ "/plantView/" + this.state.plant.id } plant={ this.state.plant }><h2>{ this.state.plant.name }</h2></Link>
                </div>
                <div>
                    <table className="plantInfoTable">
                        <tbody>
                            <tr>
                                <td className="plantCardLabel">Water needs: </td>
                                <td className="plantCardData">{ this.state.plant.waterNeeds ? this.state.plant.waterNeeds : 'add water needs' }</td>
                            </tr>
                            <tr>
                                <td className="plantCardLabel">Acquired: </td>
                                <td className="plantCardData"> </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </div>
        );    
    }
}

export default PlantCard;