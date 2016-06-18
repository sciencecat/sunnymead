(function () {
  'use strict';

  angular
    .module('app')
    .factory('DocumentBuilderService', DocumentBuilder);

  DocumentBuilder.$inject = ['HTMLToPDFParser'];

  function DocumentBuilder(HTMLToPDFParser) {
    function create(result) {
      var documentDefinition = {
        pageSize: 'A4',
      	content: [
          h1('Resultado - 9Types'),
        	divisor(),
          h2('Dados do usuário'),
        	userData(),
        	divisor(),
        	h2('Pontuação'),
        	image(),
        	divisor('before'),
        	h2('Maior incidência'),
        	typeList(result.firstPlaces, 14),
        	divisor('before'),
        	h2('Segunda maior incidência'),
        	typeList(result.secondPlaces, 12),
        	divisor('before'),
        	h2('Menor incidência'),
        	typeList(result.lastPlaces, 12),
      	]
      };
      
      function divisor(pageBreak) {
      	var content = { canvas: [
      	  { type: 'line', x1: 60, y1: 10, x2: 455, y2: 10, lineWidth: 0, lineColor: '#CCC' }
      	]};
      	
        if (pageBreak) {
          content.pageBreak = pageBreak;
        }
      	
      	return content;
      }
      
      function h1(text) {
        return { text: text, fontSize: 16, alignment: 'center', margin: [ 0, 0, 0, 5 ] };
      }
      
      function h2(text) {
        return { text: text, fontSize: 10, alignment: 'center', margin: [ 0, 5, 0, 10 ], color: '#AAA' };
      }
      
      function userData() {
        return {
          columns: [
            { width: 110, text: '' },
            {
              width: 330,
              table: {
                body: [
                  [
                    { text: 'Nome:', fontSize: 10, bold: true, alignment: 'right' },
                    { text: result.user.name, fontSize: 10, alignment: 'left' }
                  ],
                  [
                    { text: 'Email:', fontSize: 10, bold: true, alignment: 'right' },
                    { text: result.user.email, fontSize: 10, alignment: 'left' }
                  ]
                ]
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
            { width: 80, text: '' }
          ]
        };
      }
      
      function typeItem(item, size) {
        return [
          [
            { text: 'Tipo', fontSize: size, alignment: 'center' },
            { text: String(item.type), fontSize: size * 2, alignment: 'center' }
          ],
          HTMLToPDFParser.parse(item.details)
        ];
      }
      
      function typeList(types, size) {
        return {
          columns: [
            { width: 70, text: '' },
            {
              width: 400,
              table: {
                body: types.map(function (type) { return typeItem(type, size); })
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
            width: 360,
            height: 360,
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
