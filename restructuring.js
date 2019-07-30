//Remove players with no lives

function removePlayers(){
    
        if(localPlayerLives ==0){
                //DELETE PLAYER DOCUMENT
                docRefPlayer.delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
            //END GAME
             endGame();
        }
}
        
function updateRoomSize(){
        
        //track roomSize
        docRefRoom.get().then(res => {

            docRefRoomData.update({
                    numberOfPlayers: res.size
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            
         });
}


//GET RMC

function getRMCQuestion(i){

    questionOutput.style.display = "block";
    console.log("GETTING RMC QUESTION");
    
    
    
    
    
    
    //show ABCD Buttons
    buttonA.style.display = "block";
    buttonB.style.display = "block";
    buttonC.style.display = "block";
    buttonD.style.display = "block";
    
    //show lives
    lives.style.display = "block";
    lives.style.fontSize = "12px";

    //Getting trivia questions
    const qName = i.toString();

    const docRefTQ = firestore.collection("questions").doc(qName);
    //var correctAnswer;
    
    //RESET RESPONSE # BEFORE GETTING QUESTION
    docRefResponseData.update({ responses: 0});

    docRefTQ.get().then(function(doc){
            if(doc.exists){
                const questionData = doc.data();
                
                correctMCAnswer = questionData.correctAnswer;
                //console.log("the doc data IS HERE= ", questionData.question);
                
                questionOutput.innerText = questionData.question;
                buttonA.innerText = questionData.optionA;
                buttonB.innerText = questionData.optionB;
                buttonC.innerText = questionData.optionC;
                buttonD.innerText = questionData.optionD;

                //make sure its working
                //console.log("the correct answer is saved as" + correctTriviaAnswer);


            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
}

function checkMCAnswer(buttonID){
    //console.log("option1 = " + option1.innerText + "and the correct option is " + correctMCAnswer);
        const increment = firebase.firestore.FieldValue.increment(1);
    
    
    docRefResponseData.update({ responses: increment });
    
    console.log("BUTTONID = " + buttonID);
    
    currentMCAnswer = document.getElementById(buttonID);
    
    
    
    //CHECK ANSWER
    if(currentMCAnswer.innerText == correctMCAnswer){
        
        localPlayerLives += 1;
        //changePlayerLivesBool = true;
        //changePlayerLivese();
        
        
    }else{
        
        localPlayerLives -= 1;
        //changePlayerLivesBool = false;
    }
    
    
    
    questionOutput.style.display = "none";
    //HIDE STUFF
    buttonA.style.display = "none"; 
    buttonB.style.display = "none";
    buttonC.style.display = "none";
    buttonD.style.display = "none";
    
    
    //CHANGE PAGE AFTER LAST PLAYER ANSWERS
    

    
    //docRefRoomData.update({ responses: increment });
      //var docRefResponseData = firestore.collection("responses").doc(playerRoom);
    
    
    

    setTimeout(checkForAllResponses, 5000);
    
    
}

function checkForAllResponses(){
    
    updateRoomSize();
    
      docRefResponseData.get().then(function(doc){
            if(doc.exists){
                const responseData = doc.data();
                const currentResponses = responseData.responses;
                //changePlayerLives();
                
                console.log("RESPONSES so far = " + currentResponses + "CURRENT room size = " + roomSize);
                
                 console.log(responseData.responses + " RESPONSES");
                if(currentResponses == roomSize){
                    
                    console.log(responseData.responses + " RESPONSES");
                    
                    const increment = firebase.firestore.FieldValue.increment(1);
                    docRefRoomData.update({ pageNumber: increment })
                    
                    //docRefResponseData.update({ responses: 0});
                    
                    console.log("RESET RESPONSEEEESSSS");
                }


            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
}


        
        
       




//CHANGING PAGE NUMBER
function updateScreen(doc){
    
    //console.log("here35");
    
    removePlayers();
    updateRoomSize();
    
    if(doc && doc.exists){
        const myData = doc.data();
        console.log("MADE IT INTO THE PAGE NUMBER DOCUMENTTTTT" + myData.pageNumber);

        // ONCE GAME IS STARTED, PAGE GOES TO 1
        if(myData.pageNumber == 1){
            
            addPlayerNumbers();
            
            
            
        }
        else if(myData.pageNumber == 2){
        
            
            getMCQuestion(11);
//            if(localPlayerNumber==1){
//            startTimer(10);
//            }
    
        }
        else if(myData.pageNumber == 3){
            
            changePlayerLives();
            
            getMCQuestion(0);
            
            //startTimer(10);
            
                         
        }
        else if(myData.pageNumber == 4){
            
            changePlayerLives();
            
            getMCQuestion(2);
        }
        else if(myData.pageNumber == 5){
            
            
            changePlayerLives();
            
            getMCQuestion(2);
              
              //endGame();
              
        }
        else if(myData.pageNumber == 6){
            
            changePlayerLives();
            
            getRMCQuestion();
        }
    }
}


getRealtimeUpdates = function () {
    //console.log("DocRefRoom = " + playerRoom);
    docRefRoomData.onSnapshot( function(doc){
        console.log("MADE IT INTO update screen");
        updateScreen(doc);
    });
}
;

if(playerRoom != null){
getRealtimeUpdates();
}
