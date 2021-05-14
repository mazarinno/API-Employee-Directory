const gallery = document.getElementById("gallery");   // creating a variable for the gallery div
const body = document.body;

// single request to the random user generator which brings back 12 results
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://randomuser.me/api/?results=12');
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

		var persons = Array.from(gallery.children);
		console.log(persons);
		persons.forEach(function(people) {
			people.addEventListener("click", function() {
				// trying to find the indexof whatever is clicked on so i can match it with the index of the array of results and match their info to the modal cards				

				console.log(event.target);
				console.log(persons.indexOf(event.target));


				body.insertAdjacentHTML('beforeend', 
		  	   `<div class="modal-container">
		            <div class="modal">
		                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
		                <div class="modal-info-container">
		                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
		                    <h3 id="name" class="modal-name cap">name</h3>
		                    <p class="modal-text">email</p>
		                    <p class="modal-text cap">city</p>
		                    <hr>
		                    <p class="modal-text">(555) 555-5555</p>
		                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
		                    <p class="modal-text">Birthday: 10/21/2015</p>
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