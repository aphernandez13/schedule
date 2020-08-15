let workerHours = {
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

$(document).ready(function () {
  if (!localStorage.getItem("workerHours")) {
    updateCalendarTasks(workerHours);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem("workerHours")));
  }
});

var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleString();

let counter = 1;
for (const property in workerHours) {
  let textEntry = "#text-" + counter;
  $(textEntry).text(workerHours[property]);
  let timeId = "#time" + counter;
  let presentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);
  if (timeNumber < presentHour) {
    $(textEntry).addClass("past-hour");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future-hour");
  } else {
    $(textEntry).addClass("present-hour");
  }
  counter++;
}

$("button").click(function () {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();

  saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString) {
  switch (hourString) {
    case "9 AM":
      return 9;
    case "10 AM":
      return 10;
    case "11 AM":
      return 11;
    case "12 PM":
      return 12;
    case "1 PM":
      return 13;
    case "2 PM":
      return 14;
    case "3 PM":
      return 15;
    case "4 PM":
      return 16;
    case "5 PM":
      return 17;
  }
}

function loadCorrectDataset() {
  result = localStorage.getItem("workerHours");
  return result ? result : workerHours;
}

function initializeLocalStorage() {
  localStorage.setItem("workerHours", JSON.stringify(workerHours));
}

function saveToLocalStorage(dayObj) {
  localStorage.setItem("workerHours", JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
  if (!localStorage.getItem("workerHours")) {
    initializeLocalStorage();
  }

  let workHours = JSON.parse(localStorage.getItem("workerHours"));
  workHours[hourString] = val;

  saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
  $(".calendar-row").each(function (index) {
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  });
}
