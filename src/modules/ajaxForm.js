'use strict';

const sendForm = (selector) => {
    const createIndicator = () => {
        const elemIndicator = document.createElement('div');
        elemIndicator.className = 'elem-indicator';
        elemIndicator.style.cssText = `
            font-size: 20px;
            margin-bottom: 5px
        `;

        return elemIndicator;
    };

    const numberValidator = () => {
        const distanceInput = document.querySelector('.distance');

        distanceInput.addEventListener('input', () => {
            distanceInput.value = distanceInput.value.replace(/[^0-9]/, '');
        });
    };

    const phoneValidator = (target, e) => {
        let val = target.value.length;
        if (val <= 12) {
            console.log(12);
            let validator = /[^0-9+]/;
            target.value = target.value.replace(validator, '');
        } else {
            let val = target.value.match(/[0-9+]{12}/);
            target.value = val;
        }
    };

    const nameValidator = (target) => {
        target.value = target.value.replace(/[^а-яА-Я ]/, '');
    };

    document.body.addEventListener('input', (e) => {
        let target = e.target;

        if (target.matches('.phone-user')) {
            phoneValidator(target, e);
        } else if (target.matches('#name_2') || target.matches('#name_1') || target.matches('#name_11') || target.matches('#name_13')) {
            nameValidator(target);
        }
    });


    const statusMessages = {
            successMessage: 'Отправлено!',
            errorMeassage: 'Ошибка',
            loadMessage: 'Идёт отправка...'
    };

    const {successMessage, errorMeassage, loadMessage} = statusMessages,
        elemIndicator = createIndicator();


    const getTextIndicator = (request) => {
        return new Promise((resolve, reject) => {
            elemIndicator.style.color = '#FFD700';
            elemIndicator.textContent = loadMessage;
            
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve();
                } else {
                    reject(request);
                }
            } else {
                return;
            }
        });  
    };

    let body = {};
    
    const getFormData = (form) => {
        let formData = new FormData(form);
        
        formData.forEach((val, key) => {
            body[key] = val.trim();
        });
        
        const userQuest = document.getElementById(selector);
        
        if (userQuest.value) {
            body.userQuest = userQuest.value.trim();
        }

        return body;
    };

    document.body.addEventListener('submit', (event) => {
        event.preventDefault();
        let target = event.target;

        if (target.matches('.main-form') || target.matches('.capture-form')) {
            let form = target;
            const request = new XMLHttpRequest();
            
            form.insertAdjacentElement('beforeend', elemIndicator);

            request.addEventListener('readystatechange', () => {
                getTextIndicator(request)
                    .then(() => {
                        const inputs = form.querySelectorAll('input'),
                            popupClose = document.querySelectorAll('.popup');
                        setTimeout(() => {
                            popupClose.forEach(item => item.style.display = 'none')                        
                        }, 3000)
                        inputs.forEach(item => item.value = '')
                        elemIndicator.style.color = '#32CD32';
                        elemIndicator.textContent = successMessage;
                    })
                    .catch(() => {
                        const inputs = form.querySelectorAll('input'),
                            popupClose = document.querySelectorAll('.popup');
                        setTimeout(() => {
                            popupClose.forEach(item => item.style.display = 'none')                        
                        }, 3000)
                        inputs.forEach(item => item.value = '')
                        elemIndicator.style.color = '#FF0000';
                        elemIndicator.textContent = errorMeassage;
                    });
            });

            request.open('POST', '././server.php');

            request.setRequestHeader('Content-type', 'application/json');

            const body = getFormData(form);

            request.send(JSON.stringify(body));
            document.querySelector('.distance').value = '';
            document.getElementById('myonoffswitch').checked = true;
            document.getElementById('myonoffswitch-two').checked = false;
            document.querySelector('.firstDiameter').value = '1';
            document.querySelector('.firstAmount-rings').value = '1';
            document.querySelector('.secondDiameter').value = '1';
            document.querySelector('.secondAmount-rings').value = '1';
            document.getElementById('calc-result').value = '';
        }
    });

    const calcForm = () => {
        const onoff = document.getElementById('myonoffswitch'),
            onoffTwo = document.getElementById('myonoffswitch-two'),
            accordion = document.querySelector('#accordion');
    
        const wells = {
            wellTitle: document.querySelector('.title-text-toggle'),
            selectBoxOne: document.querySelector('.select-box-toggle-one'),
            selectBoxTwo: document.querySelector('.select-box-toggle-two')
        }    
        
        for (let key in wells) {
            wells[key].style.display = 'none';
        }
        
        const setWell = () => {
            if (onoff.checked) {
                for (let key in wells) {
                    wells[key].style.display = 'none';
                }
            } else {
                for (let key in wells) {
                    wells[key].style.display = 'inline-block';
                }
            }
        };
        
         const calcObj = {
            sumTotal: 0,
            toggle: 0,
            diameterFirst: 1,
            diameterSecond: 1,
            amountRingsFirst: 1,
            amountRingsSecond: 1,
            bottomPrice: 0,
            distance: 0,
    
            counting: function() {
                const calcFormBtn = document.querySelector('.calcPopup-btn');
                calcFormBtn.addEventListener('click', this.setBodyForm.bind(this));
                this.countingDistance();
                this.calcToggle();
                this.calcRings();
                this.calcBottom();
                this.calcTotalSum();
                const calcResult = document.getElementById('calc-result');
                calcResult.value = Math.round(this.sumTotal);
            },
    
            countingDistance: function() {
                const distanceInput = document.querySelector('.distance');
    
                const getDistance = () => {
                    this.distance = +distanceInput.value;
                };
    
                distanceInput.addEventListener('change', getDistance.bind(this))
            },
    
            calcTotalSum: function() {
                this.sumTotal = this.toggle * this.diameterFirst * this.diameterSecond * this.amountRingsFirst * this.amountRingsSecond + this.bottomPrice;
            },
    
            calcToggle: function() {
                if (onoff.checked) {
                    this.toggle = 10000;
                } else {
                    this.toggle = 15000;
                }
            },
    
            calcRings: function() {
                const diameterElemFirst = document.querySelector('.firstDiameter');
                const firstAmountRings = document.querySelector('.firstAmount-rings');
                diameterElemFirst.addEventListener('change', () => this.diameterFirst = +diameterElemFirst.value);
                firstAmountRings.addEventListener('change', () => this.amountRingsFirst = +firstAmountRings.value);
    
                const diameterElemSecond = document.querySelector('.secondDiameter');
                const secondAmountRings = document.querySelector('.secondAmount-rings');
                
                if (onoff.checked) {
                    diameterElemSecond.addEventListener('change', () => this.diameterSecond = +diameterElemSecond.value);
                    secondAmountRings.addEventListener('change', () => this.amountRingsSecond = +secondAmountRings.value);
                }
            },
    
            calcBottom: function() {
                if (onoffTwo.checked) {
    
                    if (!onoff.checked) {
                        this.bottomPrice = 2000
                    } else {
                        this.bottomPrice = 1000
                    }
    
                } else {
                    this.bottomPrice = 0;
                }
            },
    
            setBodyForm: function() {
                body.sumTotal = this.sumTotal;
                body.toggle = this.toggle;
                body.diameterFirst = this.diameterFirst;
                body.diameterSecond = this.diameterSecond;
                body.amountRingsFirst = this.amountRingsFirst;
                body.amountRingsSecond = this.amountRingsSecond;
                body.bottomPrice = this.bottomPrice;
                body.distance = this.distance;
            }
        };
        
        accordion.addEventListener('change', calcObj.counting.bind(calcObj));
        onoff.addEventListener('change', setWell);
    };

    numberValidator();
    calcForm();
    createIndicator();
};

export default sendForm;