/* PROPERTY OF CALDER READE MILSOM WHITE 
 * COPYRIGHT 2016 Feb. 15th
 * contact : calderwhite1@gmail.com
 */
function boot (num) {
	switch(num){
		case 0:
		document.body.onscroll = function() {
			window.scrollTo(0,221)
			document.getElementsByClassName("demo")[0].style.boxShadow = "0 0 50px #888888";
			document.getElementsByClassName("demo")[0].style.transform = "scale(1.1,1.1)";
			document.body.onscroll = function() {};
		};
		break;
	}
}