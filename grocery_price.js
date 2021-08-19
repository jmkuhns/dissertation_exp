/*
  Script for running the grocery price experiment!
*/

var timeline = [];

// should be uniform across sample, but will create small differences in subjects per list
var list = jsPsych.randomization.sampleWithoutReplacement([0,1,2,3,4,5,6,7,8,9],1)[0];

// going to load every list in qualtrics
// part, which means that I can just pick the list randomly above, and then start referring to the chosen list


var l_web_names = ["list_1",
"list_2",
"list_3",
"list_4",
"list_5",
"list_6",
"list_7",
"list_8",
"list_9",
 "list_10"];
var l_test_names = ["test_list_1",
 "test_list_2",
  "test_list_3",
  "test_list_4",
  "test_list_5",
  "test_list_6",
  "test_list_7",
  "test_list_8",
  "test_list_9",
  "test_list_10"];

// select set the study list for the experiment
var study = eval(l_web_names[list]);
var test = eval(l_test_names[list]);




// study and test will be filled out variables
// as if they were manually defined
// var prac = [{bob: "hey", phil: "yo"}, {bob:"yo", phil: "hey"}];

var study_shuffled = jsPsych.randomization.shuffle(study);
var test_shuffled = jsPsych.randomization.shuffle(test);

var study_instructions_welcome = {
  type: 'html-keyboard-response',
  stimulus: "<p> Welcome to the Experiment. Press any key to begin.</p>",
  data:{exp_stage: "instruction"}
};

var study_instructions={
  type: "instructions",
  pages: ['<p style:"font-size:30px">Memory Task</p>' +
  '<br><p>In this task you will study a list of grocery items and prices for an upcoming memory test. </p><br><p>Some of the prices will reflect the approximate market value for that kind of grocery-item, and some of the prices will be much higher than what you might expect to pay for that kind of grocery-item.</p><br>Press the right arrow key to continue the instructions.<br><br><br>p. 1/2</p>',
  '<p style:"font-size:30px">Memory Task</p>' + '<br><p>You will study 60 pairs of grocery-items and prices in a random order. Each pair will be presented for 6 seconds at a time. All prices will end in 9. Prices that reflect that market value for an item will be priced under $6, whereas the overpriced items will be higher than $10. Half of the pairs will be under $6, and the other half will be higher than $10.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to begin.<br><br><br>p. 2/2</p>'
],
//  key_forward: "ArrowRight",
//  key_backward: "ArrowLeft",
  post_trial_gap: 300,
  data:{
    memory: 'memory',
    exp_stage: "instructions"
  }
};


var study_function = {
  timeline: [
    {
      type: 'html-keyboard-response',
      stimulus: function(){
        html =  '<div class = "row">' +
           '<div class="column">' +
            "<p style='font-size:25px'>" +
           jsPsych.timelineVariable('item') +
           // '</div>' +
            ' -- $' +
           jsPsych.timelineVariable("price")+
            "</p><br><br>" +
           '</div>'+
         '</div>';
         return html;
      },
    //  choices: jsPsych.NO_KEYS,
      trial_duration: 6000,
      post_trial_gap: function(){
  return jsPsych.randomization.sampleWithoutReplacement([250, 300, 350], 1)[0];
      },
      data: {memory: "memory",
      exp_stage: "study"}
    }
  ]
}
var study_timeline = {
  timeline: [study_function],
  timeline_variables: study_shuffled,
  randomize_order: true,
  on_finish: console.log(list)
}

