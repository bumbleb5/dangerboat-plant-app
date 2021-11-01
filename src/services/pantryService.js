import axios from 'axios';

const fetchPlantsFromPantry = async () => {
    // console.log(process.env.REACT_APP_PANTRY_URL, process.env.REACT_APP_PANTRY_ID);

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
};

const postNewPlantToPantry = async (plant) => {
    await axios.put(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Plants', plant).then((response) => {
        console.log(response);
    });
};

const fetchEventsForPlant = async (plantId) => {

    return await axios.get(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Events-' + plantId).then((response) => {
        console.log(response);
        return JSON.parse(JSON.stringify(response));
        // events = eventArr;
    })

};

const postEventForPlant = async (plantId, event) => {
    try {
        // try to put new event
        console.log('posting plant');
        await axios.put(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Events-' + plantId, event).then((response) => {
            console.log(response);
        });
    } catch (error) {
        // catch failure of basket not existing with new basket
        console.log('in handling block, posting new basket');
        await axios.post(process.env.REACT_APP_PANTRY_URL + process.env.REACT_APP_PANTRY_ID + '/basket/Events-' + plantId, event).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }
};

export default {
    fetchPlantsFromPantry,
    postNewPlantToPantry,
    fetchEventsForPlant,
    postEventForPlant,
}