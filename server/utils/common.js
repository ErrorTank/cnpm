const transformProductDescribeFields = product => {

  if (product.describeFields && product.describeFields.length) {
    let result;
    result = {...product, describeFields: product.describeFields.map(each => JSON.parse(each))};
    if (result.hasOwnProperty(options)) {
      return {
        ...result, options: result.options.map(transformProductDescribeFields)
      };

    }
    return result;
  }
  return {...product};

};

module.exports = {transformProductDescribeFields};