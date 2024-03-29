// $(function() {
//     var selectedClass = "";
//     $(".filter").click(function() {
//         selectedClass = $(this).attr("data-rel");
//         $("#gallery").fadeTo(100, 0.1);
//         $("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
//         setTimeout(function() {
//             $("." + selectedClass).fadeIn().addClass('animation');
//             $("#gallery").fadeTo(300, 1);
//         }, 300);
//     });
// });

// $.getJSON('/data.json', function(data) {
//     console.log(data)
// });
    
async function fetchLocal(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest
      xhr.onload = function() {
        resolve(new Response(xhr.responseText, {status: xhr.status}))
      }
      xhr.onerror = function() {
        reject(new TypeError('Local request failed'))
      }
      xhr.open('GET', url)
      xhr.send(null)
    })
  };
  
var globPage =1;

function checkUrl(){
  let url = window.location.href;
  let pageNumber = getPage(url);
  if(pageNumber != window.location.href){
    if(pageNumber != '' && parseInt(pageNumber)>=1){
        var new_page = Number(pageNumber);
        globPage = new_page;
        var npage = Number(pageNumber) + 1;
        var cpage = Number(pageNumber);
        var prep = Number(pageNumber) - 1;
        changePage(new_page, npage, prep);
        fetchData(pageNumber, npage, prep);
    }
    getURL('index.html?page='+pageNumber);
  }
}

function getPage(url){
    let index = url.indexOf('=');
    let page = url.slice(index+1);
    return page;
}


function popover(name) {
    console.log(name + 'img name')
    var imgshow = '<img src="img/' + name + '" alt="" class="img-auto">';

    var modal_gellary = document.getElementById('modal-head');

    modal_gellary.innerHTML = imgshow;

}

let curpage = Number(document.getElementById('currentpage').innerHTML);
let npage = curpage + 1;
let prepage = curpage - 1;
fetchData(curpage, npage, prepage);


var images 
function fetchData(current, next, pre) {

    console.log(current + "page")

    fetch('https://api.jsonbin.io/b/5ddd31eb264e8f39a7bc697c',
        {
            "headers": {"content-type": "application/json"},
            
        }
    ).then(function(resp) {
        return resp.json();

    }).then(function(data) {
        images = data
        console.log(images.length)

        let i;
        let output;
        

        let n = Number(current) * 12;
        let start = (Number(current) * 12)-11;
        let max = start + 12;
        console.log(start + 'star')
        console.log(max + 'max')
        console.log(data[5].name);
        // console.log(data.find(name = "img1.jpg"))
        
        let curentImg
        for (i = start; i < max; i++) {
            curentImg = data.filter(obj => {
                return obj.name == 'img'+i + '.jpg'
              })
              console.log(curentImg)
            output += '<div class="mb-3 pics animation all 2"><img class="img-fluid" onclick="popover(&#39;' + curentImg[0].name + '&#39;);" data-toggle="modal" data-target="#myModal" src="img/' + curentImg[0].name + '"></div>';
        }

        var gallery = document.getElementById('gallery');

        gallery.innerHTML = output;

        changePage(current, next, pre);

    });

}

// function checkImg(name, data){
//     return name == data[]
// }

function changePage(current, nextpage, prepage) {
    current = globPage;
    prepage = parseInt(current) - 1;
    nextpage = parseInt(current) + 1;

    var pagin = document.getElementById('pagin');

    let newpage;
    if (prepage <= 0) {
        newpage =
            '<li class=" disabled">' +
            '<a class="page-link nextAndPrev" onclick="prev(' + 1 + ');" tabindex="">&laquo;</a></li>' +
            '<li class=" page-link" id="currentpage">' + current + '</li>' +
            '<li class=""><a class="page-link" href="" onclick="nextpage(' + nextpage + ')">2</a></li>' +
            '<li class=""><a class="page-link" href="" onclick="nextpage(' + parseInt(3) + ')">3</a></li>' +
            '<li class=""><a class="page-link nextAndPrev" href="" onclick="nextpage(' + images.length/12  + ')">&raquo;</a></li>' +
            '<li class="" style="background-color:transparent !important;border-radius: 20px !important;"><input type="tel" style="width:50px !important" id="got_page" value=""></li>'+
            '<button class=" my-btn"  onclick="gotoPage()">Go</button>';
            
    } else {
        newpage = '<li class=" ">' +
            '<a class="page-link nextAndPrev" onclick="prev(' + 1 + ');" tabindex="">&laquo;</a></li>' +
            '<li class="">' +
            '<a class="page-link" onclick="prev(' + prepage + ');" tabindex="">'+ prepage +'</a></li>' +
            '<li class="page-link" id="currentpage">' + current + '</li>' +
            '<li class=""><a class="page-link" style="color:red" href="" onclick="nextpage(' + nextpage + ')">' + nextpage + '</a></li>' +
            '<li class=""><a class="page-link nextAndPrev" href="" onclick="nextpage(' + images.length/12 + ')">&raquo;</a></li>'+
            '<li class="" style="background-color:transparent !important;border-radius: 20px !important;"><input type="tel" style="width:50px !important" id="got_page" value=""></li>'+
            '<button class="my-btn" onclick="gotoPage()">Go</button>';
    }

    pagin.innerHTML = newpage;
}

function prev(page) {
    var prpage = Number(page) - 1;
    var ncpage = Number(page);
    var nxtp = Number(page) + 1;
    changePage(ncpage, nxtp, prpage);
    fetchData(ncpage, nxtp, prpage);
    getURL('index.html?page='+ncpage);
    checkUrl();
}

function nextpage(page) {
    var npage = Number(page) + 1;
    var cpage = Number(page);
    var prep = Number(page) - 1;
    changePage(page, npage, prep);
    fetchData(page, npage, prep);
    getURL('index.html?page='+cpage);
    checkUrl();
}


function gotoPage() {
    var page = document.getElementById('got_page').value;
    if(page != '' && parseInt(page)>=1){
        var new_page = Number(page);
        var npage = Number(page) + 1;
        var cpage = Number(page);
        var prep = Number(page) - 1;
        changePage(new_page, npage, prep);
        fetchData(page, npage, prep);
        getURL('index.html?page='+page);
    }
    
    checkUrl();
    

}

function getURL(currentpage) {
    history.pushState({}, null,  currentpage);

}
checkUrl();