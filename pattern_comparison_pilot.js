var timeline = [];
var patterns = "https://jmkuhns.github.io/pattern-comparison/patterns/";
var patterns_practice = "https://jmkuhns.github.io/pattern-comparison/patterns_practice/";
	var cresp = [37, 39, 39];
	var p1_correct = [37, 39, 37, 39, 37, 39, 37, 39, 37, 39, 37, 39, 39, 39, 37, 39, 37, 39, 39, 37, 37, 37, 37, 37, 39, 39, 39, 37, 39, 37];
	var p2_correct = [39, 39, 37, 37, 37, 37, 39, 39, 37, 37, 39, 39, 37, 39, 39, 39, 37, 37, 37, 37, 37, 39, 39, 39, 37, 39, 39, 37, 37, 39];

var p1_left = [patterns+'1_01_1.png', patterns+'1_02_1.png', patterns+'1_03_1.png', patterns+'1_04_1.png', patterns+'1_05_1.png', patterns+'1_06_1.png', patterns+'1_07_1.png', patterns+'1_08_1.png', patterns+'1_09_1.png', patterns+'1_10_1.png', patterns+'1_11_1.png', patterns+'1_12_1.png', patterns+'1_13_1.png', patterns+'1_14_1.png', patterns+'1_15_1.png', patterns+'1_16_1.png', patterns+'1_17_1.png', patterns+'1_18_1.png', patterns+'1_19_1.png', patterns+'1_20_1.png', patterns+'1_21_1.png', patterns+'1_22_1.png', patterns+'1_23_1.png', patterns+'1_24_1.png', patterns+'1_25_1.png', patterns+'1_26_1.png', patterns+'1_27_1.png', patterns+'1_28_1.png', patterns+'1_29_1.png', patterns+'1_30_1.png']

var p1_right = [patterns+'1_01_2.png', patterns+'1_02_2.png', patterns+'1_03_2.png', patterns+'1_04_2.png', patterns+'1_05_2.png', patterns+'1_06_2.png', patterns+'1_07_2.png', patterns+'1_08_2.png', patterns+'1_09_2.png', patterns+'1_10_2.png', patterns+'1_11_2.png', patterns+'1_12_2.png', patterns+'1_13_2.png', patterns+'1_14_2.png', patterns+'1_15_2.png', patterns+'1_16_2.png', patterns+'1_17_2.png', patterns+'1_18_2.png', patterns+'1_19_2.png', patterns+'1_20_2.png', patterns+'1_21_2.png', patterns+'1_22_2.png', patterns+'1_23_2.png', patterns+'1_24_2.png', patterns+'1_25_2.png', patterns+'1_26_2.png', patterns+'1_27_2.png', patterns+'1_28_2.png', patterns+'1_29_2.png', patterns+'1_30_2.png'];
var p2_left = [patterns+'2_01_1.png', patterns+'2_02_1.png', patterns+'2_03_1.png', patterns+'2_04_1.png', patterns+'2_05_1.png', patterns+'2_06_1.png', patterns+'2_07_1.png', patterns+'2_08_1.png', patterns+'2_09_1.png', patterns+'2_10_1.png', patterns+'2_11_1.png', patterns+'2_12_1.png', patterns+'2_13_1.png', patterns+'2_14_1.png', patterns+'2_15_1.png', patterns+'2_16_1.png', patterns+'2_17_1.png', patterns+'2_18_1.png', patterns+'2_19_1.png', patterns+'2_20_1.png', patterns+'2_21_1.png', patterns+'2_22_1.png', patterns+'2_23_1.png', patterns+'2_24_1.png', patterns+'2_25_1.png', patterns+'2_26_1.png', patterns+'2_27_1.png', patterns+'2_28_1.png', patterns+'2_29_1.png', patterns+'2_30_1.png'];
var p2_right = [patterns+'2_01_2.png', patterns+'2_02_2.png', patterns+'2_03_2.png', patterns+'2_04_2.png', patterns+'2_05_2.png', patterns+'2_06_2.png', patterns+'2_07_2.png', patterns+'2_08_2.png', patterns+'2_09_2.png', patterns+'2_10_2.png', patterns+'2_11_2.png', patterns+'2_12_2.png', patterns+'2_13_2.png', patterns+'2_14_2.png', patterns+'2_15_2.png', patterns+'2_16_2.png', patterns+'2_17_2.png', patterns+'2_18_2.png', patterns+'2_19_2.png', patterns+'2_20_2.png', patterns+'2_21_2.png', patterns+'2_22_2.png', patterns+'2_23_2.png', patterns+'2_24_2.png', patterns+'2_25_2.png', patterns+'2_26_2.png', patterns+'2_27_2.png', patterns+'2_28_2.png', patterns+'2_29_2.png', patterns+'2_30_2.png'];



