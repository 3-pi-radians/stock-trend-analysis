// rally attempt, confirmed uptrend, folow-through day.

const UPTREND = "Uptrend";
const DOWNTREND = "Downtrend";
const UPTREND_UNDER_PRESSURE = "Uptrend under Pressure";
const RALLY_ATTEMPT = "Rally Attempt";

const generalMarketTrend = (dates, data, trend = 1) => {
  let rallyAttemptStarted = false;
  let days = 0;
  let prevUptrendHigh = 0;
  let downtrendLow = null;
  let rallyAttemptDays = -2;
  let lower = 0;
  let counter = 0;
  let trendArr = [];

  for (let i = 0; i < data.length; i++) {
    days++;
    if (trend === 0 || trend === 1) {
      if (dates.includes(data[i].Date)) counter++;
    }

    if (trend === 1) {
    // may go to uptrend under pressure.
    // furter trend possiblity (0)

    // calculating previous uptrend high.
      prevUptrendHigh = parseFloat(data[i].Close) > prevUptrendHigh ? parseFloat(data[i].Close) : prevUptrendHigh;
      if (counter === 4) {
        trend = 0;
        if (trendArr.length) {
          trendArr[trendArr.length -1].endDate = data[i].Date;
          trendArr[trendArr.length -1].trendEnd = data[i].Close;
        }
        trendArr.push({
          trend: UPTREND_UNDER_PRESSURE,
          startDate: data[i+1].Date,
          endDate: "",
          trendStart: data[i+1].Close,
          trendEnd: 0,
          trendId: 0,
        });
        console.log("uptrend under pressure from", data[i+1].Date);
      }
    } else if (trend === 0) {
      // may go to downtrend or uptrend
      // further possible trend (1 or -1)
      // uptrend possiblity
      if (parseFloat(data[i].Close) > prevUptrendHigh ||  counter < 4) {
        trend = 1;
        prevUptrendHigh = 0;
        counter = 0;
        days = 0;
        lower = i;
        if (trendArr.length) {
          trendArr[trendArr.length -1].endDate = data[i].Date;
          trendArr[trendArr.length- 1].trendEnd = data[i].Close;
        } 
        trendArr.push({
          trend: UPTREND,
          startDate: data[i+1].Date,
          endDate: "",
          trendStart: data[i+1].Close,
          trendEnd: 0,
          trendId: 1
        });
        console.log("uptrend from ", data[i+1].Date);
      }
      // downtrend possiblity
      if (counter === 7) {
        trend = -1;
        downtrendLow = null;
        rallyAttemptStarted = false;
        rallyAttemptDays = -2;
        if (trendArr.length) {
          trendArr[trendArr.length -1].endDate = data[i].Date;
          trendArr[trendArr.length -1].trendEnd = data[i].Close;
        }
        trendArr.push({
          trend: DOWNTREND,
          startDate: data[i+1].Date,
          endDate: "",
          trendStart: data[i+1].Close,
          trendEnd: 0,
          trendId: -1
        });
        console.log("downtrend from", data[i+1].Date);
      }
    } else if (trend === -1) {
      // will try ralley attempt and may go to follow through day
      // further trend possiblity (1, 0.5)

      // rallyattempt
      if (rallyAttemptStarted) {
        if (rallyAttemptDays === 0) {
          trend = 0.5;
          if (trendArr.length) {
            trendArr[trendArr.length -1].endDate = data[i].Date;
            trendArr[trendArr.length-1].trendEnd = data[i].Close;
          }
          trendArr.push({
            trend: RALLY_ATTEMPT,
            startDate: data[i+1].Date,
            endDate: "",
            trendStart: data[i+1].Close,
            trendEnd: 0,
            trendId: 0.5
          });
          console.log("rally attempt started from", data[i+1].Date);
        } else {
          rallyAttemptDays++;
        }
      } else {
        if (!downtrendLow) {
          downtrendLow = parseFloat(data[i].Close);
        } else {
          downtrendLow = parseFloat(data[i].Close) < downtrendLow ? parseFloat(data[i].Close) : downtrendLow;
        }

        if (parseFloat(data[i].Close) > downtrendLow) {
          rallyAttemptStarted = true;
        }
      }

      // uptrend possiblity
      if (parseFloat(data[i].Close) > prevUptrendHigh) {
        trend = 1;
        prevUptrendHigh = 0;
        counter = 0;
        days = 0;
        lower = i;
        if (trendArr.length) {
          trendArr[trendArr.length -1].endDate = data[i].Date;
          trendArr[trendArr.length -1].trendEnd = data[i].Close;
        }
        trendArr.push({
          trend: UPTREND,
          startDate: data[i+1].Date,
          endDate: "",
          trendStart: data[i+1].Close,
          trendEnd: 0
        });
        console.log("uptrend from", data[i+1].Date);
      }
    } else  if (trend === 0.5) {
      // may go to uptrend or back to downtrend
      // further trend possiblity (1 or -1)

      // uptrend possiblity (follow through day)
      let prcnt = 100 * (parseFloat(data[i].Close) - parseFloat(data[i-1]?.Close))/parseFloat(data[i-1]?.Close);
      if (prcnt >= 1.5 && data[i].Volume > data[i-1].Volume) {
        trend = 1;
        prevUptrendHigh = 0;
        counter = 0;
        days = 0;
        lower = i;
        if (trendArr.length) {
          trendArr[trendArr.length -1].endDate = data[i].Date;
          trendArr[trendArr.length -1].trendEnd = data[i].Close;
        }
        trendArr.push({
          trend: UPTREND,
          startDate: data[i+1].Date,
          endDate: "",
          trendStart: data[i+1].Close,
          trendEnd: 0,
          trendId: 1
        });
        console.log("uptrend from", data[i+1].Date);
      }

      // downtrend possiblity if rally attempt fails.
      if (parseFloat(data[i].Close) < downtrendLow) {
        // rally attempt breaks.
        trend = -1;
        downtrendLow = null;
        rallyAttemptDays = -2;
        rallyAttemptStarted = false;
        if (trendArr.length) {
          trendArr[trendArr.length -1].endDate = data[i].Date;
          trendArr[trendArr.length -1].trendEnd = data[i].Close;
        }
        trendArr.push({
          trend: DOWNTREND,
          startDate: data[i+1].Date,
          endDate: "",
          trendStart: data[i+1].Close,
          trendEnd: 0,
          trendId: -1
        });
        console.log("downtrend from ", data[i+1].Date);
      }
    }

      if (days === 28) {
        days = 27;
        if (trend === 0 || trend === 1)
        if (dates.includes(data[lower].Date)) {
          counter--; 
        }
        lower++;
        if (counter === 0) {
          trend = 1;
          prevUptrendHigh = 0;
          counter = 0;
          days = 0;
          lower = i;
          if (trendArr.length) {
            trendArr[trendArr.length -1].endDate = data[i].Date;
            trendArr[trendArr.length -1].trendEnd = data[i].Close;
          }
          trendArr.push({
            trend: UPTREND,
            startDate: data[i+1].Date,
            endDate: "",
            trendStart: data[i+1].Close,
            trendEnd: 0,
            trendId: 1
          });
          console.log("uptrend from", data[i+1].Date);
        }
      }
  }

  if (trendArr.length) {
    trendArr[trendArr.length -1].endDate = data[data.length-1].Date;
    trendArr[trendArr.length-1].trendEnd = data[data.length -1].Close;
  }

  return trendArr;
}

export default generalMarketTrend;