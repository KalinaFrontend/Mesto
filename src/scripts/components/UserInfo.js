//Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = nameSelector;
        this._job = jobSelector;
    }


    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
      const userInfoData = {
        name: this._name.textContent,
        job: this._job.textContent
      }
      return userInfoData;
    }


    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo({name, job}) {
        this._name.textContent = name;
        this._job.textContent = job;
          }
    }
