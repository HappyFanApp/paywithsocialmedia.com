$(window).resize(function(event){
	
	//adaptative();
  });
//adaptative();

function adaptative (){
        let navegador = navigator.userAgent;
        if (navigator.userAgent.match(/Android/i) ) {
            console.log("ANDROID un dispositivo móvil");
        } else if ( navigator.userAgent.match(/webOS/i) ) {
            console.log("WEBOS dispositivo móvil");
        }else if ( navigator.userAgent.match(/iPhone/i) ) {
            console.log("IPHONE dispositivo móvil");
        }else if ( navigator.userAgent.match(/iPad/i) ) {
            console.log("IPAD dispositivo móvil");
        }else if (navigator.userAgent.match(/iPod/i)) {
            console.log("IPOD dispositivo móvil");
        }else if ( navigator.userAgent.match(/BlackBerry/i) ) {
            console.log("BlackBerry un dispositivo móvil");
        }else if ( navigator.userAgent.match(/Windows Phone/i) ) {
            console.log("Windows Phone un dispositivo móvil");
        }else if (  window.innerWidth <= 780) {
            console.log("NAVEGADOR MENOR DE 780 PX");
        }else if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || window.innerWidth <= 780) {
            console.log("");
        }else {
            console.log("No estás usando un móvil");
        }
		if (window.innerWidth <= 768) {
            console.log("Es un móvil");
        }
		console.log( navigator.userAgent );
		console.log( window.innerWidth);
}

$(document).ready(function() {
	//detectHost();
	//detect();
	
	languageLoad();
    $('[load]').attr('reload','true').not('role');
	$('[method="onget"], [method="onpost"], [method="on"]').not('role').attr('on','true');
	displayLayer(); // load html with Role
	displayLOAD(); // load hml without Role
	 // get, post & ws ON
	
});

// obsoleto
$( window ).on( "load", function() {
	//onData();
	
	languages();// se cargan los idiomas y los posibles layer restantes
	displayON();// Con todos los layers cargados se procede a peticiones de red con métodos GET, POSt, ON websocket
});

// Mejorar: el JSON recibido se pueda colocar en un layer o en todo el DOM aunque este duplicado

var e = $('[auth]').not('INPUT, BUTTON, STYLE, SCRIPT, DIV');
for (let i = 0; i < e.length; i++) {
			//const host = e[i].getAttribute('onws');
			const host = e[i].tagName.toLowerCase();
			var wss = e[i].getAttribute('host');
			var auth = e[i].getAttribute('auth');
			var token = {};
			if(auth != null && auth != undefined ){

				const myArray = auth.split(" ");
				for(let i = 0; i < myArray.length; i++){
					const data = $(host).attr(	myArray[i]	);
					token[	myArray[i]	] = data ;
				}
			}
			var on =
				`var `+ host +` = io("` + wss + `", {
				transports: ['websocket'],
				autoConnect: true,
				auth:` + JSON.stringify(token) + `,
				reconnection: true
				});`;
			eval(	on 	);
	
	}

async function onWSupdate (){
var e = $('[auth]').not('INPUT, BUTTON, STYLE, SCRIPT, DIV');
for (let i = 0; i < e.length; i++) {
			const host = e[i].tagName.toLowerCase();
			var wss = e[i].getAttribute('host');
			var auth = e[i].getAttribute('auth');
			var token = {};
			if(auth != null && auth != undefined ){
				const myArray = auth.split(" ");
				for(let i = 0; i < myArray.length; i++){
					const data = $(host).attr(	myArray[i]	);
					token[	myArray[i]	] = data ;
				}
			}
			var on =
				``+ host +` = io("` + wss + `", {
				transports: ['websocket'],
				autoConnect: true,
				auth:` + JSON.stringify(token) + `,
				reconnection: true
				}); \n` + 
				host +`.on('connect', () => {
					console.clear();
					console.log('%cFenixRELOADv1.0', 'color: green; background: black; font-size: 30px');
				});`;
			eval(	on 	);
	}
}


async function offWS(){
	var e = $('[type]').not('INPUT, BUTTON, STYLE, SCRIPT, DIV');
	for (let i = 0; i < e.length; i++) {
		if(e[i].getAttribute( "type" ).toLowerCase() === 'ws'){
				const host = e[i].tagName.toLowerCase();
				var on =  host + `.disconnect();`;
				eval(	on 	);
			}
		}
}

