import React from 'react';

import PlantCard from './plantCard/plantCard';
import './gardenCollection.css';

// import plants from '../../plantAppData/plantData';
// import plantService from '../../services/plantService';
// import axios from "axios";

class GardenCollection extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     plants: this.props.plants,
    //     // }
    // }

    // componentDidMount() {
    //
    // }

    render() {
        return (
            <div className="gardenCollection">
                {
                    this.props.plants.map((plant) => {
                        return <PlantCard plant={ plant } key={ plant.plantId }/>
                    })
                }
            </div>
        )
    }
}

export default GardenCollection;