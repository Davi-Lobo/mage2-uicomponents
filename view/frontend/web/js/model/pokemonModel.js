define([
    'jquery',
    'ko'
], function (
    $,
    ko
) {
    'use strict';

    const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

    let pokeUrls = ko.observableArray([]);
    let pokeData = ko.observableArray([]);

    return {
        pokeUrls,
        pokeData,
        getPokeList: function() {
            return $.ajax({
                url: baseUrl+'?limit=151',
                type: "GET",
                error: function (xhr, status, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        
        getPokeData: async function(pokeList) {            
            const pokeData = await Promise.all(pokeList.map(url => fetch(url)
                .then(res => res.json())  
            ));

            return pokeData;
        },

        getPokes: function() {
            const self = this;
            const promise = self.getPokeList();

            console.log('estou pegando a lista de pokemons')

            promise.success(async function (data) {
                data.results.forEach((element) => {
                    self.pokeUrls.push(element.url);
                });

                const pokeData = await self.getPokeData(self.pokeUrls)

                pokeData.forEach((element) => {
                    self.pokeData.push(element);
                });
            });
        }
    };
});
