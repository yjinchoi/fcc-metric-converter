'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route ( '/api/convert' )
    .get ( ( req, res ) => {
      
      let input = req.query.input;

      console.log ( '/api/convert?input=' + req.query.input );

      if ( !input ) {
        console.log ( 'No Input Query Parameter' );
        return res.send ( 'no input' );
      }

      let initNum;
      let initUnit;
      let spellOut;
      
      try {
        initNum = convertHandler.getNum ( input );
      } catch ( error ) {
        // ignore error
        console.log ( 'get number failed' );
      }

      try {
        initUnit = convertHandler.getUnit ( input );
      } catch ( error ) {
        // ignore error
        console.log ( 'get unit failed' );
      }

      if ( !initNum && !initUnit ) {
        return res.send ( 'invalid number and unit' );
      }

      if ( !initNum ) {
        return res.send ( 'invalid number' );        
      }

      if ( !initUnit ) {
        return res.send ( 'invalid unit' );        
      }

      let returnUnit = convertHandler.getReturnUnit ( initUnit );

      let returnNum = convertHandler.convert ( initNum, initUnit );

      let string = convertHandler.getString ( initNum, initUnit, returnNum, returnUnit ); 

      res.send ( {
        initNum: initNum,
        initUnit: convertHandler.spellOutUnit(initUnit),
        returnNum: returnNum,
        returnUnit: convertHandler.spellOutUnit(returnUnit),
        string: string
      });
      
    })

};
