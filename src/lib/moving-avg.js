class MovingAverages {
  // simple moving average
  get_simple_ma(days, data) {
    let result = [];
    let sum = 0;
    if (days === 0) return result;

    for (let i = 0; i < days; i++) {
      sum += data[i];
    }
    for (let i = days; i < data.length; i++) {
      result[i-1] = (sum/days).toPrecision(10);
      sum = sum - data[i-days] + data[i];
    }

    return result;
  }
  // exponential moving average
  get_exponential_ma(days, data) {
    const sFactor = 2/(days + 1);
    let result = [];
    let sum = 0;

    if (days === 0) return result;

    for (let i = 0;  i < days; i++) {
      sum += parseFloat(data[i]);
    }

    sum = sum/days;
    for (let i = days; i < data.length; i++) {
      result[i-1] = sum.toPrecision(10);
      sum = data[i] * sFactor + parseFloat(result[i-1]) * (1-sFactor);
    }

    return result;
  }
}

export default new MovingAverages();