// const token = "41b03801-bc4d-4d5f-8372-684b2b7fdbc5";
// const groupId = "cohort-24";

export default class Api {
  constructor(options) {
    this._options = options;
  }

  _requestGet(urlPath, method) {
    const { baseUrl, headers } = this._options;
    return fetch(`${baseUrl}/${urlPath}`, {
      method: method,
      headers: headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  getUserInfo() {
    return this._requestGet("users/me", "GET");
  }

  getCardList() {
    return this._requestGet("cards", "GET");
  }
}
