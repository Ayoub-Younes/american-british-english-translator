const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator();
let text = "Mangoes are my favorite fruit"

suite('Functional Tests', () => {
 //1
 test('Translation with text and locale fields: POST request to /api/translate',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .post('/api/translate')
    .send({text:text, locale:"american-to-british"})
    .end((err,res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.property(JSON.parse(res.text),'text');
      assert.property(JSON.parse(res.text),'translation');
    done();
 })
})

//2
test('Translation with text and invalid locale field: POST request to /api/translate',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .post('/api/translate')
    .send({text:text, locale:"american-to-britis"})
    .end((err,res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.deepEqual(JSON.parse(res.text),{ error: 'Invalid value for locale field' });
    done();
 })
})

//3
test('Translation with missing text field: POST request to /api/translate',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .post('/api/translate')
    .send({locale:"american-to-british"})
    .end((err,res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.deepEqual(JSON.parse(res.text),{ error: 'Required field(s) missing' });
    done();
 })
})

//4
test('Translation with missing locale field: POST request to /api/translate',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .post('/api/translate')
    .send({text:text})
    .end((err,res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.deepEqual(JSON.parse(res.text),{ error: 'Required field(s) missing' });
    done();
 })
})

//5
test('Translation with empty text: POST request to /api/translate',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .post('/api/translate')
    .send({text:"", locale:"american-to-british"})
    .end((err,res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.deepEqual(JSON.parse(res.text),{ error: 'No text to translate' });
    done();
 })
})

//6
test('Translation with text that needs no translation: POST request to /api/translate',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .post('/api/translate')
    .send({text:"Hi", locale:"american-to-british"})
    .end((err,res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.deepEqual(JSON.parse(res.text),{ text: "Hi", translation:"Everything looks good to me!" });
    done();
 })
})
})
