// const token = "41b03801-bc4d-4d5f-8372-684b2b7fdbc5";
// const groupId = "cohort-24";

class RestfullClient {
  constructor(options) {
    this._options = options;
  }

  _requestOptions(urlPath, method) {
    this._apiUrl = `${this._options.baseUrl}/${urlPath}`;
    this._headers = this._options.headers;
    this._method = method;
  }

  _bodyReq(urlPath, method, body) {
    this._requestOptions(urlPath, method);

    return fetch(this._apiUrl, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => this._requestWrapper(res));
  }

  _uriReq(urlPath, method) {
    this._requestOptions(urlPath, method);
    return fetch(this._apiUrl, {
      method: this._method,
      headers: this._headers,
    }).then((res) => this._requestWrapper(res));
  }

  _requestWrapper(res) {
    if (res.ok) {
      return this._successHandler(res);
    } else {
      return this._errorHandler(res);
    }
  }

  _successHandler(res) {
    const result = res.clone().json();
    console.log(result);
    return result;
  }

  _errorHandler(err) {
    console.log(err);
    return Promise.reject(`Error: ${err.status}`);
  }
}

export default class Api extends RestfullClient {
  constructor(options) {
    super(options);
  }

  getUserInfo() {
    return this._uriReq("users/me", "GET");
  }

  getCardList() {
    return this._uriReq("cards", "GET");
  }

  updateAvatar(link) {
    return this._bodyReq("users/me/avatar", "PATCH", { avatar: link });
  }

  updateProfile(name, about) {
    return this._bodyReq("users/me", "PATCH", { name: name, about: about });
  }

  addCard(name, link) {
    return this._bodyReq("cards", "POST", { name: name, link: link });
  }

  deleteCard(cardId) {
    return this._uriReq(`cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._uriReq(`cards/likes/${cardId}`, "PUT");
  }

  deleteLike(cardId) {
    return this._uriReq(`cards/likes/${cardId}`, "DELETE");
  }
}