async function displayLayer(){
// DISPLAY 
// Poner que se cargue los LAYER desde el body para aumentar la plasticidad, en vez de que siempre se use el main
// <body layer=" layer1 layer2"></body>
    const control = $('body').attr('layer');
    $(control.split(' ').join(', ')).hide();
    $(control.split(' ')[0]).show();
	//$( '[show]' ).show();
	//$( '[hide]' ).css("display", "none");
// Cuando los layer del BODY estan cargados, entonces cargar los sub-layer=""	
	for(let i = 0; i < control.split(' ').length; i++){
		const layer = $( control.split(' ')[i] ).attr('layer');
		$(layer.split(' ').join(', ')).hide();
		$(layer.split(' ')[0]).show();
		for(let l = 0; l < layer.split(' ').length; l++){
			displayRole(layer.split(' ')[l]);
		}
		//displayRole(control.split(' ')[i]);
	}
	
}
function displayRole(pum){
	$( pum ).find('role').each(async function(index, div_server) {
		var varthis= $(this);
		await display(varthis);
	} );
};

function displaySave(pum){
	// <role> actualiza y guarda la nueva vista segun rol para ese servidor en concreto sin modificar las demas vistas
	$( '[server="'+pum+'"]' ).each(async function(index, div_server) {
		var varthis= $(this);
		await display(varthis);
	} );
}

async function display(pum){
	var head_server = $(pum).attr("server");
	var div_role = $(pum).attr("role");
	var load = $(pum).attr('load');
	var head_role;
	if(head_server != "" && head_server != undefined){
		head_role = $(	 head_server  ).attr("role");
		if(head_role != "" && head_role != undefined){			
			if( head_role == div_role ){
				if( $(pum).is('[load]') && ( $(pum).attr('reload') == 'true' || $(pum).attr('reload') == 'null' ))
					{
						$(pum).attr('reload', 'false');
						newLoad(pum);
					}else{
						//$(this).show();	
					}
					if(	$(pum).is('[method="onget"], [method="onpost"], [method="on"]') ){
						if(	!$(pum).is('[on]') || $(pum).attr('on') == 'null'){
							$(pum).attr('on','true');
							methodON(pum);
						}
					}
					$(pum).show();
			}else{
				$(pum).hide();
				// ponemos reload en null porque no está autoriz	
				lessLoad(pum);				
			}
		}
	}
};

async function displayON(pum){
	$('[on="true"]').each(function(index, dom){
		var varthis = $(this);
		methodON(varthis);
	})
	
}
function methodON(pum){

	if( $(pum).is('[method="onget"]') && $(pum).is('[on="true"]')){
		get(pum);		
		$(pum).attr('on', 'false');
	}
	if( $(pum).is('[method="onpost"]') && $(pum).is('[on="true"]')){
		post(pum);
		
		$(pum).attr('on', 'false');
	}
	if( $(pum).is('[method="on"]') && $(pum).is('[on="true"]')){
		ws(pum);	
		$(pum).attr('on', 'false');
	}
}
async function displayLOAD(){
	$('[reload="true"]').each(function(index, dom){

		var varthis = $(this);
		
		newLoad(varthis);
	})
}

async function newLoad(pum){
	
		var load = $(pum).attr('load');
		
		$(pum).load(load, function(){
			$(pum).find('role').each(async function(index,dom){
				$(this).attr('reload', 'true');									
				var newpum = $(this);
				await display(newpum);
			});
			// si hay un load sin rol definido lo carga
			$(pum).find('[load]').each(async function(index,dom){
				var newpum = $(this);
				//$(pum).attr('reload', 'false');
				if( $(newpum).is('[load]') && $(newpum).prop("tagName").toLowerCase() != 'role'){
					$(newpum).attr('reload', 'true');
					await newLoad(newpum);
				}
			});
			$(pum).find('[lang]').each(async function(index,dom){
				var parse = $(this);
				displayLang(parse);
			});
			$(pum).find('[method="onget"], [method="onpost"], [method="on"] ').each(function(index,dom){
				//falta comprobar que el host sea el mismo
				var newpum = $(this);
				
				if(	!$(newpum).is('[on]') || $(newpum).attr('on') == 'null' ){
					$(newpum).attr('on','true');
					methodON(newpum);
				}
				
				
				if($(pum).attr("server") === $(this).attr("host")){
					//pretendia ser la seguridad, pero hay que estudiarlo bien
				}
				
			});
		});

}

