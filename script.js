const scriptURL = "https://script.google.com/macros/s/AKfycby6M80r3EJzndf8LwFqm-0QXbLQeKBV4KgulAzlFA2HzCDsT5UF2euy--SeEinDQOnM_Q/exec";

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

loadGifts();
