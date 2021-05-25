// data = array of data of trading sessions
// trend -> 1(uptrend), 0(uptrend under pressure), -1(downtrend), 0.5(fake uptrend)

// rally attempt, confirmed uptrend, folow-through day.

const marketTrend = (dates,  data, trend = 1) => {    
  let counter = 0;   
  let days = 0;
  let lower = 0;
  let prevTrend = 0;
  let fakeTrendDays = 0;
  let fakeTrendLow = 0;
  let fakeTrendPrcnt = 0;
  let rallyAttemptDays = 0;

  for (let i = 0; i < data.length; i++) {
    days++;
   // console.log(data[i]);
    if (dates.includes(data[i].Date)) {
      counter++;
    }

    if (trend === 1) {  
      if (counter === 4) {
        trend = 0;
        console.log("uptrend under pressure from", data[i].Date);
      }
    } else if (trend === 0) {  
      let prcnt = 100 * (parseFloat(data[i].Close) - parseFloat(data[i-1].Close))/parseFloat(data[i-1].Close);
      if (prcnt >= 1.5) {
        prevTrend = 0;
        trend = 0.5;
        fakeTrendLow = parseFloat(data[i].Low);
      }
      if (counter === 6) {
        trend = -1;
        console.log("downtrend from", data[i].Date);
      }
    } else if (trend === -1) {
      let prcnt = 100 * (parseFloat(data[i].Close) - parseFloat(data[i-1].Close))/parseFloat(data[i-1].Close);
      if (prcnt >= 1.5) {
        prevTrend = -1;
        trend = 0.5;
        fakeTrendLow = data[i].Low;
      }
    } else if (trend === 0.5) {
      rallyAttemptDays++;
      if (data[i].Low < fakeTrendLow && rallyAttemptDays <= 3) {
        trend = prevTrend;
      }
      // check for follow-through day
      if (rallyAttemptDays > 3) {
        let prcnt = 100 * (parseFloat(data[i].Close) - parseFloat(data[i-1].Close))/parseFloat(data[i-1].Close);
        if (prcnt >= 1.5 && data[i].Volume > data[i-1].Volume) {
          trend = 1;
          console.log("uptrend from", data[i].Date);
        }
      }
      if (rallyAttemptDays === 10) {
        trend = prevTrend;
        // console.log("uptrend from", data[i].Date);
      }
    }

    if (days === 30) {
      days = 29;
      if (dates.includes(data[lower].Date)) {
        counter--;
      }
      lower++;
    }
  }
}

export default marketTrend;