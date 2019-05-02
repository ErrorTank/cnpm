import moment from "moment"

const createMomentLocale = (lang) => {
  return moment.locale(lang);
};

const convertMilToDifferent = (mil) => {
  let left = mil;
  let result = {

  };
  // if(left / 31556926000 >= 1){
  //   result.year = Math.floor(left / 31556926000);
  //   left = left - (31556926000 * result.year);
  // }
  //
  // if(left / 2629743830 >= 1){
  //   result.month = Math.floor(left / 2629743830);
  //   left = left - (2629743830 * result.month);
  // }

  if(left / 86400000 >= 1){
    result.day = Math.floor(left / 86400000);

    left = left - (86400000 * result.day);
  }

  if(left / 3600000 >= 1){

    result.hour = Math.floor(left / 3600000);

    left = left - (3600000 * result.hour);
  }

  if(left / 60000 >= 1){
    result.minute = Math.floor(left / 60000);

    left = left - (60000 * result.minute);
  }
  if(left / 1000  >= 1){
    result.second = Math.floor(left / 1000);
  }

  return result;
};
const viMoment = createMomentLocale("vi");

export {
  viMoment,
  convertMilToDifferent
}