// Calculate the rotate from departure to destination
export const calculateHeading = (origin, destination) => {
  if (origin && destination) {
    const {latitude: lat1, longitude: lng1} = origin;
    const {latitude: lat2, longitude: lng2} = destination;
    const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
    const θ = Math.atan2(y, x);
    const brng = (((θ * 180) / Math.PI + 360) % 360) + 110;
    console.log(brng);
    return brng;
  }
  return 0;
};
