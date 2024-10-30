const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", searchUsingFetchAsyncAwait);
const cityName = document.getElementById("city-name");
// const numberOfPeople = document.getElementById("numberOfPeople");
const eventName = document.getElementById("eventType");
const activities = [
  "Bowling",
  "Escape Room",
  "Padel",
  "Football",
  "Board Games Cafe",
  "Billiardo",
  "Table Tennis",
  "Karting",
  "Cinema",
  "Lounge",
  "Cafe",
  "Arcade",
  "Amusement Park",
  "Bicycle Rent",
  "Beach",
  "Jetski Rent",
  "Internet Cafe",
  "Boat Rent",
];

populateDropdown( eventName);

function populateDropdown( eventType) {
  
  for (var i = 0; i < activities.length; i++) {
    let option = document.createElement("option");
    option.text = activities[i];
    option.value = activities[i];
    eventType.appendChild(option);
  }
}



async function searchUsingFetchAsyncAwait() {
  console.log("searching for " + eventName.value + " in " + cityName.value);
  const { Place } = await google.maps.importLibrary("places");
  const request = {
    fields: ["displayName", "formattedAddress", "businessStatus"],
    textQuery: eventName.value + " " + cityName.value,
    isOpenNow: true,
  };

  try {
    const { places } = await Place.searchByText(request);
    displayResults(places);
  } catch (error) {
    console.error(`Failed to search for places: ${error}`);
  }
}

function displayResults(data) {
  const resultsElem = document.querySelector(".outPuttable");
  resultsElem.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Place Name</th>
          <th>Address</th>
          <th>Open Now</th>
        </tr>
      </thead>
      <tbody>
      ${data
        .map(
          (element) => `
          <tr>
            <td>${element.displayName || "N/A"}</td>
            <td>${element.formattedAddress || "N/A"}</td>
            <td>${element.businessStatus === "OPERATIONAL" ? "Open" : "Closed"}</td>
          </tr>`
        )
        .join("")}
      </tbody>
    </table>
  `;
}