var test_instructions = {
  type: "instructions",
  pages:[
    "<p>You have now completed the Pattern Comparison task. You will now take the memory test.</p><br><br><p>Press the Right arrow key to view the instructions.</p>",
  '<p style:"font-size:30px">Memory Test</p>' +
  '<br><p>In the upcoming memory test, you will be presented with grocery-items and prices in a random order. Some of the test pairs will be composed of grocery-items and prices that were studied, as well as grocery-items and  prices that were not on the study list. There will be four kinds of test pairs: (a) a test pair that is the same as the study pair, that is, the grocery-item and price were studied together (intact pair); (b) a test pair that consists of a grocery-item and price that were studied in different pairs (rearranged pair); (c) a test pair that consists of a studied grocery-item and a price that was not on the study list (old-new pair); (d) a test pair where both the grocery-item and price were not on the study list (new-new pair).</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 1/6</p>',
  '<p style:"font-size:30px">Memory Test</p>' +
  '<br><p>You will answer three multiple choice questions for each test pair. The response options for each question are written in capital letters. For each test pair, you will be asked: (1.) to judge whether the grocery-item and price were originally STUDIED together or were NOT STUDIED TOGETHER; (2.) to judge whether the grocery-item was originally paired with a price LESS THAN $6, MORE THAN $10, or to indicate that the the grocery-item in the test pair was NOT STUDIED; (3.) to judge whether the price in each test pair was on the study list, responding STUDIED if the price was on the study list, and responding NOT STUDIED if the price was not on the study list.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 2/6</p>',
  '<p style:"font-size:30px">Memory Test</p>' +
  '<br><p>For each test pair, the first question will ask you to judge whether the grocery-item and price were originally STUDIED TOGETHER, or were NOT STUDIED TOGETHER. You should only indicate that the grocery-item and price in a test pair were STUDIED TOGETHER if they are intact. For every other type of test pair, you should indicate that the pairs were NOT STUDIED TOGETHER. In other words, you should respond NOT STUDIED TOGETHER to any rearranged, old-new, or new-new test pairs.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 3/6</p>',
  '<p style:"font-size:30px">Memory Test</p>' +
  '<br><p>The second question will ask you to judge whether the grocery-item in each test pair was originally paired with a price that was LESS THAN $6, MORE THAN $10, or whether the grocery-item was NOT STUDIED at all. It is important to note that the prices in test pairs may or may not be in the same price range as the original study price. Grocery-items in rearranged and old-new test pairs may have been paired with a price that was LESS THAN $6 at study, but may be paired with a price that is MORE THAN $10 at test, or vice versa. Grocery-items that were NOT STUDIED will only be paired with prices that were NOT STUDIED as well (i.e., new-new test pairs).</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 4/6</p>',

'<p style:"font-size:30px">Memory Test</p>' +
  '<br><br><p>The third question will ask you to judge whether the price in each test pair was originally STUDIED or was NOT STUDIED. Prices in test pairs that were NOT STUDIED can be paired with grocery-items that were on the study list, and with grocery-items that were NOT STUDIED.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 5/6</p>',
'<p style:"font-size:30px">Memory Test</p>' +
  '<br><br><p>Test pairs will be presented in a random order. The memory test is self-paced. However, once you click an option, the test will advance to the next question. Please be careful before selecting an option, because you will not be able to go back and change your answers.</p><br><p>You may press the Left arrow key to review any previous instructions. Otherwise, you may press the Right arrow key to begin the memory test.<br><br><br>p. 6/6</p>'

  ],
//  key_forward: "ArrowRight",
//  key_backward: "ArrowLeft",
  post_trial_gap: 300,
  data:{
    memory: 'memory',
    exp_stage: "instructions"
  }
}


