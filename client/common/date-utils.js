const createBirthList = (count, modifier) => [...Array(count).keys()].map(x => modifier(x)).map(x => ({label: x, value: x}));

const getDayList = ({month, year}) => {
  let dayCount = year === 0 ? month === 0 ? 31 : new Date(1990, Number(month), 0).getDate() : new Date(year, Number(month), 0).getDate();
  return {

    dayList: createBirthList(dayCount, x => x + 1)
  }
};

const checkValidDate = ({day, month, year}) => {
  let {dayList} = getDayList({day, month, year});
  return dayList.map(x => x.value).includes(Number(day));
};

export {
  getDayList,
  checkValidDate,
  createBirthList
}