import axios from 'axios';

const CORS_PROXY = process.env.VUE_APP_CORS_PROXY;
const API_KEY = process.env.VUE_APP_N2YO_API_KEY;

export default {
  /**
   * Get satellites above a specific location
   * @param {string} lat - Latitude
   * @param {string} lon - Longitude
   * @param {string} alt - Altitude
   * @param {string} viewAng - View angle
   * @param {string} categoryId - Satellite category ID
   * @returns {Promise} - Promise with the satellite data
   */
  getSatellitesAbove(lat, lon, alt, viewAng, categoryId) {
    // Ensure CORS_PROXY ends with a slash
    const formattedProxy = CORS_PROXY.endsWith('/') ? CORS_PROXY : `${CORS_PROXY}/`;
    return axios.get(
      `${formattedProxy}https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lon}/${alt}/${viewAng}/${categoryId}?apiKey=${API_KEY}`
    );
  }
};
