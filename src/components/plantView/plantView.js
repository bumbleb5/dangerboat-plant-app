import React from 'react';
import { Link } from 'react-router-dom';
import PantryService from "../../services/pantryService";


import PlantHistory from "./plantHistory";
import PlantInfo from "./plantInfo";
import './plantView.css';

class PlantView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plant: null,
        }
    }

    componentDidMount() {
        const {match:{params}}=this.props;
        PantryService.fetchPlantsFromPantry().then((plantData) => {
            let plantId = parseInt(params.plantId, 10);
            console.log(plantData);
            // plant data is array of obj
            // find obj where plantId === plantId
            let plant = plantData.find((plant) => plant.plantId === plantId);
            console.log('in plant view', plantId);
            console.log(plant);
            this.setState({
                plant: plant
            });
        });
    }

    render() {
        if (this.state.plant) {
            return (
                <div>
                    <div className="plantViewDiv">
                        <div className="plantViewTopContainer">
                            <h2 className="plantViewName">{this.state.plant.commonName}</h2>
                        </div>
                        <PlantInfo className="plantViewInfo" plant={this.state.plant}/>
                        <PlantHistory className="plantViewHistory" plant={this.state.plant}/>
                    </div>
                    <div className="plantViewNavLinkDiv">
                        <Link to="/"><p className="plantViewNavLink">Back to <br/> Garden Collection</p></Link>
                        <Link to="/"><p className="plantViewNavLink">Edit Plant <br/> Info</p></Link>
                        <Link to="/"><p className="plantViewNavLink">Edit Plant <br/> Care</p></Link>
                    </div>
                </div>
            );
        } else {
            return (
                <p>We're getting your plant, hold your pants!</p>
            );
        }

    }
}

export default PlantView;