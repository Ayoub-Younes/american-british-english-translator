const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
let func = (text) => text.replaceAll(/<span class="highlight">|<\/span>/g,"")
suite('Unit Tests', () => {
 suite('American English to British English', ()=>{
  //1
  test("Translate Mangoes are my favorite fruit",()=>{
   let text = "Mangoes are my favorite fruit"
   assert.equal(func(translator.translation(text,"american-to-british")),"Mangoes are my favourite fruit")
  })
 //2
 test("I ate yogurt for breakfast.",()=>{
    let text = "I ate yogurt for breakfast."
    assert.equal(func(translator.translation(text,"american-to-british")),"I ate yoghurt for breakfast.")
   })
 //3
 test("We had a party at my friend's condo.",()=>{
    let text = "We had a party at my friend's condo."
    assert.equal(func(translator.translation(text,"american-to-british")),"We had a party at my friend's flat.")
   })
 //4
 test("Can you toss this in the trashcan for me?",()=>{
    let text = "Can you toss this in the trashcan for me?"
    assert.equal(func(translator.translation(text,"american-to-british")),"Can you toss this in the bin for me?")
   })
 //5
 test("The parking lot was full.",()=>{
    let text = "The parking lot was full."
    assert.equal(func(translator.translation(text,"american-to-british")),"The car park was full.")
   })
 //6
 test("Like a high tech Rube Goldberg machine.",()=>{
    let text = "Like a high tech Rube Goldberg machine."
    assert.equal(func(translator.translation(text,"american-to-british")),"Like a high tech Heath Robinson device.")
   })
 //7
 test("To play hooky means to skip class or work.",()=>{
    let text = "To play hooky means to skip class or work."
    assert.equal(func(translator.translation(text,"american-to-british")),"To bunk off means to skip class or work.")
   })
 //8
 test("No Mr. Bond, I expect you to die.",()=>{
    let text = "No Mr. Bond, I expect you to die."
    assert.equal(func(translator.translation(text,"american-to-british")),"No Mr Bond, I expect you to die.")
   })
 //9
 test("Dr. Grosh will see you now.",()=>{
    let text = "Dr. Grosh will see you now."
    assert.equal(func(translator.translation(text,"american-to-british")),"Dr Grosh will see you now.")
   })
 //10
 test("Lunch is at 12:15 today.",()=>{
    let text = "Lunch is at 12:15 today."
    assert.equal(func(translator.translation(text,"american-to-british")),"Lunch is at 12.15 today.")
   })
 })


 suite('British English to American English', ()=>{
    //1
    test("We watched the footie match for a while.",()=>{
     let text = "We watched the footie match for a while."
     assert.equal(func(translator.translation(text,"british-to-american")),"We watched the soccer match for a while.")
    })
   //2
   test("Paracetamol takes up to an hour to work.",()=>{
      let text = "Paracetamol takes up to an hour to work."
      assert.equal(func(translator.translation(text,"british-to-american")),"Tylenol takes up to an hour to work.")
     })
   //3
   test("First, caramelise the onions.",()=>{
      let text = "First, caramelise the onions."
      assert.equal(func(translator.translation(text,"british-to-american")),"First, caramelize the onions.")
     })
   //4
   test("I spent the bank holiday at the funfair.",()=>{
      let text = "I spent the bank holiday at the funfair."
      assert.equal(func(translator.translation(text,"british-to-american")),"I spent the public holiday at the carnival.")
     })
   //5
   test("I had a bicky then went to the chippy.",()=>{
      let text = "I had a bicky then went to the chippy."
      assert.equal(func(translator.translation(text,"british-to-american")),"I had a cookie then went to the fish-and-chip shop.")
     })
   //6
   test("I've just got bits and bobs in my bum bag.",()=>{
      let text = "I've just got bits and bobs in my bum bag."
      assert.equal(func(translator.translation(text,"british-to-american")),"I've just got odds and ends in my fanny pack.")
     })
   //7
   test("The car boot sale at Boxted Airfield was called off.",()=>{
      let text = "The car boot sale at Boxted Airfield was called off."
      assert.equal(func(translator.translation(text,"british-to-american")),"The swap meet at Boxted Airfield was called off.")
     })
   //8
   test("Have you met Mrs Kalyani?",()=>{
      let text = "Have you met Mrs Kalyani?"
      assert.equal(func(translator.translation(text,"british-to-american")),"Have you met Mrs. Kalyani?")
     })
   //9
   test("Prof Joyner of King's College, London.",()=>{
      let text = "Prof Joyner of King's College, London."
      assert.equal(func(translator.translation(text,"british-to-american")),"Prof. Joyner of King's College, London.")
     })
   //10
   test("Tea time is usually around 4 or 4.30.",()=>{
      let text = "Tea time is usually around 4 or 4.30."
      assert.equal(func(translator.translation(text,"british-to-american")),"Tea time is usually around 4 or 4:30.")
     })
   })


   suite('Highlight translation',()=>{

    //1
    test('Highlight translation in Mangoes are my favorite fruit.',()=>{
     let text = "Mangoes are my favorite fruit"
     assert.equal(translator.translation(text,"american-to-british"),'Mangoes are my <span class="highlight">favourite</span> fruit')
    })
    //2
    test('Highlight translation in I ate yogurt for breakfast.',()=>{
        let text = "I ate yogurt for breakfast."
        assert.equal(translator.translation(text,"american-to-british"),'I ate <span class="highlight">yoghurt</span> for breakfast.')
       })

    //3
    test('We watched the footie match for a while.',()=>{
        let text = "We watched the footie match for a while."
        assert.equal(translator.translation(text,"british-to-american"),'We watched the <span class="highlight">soccer</span> match for a while.')
       })

    //4
    test('Paracetamol takes up to an hour to work.',()=>{
        let text = "Paracetamol takes up to an hour to work."
        assert.equal(translator.translation(text,"british-to-american"),'<span class="highlight">Tylenol</span> takes up to an hour to work.')
       })
   })
});
