//FIELDS ---------------------------------------------------------------------------------------------------
//Tumblr APi Junk - Authenticate via API Key
var TUMBLR_KEY = 'k6DUG106XWBV2bBc7tUBH8cBcU1s6K8cU0Ft1cRgz4B8fBpq2J';
var posts = {};
var images;

window.onload = init;

//INIT -------------------------------------------------------------------------------------------------------
function init() 
{
    console.log("tumblr.js loaded");
    
    //button event listeners
    document.querySelector("#search").onclick = search;
  }

//HELPER FUNCTIONS ------------------------------------------------------------------------------------------
function search()
{
    console.log("button pressed");
    
    //re structure search term to account for spaces
    var searchTerm = document.querySelector("#searchterm").value; //get search term
    searchTerm = searchTerm.trim(); //remove trailing spaces
    if(searchTerm.length < 1) return; //bail out if its a blank search
    searchTerm = encodeURI(searchTerm); //get ride fo sapces
    
    //switch statement for special searches
    switch(searchTerm)
    {
        case "shit%20post": //WE WANT THE SHIT POSTS
            //run ajax json request for data
            $.ajax({
                url: "https://api.tumblr.com/v2/blog/shitpostgenerator.tumblr.com/posts/text?api_key=" + TUMBLR_KEY,
                dataType: 'jsonp',
                data:
                    'limit = 50',
                success: getShitPost
            });
                    break;
        default:
            //run ajax json request for data
            $.ajax({
                url: "https://api.tumblr.com/v2/tagged?tag=" + searchTerm + "&?limit=200" + "&api_key=" + TUMBLR_KEY,
                dataType: 'jsonp',
                data:
                    'limit = 50',
                success: getAudio
            });
            break;
    }
    
    
}

function getShitPost(obj)
{
    //shitpostgenerator.tumblr.com
     // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    console.log("getting shit posts");
    
    //loop through data and save all the shit posts
    var html = "<div>";
    var posts = obj.response.posts; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        var summary = post.body;
        var link = post.source_url;

        //print in console image and add its url to list on page
        html += "<div id = 'post'>";
        html += "<a href = \"" + link + "\">" + summary +  "</a></p>";
        html += "</div>";
        
        console.log(i);   
    }
     html += "</div>";
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}

function getAudio(obj)
{
    // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    console.log("getting audio posts");
    
    //loop through data and save all the images
    var html = "<div>";
    var posts = obj.response; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        //check if its a photo, if not bail
        if(post.type == "audio")
        {
            var summary = post.summary;
            var link = post.source_url;

            //print in console image and add its url to list on page
            html += "<div id = 'post'>";
            html += "<a href = \"" + link + "\">" + summary +  "</a></p>";
            html += "</div>";
        }
        console.log(i);
   
    }
     html += "</div>";
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}

function getText(obj)
{
    // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    console.log("getting text posts");
    
    //loop through data and save all the images
    var html = "<div>";
    var posts = obj.response; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        //check if its a photo, if not bail
        if(post.type == "text")
        {
            var summary = post.body;
            var link = post.post_url;

            //print in console image and add its url to list on page
            html += "<div id = 'post'>";
            html += "<a href = \"" + link + "\">" + summary +  "</a></p>";
            html += "</div>";
        }
        
        
    }
     html += "</div>";
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}

function getImages(obj)
{
    
    // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    console.log("getting image posts");
    
    //loop through data and save all the images
    var html = "<div>";
    var posts = obj.response; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        //check if its a photo
        if(post.type == "photo")
        {
            var summary = post.summary;
            var imagePerma = post.image_permalink;
            var photo = post.photos[0].original_size; //get photo object

            //print in console image and add its url to list on page
            html += "<div id = 'post'>";
            html += "<p><img src = \"" + photo.url + "\"></img> <br />";
            html += "<a href = \"" + imagePerma + "\">" + summary +  "</a></p>";
            html += "</div>";

            console.log(i);
        }     
    }
    
    html += "</div>";
    
    console.log(html);
    
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}