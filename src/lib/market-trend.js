// data = array of data of trading sessions
// trend -> 1(uptrend), 0(uptrend under pressure), -1(downtrend), 0.5(fake uptrend)

// rally attempt, confirmed uptrend, folow-through day.

const UPTREND = "Uptrend";
const DOWNTREND = "Downtrend";
const UPTREND_UNDER_PRESSURE = "Uptrend under Pressure";
const RALLY_ATTEMPT = "Rally Attempt";

const marketTrend = (dates,  data, trend = 1) => {    
  let counter = 0;   
  let days = 0;
  let lower = 0;
  let prevTrend = 0;
  let fakeTrendDays = 0;
  let fakeTrendLow = 0;
  let fakeTrendPrcnt = 0;
  let rallyAttemptDays = 0;
  let trendArr = [];

 
  for (let i = 1; i < data.length; i++) {
     days++;
    if (dates.includes(data[i].Date)) {
      counter++;
    }

    if (trend === 1) {  
      if (counter === 4) {
        trend = 0;
        trendArr.push(`uptrend under pressure from ${data[i].Date}`)
        console.log("uptrend under pressure from", data[i].Date);
      }
    } else if (trend === 0) {  // uptrend under pressure
    
      let prcnt = 100 * (parseFloat(data[i].Close) - parseFloat(data[i-1].Close))/parseFloat(data[i-1].Close);
      if (prcnt >= 1.5) {
        prevTrend = 0;
        trend = 0.5;
        fakeTrendLow = parseFloat(data[i].Low);
      }
      if (counter === 6) {
        trend = -1;
        trendArr[trendArr.length -1].endDate = data[i-1].Date;
        trendArr.push({
          trend: DOWNTREND,
          startDate: data[i].Date
        });
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
        trend = -1;
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

const generalMarketTrend = (dates, data, trend = 1) => {
  let rallyAttemptDays = -3;
  let rallyAttemptStarted = false;
  let days = 0;
  let prevUptrendHigh = 0;
  let downtrendLow = null;
  let lower = 0;
  let counter = 0;
  let trendArr = [];

  for (let i = 1; i < data.length; i++) {
    days++;
    if (dates.includes(data[i].Date)) {
      counter++;
    }

    if (trend === 1) {
    // may go to uptrend under pressure.
    // furter trend possiblity (0)

    // calculating previous uptrend high.
      prevUptrendHigh = parseFloat(data[i].High) > prevUptrendHigh ? parseFloat(data[i].High) : prevUptrendHigh;
      if (counter === 4) {
        trend = 0;
        if (trendArr.length) trendArr[trendArr.length -1].endDate = data[i-1].Date;
        
        trendArr.push({
          trend: UPTREND_UNDER_PRESSURE,
          startDate: data[i].Date,
          endDate: ""
        });
        console.log("uptrend under pressure from", data[i].Date);
       
      }
    } else if (trend === 0) {
      // may go to downtrend or uptrend
      // further possible trend (1 or -1)
      // uptrend possiblity
      if (parseFloat(data[i].High > prevUptrendHigh)) {
        trend = 1;
        prevUptrendHigh = 0;

        if (trendArr.length) trendArr[trendArr.length -1].endDate = data[i-1].Date;
        trendArr.push({
          trend: UPTREND,
          startDate: data[i].Date,
          endDate: ""
        });
        console.log("uptrend from ", data[i].Date);

      }
      // downtrend possiblity
      if (counter === 6) {
        trend = -1;
        downtrendLow = null;
        rallyAttemptStarted = false;
        rallyAttemptDays = -3;

        if (trendArr.length) trendArr[trendArr.length -1].endDate = data[i-1].Date;
        trendArr.push({
          trend: DOWNTREND,
          startDate: data[i].Date,
          endDate: ""
        });
        console.log("downtrend from", data[i].Date);
        
      }
    } else if (trend === -1) {
      // will try ralley attempt and may go to follow through day
      // further trend possiblity (1, 0.5)

        if (!downtrendLow) {
          downtrendLow = parseFloat(data[i].Low);
        } else {
          downtrendLow = parseFloat(data[i].Low) < downtrendLow ? parseFloat(data[i].Low) : downtrendLow;
        }

        // uptrend possiblity.
        // if (parseFloat(data[i].High) > prevUptrendHigh) {
        //   console.log(prevUptrendHigh, data[i].High)
        //   trend = 1;
        //   prevUptrendHigh = 0;
        //   console.log("uptrend from ", data[i].Date);
        //   continue;
        // }

        if (rallyAttemptStarted === false && parseFloat(data[i].Close) > downtrendLow) {
          rallyAttemptStarted = true;
        }
      // rallyattempt
      if (rallyAttemptStarted) {
        if (rallyAttemptDays < 0) {
          rallyAttemptDays++;
        } else {
          downtrendLow = null;
          trend = 0.5;
          if (trendArr.length) trendArr[trendArr.length -1].endDate = data[i-1].Date;
          trendArr.push({
            trend: RALLY_ATTEMPT,
            startDate: data[i].Date,
            endDate: ""
          });
          console.log("rally attempt started from", data[i].Date);
        }
      }
      

    } else  if (trend === 0.5) {
      // may go to uptrend or back to downtrend
      // further trend possiblity (1 or -1)

      // uptrend possiblity
      let prcnt = 100 * (parseFloat(data[i].Close) - parseFloat(data[i-1].Close))/parseFloat(data[i-1].Close);
      if (prcnt >= 1.5 && data[i].Volume > data[i-1].Volume) {
        trend = 1;
        prevUptrendHigh = 0;
        if (trendArr.length) trendArr[trendArr.length -1].endDate = data[i-1].Date;
        trendArr.push({
          trend: UPTREND,
          startDate: data[i].Date,
          endDate: ""
        });
        console.log("uptrend from", data[i].Date);
      }

      // downtrend possiblity if rally attempt fails

      if (parseFloat(data[i].Close) < parseFloat(data[i-1].Low)) {
        // rally attempt breaks.
        if (trendArr.length) trendArr[trendArr.length -1].endDate = data[i-1].Date;
        trendArr.push({
          trend: DOWNTREND,
          startDate: data[i].Date,
          endDate: ""
        });
        console.log("downtrend from ", data[i].Date);
        trend = -1;
        rallyAttemptStarted = false;
        rallyAttemptDays = -3;
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

  return trendArr;
}

export default generalMarketTrend;