function filter_data(stage){
			var selected_data = jsPsych.data.get().filter({exp_stage: stage}).select("key_press");
	    var d = selected_data.values;// get the data values
			console.log(d);
				for( var i = 0; i < d.length; i++){
					if ( d[i] === null) {
						d.splice(i, 1);
						i--;
					}}
			console.log(d);
			for (var i = 0; i < d.length; i++){
					if (stage == "pattern_comp_p1"){
						if ( d[i] != p1_correct[i]){
							selected_data.values[i] = 0;
						} else {
							selected_data.values[i] = 1;
						}
					}
					if (stage == "pattern_comp_p2"){
						if ( d[i] != p2_correct[i]){
							selected_data.values[i] = 0;
						} else {
							selected_data.values[i] = 1;
						}
					}

			}
	    return selected_data;
	}

function score(){
	var score_data_p1 = jsPsych.data.get().filter({exp_stage: "pattern_comp_p1"}).select("key_press");
	var score_data_p2 = jsPsych.data.get().filter({exp_stage: "pattern_comp_p2"}).select("key_press");
	var d_1 = score_data_p1.values;// get the data values
	var d_2 = score_data_p2.values;// get the data values

		for( var i = 0; i < d_1.length; i++){
			if ( d_1[i] === null) {
				d_1.splice(i, 1);
				i--;
			}}

				for( var i = 0; i < d_2.length; i++){
					if ( d_2[i] === null) {
						d_2.splice(i, 1);
						i--;
					}}

	for (var i = 0; i < d_1.length; i++){
				if ( d_1[i] != p1_correct[i]){
					d_1[i] = 0;
				} else {
					d_1[i] = 1;
				}
		}
		for (var i = 0; i < d_2.length; i++){
				if ( d_2[i] != p2_correct[i]){
					d_2[i] = 0;
				} else {
					d_2[i] = 1;
				}
	}
	console.log(d_1);
	console.log(d_2);
	var search = 0;
	var count_1 = d_1.reduce(function(n, val) {
    return n + (val === search);
		}, 0);
		var count_2 = d_2.reduce(function(n, val) {
	    return n + (val === search);
			}, 0);
	console.log(count_1);
	console.log(count_2);

	var p1_score = d_1.length - count_1;
	var p2_score = d_2.length - count_2;
	var tally = (p1_score+p2_score)/2
	return {final_score: tally, p1: p1_score, p2: p2_score}
}
/*
	var welcome = {
	  type: "html-keyboard-response",
	  stimulus: "Welcome to the Pattern Comparison task. Press any key to begin.",
	  data:{
	    exp_stage: "instructions"
	  }
	};
	*/
	var instructions = {
	  type: "instructions-min-viewing-time",
		pages:[
			"Welcome to the Pattern Comparison task. Press the right arrow key to begin.",
	  '<p style:"font-size:30px">PATTERN COMPARISON</p>' +
	  '<br><br><p>In this task you will be asked to determine whether two patterns of lines are the same or different. If the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
	  '<br><p>You will complete a few practice trials before starting.</p><br><p>Press the right arrow key to continue.</p>',
		'<p>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY.</p>' +
	  '<br><p>Press the right arrow key to begin the practice trials.</p>'
	],
		key_forward: 39,
		key_backward: 37,
		post_trial_gap: 250,
		data:{
	    exp_stage: "instructions"
	  }
	};
