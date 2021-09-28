import React, { useState } from "react";
import "./App.css";

function App() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState("");

  function reverseStr(str) {
    let listOfChars = str.split("");
    let reverseListOfChars = listOfChars.reverse();
    let reversedStr = reverseListOfChars.join("");
    return reversedStr;
  }

  function isPalindrome(str) {
    let reverse = reverseStr(str);
    return str === reverse;
  }

  function convertDateToStr(date) {
    let dateStr = { day: "", month: "", year: "" };

    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
  }

  function getAllDateFormats(date) {
    const dateStr = convertDateToStr(date);

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }

  function checkPalindromeForAllDateFormats(date) {
    const listOfPalindromes = getAllDateFormats(date);

    let flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
      if (isPalindrome(listOfPalindromes[i])) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }

  function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day,
      month: month,
      year: year,
    };
  }

  function getNextPalindromeDate(date) {
    let ctrNextDate = 0;
    let nextDate = getNextDate(date);

    while (1) {
      ctrNextDate++;
      let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctrNextDate, nextDate];
  }

  function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
      month--;

      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }

    return {
      day: day,
      month: month,
      year: year,
    };
  }

  function getPreviousPalindromeDate(date) {
    let previousDate = getPreviousDate(date);
    let ctrPreviousDate = 0;

    while (1) {
      ctrPreviousDate++;
      let isPalindrome = checkPalindromeForAllDateFormats(previousDate);
      if (isPalindrome) {
        break;
      }
      previousDate = getPreviousDate(previousDate);
    }
    return [ctrPreviousDate, previousDate];
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!birthdate) {
      return;
    }

    const listOfDate = birthdate.split("-");

    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    const isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      setResult("This birthday IS a PALLINDROME!!!");
    } else {
      const [ctrNextDate, nextDate] = getNextPalindromeDate(date);
      const [ctrPreviousDate, previousDate] = getPreviousPalindromeDate(date);

      let resultStr = "Your birthday is not a pallindrome :( \n";

      if (ctrNextDate < ctrPreviousDate) {
        resultStr += `The nearest pallindrome was ${ctrPreviousDate} days ago, on ${previousDate.day}/${previousDate.month}/${previousDate.year}`;
        setResult(resultStr);
      } else {
        resultStr += `The nearest pallindrome will be after ${ctrNextDate} days, on ${nextDate.day}/${nextDate.month}/${nextDate.year}`;
        setResult(resultStr);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Pallindrome Birthday</h1>
      </header>
      <main>
        <form>
          <label htmlFor="birthdate">Enter your birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <button onClick={handleSubmit}>Check</button>
        </form>
        {result && <p>{result}</p>}
      </main>
      <footer>
        Create with love by <a href="https://atulgairola.tech">Atul Gairola</a>
      </footer>
    </div>
  );
}

export default App;
