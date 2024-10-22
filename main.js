
$(document).ready(function() {
$('#fullrand').prop('checked', true);
$('#passnum').val('10');
$('#passlen').val('12');

var nVer = 1;

var Lowercase = 0;
var Uppercase = 0;
var Numbers = 0;
var Symbols = 0;
var Nosimilar = 0;
var pwgen_CONSONANT = 1;
var pwgen_VOWEL = (1 << 1);
var pwgen_DIPTHONG = (1 << 2);
var pwgen_NOT_FIRST = (1 << 3);
var pwgen_ELEMENTS = [["a", pwgen_VOWEL], ["ae", pwgen_VOWEL | pwgen_DIPTHONG], ["ah", pwgen_VOWEL | pwgen_DIPTHONG], ["ai", pwgen_VOWEL | pwgen_DIPTHONG], ["b", pwgen_CONSONANT], ["c", pwgen_CONSONANT], ["ch", pwgen_CONSONANT | pwgen_DIPTHONG], ["d", pwgen_CONSONANT], ["e", pwgen_VOWEL], ["ee", pwgen_VOWEL | pwgen_DIPTHONG], ["ei", pwgen_VOWEL | pwgen_DIPTHONG], ["f", pwgen_CONSONANT], ["g", pwgen_CONSONANT], ["gh", pwgen_CONSONANT | pwgen_DIPTHONG | pwgen_NOT_FIRST], ["h", pwgen_CONSONANT], ["i", pwgen_VOWEL], ["ie", pwgen_VOWEL | pwgen_DIPTHONG], ["j", pwgen_CONSONANT], ["k", pwgen_CONSONANT], ["l", pwgen_CONSONANT], ["m", pwgen_CONSONANT], ["n", pwgen_CONSONANT], ["ng", pwgen_CONSONANT | pwgen_DIPTHONG | pwgen_NOT_FIRST], ["o", pwgen_VOWEL], ["oh", pwgen_VOWEL | pwgen_DIPTHONG], ["oo", pwgen_VOWEL | pwgen_DIPTHONG], ["p", pwgen_CONSONANT], ["ph", pwgen_CONSONANT | pwgen_DIPTHONG], ["qu", pwgen_CONSONANT | pwgen_DIPTHONG], ["r", pwgen_CONSONANT], ["s", pwgen_CONSONANT], ["sh", pwgen_CONSONANT | pwgen_DIPTHONG], ["t", pwgen_CONSONANT], ["th", pwgen_CONSONANT | pwgen_DIPTHONG], ["u", pwgen_VOWEL], ["v", pwgen_CONSONANT], ["w", pwgen_CONSONANT], ["x", pwgen_CONSONANT], ["y", pwgen_CONSONANT], ["z", pwgen_CONSONANT]];

$("#passlen").keyup(function()
{
	var lenght = Number($('#passlen').val());
	if (lenght > 40)
	{
		$('#passlen').val('40');
		$('p.pass_strenght').removeClass('weak');
		$('.pass_strenght').empty();
		$('.pass_strenght').append('VERY STRONG');
	}
	else if (lenght <= 0)
	{
		$('.pass_strenght').empty();
		$('.pass_strenght').append('No negative or zero!');
		$('#passlen').val('');
		$('p.pass_strenght').addClass('weak');
	}
	else if (lenght < 12)
	{
		$('p.pass_strenght').addClass('weak');
		$('.pass_strenght').empty();
		$('.pass_strenght').append('WEAK');
	}
	else if ((lenght >= 12) && (lenght < 16))
	{
		$('p.pass_strenght').removeClass('weak');
		$('.pass_strenght').empty();
		$('.pass_strenght').append('STRONG');
	}
	else if (lenght >= 16)
	{
		$('p.pass_strenght').removeClass('weak');
		$('.pass_strenght').empty();
		$('.pass_strenght').append('VERY STRONG');
	}
});

$("#passnum").keyup(function()
{
	var len = Number($('#passnum').val());
	if (len <= 0)
	{
		$('#passnum').val('');
	}
	else if (len > 50)
	{
		$('#passnum').val('50');
	}
});

$("#pwlen").change(function()
{
	if ($('#pwlen').is(':checked'))
	{
		$('#gen_results_name').css({"visibility": "hidden"});
		$('#gendiv').css({"visibility": "hidden"});
		$('#copybutton').css({"visibility": "hidden"});
		$('#checkbox-section').empty();
		$('#checkbox-section').append(
		'<h3>Use character sets:</h3>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="uppercase">\n'+
		'<label for="uppercase">Use at least one uppercase letter (A-Z)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="numbers">\n'+
		'<label for="numbers">Use at least one digit (0-9)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="symbols">\n'+
		'<label for="symbols">Use at least one special symbol</label>\n'+
		'</div>\n'
		);
	}
});

$("#fullrand").change(function()
{
	if ($('#fullrand').is(':checked'))
	{
		$('#gen_results_name').css({"visibility": "hidden"});
		$('#gendiv').css({"visibility": "hidden"});
		$('#copybutton').css({"visibility": "hidden"});
		$('#checkbox-section').empty();
		$('#checkbox-section').append(
		'<h3>Use character sets:</h3>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="lowercase" name="lowercase">\n'+
		'<label for="lowercase">Use lowercase letters (a-z)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="uppercase" name="uppercase">\n'+
		'<label for="uppercase">Use uppercase letters (A-Z)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="numbers" name="numbers">\n'+
		'<label for="numbers">Use digits (0-9)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="symbols" name="symbols">\n'+
		'<label for="symbols">Use other symbols (!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="unique_symbols" name="unique_symbols">\n'+
		'<label for="unique_symbols">Use unique characters (don\'t use the same character more than once)</label>\n'+
		'</div>\n'+
		'<div class="inputblock">\n'+
		'<input type="checkbox" id="nosimilar" name="nosimilar">\n'+
		'<label for="nosimilar">Use no similar characters (don\'t use characters like i, l, 1, L, o, 0, O, etc.)</label>\n'+
		'</div>\n'
		);
	};
});

$('#genbutton').click(function() {
	
	if($('#lowercase').prop('checked')) {Lowercase = 1;} else {Lowercase = 0;};
	if($('#uppercase').prop('checked')) {Uppercase = 1;} else {Uppercase = 0;};
	if($('#numbers').prop('checked')) {Numbers = 1;} else {Numbers = 0;};
	if($('#symbols').prop('checked')) {Symbols = 1;} else {Symbols = 0;};
	if($('#nosimilar').prop('checked')) {Nosimilar = 1;} else {Nosimilar = 0;};
	var nLength = $('#passlen').val();
	var passnum = $('#passnum').val();
	
	if (nLength == '') {nLength = 8};
	if (passnum == '') {passnum = 8};
	
	if ($('#gendiv').length)
	{
		$('#gendiv').html('');
		$('#gen_results_name').css({"visibility": "visible"});
		$('#gendiv').css({"visibility": "visible"});
		$('#copybutton').css({"visibility": "visible"});
	}
	
	if ($('#fullrand').is(':checked'))
	{
		clipboard = '';
		$('#gen_results_name').css({"visibility": "visible"});
		$('#gendiv').css({"visibility": "visible"});
		$('#copybutton').css({"display":"block"});
		var result = pass_generation(nLength, Lowercase, Uppercase, Numbers, Symbols, Nosimilar);
		if(result == "You must select at least one character set!")
		{
			$('#gendiv').append('<p>'+'You must select at least'+'</p>'+'\n');
			$('#gendiv').append('<p>'+'one character set!'+'</p>');
		}
		else if (result == "No enough character sets selected.")
		{
			$('#gendiv').append('<p>'+'No enough character sets selected!'+'</p>');
		}
		else
		{
			for(var i = 0; i < passnum; i++)
			{
				var result = pass_generation(nLength, Lowercase, Uppercase, Numbers, Symbols, Nosimilar);
				$('#gendiv').append('<p>'+result+'</p>'+'\n');
				clipboard += result + '\n';
			}
		};
	}
	else if ($('#pwlen').is(':checked'))
	{
		clipboard = '';
		$('#gen_results_name').css({"visibility": "visible"});
		$('#gendiv').css({"visibility": "visible"});
		for(var i = 0; i < passnum; i++)
		{
			var result_pw = pwgen_generate(nLength, Uppercase, Numbers, Symbols);
			$('#gendiv').append('<p>'+ result_pw +'</p>'+'\n');
			clipboard += result_pw + '\n';
		}
	}
});

function pass_generation(nLength, Lowercase, Uppercase, Numbers, Symbols, Nosimilar) {
	var lowercase = "abcdefghjkmnpqrstuvwxyz";
	var	uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
	var	numbers = "0123456789";
	//var	special_symbols	=	'//\!#$%&()*+,-.:;<=>?@[]^_`{}~';
	var	special_symbols	=	'\/!#$%&()*+,-.:;=?@[]^_`{}~';
	
	var	final_sequence	= "";
	var	nSetNumber = 0;
	if(Lowercase == 1)
	{
		final_sequence += lowercase;
		nSetNumber++;
	}
	if(Uppercase == 1)
	{
		final_sequence += uppercase;
		nSetNumber++;
	}
	if(Numbers == 1)
	{
		final_sequence += numbers;
		nSetNumber++;
	}
	if(Symbols == 1)
	{
		final_sequence += special_symbols;
		nSetNumber++;
	}
	if(!Nosimilar)
	{
		lowercase	+="ilo";
		uppercase	+="IO";
		numbers +="01";
		//szSymbols+="|";	
	}
	else
	{
		if(Symbols == 1)
		special_symbols = special_symbols.replace('|','');
	}
	if(nSetNumber == 0)
	{
		szBuffer = "You must select at least one character set!";
		return szBuffer;
	}
	
	var sequence_lenght = final_sequence.length;
	var nBufferLength = nLength;
	var	szBuffer = "";
	var bAllUnique = ($('#unique_symbols').prop('checked'));
	if(bAllUnique && sequence_lenght < nLength)
	{
		szBuffer = "No enough character sets selected.";
		return szBuffer;
	}
	
	if(!bAllUnique)
	{
		for(var i = 0; i < nBufferLength; i++)
		{
			var nPos = 0;
			if(nVer == 1)
			{
				nPos = Math.floor(Math.random() * sequence_lenght);
			}
			else
			{
				const array5= new Uint32Array(1);
				nPos = crypto.getRandomValues(array5) % sequence_lenght;
			}
			szBuffer += final_sequence.substring(nPos, nPos+1);
		}
		return szBuffer;
	}
	
	else
	{
		var final_sequence_copy = final_sequence;
		var bStop = false;
		for(var i = 0; i < nBufferLength && bStop == false; i++)
		{
			var today = new Date();
			var s1 = today.getSeconds();
    	while(true)
			{
				var today2 = new Date();
				var s2 = today2.getSeconds();
				if(s2 - s1 >= 2)
				{
					bBreak = 1;
					break;				
				}
				
				var	nAllLengthLeft	= final_sequence_copy.length;
				if( nAllLengthLeft == 0 )
				{
					bStop = true;
					break;
				}
				
				var nPos = 0;
				if(nVer == 1)
				nPos = Math.floor(Math.random() * nAllLengthLeft);
				else
				{
					const array6 = new Uint32Array(1);
					nPos = crypto.getRandomValues(array6) % nAllLengthLeft;
				}	
				
				var strNewTmp = final_sequence_copy.substring(nPos, nPos+1);										
				var nTmp = szBuffer.indexOf(strNewTmp);
				
				if( nTmp == -1 )
				{
					szBuffer += strNewTmp;
					break;
				}
				else
				{
					final_sequence_copy = final_sequence_copy.replace(strNewTmp, '');
				}
			}
		}
		return szBuffer;
	}
}

function pwgen_generate(pwlen, inc_capital, inc_number, inc_spec) {
	var result = null;
	while (!result)
		result = pwgen_generate0(pwlen, inc_capital, inc_number, inc_spec);
	return result;
}

function gen_rand0() {
	var rand = Math.random();
	return rand;
}

function pwgen_generate0(pwlen, inc_capital, inc_number, inc_spec) {
	var result = "";
	var prev = 0;
	var isFirst = true;
	var shouldBe = (gen_rand0() < 0.5) ? pwgen_VOWEL : pwgen_CONSONANT;
	while (result.length < pwlen) {
		i = Math.floor((pwgen_ELEMENTS.length - 1) * gen_rand0());
		str = pwgen_ELEMENTS[i][0];
		flags = pwgen_ELEMENTS[i][1];
		if ((flags & shouldBe) == 0) {
			continue;
		}
		if (isFirst && (flags & pwgen_NOT_FIRST)) {
			continue;
		}
		if ((prev & pwgen_VOWEL) && (flags & pwgen_VOWEL) && (flags & pwgen_DIPTHONG)) {
			continue;
		}
		if ((result.length + str.length) > pwlen) {
			continue;
		}
		if (inc_capital) {
			if ((isFirst || (flags & pwgen_CONSONANT)) && (gen_rand0() > 0.3)) {
				str = str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
				inc_capital = false;
			}
		}
		result += str;
		if (inc_number) {
			if (!isFirst && (gen_rand0() < 0.3)) {
				if ((result.length + str.length) > pwlen)
					result = result.slice(0, -1);
					result += Math.floor(10 * gen_rand0()).toString();
					inc_number = false;
					isFirst = true;
					prev = 0;
					shouldBe = (gen_rand0() < 0.5) ? pwgen_VOWEL : pwgen_CONSONANT;
					continue;
			}
		}
		if (inc_spec) {
			if (!isFirst && (gen_rand0() < 0.3)) {
				if ((result.length + str.length) > pwlen)
					result = result.slice(0, -1);
					var possible = '\/!#\$%&()*+,-.:;=?@[]^_`{}~';
					result += possible.charAt(Math.floor(gen_rand0() * possible.length));
					inc_spec = false;
					isFirst = true;
					prev = 0;
					shouldBe = (gen_rand0() < 0.5) ? pwgen_VOWEL : pwgen_CONSONANT;
					continue;
      }
    }
		if (shouldBe == pwgen_CONSONANT) {
			shouldBe = pwgen_VOWEL;
		} 
		else {
			if ((prev & pwgen_VOWEL) || (flags & pwgen_DIPTHONG) || (gen_rand0() > 0.3))
			{
				shouldBe = pwgen_CONSONANT;
			} 
			else
			{
				shouldBe = pwgen_VOWEL;
			}
    }
		prev = flags;
		isFirst = false;
	}
	if (inc_capital || inc_number || inc_spec)
		return null;
	return result;
}

function copyToClipboard(el) {
	var tempTextarea = $('<textarea>');
	$('body').append(tempTextarea);
	tempTextarea.val($(el).text()).select();
	document.execCommand('copy');
	tempTextarea.remove();
}

$('#copybutton').click(function() {
	copyToClipboard('#gendiv');
});

});