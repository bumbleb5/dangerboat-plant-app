import React from 'react';

import PlantCard from './plantCard/plantCard';
import './gardenCollection.css';

// import plants from '../../plantAppData/plantData';
import axios from "axios";

class GardenCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
        }
    }

    componentDidMount() {
        // TODO: refactor for plantsService
        console.log('Getting plants');
        axios.get('/plants').then((response) => {
            const plantArr = JSON.parse(JSON.stringify(response.data));
            console.log('In garden collection');
            console.log(plantArr);
            this.setState({
                plants: plantArr,
            })
        });
    }

    render() {
        return (
            <div className="gardenCollection">
                {
                    this.state.plants.map((plant) => {
                        return <PlantCard plant={ plant } key={ plant.plantId }/>
                    })
                }
            </div>
        )
    }
}

export default GardenCollection;