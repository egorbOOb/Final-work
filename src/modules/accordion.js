'use strict';

const accorgion = (units, container) => {
    const mainContainer = document.querySelector(container);
    
    mainContainer.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.closest(container)) {
            if (target.dataset.setDisplay) {
                e.preventDefault();
                units.forEach((item, i) => {
                    const number = +target.dataset.setDisplay
                    if (number === i) {
                        const elem = document.getElementById(item);
                        elem.style.display = 'block';
                    } else {
                        const elem = document.getElementById(item);
                        elem.style.display = 'none';
                    }
                })
            }
        }
    });
};

export default accorgion;