/*
	var instructions2 = {
	  type: "html-keyboard-response",
	  stimulus:'<p>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY.</p>' +
	  '<br><p>Press any key to begin the practice trials.</p>',
	  post_trial_gap: 250,
	  data:{exp_stage: "instructions"}
	};
*/
	var alt_practice = {
	  timeline: [
	  {
	  type: "html-keyboard-response",
	  choices: [37, 39],
	  stimulus: function(){
	    var html='<div class="row">' +
	                '<div class="column"><img src=' +
	                  jsPsych.timelineVariable("stimulus_1", true) +
	                     //practice_left[practice_index] +
	                     ' style="width:150px;height:150px";>' +
	                     '</img>' +
	                '</div>' +
	                '<div class="column"><img src=' +
	                jsPsych.timelineVariable("stimulus_2", true) +
	                //practice_right[practice_index] +
	                '  style="width:150px;height:150px";></img>'+
	                '</div>'+
	              '</div>';
	    return html;
	  }
		//,
	  //    post_trial_gap: 250
	  }],
				prompt: '<br><br><br><p style="font-size:25px">Press ‹— for Same. Press —› for Different.</p>',
	  data: jsPsych.timelineVariable('data'),
	  on_finish: function(data){
	    if (data.key_press == data.corr_resp){
	      data.accuracy = 1;
	    } else {
	      data.accuracy = 0;
	      }
	  },
	  timeline_variables:
		[
	    {stimulus_1: patterns_practice + "prac_1_1.png",
	      stimulus_2: patterns_practice + "prac_1_2.png",
	        data: {corr_resp: 37, exp_stage: "practice"}},
	    {stimulus_1: patterns_practice + "prac_2_1.png",
	      stimulus_2: patterns_practice + "prac_2_2.png",
	        data: {corr_resp: 39, exp_stage: "practice"}},
	    {stimulus_1: patterns_practice + "prac_3_1.png",
	      stimulus_2: patterns_practice + "prac_3_2.png",
	        data: {corr_resp: 39, exp_stage: "practice"}}
	  ]
	};

	var limit = 30000;
	var trl = null;
	var time = null;
	var time_out = 0;

	var interim_instructions = {
	  type: "html-keyboard-response",
	  stimulus: '<p>You have now completed the practice trials. For the experiment, you will have 30 seconds to complete as many problems as you can. You will complete this process two times in total.<br><br>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
	  '<br><p>Press any key to begin.</p>',
	  post_trial_gap: 250,
	  data:{exp_stage: "instructions"},
		on_finish: function(){
			console.log(limit);
			console.log(time);
			console.log(time_out);
			console.log('what else???');
		}
	};

	var generic_trial = {
		timeline:[
			{
				type: "html-keyboard-response",
				choices: [37, 39],
				stimulus: function(){
					var html='<div class="row">' +
											'<div class="column"><img src=' +
												jsPsych.timelineVariable("stimulus_1", true) +
													 ' style="width:150px;height:150px";>' +
													 '</img>' +
											'</div>' +
											'<div class="column"><img src=' +
											jsPsych.timelineVariable("stimulus_2", true) +
											'  style="width:150px;height:150px";></img>'+
											'</div>'+
										'</div>';
					return html;
				},
						prompt: '<br><br><br><p style="font-size:25px">Press ‹— for Same. Press —› for Different.</p>',
					//	post_trial_gap: 250,
						trial_duration: function(){
							return limit;
						},

				}

		]
	};

var trial_1 = {
	timeline: [generic_trial],
	data: jsPsych.timelineVariable('data'),
	on_finish: function(){
		jsPsych.data.get().addToLast({dur: limit});
		trl = jsPsych.data.get().select('time_elapsed');
		console.log(trl);
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		console.log(time);
		jsPsych.data.get().addToLast({time_between: time});
		limit = limit - time;
		time_out = 0;
		console.log(time_out);
		setTimeout(
			function(){
			time_out = 1;
			limit = 0;
			console.log('timeout');
			console.log(time_out);
			jsPsych.data.get().addToLast({timeout: time_out});
		}, limit);
	},
	timeline_variables:[
		{
	stimulus_1: p1_left[0],

	stimulus_2:  p1_right[0],

	data: {corr_resp: 37 , exp_stage: 'pattern_comp_p1'}
	}
		]
};


