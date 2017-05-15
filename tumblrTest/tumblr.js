//FIELDS ---------------------------------------------------------------------------------------------------
//Tumblr APi Junk - Authenticate via API Key
var TUMBLR_KEY = 'k6DUG106XWBV2bBc7tUBH8cBcU1s6K8cU0Ft1cRgz4B8fBpq2J';
var posts = {};
var types;
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
    
    //re structure search term to account for spaces
    var searchTerm = document.querySelector("#searchterm").value; //get search term
    searchTerm = searchTerm.trim(); //remove trailing spaces
    if(searchTerm.length < 1) return; //bail out if its a blank search
    searchTerm = encodeURI(searchTerm); //get ride fo sapces
    
    //check for types
    if(document.querySelector("#postTypes").value == "")
    {
        //no given type do all
        types = ['text', 'photo', 'audio'];    
    }
    else
    {
        //save given post types
        var str = document.querySelector("#postTypes").value;
        str = str.trim(); //remove trailing spaces
        types = str.split(' ');
    }
    
    
    //switch statement for special searches
    switch(searchTerm)
    {
        case "!shitPost": //WE WANT THE SHIT POSTS
            //run ajax json request for data
            $.ajax({
                url: "https://api.tumblr.com/v2/blog/shitpostgenerator.tumblr.com/posts/text?api_key=" + TUMBLR_KEY,
                dataType: 'jsonp',
                data:
                    'limit = 50',
                success: getShitPost
            });
                    break;
            
        case "!sing":
            //run ajax json request for data
            $.ajax({
                url: "https://api.tumblr.com/v2/blog/favoritelittlelyrics.tumblr.com/posts/photo?api_key=" + TUMBLR_KEY,
                dataType: 'jsonp',
                success: getLyricImage
            });
            break;
        default:

            //run ajax json request for data
            $.ajax({
                url: "https://api.tumblr.com/v2/tagged?tag=" + searchTerm + "&?limit=200" + "&api_key=" + TUMBLR_KEY,
                dataType: 'jsonp',
                success: function(results){
                    getPost(results, types);
                }
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
         
    }
     html += "</div>";
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}

function getLyricImage(obj)
{
    // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    
    //loop through data and save all the shit posts
    var html = "<div>";
    var posts = obj.response.posts; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        var summary = post.summary;
        var link = post.post_url;
        var photo = post.photos[0].original_size; //get photo object

        //print in console image and add its url to list on page
        html += "<div id = 'post'>";
        html += "<img src = \"" + photo.url + "\"></img> <br />";
        html += "<a href = \"" + link + "\">" + summary +  "</a>";
        html += "</div>";   
    }
     html += "</div>";
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html; 
}

function getPost(obj, postTypes)
{
    // if there are no results, print a message and return
    if(obj.total_items == 0){
        var status = "No results found";
        document.querySelector("#dynamicContent").innerHTML = "<p><i>" + status + "</i><p>" + "<p><i>";
        $("#dynamicContent").fadeIn(500);
        return; // Bail out
    }
    
    
    
    //loop through data and save all the images
    var html = "<div>";
    var posts = obj.response; //all posts
    for (var i = 0; i < posts.length; i++){
        //save current image
        var post = posts[i];
        
        //check if the posts' type is within the given types
        var validPost = false;
        for(var x = 0; x < postTypes.length; x++)
        {
            if(postTypes[x] == post.type)
            {
                //its one of the ones we want
                validPost = true;
            }
        }
        
        //check if its a valid post - then get propper data
        if(validPost)
        {
            switch(post.type)
            {
                case 'text':
                    var summary = post.body;
                    var link = post.post_url;

                    //print in console image and add its url to list on page
                    html += "<div id = 'post'>";
                    html += "<a href = \"" + link + "\">" + summary +  "</a></p>";
                    html += "</div>";
                    break;
                    
                case 'audio':
                    var summary = post.summary;
                    var link = post.source_url;

                    //print in console image and add its url to list on page
                    html += "<div id = 'post'>";
                    html += "<a href = \"" + link + "\">" + summary +  "</a></p>";
                    html += "</div>";
                    break;
                    
                case 'photo':
                    var summary = post.summary;
                    var link = post.post_url;
                    var photo = post.photos[0].original_size; //get photo object

                    //print in console image and add its url to list on page
                    html += "<div id = 'post'>";
                    html += "<img src = \"" + photo.url + "\"></img> <br />";
                    html += "<a href = \"" + link + "\">" + summary +  "</a>";
                    html += "</div>";
                    break;
                    
                case 'quote':
                    break;
                    
                case 'link':
                    break;
                    
                case 'chat':
                    break;
                    
                case 'video':
                    break;
                    
                case 'answer':
                    break;
            }
        }
        
        
    }
     html += "</div>";
    //update dyanmic content
    document.querySelector("#dynamicContent").innerHTML = html;
}

