var hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
//TEST TEST TEST
// Linear congruential generator (LCG)
function lcg(d) {
	const a = 48271;
	const m = 2 ** 31 - 1;
	const q = Math.floor(m / a);
	const r = m % a;

	function getSeed() {
		return (Math.floor(Math.random() * (m - 1)) + 1);
	};

	const s = Int32Array.of(getSeed(), 0, 0, 0);
	function getNext(seed) {
		if (seed !== undefined) s[0] = seed;
		s[1] = s[0] / q;
		s[2] = s[0] % q;
		s[3] = a * s[2] - r * s[1];
		s[0] = s[3] > 0 ? s[3] : s[3] + m;
		return s[0];
	}

	var result = [];
	for(var i = 0; i < d; i++) {
		result += hex[Math.floor((getNext() / m) * 16)];
	}
	return result;
}

// Xorshift
function Xorshift32(d) {
	const m = 2 ** 32;
	function getseed() {
		return(Math.floor(Math.random() * (m - 1)) + 1);
	}
	const a = Uint32Array.of(getseed());

	function getnext(seed) {
    if (seed !== undefined) a[0] = seed;
    a[0] ^= a[0] << 13;
    a[0] ^= a[0] >>> 17;
    a[0] ^= a[0] << 5;
    return a[0];
  }

	var result = [];
	for(var i = 0; i < d; i++) {
		result += hex[Math.floor((getnext() / m) * 16)];
	}
	return result;
}

function Mathrand() {
	return(Math.floor(Math.random()* 16));
}

// Crypto
function Crypt() {
	const m = 2 ** 32;
  const buf = new Uint32Array(1);
	const result = Math.floor((window.crypto.getRandomValues(buf)[0] / m)*16);
	return result;
}

$(document).ready(function() {
	$('#digits').on('keyup', function() {
		var dmax = $('#digits').val();
		if (dmax > 1000) {
			$(this).val("1000");
		}
		else if (dmax < 0) {
			$(this).val("0");
		}
	});

	$('#results').on('keyup', function() {
		var rmax = $('#results').val();
		if (rmax > 100) {
			$(this).val("100");
		}
		else if (rmax < 0) {
			$(this).val("0");
		}
	});

	$('.generate').on('click', function() {
		var digits = $('#digits').val();
		var results = $('#results').val();
		var res = [];

		if ($('#mersenne').is(':checked')) {
			$('.modal').css({"display": "block"});
			return;
		};

		$("#output").html('');
		if (digits == 0 || results == 0) {
			$("#output").append('<p class="res">There must be a numbers, but there is nothing :(</p><p>Try to fill "digits" and "results"</p>');
		}

		if ($('#lcg').is(':checked')) {
			for (var j = 0; j < results; j++) {
				res = lcg(digits);
				$("#output").append('<p class="res">'+res+'</p>'+'\n');
				res = [];
			}
		}
		else if ($('#xorshift').is(':checked')) {
			for (var j = 0; j < results; j++) {
				res = Xorshift32(digits);
				$("#output").append('<p class="res">'+res+'</p>'+'\n');
				res = [];
			}
		}
		else if ($('#math').is(':checked')) {
			for (var j = 0; j < results; j++) {
				for (var i = 0; i < digits; i++) {
					res += hex[Mathrand()];
				}
				$("#output").append('<p class="res">'+res+'</p>'+'\n');
				res = [];
			}
		}
		else if ($('#crypt').is(':checked')) {
			for (var j = 0; j < results; j++) {
				for (var i = 0; i < digits; i++) {
					res += hex[Crypt()];
				}
				$("#output").append('<p class="res">'+res+'</p>'+'\n');
				res = [];
			}
		}
		$(".output_text").css({"visibility": "visible"});
		$("#output").css({"visibility": "visible"});
		$("#copybutton").css({"visibility": "visible"});
		$('#output').scrollTop(0);
	});

	function copyToClipboard(el) {
		var tempTextarea = $('<textarea>');
		$('body').append(tempTextarea);
		tempTextarea.val($(el).text()).select();
		document.execCommand('copy');
		tempTextarea.remove();
	}

	$('#copybutton').click(function() {
		copyToClipboard('#output');
	});

	$('#modal').on('click', function() {
		$('.modal').css({"display": "block"});
	});

	$('.close').on('click', function() {
		$('.modal').css({"display": "none"});
	});

});