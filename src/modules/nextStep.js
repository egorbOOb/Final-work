const nextStep = () => {
    const container = document.getElementById('accordion'),
         btnNext = document.querySelectorAll('.button.construct-btn'),
         panels = container.children;

    const goNextStep = (e) => {
        let target = e.target;
        
        if (target.matches('.button.construct-btn') || target.closest('.button.construct-btn')){
            e.preventDefault();
            
            if (target.dataset.number) {
                const numberNext = +target.dataset.number + 1,
                    number = +target.dataset.number;

                panels[numberNext].lastElementChild.style.display = 'block';
                panels[number].lastElementChild.style.display = 'none';
            };

        }
    }

    btnNext.forEach(elem => elem.addEventListener('click', goNextStep))

};

export default nextStep;