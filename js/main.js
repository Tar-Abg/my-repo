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
  
function checkUrl(){
  console.log(window.location.pathname);
}
checkUrl()

function popover(name) {
    var imgshow = '<img src="img/' + name + '" alt="" class="img-auto">';

    var modal_gellary = document.getElementById('modal-head');

    modal_gellary.innerHTML = imgshow;

}

let curpage = Number(document.getElementById('currentpage').innerHTML);
let npage = curpage + 1;
let prepage = curpage - 1;
fetchData(curpage, npage, prepage);



function fetchData(current, next, pre) {


    fetch('https://api.jsonbin.io/b/5ddd31eb264e8f39a7bc697c',
        {
            "headers": {"content-type": "application/json"},
            
        }
    ).then(function(resp) {
        return resp.json();

    }).then(function(data) {
        console.log(data.length)

        let i;
        let output;

        let n = Number(current) * 10;
        let start = Number(current - 1) * 10;
        for (i = start; i <= n; i++) {
            output += '<div class="mb-3 pics animation all 2"><img class="img-fluid" onclick="popover(&#39;' + data[i].name + '&#39;);" data-toggle="modal" data-target="#myModal" src="img/' + data[i].name + '"></div>';
        }

        var gallery = document.getElementById('gallery');

        gallery.innerHTML = output;

        changePage(current, next, pre);

    });

}

function changePage(current, nextpage, prepage) {

    var pagin = document.getElementById('pagin');

    let newpage;
    if (prepage <= 0) {
        newpage =
            '<li class=" disabled">' +
            '<a class="page-link" onclick="prev(' + 1 + ');" tabindex="">&laquo;</a></li>' +
            '<li class=" page-link" id="currentpage">' + current + '</li>' +
            '<li class=""><a class="page-link" href="#" onclick="nextpage(' + nextpage + ')">2</a></li>' +
            '<li class=""><a class="page-link" href="#" onclick="nextpage(' + parseInt(3) + ')">3</a></li>' +
            '<li class=""><a class="page-link" href="#" onclick="nextpage(' + 559 + ')">&raquo;</a></li>' +
            '<li class="" style="background-color:transparent !important;border-radius: 20px !important;"><input type="tel" style="width:50px !important" id="got_page" value=""></li>'+
            '<button class=" my-btn"  onclick="gotoPage()">Go</button>';
            
    } else {
        newpage = '<li class=" ">' +
            '<a class="page-link" onclick="prev(' + 1 + ');" tabindex="">&laquo;</a></li>' +
            '<li class="">' +
            '<a class="page-link" onclick="prev(' + prepage + ');" tabindex="">'+ prepage +'</a></li>' +
            '<li class="page-link" id="currentpage">' + current + '</li>' +
            '<li class=""><a class="page-link" href="#" onclick="nextpage(' + nextpage + ')">' + nextpage + '</a></li>' +
            '<li class=""><a class="page-link" href="#" onclick="nextpage(' + 559 + ')">&raquo;</a></li>'+
            '<li class="" style="background-color:transparent !important;border-radius: 20px !important;"><input type="tel" style="width:50px !important" id="got_page" value=""></li>'+
            '<button class="my-btn" onclick="gotoPage()">Go</button>';
    }

    pagin.innerHTML = newpage;
}

function prev(page) {
    console.log(page);
    var prpage = Number(page) - 1;
    var ncpage = Number(page);
    var nxtp = Number(page) + 1;
    changePage(ncpage, nxtp, prpage);
    fetchData(ncpage, nxtp, prpage);
    getURL(ncpage);
}

function nextpage(page) {
    // console.log(page);
    var npage = Number(page) + 1;
    var cpage = Number(page);
    var prep = Number(page) - 1;
    changePage(page, npage, prep);
    fetchData(page, npage, prep);
    getURL(cpage);
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
    }
    // getURL();

}
function getURL(currentpage) {
    var url= window.location.hostname;
    var a = history.pushState({}, null,  currentpage)
    // var fullUrl = window.location = url + currentpage;
    
    console.log(a)
}
getURL(curpage);