var test_trials_p1_trl2 = {
	timeline: [generic_trial],
  data: jsPsych.timelineVariable('data'),
	on_finish: function(){
		console.log("limit");
		console.log(limit);
		jsPsych.data.get().addToLast({dur: limit});
		trl = jsPsych.data.get().select('time_elapsed');
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		jsPsych.data.get().addToLast({time_between: time});
		limit = limit - time;
		if (limit < 0){
			limit = 0;
			time_out = 1;
			console.log(limit);
		}
	},
	timeline_variables: [
						{
		stimulus_1: p1_left[1],

		stimulus_2:  p1_right[1],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[2],

		stimulus_2:  p1_right[2],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[3],

		stimulus_2:  p1_right[3],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[4],

		stimulus_2:  p1_right[4],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[5],

		stimulus_2:  p1_right[5],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[6],

		stimulus_2:  p1_right[6],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[7],

		stimulus_2:  p1_right[7],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[8],

		stimulus_2:  p1_right[8],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[9],

		stimulus_2:  p1_right[9],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[10],

		stimulus_2:  p1_right[10],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[11],

		stimulus_2:  p1_right[11],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[12],

		stimulus_2:  p1_right[12],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[13],

		stimulus_2:  p1_right[13],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[14],

		stimulus_2:  p1_right[14],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[15],

		stimulus_2:  p1_right[15],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[16],

		stimulus_2:  p1_right[16],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[17],

		stimulus_2:  p1_right[17],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[18],

		stimulus_2:  p1_right[18],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[19],

		stimulus_2:  p1_right[19],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[20],

		stimulus_2:  p1_right[20],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[21],

		stimulus_2:  p1_right[21],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[22],

		stimulus_2:  p1_right[22],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[23],

		stimulus_2:  p1_right[23],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[24],

		stimulus_2:  p1_right[24],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[25],

		stimulus_2:  p1_right[25],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[26],

		stimulus_2:  p1_right[26],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[27],

		stimulus_2:  p1_right[27],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[28],

		stimulus_2:  p1_right[28],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p1'}
		},
		{
		stimulus_1: p1_left[29],

		stimulus_2:  p1_right[29],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p1'}
		}
	],
	conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        if(time_out != 0){
            return false;
        } else {
            return true;
        }
    }
};


var interim_instructions_2 = {
  type: "instructions-min-viewing-time",
  pages:[
  '<p>You will now complete the same process again. You will have 30 seconds to complete as many problems as you can. <br><br>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
  '<br><p>Press the right arrow key to begin.</p>'
],
	min_viewing_time: 2500,
  post_trial_gap: 250,
	key_forward: 39,
	key_backward: 37,
  data:{
    exp_stage: "instructions"
  },
  on_finish: function(){
		trl = jsPsych.data.get().select('time_elapsed');
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		console.log("time between last trial and end");
		console.log(time);
		jsPsych.data.get().addToLast({dur: limit});
    var selected_data = filter_data("pattern_comp_p1");
    jsPsych.data.get().addToLast({correct_responses: selected_data});
		limit = 30000;
		trl = null;
		time = null;
		time_out = 0;
  },
};



var trial_2 = {
	timeline: [generic_trial],
	data: jsPsych.timelineVariable('data'),
	on_finish: function(){
		jsPsych.data.get().addToLast({dur: limit});
		trl = jsPsych.data.get().select('time_elapsed');
		console.log(trl);
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		console.log(time);
		jsPsych.data.get().addToLast({time_between: time});
		limit = limit - time;
		console.log(limit);
		setTimeout(
			function(){
			time_out = 1;
			limit = 0;
			console.log('timeout');
			console.log(time_out);
			jsPsych.data.get().addToLast({timeout: time_out});
		}, limit);
	},
	timeline_variables:
	[
			{
			stimulus_1: p2_left[0],

			stimulus_2:  p2_right[0],

			data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
			}
	]
}

