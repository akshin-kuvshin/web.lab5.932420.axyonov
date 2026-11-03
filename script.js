// criterias
const longRouteCriteria = 100;
const shortRouteCriteria = 30;
const bigTotalDistanceCriteria = 500;

function findMaxDistance(distances) {
    let maxDistance = distances[0];
    for (let i = 0; i < distances.length; ++i)
        if (maxDistance < distances[i])
            maxDistance = distances[i];
    return maxDistance;
}

function filterLongRoutes(distances) {
    const longRoutes = [];
    for (let i = 0; i < distances.length; ++i)
        if (distances[i] > longRouteCriteria)
            longRoutes.push(distances[i]);
    return longRoutes;
}

function calculateTotalDistance(distances) {
    let totalDistance = 0;
    for (let i = 0; i < distances.length; ++i)
        totalDistance += distances[i];
    return totalDistance;
}

// returns pair [count, totalDistance]
function shortRoutesProcessing(distances) {
    let shortRoutesCount = 0;
    let shortRoutesTotalDistance = 0;
    for (let i = 0; i < distances.length; ++i)
        if (distances[i] <= shortRouteCriteria) {
            ++shortRoutesCount;
            shortRoutesTotalDistance += distances[i];
        }
    return [shortRoutesCount, shortRoutesTotalDistance];
}

function saveSkills(skillsList) {
    const skills = [];

    const skillsListItems = skillsList.querySelectorAll(".editable-skills-list-item");
    for (const skillsListItem of skillsListItems)
        skills.push(skillsListItem.firstChild.textContent);

    localStorage.setItem("skills", JSON.stringify(skills));
}

function createSkillElement(skill, skillsList) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "editable-skills-list-item-delete";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => {
        listItem.remove();
        saveSkills(skillsList);
    });

    const listItem = document.createElement("li");
    listItem.className = "editable-skills-list-item";
    listItem.appendChild(document.createTextNode(skill));
    listItem.appendChild(deleteButton);
    return listItem;
}

function main() {
    let userName = prompt("Введите ваше имя:");

    // invalid userName case processing
    if (userName === null || userName.trim() === "") {
        userName = "Путешественник";
    }



    const distances = [25, 140, 75, 220, 15, 90];

    const maxDistance = findMaxDistance(distances);
    const totalDistance = calculateTotalDistance(distances);

    const longRoutes = filterLongRoutes(distances);
    const longRoutesTotalDistance = calculateTotalDistance(longRoutes);

    const [shortRoutesCount, shortRoutesTotalDistance] = shortRoutesProcessing(distances);



    alert(
        "Здравствуйте, " + userName + "!\n" +
        "Ваш маршрут длиной " + totalDistance + " км, " +
        "из них " + longRoutesTotalDistance + " км - длинные перегоны."
    );

    console.log("Самый длинный перегон: " + maxDistance + " км."); // wasn't in ToR
    console.log("Количество коротких перегонов (<= " + shortRouteCriteria + " км): " + shortRoutesCount + ".");
    console.log("Общая длина коротких перегонов: " + shortRoutesTotalDistance + " км.");

    if (totalDistance > bigTotalDistanceCriteria)
        console.log("Рекомендуется разбить маршрут на 2-3 дня.");





    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark")
        document.body.classList.add("dark-theme");

    const themeToggler = document.getElementById("theme-toggler");
    if (themeToggler)
        themeToggler.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const isDarkTheme = document.body.classList.contains("dark-theme");
            localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
        });
    else
        console.error("Элемент не найден: #theme-toggler.");



    const skillsList = document.getElementById("editable-skills-list");
    const addSkillButton = document.getElementById("add-editable-skill");
    const clearSkillsButton = document.getElementById("clear-editable-skills");
    const hideSkillsButton = document.getElementById("hide-editable-skills");

    if (!skillsList)
        console.error("Элемент не найден: #editable-skills-list.");
    else if (!addSkillButton)
        console.error("Элемент не найден: #add-editable-skill.");
    else if (!clearSkillsButton)
        console.error("Элемент не найден: #clear-editable-skills.");
    else if (!hideSkillsButton)
        console.error("Элемент не найден: #hide-editable-skills.");
    else {
        addSkillButton.addEventListener("click", () => {
            const skill = prompt("Введите новый навык:").trim();
            if (skill === null || skill === "")
                return;

            skillsList.appendChild(createSkillElement(skill));
            saveSkills(skillsList);
        });

        clearSkillsButton.addEventListener("click", () => {
            const skillsListItems = skillsList.querySelectorAll(".editable-skills-list-item");
            if (skillsListItems.length === 0) {
                alert("Навыки уже удалены.");
                return;
            }

            for (const skillsListItem of skillsListItems)
                skillsListItem.remove();
            saveSkills(skillsList);
        });

        hideSkillsButton.addEventListener("click", () => {
            skillsList.classList.toggle("invisible");

            const isHidden = skillsList.classList.contains("invisible");
            hideSkillsButton.textContent = (isHidden
                ? "Показать"
                : "Скрыть") + " список навыков";
            hideSkillsButton.classList.toggle("kolya");

            localStorage.setItem("isHidden", String(isHidden));
        });

        const savedSkills = JSON.parse(localStorage.getItem("skills") || "[]");
        for (const skill of savedSkills)
            skillsList.appendChild(createSkillElement(skill, skillsList));

        const isHidden = (localStorage.getItem("isHidden") || "true") === "true";
        if (isHidden) {
            skillsList.classList.add("invisible");
            hideSkillsButton.textContent = "Показать список навыков";
            hideSkillsButton.classList.add("kolya");
        }
    }
}

main()
