// This file does all the magic. 
// Requires Google Doc publish key and two sheets (one named "data" and the other named "demographics")
// All you need to fill out are the first three lines starting with GOOGLE_DOC_KEY and ending with HEADLINE

$(document).ready(function() {

GOOGLE_DOC_KEY = '0Av5e1nTas_mOdFptZW9pVFNtWDk1TFpCNVMyZTdYSHc';
TITLE = "The Tech Dining | Breakdown by Residence";
HEADLINE = "Dining Breakdown by Residence";

init();

function init() {
    Tabletop.init( { key: GOOGLE_DOC_KEY,
                     callback: showInfo,
                     simpleSheet: false } )
}


function showInfo(data, tabletop) {
	// populate title + page heading => comes from Google Doc sheet name
	$('title').text(TITLE);
	$('.left-menu h1').text(HEADLINE);

	// construct html for displaying group divs => comes from Google Doc sheet named "demographics"
	var groupdivs = '';
	var tempgroup = ''; // keeps track of supergroup
	for (var i in data['demographics']['elements']) {
		if(tempgroup != data['demographics']['elements'][i]['supergroup']) { // start new supergroup
			if(tempgroup != '') {
				groupdivs += '</div>'; // end old supergroup
			}
			tempgroup = data['demographics']['elements'][i]['supergroup'];
			groupdivs += '<div class="groups">';
			groupdivs += '<h3>'+data['demographics']['elements'][i]['supergroup']+'</h3>';
		}
		groupdivs += '<div class="groupcont"><div class="fixedcont"><div class="group" id=';
		groupdivs += '"'+ data['demographics']['elements'][i]['id'] +'"></div></div><div class="label">'+data['demographics']['elements'][i]['name']+'</div></div>';
	}
	$('.groupscontainer').html(groupdivs);

	// construct html for displaying questions in left sidebar => comes from Google Doc sheet named "data"
	var questiondivs = '';
	var tempcategory = ''; // keeps track of question categories
	for (var i in data['data']['elements']) {
		if(tempcategory != data['data']['elements'][i]['category']) { // start new question category
			if(tempcategory != '') {
				questiondivs += '</div>'; // end old question category
			}
			tempcategory = data['data']['elements'][i]['category'];
			questiondivs += '<div class="heading">';
			questiondivs += '<div class="headlabel"><h3>'+data['data']['elements'][i]['category']+'</h3></div>';
		}
		questiondivs += '<button class="question" id="'+data['data']['elements'][i]['id']+'">'+data['data']['elements'][i]['question']+'</button>';
        questiondivs += '<hr />';
	}
	$('.questioncontainer').html(questiondivs);

	// returns total number people in demographic group given id of group
	function getGroupTotal(id) {
		for (var i in data['demographics']['elements']) {
			if (data['demographics']['elements'][i]['id'] === id) {
				return data['demographics']['elements'][i]['pop'];
			}
		}
	}

	// returns element id given the question id
	function findIndex(param) {
		for (var i in data['data']['elements']) {
			if (data['data']['elements'][i]['id'] === param) {
				return i;
			}
		}
	}

	$('.headlabel').click(function() {

		$('.heading').each(function() {
			$(this).css({height: '22px'});
		});

		var header = $(this).parent(); // .heading

		if(header.css('height') == '22px') {
			header.css({height: 'auto'});
		}else {
			header.css({height: '22px'});
		}
	});

	$('.question').click(function() {
		$('.temp').remove(); // removes the temp number
		$('.dispquest').text('');
		$('.mitatlarge').text('');
		$('.addnotes').text('');

		$('.question').each(function() {
			$(this).removeClass('selected');
		});

		$(this).addClass('selected');
	        
		var param = $(this).attr("id"); // the param should be the same variable name in dict.js
		var questionindex = findIndex(param); // returns element index for the question based on the id
		var selectedobject = data['data']['elements'][questionindex]; // selectedobject contains data for the selected question

	    $('.dispquest').text(selectedobject['question']);

		$('.addnotes').text(selectedobject['notes']);
		
		$('.group').each(function() {
		
			var id = $(this).attr("id");

			if (selectedobject['units'] === '%') {
				$('.mitatlarge').text(selectedobject['average']+selectedobject['units']);
			}
			else {
				$('.mitatlarge').text(selectedobject['average']+' '+selectedobject['units']);
			}

			var num = parseFloat(selectedobject[id]); // num is the raw number from the group

			// if deals with questions where we count # of people in the group who answered a certain way
			// else deals with questions where we present average value answered by people in the group
			if (selectedobject['maxval'] != "") { // each value is # of people who said yes/no in the group
				var percent = 100*(num/selectedobject['maxval']) + 'px'; // divide raw number by indicated scaling factor
				var offset = 100-percent + 'px';

	            $(this).before('<p class="temp">'+num+'</p>'); // adds value corresponding to group
			}
			else { // each value is the average value for the group
				var denom = getGroupTotal(id); // gets the total number of people from each group
				
				var percent_num = Math.floor(num*100/denom);
				var offset_num = 100-percent_num;
				var percent = percent_num + 'px'
				var offset = offset_num + 'px';
				
				$(this).before('<p class="temp">'+percent_num+'%</p>'); // adds % corresponding to group
			}

			$(this).animate({
				'height': percent,
				'margin-top': offset
			})
		});

	});
}

});
