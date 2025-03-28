function loadGifts() {
    const url = "https://script.google.com/macros/s/AKfycby6M80r3EJzndf8LwFqm-0QXbLQeKBV4KgulAzlFA2HzCDsT5UF2euy--SeEinDQOnM_Q/exec?action=getGifts";
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
			console.log("Полученные данные:", data); // Добавьте эту строку для проверки
            // Обрабатываем данные
            console.log(data);
            // Отображаем подарки на странице
            displayGifts(data);
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
        });
}

function displayGifts(data) {
    // Находим элемент списка по его идентификатору
    const giftList = document.getElementById("gift-list");
    // Очищаем содержимое списка на случай, если функция вызывается повторно
    giftList.innerHTML = "";

    // Перебираем полученные данные. Предполагается, что каждый элемент массива — это массив с данными подарка:
    // [Название, Описание, Ссылка, Статус]
    data.forEach(gift => {
        // Создаем элемент списка для каждого подарка
        const li = document.createElement("li");
        
        // Формируем HTML-разметку. Например, выводим название, описание и ссылку на подарок
        li.innerHTML = `<strong>${gift[0]}</strong>: ${gift[1]} <a href="${gift[2]}" target="_blank">Подробнее</a>`;
        
        // Если статус подарка (например, "забронирован") нужно как-то обозначить, можно добавить проверку:
        // if (gift[3] && gift[3] === "забронирован") { ... }

        // Добавляем сформированный элемент в список
        giftList.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", loadGifts);



/* const scriptURL = "https://script.google.com/macros/s/AKfycbwyTXmqPfTdTZYjqm34zJST2S6whGiIM2jV3Bzf5KcH/dev";

async function loadGifts() {
    let response = await fetch(scriptURL + "?action=getGifts");
    let gifts = await response.json();
    let list = document.getElementById("gift-list");
    list.innerHTML = "";

    gifts.forEach(([name, description, link, status]) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${name}</strong> - ${description} <br> <a href="${link}" target="_blank">Ссылка</a>`;

        if (status === "уже забронировано") {
            li.innerHTML += " <span style='color: red;'>Уже забронировано</span>";
        } else {
            let button = document.createElement("button");
            button.textContent = "Забронировать";
            button.onclick = () => reserveGift(name);
            li.appendChild(button);
        }
        list.appendChild(li);
    });
}

async function reserveGift(gift) {
    let response = await fetch(scriptURL + "?action=reserveGift&gift=" + encodeURIComponent(gift));
    let result = await response.text();
    alert(result);
    loadGifts();  // Обновляем список
}

loadGifts(); */
