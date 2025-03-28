// Функция, которая будет вызвана из ответа JSONP и получит данные
function processGifts(data) {
	console.log("Полученные данные:", data);
	displayGifts(data);
  }
  
  // Функция для загрузки данных через JSONP
  function loadGifts() {
	// Добавляем параметр callback для JSONP
	const url = "https://script.google.com/macros/s/AKfycby6M80r3EJzndf8LwFqm-0QXbLQeKBV4KgulAzlFA2HzCDsT5UF2euy--SeEinDQOnM_Q/exec?action=getGifts&callback=processGifts";
	const script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
  }
  
  // Функция для отображения подарков на странице
  function displayGifts(data) {
	const giftList = document.getElementById("gift-list");
	giftList.innerHTML = "";
	// Предполагается, что data — массив, где каждый элемент выглядит как [Название, Описание, Ссылка, Статус]
	data.forEach(gift => {
	  const li = document.createElement("li");
	  li.innerHTML = `<strong>${gift[0]}</strong>: ${gift[1]} <a href="${gift[2]}" target="_blank">Подробнее</a>`;
	  giftList.appendChild(li);
	});
  }
  
  // Запускаем загрузку подарков после полной загрузки DOM
  document.addEventListener("DOMContentLoaded", loadGifts);
  