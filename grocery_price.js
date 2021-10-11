/*
  Script for running the grocery price experiment!
*/

var timeline = [];

// used to jitter the intertrial intervals
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function comparison_jitter(){
   return getRandomInt(200, 250);
 }
// iti used in comparison tasks
var iti = comparison_jitter();

// should be uniform across sample, but will create small differences in number of subjects per list
var list = jsPsych.randomization.sampleWithoutReplacement([0,1,2,3,4,5,6,7,8,9],1)[0];
// going to load every list in the qualtrics
// part, which means that I can just pick the list randomly above, and then start referring to the chosen list


var l_web_names = ["list_01",
"list_02",
"list_03",
"list_04",
"list_05",
"list_06",
"list_07",
"list_08",
"list_09",
 "list_10"];
var l_test_names = ["test_list_01",
 "test_list_02",
  "test_list_03",
  "test_list_04",
  "test_list_05",
  "test_list_06",
  "test_list_07",
  "test_list_08",
  "test_list_09",
  "test_list_10"];

// select set the study list for the experiment
var study = eval(l_web_names[list]);
var test = eval(l_test_names[list]);

for(var i = 0; i < 96; i++) {
    test[i].att_chk = false;
}
// the second number in slice is not-inclusive, but the first is!
study_list_1 =  study.slice(0,48);
study_list_2 = study.slice(48);

test_list_1 = test.slice(0, 48);
test_list_2 = test.slice(48);


var attn_check_words = [
    { word: "wires", att_chk: true },
    { word: "theme", att_chk: true },
    { word: "lone", att_chk: true  },
    { word: "morsel", att_chk: true }
  ];

var attn_check_words_shuf = jsPsych.randomization.shuffle(attn_check_words);

var attention_check_word_one = attn_check_words_shuf[0];
var attention_check_word_two = attn_check_words_shuf[1];
var attention_check_word_three = attn_check_words_shuf[2];
var attention_check_word_four = attn_check_words_shuf[3];

// copy pasted from R console output from call > cat(paste(3:18, ","))
var range1 = [3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18];
var range2 = [23 , 24 , 25 , 26 , 27 , 28 , 29 , 30 , 31 , 32 , 33 , 34 , 35 , 36 , 37 , 38];
/*var range3 = [43 , 44 , 45 , 46 , 47 , 48 , 49 , 50 , 51 , 52 , 53 , 54 , 55 , 56 , 57 , 58];
var range4 = [63 , 64 , 65 , 66 , 67 , 68 , 69 , 70 , 71 , 72 , 73 , 74 , 75 , 76 , 77 , 78];*/


// put num in first twenty; 0-19
var atten_check_one = jsPsych.randomization.sampleWithoutReplacement(range1)[0];
// next is 20-39
var atten_check_two = jsPsych.randomization.sampleWithoutReplacement(range2)[0];
// for test list 2
var atten_check_three = jsPsych.randomization.sampleWithoutReplacement(range1)[0];
// for test list 2
var atten_check_four = jsPsych.randomization.sampleWithoutReplacement(range2)[0];

var study_list_1_shuffled = jsPsych.randomization.shuffle(study_list_1);
var study_list_2_shuffled = jsPsych.randomization.shuffle(study_list_2);
var test_list_1_shuffled = jsPsych.randomization.shuffle(test_list_1);
var test_list2_shuffled = jsPsych.randomization.shuffle(test_list_2);


// slice selects obj at first index and includes objs up to but not including second index
// test list 1
var test_shuf_one = test_list_1_shuffled.slice(0,atten_check_one);
var test_shuf_two = test_list_1_shuffled.slice(atten_check_one, atten_check_two);
var test_shuf_three = test_list_1_shuffled.slice(atten_check_two);

// test list 2
var test_shuf_four = test_list2_shuffled.slice(0,atten_check_three);
var test_shuf_five = test_list2_shuffled.slice(atten_check_three, atten_check_four);
var test_shuf_six = test_list2_shuffled.slice(atten_check_four);


var attn_check = {
    type: 'survey-text',
    questions: [
      { prompt: function(){
        html = "<p>Please type the word '" +
        jsPsych.timelineVariable("word") +
        "' into the text box below.</p>";
        return html;
      }
    }],
    data: {
  		exp_stage: "attention_check",
      resp: jsPsych.timelineVariable("word")
    }
  };

var study_instructions_welcome = {
  type: 'html-keyboard-response',
  stimulus: "<p> Welcome to the Experiment. Press any key to begin.</p>",
  data:{exp_stage: "instructions"}
};

var study_instructions={
  type: "instructions-min-viewing-time",
  pages: ['<p style:"font-size:30px">Memory Task</p>' +
  '<br><p>In this task you are going to be shown pairs of grocery items and prices for an upcoming memory test. Grocery items will be paired with unique prices, and <b>you should try to remember which items and prices are paired together.</b></p><br><p>Some of the prices will reflect the approximate market value for that kind of grocery-item, and some of the prices will be much higher than what you might expect to pay for that kind of grocery-item.</p><br>Press the right arrow key to continue the instructions.<br><br><br>p. 1/2</p>',
  '<p style:"font-size:30px">Memory Task</p>' + '<br><p>We are going to show you 36 pairs of grocery-items and prices in a random order. Each pair will be shown for 6 seconds at a time.<br>Half of the pairs will be under $7 and the other half will be higher than $10, and all prices will end in 9. Prices that reflect the market value for an item will be priced under $7, whereas the overpriced items will be higher than $10.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to begin the task.<br><br><br>p. 2/2</p>'
],
//  key_forward: "ArrowRight",
//  key_backward: "ArrowLeft",
  post_trial_gap: 300,
  min_viewing_time: 3500,
  show_clickable_nav: true,
  data:{
    memory: 'memory',
    exp_stage: "instructions"
  }
};

