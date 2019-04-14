const getErrorObject = err => {
  console.log(JSON.parse(JSON.stringify(err)).graphQLErrors)
  return JSON.parse(JSON.stringify(err)).graphQLErrors[0];
}

export {
  getErrorObject
}