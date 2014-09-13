Parse.initialize("ONeIYsbSCtIJg6bo0M823t6Z8ZqmqEM4Zfgh2U5a", "A1lJ2mF6YV48qcO5KBkQ1XCEC2BDF3mAt1MlqqlB");

function updateText(postslist) {
  var arr = [];
  for(var i = 0; i < 4; i++) {
    arr[i] = postslist[Math.floor((Math.random() * postslist.length))];
  }
  var chosen = Math.floor((Math.random() * 4));
  var message = arr[chosen].message + " answer:" + arr[chosen].name;
  var person1 = arr[0].name;
  var person2 = arr[1].name;
  var person3 = arr[2].name;
  var person4 = arr[3].name;
  $('#statusPost').text(message);
  $('#pic1').text(person1);
  $('#pic2').text(person2);
  $('#pic3').text(person3);
  $('#pic4').text(person4);
}

function test(){
  var TestObject = Parse.Object.extend("TestObject");

  var testObject = new TestObject();
  testObject.save({foo: "bar"},
    {
      success: function(object) {
        alert("success");
      },
      error: function(model, error) {
        alert("error");
      }
    }
  );
}

