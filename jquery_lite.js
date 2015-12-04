(function(){
      var functionQueue = [];
      document.addEventListener("DOMContentLoaded", function(){
        functionQueue.forEach(function(fn) {
          fn();
        });
      });
  window.$l = function(arg){
    if (typeof arg === "function") {
      if (document.readyState === "complete") {
        arg();
      } else {
        functionQueue.push(arg);
      }
    }

    if (typeof arg === "string") {
      var doc = document.querySelectorAll(arg);
      var array = Array.prototype.slice.call(doc);
      return new DOMNodeCollection(array);
    }

    if (typeof arg === "object") {
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }

    }

  };

  window.$l.extend = function () {
    var args = [].slice.call(arguments, 1);
    var target = arguments[0];
    var attributes = Object.keys(target);

    for( var x = 0; x< args.length; x++) {
      var otherAttr = Object.keys(args[x]);
      for( var y = 0 ; y < otherAttr.length; y++) {
        target[otherAttr[y]] = args[x][otherAttr[y]];
      }
    }
    return target;
  };

  window.$l.ajax = function(userOptions){

    var options = {
      type: 'GET',
      success: function(response){console.log(response);},
      error: function() {console.log("default error!");},
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0",
      data: {string: "this is data"},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    if(typeof userOptions !== "undefined") {
      window.$l.extend(options, userOptions);
    }

    var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
             if(xmlhttp.status == 200){
                var response = xmlhttp.responseText;
                console.log("Success");
                options.success(response);
             }
             else if(xmlhttp.status == 400) {
                alert('There was an error 400');
                options.error();
             }
             else {
                 alert('something else other than 200 was returned');
             }
          }
      };

      xmlhttp.open(options.type,
        options.url);
      xmlhttp.setRequestHeader("Content-type", options.contentType);
      xmlhttp.send(options.data);
};


  var DOMNodeCollection = function (array) {
    this.array = array;
  };

  DOMNodeCollection.prototype.html = function (){
    if (arguments.length > 0) {
      var el = arguments[0];
      this.array.forEach(function(tag){
        tag.innerHTML = el;
      });
    }
    else {
      return this.array[0].innerHTML;
    }
  };


  DOMNodeCollection.prototype.empty = function() {
    this.html("");
    this.array = [];
  };

  DOMNodeCollection.prototype.append = function (arg) {
    var type;
    if (typeof arg === "string") {
      this.array.forEach(function(el) {
        el.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection){
      this.array.forEach(function(el) {
        arg.array.forEach(function(node) {
          el.appendChild(node);
        });
      });
    } else {
      this.array.forEach(function(el) {
        el.appendChild(arg.cloneNode(true));
      });
    }

  };

  DOMNodeCollection.prototype.attr = function (attribute, value) {
    if (typeof value === 'undefined'){
      return this.array[0].getAttribute(attribute);
    } else {
      this.array.forEach(function(node){
        node.setAttribute(attribute, value);
      });
    }
  };

  DOMNodeCollection.prototype.addClass = function (value) {
    this.attr("class", value);
  };

  DOMNodeCollection.prototype.removeClass = function () {
    this.array.forEach(function(node){
      node.removeAttribute("class");
    });
  };

  DOMNodeCollection.prototype.children = function () {
    var childrenCollection = new DOMNodeCollection([]);
    this.array.forEach(function(node){
    var slicedChildren = [].slice.call(node.children);
      childrenCollection.array = childrenCollection.array
      .concat(slicedChildren);

    });

    return childrenCollection;
  };

  DOMNodeCollection.prototype.parent = function() {
    var parentCollection = new DOMNodeCollection([]);

    this.array.forEach(function(node){
      parentCollection.array.push(node.parentNode);
    });

    return parentCollection;
  };

  DOMNodeCollection.prototype.find = function(selector) {
    var selectedCollection = new DOMNodeCollection([]);

    this.array.forEach(function(node) {
      var slicedCollection = [].slice.call(node
      .querySelectorAll(selector));
      selectedCollection.array = selectedCollection.array.concat(slicedCollection);
    });

    return selectedCollection;
  };

  DOMNodeCollection.prototype.remove = function() {
    this.array.forEach(function(child) {
      child.parentNode.removeChild(child);
    });
  };

  DOMNodeCollection.prototype.on = function (type, listener) {
    this.array.forEach(function(node){
      node.addEventListener(type, listener);
    });
  };

  DOMNodeCollection.prototype.off = function (type, listener) {
    this.array.forEach(function(node){
      node.removeEventListener(type, listener);
    });
  };

  console.log(window.$l(function() {console.log("good morning!"); }));
  // console.log(window.$l("div"));
  // console.log(window.$l("li").children());
  // console.log(window.$l("li").parent());
  // console.log(window.$l("body").find(".cool"));
  // console.log(window.$l("ul").append("p"));
  // console.log(window.$l("li").remove());
  // console.log(window.$l("li").on("click", function() {
  //   console.log("Hello World");
  // }));
  console.log(window.$l("div").attr("class"));

})();