async function lessLoad(pum){
		$(pum).attr('reload', 'null');
		$(pum).attr('on','null');
	
		$(pum).find('role').each(function(index,dom){
			var newpum = $(this);
			lessLoad(newpum);				
		});
		// si hay un load sin rol definido lo carga
		$(pum).find('[load]').each(function(index,dom){
			var newpum = $(this);
			lessLoad(newpum);
		});
		$(pum).find('[lang]').each(function(index,dom){
			//var parse = $(this);
			//displayLang(parse);
		});
		$(pum).find('[method="onget"], [method="onpost"], [method="on"] ').each(function(index,dom){
			//falta comprobar que el host sea el mismo
			var newpum = $(this);
			lessLoad(newpum);		
		});
	

}

var data;
function languageLoad(){
// LANGUAGES
// Poner si no encuentra en su idoma poner el que haya en el idioma por defecto
var ln = navigator.language;
ln += ".json";
$.getJSON(ln, function(lang){
	data = lang;      
	}).fail(function(){
		
	});

}
 
function languages (){
// LANGUAGES
// Poner si no encuentra en su idoma poner el que haya en el idioma por defecto

	$(document).ready(function(){
		$('[lang]').not('html').each(function(index,dom){
			var objeto = $(this);
			displayLang(objeto);
		}); 
      
	});
}
function displayLang(lang){
	var objeto = $(lang).attr('lang');
	if(data[objeto] != undefined){
		var parse = lang;
		if(parse.prop("tagName") == "IMG")
		{
			parse.attr('src' , data[objeto]);
		}else if(parse.prop("tagName") == "INPUT"){
		   parse.attr('placeholder' , data[objeto]);
	   }
	   else {//si es un archivo
		   if(data[objeto].includes('.')){
			// Probar de llamar a newLoad( $this )
			// No funciona la recursividad, despues de un lan="load" si hay otro lang="" no es detectado
			// Al ser un archivo, estaría bien comprobar si es un .html y ver si tiene en su interior lang="" load="" <role></role>
			parse.attr('load',data[objeto]);
			newLoad(parse);
		   }else if(data[objeto].includes('http')){
			parse.attr('href',data[objeto]);
		   }else{
			parse.text(data[objeto]);
		   }
	   }
	}
}

$(document).on('click', '*', function(event) {

		if(		$(this).is('[view]')	){
			
						displayView(event);
		}
		if(		$(this).is('[method="get"]')	){
							get(event);
		}
		if(		$(this).is('[method="post"]')	){
							post(event);
		}
		if(		$(this).is('[method="put"]')	){
			put(event);
		}
		if(		$(this).is('[method="patch"]')	){
			patch(event);
		}
		if(		$(this).is('[method~="emit"]')		){
							ws(event);
		}		
		if(		$(this).is('[method="delete"]')	){
			deleted(event);
		}
		if(		$(this).is('[delete]')		){
			deleteLayer(event);
		}
		if(		$(this).is('[clear]')		){
			console.log('[clear]');
			clearLayer(event);
		}
		if(		$(this).is('[copy]')		){
			copy(event);
		}
		if(		$(this).is('[paste]')		){
			paste(event);
		}

});

function displayView(e){
    const view = e.target.getAttribute('view');
	console.log(e.target.type);
    const controlView = view.split('/');
	const from = controlView[0];
	const print = controlView[1];
    const layer = $(from).attr("layer");
    $(layer.split(' ').join(', ')).css("display", "none");
    $(print).show();
};

// OBSOLETO --> quitar siguientes versiones
function reloadClick(e){
//DOM reload=""
	const refresh = e.target.getAttribute('reload');
	if(refresh){
		display();
	}
};

function deleteLayer(e){
	// se deberia eliminar el tagName padre más proximo 
	if( e.target.getAttribute('delete') )
	{
		const layer = e.target.getAttribute('delete');
		$(e.target).closest(layer).remove();
	}
}

function clearLayer(e){
	var layerclean = e.target;
	var cleaning = $(layerclean).attr('body');
	var cleaned = $(layerclean).attr('clear').split(' ');
	for(let i = 0; i< cleaned.length; i++){
		$(cleaning).find('['+cleaned[i]+']').val('');
	}
	
	//console.log($(layerclean).attr('body'), $(layerclean).attr('clear'))

}

