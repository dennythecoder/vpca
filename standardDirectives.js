module.exports = {

  directives:[
    "v-text",
    "v-html",
    "v-if",
    "v-else",
    "v-else-if",
    "v-for",
    "v-on",
    "v-bind",
    "v-model",
    "v-pre",
    "v-cloak",
    "v-once"
  ],
  is(directive){
    for(let i = 0; i < this.directives.length; i++){
      if(this.directives[i] === directive){
        return true;
      }
    }
    return false;
  },
  createDirectiveArrayMap(){
    let map = Object.create(null);
    this.directives.forEach(d=>map[d] = []);
    return map;
  }
};