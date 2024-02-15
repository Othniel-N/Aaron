// ----------> Total Users <---------------- //

fetch('http://localhost:3000/api/user')
		.then(response => response.json()) // Parse the response as JSON
      .then(data => {
        document.getElementById('result').innerText = data.users;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

//  ------------> Total tests <-----------------

fetch('http://localhost:3000/api/test')
.then(response => response.json())
.then(data => {
  document.getElementById('test').innerText = data.value;
})
.catch(error => {
  console.error('Error fetching number:', error);
});


fetch('http://192.168.62.186:8080/Quiz_App/tests')
  .then(response => response.json())
  .then(data => {
    // Assuming data is an object with a 'result' array
    const tests = data.result;
    console.log(tests)
    // Get the element with id 'tests'
    const testsElement = document.getElementById('tes');

    // Create an unordered list element
    const ulElement = document.createElement('ul');

    var i=1
    // Iterate through tests and create list items
    tests.forEach(test => {
      const liElement = document.createElement('li');
      liElement.textContent = `Test ${i} - ${test.test_name}`;
      ulElement.appendChild(liElement);
      i++
    });


    // Append the unordered list to the 'tests' element
    testsElement.appendChild(ulElement);
  })
  .catch(error => {
    console.error('Error fetching tests:', error);
  });