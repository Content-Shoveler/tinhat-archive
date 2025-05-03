import axios from 'axios';

const API_KEY = process.env.VUE_APP_LOCATIONIQ_API_KEY;

export default {
  /**
   * Reverse geocode a lat/lon to get address information
   * @param {string} lat - Latitude
   * @param {string} lon - Longitude
   * @returns {Promise} - Promise with the address data
   */
  reverseGeocode(lat, lon) {
    return axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`
    );
  },

  /**
   * Search for a location by address
   * @param {string} address - Address text to search for
   * @returns {Promise} - Promise with the search results
   */
  searchLocation(address) {
    const geoLookup = encodeURIComponent(address);
    return axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${geoLookup}&format=json`
    );
  }
};
