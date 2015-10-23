function text() {
    'use strict';

    var sb;

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

            var yOffsetandAdvance = yAdvance - pInt(letters[i].yoffset);
            var xOffset = pInt(letters[i].xoffset);
            var xOffsetandAdvance = xOffset + xAdvance;
            var scale = 1;

            if (twoD) {

                //zero,zero is bottom left

                var xPosition = xPos;
                var yPosition = yPos;
                ret.push(
                    //first triangle and two texture coordinates
                    //  1, 1,             0.0, this.formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), this.formatPixel(pInt(letters[i].y)),
                    //  0, 1,                          0.0, this.formatPixel(pInt(letters[i].x)), this.formatPixel(pInt(letters[i].y)),
                    //  0, 0,0.0, this.formatPixel(pInt(letters[i].x)), this.formatPixel(pInt(letters[i].y) + pInt(letters[i].height)),

                    //second triangle and two texture coordinates
                    //  1,1, 0.0, this.formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), this.formatPixel(pInt(letters[i].y)),
                    //  0,0, 0.0, this.formatPixel(pInt(letters[i].x)), this.formatPixel(pInt(letters[i].y) + pInt(letters[i].height)),
                    //  1,0, 0.0, this.formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), this.formatPixel(pInt(letters[i].y) + pInt(letters[i].height))

                    //first point
                    xPosition + (scale * ((xOffsetandAdvance + pInt(letters[i].width)) / sb.getResolutionWidth())),
                    (1 - (scale * (-1 * yOffsetandAdvance) / sb.getResolutionHeight())) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), formatPixel(pInt(letters[i].y)),
                    //second point
                    xPosition + (scale * (xOffsetandAdvance / sb.getResolutionWidth())),
                    (1 - (scale * (-1 * yOffsetandAdvance) / sb.getResolutionHeight())) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(pInt(letters[i].x)), formatPixel(pInt(letters[i].y)),
                    //third point
                    xPosition + (scale * (xOffsetandAdvance / sb.getResolutionWidth())),
                    (1 - (scale * (32 / sb.getResolutionHeight()))) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(pInt(letters[i].x)), formatPixel(pInt(letters[i].y) + pInt(letters[i].height)),

                    //second triangle and two texture coordinates
                    //first point
                    xPosition + (scale * ((xOffsetandAdvance + pInt(letters[i].width)) / sb.getResolutionWidth())),
                    (1 - (scale * (-1 * yOffsetandAdvance) / sb.getResolutionHeight())) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), formatPixel(pInt(letters[i].y)),
                    //second point
                    xPosition + (scale * (xOffsetandAdvance / sb.getResolutionWidth())),
                    (1 - (scale * (32 / sb.getResolutionHeight()))) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(pInt(letters[i].x)), formatPixel(pInt(letters[i].y) + pInt(letters[i].height)),
                    //third point
                    xPosition + (scale * ((xOffsetandAdvance + pInt(letters[i].width)) / sb.getResolutionWidth())),
                    (1 - (scale * (32 / sb.getResolutionHeight()))) - yPosition,
                    //texture coordinates
                    0.0, formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), formatPixel(pInt(letters[i].y) + pInt(letters[i].height))
                );

            }
            else {
                ret.push(
                    //first triangle and two texture coordinates
                    xOffsetandAdvance + pInt(letters[i].width), yOffsetandAdvance, 0.0, formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), formatPixel(pInt(letters[i].y)),
                    xOffsetandAdvance, yOffsetandAdvance, 0.0, formatPixel(pInt(letters[i].x)), formatPixel(pInt(letters[i].y)),
                    xOffsetandAdvance, yOffsetandAdvance - pInt(letters[i].height), 0.0, formatPixel(pInt(letters[i].x)), formatPixel(pInt(letters[i].y) + pInt(letters[i].height)),

                    //second triangle and two texture coordinates
                    xOffsetandAdvance + pInt(letters[i].width), yOffsetandAdvance, 0.0, formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), formatPixel(pInt(letters[i].y)),
                    xOffsetandAdvance, yOffsetandAdvance - pInt(letters[i].height), 0.0, formatPixel(pInt(letters[i].x)), formatPixel(pInt(letters[i].y) + pInt(letters[i].height)),
                    xOffsetandAdvance + pInt(letters[i].width), yOffsetandAdvance - pInt(letters[i].height), 0.0, formatPixel(pInt(letters[i].x) + pInt(letters[i].width)), formatPixel(pInt(letters[i].y) + pInt(letters[i].height))
                );
            }

            xAdvance += pInt(letters[i].xadvance);

        }

        return ret;

    };

    var init = function(sbin) {

        sb = sbin;

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
        start: function() {

        },
        setPosition(v) {
            position = v;
        },
        getPosition() {
            return position;
        }

    });

}


