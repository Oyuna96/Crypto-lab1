var currentLanguage_encode = 'ru';
var currentLanguage_decode = 'ru';

var russianAlphabetUppercase = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
var russianAlphabetLowercase = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".toLowerCase();

function caesarShift(word, shift, isEncode) {
  if (shift < 0) {
    alert("Сдвиг должен быть положительным");
    return;
  }

  if (shift === 0) {
    return word;
  }

  if (!isEncode && currentLanguage_decode === 'en') {
    shift = 26 - shift;
  }

  let output = '';

  if (isEncode) {
    for (var i = 0; i < word.length; i ++) {
      var c = word[i];
      if (currentLanguage_encode === 'en') {
        var code = word.charCodeAt(i);
        if ((code >= 65) && (code <= 90)){
          c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        else if ((code >= 97) && (code <= 122)) {
          c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }         
        output += c;
      }
      if (currentLanguage_encode === 'ru') {
        if(c.toLowerCase() === c){
          let a = (russianAlphabetLowercase.indexOf(c) + shift) % 33;

          output += russianAlphabetLowercase[a];
        }
        if(c.toUpperCase() === c){
          let a = (russianAlphabetUppercase.indexOf(c) + shift) % 33;

          output += russianAlphabetUppercase[a];
        }
      }
    }
  } else {
    for (var i = 0; i < word.length; i ++) {
      var c = word[i];
      if (currentLanguage_decode === 'en') {
        var code = word.charCodeAt(i);
        if ((code >= 65) && (code <= 90)){
          c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        else if ((code >= 97) && (code <= 122)) {
          c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }       
        output += c;
      }
      if (currentLanguage_decode === 'ru') {
        if(c.toLowerCase() === c){
          let a = (russianAlphabetLowercase.indexOf(c) - shift) % 33;

          if (a >= 0) {
            output += russianAlphabetLowercase[a];
          } else {
            output += russianAlphabetLowercase[russianAlphabetLowercase.length + a];
          } 
        }
        if(c.toUpperCase() === c){
          let a = (russianAlphabetUppercase.indexOf(c) - shift) % 33;

          if (a >= 0) {
            output += russianAlphabetUppercase[a];
          } else {
            output += russianAlphabetUppercase[russianAlphabetUppercase.length + a];
          } 
        }
      }
    }
  }
	return output;
}

// ПЕРВЫЙ ПУНКТ

//encode

$("input[name=\"lang_encode\"]").on('change', function(evt){
  currentLanguage_encode = evt.target.className;
});

$(".encode").on('click', function(){
  let word = $("#word_encode").val();

  if (currentLanguage_encode === 'ru' && word.search(/^[а-яА-ЯёЁ]+$/) != -1) {
    let shift = parseInt($("#step_encode").val());    
    let encodeWord = caesarShift(word, shift, true);
    $("#result_encode").val(encodeWord); 
  } else if (currentLanguage_encode === 'en' && word.search(/^[a-zA-Z]+$/) != -1) {
    let shift = parseInt($("#step_encode").val());    
    let encodeWord = caesarShift(word, shift, true);
    $("#result_encode").val(encodeWord); 
  } else {
    alert("Выбранный язык не соответствует языку введенного слова");
  }  
});

//decode

$("input[name=\"lang_decode\"]").on('change', function(evt){
  currentLanguage_decode = evt.target.className;
});

$(".decode").on('click', function(){
  let word = $("#word_decode").val();

  if (currentLanguage_decode === 'ru' && word.search(/^[а-яА-ЯёЁ]+$/) !== -1) {
    let shift = parseInt($("#step_decode").val());    
    let encodeWord = caesarShift(word, shift, false);
    $("#result_decode").val(encodeWord); 
  } else if (currentLanguage_decode === 'en' && word.search(/^[a-zA-Z]+$/) !== -1) {
    let shift = parseInt($("#step_decode").val());    
    let encodeWord = caesarShift(word, shift, false);
    $("#result_decode").val(encodeWord); 
  } else {
    alert("Выбранный язык не соответствует языку введенного слова");
  } 
});

//---------------------------------------------------------

// ---------ВТОРОЙ ПУНКТ----------------------------------

$('input[name=\"lang_decode_second\"]').on('change', function(evt) {
	currentLanguage_decode = evt.target.className;
});

$(".second-section-button").on('click', function() {
	let str = $("#cryptogram").val();
	let strDecode = '';

	if (currentLanguage_decode === 'ru' && str.search(/^[а-яА-ЯёЁ]+$/) !== -1) {
		$("tbody tr").remove();
    for (var i = 1; i < 33; ++i) {
			strDecode = caesarShift(str, i, false);
			$("tbody").append(`<tr><td>${i}</td><td>${strDecode}</td></tr>`);
		}
  } else if (currentLanguage_decode === 'en' && str.search(/^[a-zA-Z]+$/) !== -1) {
		$("tbody tr").remove();
    for (var i = 1; i < 26; ++i) {
			strDecode = caesarShift(str, i, false);
			$("tbody").append(`<tr><td>${i}</td><td>${strDecode}</td></tr>`);
		} 
  } else {
    alert("Выбранный язык не соответствует языку введенного слова");
  } 
});

// -----------------------------------------------------------

// -----------ТРЕТИЙ ПУНКТ------------------------------------

function encrypt(){
	var file = document.getElementById("in").files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
		var tfile = new Uint8Array(e.target.result);
		for(i=0;i<tfile.length;i++){
			tfile[i] = parseInt(tfile[i]) + parseInt(document.getElementById("shift").value);
			if(tfile[i]>255){
				tfile[i]-=256;
			}
		}
	download(tfile);
  };
 	reader.readAsArrayBuffer(file)
}

function decrypt(){
	var file = document.getElementById("in").files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
		var tfile = new Uint8Array(e.target.result);
		for(i=0;i<tfile.length;i++){
			tfile[i] = parseInt(tfile[i]) - parseInt(document.getElementById("shift").value);
			if(tfile[i]<0){
				tfile[i]+=256;
			}
		}
	download(tfile);
  };
 	reader.readAsArrayBuffer(file)
}

function numberTest(n){
	if (n>255) {
		document.getElementById("shift").value=255;
	}
	if (n<0) {
		document.getElementById("shift").value=0;
	}
	document.getElementById("hex").value = parseInt(document.getElementById("shift").value).toString(16).toUpperCase();
}

function download(data){
	var link = document.createElement('a');
	bl = new Blob([data]);
	link.href = URL.createObjectURL(bl);
		link.download = document.getElementById("in").files[0].name; 
	var e = new MouseEvent("click");
	link.dispatchEvent(e);
}

$(".encode_third").on('click', function(){
	encrypt();
});

$(".decode_third").on('click', function(){
	decrypt();
});

$("input[type=\"file\"]").on('change', function(){
	$("#name_of_file").text(document.getElementById('in').files[0].name);
});

// ----------------------------------------------------------
