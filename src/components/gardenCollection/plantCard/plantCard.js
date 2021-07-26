import React from 'react';

import './plantCard.css';

class PlantCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="plantCard">
                <div>
                    <h2 className="plantCardName">{ this.props.plant.name }</h2>
                </div>
                <div>
                    <table className="plantInfoTable">
                        <tbody>
                            <tr>
                                <td className="plantCardLabel">Water needs: </td>
                                <td className="plantCardData">{this.props.plant.waterNeeds ? this.props.plant.waterNeeds : 'add water needs'}</td>
                            </tr>
                            <tr>
                                <td className="plantCardLabel">Acquired: </td>
                                <td className="plantCardData"></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </div>
        );    
    }
}

export default PlantCard;