import moment from 'moment';

const initialState = {
    // Basic info form
    commonName: '',
    nickname: '',
    botName: '',
    acqDate: moment().format(),
    useDate: true,
    // More detail form
    lightPref: 0,
    waterPref: 0,
    n: '',
    p: '',
    k: '',
    location: '',
    npkReq: false,
    // Care form
    waterEvent: false,
    waterDate: moment().format(),
    fertilizeEvent: false,
    fertilizeDate: moment().format(),
    treatEvent: false,
    treatDate: moment().format(),
    repotEvent: false,
    repotDate: moment().format(),
    // stepper state
    activeStep: 0,
    skipped: new Set(),
}

// function reducer(state, action) {
//   switch (action.type) {
//     case 'SAVE_BASIC_INFO': {
//       return {

//       }
//     }
//   }
// }