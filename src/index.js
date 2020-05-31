// import "./styles.css";

var map;
let places = [];

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 13
  });

  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map
  });

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(
    {
      location: { lat: latitude, lng: longitude },
      radius: "5000",
      type: ["restaurant"],
      fields: ["geometry"]
    },
    (result, status) => {
      if (status === "OK") {
        places = result;

        // console.log(places);

        places.map(place => {
          const icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25)
          };

          new google.maps.Marker({
            icon,
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            map
            // label: place.name
          });

          document.querySelector(
            "#results"
          ).innerHTML += `<li class="list-group-item p-0"><button class="btn btn-block text-left p-2 place">${
            place.name
          }</button></li>`;
        });

        document.querySelector(".place").addEventListener("click", () => {
          document.querySelector("#panel").classList.add("open");
        });

        document.querySelector("#close-panel").addEventListener("click", () => {
          document.querySelector("#panel").classList.remove("open");
        });
      }

      // document.querySelector("body").innerHTML = `
      //   <img src="http://domain.com/?lat=${latitude}&lng=${longitude}" alt="">
      // `;
    }
  );
});

// if (typeof map === "undefined") {
//   console.log("loading");
// } else {
//   console.log("loaded");
// }
