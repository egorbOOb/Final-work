'use strict';

import popup from './modules/popup';
import sendForm from './modules/ajaxForm';
import accordion from './modules/accordion';
import nextStep from './modules/nextStep';
import addSentence from './modules/addSentence';

nextStep();
sendForm('user-quest');
popup(['.discount-btn'], ".popup-discount", ".popup-close");
popup(['.call-btn'], ".popup-call", ".popup-close");
popup(['.check-btn'], ".popup-check", ".popup-close");
popup(['.consultation-btn'], ".popup-consultation", ".popup-close");
accordion(['collapseOne-two', 'collapseTwo-two', 'collapseThree-two'], '#accordion-two');
accordion(['collapseOne', 'collapseTwo', 'collapseThree', 'collapseFour'], '#accordion');
addSentence();