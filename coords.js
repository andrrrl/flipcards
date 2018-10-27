function shuffle(array) { 
	
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle... 
	while (0 !== currentIndex) {
	
	// Pick a remaining element... 
		randomIndex = Math.floor(Math.random() * currentIndex); currentIndex -= 1;
	
	// And swap it with the current element. 
		temporaryValue = array[currentIndex]; 
		array[currentIndex] = array[randomIndex]; 
		array[randomIndex] = temporaryValue; 
	
	}

	return array; 
}

function makePairs(dim) {
	let arr = { numbers: [], colors: [] };
	let p = dim / 2;
	for ( let i = 1; i <= p; i++ ) {
		arr.numbers.push(i);
		arr.numbers.push(i);
	}
	return arr;
}

let cols = 4,
	 filas = 4
	 i = 0;

let grid = (cols * filas),
	pairs = makePairs(grid);
	shuffle(pairs.numbers);
	

let html = '<main>';
for ( let y = 0; y < cols; y++ ) {
	html += '<section>';
	for ( let x = 0; x < filas; x++ ) {
		html += '<div class="card-container card-back"><div class="card idle" data-carta="' + pairs.numbers[i] + '">' + x + ',' + y  + '</div></div>';
		i++;
	}
	html += '</section>';
}
html += '</main>';

document.write(html);

let el = document.querySelectorAll('.card-container'); 
let tmp = '';
let match = [];
let container = [];
let matched = [];
let coord = [];
let rels = [];
let j = 0;

let blockPlay = false;

for(let i=0; i < el.length; i++){ 
	el[i].addEventListener('click', function(event) {
		
		if (blockPlay === true) {
			return;
		}
		
		tmp_html = this.firstChild.innerHTML;
		tmp_carta  = this.firstChild.dataset.carta;
	
		this.firstChild.innerHTML = this.firstChild.dataset.carta;
		
		container[j] = this;
		match[j] = this.firstChild;
		rels[j] = this.firstChild.dataset.carta;
		coord[j]  = this.firstChild.innerHTML;
		
		
		if (matched.find(x => x === rels[j])) {
			return;
		}

		this.classList.remove('card-back');
		this.classList.add('card-front');
		this.firstChild.classList.remove('idle');
		this.firstChild.classList.add('match');
		
		j++;
		
		if ( typeof match[1] !== 'undefined' ) {
			if ( match[0].innerHTML === match[1].innerHTML ) {
				matched.push(tmp_carta);
				match = [];
				j = 0;
				
				setTimeout(function(){
					if ((pairs.numbers.length/2) === matched.length) {
						alert('Ganaste gordashian!');
					}
				}, 500);
				
			} else {
				blockPlay = true;
				setTimeout(function(){
					match[0].innerHTML = coord[0];
					match[1].innerHTML = coord[1];
					match[0].dataset.carta = rels[0];
					match[1].dataset.carta = rels[1];
					
					container[0].classList.remove('card-front');
					container[0].classList.add('card-back');
					container[1].classList.remove('card-front');
					container[1].classList.add('card-back');
					
					match[0].classList.remove('match');
					match[1].classList.remove('match');
					match[0].classList.add('idle');
					match[1].classList.add('idle');
					j = 0;
					match = [];
					blockPlay = false;
				}, 1000);
			}
		}
	}, false); 
}
