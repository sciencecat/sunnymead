(function () {
  'use strict';

  angular
    .module('app')
    .factory('DocumentBuilderService', DocumentBuilder);

  DocumentBuilder.$inject = [];

  function DocumentBuilder() {
    function create(result) {
      console.log(result);
      
      var documentDefinition = {
        pageSize: 'A4',
      	content: [
          h1('Resultado - 9Types'),
        	divisor(),
        	h2('Maior incidência'),
        	typeList(result.firstPlaces, 14),
        	divisor(),
        	h2('Segunda maior incidência'),
        	typeList(result.secondPlaces, 12),
        	divisor(),
        	h2('Pontuação'),
        	image(),
        	divisor(),
        	h2('Menor incidência'),
        	typeList(result.lastPlaces, 12, '#ef473a'),
      	]
      };
      
      function divisor() {
      	return { canvas: [{ type: 'line', x1: 60, y1: 10, x2: 455, y2: 10, lineWidth: 0, lineColor: '#CCC' }] };
      }
      
      function h1(text) {
        return { text: text, fontSize: 16, alignment: 'center', margin: [ 0, 0, 0, 5 ] };
      }
      
      function h2(text) {
        return { text: text, fontSize: 10, alignment: 'center', margin: [ 0, 5, 0, 10 ], color: '#AAA' };
      }
      
      function typeItem(item, size, color) {
        console.log(item);
        return [
          [
            { text: 'Tipo', fontSize: size, alignment: 'center', color: color || '#000' },
            { text: String(item.type), fontSize: size * 2, alignment: 'center', color: color || '#000' }
          ],
          { text: item.description, fontSize: size * 0.75, color: color || '#000' }
        ];
      }
      
      function typeList(types, size, color) {
        return {
          columns: [
            { width: 70, text: '' },
            {
              width: 400,
              table: {
                body: types.map(function (type) { return typeItem(type, size, color); })
              },
              layout: {
                hLineWidth: function() { return 0; },
                vLineWidth: function() { return 0; },
                paddingLeft: function() { return 10; },
                paddingRight: function() { return 10; },
                paddingTop: function() { return 5; },
                paddingBottom: function() { return 5; }
              }
            },
            { width: 50, text: '' }
          ]
        };
      }
      
      function image() {
        return {
            image: result.graphImageURL,
            width: 350,
            height: 350,
            alignment: 'center'
      	};
      }
      
      return documentDefinition;
    }

    return {
      create: create
    };
  }

})();
