import axios from 'axios';

const fetchPlants = async () => {
    let plants;
    await axios.get('/plants').then((response) => {
        const plantArr = JSON.parse(JSON.stringify(response.data));
        console.log('Get Plants!');
        console.log(plantArr);
        plants = plantArr;
    });
    return plants;
}

const fetchPlant = async (plantId) => {
    return await axios.get('/plants/' + plantId).then((response) => {
        return JSON.parse(JSON.stringify(response.data));
    });
}

export default {
    fetchPlants,
    fetchPlant,
}