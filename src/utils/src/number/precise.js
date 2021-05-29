const precise = (number, point = 2) => {
  const m = Math.pow(10, point);
  return parseInt(number * m, 10) / m;
};

export default precise;