var test_function = {
    timeline: [
      {
        type: 'html-button-response',
        stimulus:  function(){
     html =  '<div class="row">' +
    jsPsych.timelineVariable('question_prompt') +
     '</div>'+
     '<div class = "row">' +
       '<div class="column">' +
        "<p style='font-size:25px'>" +
       jsPsych.timelineVariable('item') +
       // '</div>' +
        ' -- $' +
       jsPsych.timelineVariable("test_price")+
        "</p><br><br>" +
       '</div>'+
     '</div>';
          return html;
        },
        choices: jsPsych.timelineVariable('buttons'),
        post_trial_gap: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 300, 350], 1)[0];
  }
      }
    ],
    timeline_variables: [
      {
        question_type: ["associative"] ,
        buttons: ["<p style='font-size:25px'>Studied together</p>", "<p style='font-size:25px'>Not studied together</p>"],
        data: {memory: "memory", exp_stage: "study"},
        question_prompt: ["<p style='font-size:25px'>Were these items studied together?</p><br><br>"],
      },
      {
        question_type: ["source"] ,
        buttons: ["<p style='font-size:25px'>Less than $6</p>", "<p style='font-size:25px'>More than $10</p>", "<p style='font-size:25px'>Not studied</p>"],
        data: {memory: "memory", exp_stage: "study"},
        question_prompt: ["<p style='font-size:25px'>Was the studied price for this grocery item...?</p><br><br>"],
        stimulus:  function(){
            html =  '<div class="row">' +
            jsPsych.timelineVariable('question_prompt') +
            '</div>'+
            '<div class = "row">' +
            '<div class="column">' +
            "<p style='font-size:25px'><u>" +
            jsPsych.timelineVariable('item') +
            // '</div>' +
            '</u> -- $' +
            jsPsych.timelineVariable("test_price")+
            "</p><br><br>" +
            '</div>'+
            '</div>';
          return html;
        }
      },
      {
        question_type: ["item"] ,
        buttons: ["<p style='font-size:25px'>STUDIED</p>", "<p style='font-size:25px'>NOT STUDIED</p>"],
        data: {memory: "memory", exp_stage: "study"},
        question_prompt: ["<p style='font-size:25px'>Was this price originally studied?</p><br><br>"],
        stimulus:  function(){
            html =  '<div class="row">' +
            jsPsych.timelineVariable('question_prompt') +
            '</div>'+
            '<div class = "row">' +
            '<div class="column">' +
            "<p style='font-size:25px'>" +
            jsPsych.timelineVariable('item') +
            // '</div>' +
            ' -- <u>$' +
            jsPsych.timelineVariable("test_price")+
            "</u></p><br><br>" +
            '</div>'+
            '</div>';
          return html;
        }
      }
    ]

  }

var attn_check_words_init = [
    { word: "wires" },
    { word: "theme" },
    { word: "lone"  },
    { word: "morsel" }
  ];
var attn_check_words = jsPsych.randomization.shuffle(attn_check_words_init);

var attn_check = {
    type: 'survey-text',
    questions: [
      { prompt: function(){
        html = "<p>Please type the word " +
        jsPsych.timelineVariable("word") +
        " into the text box below.</p>";
        return html;
      }
    }],
    data: {
  		exp_stage: "attention_check"},
    timeline_variables: attn_check_words
  };

  var test_timeline = {
      timeline: [test_function],
      timeline_variables: test_shuffled,
      //randomize_order: true,
      on_finish: console.log(list)
    };

var expanded_test = {
  timeline: [test_timeline, attn_check],
  sample:{
    type: "with-replacement",
    size: 84,
    weights: [80, 4]
  }

};
/*
var foo = [];
for (var i = 0; i <= 83; i++) {
    foo.push(i);
  }
  var attention_check_sample = jsPsych.randomization.sampleWithoutReplacement(foo, 4);

  // the console log below is so that you can see which trial indices were selected to be attention checks
   // each time you run the experiment
   console.log('attention check trials: ', attention_check_sample);

   // create a new array based on trial info, but with the 'att_check' property changed to 'true'
   // for the trials that were randomly sampled
   var trial_info_att_checks = [];
   trial_info.forEach(function(el, ind) {
     if (attention_check_sample.includes(ind)) {
       el.att_check = true;
       trial_info_att_checks.push(el);
     } else {
       trial_info_att_checks.push(el);
     }
   });

var attention_check_location = null;
var trial_counter = 0;
var pick_attention_check_location = {
	type: 'call-function',
	func: function(){
		// creating possible location array for easier modification of where the trial can occur

		attention_check_location = jsPsych.randomization.sampleWithoutReplacement(possible_locations, 1)[0];
	}
}


var attention_check_conditional = {
	timeline: [attn_check],
	conditional_function: function(){
		trial_counter++; // can increment the counter here because this code will run on every iteration of the timeline
		if(trial_counter == attention_check_location){
			return true;
		} else {
			return false;
		}
	}
}

var block = {
	timeline: [attention_check_conditional, ready_scr, pic_scr, blank_scr],
	timeline_variables: trial_stimuli,
	sample: {
		type: 'custom',
		fn: function () {
			var order = jsPsych.randomization.shuffle(groups); // shuffle 4 groups
			var selected_items = [];
			// iterate through 4 groups and get four image from each group
			for (var i = 0; i < 4; i++) {
                        	var new_items = jsPsych.randomization.sampleWithReplacement(order[i], 4); //select four items from each emotion group
				selected_items = selected_items.concat(new_items);
			}
			var final_items = jsPsych.randomization.shuffle(selected_items);
			return final_items;
		}
	},
};

*/


