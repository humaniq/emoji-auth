'use strict';
var emoji_list = require('./emoji-list.json');
var emojione = require('emojione');
var sjcl = require('sjcl');

module.exports = class {
    constructor(options) {
        this.current_set = [];
        this.selected_set = [];

        if (!Array.isArray(options) && !Number.isInteger(options)) {
            throw new Error('You can pass either an emoji codes [array] or limit [int] to generate random')
        }

        if (Array.isArray(options)) {
            for (var i = 0; i < options.length; i++) {
                if (emoji_list.indexOf(options[i]) < 0) {
                    throw new Error(options[i] + ' is not available')
                }

                this.current_set.push({
                    code: options[i],
                    img: emojione.shortnameToImage(options[i]),
                });
            }
        } else if (Number.isInteger(options)) {
            let selected_codes = [];

            while (this.current_set.length < options) {
                let idx = Math.floor(Math.random() * emoji_list.length);

                if (selected_codes.indexOf(emoji_list[idx]) < 0) {
                    this.current_set.push({
                        code: emoji_list[idx],
                        img: emojione.shortnameToImage(emoji_list[idx]),
                    });
                    selected_codes.push(emoji_list[idx]);
                }
            }
        }
    }

    selectCode(code) {
        for (var i = 0; i < this.current_set.length; i++) {
            if (code == this.current_set[i].code) {
                this.selected_set.push(this.current_set[i]);

                return true;
            }
        }

        throw new Error('Code ' + code + ' is not in current set');
    }

    isSelected(code) {
        let is_selected = false;
        for (var i = 0; i < this.selected_set.length; i++) {
            if (code == this.selected_set[i].code) {
                is_selected = true;
                break;
            }
        }

        return is_selected;
    }

    getCurrentSet(codes_only) {
        var output = [];

        for (var i = 0; i < this.current_set.length; i++) {
            output.push(codes_only? this.current_set[i].code : this.current_set[i]);
        }

        return output;
    }

    getSelectedSet() {
        var output = [];

        for (var i = 0; i < this.selected_set.length; i++) {
            output.push(this.selected_set[i]);
        }

        return output;
    }

    clearSet() {
        this.selected_set = [];
    }

    getHash(clear_selection) {
        if (!this.selected_set.length) {
            return false;
        }

        var unselected = [];
        for (var i = 0; i < this.current_set.length; i++) {
            if (!this.isSelected(this.current_set[i].code)) {
                unselected.push(this.current_set[i].code);
            }
        }

        var code = this.selected_set.join('') + unselected.join('');
        code = sjcl.hash.sha256.hash(code);
        code = sjcl.codec.hex.fromBits(code);

        if (clear_selection) {
            this.clearSet();
        }

        return code;
    }

    static getEmojiList() {
        return emoji_list;
    }

    static getImageTag(code){
        if (emoji_list.indexOf(code) < 0){
            return false;
        }

        return emojione.shortnameToImage(code)
    }
}