//set variables from form input and monthlyRate and totalBilled

//   Initialize Firebase
var config = {
    apiKey: "AIzaSyBwk3nJOtbjMOmwF4UsTUKpH_ALNXq_PPA",
    authDomain: "rika-school-prj.firebaseapp.com",
    databaseURL: "https://rika-school-prj.firebaseio.com",
    projectId: "rika-school-prj",
    storageBucket: "rika-school-prj.appspot.com",
    messagingSenderId: "478499791771"
  };
  firebase.initializeApp(config);

  //reference to firebase database
  var database = firebase.database();




var trainName;
var destination;
var trainTime;
var frequency;
var monthsWorked = "";
var totalBilled = "";

$("#submit-info").on("click", function(){

    event.preventDefault(); //prevent page from reloading

    //get inputs from form
    var trainName = $("#train-name").val();
    console.log(trainName);
    var destination = $("#destination").val();
    console.log(destination);
    var trainTime = $("#train-time").val();
    console.log(trainTime);
    var frequency = $("frequency").val();
    console.log(frequency);
   
     
    var newTrain = {
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency     
    };
    
    firebase.database().ref().push(newTrain);

    //when this function is hit, it will grab every single child individually from database, then stop and listen for any additional children you add
    database.ref().on("child_added", function(child) {
        console.log(child.val());
        var trainName = child.val().trainName;
        var destination =  child.val().destination;
        var trainTime = child.val().trainTime;
        var frequency = child.val().frequency;
        

        var momentInst = moment(trainTime, 'HH:mm A');
        // var empMonths = momentInst.diff(moment(), 'months');
        // var totalBilled = empMonths * monthlyRate;


        var trainData = 
        "<tr><td>" + trainName + "</td><td>" 
        + destination + "</td><td>" 
        + trainTime + "</td><td>" 
        + frequency + "</td><td>" 
        + monthlyRate + "</td><td>" 
        + totalBilled + "</td></tr>";
    
    //append new row of data
    $("#train-table").append(trainData);
    });

  
    
  
});




