// Функция, которая будет вызвана после загрузки данных из таблицы
function processData(data) {
	console.log("Полученные данные:", data);
	displayGifts(data);
  }
  
  // Функция для загрузки данных из Google Таблицы через Tabletop.js
  function init() {
	Tabletop.init({
	  key: '1mCgAwH398wqCJ6Ge-N9L44VV1X97vteHGc8pwhc-Tdw', // Замените на идентификатор вашей таблицы
	  
	  callback: processData,
	  simpleSheet: true
	});
  }
  
  // Функция для отображения подарков на странице
  function displayGifts(data) {
	const giftList = document.getElementById('gift-list');
	giftList.innerHTML = '';
	// Предполагается, что в таблице колонки: "Название подарка", "описание", "ссылка"
	data.forEach(function(gift) {
	  const li = document.createElement('li');
	  li.innerHTML = `<strong>${gift["Название подарка"]}</strong>: ${gift["описание"]} <a href="${gift["ссылка"]}" target="_blank">Подробнее</a>`;
	  giftList.appendChild(li);
	});
  }
  
  document.addEventListener('DOMContentLoaded', init);
  