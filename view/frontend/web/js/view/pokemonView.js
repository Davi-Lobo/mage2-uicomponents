define([
    'jquery',
    'uiComponent',
    'ko',
    'Elisium_UiComponents/js/model/pokemonModel',
    'loader'
], function (
    $,
    Component,
    ko,
    pokeModel
) {
    'use strict';

    return Component.extend({
        defaults: {
            pokeList: pokeModel.pokeData
        },

        initialize: function(config) {
            this._super();
            pokeModel.getPokes();
        },
    });
});
