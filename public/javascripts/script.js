async function initMap() {
  try {
    const location = await axios.get(`http://localhost:3000/api${window.location.pathname}`);
    const [lng, lat] = location.data.geometry.coordinates;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: { lat, lng },
    });
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
  } catch (err) {
    console.warn(err);
  }
}
