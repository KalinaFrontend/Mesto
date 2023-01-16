export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._name = nameSelector;
        this._job = jobSelector;
        this._avatar = avatarSelector
    }

    getUserInfo() {
      const userInfoData = {
        name: this._name.textContent,
        about: this._job.textContent
      }
      return userInfoData;
    }

    getUserId() {
      return this._id
    }

    setAvatar(data) {
      this._avatar.setAttribute('src', data.avatar);
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name.textContent = name;
        this._job.textContent = about;
        this._avatar.setAttribute('src', avatar);
        this._id = _id;
        }
    }
