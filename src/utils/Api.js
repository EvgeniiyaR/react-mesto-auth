class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	editUserInfo(name, about) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ name, about })
		}).then((res) => this._checkResponse(res));
	}

	editUserAvatar(avatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar })
		}).then((res) => this._checkResponse(res));
	}

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			method: "GET",
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	addNewCard(name, link) {
		return fetch(`${this._url}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ name, link })
		}).then((res) => this._checkResponse(res));
	}

	deleteCard(id) {
		return fetch(`${this._url}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	addLikeCard(id) {
		return fetch(`${this._url}/cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	deleteLikeCard(id) {
		return fetch(`${this._url}/cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}
}

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '2ac7f567-442d-413f-8934-d4f44e2290b8',
    'Content-Type': 'application/json'
  }
});

export default api;