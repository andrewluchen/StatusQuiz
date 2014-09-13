Parse.initialize("ONeIYsbSCtIJg6bo0M823t6Z8ZqmqEM4Zfgh2U5a", "A1lJ2mF6YV48qcO5KBkQ1XCEC2BDF3mAt1MlqqlB");

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