function post(e){
	if(e.target !== undefined ){
		var host = e.target.getAttribute('host');
		var url = $(host).attr('host');
		var params = e.target.getAttribute('params');
		var body = e.target.getAttribute('body');
		var head = $(host).attr('headers');
		var path = e.target.getAttribute('path');
		if(path !== null){
			url += path;
		}
		if(params !== null && params !== undefined){
			url += "?";
			url += jQuery.param( getParams( e ) );
		}
		e = e.target;
	}else{
		var host = $(e).attr('host');
		var url = $(host).attr('host');
		var params = $(e).attr('params');
		var body = $(e).attr('body');
		var path = $(e).attr('path');
		var head = $(host).attr('headers');
		if(path !== null){
		url += path;
		}
	}
	if(host == null || host == undefined){
		return;
	}

	var settings = {
		"url": url,
		"method": "POST",
		"timeout": 0,
		"headers": {},
		"data" : {}
	};

	if(body !== null && body !== undefined){
		settings.data = JSON.stringify(	getBody(e)	);
	};
	if(head !== null && head !== undefined ){
		const myArray = head.split(" ");
		for(let i = 0; i < myArray.length; i++){
			const data = $(host).attr(	myArray[i]	);
			settings.headers[	myArray[i]	] = data ;
		}
	}
	
	$.ajax(settings).done(function (r) {
		responseDisplay(r, e);
	}).fail( function() {
		//alert( 'Error!!' );
	});
};

function get(e){
	if(e.target !== undefined ){
	//method="get"
	var host = e.target.getAttribute('host');
	var url = $(host).attr('host');
	var params = e.target.getAttribute('params');
	var path = e.target.getAttribute('path');
	var head = $(host).attr('headers');
		if(path !== null){
			url += path;
		}
		if(params !== null && params !== undefined){
			url += "?";
			url += jQuery.param( getParams( e ) );
		}

	}else{
		var host = $(e).attr('host');
		var url = $(host).attr('host');
		var path = $(e).attr('path');
		var head = $(host).attr('headers');
		if(path !== null){
			url += path;
		}
	}

	if(host === null || host === undefined){
		
		return;
	}

	var settings = {
		"url": url,
		"method": "GET",
		"timeout": 0,
		"headers": {}
	};
	if(head !== null && head !== undefined ){
		const myArray = head.split(" ");
		for(let i = 0; i < myArray.length; i++){
		//document.getElementById("for").innerHTML += myArray[i];
			const data = $(host).attr(	myArray[i]	);
			settings.headers[	myArray[i]	] = data ;
		}
	}

	$.ajax(settings).done(function (r) {
		responseDisplay(r, e);
	}).fail( function() {

		//alert( 'Error!!' );
	
	});
	
};

function put(e){
	if(e.target !== undefined ){
		var host = e.target.getAttribute('host');
		var url = $(host).attr('host');
		var params = e.target.getAttribute('params');
		var body = e.target.getAttribute('body');
		var head = $(host).attr('headers');
		var path = e.target.getAttribute('path');
		if(path !== null){
			url += path;
		}
		if(params !== null && params !== undefined){
			url += "?";
			url += jQuery.param( getParams( e ) );
		}
		e = e.target;
	}else{
		var host = $(e).attr('host');
		var url = $(host).attr('host');
		var params = $(e).attr('params');
		var body = $(e).attr('body');
		var path = $(e).attr('path');
		var head = $(host).attr('headers');
		if(path !== null){
		url += path;
		}
	}
	if(host == null || host == undefined){
		return;
	}

	var settings = {
		"url": url,
		"method": "PUT",
		"timeout": 0,
		"headers": {},
		"data" : {}
	};

	if(body !== null && body !== undefined){
		settings.data = JSON.stringify(	getBody(e)	);
	};
	if(head !== null && head !== undefined ){
		const myArray = head.split(" ");
		for(let i = 0; i < myArray.length; i++){
			const data = $(host).attr(	myArray[i]	);
			settings.headers[	myArray[i]	] = data ;
		}
	}
	
	$.ajax(settings).done(function (r) {
		responseDisplay(r, e);
	}).fail( function() {
		//alert( 'Error!!' );
	});
};

