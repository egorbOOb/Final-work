'use strict';

const addSentence = () => {
    const addSentenceBtn = document.querySelector('.add-sentence-btn'),
        hiddenBlocks = document.querySelectorAll('.hidden-block');

    const addBlocks = () => {
        hiddenBlocks.forEach(elem => {
            elem.classList.remove('hidden');
        })
        addSentenceBtn.style.display = 'none';
    }

    addSentenceBtn.addEventListener('click', addBlocks)
}

export default addSentence;