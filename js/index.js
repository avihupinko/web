
function initTable(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            updateTable(resp);
        } else if (this.status != 200 && this.readyState == 4) {
            alert("Error in request")
        }
    };

    xhttp.open("GET", "http://localhost:4000/offers" + (url !== "" ? '?' + url : ""), true);
    xhttp.send();
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

function submitForm(){
    var os = document.getElementById('Platform').value;
    var lt = document.getElementById('lt').value;
    var gt = document.getElementById('gt').value;

    var url = "";
    if (os !== ""){
       url += "&os=" + os;
    }
    if (lt !== ""){
        url += "&lt=" + lt;
    }
    if (gt !== ""){
        url += "&gt=" + gt;
    }

    initTable(url.substring(1,url.length));
}

function updateTable(offers) {
    var rows = '';
    offers.forEach(function (offer){
        rows += '<tr class="row100">'+
            '<td class="column100 column1" data-column="column1">'+offer.id+'</td>'+
            '<td class="column100 column2" data-column="column2">'+offer.platform+'</td>'+
            '<td class="column100 column3" data-column="column3">'+offer.country+'</td>'+
            '<td class="column100 column4" data-column="column4">'+offer.payout+'</td>'+
            '<td class="column100 column5" data-column="column5">'+offer.click_url+'</td>'+
            '<td class="column100 column6" data-column="column6">'+offer.currency+'</td>'+
            '<td class="column100 column7" data-column="column7">'+offer.Android_package_name+'</td>'+
            '<td class="column100 column8" data-column="column8">'+offer.appstore_url+'</td>'+
            '<td class="column100 column9" data-column="column9">'+offer.ios_bundle_id+'</td>'+
            '<td class="column100 column10" data-column="column10">'+offer.estimated_hops+'</td>'+
            '<td class="column100 column11" data-column="column11">'+(offer.device_id_required ? true : false )+'</td>'+
            '<td class="column100 column12" data-column="column12">'+formatDate(new Date (offer.pulled_date))+'</td>'+
            '</tr>';
    });
    document.getElementById('offers').innerHTML = rows;
}

document.body.onload = function () {
  initTable("");
};