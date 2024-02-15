// Create a test when clicking on the "Add" button
function newElement() {
    var inputValue = document.getElementById("myInput").value;

    if (inputValue === '') {
        alert("You must write something!");
        return;
    }

    // AJAX call to save data to the server
    $.ajax({
        type: "POST",
        url: "http://192.168.62.186:8080/quiz_app/tests",
        data: { test_name: inputValue },
        success: function(response) {
            console.log("Data saved successfully");
            
            // Fetch and display the updated data
            fetchDataAndDisplay();
            
        },
        error: function(error) {
            console.error("Error saving data to the server", error);
        }
    });
    document.getElementById("myInput").value = "";
}

function fetchDataAndDisplay() {
    console.log("hello")
    // AJAX call to fetch data from the server
    $.ajax({
        type: "GET",
        url: "http://192.168.62.186:8080/quiz_app/tests",
        success: function(response) {
            console.log("Data fetched successfully");
            
            // Display the fetched data
            displayData(response);
        },
        error: function(error) {
            console.error("Error fetching data from the server", error);
        }
    });
}

function displayData(data) {
    
    // Clear existing content in tes div
    $("#testss").empty();
    // Display the fetched data
    var i=1;
    data.result.forEach(function(item) {
            var div = document.createElement("div");
            div.classList.add("horizontal-div");
            div.onclick =function(){showQuestions(item.test_name);};

            // Create a span for the test name
            var testNameSpan = document.createElement("span");
            testNameSpan.appendChild(document.createTextNode(item.test_name));
            div.appendChild(testNameSpan);

             // Create a delete button
             var deleteButton = document.createElement("button");
             deleteButton.appendChild(document.createTextNode("Delete"));
             deleteButton.onclick = function() {
                 deleteTest(item.test_name); // Assuming there's an 'id' property in the response
             };
             div.appendChild(deleteButton);


            // Create buttons for the div
            var button1 = document.createElement("input");
            button1.type="checkbox";
            button1.id = "toggle"+i;
            button1.classList.add("btn");
            var label = document.createElement("label");
            label.htmlFor = "toggle"+i;
            // button1.onclick=toggleButton;
            // button1.appendChild(document.createTextNode("Button 1"));

            // Append buttons to the div
            // div.appendChild(button1);
            // div.appendChild(label);
            // Append the div to the container
            document.getElementById("testss").appendChild(div);
            i++;
        });
}

 // Function to delete a test
function deleteTest(test_name) {
    // Show the custom popup
    $("#customPopup").show();

    // Handle the confirm delete button click
    $("#confirmDelete").on("click", function() {
        // AJAX call to delete data from the server
        $.ajax({
            type: "DELETE",
            url: "http://192.168.62.186:8080/quiz_app/tests?test_name=" + test_name,
            success: function(response) {
                console.log("Test deleted successfully");

                // Fetch and display the updated data
                fetchDataAndDisplay();
            },
            error: function(error) {
                console.error("Error deleting test from the server", error);
            }
        });

        // Hide the custom popup
        $("#customPopup").hide();
    });

    // Handle the cancel delete button click
    $("#cancelDelete").on("click", function() {
        // Hide the custom popup
        $("#customPopup").hide();
    });
}



// Initial fetch and display when the page loads
$(document).ready(function() {
    fetchDataAndDisplay();
});



// -------------------------------------------------

 // Function to toggle the button's state
 function toggleButton() {
    var button = document.getElementById("customButton");

    // Toggle the "disabled" attribute
    button.disabled = !button.disabled;
}

function showQuestions(testName){
    document.getElementById("dateHolder").innerText=testName;
    document.getElementById("testss").innerHTML="";
    var button=document.createElement("button");
    button.className="my-button";
    button.innerText ="Add Questions";
    button.onclick=function(){togglePopup();};
    document.querySelector(".head").appendChild(button);
    $.ajax({
        type: "GET",
        url: "http://192.168.62.186:8080/quiz_app/tests/"+testName,
        success: function(response) {
            console.log("Data fetched successfully");
            
            // Display the fetched data
            displayQuestions(response);
        },
        error: function(error) {
            console.error("Error fetching data from the server", error);
        }
    });
}

function togglePopup() {
    const popupContainer = document.querySelector('.popup-container');
    const popupOverlay = document.querySelector('.popup-overlay');
    document.body.classList.toggle('popup-active');
}

function displayQuestions(data){
    var i=1;
    data.result.forEach(function(item){
        var div=document.createElement("div");
        div.innerText=i+". "+item.question;
        div.className="question-div";
        switch((item.options).length){
            case 2:
                div.style.height="150px";
                break;
            case 3:
            case 4:
                div.style.height="200px";
                break;
            case 5:
                div.style.height="250px";
        }
        var outerDiv=document.createElement("div");
        outerDiv.className="outer-options-div";
        let alphabets=["a","b","c","d","e"]
        for(let i=0;i<(item.options).length;i++){
            let innerDiv=document.createElement("div");
            innerDiv.className="grid-item";
            innerDiv.innerText=alphabets[i]+". "+item.options[i];
            if((item.answer)===alphabets[i])
                innerDiv.style="background:#0fe80f";
            outerDiv.appendChild(innerDiv);
        }
        div.appendChild(outerDiv);
        document.getElementById("testss").appendChild(div);
        i++;
    })
}



