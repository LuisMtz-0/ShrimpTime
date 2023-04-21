$(function () {

  let editBtn = document.querySelectorAll("button");
  let divData = document.querySelectorAll("div[id]")
  // This will retrieve the storage data and parse if the page has one otherwise it will just provide and empty array
  let storage = localStorage.getItem('storageData') ? JSON.parse(localStorage.getItem('storageData')) : []
  // console.log(storage)
  addingData()
// This function is in charged of adding all the localStorage data to its respective id and adding its class by time
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
// Even listener for each Btn in the document and which ever is clicked it will run the event function to add the 'readOnly' class or remove it if it has one
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
// This function is on charge of add the data to local storage
    function localAdd(textArea, parentId) {
      // This will cycle through each each element in in 'storage' to check if there is already and item with the same id and will replace it
      storage.forEach((e, i) => {
        // console.log(`${i}: ${e.parentId}`)
        storage = storage.filter(parent => parent.parentId != parentId)
        return storage
      })

      storage.push({ parentId, textArea })
      localStorage.setItem('storageData', JSON.stringify(storage))

    }
  });
  // This will get the time giving it the format
  let newDate = dayjs().format('hh:mm  MM/DD/YY');
  let timerEl = document.getElementById("timerEl")

  timerEl.innerText = newDate;
});
