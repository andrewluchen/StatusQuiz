Parse.initialize("ONeIYsbSCtIJg6bo0M823t6Z8ZqmqEM4Zfgh2U5a", "A1lJ2mF6YV48qcO5KBkQ1XCEC2BDF3mAt1MlqqlB");

var user = Parse.User.current();
updateScores();

function onLogin() {
  console.log('Welcome!  Fetching your information.... ');
  
  FB.api("/me", function (response) {
    if (response && !response.error) {
      user.set("fbId", response.id);
      user.set("name", response.name);
      if(user.get("statusesShown" == 0)) {
        user.set("accuracy", 0);
      }
      user.save(); 
    }
    //console.log(response);
  });
  
  FB.api("/me/friends",
    function (response) {
      if (response && !response.error) {
        console.log("friends----");
        console.log(response);
      
        var ids = [];
        var query = new Parse.Query(Parse.User);
        var relation = user.relation("friendsUsingApp");
        //get size of dictionaries

        for (i = 0; i < response.data.length; i++) {
          ids[i] = response.data[i].id;
        }
        console.log(ids);
        console.log("gerodfksdjflsdjf");
        query.containedIn("fbId", ids);
        query.find({
          success: function(friends) {
            console.log(friends);
            console.log("SUCCESS");
            relation.add(friends);
            user.save();
          }	
        });
      }
    }
  );
  
  fetchStatuses();
}

function updateScores() {
  var relation = user.relation("friendsUsingApp");
  var collection = relation.query().descending("accuracy").collection();
  var str = '';
  str += "My score  :  " + user.get("accuracy") + "% accuracy<br><br>";
  collection.fetch({
    success: function(friends) {
      console.log("friendsUsingApp");
      console.log(friends)
      friends.each(function(object) {
        str += object.get("name") + "  :  " + object.get("accuracy") + "% accuracy<br>";
      });
      $('#scoreboard').html(str);
    },
    error: function(collection, error) {
      // The collection could not be retrieved.
    }
  });  
}

var pagesGrabbed = 0;
var postslist = [];

function fetchStatuses() {
  $('#statusPost').text("Loading your friends' statuses...");
  FB.api("/me/home", getPosts);
}

function getPosts(response){
  for (element in response.data){
    post = response.data[element]
    if(post.hasOwnProperty('message')&&!post.hasOwnProperty('to')&&!post.from.hasOwnProperty('category')){
      //console.log(post.from.name + ": " +post.message);  
      //console.log(post);
      postslist.push({name:post.from.name, nameid:post.from.id, message:post.message, postid:post.id});
    }
  }
  if(pagesGrabbed < 4){
    nextPage = response.paging.next;        
    pagesGrabbed++;
    $.get(nextPage, getPosts, "json");
  } else {
    updateText();
  }
}

var prevPosts = [];
var chosen = 10;
var alreadyChosen = true;
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
			user.increment("correctAnswers");
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
    user.increment("statusesShown");
    user.set("accuracy", Math.round(user.get("correctAnswers") / user.get("statusesShown") * 100));
		user.save();
	}
  $('#scorelabel').text(score);
  $('#next').prop('disabled', false);
  alreadyChosen = true;
  chosen = 10;
  updateScores();
}

