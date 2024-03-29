/**
 * @author Towns.cz
 * @fileOverview Information about Towns
 */
//======================================================================================================================



Pages.home={};

Pages.home.header='Towns 5';


/*<div style="position:absolute;width:calc(100% - 40px);text-align:right;">
<img src="media/image/languages/cs.png" onclick="changelanguage('cs')">
<img src="media/image/languages/en.png" onclick="changelanguage('en')">
</div>*/


Pages.home.content=`


  <h2 style="font-size:1.1em;text-align: center;">
<img src="media/image/icons/logo.png" alt="{{towns logo}}" width="100"/><br/>
{{home info}}</h2>



<p style="text-align: center;">
  {{home info subtitle}}

</p>


  <div class="loading" style="display: none" id="sendpress_loading">{{loading}}</div>
  <div class="success" style="display: none" id="sendpress_success">{{home subscribe success}}</div>
  <div class="error" style="display: none" id="sendpress_error">{{home subscribe error}}

    <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.

  </div>

  <form method="post" action="http://forum.towns.cz/" id="sendpress">
    <input type="hidden" name="sp_list" value="1390"/>
    <input type="hidden" name="sendpress" value="post" />

      <p style="text-align: center;">
        <b>{{form mail}}:</b>
        <input type="text" value="@" name="sp_email"/>

        <b>{{form your name}}:</b>
        <input type="text" value="" name="sp_firstname"/>

        <input value="{{form send}}" class="sendpress-submit" type="submit" id="submit" name="submit">
      </p>

      <!--<p name="lastname">
        <label for="email">Last Name:</label>
        <input type="text" value="" name="sp_lastname"/>
      </p>-->

  </form>


  <script>
    $(function() {
      $("#sendpress").submit( function() {

        $("#sendpress_success").hide();
        $("#sendpress_error").hide();
        $("#sendpress_loading").show();
        $.ajax({
            url: "http://blog.towns.cz/",
            type: "post",
            dataType: "json",
            data: $("#sendpress").serialize(),
            success: function(data) {

              $("#sendpress_loading").hide();
              if(data.success==true){
                $("#sendpress")[0].reset();
                $("#sendpress_success").show();

              }else{
                $("#sendpress_error").show();
              }

          }
        });
          return false;
      });
    });
  </script>


<p style="text-align: center;">
  {{home subscribe}}
  <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
  <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
  <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.
</p>


<hr>


<p style="text-align: center;">
  <b>{{home news from game}}</b>
</p>

<div id="feed" class="feed"></div>

  <script>


    $.get(feed_url, function (data) {



      var html='',
          limit=4;

      $(data).find("item").each(function () {
          if(limit<=0)return;
          limit--;

          var el = $(this);

          /*r("title      : " + el.find("title").text());
          r("author     : " + el.find("author").text());
          r("description: " + el.find("description").text());*/



         var authorname=el.find("creator").text();


          var author = false;

          authors.forEach(function(author_){
            if(author_.name==authorname){
              author=author_;
            }
          });



          html+=[
            '<a class="towns-window" href="'+el.find("link").text()+'" title="'+el.find("title").text()+'" target="_blank">',
              '<div class="feed_item">',
                '<div class="feed_title">'+el.find("title").text()+'</div>',
                '<div class="feed_description">',
                  author?'<img src="http://projects.towns.cz/authors/'+author.nick+'.jpg" alt="'+author.name+'" title="'+author.name+'" width="40" class="feed_author" />':'',
                  el.find("description").text(),
                '</div>',
              '</div>',
            '</a>'].join('');

      });

      $("#feed").html(html);
      uiScript();
    });
  </script>

  <hr>

<p style="text-align: center;">
  <b>{{projects}}</b><br>
  {{projects subtitle}}
</p>

<iframe src="http://projects.towns.cz/?only=1&amp;width=100%" width="100%" height="1500" frameborder="0" scrolling="0"></iframe>



`;

