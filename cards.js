function card() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classNames) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classNames = classNames;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const div = document.createElement('div');

            if (this.classNames.length === 0) {
                this.div = 'menu__item';
                div.classList.add(this.div);
            } else this.classNames.forEach(className => div.classList.add(className))

            div.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({image, alt, title, description, price}) => {
            new MenuCard(image, alt, title, description, price, '.menu .container').render();
        });
    });
}

export default card;