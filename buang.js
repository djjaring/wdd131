document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    const modifiedSpan = document.getElementById('last-modified');
    const windchillSpan = document.getElementById('windchill');

    yearSpan.textContent = new Date().getFullYear();
    modifiedSpan.textContent = document.lastModified;

    const temperature = 19; // in Celsius
    const windSpeed = 5; // in km/h

    const calculateWindChill = (temp, wind) => {
        if (temp <= 10 && wind > 4.8) {
            return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16));
        }
        return 'N/A';
    };

    windchillSpan.textContent = calculateWindChill(temperature, windSpeed);
});
