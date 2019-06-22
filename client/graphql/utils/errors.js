const getErrorObject = err => {
  let errJson = JSON.parse(JSON.stringify(err));
  return errJson ? errJson.graphQLErrors[0] : {};
};

export {
  getErrorObject
}