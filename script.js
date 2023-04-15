

function reset(event){
	// in questa funzione devo riportare tutto come era prima
	// devo mettere tutte le immaggine ad unchecked
	// devo levare le varie classi che ho messo
	// devo eliminare tutto dentro il div risposta(ed il div stesso alla fine)

	let checkbox;


	for(scelta of scelte){
		scelta.classList.remove('selezionato');
		scelta.classList.remove('non_selezionato');
		checkbox = scelta.querySelector('.checkbox');
		checkbox.src = "images/unchecked.png";
		scelta.addEventListener('click', Procedura);

	}
	article = document.querySelector("article");
	div = document.querySelector('.answer');
	div.remove();

	selezionati = [0, 0, 0];
	counter = 0;
	scelteFinali = {
					one: 0,
					two: 0,
					three: 0
					};
}




function showResults(){
	
	counter = 0;
	let risultato;
	risultato = scelteFinali.one;


	if (scelteFinali.one === scelteFinali.two){
		counter ++;
		risultato = scelteFinali.one;
	}

	if (scelteFinali.one === scelteFinali.three){
		counter ++;
		risultato = scelteFinali.one;
	}

	if (scelteFinali.two === scelteFinali.three){
		counter ++;
		risultato = scelteFinali.two;
	}


	article = document.querySelector('article');
	div = document.createElement('div');
	article.appendChild(div);
	div.classList.add('answer');
	h1 = document.createElement('H1');
	div.appendChild(h1);
	h1.textContent = RESULTS_MAP[risultato].title;
	p = document.createElement('p');
	div.appendChild(p);
	p.textContent = RESULTS_MAP[risultato].contents;
	button = document.createElement('button');
	div.appendChild(button);
	button.textContent = "RESET";

	let rst = document.querySelector(".answer button");
	rst.addEventListener('click', reset);

}




function removeEvents(){
	for(scelta of scelte){
		scelta.removeEventListener('click', Procedura);
	}
	console.log(scelteFinali);
}





function uncheck(scelta){

	scelta.classList.remove('selezionato');
	let checkbox = scelta.querySelector('.checkbox');
	checkbox.src = "images/unchecked.png";
	scelta.classList.add('non_selezionato');

}



function make_uncheck(questId, choiceId){

	for(scelta of scelte){
		if(scelta.dataset.questionId === questId){

			if( scelta.dataset.choiceId !== choiceId && scelta.classList.contains('selezionato')){
				uncheck(scelta);
			}

		}
	}
}


function aggiornaSelezionati(questId, choiceId){

	if(questId === 'one'){
		if(selezionati[0] === 0){
			selezionati[0] = 1;
			for(scelta of scelte){
				if(scelta.dataset.questionId === questId && scelta.dataset.choiceId !== choiceId){
					scelta.classList.add('non_selezionato');
				}

			}

		}
	}



	if(questId === 'two'){
		if(selezionati[1] === 0){
			selezionati[1] = 1;
			for(scelta of scelte){
				if(scelta.dataset.questionId === questId && scelta.dataset.choiceId !== choiceId){
					scelta.classList.add('non_selezionato');
				}

			}

		}
	}

	if(questId === 'three'){
		if(selezionati[2] === 0){
			selezionati[2] = 1;
			for(scelta of scelte){
				if(scelta.dataset.questionId === questId && scelta.dataset.choiceId !== choiceId){
					scelta.classList.add('non_selezionato');
				}

			}

		}
	}




}




function riempiScelte(questId, choiceId){

	if(questId === "one"){
		scelteFinali.one = choiceId;
	}
	if(questId === "two"){
		scelteFinali.two = choiceId;
	}
	if(questId === "three"){
		scelteFinali.three = choiceId;
	}

}








function Procedura(event){
	
	const div = event.currentTarget;
	let questId = div.dataset.questionId;
	let choiceId = div.dataset.choiceId;
	


	let checkbox = div.querySelector('.checkbox');
	checkbox.src = "images/checked.png";
	div.classList.add('selezionato');
	div.classList.remove('non_selezionato');

	riempiScelte(questId, choiceId);

	counter = 0;
	for(let i = 0; i < 3; i++){
		if(selezionati[i] === 0){
			aggiornaSelezionati(questId, choiceId);
		}

		if(selezionati[i] === 1){

			counter +=1;
			if(counter === 3){
				removeEvents();
				showResults();
				return;
			}
		}

	}
	make_uncheck(questId, choiceId);
}





//console.log(costants);
let selezionati = [0, 0, 0];
let counter = 0;
let scelteFinali = {
					one: 0,
					two: 0,
					three: 0
					};

const scelte = document.querySelectorAll(".choice-grid div");


for(scelta of scelte){
	scelta.addEventListener('click', Procedura);
}

