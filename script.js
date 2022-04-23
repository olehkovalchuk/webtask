const navItem = document.querySelectorAll(".nav-link");
const formBtn = document.querySelector(".submit-form");
const formInput = document.querySelector(".form-input");
const fanForm = document.querySelector("form.new-message");
const errorBlock = document.querySelector(".error-message");
let currentPage = location.pathname.split('/')[1];

// fan Page
if (currentPage == "fans.html"){
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (formInput.value.trim()){
      sendMessage(formInput.value);
      hideError();
      fanForm.reset();
    }else{
      showError();
    }
  })
  function sendMessage (message){
    let messageElem = document.querySelector(".all-messages");
    let author = "Unknown Author"
    let date = new Date().toLocaleString().split(',')[0];
    let time = new Date().toLocaleString().split(',')[1];
    let templateMessage = `<div class="message">
                            <div class="message-text">
                                <p>${message}</p>
                            </div>
                            <div class="message-info d-flex justify-content-between">
                                <div class="date">
                                    <h6>${date}<br>
                                        <span>${time}</span>
                                    </h6>
                                </div>
                                <div class="fan-name">
                                    <h3>${author}</h3>
                                </div>
                            </div>
                          </div>`;
    messageElem.innerHTML += templateMessage
  }
  function showError(){
    formInput.classList.add("error")
    errorBlock.style.display = "block"
  }
  function hideError(){
    formInput.classList.remove("error")
    errorBlock.style.display = "none"
  }
}

//admin

if (currentPage == "admin.html"){
  let newsForm = document.querySelector(".upload-news-form")
  let previewImg = document.querySelector('.preview-img');
  let imgInput = document.querySelector(".image")
  let imgBtn = document.querySelector(".submit-news")
  let fields = document.querySelectorAll(".validation-field")
  let isFormValid = false

  imgInput.addEventListener("change", (e) => {
    rootImg = URL.createObjectURL(e.target.files[0]);
    previewImg.setAttribute("src", rootImg)
  })
  imgBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (isFormValid){
      showSuccesMessage()
      isFormValid = false
      fields.forEach((item) => {
        item.setAttribute("isvalid", false)
      })
    }else{
      fields.forEach((item) => {
        if (!item.value){
          item.classList.add('error')
          item.setAttribute("isvalid", false)
        }
      })
    }
  })

  fields.forEach((item) => {
    item.addEventListener("input", (e) => {
      if (!e.target.value.trim()){
        item.classList.add('error')
        item.setAttribute("isvalid", false)
      }else{
        item.classList.remove('error')
        item.setAttribute("isvalid", true)
      }
      isValid()
    })
  })
  
  function isValid (){
    validArr = [false, false, false]
    fields.forEach((item, i) => {
      if (item.getAttribute("isvalid") == "true"){
        validArr[i] = true
      }
      if (validArr.every((i) => i == true)){
        isFormValid = true
      }
    })
  }
  function showSuccesMessage (){
    const message = newsForm.querySelector("h3")
    message.style.display = "block"
    setTimeout(() => {
      message.style.display = "none"
      previewImg.setAttribute("src", "img/no_img.jpg")
      newsForm.reset()
    }, 2000) 
  }
}
