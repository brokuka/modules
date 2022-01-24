function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const   time = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((time / 1000 / 60) % 60),
                seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endtime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endtime);

            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }

    setClock(id, deadline);
}

export function getZero(number) {
    if (number >= 0 && number < 10) {
        return `0${number}`;
    } else return number;
}

export default timer;