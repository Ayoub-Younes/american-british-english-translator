'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  app.route('/api/translate')
    .post((req, res) => {
      let {text, locale} = req.body;
      if(text == ""){
        res.json({ error: 'No text to translate' })
      }
      if(!locale || !text){
        res.json({ error: 'Required field(s) missing' })
      }
      if(locale != "american-to-british" && locale != "british-to-american"){
        res.json({ error: 'Invalid value for locale field' })
      }
      let translation = translator.translation(text,locale);
      translation = translation.charAt(0).toUpperCase() + translation.slice(1);
      if (translation == text){res.json({text:text,translation:"Everything looks good to me!"})}
      res.json({text:text, translation:translation})
    });
};
