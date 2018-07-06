
// Side navigation



function w3_open() {
    var x = document.getElementById("mySidebar");
    x.style.width = "100%";
    x.style.fontSize = "40px";
    x.style.paddingTop = "10%";
    x.style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

// Tabs
function openCity(evt, cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  var activebtn = document.getElementsByClassName("testbtn");
  for (i = 0; i < x.length; i++) {
      activebtn[i].className = activebtn[i].className.replace(" w3-dark-grey", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-dark-grey";
}

var mybtn = document.getElementsByClassName("testbtn")[0];


// Accordions
function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

// Slideshows
var slideIndex = 1;

function plusDivs(n) {
slideIndex = slideIndex + n;
showDivs(slideIndex);
}

function showDivs(n) {
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

showDivs(1);

// Progress Bars
function move() {
  var elem = document.getElementById("myBar");   
  var width = 5;
  var id = setInterval(frame, 10);
  function frame() {
    if (width == 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}


var all_lights = []; 

function getLightsTable(){
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", "http://192.168.0.109/api/TkF6jW5Ky6KiOKNHQ5HCcuN0FVns-Pvuyq9o3fnz", false); 
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(); 
  var input = JSON.parse(xhttp.responseText);
  var myTableDiv = document.getElementById("tablediv"); 
  var lights = []; 


  Object.keys(input.lights).forEach(function(key) {
  lights.push(input.lights[key])
  })


  /*for (var i = 0; i<lights.length; i++){
    element.innerHTML += JSON.stringify(lights[i].name) + "<br>"; 
  }*/
  myTableDiv.innerHTML = ""; 
  var table = document.createElement('TABLE');
  table.classList.add("w3-striped","w3-white","w3-table", "w3-half", "w3-border", "w3-card-4"); 
  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);


 var btns = new Array("w3-button w3-white w3-opacity w3-hover-opacity-off", 
      "w3-button w3-white w3-opacity w3-hover-opacity-off", 
      "w3-button w3-white w3-opacity w3-hover-opacity-off", 
      "w3-button w3-white w3-opacity w3-hover-opacity-off", 
      "w3-button w3-white w3-opacity w3-hover-opacity-off");

  var stock = new Array(); 

  for (var i = 0; i< lights.length; i++){
    stock[i] = new Array(JSON.stringify(lights[i].name)+ ", " + JSON.stringify(lights[i].modelid), JSON.stringify(lights[i].state.on)+  ", " + JSON.stringify(lights[i].state.reachable));
  
  }
  
    var t = document.createElement("TR"); 
    var th= document.createElement("TH"); 
    th.innerHTML ="Name, ID";
    t.appendChild(th); 
    var th1= document.createElement("TH"); 
    th1.innerHTML = "State, reachable"; 
    t.appendChild(th1); 
    var th2= document.createElement("TH"); 
    th2.innerHTML = "Change state"; 
    t.appendChild(th2); 
    var th3 = document.createElement("TH"); 
    th3.innerHTML = "dim light (0-100%)"; 
    t.appendChild(th3);
    tableBody.appendChild(t); 
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        var td1 = document.createElement('TD');
        var italic = document.createElement("p");

        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            textnode = document.createTextNode(stock[i][j]);
            td.appendChild(textnode);
           
            tr.appendChild(td);

        }
        //var italic = createButton([i]); 
        var node = document.createElement("div"); 
        if(lights[i].state.on){
          node.innerHTML = "<label class=\"switch\"><input type=\"checkbox\" checked><span class=\"slider round\"></span></label>"
        }
        else{
          node.innerHTML = "<label class=\"switch\"><input type=\"checkbox\" ><span class=\"slider round\"></span></label>"

        }
        node.id = i + 1;

        node.onclick = function Clicked(){
          var div = document.getElementById("tablediv"); 
          var light = this.id;
          ChangeState(light); 
        }

        td1.appendChild(node);
        tr.appendChild(td1);
        var td2 = document.createElement("TD"); 
        var rangepicker = document.createElement("div"); 

        rangepicker.id = "rangepicker";
        var range = document.createElement("INPUT");
        range.setAttribute("type", "range");  
        range.max = "100"; 
        range.min = "0"; 
        if (lights[i].state.on){
            range.value = "100"; 
        }
        else{
          range.value = "0"; 
        }


        range.classList.add("rangepicker"); 
        range.id = i + 1; 
        range.onmouseup = function(i){
          var light = this.id; 
          document.getElementById("procentdiv" + light).innerHTML = this.value + "%";

          var xhttp = new XMLHttpRequest(); 
          xhttp.open("PUT", "http://192.168.0.109/api/TkF6jW5Ky6KiOKNHQ5HCcuN0FVns-Pvuyq9o3fnz/lights/" + light + "/state", true); 
          xhttp.setRequestHeader("Content-type", "application/json");
          var bri = this.value + 155; 
          var body = "{\"bri\" :255}";
          xhttp.send(body);  
        };

        var procentdiv = document.createElement("div"); 
        procentdiv.id = "procentdiv" + range.id; 
        procentdiv.innerHTML = range.value + "%"; 
        rangepicker.appendChild(range); 

        rangepicker.appendChild(procentdiv); 
        td2.appendChild(rangepicker); 
        tr.appendChild(td2); 
        tableBody.appendChild(tr);
    }

    myTableDiv.appendChild(table)
    myTableDiv.style.display = 'block';
    hideTable = false; 
  }


function getLights(){
  xhttp.open("GET", "http://192.168.0.109/api/TkF6jW5Ky6KiOKNHQ5HCcuN0FVns-Pvuyq9o3fnz", false); 
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(); 
  var input = JSON.parse(xhttp.responseText);
  var myTableDiv = document.getElementById("tablediv"); 
  var lights = []; 


  Object.keys(input.lights).forEach(function(key) {
  lights.push(input.lights[key])
  })

    //get display area from page
    var displayArea = document.getElementById("gatewayboxes"); 
    
     for (var i = 0; i< input.gateways.length; i++){

        //create the most inner div that holds a h3 with the gateway ID
    
        var div= document.createElement("div");
    
        var title = document.createElement("h3"); 
        
        title.innerHTML = "Gateway " + gatewayids[i]; 
        title.innerHTML += "<br>" + gatewaydescriptions[i]; 
        title.id = "gw" + i.toString(); 
        div.appendChild(title); 

        //Create next div that holds the inner div and a href for showing sensors 
        var div2 = document.createElement("div"); 

        div2.classList.add("w3-container",  "w3-round-xlarge", "isa-margin", "w3-white", "w3-padding-13"); 
       
        var loc = document.createElement('p'); 
        loc.id = "loc" + i.toString(); 
        loc.classList.add("w3-center");
        loc.innerHTML = locations[i] + "<br>" + locdescriptions[i]; 
        var test = document.createElement('div'); 
        test.classList.add("w3-right");


        var obj = createButton(i); 
        test.appendChild(obj); 
        div2.append(test); 
        //div2.appendChild(atag); 
        div2.appendChild(div); 
        div2.append(loc); 
        
        //create the next div to hold the others 
        var div3 = document.createElement('div'); 
        div3.classList.add("w3-quarter"); 
        div3.id = "div" + i.toString(); 
        div3.appendChild(div2); 
        var obj = createButton(i); 
        displayArea.classList.toggle("show"); 
        displayArea.appendChild(div3); 
    }
}


function createButton(i){
    var buttonarea = document.getElementById("buttonarea"); 
    var count = i.toString(); 
    var content = document.createElement('a'); 
    content.id = "mer" + count; 
    content.setAttribute("href", "javascript:moreButton("+count+")");
    content.innerHTML = "Sensorer";
    content.classList.add("isa-border"); 

    var content2 = document.createElement('a'); 
    content2.setAttribute("href", "javascript:toggleBoxes("+count+")"); 
    content2.innerHTML = "Ändra"; 


    var div = document.createElement("div"); 
    div.id = "myDropdown" + i.toString();
    div.classList.add("dropdown-content"); 

    div.appendChild(content);
    div.appendChild(content2); 

    var btn = document.createElement("button"); 
    btn.classList.add("dropbtn", "w3-white", "w3-round");
    btn.setAttribute("style", "border:none");

    btn.innerHTML = "..."; //"<i class='fa fa-bars'/>";  
    btn.onclick = function(){
        document.getElementById("myDropdown" + i.toString()).classList.toggle("show");
    };
    var outerdiv = document.createElement("div"); 
    outerdiv.classList.add("dropdown"); 
    outerdiv.appendChild(btn); 
    outerdiv.appendChild(div); 
    return outerdiv; 
}


function ChangeState(i){
  
  var request = new XMLHttpRequest();
 request.open("GET", "http://192.168.0.109/api/TkF6jW5Ky6KiOKNHQ5HCcuN0FVns-Pvuyq9o3fnz/lights/" +i, false); 

  request.setRequestHeader("Content-type", "application/json");
 request.send(); 
  var s= JSON.parse(request.responseText);
  var body = "{\"on\":false}" 
  if(JSON.stringify(s.state.on)== "false"){
    body = "{\"on\":true}"
  }
  request.open("PUT", "http://192.168.0.109/api/TkF6jW5Ky6KiOKNHQ5HCcuN0FVns-Pvuyq9o3fnz/lights/" +i+ "/state", true); 
  request.send(body)

  return new Promise(resolve =>{
  }); 

}

async function sendStateRequest(body, client){
 
}