import axios from 'axios';

const fetchPlants = async () => {
    let plants;
    // try {
    // await axios.get(process.env.API_URL + 'plants').then((response) => {
    //     const plantArr = JSON.parse(JSON.stringify(response.data));
    //     console.log('Get Plants!');
    //     console.log(plantArr);
    //     plants = plantArr;
    // });
    // } catch {
    // await axios.get(process.env.PANTRY_URL + process.env.PANTRY_ID + '/basket/Plants').then((response) => {
    //     const plantArr = JSON.parse(JSON.stringify(response));
    //     plants = plantArr;
    // });
    // }

    return plants;
}

const fetchPlant = async (plantId) => {
    return await axios.get(process.env.API_URL + 'plants/' + plantId).then((response) => {
        return JSON.parse(JSON.stringify(response.data));
    });
}

const postPlant = async (plant) => {
    return await axios.post(process.env.API_URL + 'plants', plant).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log('Error posting plant');
        console.log(error);
    });
}

export default {
    fetchPlants,
    fetchPlant,
}