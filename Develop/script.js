// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements

// const dayjs = require("dayjs");

// in the html.
$(function () {

  let editBtn = document.querySelectorAll("button");
  let divData = document.querySelectorAll("div[id]")
  let storage = localStorage.getItem('storageData') ? JSON.parse(localStorage.getItem('storageData')) : []
  // console.log(storage)
  addingData()

  function addingData() {
    divData.forEach((divData) => {
      let time = divData.getAttribute("num")
      let indexId = divData.id
      let textEl = divData.querySelector("textarea");
      let hourEl = dayjs().format('HH')

      // This function will add a color to each section to represent wether its in the past, present, or future
      if(hourEl == time){
        divData.classList.add("present")
      }else if(hourEl > time){
        divData.classList.add("past")
      }else {
        divData.classList.add("future")
      }

      // This function is in charge of inserting the text data for each hour 
      storage.forEach((element, index) => {
        if (element.parentId == indexId) {
          textEl.innerText = element.textArea
        }
      })
    })
  }

  editBtn.forEach(editBtn => {
    editBtn.addEventListener('click', (event) => {
      let parentId = event.target.parentElement.id
      let textEl = document.getElementById(parentId).querySelector("textarea")
      let textArea = textEl.value
      // let indexId = parentId.slice

      if (textEl.hasAttribute('readOnly')) {
        textEl.removeAttribute('readOnly')
        // console.log('removed')
      } else {
        textEl.setAttribute('readOnly', '')
        // console.log('added')
        localAdd(textArea, parentId)
      }

    })

    function localAdd(textArea, parentId) {
      storage.forEach((e, i) => {
        // console.log(`${i}: ${e.parentId}`)
        storage = storage.filter(parent => parent.parentId != parentId)
        return storage
      })

      storage.push({ parentId, textArea })
      localStorage.setItem('storageData', JSON.stringify(storage))

    }
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let newDate = dayjs().format('hh:mm  MM/DD/YY');
  let timerEl = document.getElementById("timerEl")

  timerEl.innerText = newDate;
});
