

var testMid = () => {
  console.log('function');
  return (req, res, next) => {
    console.log('testMid')
    next();
  }
}

module.exports = { testMid };