var study_instructions_list_two ={
  type: "instructions-min-viewing-time",
  pages: ['<p style:"font-size:30px">Memory Task</p>' +
  '<br><p>You are going to be shown new pairs of grocery items and prices for an upcoming memory test. Both the grocery items and prices will be new.</p>' +
  '<p>The upcoming memory test will be in the same format as the previous memory test.</p><br><p>Press the right arrow key to continue the instructions.<br><br><br>p. 1/3</p'
    ,
  '<p style:"font-size:30px">Memory Task</p>' +
  '<br><p>In this task you are going to be shown pairs of grocery items and prices for an upcoming memory test. Grocery items will be paired with unique prices, and <b>you should try to remember which items and prices are paired together.</b></p><br><p>Some of the prices will reflect the approximate market value for that kind of grocery-item, and some of the prices will be much higher than what you might expect to pay for that kind of grocery-item.</p><br>You may press the Left arrow key to go back. Press the right arrow key to continue the instructions.<br><br><br>p. 2/3</p>',
  '<p style:"font-size:30px">Memory Task</p>' + '<br><p>We are going to show you 36 pairs of grocery-items and prices in a random order. Each pair will be shown for 6 seconds at a time.<br>Half of the pairs will be under $7 and the other half will be higher than $10, and all prices will end in 9. Prices that reflect the market value for an item will be priced under $7, whereas the overpriced items will be higher than $10.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to begin the task.<br><br><br>p. 2/3</p>'
],
//  key_forward: "ArrowRight",
//  key_backward: "ArrowLeft",
  post_trial_gap: 300,
  min_viewing_time: 3500,
  show_clickable_nav: true,
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
            "<p style='font-size:40px'>" +
           jsPsych.timelineVariable('item') +
           // '</div>' +
            ' -- $' +
           jsPsych.timelineVariable("price")+
            "</p><br><br>" +
           '</div>'+
         '</div>';
         return html;
      },
      // undo the comment when ready to ship // // // // //
//      choices: jsPsych.NO_KEYS,
      trial_duration: 6000,
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      },
      data: {memory: "memory",
      exp_stage: "study", item:jsPsych.timelineVariable('item'),
    price: jsPsych.timelineVariable("price"), list_order: jsPsych.timelineVariable("list_order") }
    }
  ],
  on_finish: function(){
    console.log(jsPsych.timelineVariable("list_order"))
  }
}
var study_timeline = {
  timeline: [study_function],
  timeline_variables: study_list_1_shuffled,
  randomize_order: true,
  on_finish: function(){
    console.log(list);
  }
}

var study_timeline_list_two = {
  timeline: [study_function],
  timeline_variables: study_list_2_shuffled,
  randomize_order: true,
  on_finish: console.log(list)
}

var test_intro_instructions = {
  type: "instructions",
  pages: ["<p>You have now completed the Pattern Comparison task. You will now take the memory test.</p><br><br><p>Press the Right arrow key to view the instructions.</p>"],
  data:{
    memory: 'memory',
    exp_stage: "instructions"
  }
}

var test_intro_instructions_2 = {
  type: "instructions",
  pages: ["<p>You have now completed the Letter Comparison task. You will now take the memory test.</p><br><br><p>Press the Right arrow key to view the instructions.</p>"],
  data:{
    memory: 'memory',
    exp_stage: "instructions"
  }
}


var test_instructions = {
  type: "instructions-min-viewing-time",
  pages:[
  '<p style:"font-size:30px;text-align:center">Memory Test</p>' +
  '<div "font-size:25px>'+
  '<br><p style="text-align:left;">In the upcoming memory test, you will be presented with grocery-items and prices in a random order. Some of the test pairs will be composed of grocery-items and prices that were studied, as well as grocery-items and  prices that were not on the study list. There will be four kinds of test pairs:</p>'+
  '<ul style="text-align:center;">'+
  '<li>a test pair that is the same as the study pair, that is, the grocery-item and price were studied together (intact pair)</li>'+
  '<li>a test pair that consists of a grocery-item and price that were studied in different pairs (rearranged pair)</li>'+
  '<li>a test pair that consists of a studied grocery-item and a price that was not on the study list (old-new pair)</li>'+
  '<li>a test pair where both the grocery-item and price were not on the study list (new-new pair)</li></ul>'+
  '<br><p>You may press the Right arrow key to continue with the instructions.<br><br><br>p. 1/6</p></div>',
  '<p style:"font-size:30px;text-align:center">Memory Test</p>' +
  '<div "font-size:25px>'+
  '<br><p>You will answer three multiple choice questions for each test pair. The response options for each question are written in capital letters below. For each test pair, you will be asked:</p>'+
  '<ol style="text-align:center;>' +
  '<li>to judge whether the grocery-item and price were originally STUDIED together or were NOT STUDIED TOGETHER</li>'+
  '<li>to judge whether the grocery-item was originally paired with a price LESS THAN $6, MORE THAN $10, or to indicate that the the grocery-item in the test pair was NOT STUDIED</li>'+
  '<li>to judge whether the price in each test pair was on the study list, responding STUDIED if the price was on the study list, and responding NOT STUDIED if the price was not on the study list.</li></ol><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 2/6</p></div>',

  '<p style:"font-size:30px">Memory Test</p>' +
  '<div "font-size:25px>'+
  '<br><p>For each test pair, the first question will ask you to judge whether the grocery-item and price were originally STUDIED TOGETHER, or were NOT STUDIED TOGETHER. You should only indicate that the grocery-item and price in a test pair were STUDIED TOGETHER if they are intact. For every other type of test pair, you should indicate that the pairs were NOT STUDIED TOGETHER. In other words, you should respond NOT STUDIED TOGETHER to any rearranged, old-new, or new-new test pairs.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 3/6</p></div>',
  '<p style:"font-size:30px">Memory Test</p>' +
  '<div "font-size:25px>'+
  '<br><p>The second question will ask you to judge whether the grocery-item in each test pair was originally paired with a price that was LESS THAN $6, MORE THAN $10, or whether the grocery-item was NOT STUDIED at all. It is important to note that the prices in test pairs may or may not be in the same price range as the original study price. Grocery-items in rearranged and old-new test pairs may have been paired with a price that was LESS THAN $6 at study, but may be paired with a price that is MORE THAN $10 at test, or vice versa. Grocery-items that were NOT STUDIED will only be paired with prices that were NOT STUDIED as well (i.e., new-new test pairs).</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 4/6</p></div>',

'<p style:"font-size:30px">Memory Test</p>' +
  '<br><br><p>The third question will ask you to judge whether the price in each test pair was originally STUDIED or was NOT STUDIED. Prices in test pairs that were NOT STUDIED can be paired with grocery-items that were on the study list, and with grocery-items that were NOT STUDIED.</p><br><p>You may press the Left arrow key to go back. You may press the Right arrow key to continue with the instructions.<br><br><br>p. 5/6</p></div>',
'<p style:"font-size:30px">Memory Test</p>' +
  '<br><br><p>Test pairs will be presented in a random order. The memory test is self-paced. However, once you click an option, the test will advance to the next question. Please be careful before selecting an option, because you will not be able to go back and change your answers.</p><br><p>You may press the Left arrow key to review any previous instructions. Otherwise, you may press the Right arrow key to begin the memory test.<br><br><br>p. 6/6</p></div>'

  ],
//  key_forward: "ArrowRight",
//  key_backward: "ArrowLeft",
  post_trial_gap: 300,
  min_viewing_time: 4000,
  show_clickable_nav: true,
  data:{
    memory: 'memory',
    exp_stage: "instructions"
  }
}