// pattern comparison below here; timeline pushed at very end

  var patterns = "https://jmkuhns.github.io/pattern-comparison/patterns/";
  var patterns_practice = "https://jmkuhns.github.io/pattern-comparison/patterns_practice/";
  	var cresp = ["ArrowLeft", "ArrowRight", "ArrowRight"];
  	var p1_correct = ["ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft"];
  	var p2_correct = ["ArrowRight", "ArrowRight", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowLeft", "ArrowRight"];

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

  	var instructions = {
        type: "instructions",
  		pages:[
        "You have completed study of the grocery items. Before taking the memory test, you will complete a pattern comparison task. Press the right arrow key to begin.",
  	  '<p style:"font-size:30px">PATTERN COMPARISON</p>' +
  	  '<br><br><p>In this task you will be asked to determine whether two patterns of lines are the same or different. If the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to respond as accurately and rapidly as you can.</p>' +
  	  '<br><p>You will complete a few practice trials before starting.</p><br><p>Press the right arrow key to continue.<br><br><br>p. 1/2</p>',
  		'<p>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY.</p>' +
  	  '<br><p>Press the right arrow key to begin the practice trials.<br><br><br>p. 2/2</p>'
  	],
  //		key_forward: "ArrowRight",
  //		key_backward: "ArrowLeft",
  		post_trial_gap: 250,
  		data:{pattern: 'pattern',
  	    exp_stage: "instructions"
  	  }
  	};

  	var alt_practice = {
  	  timeline: [
  	  {
  	  type: "html-keyboard-response",
  	  choices: ["ArrowLeft", "ArrowRight"],
  	  stimulus: function(){
  	    var html='<div class="row">' +
  	                '<div class="column"><img src=' +
  	                  jsPsych.timelineVariable("stimulus_1", true) +
  	                     //practice_left[practice_index] +
  	                     ' style="width:150px;height:150px";>' +
  	                     '</img><p>   </p>' +
  	                //'</div>' +
  	                //'<div class="column">'+
                    '<img src=' +
  	                jsPsych.timelineVariable("stimulus_2", true) +
  	                //practice_right[practice_index] +
  	                '  style="width:150px;height:150px";></img>'+
  	                //'</div>'+
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
  	        data: {pattern: 'pattern',corr_resp: "ArrowLeft", exp_stage: "practice"}},
  	    {stimulus_1: patterns_practice + "prac_2_1.png",
  	      stimulus_2: patterns_practice + "prac_2_2.png",
  	        data: {pattern: 'pattern',corr_resp: "ArrowRight", exp_stage: "practice"}},
  	    {stimulus_1: patterns_practice + "prac_3_1.png",
  	      stimulus_2: patterns_practice + "prac_3_2.png",
  	        data: {pattern: 'pattern',corr_resp: "ArrowRight", exp_stage: "practice"}}
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
  	  data:{pattern: 'pattern',exp_stage: "instructions"},
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
  				choices: ["ArrowLeft", "ArrowRight"],
  				stimulus: function(){
  					var html='<div class="row">' +
  											'<div class="column"><img src=' +
  												jsPsych.timelineVariable("stimulus_1", true) +
  													 ' style="width:150px;height:150px";>' +
  													 '</img><p>   </p>' +
  											//'</div>' +
  											//'<div class="column">'+
                        '<img src=' +
  											jsPsych.timelineVariable("stimulus_2", true) +
  											'  style="width:150px;height:150px";></img>'+
  											//'</div>'+
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

  	data: {pattern: 'pattern', corr_resp: "ArrowLeft" , exp_stage: 'pattern_comp_p1'}
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

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[2],

  		stimulus_2:  p1_right[2],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[3],

  		stimulus_2:  p1_right[3],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[4],

  		stimulus_2:  p1_right[4],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[5],

  		stimulus_2:  p1_right[5],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[6],

  		stimulus_2:  p1_right[6],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[7],

  		stimulus_2:  p1_right[7],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[8],

  		stimulus_2:  p1_right[8],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[9],

  		stimulus_2:  p1_right[9],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[10],

  		stimulus_2:  p1_right[10],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[11],

  		stimulus_2:  p1_right[11],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[12],

  		stimulus_2:  p1_right[12],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[13],

  		stimulus_2:  p1_right[13],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[14],

  		stimulus_2:  p1_right[14],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[15],

  		stimulus_2:  p1_right[15],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[16],

  		stimulus_2:  p1_right[16],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[17],

  		stimulus_2:  p1_right[17],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[18],

  		stimulus_2:  p1_right[18],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[19],

  		stimulus_2:  p1_right[19],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[20],

  		stimulus_2:  p1_right[20],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[21],

  		stimulus_2:  p1_right[21],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[22],

  		stimulus_2:  p1_right[22],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[23],

  		stimulus_2:  p1_right[23],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[24],

  		stimulus_2:  p1_right[24],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[25],

  		stimulus_2:  p1_right[25],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[26],

  		stimulus_2:  p1_right[26],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[27],

  		stimulus_2:  p1_right[27],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[28],

  		stimulus_2:  p1_right[28],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p1'}
  		},
  		{
  		stimulus_1: p1_left[29],

  		stimulus_2:  p1_right[29],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p1'}
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
    type: "html-keyboard-response",
    pages:[
    '<p>You will now complete the same process again. You will have 30 seconds to complete as many problems as you can. <br><br>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
    '<br><p>Press the right arrow key to begin.</p>'
  ],
    post_trial_gap: 250,
  //	key_forward: "ArrowRight",
  //	key_backward: "ArrowLeft",
    choices: "Enter" ,
    data:{pattern: 'pattern',
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

  			data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
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

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[2],

  		stimulus_2:  p2_right[2],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[3],

  		stimulus_2:  p2_right[3],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[4],

  		stimulus_2:  p2_right[4],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[5],

  		stimulus_2:  p2_right[5],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[6],

  		stimulus_2:  p2_right[6],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[7],

  		stimulus_2:  p2_right[7],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[8],

  		stimulus_2:  p2_right[8],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[9],

  		stimulus_2:  p2_right[9],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[10],

  		stimulus_2:  p2_right[10],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[11],

  		stimulus_2:  p2_right[11],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[12],

  		stimulus_2:  p2_right[12],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[13],

  		stimulus_2:  p2_right[13],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[14],

  		stimulus_2:  p2_right[14],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[15],

  		stimulus_2:  p2_right[15],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[16],

  		stimulus_2:  p2_right[16],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[17],

  		stimulus_2:  p2_right[17],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[18],

  		stimulus_2:  p2_right[18],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[19],

  		stimulus_2:  p2_right[19],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[20],

  		stimulus_2:  p2_right[20],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[21],

  		stimulus_2:  p2_right[21],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[22],

  		stimulus_2:  p2_right[22],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[23],

  		stimulus_2:  p2_right[23],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[24],

  		stimulus_2:  p2_right[24],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[25],

  		stimulus_2:  p2_right[25],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[26],

  		stimulus_2:  p2_right[26],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[27],

  		stimulus_2:  p2_right[27],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[28],

  		stimulus_2:  p2_right[28],

  		data: {pattern: 'pattern',corr_resp:  "ArrowLeft", exp_stage: 'pattern_comp_p2'}
  		},
  		{
  		stimulus_1: p2_left[29],

  		stimulus_2:  p2_right[29],

  		data: {pattern: 'pattern',corr_resp:  "ArrowRight", exp_stage: 'pattern_comp_p2'}
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

timeline.push(study_instructions_welcome);
/*
timeline.push(study_instructions);
timeline.push(study_timeline);
*/
/*
// quick foray in to a pattern comparison task
  timeline.push(instructions);
  timeline.push(alt_practice);
  timeline.push(interim_instructions);
  timeline.push(trial_1);
  timeline.push(test_trials_p1_trl2);
  timeline.push(interim_instructions_2);
  timeline.push(trial_2);
  timeline.push(test_trials_p2_trl2);
*/
// now back to memory

//  timeline.push(test_instructions);

  timeline.push(expanded_test);