var test_trials_p2_trl2 = {
	timeline: [generic_trial],
  data: jsPsych.timelineVariable('data'),
	on_finish: function(){
		console.log("limit");
		console.log(limit);
		jsPsych.data.get().addToLast({dur: limit});
		trl = jsPsych.data.get().select('time_elapsed');
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		jsPsych.data.get().addToLast({time_between: time});
		limit = limit - time;
		if (limit < 0){
			limit = 0;
			time_out = 1;
			console.log(limit);
		}
	},
			prompt: '<br><br><br><p style="font-size:25px">Press ‹— for Same. Press —› for Different.</p>',
		timeline_variables: [
	{
		stimulus_1: p2_left[1],

		stimulus_2:  p2_right[1],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[2],

		stimulus_2:  p2_right[2],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[3],

		stimulus_2:  p2_right[3],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[4],

		stimulus_2:  p2_right[4],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[5],

		stimulus_2:  p2_right[5],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[6],

		stimulus_2:  p2_right[6],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[7],

		stimulus_2:  p2_right[7],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[8],

		stimulus_2:  p2_right[8],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[9],

		stimulus_2:  p2_right[9],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[10],

		stimulus_2:  p2_right[10],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[11],

		stimulus_2:  p2_right[11],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[12],

		stimulus_2:  p2_right[12],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[13],

		stimulus_2:  p2_right[13],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[14],

		stimulus_2:  p2_right[14],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[15],

		stimulus_2:  p2_right[15],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[16],

		stimulus_2:  p2_right[16],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[17],

		stimulus_2:  p2_right[17],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[18],

		stimulus_2:  p2_right[18],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[19],

		stimulus_2:  p2_right[19],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[20],

		stimulus_2:  p2_right[20],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[21],

		stimulus_2:  p2_right[21],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[22],

		stimulus_2:  p2_right[22],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[23],

		stimulus_2:  p2_right[23],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[24],

		stimulus_2:  p2_right[24],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[25],

		stimulus_2:  p2_right[25],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[26],

		stimulus_2:  p2_right[26],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[27],

		stimulus_2:  p2_right[27],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[28],

		stimulus_2:  p2_right[28],

		data: {corr_resp:  37, exp_stage: 'pattern_comp_p2'}
		},
		{
		stimulus_1: p2_left[29],

		stimulus_2:  p2_right[29],

		data: {corr_resp:  39, exp_stage: 'pattern_comp_p2'}
		}
		],
		conditional_function: function(){
					// get the data from the previous trial,
					// and check which key was pressed
					if(time_out != 0){
							return false;
					} else {
							return true;
					}
			}
};
/*
var trl_2 = {
	timeline: [
	{
	type: "html-keyboard-response",
	choices: [37, 39],
	stimulus: function(){
		var html='<div class="row">' +
								'<div class="column"><img src=' +
									jsPsych.timelineVariable("stimulus_1", true) +
										 ' style="width:150px;height:150px";>' +
										 '</img>' +
								'</div>' +
								'<div class="column"><img src=' +
								jsPsych.timelineVariable("stimulus_2", true) +
								'  style="width:150px;height:150px";></img>'+
								'</div>'+
							'</div>';
		return html;
	},
			post_trial_gap: 250,
			trial_duration: limit,
	}],
	data: jsPsych.timelineVariable('data'),
	on_start: function(){
			setTimeout(
				function(){
				time_out = 1;
				jsPsych.endCurrentTimeline;
			}, limit);
	},
	on_finish: function(){
		jsPsych.data.get().addToLast({dur: limit});
		trl = jsPsych.data.get().select('time_elapsed');
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		jsPsych.data.get().addToLast({time_between: time});
		limit = limit - time - 250;
		if (limit <= 0){
			jsPsych.endCurrentTimeline;
			jsPsych.data.get().addToLast({limit_timeout: 1});
			limit = 30;
		}
		jsPsych.data.get().addToLast({timeout: time_out})
	},
	timeline_variables: [
		{stimulus_1: patterns_practice + "prac_2_1.png",
			stimulus_2: patterns_practice + "prac_2_2.png",
				data: {corr_resp: 39, exp_stage: "practice",
			stim:  "prac_2_1.png"}},
		{stimulus_1: patterns_practice + "prac_3_1.png",
			stimulus_2: patterns_practice + "prac_3_2.png",
				data: {corr_resp: 39, exp_stage: "practice",
			stim:  "prac_3_1.png"}}
	]
};
*/
/*
var filter_data = function(stage){
		var selected_data = jsPsych.data.get().filter({exp_stage: stage}).select("key_press");
  //  var  = jsPsych.data.get().filter(rows).ignore(ignore_columns);
    // the next piece of codes orders the columns of the data file
    var d = selected_data.values;// get the data values
		for (var i = 0; i < d.length; i++){
				if (stage == "pattern_comp_p1"){
					if ( d[i] != p1_correct[i]){
						selected_data.values[i] = 0;
					} else {
						selected_data.values[i] = 1;
					}
				}
				if (stage == "pattern_comp_p2"){
					if ( d[i] != p2_correct[i]){
						selected_data.values[i] = 0;
					} else {
						selected_data.values[i] = 1;
					}
				}

		}
		console.log(selected_data);
    return selected_data;
  }


*/
var debrief = {
	  type: "html-keyboard-response",
		stimulus: "<p>You have now completed this task. Please continue to the next portion of the experiment. You may press any key to continue.</p>",
		on_finish: function(){
			var selected_data = filter_data("pattern_comp_p2");
			jsPsych.data.get().addToLast({correct_responses: selected_data});
		var scores = score();
		jsPsych.data.addProperties({final_tally: scores});
		},
		data:{exp_stage: "instructions"}
	};

//timeline.push(welcome);
timeline.push(instructions);
//timeline.push(instructions2);
timeline.push(alt_practice);
timeline.push(interim_instructions);
timeline.push(trial_1);
timeline.push(test_trials_p1_trl2);
timeline.push(interim_instructions_2);
timeline.push(trial_2);
timeline.push(test_trials_p2_trl2);
timeline.push(debrief);
