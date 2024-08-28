import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CountryCitySelector() {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        // Загружаем список стран из API или используем статичный список
        const loadCountries = async () => {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryOptions = response.data.map((country) => ({
                value: country.cca2,
                label: country.name.common,
            }));
            setCountries(countryOptions);
        };
        loadCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // Загружаем список городов в зависимости от выбранной страны
            const loadCities = async () => {
                const response = await axios.get(`https://api.teleport.org/api/countries/iso_alpha2:${selectedCountry}/admin1_divisions/`);
                const cityOptions = response.data._links['a1:items'].map((city) => ({
                    value: city.name,
                    label: city.name,
                }));
                setCities(cityOptions);
            };
            loadCities();
        }
    }, [selectedCountry]);

    return (
        <div>
            <Select
                options={countries}
                onChange={setSelectedCountry}
                placeholder="Выберите страну"
            />
            <Select
                options={cities}
                onChange={setSelectedCity}
                placeholder="Выберите город"
                isDisabled={!selectedCountry}
            />
        </div>
    );
}

export default CountryCitySelector;
