(function(){
    window.titleInterval = null;
      var title = "PAY WITH A ";
      var msn = ['LIKE' , 'POST', 'REEL', 'COMMENT', 'SHARE', 'SAVE' , 'MENTION'];
      var count = 0;
      window.titleInterval = setInterval(function() {
        document.title = title + msn[count];
        count += 1;
        if(count == msn.length) count = 0;
        }, 2000); }
)();