function patch(e){
	if(e.target !== undefined ){
		var host = e.target.getAttribute('host');
		var url = $(host).attr('host');
		var params = e.target.getAttribute('params');
		var body = e.target.getAttribute('body');
		var head = $(host).attr('headers');
		var path = e.target.getAttribute('path');
		if(path !== null){
			url += path;
		}
		if(params !== null && params !== undefined){
			url += "?";
			url += jQuery.param( getParams( e ) );
		}
		e = e.target;
	}else{
		var host = $(e).attr('host');
		var url = $(host).attr('host');
		var params = $(e).attr('params');
		var body = $(e).attr('body');
		var path = $(e).attr('path');
		var head = $(host).attr('headers');
		if(path !== null){
		url += path;
		}
	}
	if(host == null || host == undefined){
		return;
	}

	var settings = {
		"url": url,
		"method": "PATCH",
		"timeout": 0,
		"headers": {},
		"data" : {}
	};

	if(body !== null && body !== undefined){
		settings.data = JSON.stringify(	getBody(e)	);
	};
	if(head !== null && head !== undefined ){
		const myArray = head.split(" ");
		for(let i = 0; i < myArray.length; i++){
			const data = $(host).attr(	myArray[i]	);
			settings.headers[	myArray[i]	] = data ;
		}
	}
	
	$.ajax(settings).done(function (r) {
		responseDisplay(r, e);
	}).fail( function() {
		//alert( 'Error!!' );
	});
};
function deleted(e){
	if(e.target !== undefined ){
		var host = e.target.getAttribute('host');
		var url = $(host).attr('host');
		var params = e.target.getAttribute('params');
		var body = e.target.getAttribute('body');
		var head = $(host).attr('headers');
		var path = e.target.getAttribute('path');
		if(path !== null){
			url += path;
		}
		if(params !== null && params !== undefined){
			url += "?";
			url += jQuery.param( getParams( e ) );
		}
		e = e.target;
	}else{
		var host = $(e).attr('host');
		var url = $(host).attr('host');
		var params = $(e).attr('params');
		var body = $(e).attr('body');
		var path = $(e).attr('path');
		var head = $(host).attr('headers');
		if(path !== null){
		url += path;
		}
	}
	if(host == null || host == undefined){
		return;
	}

	var settings = {
		"url": url,
		"method": "DELETE",
		"timeout": 0,
		"headers": {},
		"data" : {}
	};

	if(body !== null && body !== undefined){
		settings.data = JSON.stringify(	getBody(e)	);
	};
	if(head !== null && head !== undefined ){
		const myArray = head.split(" ");
		for(let i = 0; i < myArray.length; i++){
			const data = $(host).attr(	myArray[i]	);
			settings.headers[	myArray[i]	] = data ;
		}
	}
	
	$.ajax(settings).done(function (r) {
		responseDisplay(r, e);
	}).fail( function() {
		//alert( 'Error!!' );
	});
};

function ws(e){
	var ws;
	var data;
	var method;
	var event;
	var print;
	var println;
	var save;
	
	if(e.target != undefined ){
		ws = e.target.getAttribute('host');
		data = e.target.getAttribute('body');
		method = e.target.getAttribute('method');
		event = e.target.getAttribute('event');
		print =  e.target.getAttribute("print");
		println =  e.target.getAttribute("println");
		save =  e.target.getAttribute('save');
		e = e.target;
	}else{
		ws = $(e).attr('host');
		data = $(e).attr('body');
		method =$(e).attr('method');
		event = $(e).attr('event');
		print = $(e).attr("print");
		println = $(e).attr("println");
		save = $(e).attr('save');
	}

	
	
	
	
	
	var get = {};
	if(ws === null || ws === undefined){
		return;
	}
	if(data !== undefined && data !== ""){

		get = JSON.stringify(getBody(e));
	}
	

	//ws emit
	if(  $(e).is('[method~="emit"]') ){
		var emit = `` + ws.toLowerCase() +`.emit('`+ event +`','`+ get +`')`;
		
		eval( emit );
	}
	//ws on
	if( $(e).is('[method~="on"]') && (print != null || println != null)	) { //$(e).is('[onws]')
		var on="";
		if( print != null){			
			on += ws.toLowerCase() + `.on('`+ event +`', (message) => { wsDisplay(message, '` + print + `' , 'print');	})`;
		}else if(println != null){
			on += ws.toLowerCase() + `.on('`+ event +`', (message) => { wsDisplay(message, '` + println + `' , 'println');	})`;
		}		else if( save != null){
			on += ws.toLowerCase() + `.on('`+ event +`', (message) => { 	savedata( message,  '` + save + `' );	})`;	
		}
		
		eval( on );
	}
};

