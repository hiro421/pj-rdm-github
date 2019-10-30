import $ from "jquery";

export default class Model {
    constructor($t) {
        this.target = $t;
        this.imgs = this.target.find('img');
        this.current = 0;
        this.length = this.imgs.length - 1;
        this.target.click((e) => {
            e.preventDefault();
            this.change();
        });
    }

    change() {
        this.current++;
        if (this.current > this.length) this.current = 0;
        let c = this.current;
        this.imgs.removeClass('active');
        this.imgs.each(function () {
            if ($(this).attr('data-img') == c) $(this).addClass('active');
        })
    }
}