JSON.utils = {
  format: "\t",

  replacer: function(key, value) {
    function trim(text) {
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      text = text == null ? "" : (text + "").replace(rtrim, "");
      return text;
    }
    return typeof this[key] === "string" ? trim(value) : value;
  },
  parse: function(string, replacer) {
    return JSON.parse(string, replacer);
  },
  stringify: function(obj, replacer, space) {
    return JSON.stringify(obj, replacer, space);
  },
  trimedStringify: function(obj) {
    return this.stringify(obj, this.replacer);
  }
};

const trimFields = obj => {
  var json = JSON.utils.trimedStringify(obj);
  json = JSON.utils.parse(json);
  return json;
};

export { trimFields };
