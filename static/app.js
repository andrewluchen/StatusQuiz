Parse.initialize("ONeIYsbSCtIJg6bo0M823t6Z8ZqmqEM4Zfgh2U5a", "A1lJ2mF6YV48qcO5KBkQ1XCEC2BDF3mAt1MlqqlB");

function updateText(postlist) {
  message = postlist[0].message
  person1 = postlist[0].name
  person2 = postlist[1].name
  person3 = postlist[2].name
  person4 = postlist[3].name
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

