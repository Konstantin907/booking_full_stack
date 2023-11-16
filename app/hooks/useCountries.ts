//it uses package called world countries in terminal:
import countries from "world-countries";

//formated countries you define

const formattedCountries = countries.map((country)=>({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng, //latitute
    region: country.region
}))

const useCountries = () => {
    const getAll = () => formattedCountries;

    //ovdje cemo unutar formattedCountries
//da nadjemo gdje je value jednak value koji pasujemo
//u ovoj funkciji:
const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value)
}

return{
    getAll,
    getByValue
}
};

export default useCountries;
