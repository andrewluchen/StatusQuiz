Parse.initialize("ONeIYsbSCtIJg6bo0M823t6Z8ZqmqEM4Zfgh2U5a", "A1lJ2mF6YV48qcO5KBkQ1XCEC2BDF3mAt1MlqqlB");

var prevPosts = [];
var postslist = null;
var chosen = 10;
var alreadyChosen = false;
var score = 0;

function updateText() {
  alreadyChosen = false;
  $('#panel1').toggleClass('falsebox',false);
  $('#panel1').toggleClass('truebox',false);
  $('#panel2').toggleClass('falsebox',false);
  $('#panel2').toggleClass('truebox',false);
  $('#panel3').toggleClass('falsebox',false);
  $('#panel3').toggleClass('truebox',false);
  $('#panel4').toggleClass('falsebox',false);
  $('#panel4').toggleClass('truebox',false);
  var arr = [];
  for(var i = 0; i < 4; i++) {
    var addpost = function(){
      arr[i] = postslist[Math.floor((Math.random() * postslist.length))];
      for(var j = 0;j<i;j++){
	if(arr[i].nameid === arr[j].nameid){
	  addpost();
	}
      }
    };
    addpost();
  }
  chosen = Math.floor((Math.random() * 4));
  for(var k = 0;k<prevPosts.length;k++){
      if(arr[chosen].postid===prevPosts[k])
	chosen = Math.floor((Math.random() * 4));
  }
  prevPosts.push(chosen);
  var message = arr[chosen].message;
  $('#statusPost').text(message);
  $('#img1').attr('src',"https://graph.facebook.com/" + arr[0].nameid + "/picture?type=large");
  $('#name1').text(arr[0].name);
  $('#img2').attr('src',"https://graph.facebook.com/" + arr[1].nameid + "/picture?type=large");
  $('#name2').text(arr[1].name);
  $('#img3').attr('src',"https://graph.facebook.com/" + arr[2].nameid + "/picture?type=large");
  $('#name3').text(arr[2].name);
  $('#img4').attr('src',"https://graph.facebook.com/" + arr[3].nameid + "/picture?type=large");
  $('#name4').text(arr[3].name);
  $('#next').prop('disabled', true);
}

function correctAns(num){
  if(!alreadyChosen){
      if(num===chosen){
	if(num===0){
	  $('#panel1').toggleClass('truebox',true);
	}
	else if(num===1){
	  $('#panel2').toggleClass('truebox',true);
	}
	else if(num===2){
	  $('#panel3').toggleClass('truebox',true);
	}
	else if(num===3){
	  $('#panel4').toggleClass('truebox',true);
	}
	score+=10;
	
      }
      else if(num!==chosen){
	if(num===0){
	  $('#panel1').toggleClass('falsebox',true);
	}
	else if(num===1){
	  $('#panel2').toggleClass('falsebox',true);
	}
	else if(num===2){
	  $('#panel3').toggleClass('falsebox',true);
	}
	else if(num===3){
	  $('#panel4').toggleClass('falsebox',true);
	}
	if(chosen===0){
	  $('#panel1').toggleClass('truebox',true);
	}
	else if(chosen===1){
	  $('#panel2').toggleClass('truebox',true);
	}
	else if(chosen===2){
	  $('#panel3').toggleClass('truebox',true);
	}
	else if(chosen===3){
	  $('#panel4').toggleClass('truebox',true);
	}
	score-=5;
      }
    }
    $('#scorelabel').text(score);
    $('#next').prop('disabled', false);
    alreadyChosen = true;
    chosen = 10;
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

