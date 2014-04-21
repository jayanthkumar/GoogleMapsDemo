(function(window, document, $) {
	var map, heatmap, busroute, polygon, rectangle, cityCircle;
	var routeMVCArray, cityCircles = [];
	var heatmaplistener, busrouteListener, polygonListener;
	var currentFeature;
	var locations = [new google.maps.LatLng(12.977460367767959, 77.56879806518555), 
		new google.maps.LatLng(12.974951201832406, 77.60639190673828), 
		new google.maps.LatLng(12.950025446093232, 77.57463455200195), 
		new google.maps.LatLng(12.992180297712107, 77.5993537902832), 
		new google.maps.LatLng(12.977794921312826, 77.63849258422852), 
		new google.maps.LatLng(13.004390486648706, 77.6290512084961), 
		new google.maps.LatLng(12.997867309754252, 77.64347076416016), 
		new google.maps.LatLng(12.985154985380868, 77.6455307006836)
	];
	var routes = [
		new google.maps.LatLng(12.977376729311391, 77.56854057312012), 
		new google.maps.LatLng(12.974616644461282, 77.60647773742676)
	];
	var polyOuter = [
		new google.maps.LatLng(13.020781302194132, 77.50219345092773), 
		new google.maps.LatLng(13.021283044756359, 77.68278121948242),
		new google.maps.LatLng(12.952702156906755, 77.64226913452148), 
		new google.maps.LatLng(12.975787593290965, 77.53240585327148)
	];
	var polyInner = [
		new google.maps.LatLng(12.999874459369373, 77.5499153137207), 
		new google.maps.LatLng(13.005226778976397, 77.63059616088867),
		new google.maps.LatLng(12.974783923203107, 77.60673522949219), 
		new google.maps.LatLng(12.976791259327648, 77.56965637207031)
	];
	var citymap = {};
	citymap['rajajinagar'] = {
		center : new google.maps.LatLng(13.000041721104608, 77.5499153137207),
		population : 2840
	};
	citymap['nationalcollege'] = {
		center : new google.maps.LatLng(12.949858150712576, 77.57463455200195),
		population : 8140
	};
	citymap['banaswadi'] = {
		center : new google.maps.LatLng(13.004892262383635, 77.62939453125),
		population : 3840
	};
	var extraLocations = [
		new google.maps.LatLng(12.843937692841445, 77.003173828125),
		new google.maps.LatLng(12.889457189524828, 77.2393798828125),
		new google.maps.LatLng(12.774303696888829, 77.113037109375),
		new google.maps.LatLng(12.618897304044024, 76.96746826171875),
		new google.maps.LatLng(13.082153590400935, 77.025146484375),
		new google.maps.LatLng(13.258659814691377, 77.091064453125),
		new google.maps.LatLng(13.328157505129283, 77.36297607421875),
		new google.maps.LatLng(13.341520159660119, 77.80792236328125),
		new google.maps.LatLng(13.114255082724767, 78.23638916015625),
		new google.maps.LatLng(12.9858240713056, 78.19244384765625),
		new google.maps.LatLng(12.80376658158582, 78.046875),
		new google.maps.LatLng(12.562606132061612, 77.56072998046875),
		new google.maps.LatLng(12.680535335290275, 77.55523681640625),
		new google.maps.LatLng(12.645698276524334, 77.92327880859375),
		new google.maps.LatLng(12.565286943988024, 78.06060791015625),
		new google.maps.LatLng(12.720726019420917, 78.277587890625),
		new google.maps.LatLng(12.809123100045515, 78.55499267578125),
		new google.maps.LatLng(12.956382587313202, 78.66485595703125),
		new google.maps.LatLng(13.378931658431565, 78.60443115234375),
		new google.maps.LatLng(13.012586029874125, 77.49996185302734),
		new google.maps.LatLng(13.00873917596427, 77.51283645629883),
		new google.maps.LatLng(13.00405596892827, 77.50494003295898),
		new google.maps.LatLng(13.012753283038096, 77.508544921875),
		new google.maps.LatLng(13.019276068411179, 77.49927520751953),
		new google.maps.LatLng(12.997198256275656, 77.5001335144043),
		new google.maps.LatLng(12.979300406693417, 77.4972152709961),
		new google.maps.LatLng(12.978965855174513, 77.50631332397461),
		new google.maps.LatLng(12.978296750786026, 77.51472473144531),
		new google.maps.LatLng(12.991511228908236, 77.51506805419922),
		new google.maps.LatLng(12.999707197521406, 77.5088882446289),
		new google.maps.LatLng(13.00338693213428, 77.50442504882812),
		new google.maps.LatLng(13.000543505633912, 77.50476837158203),
		new google.maps.LatLng(13.003219672653891, 77.50682830810547),
		new google.maps.LatLng(12.999038149002338, 77.51043319702148),
		new google.maps.LatLng(12.999038149002338, 77.5056266784668),
		new google.maps.LatLng(12.994856554900213, 77.52588272094727),
		new google.maps.LatLng(13.003219672653891, 77.53463745117188),
		new google.maps.LatLng(13.00405596892827, 77.53223419189453),
		new google.maps.LatLng(12.99552561468996, 77.53583908081055),
		new google.maps.LatLng(12.993685695929736, 77.5360107421875),
		new google.maps.LatLng(12.999383534448903, 77.52240093992441),
		new google.maps.LatLng(12.991343961425612, 77.53618240356445),
		new google.maps.LatLng(12.983649535462737, 77.54133224487305),
		new google.maps.LatLng(12.975118480349177, 77.53910064697266),
		new google.maps.LatLng(12.96407785693444, 77.52107620239258),
		new google.maps.LatLng(12.959895674690555, 77.50408172607422),
		new google.maps.LatLng(12.956884459973004, 77.53875732421875),
		new google.maps.LatLng(12.950192741361576, 77.56072998046875),
		new google.maps.LatLng(12.995023820016684, 77.55300521850586),
		new google.maps.LatLng(13.00154707164869, 77.59918212890625),
		new google.maps.LatLng(13.001379810928077, 77.67162322998047),
		new google.maps.LatLng(12.98799858811665, 77.67574310302734),
		new google.maps.LatLng(12.964245142762632, 77.68209457397461),
		new google.maps.LatLng(12.951865687866809, 77.68192291259766),
		new google.maps.LatLng(12.945508431393435, 77.6378059387207),
		new google.maps.LatLng(12.954709671142904, 77.63626098632812),
		new google.maps.LatLng(12.950527331561279, 77.62046813964844),
		new google.maps.LatLng(12.945173834455256, 77.59008407592773),
		new google.maps.LatLng(12.955211547173878, 77.5880241394043),
		new google.maps.LatLng(12.960230251855672, 77.58991241455078),
		new google.maps.LatLng(12.9629068529889, 77.58888244628906),
		new google.maps.LatLng(12.976791259327648, 77.59918212890625),
		new google.maps.LatLng(12.981307706351256, 77.56776809692383),
		new google.maps.LatLng(12.987831318268467, 77.57755279541016),
		new google.maps.LatLng(12.976623981936221, 77.57652282714844),
		new google.maps.LatLng(12.969598229889, 77.58441925048828),
		new google.maps.LatLng(12.961735843534294, 77.56948471069336),
		new google.maps.LatLng(12.970601920903418, 77.56107330322266),
		new google.maps.LatLng(12.994020227627564, 77.56467819213867),
		new google.maps.LatLng(13.005728553019768, 77.5693130493164),
		new google.maps.LatLng(13.018272574142705, 77.58750915527344),
		new google.maps.LatLng(13.022788266346288, 77.53910064697266),
		new google.maps.LatLng(13.021196134737648, 77.54366416203993),
		new google.maps.LatLng(13.00338693213428, 77.50648498535156),
		new google.maps.LatLng(12.994020227627564, 77.4979019165039),
		new google.maps.LatLng(12.992849364713313, 77.51060485839844),
		new google.maps.LatLng(12.99686372886014, 77.50682830810547),
		new google.maps.LatLng(13.00338693213428, 77.50528335571289),
		new google.maps.LatLng(12.991009426122396, 77.51626968383789),
		new google.maps.LatLng(12.999539935560733, 77.51163482666016),
		new google.maps.LatLng(13.000878028089785, 77.51446723937988),
		new google.maps.LatLng(12.980471333463804, 77.81547546386719),
		new google.maps.LatLng(12.942329742347678, 77.83195495605469),
		new google.maps.LatLng(12.922252875636776, 77.80586242675781),
		new google.maps.LatLng(12.89414255081663, 77.82989501953125),
		new google.maps.LatLng(12.913552398609209, 77.87040710449219),
		new google.maps.LatLng(12.987162237749496, 77.84912109375),
		new google.maps.LatLng(13.027303876236633, 77.80174255371094),
		new google.maps.LatLng(13.008559405119623, 77.7357521862723),
		new google.maps.LatLng(13.003888709898911, 77.82920837402344),
		new google.maps.LatLng(12.960397540269616, 77.80380249023438),
		new google.maps.LatLng(12.932291510920052, 77.77702331542969),
		new google.maps.LatLng(12.913552398609209, 77.54974365234375),
		new google.maps.LatLng(12.974449365606928, 77.6015853881836),
		new google.maps.LatLng(12.969096382863247, 77.60295867919922),
		new google.maps.LatLng(12.975453037045133, 77.60690689086914),
		new google.maps.LatLng(12.979300406693417, 77.60261535644531),
		new google.maps.LatLng(12.972107449831809, 77.59712219238281),
		new google.maps.LatLng(12.97863130320537, 77.6099967956543),
		new google.maps.LatLng(12.975285758753419, 77.59317398071289),
		new google.maps.LatLng(12.971271045996566, 77.61171340942383),
		new google.maps.LatLng(12.970601920903418, 77.60261535644531),
		new google.maps.LatLng(12.968594534825176, 77.61205673217773),
		new google.maps.LatLng(12.970100075902407, 77.61051177978516),
		new google.maps.LatLng(12.97110376489202, 77.60948181152344)
	];
	$(document).ready(function() {
		var mapEl = document.getElementById('map');
		var latlng = new google.maps.LatLng(12.9833, 77.5833);
		var mapOptions = {
			center : latlng,
			zoom : 13,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		createMap(mapEl, mapOptions);
		$("input[name='feature']").bind('click', function(e) {
			enableFeature(e.currentTarget.value);
		}); 
	});
	var createMap = function(mapEl, mapOptions) {
		map = new google.maps.Map(mapEl, mapOptions);
	};
	var enableFeature = function(feature) {
		if(!_.isUndefined(currentFeature)) {
			disableFeature(currentFeature);
		} 
		currentFeature = feature;
		switch (feature) {
			case "heatmap":
				enableHeatMap();
				break;
			case "polyline":
				enablePolyLine();
				break;
			case "polygon":
				enablePolygon();
				break;
			case "rectangle":
				enableRectangle();
				break;
			case "circle":
				enableCircle();
				break;
			default:
				document.write("Sorry, we are out of " + expr + ".<br>");
		}
	}; 
	var disableFeature = function(feature) {
		switch (feature) {
			case "heatmap":
				removeHeatMapListeneres();
				removeHeatMap();
				break;
			case "polyline":
				removePolylineListener();
				removePolyline();
				break;
			case "polygon":
				removePolygonListener();
				removePolygon();
				break;
			case "rectangle":
				removeRectange();
				break;
			case "circle":
				removeCircle(); 
				break;
			default:
				document.write("Sorry, we are out of " + expr + ".<br>");
		}
	};
	var enableHeatMap = function() {
		createheatmap({
			data : locations
		});
		heatmaplistener = google.maps.event.addListener(map, 'click', function(e) {
			console.log('You clicked the map.' + e.latLng);
			heatmap.getData().push(e.latLng);
		});
		setTimeout(function() {
			clearHeatMapDataPoints();
			heatmapEffect(true);
		}, 1000);
		setTimeout(function() {
			heatmapEffect(false);
		}, 10000);
	};
	var heatmapEffect = function(effect) {
		// var lnth = heatmap.getData().getLength()-1;
		var lnth = extraLocations.length - 1;
		var index;
		if (effect) {
			index = 0;
		} else {
			index = heatmap.getData().getLength() - 1;
		}
		(function addOrRemovePoint() {
			setTimeout(function() {
				if (effect) {
					addHeatMapDataPoints(extraLocations[index++]);
				} else {
					removeHeatMapPoint(index--);
				}
				if (index < lnth && index > 0) {
					addOrRemovePoint();
				}
			}, 100);
		})();
	}; 
	var createheatmap = function(options) {
		if (!heatmap) {
			heatmap = new google.maps.visualization.HeatmapLayer(options);
		}
		heatmap.setMap(map);
	};
	var addHeatMapDataPoints = function(point) {
		heatmap.getData().push(point);
	};
	var removeHeatMapPoint = function(ind){
		//heatmap.getData().removeAt(ind);
		heatmap.getData().pop();
	};
	var clearHeatMapDataPoints = function() {
		heatmap.getData().clear();
	};
	var removeHeatMap = function() {
		heatmap.setMap(null);
	};
	var removeHeatMapListeneres = function() {
		google.maps.event.removeListener(heatmaplistener);
	}; 
	var enablePolyLine = function(){
		// To instictly updates the change made
		routeMVCArray = new google.maps.MVCArray(routes);
		var polylineOptions = {
			path : routeMVCArray,
			strokeColor : '#FF0000', // Color of the line
			strokeOpacity : 0.5, // opaque
			strokeWeight : 2 // width of the line in pixels
		};
		createPolyline(polylineOptions);
		busrouteListener = google.maps.event.addListener(map, 'click', function(e) { 
			busroute.getPath().push(e.latLng);
		});
	};
	var createPolyline = function(PolylineOptions) {
		if(!busroute) {
			busroute = new google.maps.Polyline(PolylineOptions);
		}
		busroute.setMap(map);
	};
	var removePolyline = function() {
		busroute.setMap(null);
	};
	var showPolyline = function() {
		if (!busroute.getVisible()) {
			busroute.setVisible(true);
		}
	};
	var hidePolyline = function() {
		busroute.setVisible(false);
	};
	var removePolylineListener = function() {
		google.maps.event.removeListener(busrouteListener);
	};
	var enablePolygon = function(){
		var points = [polyOuter, polyInner];
		var options = {
				paths : points,
				strokeColor : '#FF0000',
				strokeOpacity : 0.8,
				strokeWeight : 2,
				fillColor : '#FF0000', // the color of the area inside the polygon
				fillOpacity : 0.35
		};
		createPolygon(options);
		polygonListener = google.maps.event.addListener(map, 'click', _.bind(function(e) {
			var vertices = polygon.getPath();
			vertices.push(e.latLng);
		}));
		polygonChangColorListener = google.maps.event.addListener(polygon, 'mouseover', function() { 
			polygon.setOptions({
				fillColor : '#0000ff',
				strokeColor : '#0000ff'
			}); 
		});
		polygonRevertColorListener = google.maps.event.addListener(polygon, 'mouseout', function(e) {
			polygon.setOptions({
				fillColor : '#ff0000',
				strokeColor : '#ff0000'
			});
		}); 
	};
	var createPolygon = function(options) {
		if(!polygon) {
			polygon = new google.maps.Polygon(options);
		}
		polygon.setMap(map);
	};
	var removePolygon = function() {
		polygon.setMap(null);
	};
	var showPolygon = function() {
		if (!polygon.getVisible()) {
			polygon.setVisible(true);
		}
	};
	var hidePolygon = function() {
		polygon.setVisible(false);
	};
	var removePolygonListener = function() {
		google.maps.event.removeListener(polygonListener);
		google.maps.event.removeListener(polygonChangColorListener);
		google.maps.event.removeListener(polygonRevertColorListener);
	};
	var enableRectangle = function(){
		var options = {
			strokeColor : '#FF0000',
			strokeOpacity : 0.8,
			strokeWeight : 2,
			fillColor : '#FF0000',
			fillOpacity : 0.35,
			map : map,
			bounds : new google.maps.LatLngBounds(new google.maps.LatLng(13.00823740801128, 77.54888534545898), 
																		new google.maps.LatLng(12.977794921312826, 77.63900756835938))
		}; 
		createRectangle(options);
	};
	var createRectangle = function(options) {
		if(!rectangle) {
			rectangle = new google.maps.Rectangle(options);
		}
		rectangle.setMap(map);
	};
	var removeRectange = function() {
		rectangle.setMap(null);
	};
	var enableCircle = function() {
		createCircle();
	};
	var createCircle = function() {
		for (var city in citymap) {
			var populationOptions = {
				strokeColor : '#FF0000',
				strokeOpacity : 0.8,
				strokeWeight : 2,
				fillColor : '#FF0000',
				fillOpacity : 0.35,
				center : citymap[city].center,
				radius : citymap[city].population / 20
			};
			// Add the circle for this city to the map.
			cityCircle = new google.maps.Circle(populationOptions);
			cityCircle.setMap(map);
			cityCircles.push(cityCircle);
		}
	};
	var removeCircle = function() {
		_.each(cityCircles, function(circle){
			circle.setMap(null);
		});
	};
})(window, document, jQuery);
