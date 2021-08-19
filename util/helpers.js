const config = require('../config.json')

module.exports = {
  format_numbers: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  JSONCheck: function(data) {
    try {
      //console.log(data);
      JSON.parse(data);
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  },

  postRequest: function(url, data) {
    return fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.auth_token
        }),
      })
      .then(response => response.json())
  },

  timer: function(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}
