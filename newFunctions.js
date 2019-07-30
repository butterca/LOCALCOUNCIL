//Response to Multiple Choice Question

function getRMCQuestion(i){
    
    questionOutput.style.display = "block";
    console.log("GETTING RMC QUESTION");
    
    //show playerButtons
    
    for(var i = 0; i< roomSize; i++){
        var buttonIDsToShow = "buttonAdd" + localPlayerNumber;
        
        buttonIDsToShow.style.display = "block";
        
    }
    
    //show lives
    lives.style.display = "block";
    lives.style.fontSize = "12px";

    //Getting trivia questions
    const qName = i.toString();

    const docRefRMC = firestore.collection("questions").doc(qName);
    //var correctAnswer;
    
    //RESET RESPONSE # BEFORE GETTING QUESTION
    docRefResponseData.update({ responses: 0});

    //GETTING QUESTION
    docRefTQ.get().then(function(doc){
            if(doc.exists){
                const questionData = doc.data();
                
                correctMCAnswer = questionData.correctAnswer;
                //console.log("the doc data IS HERE= ", questionData.question);
                
                questionOutput.innerText = questionData.question;

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
















































//==================== IS IT TRUE??? ===============================//     

            //Send all players a different T/F question
              
              
              //Save all answers
              
              
              //Ask all other players the answer
              


// Get 5 random T/F questions and assign each one to a player 1-5
//function createTFQuestionArray(){
//    
//}


function getTFQuestionforPlayer(){
    //t document of localPlayerNumber
    questionOutput.style.display = "block";
    //get element by ID show T/F buttons
    
    
    firestore.collection("questions").doc(data[localPlayerNumber]).get().then(function(doc){
            if(doc.exists){
                const qData = doc.data();
                
                questionOutput.innerText = qData.question;
                
            //save question answer
                
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
}



//GET PLAYERS RESPONSE TO t/f question and save it

function getTFAnswer(buttonID){
    
    if(buttonID == true){
        firestore.collection("questions").doc(tfQuestion).update({
                        answer: true
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            }
    else if(buttonID == false){
         firestore.collection("questions").doc(tfQuestion).update({
                        answer: false
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    }
    
}


//REDISTRUBUTE T/F Questions for other players to answer

function getTFQTest(){
    for(var i = 0; i <numberOfPlayers; i++){
        getTFQ(i);
    }
}

getTFQ(i){
    
    //ACTIVATE TF BUTTONS AGAIN
    
    firestore.collection("questions").doc(i).get().then(function(doc){
            if(doc.exists){
                const qData = doc.data();
                
                questionOutput.innerText = qData.playerName + qData.question2;
                
            //save question answer
                
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
}


function checkTFNQAnswer(buttonID, i){
    
    firestore.collection("questions").doc(i).get().then(function(doc){
            if(doc.exists){
                const qData = doc.data();
                var correctTFAnswer = qData.answer;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
     
    if(buttonID == correctTFAnswer){
        //RIGHT ANSWER
        //increase score
            }
    else {
        //WRONG ANSWER
        //player out
    }
    
}









//HOW TO GENERATE RANDOM NUMBERS FOR PLAYERS

//CREATE A RANDOM NUMBERED ARRAY FOR PLAYERS AFTER LAST PERSON JOINS GAME
var data;
var RQA;
function getRandomQuestionArray(numberOfPlayers){
    data = [];
    for(var i = 0; i<numberOfPlayers; i++){
        
        data.push(i);
        
    }
    
    RQA = shuffle(data);
    
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


// from now on when you need a random player number simply enter data[localPlayerNumber]


//if you have a hundreds of MC questions and want to get 10 random unique questions
//Populate an array with the numbers 1 through 100.
//Shuffle it.
//Take the first 8 elements of the resulting array.


















//==================== WHATS THE LIE??? ===================================//

//Prompts all players to submit two truths and a lie

//Saves the players truths/lie

//Asks other players to guess
















//================================= TAKE A STAB ================================//


//Asks all players a difficult MC Question to respond to

//Adds those players responses as buttons to MC Question

//Have players now answer the MC Question w/ all responses














// SHIT TO KNOW

//The following javascript function will delete any collection:
//
//deleteCollection(path) {
//    firebase.firestore().collection(path).listDocuments().then(val => {
//        val.map((val) => {
//            val.delete()
//        })
//    })
//}