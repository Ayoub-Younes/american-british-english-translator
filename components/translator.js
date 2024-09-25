const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
let capFirst = (str) => {
 return str.charAt(0).toUpperCase() + str.slice(1);
}
class Translator {
 //TIME
    time(text,locale){
        let str = text
        if (locale == "american-to-british"){
          let regex = /\d\d?:\d\d?/g
          let matchs = str.match(regex);
          if(matchs){
           let translate = matchs.map(str =>  str.replace(':',".")).map(str => `<span class="highlight">${str}</span>`)
           for(let i = 0; i < matchs.length; i++){
            str = str.replace(matchs[i],translate[i])
           }
          }
        }
        if (locale == "british-to-american"){
          let regex = /\d\d?.\d\d?/g
          let matchs = str.match(regex);
          if(matchs){
           let translate = matchs.map(str =>  str.replace('.',":")).map(str => `<span class="highlight">${str}</span>`)
           for(let i = 0; i < matchs.length; i++){
           str = str.replace(matchs[i],translate[i])
           }
          }
        }
      return str
      }
      
 //TITLE
    title(text,locale){
        let str = text
        let americanTitlles = Object.keys(americanToBritishTitles)
        let britishTitlles = Object.values(americanToBritishTitles)
        if (locale == "american-to-british"){
          let americanTitllesReg = americanTitlles.map(str => str.replace(".",'\\.')).map(str => `(\\W+|^)${str}`)
          for(let i = 0; i < americanTitllesReg.length; i++){
            let matchs = str.match(new RegExp(americanTitllesReg[i],'ig'))
            if(matchs){
              let translate = matchs.map(str => str.toLowerCase()).map(str =>  str.replace(americanTitlles[i],`<span class="highlight">${capFirst(britishTitlles[i])}</span>`))
              for(let j = 0; j < matchs.length; j++){
                str = str.replace(matchs[j],translate[j])
              }
             }
          }
        }
        if (locale == "british-to-american"){
          let britishTitllesReg = britishTitlles.map(str => `(\\W+|^)${str}(\\W+|$)`)
          for(let i = 0; i < britishTitllesReg.length; i++){
            let matchs = str.match(new RegExp(britishTitllesReg[i],'ig'))
            if(matchs){
              let translate = matchs.map(str => str.toLowerCase()).map(str =>  str.replace(britishTitlles[i], `<span class="highlight">${capFirst(americanTitlles[i])}</span>`))
              for(let j = 0; j < matchs.length; j++){
                str = str.replace(matchs[j],translate[j])
              }
             }
          }
          }
    
      return str
      }

 //WORDS
   aOnly(text,locale){
    let str = text
    let aToB = Object.keys(americanOnly)
    let bToA = Object.values(americanOnly)
    if (locale == "american-to-british"){
      let aToBReg = aToB.map(str => `(\\W+|^)${str}(\\W+|$)`)
      for(let i = 0; i < aToBReg.length; i++){
        let matchs = str.match(new RegExp(aToBReg[i],'ig'))
        if(matchs){
          let translate = matchs.map(str => str.toLowerCase()).map(str =>  str.replace(aToB[i],`<span class="highlight">${bToA[i]}</span>`))
          for(let j = 0; j < matchs.length; j++){
            str = str.replace(matchs[j],translate[j])
          }
         }
      }
    }

  return str
  }

  bOnly(text,locale){
    let str = text
    let bToA = Object.keys(britishOnly)
    let aToB = Object.values(britishOnly)
    if (locale == "british-to-american"){
      let bToAReg = bToA.map(str => `(\\W+|^)${str}(\\W+|$)`)
      let matchs = []
      let translate = []
      for(let i = 0; i < bToAReg.length; i++){
        let match = str.match(new RegExp(bToAReg[i],'ig'))
        if(match){matchs = matchs.concat(match); this.change = true}
      }
        if(matchs && matchs[0]){
          console.log('MATCHS',matchs)
         }
      translate = matchs.map(str => str.toLowerCase()).map(str =>  {
        let str2 = str.replaceAll(/[^a-zA-Z\d\s_]/g,"")
        str2 = str2.replaceAll(/^\s|\s$/g,"")
        let i = bToA.indexOf(str2)
        return str.replace(bToA[i],`<span class="highlight">${aToB[i]}</span>`)
      })
      for(let j = 0; j < matchs.length; j++){
        str = str.replace(matchs[j],translate[j])
      }
    }
  

  return str
  }
//SPELLING
spell(text,locale){
  let str = text
  let aToB = Object.keys(americanToBritishSpelling)
  let bToA = Object.values(americanToBritishSpelling)
  if (locale == "american-to-british"){
    let aToBReg = aToB.map(str => `(\\W+|^)${str}(\\W+|$)`)
    for(let i = 0; i < aToBReg.length; i++){
      let matchs = str.match(new RegExp(aToBReg[i],'ig'))
      if(matchs){
        let translate = matchs.map(str => str.toLowerCase()).map(str =>  str.replace(aToB[i],`<span class="highlight">${bToA[i]}</span>`))
        for(let j = 0; j < matchs.length; j++){
          str = str.replace(matchs[j],translate[j])
        }
        this.change = true
       }
    }
  }
  if (locale == "british-to-american"){
    let bToAReg = bToA.map(str => `(\\W+|^)${str}(\\W+|$)`)
    for(let i = 0; i < bToAReg.length; i++){
      let matchs = str.match(new RegExp(bToAReg[i],'ig'))
      if(matchs){
        let translate = matchs.map(str => str.toLowerCase()).map(str =>  str.replace(bToA[i],`<span class="highlight">${aToB[i]}</span>`))
        for(let j = 0; j < matchs.length; j++){
          str = str.replace(matchs[j],translate[j])
        }
        this.change = true
       }
    }
  }


return str
}
translation(text,locale){
  return this.bOnly(this.aOnly(this.spell(this.title(this.time(text,locale),locale),locale),locale),locale)
}
}

module.exports = Translator;


