let CountryData = [];

fetch("https://restcountries.eu/rest/v2/all")
  .then((response) => response.json())
  .then((result) => {
    CountryData = result;
    // console.log(CountryData);
    var CountryData2 = CountryData.filter((elem) => {
      if (
        elem.name === "Afghanistan" ||
        elem.name === "Albania" ||
        elem.name === "Russian Federation" ||
        elem.name === "Mexico" ||
        elem.name === "Brazil" ||
        elem.name === "Argentina"
      ) {
        return elem;
      }
    });
    console.log(CountryData2);
    ListOfCountries(CountryData2);
  })
  .catch((err) => {
    console.log(err);
  });

function ListOfCountries(Data) {
  Data.forEach((element) => {
    var col = CreateElement("div", "col-lg-4 col-sm-12");
    var card = CreateElement("div", "card mt-3");
    card.setAttribute("width", "18rem");
    card.setAttribute(
      "style",
      "background : linear-gradient(0.25turn, #C6BD94 20%, black 125%);"
    );
    var cardHeader = CreateElement("div", "card-header text-center");
    cardHeader.setAttribute(
      "style",
      "background-color : black; color : white;"
    );
    cardHeader.innerHTML = element.name;
    var img = CreateElement("img", "card-img-top mt-4");
    img.setAttribute("width", "300");
    img.setAttribute("height", "150");
    img.setAttribute("src", element.flag);
    var cardBody = CreateElement("div", "card-body");
    cardBody.setAttribute("style", "color:white");
    var cardText = CreateElement("P", "cared-text text-center");
    cardText.innerHTML = `capital :${element.capital} <br> Region : ${element.region} <br> Country Code : ${element.alpha3Code} <br> Sub region: ${element.subregion}`;
    var button1 = CreateElement("div", "text-center");
    var button = CreateElement("BUTTON", "btn text-right");
    button.setAttribute("style", "border: 1px solid white; color :white");
    button.innerText = "Click for Weather";
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#demoModal");

    function WeatherApi(elem) {
      button.addEventListener("click", function () {
        let ApiKey = "f0bf33e2155f77668d794e50971e38e6";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.name}&appid=${ApiKey}&units=metric`;

        fetch(url)
          .then((response) => response.json())
          .then((result) => {
            console.log(result.main.temp);
            document.getElementById(
              "temp"
            ).innerHTML = `The current temprature of ${element.name} is ${result.main.temp} <sup> ^C | ^F</sup>`;
          })
          .catch((err) => {
            alert(err);
          });
      });
    }
    WeatherApi(element);
    button1.append(button);
    cardBody.append(cardText, button1);
    card.append(cardHeader, img, cardBody);
    col.append(card);
    document.getElementById("restCountries").append(col);
  });
}

function CreateElement(ElementName, ElementClass = "", ElementId = "") {
  let elem = document.createElement(ElementName);
  elem.setAttribute("class", ElementClass);
  elem.setAttribute("id", ElementId);
  return elem;
}
