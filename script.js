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
    console.log("Количество коротких перегонов (<= " + shortRouteCriteria + " км): " + shortRoutesCount + '.');
    console.log("Общая длина коротких перегонов: " + shortRoutesTotalDistance + " км.");

    if (totalDistance > bigTotalDistanceCriteria)
        console.log("Рекомендуется разбить маршрут на 2-3 дня.");
}

main()
