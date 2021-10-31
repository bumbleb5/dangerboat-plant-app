import axios from 'axios';

const fetchPlantsFromPantry = async () => {
    let plants = [];
    console.log(process.env.REACT_APP_PANTRY_URL, process.env.REACT_APP_PANTRY_ID);
    // await axios.get(process.env.PANTRY_URL + process.env.PANTRY_ID + '/basket/Plants').then((response) => {
    //     console.log(response);
    //     const plantArr = JSON.parse(JSON.stringify(response));
    //     plants = plantArr;
    // });

    return await axios.get(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Plants').then((response) => {
        // console.log(response);
        // let arr = []
        // for (const [key, value] of Object.entries(response.data)) {
        //     arr.push(value);
        // }
        // console.log(arr);
        let arr = Object.values(response.data);
        // console.log(arr);
        return arr;
    });

    // return plants;
};

const postNewPlantToPantry = async (plant) => {
    await axios.put(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Plants', plant).then((response) => {
        console.log(response);
    });
};

const fetchEventsForPlant = async (plantId) => {
    let events = [];

    return await axios.get(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Events-' + plantId).then((response) => {
        console.log(response);
        return JSON.parse(JSON.stringify(response));
        // events = eventArr;
    })

    // return events;
};

const postEventForPlant = async (plantId, event) => {
    try {
        // try to put new event
        await axios.put(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Events-' + plantId, event).then((response) => {
            console.log(response);
        });
    } catch {
        // catch failure of basket not existing with new basket
        await axios.post(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Events-' + plantId, event).then((response) => {
            console.log(response);
        });
    }
};

export default {
    fetchPlantsFromPantry,
    postNewPlantToPantry,
    fetchEventsForPlant,
    postEventForPlant,
}