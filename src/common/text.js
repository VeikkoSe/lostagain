function text(resolutionWidth, resolutionHeight, helpers) {
    'use strict';

    //var sb;

    var fontJson;

    var position;

    var textToC = function(text) {
        var ret = [];
        for (var i = 0; i < text.length; i++) {
            if (text[i] === '\n') {
                ret.push('newline');
            }
            else {

                ret.push(fontJson[text.charCodeAt(i)]);
            }
        }

        return ret;
    };

    var formatPixel = function(pixel) {
        var imageSize = 256;
        return (2 * pixel + 1) / (2 * imageSize);

    };

    var buildData = function(letters, twoD, xPos, yPos) {

        //var scalingFactor = 2;
        //32 reads in the fnt file created by the program
        var fontHeight = 32;

        var ret = [];

        var xAdvance = 0;
        var yAdvance = 0;

        for (var i = 0; i < letters.length; i++) {

            if (letters[i] === 'newline') {
                yAdvance -= fontHeight;
                xAdvance = 0;
                continue;
            }

            var yOffsetandAdvance = yAdvance - helpers.pInt(letters[i].yoffset);
            var xOffset = helpers.pInt(letters[i].xoffset);
            var xOffsetandAdvance = xOffset + xAdvance;
            var scale = 1;

            if (twoD) {

                //zero,zero is bottom left

                var xPosition = xPos;
                var yPosition = yPos;
                ret.push(
                    //first triangle and two texture coordinates
                    //  1, 1,             0.0, this.formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), this.formatPixel(helpers.pInt(letters[i].y)),
                    //  0, 1,                          0.0, this.formatPixel(helpers.pInt(letters[i].x)), this.formatPixel(helpers.pInt(letters[i].y)),
                    //  0, 0,0.0, this.formatPixel(helpers.pInt(letters[i].x)), this.formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height)),

                    //second triangle and two texture coordinates
                    //  1,1, 0.0, this.formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), this.formatPixel(helpers.pInt(letters[i].y)),
                    //  0,0, 0.0, this.formatPixel(helpers.pInt(letters[i].x)), this.formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height)),
                    //  1,0, 0.0, this.formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), this.formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height))

                    //first point
                    xPosition + (scale * ((xOffsetandAdvance + helpers.pInt(letters[i].width)) / resolutionWidth)),
                    (1 - (scale * (-1 * yOffsetandAdvance) / resolutionHeight)) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), formatPixel(helpers.pInt(letters[i].y)),
                    //second point
                    xPosition + (scale * (xOffsetandAdvance / resolutionWidth)),
                    (1 - (scale * (-1 * yOffsetandAdvance) / resolutionHeight)) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(helpers.pInt(letters[i].x)), formatPixel(helpers.pInt(letters[i].y)),
                    //third point
                    xPosition + (scale * (xOffsetandAdvance / resolutionWidth)),
                    (1 - (scale * (32 / resolutionHeight))) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(helpers.pInt(letters[i].x)), formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height)),

                    //second triangle and two texture coordinates
                    //first point
                    xPosition + (scale * ((xOffsetandAdvance + helpers.pInt(letters[i].width)) / resolutionWidth)),
                    (1 - (scale * (-1 * yOffsetandAdvance) / resolutionHeight)) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), formatPixel(helpers.pInt(letters[i].y)),
                    //second point
                    xPosition + (scale * (xOffsetandAdvance / resolutionWidth)),
                    (1 - (scale * (32 / resolutionHeight))) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(helpers.pInt(letters[i].x)), formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height)),
                    //third point
                    xPosition + (scale * ((xOffsetandAdvance + helpers.pInt(letters[i].width)) / resolutionWidth)),
                    (1 - (scale * (32 / resolutionHeight))) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height))
                );

            }
            else {
                ret.push(
                    //first triangle and two texture coordinates
                    xOffsetandAdvance + helpers.pInt(letters[i].width), yOffsetandAdvance, 0.0, formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), formatPixel(helpers.pInt(letters[i].y)),
                    xOffsetandAdvance, yOffsetandAdvance, 0.0, formatPixel(helpers.pInt(letters[i].x)), formatPixel(helpers.pInt(letters[i].y)),
                    xOffsetandAdvance, yOffsetandAdvance - helpers.pInt(letters[i].height), 0.0, formatPixel(helpers.pInt(letters[i].x)), formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height)),

                    //second triangle and two texture coordinates
                    xOffsetandAdvance + helpers.pInt(letters[i].width), yOffsetandAdvance, 0.0, formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), formatPixel(helpers.pInt(letters[i].y)),
                    xOffsetandAdvance, yOffsetandAdvance - helpers.pInt(letters[i].height), 0.0, formatPixel(helpers.pInt(letters[i].x)), formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height)),
                    xOffsetandAdvance + helpers.pInt(letters[i].width), yOffsetandAdvance - helpers.pInt(letters[i].height), 0.0, formatPixel(helpers.pInt(letters[i].x) + helpers.pInt(letters[i].width)), formatPixel(helpers.pInt(letters[i].y) + helpers.pInt(letters[i].height))
                );
            }

            xAdvance += helpers.pInt(letters[i].xadvance);

        }

        return ret;

    };

    var init = function() {

        //sb = sbin;

        //created with fontxmltojson.php
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                fontJson = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open('GET', './resources/fonts/base.js?' + Math.random(), false);
        xhttp.send();

    };

    return Object.freeze({
        textToC, init, buildData, subscribe: function() {

        },

        setPosition(v) {
            position = v;
        },
        getPosition() {
            return position;
        }

    });

}


