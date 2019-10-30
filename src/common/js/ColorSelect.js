import $ from "jquery";

export default class ColorSelect {
    constructor($container) {
        this.container = $container;
        this.select = this.container.find('.thums li');
        this.image = this.container.find('.images li');
        let _this = this;
        this.select.click(function () {
            let num = $(this).data('num');
            _this.select.removeClass('active');
            _this.image.removeClass('active');
            _this.select.each(function () {
                if ($(this).data('num') === num) $(this).addClass('active');
            });
            _this.image.each(function () {
                if ($(this).data('num') === num) $(this).addClass('active');
            });
        });
    }
}