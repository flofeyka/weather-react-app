import axios, { AxiosResponse } from "axios";

export const API_KEY = "9ceb6bb1e6d8e3bd059e010d089a4f30";

export const weatherAPI = {
    async fetchGeo(value: string = 'Москва') {
        try {
            const response: AxiosResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=${API_KEY}`);
            if (response.status !== 200) {
                return false;
            }
            const { lat, lon, local_names } = response.data[0];
            localStorage.setItem("geoData", JSON.stringify({
                lat,
                lon,
                name: local_names.ru,
            }));
            return {
                lat, lon, name: local_names.ru
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    async fetchWeatherByGeo(lat: number, lon: number) {
        try {
            const response: AxiosResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            if (response.status !== 200) {
                return false;
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}