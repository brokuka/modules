import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const   forms = document.querySelectorAll(formSelector),
    message = {
        loading: 'assets/images/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так..'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const   formData = new FormData(form),
                    statusMessage = document.createElement('img'),
                    json = Object.fromEntries(formData.entries());
                    // json = JSON.stringify(Object.fromEntries(formData.entries()));

            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            axios.post('http://localhost:3000/requests', json)
            .then(() => {
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const   prevModalDialog = document.querySelector('.modal__dialog'),
                thanksModal = document.createElement('div');

        openModal('.modal', modalTimerId);
        prevModalDialog.classList.add('hide');

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 3000)
    }
}

export default forms;