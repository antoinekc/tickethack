function capitalizeFirstLetter(city) {
  if(!city) return city;
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
}



module.exports = { capitalizeFirstLetter }