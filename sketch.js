let capture;
let poseNet;
let singlePose, skeleton;
let allPoses = [];
function setup(){
    createCanvas(300,300);
    capture = createCapture(VIDEO);
    capture.size(650,470);
    capture.hide();

    poseNet = ml5.poseNet(capture, modelLoaded);
    poseNet.on('pose',receivedPoses);


}

function receivedPoses(poses){

    if (poses.length > 0){
        allPoses = poses;
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        console.log(singlePose);
    }
}

function modelLoaded(){
    console.log('model has loaded');
}


function draw(){
    
    image(capture, 0, 0);

    for(let p = 0; p< allPoses.length; p++){
        let singlePose = allPoses[p].pose;
        let skeleton = allPoses[p].skeleton;
    }
   
    if(singlePose){
    for(let i = 0; i< singlePose.keypoints.length; i++){
        let keypoint = singlePose.keypoints[i];
        if (keypoint.score > 0.8){
            fill(random(255),random(255),random(255));
            ellipse(keypoints.position.x, keypoints.position.y,15);
            fill(255,0,255);
            textSize(20);
            text(keypoint.part, keypoints.position.x + 10, keypoints.position.y + 20);
        }
    }
       

        
        


  
    for(let j = 0; j< skeleton.length; j++){
        let sk1 = skeleton[j][0].position;
        let sk2 = skeleton[j][1].position;
        if(sk1.score > 0.8 && sk2.score >0.8){
            stroke(0,0,255);
            strokeWeight(5);
        line(sk1.x, sk1.y,  sk2.x, sk2.y )
            

        }
        


        

    }
  
    }

    }
   




