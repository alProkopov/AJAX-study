//Получить пользователей (users) от сервера https://jsonplaceholder.typicode.com. Получив ответ от сервера вывести имена пользователей на страницу. При клике на имя пользователя в произвольном месте должна появиться подробная информация о нем. Для визуальной части можно использовать bootstrap или другие фреймворки.
// Создать форму добавления пользователя состоящая из полей name, email, username, phone, website при сабмите формы сделать POST запрос на сервер после ответа от сервера добавлять полученного пользователя на страницу.

//запрос, получение результата с сервера
//UI
let userList = document.querySelector('.list-group');

//events
getUsersHttp(onGetUsersCallback)
userList.addEventListener('click', userClickHandler)

//этап 1, формирование списка имён
function getUsersHttp(callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://jsonplaceholder.typicode.com/users')
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        callback(response)
        // console.log(response)
    })

    xhr.send()
}

function onGetUsersCallback(users) {
    if (!users.length) {
        return
    }
    renderUsersList(users)
}

function renderUsersList(users) {
    const fragment = users.reduce(
        (acc, user) => acc + userListTemplate(user),
        ''
        
    );
    // console.log(fragment)
    userList.insertAdjacentHTML('afterbegin', fragment)
}

function userListTemplate(user) {
    return `<button type="button" class='list-group-item list-group-item-action' data-user-id = ${user.id}>${user.name}</button>`
    
}


//этап 2, функции клика по имени
const infoAboutUser =  document.querySelector('.user-info')
console.log(infoAboutUser)

function userClickHandler(e){
    e.preventDefault();
    if (e.target.dataset.userId){
        getUserInfoHttp(e.target.dataset.userId, onGetUserInfoCallback);
    }
}

function getUserInfoHttp (id, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', `https://jsonplaceholder.typicode.com/users/${id}`)
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        callback(response)
        // console.log(response)
    })

    xhr.send()
}

function onGetUserInfoCallback (user) {
    if (!user.id) {
        console.log('user not found')
        return
    }
    renderUserInfoList(user)
}

function renderUserInfoList(user) {
    infoAboutUser.innerHTML =''
    const template = userInfoTemplate(user)
    infoAboutUser.insertAdjacentHTML('afterbegin', template)

}

function userInfoTemplate(user){
    return `
    <div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-header bg-transparent border-success">id: ${user.id}</div>
  <div class="card-body text-success">
    <h5 class="card-title">${user.name}</h5>
    
  </div>
  <div class="card-footer bg-transparent border-success">${user.email}</div>
</div>
    `
}