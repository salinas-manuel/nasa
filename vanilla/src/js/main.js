var apod = {
  // Create a random apodDate
  randomDate: function(start, end){
    //Randomizes the date
    let date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    // Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    if(m < 10){
      m = '0' + m;
    }

    if(d < 10){
      d = '0' + d;
    }

    return `${y}-${m}-${d}`;
  },

  buildDOM: function(result){

    document.getElementById('apodTitle').innerHTML=result.title;

    if(result.media_type === 'video'){
      document.getElementById('apodImg').style.display = 'none';
      document.querySelector('#apodVideo > iframe').setAttribute('src', result.url).style = 'display:show';
    }else{
      document.getElementById('apodVideo').style.display = 'none';
      document.querySelector('#apodImg').setAttribute('src', result.url);
      document.querySelector('#apodImg').setAttribute('alt', result.title);
    }

    document.getElementById('apodCopyright').innerHTML = result.copyright;
    document.getElementById('apodDate').innerHTML = result.date;
    document.getElementById('apodDesc').innerHTML = result.explanation;

  },

  getRequest: function(){
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key="
     + nasaKey
     + '&date=' + date;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function () {
      if(xhr.status == 200){
        _this.buildDOM(JSON.parse(xhr.response));
      }else{
        console.log(xhr);
      }
    };
    /*xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK)
        _this.buildDom(xhr.responseText);
        //console.log(xhr.responseText); // 'This is the returned text.'
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    };*/

    /*    $.ajax({
          url: url
        }).done(function(result){
          _this.buildDom(result);
        }).fail(function(result){
          console.log(result);
        });*/


  },
  //Initialization method.
  init: function() {
    this.getRequest();
  }
};

apod.init();

document.getElementById('btnRandom').addEventListener('click', function(){
  apod.getRequest();
});
