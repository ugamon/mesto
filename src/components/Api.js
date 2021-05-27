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

  _bodyReq(urlPath, method, body, successCallback, errorCallback) {
    this._requestOptions(urlPath, method);

    return fetch(this._apiUrl, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => this._requestWrapper(res, successCallback, errorCallback));
  }

  _uriReq(urlPath, method, successCallback, errorCallback) {
    this._requestOptions(urlPath, method);
    return fetch(this._apiUrl, {
      method: this._method,
      headers: this._headers,
    }).then((res) => this._requestWrapper(res, successCallback, errorCallback));
  }

  _requestWrapper(res, successCallback, errorCallback) {
    if (res.ok) {
      return successCallback(res);
    } else {
      return errorCallback(res);
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
    return this._uriReq(
      "users/me",
      "GET",
      this._successHandler,
      this._errorHandler
    );
  }

  getCardList() {
    return this._uriReq(
      "cards",
      "GET",
      this._successHandler,
      this._errorHandler
    );
  }

  updateAvatar(link) {
    return this._bodyReq(
      "users/me/avatar",
      "PATCH",
      { avatar: link },
      this._successHandler,
      this._errorHandler
    );
  }

  updateProfile(name, about) {
    return this._bodyReq(
      "users/me",
      "PATCH",
      { name: name, about: about },
      this._successHandler,
      this._errorHandler
    );
  }

  addCard(name, link) {
    return this._bodyReq(
      "cards",
      "POST",
      { name: name, link: link },
      this._successHandler,
      this._errorHandler
    );
  }

  deleteCard(id) {
    return this._uriReq(
      `cards/${id}`,
      "DELETE",
      this._successHandler,
      this._errorHandler
    );
  }
}
