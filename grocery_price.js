/*
  Script for running the grocery price experiment!
*/

var timeline = [];
// task desiderata
// needs to be able to connect test and study stimuli across pattern comparison task
// need to load in actual stimuli


// study structure
// instructions (how many pages?)
// random order of stimuli (60 total)

// should be uniform across sample, but will create small differences in subjects per list
var list = jsPsych.randomization.sampleWithoutReplacement([0,1,2,3,4,5,6,7,8,9],1)[0];

// just going to load every f'in list in qualtrics
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




var test_function = {
    timeline: [
      {
        type: 'html-button-response',
        stimulus:  function(){
          html='<div class="row">'+'<div class="column">' +
          jsPsych.timelineVariable('item') +
          '</div>' +
          '<div class="column"> $ ' + jsPsych.timelineVariable("test_price")+
          '</div><div>';
          return html;
        },
        choices: jsPsych.timelineVariable('buttons'),
        prompt: jsPsych.timelineVariable('question_prompt')
      }
    ],
    timeline_variables: [
      {question_type: ["associative"] ,
      buttons: ["studied together", "not studied together"],
      data: ["old", "new"],
      question_prompt: ["<br><br><br><p style='font-size:25px'>Were these items studied together?</p>"]},
      {question_type: ["source"] ,
      buttons: ["Less than $6", "More than $10", "Not studied"],
      data: ["MP", "OP", "new"],
      question_prompt: ["<br><br><br><p style='font-size:25px'>Was the studied price for this grocery item...?</p>"]},
      {question_type: ["item"] ,
      buttons: ["Yes", "No"],
      data: ["old", "new"],
      question_prompt: ["<br><br><br><p style='font-size:25px'>Was this price originally studied?</p>"]}
    ]

  }

  var test_timeline = {
    timeline: [test_function],
    timeline_variables: test_shuffled,
    randomize_order: true,
    on_finish: console.log(list)
  }


timeline.push(test_timeline);
