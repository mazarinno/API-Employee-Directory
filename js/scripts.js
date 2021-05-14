const gallery = document.getElementById("gallery");   // creating a variable for the gallery div
const body = document.body;

// single request to the random user generator which brings back 12 results
const xhr = new XMLHttpRequest();
// depending on the country, phone numbers would be 10-11 numbers long, and since the requirements call for a 10 number format, ive limited the random users to be from the US
xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=us');
xhr.send();
xhr.onload = () => {
	if (xhr.status == 200) {
		var result = JSON.parse(xhr.response);
		console.log(result.results);

		for (var i = 0; i < 12; i++) {   // for each person that was randomly generated, their info is added as a card into the DOM
		  var person = result.results[i];
		  gallery.insertAdjacentHTML('beforeend', 
		  	`<div class="card">
		        <div class="card-img-container">
		            <img class="card-img" src=${person['picture']['medium']} alt="profile picture">
		        </div>
		        <div class="card-info-container">
		            <h3 id="name" class="card-name cap">${person['name']['first']} ${person['name']['last']}</h3>
		            <p class="card-text">${person['email']}</p>
		            <p class="card-text cap">${person['location']['city']}, ${person['location']['state']}</p>
		        </div>
		    </div>`);
		}

		var persons = Array.from(gallery.children);  // creating an array of the children elements from the gallery, which are all the div elements we just added earlier
		
		persons.forEach(function(people) {
			people.addEventListener("click", function() {
				// trying to find the indexof whatever is clicked on so i can match it with the index of the array of results and match their info to the modal cards				
				var indexNum = persons.indexOf(event.target.closest(".card"));   // this finds the closest 'card' parent, which is the div card that ive sorted into an array
				var person = result.results[indexNum];  // so the index of the card will be the same as the index of the person we want the info for

				// for info such as the phone and dob, substrings were selected to format them to the requirements standards
				body.insertAdjacentHTML('beforeend', 
		  	   `<div class="modal-container">
		            <div class="modal">
		                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
		                <div class="modal-info-container">
		                    <img class="modal-img" src=${person['picture']['large']} alt="profile picture">
		                    <h3 id="name" class="modal-name cap">${person['name']['first']} ${person['name']['last']}</h3>
		                    <p class="modal-text">${person['email']}</p>
		                    <p class="modal-text cap">${person['location']['city']}</p>
		                    <hr>
		                    <p class="modal-text">${person['phone'].substring(0, 5)} ${person['phone'].substring(6, 14)}</p>
		                    <p class="modal-text">${person['location']['street']['number']} ${person['location']['street']['name']}, ${person['location']['city']}, ${person['location']['state']} ${person['location']['postcode']}</p>
		                    <p class="modal-text">Birthday: ${person['dob']['date'].substring(5, 7)}/${person['dob']['date'].substring(8, 10)}/${person['dob']['date'].substring(0, 4)}</p>
		                </div>
		            </div>
		        </div>`);

		        const closeButton = document.getElementById("modal-close-btn");  // assigning a variable to the close button that was just added to the DOM

		        closeButton.addEventListener("click", function() {   // event that fires when the close button is clicked
					closeButton.parentElement.parentElement.remove();  // this removes the modal container from the DOM
				});
			});
		});
	}
}