import React, {useEffect, useState} from 'react';

import PantryService from '../../services/pantryService';

import PlantCard from './plantCard/plantCard';
import './gardenCollection.css';
import pantryService from "../../services/pantryService";

// import plants from '../../plantAppData/plantData';
// import plantService from '../../services/plantService';
// import axios from "axios";

function GardenCollection (props) {
    // TODO: move useEffect to here so it can get plants when render
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     plants: this.props.plants,
    //     // }
    // }
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        PantryService.fetchPlantsFromPantry().then((plantArr) => {
            console.log('IN MAIN APP');
            console.log(plantArr);
            setPlants(plantArr);
        });
    }, []);

    // componentDidMount() {
    //
    // }


    return (
        <div className="gardenCollection">
            { plants.length > 0 &&
                plants.map((plant) => {
                    return <PlantCard plant={ plant } key={ plant.plantId }/>
                })
            }
        </div>
    )

}

export default GardenCollection;