var test_function = {
  type: 'html-button-response',
  timeline: [
      {
        type: 'html-button-response',
        choices: ["<p style='font-size:25px'>Studied together</p>", "<p style='font-size:25px'>Not studied together</p>"],
        stimulus:  function(){
          html =  '<div class="row">' +
          "<p style='font-size:25px'>Were these items studied together?</p><br><br>" +
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
        data: {
          memory: "memory", exp_stage: "test", question_type: "associative",
          list_order: jsPsych.timelineVariable('list_order'), cb: list, test_type: jsPsych.timelineVariable('test_type'),
        item_recognition:jsPsych.timelineVariable('item_recognition'),assoc_recognition:jsPsych.timelineVariable('assoc_recognition'),source_recognition: jsPsych.timelineVariable('source_recognition'),
        item: jsPsych.timelineVariable('item'), price: jsPsych.timelineVariable("test_price")
      },
      on_finish: function(data){
        if(jsPsych.pluginAPI.compareKeys(data.response, 0)){
            data.resp = "old";
            } else {
                data.resp = "new";
            }
          }
        },
      {
        type: 'html-button-response',
        choices: ["<p style='font-size:25px'>Less than $6</p>", "<p style='font-size:25px'>More than $10</p>", "<p style='font-size:25px'>Not studied</p>"],
        data: {memory: "memory", exp_stage: "test", question_type: "source", list_order: jsPsych.timelineVariable('list_order'), cb: list, test_type: jsPsych.timelineVariable('test_type'),
      item_recognition:jsPsych.timelineVariable('item_recognition'),assoc_recognition:jsPsych.timelineVariable('assoc_recognition'),source_recognition: jsPsych.timelineVariable('source_recognition'),
      item: jsPsych.timelineVariable('item'), price: jsPsych.timelineVariable("test_price")},
      on_finish: function(data){
        if(jsPsych.pluginAPI.compareKeys(data.response, 0)){
            data.resp = "MP";
          } else if(jsPsych.pluginAPI.compareKeys(data.response, 1)){
                data.resp = "OP";
            } else{
              data.resp = "new";
            }
          },
      stimulus:  function(){
            html =  '<div class="row">' +
            "<p style='font-size:25px'>Was the studied price for this grocery item...?</p><br><br>" +
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
        type: 'html-button-response',
        choices: ["<p style='font-size:25px'>Studied</p>", "<p style='font-size:25px'>Not Studied</p>"],
        data:
        { memory: "memory", exp_stage: "test", question_type: "item",lislist_order: jsPsych.timelineVariable('list_order'), cb: list, test_type: jsPsych.timelineVariable('test_type'),
      item_recognition:jsPsych.timelineVariable('item_recognition'),assoc_recognition:jsPsych.timelineVariable('assoc_recognition'),source_recognition: jsPsych.timelineVariable('source_recognition'),
      item: jsPsych.timelineVariable('item'), price: jsPsych.timelineVariable("test_price")
    },
    on_finish: function(data){
      if(jsPsych.pluginAPI.compareKeys(data.response, 0)){
          data.resp = "old";
        } else {
          data.resp = "new";
          }
        },
      stimulus:  function(){
            html =  '<div class="row">' +
            "<p style='font-size:25px'>Was this price originally studied?</p><br><br>" +
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


  var test_timeline1 = {
      timeline: [test_function],
      timeline_variables: test_shuf_one,
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
},
      //on_start: console.log(test_shuf_one.length),
      //randomize_order: true,
      on_finish: console.log(list)
    };
  var attention_check_one = {
      timeline: [attn_check],
      timeline_variables: [attention_check_word_one],
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      }
    }
  var test_timeline2 = {
      timeline: [test_function],
      timeline_variables: test_shuf_two,
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      },
      on_start: console.log(test_shuf_two.length)
    };
  var attention_check_two = {
      timeline: [attn_check],
      timeline_variables: [attention_check_word_two],
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      }
    }
  var test_timeline3 = {
      timeline: [test_function],
      timeline_variables: test_shuf_three,
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      },
      on_start: console.log(test_shuf_three.length)
    };

// list 2
  var test_timeline4 = {
      timeline: [test_function],
      timeline_variables: test_shuf_four,
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      },
      on_start: console.log(test_shuf_four.length)
    };
  var attention_check_three = {
      timeline: [attn_check],
      timeline_variables: [attention_check_word_four],
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      }
    };
  var test_timeline5 = {
      timeline: [test_function],
      timeline_variables: test_shuf_five,
      on_start: console.log(test_shuf_five.length),
      post_trial_gap: function(){
        // sample from range (250, 751]
  return getRandomInt(250, 751);
      }
    };
    var attention_check_four = {
        timeline: [attn_check],
        timeline_variables: [attention_check_word_four],
        post_trial_gap: function(){
          // sample from range (250, 751]
    return getRandomInt(250, 751);
        }
      };
      var test_timeline6 = {
          timeline: [test_function],
          timeline_variables: test_shuf_six,
          on_start: console.log(test_shuf_six.length),
          post_trial_gap: function(){
            // sample from range (250, 751]
      return getRandomInt(250, 751);
          }
        };


