status = "";
objects = [];
song = "";

function preload(){
song  = loadSound("alarm.wav");

}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Looking for objects";

}
function modelLoaded(){
    console.log(modelLoaded);
    status = true;
}

 


function draw(){
    image(video,0,0 , 480, 380);
if(status !=  "") {
objectDetector.detect(video,gotResult);
for(i = 0; i < objects.length; i++){
    fill("d94343");
    document.getElementById("status").innerHTML = "Status: Objects Detected";
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + "" + percent + "%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke("#d94343");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

if(objects[i].label == "person"){
    document.getElementById("status").innerHTML = "Status: Baby Found";
    song.stop();
}
else{
     document.getElementById("status").innerHTML = "Status Baby Not Found";
     song.play();
   } 
  }
if(objects.length == 0)
    document.getElementById("status").innerHTML = "Status Baby Not Found";
     song.play();
 }
}

function gotResult(error,results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}