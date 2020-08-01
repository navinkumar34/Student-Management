const setSelected = (value, currentValue) => {
  if (value === currentValue) {
    return "selected";
  } else {
    return "";
  }
};

module.exports = setSelected;