function getParams(e){
var url_params = {};
var params = e.target.getAttribute('params').split(' ');

	for(let i = 0; i <params.length; i++){
		if( e.target.hasAttribute(params[i])){
			
			url_params = Object.assign(url_params, getParamsOnly(	params[i], e.target.getAttribute(params[i])	)	);
		}else{
			
			url_params = Object.assign(url_params, getParamsAll(params[i]));
		}
	}

	return url_params;
}
function findParams(form, param){
var value = ""
$(form).find('['+ param +']').each(function(){
	value =  $(this).val();
})
return value;
}

function getParamsAll(form){
	if(!$(form).length) return;
	var json = {};
	var params = $(form).attr('data').split(' ');
	for(let i = 0; i < params.length; i++){
		json[params[i]] = findParams(form, params[i]);
	}	
	return json;
}

function getParamsOnly(form, data){
	if(!$(form).length) return;
	var params = data.split(' ');
	var json = {};
	for(let i = 0; i < params.length; i++){
		json[params[i]] = findParams(form, params[i]);
	}
	
	return json;
}


function getBody(e){
var url_params = {};
var params = $(e).attr('body').split(' ');
console.log("Body");
	for(let i = 0; i <params.length; i++){
		if( $(e).is('['+params[i]+']')){
			
			url_params = Object.assign(url_params, getBodyOnly(	params[i], $(e).attr(params[i])	)	);
		}else{
			
			url_params = Object.assign(url_params, getBodyAll(params[i]));
		}
	}
return url_params;
}
function searchBody(form, param){
var value = "";
	if( $(form).not(':hidden').find('[' + param + ']').not(':hidden').length == 1)
	{
		value = findBodyObj(form, '[' + param + ']');
	}
	if( $(form).not(':hidden').find( param ).not(':hidden').length >= 1)
	{
		value =  findBodyArray(form, param);
		
	}
	if(value != '' && JSON.stringify(value) !== '{}'){
		
		return value;
	}
}

function findBodyObj(form, param){
var value ;
if($(form).not(':hidden').find(param).not(':hidden').is('[data]') )
{
	var obj = $(form).find(param);
	let exist = getBodyAll( obj );
	if(exist != '' && JSON.stringify(exist) !== '{}'){
		value = exist;
	}
	
}else if($(form).not(':hidden').find(param).not(':hidden')){
	var val = $(form).not(':hidden').find(param).val();
	
	if(val != ''){
		value = val;
	}else{
		val = $(form).find(param).text();
		if(val != ''){
			value = val;
		}		
	}
}

if(value != '' && JSON.stringify(value) !== '{}'){
	return value;
}
}
function findBodyArray(form, param){
var value = [];
	if($(form).not(':hidden').find( param ).not(':hidden').is('[data]') )
	{
		
		//value = getBodyAll(  param );
		$(form).not(':hidden').find( param ).not(':hidden').each(function(){
			var obj = $(this);
			
			var val = getBodyAll(obj)
			
			if(val != '' && JSON.stringify(val) !== '{}' && val != undefined){
				value.push( val );		
			}				
		});
	}else{
		$(form).not(':hidden').find( param ).not(':hidden').each(function(){
				var val = $(this).find('['+ param +']').val();
				
				if(val != '' && JSON.stringify(val) !== '{}'){
					value.push( val );
				}else{
					val = $(this).find('['+ param +']').text();
					if(val != '' && JSON.stringify(val) !== '{}'){
						value.push(val);
					}					
				}
		});
	}
	if(value != ''){
		return value;
	}
}

function getBodyAll(form){
	if(!$(form).length) return;
	var json = {};
	var params = $(form).attr('data').split(' ');
	for(let i = 0; i < params.length; i++){
		let exist = searchBody(form, params[i]);
		if(exist != '' && JSON.stringify(exist) !== '{}' && exist != null){
			json[params[i]] = exist;
		}
		
	}
	if(json != '' && JSON.stringify(json) !== '{}' && json != null){
		return json;
	}
	
}

