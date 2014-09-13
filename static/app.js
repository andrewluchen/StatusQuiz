Parse.initialize("ONeIYsbSCtIJg6bo0M823t6Z8ZqmqEM4Zfgh2U5a", "A1lJ2mF6YV48qcO5KBkQ1XCEC2BDF3mAt1MlqqlB");

function updateText(postslist) {
  var arr = [];
  for(var i = 0; i < 4; i++) {
    arr[i] = postslist[Math.floor((Math.random() * postslist.length))];
  }
  var chosen = Math.floor((Math.random() * 4));
  var message = arr[chosen].message + " answer:" + arr[chosen].name;
  $('#statusPost').text(message);
  $('#pic1').append('<img src="https://graph.facebook.com/' + arr[0].nameid + '/picture?type=large">');
  $('#name1').text(arr[0].name);
  $('#pic2').append('<img src="https://graph.facebook.com/' + arr[1].nameid + '/picture?type=large">');
  $('#name2').text(arr[1].name);
  $('#pic3').append('<img src="https://graph.facebook.com/' + arr[2].nameid + '/picture?type=large">');
  $('#name3').text(arr[2].name);
  $('#pic4').append('<img src="https://graph.facebook.com/' + arr[3].nameid + '/picture?type=large">');
  $('#name4').text(arr[3].name);
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

