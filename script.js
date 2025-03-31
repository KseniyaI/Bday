// URL вашего развернутого Google Apps Script (замените YOUR_DEPLOYMENT_ID и YOUR_SPREADSHEET_ID)
const appsScriptURL = "https://script.google.com/macros/s/AKfycby6M80r3EJzndf8LwFqm-0QXbLQeKBV4KgulAzlFA2HzCDsT5UF2euy--SeEinDQOnM_Q/exec";

// Загрузка данных из Google Таблицы(GET-запрос)
function loadGifts() {
	fetch(appsScriptURL + "?action=getGifts")
		.then(response => response.json())
		.then(data => renderCards(data))
		.catch(error => console.error("Ошибка загрузки данных:", error));
}

// Функция для отрисовки таблицы на основе полученных данных
/* function renderTable(gifts) {
	const tbody = document.getElementById("gift-tbody");
	tbody.innerHTML = "";

	gifts.forEach((gift, index) => {
		// Если поле "Название подарка" пустое, пропускаем строку
		if (!gift.title || gift.title.trim() === "")
			return;

		const tr = document.createElement("tr");
		tr.dataset.index = index;

		// Чекбокс
		const tdCheckbox = document.createElement("td");
		if (gift.title !== '.') {
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.className = "gift-checkbox";
			checkbox.checked = gift.reserved;
			if (gift.reserved) tr.classList.add("selected");


			// При изменении состояния чекбокса отправляем POST-запрос для обновления
			checkbox.addEventListener("change", function () {
				if (this.checked) {
					tr.classList.add("selected");
				} else {
					tr.classList.remove("selected");
				}
				updateGift(index, this.checked);
			});
			tdCheckbox.appendChild(checkbox);
		}
		tr.appendChild(tdCheckbox);

		// Название подарка
		const tdTitle = document.createElement("td");
		tdTitle.textContent = gift.title;
		tr.appendChild(tdTitle);

		// Описание
		const tdDesc = document.createElement("td");
		tdDesc.textContent = gift.description;
		tr.appendChild(tdDesc);

		const tdLink = document.createElement("td");
		if (gift.link && gift.link.trim() !== "") {
			// Разбиваем строку на ссылки по запятым, точкам с запятой или переводам строки
			const links = gift.link.split(/[,;\n]+/).map(link => link.trim()).filter(link => link !== "");

			links.forEach((url, index) => {
				const a = document.createElement("a");
				a.href = url;
				a.target = "_blank";
				a.textContent = "Подробнее";
				tdLink.appendChild(a);

				// Если ссылка не последняя, добавляем перевод строки
				if (index < links.length - 1) {
					tdLink.appendChild(document.createElement("br"));
				}
			});
		} else {
			tdLink.textContent = ""; // или можно написать "нет ссылки"
		}
		tr.appendChild(tdLink);


		tbody.appendChild(tr);
	});
} */

// Функция отрисовки карточек
function renderCards(gifts) {
	const container = document.getElementById("cards-container");
	container.innerHTML = "";

	gifts.forEach((gift, index) => {
		// Пропускаем строки без названия
		if (!gift.title || gift.title.trim() === "") return;

		// Создаем карточку
		const card = document.createElement("div");
		card.classList.add("card");
		card.dataset.index = index;

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.classList.add("card-checkbox");
		checkbox.checked = gift.reserved;
		if (gift.reserved) card.classList.add("selected");

		checkbox.addEventListener("change", function () {
			if (this.checked) {
				card.classList.add("selected");
			} else {
				card.classList.remove("selected");
			}
			updateGift(index, this.checked);
		});
		card.appendChild(checkbox);

		// Заголовок карточки
		const titleEl = document.createElement("h2");
		titleEl.textContent = gift.title;
		card.appendChild(titleEl);

		// Описание подарка
		const descEl = document.createElement("p");
		descEl.textContent = gift.description;
		card.appendChild(descEl);

		// Блок для ссылок "Подробнее"
		const linksBlock = document.createElement("div");
		if (gift.link && gift.link.trim() !== "") {
			// Разбиваем строку на отдельные ссылки (по запятым, точкам с запятой или переводу строки)
			const links = gift.link.split(/[,;\n]+/).map(link => link.trim()).filter(link => link !== "");
			links.forEach((url, i) => {
				const a = document.createElement("a");
				a.href = url;
				a.target = "_blank";
				a.textContent = "Ссылка " + (i + 1);
				linksBlock.appendChild(a);
				// Каждая ссылка на новой строке
				if (i < links.length - 1) {
					linksBlock.appendChild(document.createElement("br"));
				}
			});
		} else {
			linksBlock.textContent = ""; // Можно указать "нет ссылки", если нужно
		}
		card.appendChild(linksBlock);

		container.appendChild(card);
	});
}

// Функция для отправки обновления (POST-запрос)
function updateGift(giftIndex, reserved) {
	fetch(appsScriptURL, {
		method: "POST",
		mode: "no-cors", // режим no-cors для обхода ограничений, ответ будет opaque
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ giftIndex: giftIndex, reserved: reserved })
	})
		.then(() => console.log("Данные обновлены"))
		.catch(err => console.error("Ошибка обновления:", err));
}

// Запуск загрузки данных после загрузки DOM
document.addEventListener("DOMContentLoaded", loadGifts);