function getBodyOnly(form, data){
	if(!$(form).length) return;
	var params = data.split(' ');
	var json = {};
	for(let i = 0; i < params.length; i++){
		let exist = searchBody(form, params[i]);
		if(exist != '' && JSON.stringify(exist) !== '{}' && exist != null){
			json[params[i]] = exist;
		}
	}
	if(json != '' && JSON.stringify(json) !== '{}' && json != null){
		return json;
	}
}


function wsDisplay(response, print, command){
	console.log(print);
	if( command === "print" ){
		if( $( print ).length > 1){
			$( print ).not('[style="display: none;"]').remove();
		}
		$(print).hide();
		parse( response, print );
		$(print).parent().animate({ scrollTop: $(print).parent().prop("scrollHeight")}, 1000);
	}
	if( command === "println"){	
		if( $( print ).length > 1){
			parse( response, print);
		}else{
			$(print).hide();
			parse( response, print);
		}
		$(print).parent().animate({ scrollTop: $(print).parent().prop("scrollHeight")}, 1000);
	}

};

function responseDisplay(response, e){
	var print;		// Pinta solo en el layer indicado, borrando lo que ya habia y poniendo los nuevos valores en sus nameKey="pull"
	var printFull; // Pinta toda la web y sobreescribe los valores en sus nameKey="pull"
	var println; // Pinta solo en el layer indicado añadiendo un nuevo elemento
	var save ;	// Guarda en el server
	var saveTo; // Guarda en un elemento
	if(e.target !== undefined){
	print = e.target.getAttribute('print');
	println = e.target.getAttribute('println');
	save = e.target.getAttribute('save');
	}else {
	print = $(e).attr('print');
	println = $(e).attr('println');
	save = $(e).attr('save');
	}

	if( save != undefined || save != null){
		
		savedata( response,  save );
	}
	if( print != undefined || print != null){
		if( $( print ).length > 1){
			$( print ).not('[style="display: none;"]').remove();
		}
		$(print).hide();
		parse( response, print );

	}
	if( println != undefined || println != null){
		
		parse( response, println);

	}
};

function parse(response, layer){
	 // se oculta el layer original
	var original = $(layer).last();
	if(Array.isArray(response)){
		var nLayer = Object.keys(response).length;
		//
		for (var i = 0; i < nLayer; i++) {
		var layer_copy = $( original ).clone(); // Se copia el layer original

		$(layer_copy).show();
		$(original).before(layer_copy);
		searchParse(response[i],layer_copy);
		}
	}else{		
		var layer_copy = $( original ).clone();
		$(layer_copy).show();
		$(original).before(layer_copy);
		searchParse(response, layer_copy);
	}

};

function searchParse(response,layer){
	
	if($(layer).is('[data]')){
		var data = $(layer).attr('data').split(' ');
		for(let i = 0; i < data.length; i++){
			// ¿Es objeto? --> clone 
			if(	 $(layer).find('[' + data[i] +']').length && !$(layer).find(data[i]).length){
				if( $(layer).find('[' + data[i] +']').is('[data]') ){
					var arrayLayer =  $(layer).find('[' + data[i] +']');
					searchParse(response[data[i]], arrayLayer);// No working
				}else{
					if(response[data[i]] != undefined ){						
						var item = $(layer).find('[' + data[i] +']');
						var to = $(item).attr(data[i]);
						var object = response[data[i]];
						
						if(to != ''){
							parseDefined(item, to, object);
						}else{
							$(layer).find('[' + data[i] +']').text(response[data[i]]);
						}						
					}else{
						$(layer).find('[' + data[i] +']').remove();
					}					
				}
				
			}
			// ¿Es Array? --> clone after
			if(	$(layer).find(data[i]).length ){
				var arrayLayer =  $(layer).find(data[i]);
				if($(arrayLayer).is('[data]')){
					if(response[data[i]] != undefined ){
						$(arrayLayer).hide();
						parse(response[data[i]], arrayLayer);
					}else{
						$(arrayLayer).remove();
					}
				}else{
					let newData = $(arrayLayer)[0].tagName.toLowerCase();					
					if(response.hasOwnProperty(newData) ){
						$(arrayLayer).hide();
						let count =  Object.keys(response[newData]).length;						
						for(let o = 0; o < count; o++){
							let newLayer =  $(arrayLayer).clone();
							var item = $(newLayer).find('[' + newData +']');
							var to = $(item).attr(data[i]);
							var object = response[data[i]];
							if(response[data[i]] != undefined){
								if(to != ''){
									parseDefined(item, to, object);
								}else{
									$(newLayer).find('[' + newData +']').text(response[newData][o]);
								}							
								$(newLayer).show();
								$(arrayLayer).before(newLayer);
							}else{
								$(layer).find(response[data[i]]).remove();
							}					
						}
					}else{
						$(arrayLayer).hide();
					}
				}				
			}		
		}
	}else{
		if(	$(layer) ){
		}
	}
}

