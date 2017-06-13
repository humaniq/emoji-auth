'use strict';

var assert = require("assert"),
    Emoji  = require("../index");

describe('Check lib stability', function(){

    it('Test #1 Result Check ', function(){
        let set = new Emoji(3);
        assert.equal('object', typeof set, 'The result is not equal to json');
    });

    it('Test #2 Passing the invalid parameter', function(){
        let invalid_select = 'string';
        return Promise.resolve()
            .then(() => {
                return new Emoji(invalid_select);
            })
            .catch(err => {
                assert.equal(err.message, 'You can pass either an emoji codes [array] or limit [int] to generate random', 'Check for the selected item');
            })
    });

    it('Test #3 Check for select and isSelect', function(){
        let set = new Emoji(3),
            currentSet = set.getCurrentSet();

        for (var i = 0; i < currentSet.length; i++) {
            set.selectCode(currentSet[i].code);
            assert.equal(true, set.isSelected(currentSet[i].code), 'Check for the selected item');
        }

        set.clearSet();

    });

    it('Test #4 Check for the selected item', function(){
        let set = new Emoji(2);
        assert.equal(false, set.isSelected(':scroll:'), 'Check for the selected item');
        assert.equal(false, set.isSelected('test text'), 'Check for the selected item');
        assert.equal(false, set.isSelected(21212121), 'Check for the selected item');
    });


    it('Test #5 Not valid code', function(){
        let invalid_select = 'string';
        let set = new Emoji(2);

        return Promise.resolve()
            .then(() => {
                set.selectCode(invalid_select)
            })
            .catch(err => {
                assert.equal(err.message, 'Code ' + invalid_select + ' is not in current set', 'Check for the selected item');
            })
    });

    it('Test #6 Check Emoji list', function(){
        assert.equal(true, Array.isArray(Emoji.getEmojiList()), 'The result is not equal to array');
        assert.equal(true, Emoji.getEmojiList().length > 0, 'The result is null');
    });

    it('Test #7 Get img tag ', function(){
        let good_code = ':woman_teacher:',
            bad_code = 'string';

        assert.equal('string', typeof Emoji.getImageTag(good_code), 'The result is not equal to json');
        assert.equal(false, Emoji.getImageTag(bad_code), 'The result is true');
    });

    it('Test #8 Hash', function(){
        let set = new Emoji(1),
            currentSet = set.getCurrentSet();
            assert.equal(false, set.getHash(), 'Soda was given before');

        for (var i = 0; i < currentSet.length; i++) {
            set.selectCode(currentSet[i].code);
        }

        assert.equal('string', typeof set.getHash(), 'Hash is not valid');
        assert.equal(false, set.getHash().length < 0 || set.getHash().length < 64 , 'Hash is not valid');

    });

});
