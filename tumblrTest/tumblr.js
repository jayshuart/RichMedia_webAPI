//FIELDS ---------------------------------------------------------------------------------------------------
//Tumblr APi Junk - Authenticate via API Key
var TUMBLR_KEY = 'k6DUG106XWBV2bBc7tUBH8cBcU1s6K8cU0Ft1cRgz4B8fBpq2J';
var posts = {};
var images;

window.onload = init;

//INIT -------------------------------------------------------------------------------------------------------
function init() 
{
    //button event listeners
    document.querySelector("#search").onclick = search;
  }

//HELPER FUNCTIONS ------------------------------------------------------------------------------------------
function search()
{
    //get search term
    var searchTerm = document.querySelector("#searchterm").value;
    
    //run ajax json request for data
    $.ajax({
        url: "https://api.tumblr.com/v2/blog/notquitedocile.tumblr.com/posts/photo?" + "api_key=" + TUMBLR_KEY + "&tag=" + searchTerm,
        dataType: 'jsonp',
        success: jsonGetImages
    });
}

function jsonGetImages(obj)
{
    
    // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    //start making html doc
    var html = "<div> ";
    
    //loop through data and save all the images
    var posts = obj.response.posts; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        var summary = post.summary;
        var imagePerma = post.image_permalink;
        var photo = post.photos[0].original_size; //get photo object
        
        //print in console image and add its url to list on page
        console.log(photo.url);
        html += "<p><img src = \"" + photo.url + "\"></img> <br />";
        html += "<a href = \"" + imagePerma + "\">" + summary +  "</a></p>";
        
    }
    
    //close html doc
    html += "</div>";
    
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}