function parseDefined(item, to, object){
	switch (to) { 
		case 'img': 
			$(item).attr('src',object);
			break;
		case 'src': 
			$(item).attr('src',object);
			break;
		case 'href': 
			$(item).attr('href', object);
			break;		
		case 'delete': 
			$(item).attr('delete', object);
			break;
		case 'clone': 
			break;		
		case 'pull':		
			break;
		case 'push': 			
			break;
		case 'placeholder': 
			$(item).attr('placeholder',object);
			break;
		default:
			$(item).attr(to, object);
			break;
	}
}

async function savedata(response,layer){
const myArray = layer.split(" ");
for(let i = 0; i < myArray.length; i++){
	var main = document.querySelector(myArray[i]);
	JSON.parse( JSON.stringify(response) , (key, value) => {
		if(typeof value !== 'object' && !Array.isArray(value) && value !== null && isNaN(key))
		{
				
				
				var str = JSON.stringify(parseJwt(value));
				
				//json contiene JWT, decodifica y guarda sus valores
				if( hasJsonStructure( str ) ){ 
					main.setAttribute(key,value);
					
					JSON.parse( str , (key, value) => {
					if(typeof value !== 'object' && !Array.isArray(value) && value !== null && isNaN(key))
						{
							
							main.setAttribute(key,value);
						}
					})
				}else{
					//json no contiene JWT
					main.setAttribute(key,value);
				}
		}                        
	});
	
	displaySave(myArray[i]); //Al hacer click en un boton se han hecho peticiones, se a renderizado la respuesta y ahora se visualiza segun el rol
};

//await displayON(); //despues de que el nuevo rol se haya cargado los method son llamados
await offWS(); // se desconecta los websocket 
await onWSupdate(); // se conecta los websockets con auth actualizados

};

function hasJsonStructure(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]' 
            || type === '[object Array]';
    } catch (err) {
        return false;
    }
};

function parseJwt(token){
	try {
	return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
	return null;
	}
};

//Prueba estado de conexion
function updateIndicator() {
    
};

window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator );

function notifyMe() {
	// Comprobamos si el navegador soporta las notificaciones
	if (!("Notification" in window)) {
	  console.log("Este navegador no es compatible con las notificaciones de escritorio");
	}  
	// Comprobamos si los permisos han sido concedidos anteriormente
	else if (Notification.permission === "granted") {
	  // Si es correcto, lanzamos una notificación
	  let fecha = Date.now();
	  var nf = new Notification("Nuevo mensaje!! " + fecha,
	  { icon: "/images/today.png" });
	  nf.onclick = function() { 
	  alert('abrir link');
	  
	  console.log("click"); 
	  };
	  nf.onshow = function() {
	   setTimeout(function() {nf.close()},10500)
	   };
	  nf.onclose = function() { 
	  console.log("close"); 
	  };
	}
  
	// Si no, pedimos permiso para la notificación
	else if (Notification.permission !== 'denied' || Notification.permission === "default") {
	  Notification.requestPermission(function (permission) {
		// Si el usuario nos lo concede, creamos la notificación
		if (permission === "granted") {
		  //var notification = new Notification("Hola!");
		}
	  });
	}
  
	// Por último, si el usuario ha denegado el permiso, y quieres ser respetuoso, no hay necesidad de molestarlo.
  }
  
  if (window.Notification) {
	console.log("supported");
	var nf = new Notification("Nuevo mensaje!!",
	{ icon: "/images/today.png" });
	nf.onclick = function() { 
	alert('abrir link');
	
	console.log("click"); 
	};
	nf.onshow = function() {
	 setTimeout(function() {nf.close()},10500)
	 };
	nf.onclose = function() { 
	console.log("close"); 
	};
	} else {
	console.log("not supported");
	}

	//setInterval( notifyMe, 5000);