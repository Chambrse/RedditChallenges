$(document).ready(function () {

    function cypher(password, message, direction) {

        /* Split the input into the component password and message */
        /*             var password = input.split(" ")[0];
                    var message = input.split(" ")[1];
                    var direction = input.split(" ")[2]; */
        console.log(direction);

        /* make the cypher table */
        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var index = alphabet.join("");
        var cypherTable = [alphabet.join("")];
        var increment = alphabet;
        for (i = 0; i < 26; i++) {
            increment.push(alphabet[0]);
            increment.shift();
            next = increment.join("");
            cypherTable.push(next);
        }

        /* Form the "passString" by repeating the password until it is longer than the message, then trim */
        passString = password;
        while (passString.length < message.length) {
            passString = passString + password;
        }
        passString = passString.slice(0, message.length);
        if (direction === 'encode') {

            /* encode the message! :D */
            var encoded = '';
            for (i = 0; i < message.length; i++) {
                encoded = encoded + cypherTable[index.search(message[i])][index.search(passString[i])];
            }
            document.getElementById("answer").innerHTML = encoded;

        } else if (direction === 'decode') {
            var decoded = '';
            for (i = 0; i < message.length; i++) {
                column = index.search(passString[i]);
                console.log(column);
                for (j = 0; j < 25; j++) {


                    if (cypherTable[j][column] === message[i]) {
                        decoded = decoded + index.charAt(j);
                        console.log(decoded);
                    }
                }
            }
            document.getElementById("answer").innerHTML = decoded;
        }

    }


    function minsum(product) {
        var t0 = performance.now();
        sum = parseInt(product);
        for (i = 1; i < sum; i++) {
            remainder = product % i;
            if (remainder === 0) {
                sum = product / i + i;
                console.log(i);
                console.log(sum);
            }
        }
        var t1 = performance.now;
        document.getElementById("minsum").innerHTML = sum;
    }


    function polydivide(poly1input, poly2input) {

        var poly1 = [];
        var poly2 = [];

        /* turn the inputs into nested arrays */
        for (var h = 0; h < poly1input.length; h += 2) {
            if (poly1input.charAt(h) == "-") {
                poly1.push([parseInt(poly1input.charAt(h + 1)) * -1, poly1input.charAt(h + 2)]);
                h++;
            } else {
                poly1.push([poly1input.charAt(h), poly1input.charAt(h + 1)]);
            }
        }
        console.log(poly1.join());

        for (var l = 0; l < poly2input.length; l += 2) {
            if (poly2input.charAt(l) == "-") {
                poly2.push([parseInt(poly2input.charAt(l + 1)) * -1, poly2input.charAt(l + 2)]);
                l++;
            } else {
                poly2.push([poly2input.charAt(l), poly2input.charAt(l + 1)]);
            }
        }
        console.log(poly2.join());

        /* Sort the input into descending order by exponent */
        poly1.sort(function (b, a) {
            return a[1] - b[1];
        });

        poly2.sort(function (b, a) {
            return a[1] - b[1];
        });

        /* at the end of the polynomial, add an [0,N] term for each N down to zero */
        while (poly1[poly1.length - 1][1] != 0) {
            if (poly1[poly1.length - 1][1] != 0) {
                poly1.push([0, poly1[poly1.length - 1][1] - 1]);
                console.log(poly1.join());
            }
        }

        while (poly2[poly2.length - 1][1] != 0) {
            if (poly2[poly2.length - 1][1] != 0) {
                poly2.push([0, poly2[poly2.length - 1][1] - 1]);
                console.log(poly2.join());
            }
        }

        /* add in missing terms */
        for (var i = 0; i < poly1.length; i++) {
            if (poly1[i][1] != 0) {
                if (poly1[i][1] != parseInt(poly1[i + 1][1]) + 1) {
                    poly1.splice(i + 1, 0, [0, poly1[i][1] - 1]);
                    console.log(poly1.join());
                }
            }
        }

        for (var i = 0; i < poly2.length; i++) {
            if (poly2[i][1] != 0) {
                if (poly2[i][1] != parseInt(poly2[i + 1][1]) + 1) {
                    poly2.splice(i + 1, 0, [0, poly2[i][1] - 1]);
                    console.log(poly2.join());
                }
            }
        }

        var toSubtract = [];
        var quotient = [];
        var highestOrder = poly1[0];
        var remainder;

        for (var j = 0; j < poly1.length - 1; j++) {
            quotient.push([highestOrder[0] / poly2[0][0], highestOrder[1] - poly2[0][1]]);
            toSubtract = [];
            for (var k = 0; k < poly2.length; k++) {
                toSubtract.push([quotient[j][0] * poly2[k][0], quotient[j][1] + poly2[k][1]]);
                console.log(toSubtract);
            }
            highestOrder = [poly1[j + 1][0] - toSubtract[1][0], poly1[j + 1][1]];
            console.log(highestOrder);
        }
        remainder = highestOrder[0];
        console.log(quotient);
        console.log(remainder);


        /* beautify */
        var polyAnswerString = "";
        for (m = 0; m < quotient.length; m++) {
            polyAnswerString += quotient[m][0] + "x" + "<sup>" + quotient[m][1] + "</sup>" + " +";
        }
        polyAnswerString += remainder;
        $("#polyAnswer").html(polyAnswerString);
    };

    $("#planeButton").on("click", function() {
        navigator.geolocation.getCurrentPosition(getAirplane);
    });


    /* https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226 */

/*     states 5 = long
 */
    function getAirplane(position) {

        userLat = position.coords.latitude;
        userLong = position.coords.longitude;

        /* define the lat and long for a 10 degree square around current position */
        var lamin = userLat - 5;
        var lamax = userLat + 5;
        var lomin = userLong - 5;
        var lomax = userLong + 5;

        skyRequestUrl = "https://opensky-network.org/api/states/all?lamin=" + lamin + "&lomin=" + lomin + "&lamax=" + lamax + "&lomax=" + lomax;

        $.ajax({
            url: skyRequestUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.states[0][1]);

            var distance;
            var currentBest;
            var bestIndex;

            for (var i = 0; i < response.states.length; i++) {
                distance = Math.sqrt(Math.pow(response.states[i][6] - userLat, 2) + Math.pow(response.states[i][5] - userLong, 2));
                if (!currentBest || distance < currentBest) {
                    currentBest = distance;
                    bestIndex = i;
                };
                console.log(distance);
            }

            $("#airplaneAnswer").html("")

            console.log(currentBest);

        });
        
    };

});