//////// PATTERN                    ////////          ///////       //////
///////           COMPARISON  /////         /////////        //////


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

// NEW for preloading in jspsych-6.3.x and up! https://www.jspsych.org/plugins/jspsych-preload/
// Loading files automatically based on the main timeline
  var preload = {
      type: 'preload',
      images: [p1_left, p1_right, p2_left, p2_right,
      patterns_practice+"prac_1_1.png",
      patterns_practice + "prac_1_2.png",
      patterns_practice+"prac_2_1.png",
      patterns_practice + "prac_2_2.png",
      patterns_practice+"prac_3_1.png",
      patterns_practice + "prac_3_2.png",
    ],
    on_success: console.log("it worked I guess")
    };

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

var instr_p1 = {
  type: "instructions",
  pages: ["You have completed study of the grocery items. Before taking the memory test, you will complete a pattern comparison task. Press the right arrow key to see the instructions."],
  data:{pattern: 'pattern',
    exp_stage: "instructions"
  }
}

var instructions = {
      type: "instructions-min-viewing-time",
  		pages:[
  	  '<p style:"font-size:30px">PATTERN COMPARISON</p>' +
  	  '<br><br><p>In this task you will be asked to determine whether two patterns of lines are the same or different. If the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to respond as accurately and rapidly as you can.</p>' +
  	  '<br><p>You will complete a few practice trials before starting.</p><br><p>Press the right arrow key to continue.<br><br><br>p. 1/2</p>',
  		'<p>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY.</p>' +
  	  '<br><p>Press the right arrow key to begin the practice trials.<br><br><br>p. 2/2</p>'
  	],
  //		key_forward: "ArrowRight",
  //		key_backward: "ArrowLeft",
  		post_trial_gap: 250,
  //    show_clickable_nav: true,
      min_viewing_time: 3500,
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
        var html = '<table><tr>' +
        '<td><img src='+
          jsPsych.timelineVariable("stimulus_1") +
             ' style="width:150px;height:150px;display: block;margin: 50px 25px 50px 125px";>' +
             '</img></td>' +
        '<td><img src='+
        jsPsych.timelineVariable("stimulus_2") +
        '  style="width:150px;height:150px;display: block;margin: 50px 125px 50px 25px";></img>'+
                   '</td></tr></table>';
                     return html;

  	                }
  	  }],
  				prompt: '<p style="font-size:25px;margin:auto">Press ‹— for Same. Press —› for Different.</p>',
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
      type: "instructions-min-viewing-time",
  		pages: ['<p>You have now completed the practice trials. In the task, you will have 30 seconds to complete as many problems as you can. You will complete this process two times in total.<br><br>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p><br><p>Press the RIGHT ARROW KEY to begin.</p>'],
  	  post_trial_gap: 250,
      min_viewing_time: 1000,
  	  data:{pattern: 'pattern',exp_stage: "instructions"},
  		on_finish: function(){
  			console.log(limit);
  			console.log(time);
  			console.log(time_out);
  			console.log('what else???');
        iti = comparison_jitter();
  		}
  	};

  	var generic_trial = {
  		timeline:[
  			{
  				type: "html-keyboard-response",
  				choices: ["ArrowLeft", "ArrowRight"],
  				stimulus: function(){
            var html = '<table><tr>' +
            '<td><img src='+
              jsPsych.timelineVariable("stimulus_1") +
                 ' style="width:150px;height:150px;display: block;margin: 50px 25px 50px 125px";>' +
                 '</img></td>' +
            '<td><img src='+
            jsPsych.timelineVariable("stimulus_2") +
            '  style="width:150px;height:150px;display: block;margin: 50px 125px 50px 25px";></img>'+
                       '</td></tr></table>';
                         return html;
  				},
  						prompt: '<p style="font-size:25px;margin:auto">Press ‹— for Same. Press —› for Different.</p>',
  						trial_duration: function(){
  							return limit ;
  						}

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
    type: "instructions-min-viewing-time",
    pages:[
    '<p>You will now complete the same process again. You will have 30 seconds to complete as many problems as you can. <br><br>As a reminder, if the two patterns are the SAME, press the LEFT ARROW KEY. If the two patterns are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p><br><p>Press the right arrow key to begin.</p>'
  ],
  //	key_forward: "ArrowRight",
  //	key_backward: "ArrowLeft",
  //  choices: "Enter" ,
    min_viewing_time: 1500,
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
  		limit = limit - time ;
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

//////////////////////////////////////////////////////////////////
////                     ///////////                           //
///       LETTER         ///////////      COMPARISON         ///
//                       ///////////                       ////
//////////////////////////////////////////////////////////////



	var prac_cresp_letter = ["ArrowLeft", "ArrowRight", "ArrowRight"];
	var p1_correct_letter =  ['ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowRight'];
	var p2_correct_letter = [ 'ArrowRight','ArrowLeft','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft','ArrowRight','ArrowRight','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowLeft','ArrowLeft','ArrowRight','ArrowRight','ArrowLeft'];

var prac_left_letter = ["RTQ", "LTNRVG", "ZYTCJKBFP"];
var prac_right_letter = ["RTQ", "LTNRKG", "ZYTCJKWFP"];

var p1_left_letter = ["NLZTJWQXC",'RSXMVK','XNV','JRLWVD','JKFLSMCWN','YVJ','ZJT','HVBNQCWRT','FWVSPJ','GCLZJQ','NLGJYWQBM','QBM','PRVWSTLYK','VFZ','CVQZJB','TRK','KLCDQZ','SRKFMPHXQ','MTGLBY','CXK','SGCYZBWHX','SRBNWT','WHGZKRLPM','YCT','MRXCNJ','ZSH','LSVMNRQDY','LVXHJBDMP','ZQRWYM','DNK','JBMWZR','PGTKXBZNF','KFQ','CQGNSLMWX','QZD','JBZMRP','CZVWPK','ZXQBNFHGP','LPY','FJMSBDTZN','MHJWLK','GYT','GYP','JZKDHY','GDCYXZQPT','CHJXRNLMQ','SNP','RJGPNB','PHLDMZ','SFH','RHBCMNGYL','LXQ','LNRBFXKHW','TJPMZQ','YRSLDK','WTKGRDSZX','PBM','DGVLSK','YFV',"WHZJPXMVN"];

var p1_right_letter = ['NLZTJWQXC','RSXMVK','XNG','MRLWVD','RKFLSMCWN','YVJ','VJT','HVBNQCWRT','FWVSPJ','GWLZJQ','NLGJYWQBF','QBP','PRVWSTLYN','VFZ','CKQZJB','TRF','KLCDQZ','SRKFMPHXQ','MTGLBZ','CXK','SGCYZBWHX','SRBNWT','WHGZKRLPM','YCT','MRXCNJ','TSH','LSVMNRQDY','CVXHJBDMP','ZQRLYM','DNK','JBMWZR','PGTKXDZNF','XFQ','CQGNSLMWX','QZD','JBZMRP','CZVWPK','ZSQBNFHGP','LPY','FJMSBDTZN','MXJWLK','GYT','GNP','RZKDHY','GDCYXZQPT','CHJTRNLMQ','SXP','RJGPNB','PHLDMZ','SCH','RHBCTNGYL','LXQ','LNRSFXKHW','HJPMZQ','PRSLDK','WTKGRDSZX','PFM','DWVLSK','YFV','SHZJPXMVN'];

var p2_left_letter = ['ZDV','SHQWYJ','JTZHVKMSR','BVD','HPNXYKMWS','QFSKDH','LWSZBV','ZSN','DLXYMQJPN','CPYWZR','TRPDBQHNZ','SNV','DNL','SBDZXQRJH','GKLXHW','SLFBKH','FGD','BKQYDLZHJ','NKF','GZVHBPCJW','RPFTKH','QKRXZP','BPMRTXFYD','TYM','NRKTCSHWG','ZYCRLH','RDG','RGBTVQMKH','JTP','HDMQLB','WNDTXB','WKZQFLSNP','CYV','QDR','RFGJKXYPC','BFZGPY','FXVHSWQGL','GSJDMY','KVM','RXDHGWNTK','NLB','MVWYBX','CPQBFZ','XVP','FTWNKBXDY','DLHTPVWBM','FZNWMS','FYM','ZPW','LXDMSWJCB','KSBQPJ','QBGLVRYCF','WGYZJC','CNW','MYWQBZ','CFTGDJLZV','YGR','LFG','BPVFYMKCT','GLJDZH'];

var p2_right_letter = ['ZDX','SHQWYJ','JTZHVKMSR','BVD','HPLXYKMWS','QFSVDH','NWSZBV','ZXN','GLXYMQJPN','CPYWZR','TRPDBQHNZ','SNL','DNL','SBDZXQRJH','GKTXHW','SLFBKH','FGD','BKQYDLZHJ','NCF','GZVHBPCJD','RYFTKH','QKRXZP','BPMRTXFYD','TYM','NRKTCSHWG','ZYCRLH','RDX','RGBTVQMKH','JTP','HDMWLB','YNDTXB','WKZQFLSNP','CYV','ZDR','TFGJKXYPC','BFZSPY','FXVKSWQGL','GSQDMY','KVM','RXDHQWNTK','NQB','MVWYBX','CNQBFZ','XVD','FTWNKJXDY','DLHTPVWBM','FZNWMS','FYW','ZPW','LXDMSWJPB','KSBQPJ','QBHLVRYCF','WGYZJC','CNW','MYWJBZ','CFTGDJLZV','YGR','LFW','BPVFYMXCT','GLJDZH'];



// removed the calculation of scores because they were not helpful in data analysis. See pattern_comparison_grant.js for original code here.

var instr_p1_letter = {
  type: "instructions",
  pages: ["You have completed study of the grocery items. Before taking the memory test, you will complete a letter comparison task. Press the right arrow key to see the instructions."],
  data:{pattern: 'letter',
    exp_stage: "instructions"
  }
}
	var instructions_letter = {
	  type: "instructions-min-viewing-time",
	  pages:[
	  '<p style:"font-size:30px">LETTER COMPARISON</p>' +
	  '<br><br><p>In this task you will be asked to determine whether two strings of letters are the same or different. If the two strings are the SAME, press the LEFT ARROW KEY. If the two strings are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
	  '<br><p>You will complete a few practice trials before starting.</p><br><p>Press the right arrow key to continue.</p>',
		'<p>As a reminder, if the two strings are the SAME, press the LEFT ARROW KEY. If the two strings are DIFFERENT, press the RIGHT ARROW KEY.</p>' +
	  '<br><p>Press the right arrow key to begin the practice trials.</p>'],
		/*key_forward: "ArrowRight",
		key_backward: "ArrowLeft",*/
	  data:{pattern: 'letter',
	    exp_stage: "instructions"
	  },
    post_trial_gap: 250,
    min_viewing_time: 3500
	};
//
	var alt_practice_letter = {
	  timeline: [
	  {
	  type: "html-keyboard-response",
		choices: ["ArrowLeft", "ArrowRight"],
		stimulus: function(){
			var html = '<table><tr>' +
			'<td style="padding:50px;"></td><td style ="width:150px"><p style="font-size:25px">'+
				jsPsych.timelineVariable("stimulus_1") +
					 '</p></td><td style = "padding:50px"></td>'+
			'<td style ="width:150px"><p style="font-size:25px">'+
			jsPsych.timelineVariable("stimulus_2") +
								 '</p></td><td "padding:75px;"></td></tr></table>';
									 return html;

								 }
	  }],
		prompt: '<br><br><br><p style="font-size:25px">Press ‹— for Same. Press —› for Different.</p>',
	  data: jsPsych.timelineVariable('data'),
	  timeline_variables:
		[
	    {stimulus_1: prac_left_letter[0],
	     stimulus_2: prac_right_letter[0],
	     	data: {corr_resp: prac_cresp_letter[0], exp_stage: "practice"}},
	    {stimulus_1: prac_left_letter[1],
	     stimulus_2: prac_right_letter[1],
	        data: {corr_resp: prac_cresp_letter[1], exp_stage: "practice"}},
	    {stimulus_1: prac_left_letter[2],
	     stimulus_2: prac_right_letter[2],
	        data: {corr_resp: prac_cresp_letter[2], exp_stage: "practice"}}
	  ]
	};

	var limit = 30000;
	var trl = null;
	var time = null;
	var time_out = 0;

	var interim_instructions_letter = {
	  type: "html-keyboard-response",
	  stimulus: '<p>You have now completed the practice trials. In the task, you will have 30 seconds to complete as many problems as you can. You will complete this process two times in total.<br><br>As a reminder, if the two strings are the SAME, press the LEFT ARROW KEY. If the two strings are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
	  '<br><p>Press any key to begin.</p>',
	  post_trial_gap: 250,
	  data:{exp_stage: "instructions"},
		on_finish: function(){
			console.log(limit);
			console.log(time);
			console.log(time_out);
			console.log('what else???');
      limit = 30000;

		}
	};

	var generic_trial_letter = {
		timeline:[
			{
				type: "html-keyboard-response",
				choices: ["ArrowLeft", "ArrowRight"],
				stimulus: function(){
          var html = '<table><tr>' +
    			'<td style="padding:50px;"></td><td style ="width:150px"><p style="font-size:25px">'+
    				jsPsych.timelineVariable("stimulus_1") +
    					 '</p></td><td style = "padding:50px"></td>'+
    			'<td style ="width:150px"><p style="font-size:25px">'+
    			jsPsych.timelineVariable("stimulus_2") +
    								 '</p></td><td "padding:75px;"></td></tr></table>';
    									 return html;
				},
						prompt: '<br><br><br><p style="font-size:25px">Press ‹— for Same. Press —› for Different.</p>',
						trial_duration: function(){
							return limit;
						},

				}

		]
	};

var trial_1_letter = {
	timeline: [generic_trial_letter],
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
			stimulus_1: p1_left_letter[0],
			stimulus_2: p1_right_letter[0],
				data: {corr_resp: p1_correct_letter[0] , exp_stage: 'letter_comp_p1'}
			}
	]
};


var test_trials_p1_trl2_letter = {
	timeline: [generic_trial_letter],
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
          stimulus_1: p1_left_letter[1],stimulus_2: p1_right_letter[1],
          data: {corr_resp:  p1_correct_letter[1], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[2],stimulus_2: p1_right_letter[2],
          data: {corr_resp:  p1_correct_letter[2], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[3],stimulus_2: p1_right_letter[3],
          data: {corr_resp:  p1_correct_letter[3], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[4],stimulus_2: p1_right_letter[4],
          data: {corr_resp:  p1_correct_letter[4], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[5],stimulus_2: p1_right_letter[5],
          data: {corr_resp:  p1_correct_letter[5], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[6],stimulus_2: p1_right_letter[6],
          data: {corr_resp:  p1_correct_letter[6], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[7],stimulus_2: p1_right_letter[7],
          data: {corr_resp:  p1_correct_letter[7], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[8],stimulus_2: p1_right_letter[8],
          data: {corr_resp:  p1_correct_letter[8], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[9],stimulus_2: p1_right_letter[9],
          data: {corr_resp:  p1_correct_letter[9], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[10],stimulus_2: p1_right_letter[10],
          data: {corr_resp:  p1_correct_letter[10], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[11],stimulus_2: p1_right_letter[11],
          data: {corr_resp:  p1_correct_letter[11], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[12],stimulus_2: p1_right_letter[12],
          data: {corr_resp:  p1_correct_letter[12], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[13],stimulus_2: p1_right_letter[13],
          data: {corr_resp:  p1_correct_letter[13], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[14],stimulus_2: p1_right_letter[14],
          data: {corr_resp:  p1_correct_letter[14], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[15],stimulus_2: p1_right_letter[15],
          data: {corr_resp:  p1_correct_letter[15], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[16],stimulus_2: p1_right_letter[16],
          data: {corr_resp:  p1_correct_letter[16], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[17],stimulus_2: p1_right_letter[17],
          data: {corr_resp:  p1_correct_letter[17], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[18],stimulus_2: p1_right_letter[18],
          data: {corr_resp:  p1_correct_letter[18], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[19],stimulus_2: p1_right_letter[19],
          data: {corr_resp:  p1_correct_letter[19], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[20],stimulus_2: p1_right_letter[20],
          data: {corr_resp:  p1_correct_letter[20], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[21],stimulus_2: p1_right_letter[21],
          data: {corr_resp:  p1_correct_letter[21], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[22],stimulus_2: p1_right_letter[22],
          data: {corr_resp:  p1_correct_letter[22], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[23],stimulus_2: p1_right_letter[23],
          data: {corr_resp:  p1_correct_letter[23], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[24],stimulus_2: p1_right_letter[24],
          data: {corr_resp:  p1_correct_letter[24], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[25],stimulus_2: p1_right_letter[25],
          data: {corr_resp:  p1_correct_letter[25], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[26],stimulus_2: p1_right_letter[26],
          data: {corr_resp:  p1_correct_letter[26], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[27],stimulus_2: p1_right_letter[27],
          data: {corr_resp:  p1_correct_letter[27], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[28],stimulus_2: p1_right_letter[28],
          data: {corr_resp:  p1_correct_letter[28], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[29],stimulus_2: p1_right_letter[29],
          data: {corr_resp:  p1_correct_letter[29], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[30],stimulus_2: p1_right_letter[30],
          data: {corr_resp:  p1_correct_letter[30], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[31],stimulus_2: p1_right_letter[31],
          data: {corr_resp:  p1_correct_letter[31], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[32],stimulus_2: p1_right_letter[32],
          data: {corr_resp:  p1_correct_letter[32], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[33],stimulus_2: p1_right_letter[33],
          data: {corr_resp:  p1_correct_letter[33], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[34],stimulus_2: p1_right_letter[34],
          data: {corr_resp:  p1_correct_letter[34], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[35],stimulus_2: p1_right_letter[35],
          data: {corr_resp:  p1_correct_letter[35], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[36],stimulus_2: p1_right_letter[36],
          data: {corr_resp:  p1_correct_letter[36], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[37],stimulus_2: p1_right_letter[37],
          data: {corr_resp:  p1_correct_letter[37], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[38],stimulus_2: p1_right_letter[38],
          data: {corr_resp:  p1_correct_letter[38], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[39],stimulus_2: p1_right_letter[39],
          data: {corr_resp:  p1_correct_letter[39], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[40],stimulus_2: p1_right_letter[40],
          data: {corr_resp:  p1_correct_letter[40], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[41],stimulus_2: p1_right_letter[41],
          data: {corr_resp:  p1_correct_letter[41], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[42],stimulus_2: p1_right_letter[42],
          data: {corr_resp:  p1_correct_letter[42], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[43],stimulus_2: p1_right_letter[43],
          data: {corr_resp:  p1_correct_letter[43], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[44],stimulus_2: p1_right_letter[44],
          data: {corr_resp:  p1_correct_letter[44], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[45],stimulus_2: p1_right_letter[45],
          data: {corr_resp:  p1_correct_letter[45], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[46],stimulus_2: p1_right_letter[46],
          data: {corr_resp:  p1_correct_letter[46], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[47],stimulus_2: p1_right_letter[47],
          data: {corr_resp:  p1_correct_letter[47], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[48],stimulus_2: p1_right_letter[48],
          data: {corr_resp:  p1_correct_letter[48], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[49],stimulus_2: p1_right_letter[49],
          data: {corr_resp:  p1_correct_letter[49], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[50],stimulus_2: p1_right_letter[50],
          data: {corr_resp:  p1_correct_letter[50], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[51],stimulus_2: p1_right_letter[51],
          data: {corr_resp:  p1_correct_letter[51], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[52],stimulus_2: p1_right_letter[52],
          data: {corr_resp:  p1_correct_letter[52], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[53],stimulus_2: p1_right_letter[53],
          data: {corr_resp:  p1_correct_letter[53], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[54],stimulus_2: p1_right_letter[54],
          data: {corr_resp:  p1_correct_letter[54], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[55],stimulus_2: p1_right_letter[55],
          data: {corr_resp:  p1_correct_letter[55], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[56],stimulus_2: p1_right_letter[56],
          data: {corr_resp:  p1_correct_letter[56], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[57],stimulus_2: p1_right_letter[57],
          data: {corr_resp:  p1_correct_letter[57], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[58],stimulus_2: p1_right_letter[58],
          data: {corr_resp:  p1_correct_letter[58], exp_stage: 'letter_comp_p1'}},
          {
          stimulus_1: p1_left_letter[59],stimulus_2: p1_right_letter[59],
          data: {corr_resp:  p1_correct_letter[59], exp_stage: 'letter_comp_p1'}}
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


var interim_instructions_2_letter = {
  type: "instructions-min-viewing-time",
  pages:['<p>You will now complete the same process again. You will have 30 seconds to complete as many problems as you can. <br><br>As a reminder, if the two strings are the SAME, press the LEFT ARROW KEY. If the two strings are DIFFERENT, press the RIGHT ARROW KEY. Please try to work as accurately and rapidly as you can.</p>' +
  '<br><p>Press the right arrow key to begin.</p>'],
	min_viewing_time: 2500,
  post_trial_gap: 250,
  data:{
    exp_stage: "instructions"
  },
  on_finish: function(){
		trl = jsPsych.data.get().select('time_elapsed');
		time = trl.values[trl.values.length-1] - trl.values[trl.values.length-2];
		console.log("time between last trial and end");
		console.log(time);
		jsPsych.data.get().addToLast({dur: limit});

		limit = 30000;
		trl = null;
		time = null;
		time_out = 0;
  }
};



var trial_2_letter = {
	timeline: [generic_trial_letter],
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
	timeline_variables: [
		{
			stimulus_1: p2_left_letter[0],
			stimulus_2:  p2_right_letter[0],
				data: {corr_resp:  p2_correct[0], exp_stage: 'letter_comp_p2'}
			}
	]
}

var test_trials_p2_trl2_letter = {
	timeline: [generic_trial_letter],
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
          stimulus_1: p2_left_letter[1],stimulus_2: p2_right_letter[1],
          data: {corr_resp:  p2_correct_letter[1], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[2],stimulus_2: p2_right_letter[2],
          data: {corr_resp:  p2_correct_letter[2], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[3],stimulus_2: p2_right_letter[3],
          data: {corr_resp:  p2_correct_letter[3], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[4],stimulus_2: p2_right_letter[4],
          data: {corr_resp:  p2_correct_letter[4], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[5],stimulus_2: p2_right_letter[5],
          data: {corr_resp:  p2_correct_letter[5], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[6],stimulus_2: p2_right_letter[6],
          data: {corr_resp:  p2_correct_letter[6], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[7],stimulus_2: p2_right_letter[7],
          data: {corr_resp:  p2_correct_letter[7], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[8],stimulus_2: p2_right_letter[8],
          data: {corr_resp:  p2_correct_letter[8], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[9],stimulus_2: p2_right_letter[9],
          data: {corr_resp:  p2_correct_letter[9], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[10],stimulus_2: p2_right_letter[10],
          data: {corr_resp:  p2_correct_letter[10], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[11],stimulus_2: p2_right_letter[11],
          data: {corr_resp:  p2_correct_letter[11], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[12],stimulus_2: p2_right_letter[12],
          data: {corr_resp:  p2_correct_letter[12], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[13],stimulus_2: p2_right_letter[13],
          data: {corr_resp:  p2_correct_letter[13], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[14],stimulus_2: p2_right_letter[14],
          data: {corr_resp:  p2_correct_letter[14], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[15],stimulus_2: p2_right_letter[15],
          data: {corr_resp:  p2_correct_letter[15], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[16],stimulus_2: p2_right_letter[16],
          data: {corr_resp:  p2_correct_letter[16], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[17],stimulus_2: p2_right_letter[17],
          data: {corr_resp:  p2_correct_letter[17], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[18],stimulus_2: p2_right_letter[18],
          data: {corr_resp:  p2_correct_letter[18], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[19],stimulus_2: p2_right_letter[19],
          data: {corr_resp:  p2_correct_letter[19], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[20],stimulus_2: p2_right_letter[20],
          data: {corr_resp:  p2_correct_letter[20], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[21],stimulus_2: p2_right_letter[21],
          data: {corr_resp:  p2_correct_letter[21], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[22],stimulus_2: p2_right_letter[22],
          data: {corr_resp:  p2_correct_letter[22], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[23],stimulus_2: p2_right_letter[23],
          data: {corr_resp:  p2_correct_letter[23], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[24],stimulus_2: p2_right_letter[24],
          data: {corr_resp:  p2_correct_letter[24], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[25],stimulus_2: p2_right_letter[25],
          data: {corr_resp:  p2_correct_letter[25], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[26],stimulus_2: p2_right_letter[26],
          data: {corr_resp:  p2_correct_letter[26], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[27],stimulus_2: p2_right_letter[27],
          data: {corr_resp:  p2_correct_letter[27], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[28],stimulus_2: p2_right_letter[28],
          data: {corr_resp:  p2_correct_letter[28], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[29],stimulus_2: p2_right_letter[29],
          data: {corr_resp:  p2_correct_letter[29], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[30],stimulus_2: p2_right_letter[30],
          data: {corr_resp:  p2_correct_letter[30], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[31],stimulus_2: p2_right_letter[31],
          data: {corr_resp:  p2_correct_letter[31], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[32],stimulus_2: p2_right_letter[32],
          data: {corr_resp:  p2_correct_letter[32], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[33],stimulus_2: p2_right_letter[33],
          data: {corr_resp:  p2_correct_letter[33], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[34],stimulus_2: p2_right_letter[34],
          data: {corr_resp:  p2_correct_letter[34], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[35],stimulus_2: p2_right_letter[35],
          data: {corr_resp:  p2_correct_letter[35], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[36],stimulus_2: p2_right_letter[36],
          data: {corr_resp:  p2_correct_letter[36], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[37],stimulus_2: p2_right_letter[37],
          data: {corr_resp:  p2_correct_letter[37], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[38],stimulus_2: p2_right_letter[38],
          data: {corr_resp:  p2_correct_letter[38], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[39],stimulus_2: p2_right_letter[39],
          data: {corr_resp:  p2_correct_letter[39], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[40],stimulus_2: p2_right_letter[40],
          data: {corr_resp:  p2_correct_letter[40], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[41],stimulus_2: p2_right_letter[41],
          data: {corr_resp:  p2_correct_letter[41], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[42],stimulus_2: p2_right_letter[42],
          data: {corr_resp:  p2_correct_letter[42], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[43],stimulus_2: p2_right_letter[43],
          data: {corr_resp:  p2_correct_letter[43], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[44],stimulus_2: p2_right_letter[44],
          data: {corr_resp:  p2_correct_letter[44], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[45],stimulus_2: p2_right_letter[45],
          data: {corr_resp:  p2_correct_letter[45], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[46],stimulus_2: p2_right_letter[46],
          data: {corr_resp:  p2_correct_letter[46], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[47],stimulus_2: p2_right_letter[47],
          data: {corr_resp:  p2_correct_letter[47], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[48],stimulus_2: p2_right_letter[48],
          data: {corr_resp:  p2_correct_letter[48], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[49],stimulus_2: p2_right_letter[49],
          data: {corr_resp:  p2_correct_letter[49], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[50],stimulus_2: p2_right_letter[50],
          data: {corr_resp:  p2_correct_letter[50], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[51],stimulus_2: p2_right_letter[51],
          data: {corr_resp:  p2_correct_letter[51], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[52],stimulus_2: p2_right_letter[52],
          data: {corr_resp:  p2_correct_letter[52], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[53],stimulus_2: p2_right_letter[53],
          data: {corr_resp:  p2_correct_letter[53], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[54],stimulus_2: p2_right_letter[54],
          data: {corr_resp:  p2_correct_letter[54], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[55],stimulus_2: p2_right_letter[55],
          data: {corr_resp:  p2_correct_letter[55], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[56],stimulus_2: p2_right_letter[56],
          data: {corr_resp:  p2_correct_letter[56], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[57],stimulus_2: p2_right_letter[57],
          data: {corr_resp:  p2_correct_letter[57], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[58],stimulus_2: p2_right_letter[58],
          data: {corr_resp:  p2_correct_letter[58], exp_stage: 'letter_comp_p2'}},
          {
          stimulus_1: p2_left_letter[59],stimulus_2: p2_right_letter[59],
          data: {corr_resp:  p2_correct_letter[59], exp_stage: 'letter_comp_p2'}}
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


///////////////////////////////////////////////////////////////////
//    PUSH             ///////////
//        THE                     ///////////          ///////////
//           TIMELINE                       ///////////
///////////////////////////////////////////////////////////////////

// testing out pattern comparison
/*
timeline.push(preload);
timeline.push(study_instructions_welcome);

timeline.push(study_instructions);
timeline.push(study_timeline);
*/
// quick foray in to a pattern comparison task


/*
  timeline.push(instr_p1);
  timeline.push(instructions);
  timeline.push(alt_practice);
  timeline.push(interim_instructions);
  timeline.push(trial_1);
  timeline.push(test_trials_p1_trl2);
  timeline.push(interim_instructions_2);
  timeline.push(trial_2);
  timeline.push(test_trials_p2_trl2);
  */
/*
// test list 1
  timeline.push(test_intro_instructions);
  timeline.push(test_instructions);

  timeline.push(test_timeline1);
  timeline.push(attention_check_one);
  timeline.push(test_timeline2);
  timeline.push(attention_check_two);
  timeline.push(test_timeline3);

// study list 2
    timeline.push(study_instructions_list_two);
    timeline.push(study_timeline_list_two);
*/

// letter comparison task
//timeline.push(instr_p1_letter);
//timeline.push(instructions_letter);
timeline.push(alt_practice_letter);
timeline.push(interim_instructions_letter);
timeline.push(trial_1_letter);
timeline.push(test_trials_p1_trl2_letter);
timeline.push(interim_instructions_2_letter);
timeline.push(trial_2_letter);
timeline.push(test_trials_p2_trl2_letter);
/*
// test list 2

  timeline.push(test_intro_instructions_2);
  timeline.push(test_timeline4);
  timeline.push(attention_check_three);
  timeline.push(test_timeline5);
  timeline.push(attention_check_four);
  timeline.push(test_timeline6);
*/
