// Check if given string consists of valid input
const validText = str => {
  return typeof str === 'string' && str.trim().length > 0;
};

export default validText;