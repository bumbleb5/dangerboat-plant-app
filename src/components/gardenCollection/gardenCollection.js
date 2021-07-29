import React from 'react';

import PlantCard from './plantCard/plantCard';
import './gardenCollection.css';

import plants from '../../plantAppData/plantData';

class GardenCollection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gardenCollection">
                {
                    plants.map((plant) => {
                        return <PlantCard plant={ plant } key={ plant.name }/>
                    })
                }
            </div>
        )
    }
}

export default GardenCollection;