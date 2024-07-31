import { myAxios } from "./helper"

export const getCities = (cities) => {
    const body = cities;
    return myAxios.get('api/cities', body)
        .then((response) => response.data)
}

export const getCitiesByCountry = (country) => {
    return myAxios.get(`api/${country}`)
        .then((response) => response.data)
}
export const getCityByname = (city) => {
    return myAxios.get(`api/city/${city}`)
        .then((response) => response.data)
}
export const getPricesByCity = (cname) => {

    return myAxios.get(`api/city_prices/${cname}`)
        .then((response) => response.data)
}

export const getPriciesByCategory = (cname, category) => {

    return myAxios.get(`api/city_prices/${cname}/${category}`)
        .then((response) => response.data)
}