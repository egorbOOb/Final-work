'use strict';

const popup = (callBtn, popupWindow, closeBtn) => {
    const popup = document.querySelector(popupWindow);

    const setDisplayPopup = () => {
        let popupDisplay = getComputedStyle(popup).display;
        if (popupDisplay === 'none') {
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    };

    const closePopup = function(e) {
        let target = e.target;
        if (target.matches(closeBtn) || target.matches(popupWindow)) {
            e.preventDefault()

            const indicator = popup.querySelector('.elem-indicator');
            if (indicator){
            
                indicator.textContent = '';
            
            }
            
            setDisplayPopup(setDisplayPopup);
            popup.removeEventListener('click', closePopup);
        }
    };

    const openPopup = function(e) {
            e.preventDefault();
            setDisplayPopup(popup);
            popup.addEventListener('click', closePopup);
    };
    
    callBtn.forEach(item => {
        let collection = document.querySelectorAll(item);

        collection.forEach(elem => elem.addEventListener('click', openPopup));
    });
};

export default popup;