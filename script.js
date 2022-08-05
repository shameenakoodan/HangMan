/****************************************************************
                     Query Selectors
*****************************************************************/
//Buttons for A-Z
const abcButtons = document.querySelectorAll('.abc-buttons');

//Label for the words
let wordLabel;

//div to display labels
const labelDiv = document.querySelector(".flexcontainer-playarea-word");

//play Button to load the new page
const playButton = document.querySelector("#play");
/****************************************************************
                     Variable Declarations
*****************************************************************/
//Store the words
const fruits = ["strawberries", "raspberries", "blueberries", "kiwifruit","passionfruit","nectarines", "apricots", "peaches","plums",];
//Select random words from the array
let originalWord = fruits[Math.floor(Math.random() * fruits.length)];
let country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

let clue=[];

//Set a counter for the maximum number of attempts
let maximumAttempt = 7;
/****************************************************************
                     Function Definitions
*****************************************************************/

//Function to display a word with only hints and underscores on the label
const displayClueWord = ()=>{
       maximumAttempt = 7;
       //Generate a random character to display for the clueWord
       const randomCharacter = originalWord.charAt(Math.floor(Math.random() * originalWord.length));
       
       //Disable the randomCharacter button which will be default clue 
       abcButtons.forEach(element => {
             // console.log(element.innerHTML);
              if(element.innerHTML === randomCharacter){
                     element.disabled =true;
                     console.log(element);
              }
       });

       //Dynamically create labels for each characters in the clue word
       for (let i = 0; i < originalWord.length; i++) {
              const label = document.createElement("label");
              //Add class to the newly created labels
              label.classList.add('character-words');
       
              let textForTag ="";
              if(originalWord[i] == randomCharacter){
                     textLabelTag = document.createTextNode(originalWord[i]);
                     clue[i] = originalWord[i];
                     
              }else{
                     textLabelTag = document.createTextNode("_");
              }
              label.appendChild(textLabelTag);
              labelDiv.appendChild(label);
              
       }
       //Select the labels here because only after creation of label this will return array.
       wordLabel = document.querySelectorAll('.character-words');
}

//Function to delete the previous labels
const deletePreviousLabels = ()=>{
       wordLabel.forEach(element => {
              element.remove();
       });
}

//Function to display letters on label when the button is clicked
const displayLetters=(event)=>{
    const alphabetClicked = event.target.innerHTML;
    //Disable the buttons once it is clicked 
    event.target.disabled = true;
    
    //Find all the indexes of the character which is clicked
    const indexes = getAllIndexes(originalWord,alphabetClicked);
    //Decrement the maxAttempt for every wrong click
    if(indexes.length ==0)
       maximumAttempt--;
    //Check if the maximum attempt is 0 if so prompt Failed
    if(maximumAttempt == 0){
       alert("Failed");
       //Reset maximum attempts so that the game starts again
       refreshContents();
    }else{
        //Iterate through all the labels and set the clicked value 
       indexes.forEach(index => {
       clue[index] = alphabetClicked;
       wordLabel[index].innerHTML = alphabetClicked;
       });
       //If the correct word is displayed disable all the buttons 
       //Display a congrations alert box
       //Display the next clue
       console.log(`Original Word :${originalWord} and clue  : ${clue}`);
       if(clue.join('').trim() === originalWord.trim()){
              refreshContents();
              //Reset maximum attempts so that the game starts again
              alert("Congratulations");
       }
    }   
}

//Function to find all the index of a character in the word
//Returns an array of all the indexes where the character is present
const getAllIndexes = (word, clicked) =>{
       let indexes = [], i = -1;
       while ((i = word.indexOf(clicked, i+1)) != -1){
           indexes.push(i);
       }
       return indexes;
}

//Function to refresh the contents
const refreshContents  = ()=>{
       originalWord = fruits[Math.floor(Math.random() * fruits.length)];
       clue=[];
       console.log(`${maximumAttempt}`);
       maximumAttempt = 7;
       abcButtons.forEach(element => {
              element.disabled = true;
       });
       deletePreviousLabels();
       displayClueWord();
       abcButtons.forEach(element => {
              element.disabled = false;
       });
}

/****************************************************************
                     Event Listeners
*****************************************************************/

//Add event listener for Alphabet Buttons
abcButtons.forEach(element=>{
       element.addEventListener("click",displayLetters);
})

//Add event listener when a page is loaded
window.onload = displayClueWord;

//Add event listener for play button
playButton.addEventListener("click",()=>{
       location.href = "pickatheme.html";
});


/*//Sound Effects
const audio = new Audio("./audio/mixkit-positive-interface-beep-221.wav");

abcButtons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});*/
