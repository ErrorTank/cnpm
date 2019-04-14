const getErrorObject = err => {
  return JSON.parse(JSON.stringify(err)).graphQLErrors[0];
}

export {
  getErrorObject
}