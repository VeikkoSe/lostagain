function Text() {
    'use strict';

    var sb;

    var fontJson;

    var position;

    var textToC = function(text) {
        var ret = [];
        for (var i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
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
        var ret = (2 * pixel + 1) / (2 * imageSize);

        return ret;
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
        fontJson = {
            "0": {
                "id": "0",
                "x": "255",
                "y": "0",
                "width": "0",
                "height": "1",
                "xoffset": "0",
                "yoffset": "31",
                "xadvance": "0",
                "page": "0",
                "chnl": "15"
            },
            "13": {
                "id": "13",
                "x": "79",
                "y": "71",
                "width": "3",
                "height": "1",
                "xoffset": "-1",
                "yoffset": "31",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "32": {
                "id": "32",
                "x": "83",
                "y": "71",
                "width": "3",
                "height": "1",
                "xoffset": "-1",
                "yoffset": "31",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "33": {
                "id": "33",
                "x": "119",
                "y": "131",
                "width": "5",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "34": {
                "id": "34",
                "x": "146",
                "y": "181",
                "width": "7",
                "height": "4",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "35": {
                "id": "35",
                "x": "110",
                "y": "70",
                "width": "20",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "19",
                "page": "0",
                "chnl": "15"
            },
            "36": {
                "id": "36",
                "x": "190",
                "y": "110",
                "width": "14",
                "height": "19",
                "xoffset": "0",
                "yoffset": "8",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "37": {
                "id": "37",
                "x": "37",
                "y": "156",
                "width": "14",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "38": {
                "id": "38",
                "x": "52",
                "y": "156",
                "width": "14",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "39": {
                "id": "39",
                "x": "251",
                "y": "161",
                "width": "4",
                "height": "4",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "40": {
                "id": "40",
                "x": "30",
                "y": "0",
                "width": "6",
                "height": "25",
                "xoffset": "1",
                "yoffset": "6",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "41": {
                "id": "41",
                "x": "22",
                "y": "0",
                "width": "7",
                "height": "25",
                "xoffset": "-1",
                "yoffset": "6",
                "xadvance": "6",
                "page": "0",
                "chnl": "15"
            },
            "42": {
                "id": "42",
                "x": "126",
                "y": "185",
                "width": "7",
                "height": "5",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "43": {
                "id": "43",
                "x": "52",
                "y": "188",
                "width": "10",
                "height": "9",
                "xoffset": "0",
                "yoffset": "15",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "44": {
                "id": "44",
                "x": "251",
                "y": "156",
                "width": "4",
                "height": "4",
                "xoffset": "0",
                "yoffset": "23",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "45": {
                "id": "45",
                "x": "202",
                "y": "177",
                "width": "10",
                "height": "2",
                "xoffset": "0",
                "yoffset": "19",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "46": {
                "id": "46",
                "x": "248",
                "y": "174",
                "width": "4",
                "height": "2",
                "xoffset": "0",
                "yoffset": "24",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "47": {
                "id": "47",
                "x": "175",
                "y": "110",
                "width": "14",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "48": {
                "id": "48",
                "x": "22",
                "y": "156",
                "width": "14",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "49": {
                "id": "49",
                "x": "186",
                "y": "149",
                "width": "8",
                "height": "17",
                "xoffset": "-1",
                "yoffset": "9",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "50": {
                "id": "50",
                "x": "174",
                "y": "149",
                "width": "11",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "11",
                "page": "0",
                "chnl": "15"
            },
            "51": {
                "id": "51",
                "x": "161",
                "y": "149",
                "width": "12",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "52": {
                "id": "52",
                "x": "67",
                "y": "154",
                "width": "14",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "53": {
                "id": "53",
                "x": "148",
                "y": "149",
                "width": "12",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "54": {
                "id": "54",
                "x": "135",
                "y": "149",
                "width": "12",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "55": {
                "id": "55",
                "x": "122",
                "y": "151",
                "width": "12",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "56": {
                "id": "56",
                "x": "109",
                "y": "153",
                "width": "12",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "57": {
                "id": "57",
                "x": "96",
                "y": "153",
                "width": "12",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "58": {
                "id": "58",
                "x": "248",
                "y": "148",
                "width": "4",
                "height": "7",
                "xoffset": "0",
                "yoffset": "16",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "59": {
                "id": "59",
                "x": "251",
                "y": "129",
                "width": "4",
                "height": "8",
                "xoffset": "0",
                "yoffset": "16",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "60": {
                "id": "60",
                "x": "19",
                "y": "189",
                "width": "10",
                "height": "10",
                "xoffset": "0",
                "yoffset": "14",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "61": {
                "id": "61",
                "x": "104",
                "y": "185",
                "width": "12",
                "height": "6",
                "xoffset": "0",
                "yoffset": "16",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "62": {
                "id": "62",
                "x": "30",
                "y": "188",
                "width": "10",
                "height": "10",
                "xoffset": "0",
                "yoffset": "14",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "63": {
                "id": "63",
                "x": "234",
                "y": "109",
                "width": "13",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "64": {
                "id": "64",
                "x": "46",
                "y": "0",
                "width": "26",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "26",
                "page": "0",
                "chnl": "15"
            },
            "65": {
                "id": "65",
                "x": "25",
                "y": "75",
                "width": "21",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "66": {
                "id": "66",
                "x": "85",
                "y": "93",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "67": {
                "id": "67",
                "x": "187",
                "y": "70",
                "width": "17",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "68": {
                "id": "68",
                "x": "68",
                "y": "93",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "69": {
                "id": "69",
                "x": "0",
                "y": "136",
                "width": "13",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "70": {
                "id": "70",
                "x": "160",
                "y": "110",
                "width": "14",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "71": {
                "id": "71",
                "x": "68",
                "y": "73",
                "width": "20",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "72": {
                "id": "72",
                "x": "129",
                "y": "130",
                "width": "16",
                "height": "18",
                "xoffset": "0",
                "yoffset": "8",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "73": {
                "id": "73",
                "x": "125",
                "y": "131",
                "width": "3",
                "height": "19",
                "xoffset": "1",
                "yoffset": "7",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "74": {
                "id": "74",
                "x": "27",
                "y": "136",
                "width": "12",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "75": {
                "id": "75",
                "x": "51",
                "y": "94",
                "width": "16",
                "height": "19",
                "xoffset": "1",
                "yoffset": "7",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "76": {
                "id": "76",
                "x": "220",
                "y": "109",
                "width": "13",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "77": {
                "id": "77",
                "x": "221",
                "y": "49",
                "width": "26",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "26",
                "page": "0",
                "chnl": "15"
            },
            "78": {
                "id": "78",
                "x": "34",
                "y": "95",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "79": {
                "id": "79",
                "x": "47",
                "y": "74",
                "width": "20",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "80": {
                "id": "80",
                "x": "134",
                "y": "90",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "81": {
                "id": "81",
                "x": "93",
                "y": "49",
                "width": "20",
                "height": "20",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "82": {
                "id": "82",
                "x": "118",
                "y": "90",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "83": {
                "id": "83",
                "x": "166",
                "y": "90",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "84": {
                "id": "84",
                "x": "0",
                "y": "96",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "85": {
                "id": "85",
                "x": "169",
                "y": "70",
                "width": "17",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "86": {
                "id": "86",
                "x": "150",
                "y": "70",
                "width": "18",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "18",
                "page": "0",
                "chnl": "15"
            },
            "87": {
                "id": "87",
                "x": "191",
                "y": "49",
                "width": "29",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "29",
                "page": "0",
                "chnl": "15"
            },
            "88": {
                "id": "88",
                "x": "205",
                "y": "69",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "89": {
                "id": "89",
                "x": "222",
                "y": "69",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "90": {
                "id": "90",
                "x": "239",
                "y": "69",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "91": {
                "id": "91",
                "x": "248",
                "y": "0",
                "width": "7",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "6",
                "page": "0",
                "chnl": "15"
            },
            "92": {
                "id": "92",
                "x": "205",
                "y": "110",
                "width": "14",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "93": {
                "id": "93",
                "x": "0",
                "y": "27",
                "width": "6",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "6",
                "page": "0",
                "chnl": "15"
            },
            "94": {
                "id": "94",
                "x": "223",
                "y": "175",
                "width": "8",
                "height": "2",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "95": {
                "id": "95",
                "x": "186",
                "y": "181",
                "width": "15",
                "height": "2",
                "xoffset": "0",
                "yoffset": "26",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "96": {
                "id": "96",
                "x": "232",
                "y": "174",
                "width": "7",
                "height": "2",
                "xoffset": "2",
                "yoffset": "7",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "97": {
                "id": "97",
                "x": "71",
                "y": "172",
                "width": "15",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "98": {
                "id": "98",
                "x": "114",
                "y": "49",
                "width": "15",
                "height": "20",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "99": {
                "id": "99",
                "x": "102",
                "y": "171",
                "width": "13",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "100": {
                "id": "100",
                "x": "130",
                "y": "49",
                "width": "15",
                "height": "20",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "101": {
                "id": "101",
                "x": "55",
                "y": "174",
                "width": "15",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "102": {
                "id": "102",
                "x": "92",
                "y": "133",
                "width": "11",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "103": {
                "id": "103",
                "x": "146",
                "y": "130",
                "width": "15",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "104": {
                "id": "104",
                "x": "162",
                "y": "49",
                "width": "13",
                "height": "20",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "105": {
                "id": "105",
                "x": "113",
                "y": "131",
                "width": "5",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "106": {
                "id": "106",
                "x": "218",
                "y": "0",
                "width": "13",
                "height": "24",
                "xoffset": "-5",
                "yoffset": "7",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "107": {
                "id": "107",
                "x": "146",
                "y": "49",
                "width": "15",
                "height": "20",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "108": {
                "id": "108",
                "x": "186",
                "y": "49",
                "width": "4",
                "height": "20",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "109": {
                "id": "109",
                "x": "0",
                "y": "175",
                "width": "22",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "22",
                "page": "0",
                "chnl": "15"
            },
            "110": {
                "id": "110",
                "x": "130",
                "y": "169",
                "width": "13",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "111": {
                "id": "111",
                "x": "39",
                "y": "174",
                "width": "15",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "112": {
                "id": "112",
                "x": "162",
                "y": "130",
                "width": "15",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "113": {
                "id": "113",
                "x": "178",
                "y": "130",
                "width": "15",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "114": {
                "id": "114",
                "x": "207",
                "y": "163",
                "width": "11",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "115": {
                "id": "115",
                "x": "195",
                "y": "163",
                "width": "11",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "11",
                "page": "0",
                "chnl": "15"
            },
            "116": {
                "id": "116",
                "x": "176",
                "y": "49",
                "width": "9",
                "height": "20",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "117": {
                "id": "117",
                "x": "116",
                "y": "171",
                "width": "13",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "118": {
                "id": "118",
                "x": "87",
                "y": "172",
                "width": "14",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "119": {
                "id": "119",
                "x": "222",
                "y": "149",
                "width": "25",
                "height": "13",
                "xoffset": "-1",
                "yoffset": "13",
                "xadvance": "24",
                "page": "0",
                "chnl": "15"
            },
            "120": {
                "id": "120",
                "x": "144",
                "y": "167",
                "width": "13",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "121": {
                "id": "121",
                "x": "194",
                "y": "130",
                "width": "14",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "122": {
                "id": "122",
                "x": "158",
                "y": "167",
                "width": "12",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "123": {
                "id": "123",
                "x": "240",
                "y": "0",
                "width": "7",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "124": {
                "id": "124",
                "x": "37",
                "y": "0",
                "width": "4",
                "height": "25",
                "xoffset": "0",
                "yoffset": "6",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "125": {
                "id": "125",
                "x": "232",
                "y": "0",
                "width": "7",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "126": {
                "id": "126",
                "x": "165",
                "y": "181",
                "width": "10",
                "height": "3",
                "xoffset": "0",
                "yoffset": "18",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "161": {
                "id": "161",
                "x": "0",
                "y": "156",
                "width": "5",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "162": {
                "id": "162",
                "x": "171",
                "y": "167",
                "width": "11",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "11",
                "page": "0",
                "chnl": "15"
            },
            "163": {
                "id": "163",
                "x": "82",
                "y": "154",
                "width": "13",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "164": {
                "id": "164",
                "x": "219",
                "y": "163",
                "width": "12",
                "height": "11",
                "xoffset": "1",
                "yoffset": "14",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "165": {
                "id": "165",
                "x": "6",
                "y": "156",
                "width": "15",
                "height": "17",
                "xoffset": "0",
                "yoffset": "9",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "166": {
                "id": "166",
                "x": "42",
                "y": "0",
                "width": "3",
                "height": "25",
                "xoffset": "1",
                "yoffset": "6",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "168": {
                "id": "168",
                "x": "213",
                "y": "177",
                "width": "9",
                "height": "2",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "170": {
                "id": "170",
                "x": "84",
                "y": "186",
                "width": "9",
                "height": "7",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "9",
                "page": "0",
                "chnl": "15"
            },
            "171": {
                "id": "171",
                "x": "232",
                "y": "163",
                "width": "18",
                "height": "10",
                "xoffset": "0",
                "yoffset": "14",
                "xadvance": "18",
                "page": "0",
                "chnl": "15"
            },
            "172": {
                "id": "172",
                "x": "134",
                "y": "183",
                "width": "11",
                "height": "4",
                "xoffset": "0",
                "yoffset": "19",
                "xadvance": "11",
                "page": "0",
                "chnl": "15"
            },
            "176": {
                "id": "176",
                "x": "74",
                "y": "186",
                "width": "9",
                "height": "7",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "9",
                "page": "0",
                "chnl": "15"
            },
            "177": {
                "id": "177",
                "x": "183",
                "y": "167",
                "width": "11",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "11",
                "page": "0",
                "chnl": "15"
            },
            "178": {
                "id": "178",
                "x": "176",
                "y": "181",
                "width": "4",
                "height": "3",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "179": {
                "id": "179",
                "x": "181",
                "y": "181",
                "width": "4",
                "height": "3",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "5",
                "page": "0",
                "chnl": "15"
            },
            "180": {
                "id": "180",
                "x": "240",
                "y": "174",
                "width": "7",
                "height": "2",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "181": {
                "id": "181",
                "x": "223",
                "y": "129",
                "width": "13",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "182": {
                "id": "182",
                "x": "17",
                "y": "96",
                "width": "16",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "183": {
                "id": "183",
                "x": "154",
                "y": "181",
                "width": "6",
                "height": "4",
                "xoffset": "0",
                "yoffset": "17",
                "xadvance": "6",
                "page": "0",
                "chnl": "15"
            },
            "184": {
                "id": "184",
                "x": "117",
                "y": "185",
                "width": "8",
                "height": "6",
                "xoffset": "0",
                "yoffset": "25",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "185": {
                "id": "185",
                "x": "161",
                "y": "181",
                "width": "3",
                "height": "4",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "186": {
                "id": "186",
                "x": "94",
                "y": "186",
                "width": "9",
                "height": "7",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "9",
                "page": "0",
                "chnl": "15"
            },
            "187": {
                "id": "187",
                "x": "0",
                "y": "189",
                "width": "18",
                "height": "10",
                "xoffset": "0",
                "yoffset": "14",
                "xadvance": "18",
                "page": "0",
                "chnl": "15"
            },
            "191": {
                "id": "191",
                "x": "209",
                "y": "130",
                "width": "13",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "192": {
                "id": "192",
                "x": "73",
                "y": "25",
                "width": "21",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "193": {
                "id": "193",
                "x": "29",
                "y": "26",
                "width": "21",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "194": {
                "id": "194",
                "x": "51",
                "y": "25",
                "width": "21",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "195": {
                "id": "195",
                "x": "73",
                "y": "0",
                "width": "21",
                "height": "24",
                "xoffset": "0",
                "yoffset": "2",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "196": {
                "id": "196",
                "x": "7",
                "y": "27",
                "width": "21",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "197": {
                "id": "197",
                "x": "0",
                "y": "0",
                "width": "21",
                "height": "26",
                "xoffset": "0",
                "yoffset": "0",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "198": {
                "id": "198",
                "x": "0",
                "y": "76",
                "width": "24",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "24",
                "page": "0",
                "chnl": "15"
            },
            "199": {
                "id": "199",
                "x": "137",
                "y": "0",
                "width": "17",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "200": {
                "id": "200",
                "x": "28",
                "y": "51",
                "width": "13",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "201": {
                "id": "201",
                "x": "42",
                "y": "50",
                "width": "13",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "202": {
                "id": "202",
                "x": "0",
                "y": "52",
                "width": "13",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "203": {
                "id": "203",
                "x": "14",
                "y": "51",
                "width": "13",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "204": {
                "id": "204",
                "x": "72",
                "y": "49",
                "width": "6",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "6",
                "page": "0",
                "chnl": "15"
            },
            "205": {
                "id": "205",
                "x": "65",
                "y": "49",
                "width": "6",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "6",
                "page": "0",
                "chnl": "15"
            },
            "206": {
                "id": "206",
                "x": "56",
                "y": "49",
                "width": "8",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "207": {
                "id": "207",
                "x": "247",
                "y": "25",
                "width": "8",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "208": {
                "id": "208",
                "x": "131",
                "y": "70",
                "width": "18",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "18",
                "page": "0",
                "chnl": "15"
            },
            "209": {
                "id": "209",
                "x": "155",
                "y": "0",
                "width": "16",
                "height": "24",
                "xoffset": "0",
                "yoffset": "2",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "210": {
                "id": "210",
                "x": "95",
                "y": "25",
                "width": "20",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "211": {
                "id": "211",
                "x": "116",
                "y": "25",
                "width": "20",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "212": {
                "id": "212",
                "x": "137",
                "y": "25",
                "width": "20",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "213": {
                "id": "213",
                "x": "95",
                "y": "0",
                "width": "20",
                "height": "24",
                "xoffset": "0",
                "yoffset": "2",
                "xadvance": "21",
                "page": "0",
                "chnl": "15"
            },
            "214": {
                "id": "214",
                "x": "116",
                "y": "0",
                "width": "20",
                "height": "24",
                "xoffset": "0",
                "yoffset": "2",
                "xadvance": "21",
                "page": "0",
                "chnl": "15"
            },
            "215": {
                "id": "215",
                "x": "63",
                "y": "188",
                "width": "10",
                "height": "7",
                "xoffset": "0",
                "yoffset": "16",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "216": {
                "id": "216",
                "x": "89",
                "y": "71",
                "width": "20",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "20",
                "page": "0",
                "chnl": "15"
            },
            "217": {
                "id": "217",
                "x": "212",
                "y": "25",
                "width": "17",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "218": {
                "id": "218",
                "x": "194",
                "y": "25",
                "width": "17",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "219": {
                "id": "219",
                "x": "176",
                "y": "25",
                "width": "17",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "220": {
                "id": "220",
                "x": "158",
                "y": "25",
                "width": "17",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "17",
                "page": "0",
                "chnl": "15"
            },
            "221": {
                "id": "221",
                "x": "230",
                "y": "25",
                "width": "16",
                "height": "23",
                "xoffset": "0",
                "yoffset": "3",
                "xadvance": "16",
                "page": "0",
                "chnl": "15"
            },
            "222": {
                "id": "222",
                "x": "102",
                "y": "91",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "223": {
                "id": "223",
                "x": "79",
                "y": "49",
                "width": "13",
                "height": "21",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            },
            "224": {
                "id": "224",
                "x": "64",
                "y": "114",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "225": {
                "id": "225",
                "x": "48",
                "y": "115",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "226": {
                "id": "226",
                "x": "32",
                "y": "116",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "227": {
                "id": "227",
                "x": "128",
                "y": "110",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "228": {
                "id": "228",
                "x": "144",
                "y": "110",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "229": {
                "id": "229",
                "x": "16",
                "y": "116",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "230": {
                "id": "230",
                "x": "195",
                "y": "149",
                "width": "26",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "26",
                "page": "0",
                "chnl": "15"
            },
            "231": {
                "id": "231",
                "x": "237",
                "y": "129",
                "width": "13",
                "height": "18",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "232": {
                "id": "232",
                "x": "0",
                "y": "116",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "233": {
                "id": "233",
                "x": "230",
                "y": "89",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "234": {
                "id": "234",
                "x": "214",
                "y": "89",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "235": {
                "id": "235",
                "x": "198",
                "y": "90",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "236": {
                "id": "236",
                "x": "248",
                "y": "49",
                "width": "6",
                "height": "19",
                "xoffset": "-2",
                "yoffset": "7",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "237": {
                "id": "237",
                "x": "248",
                "y": "109",
                "width": "6",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "4",
                "page": "0",
                "chnl": "15"
            },
            "238": {
                "id": "238",
                "x": "104",
                "y": "133",
                "width": "8",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "8",
                "page": "0",
                "chnl": "15"
            },
            "239": {
                "id": "239",
                "x": "246",
                "y": "89",
                "width": "9",
                "height": "19",
                "xoffset": "-1",
                "yoffset": "7",
                "xadvance": "7",
                "page": "0",
                "chnl": "15"
            },
            "241": {
                "id": "241",
                "x": "14",
                "y": "136",
                "width": "12",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "242": {
                "id": "242",
                "x": "182",
                "y": "90",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "243": {
                "id": "243",
                "x": "150",
                "y": "90",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "244": {
                "id": "244",
                "x": "80",
                "y": "113",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "245": {
                "id": "245",
                "x": "96",
                "y": "113",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "246": {
                "id": "246",
                "x": "112",
                "y": "111",
                "width": "15",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "247": {
                "id": "247",
                "x": "41",
                "y": "188",
                "width": "10",
                "height": "9",
                "xoffset": "0",
                "yoffset": "15",
                "xadvance": "10",
                "page": "0",
                "chnl": "15"
            },
            "248": {
                "id": "248",
                "x": "23",
                "y": "174",
                "width": "15",
                "height": "13",
                "xoffset": "0",
                "yoffset": "13",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "249": {
                "id": "249",
                "x": "40",
                "y": "136",
                "width": "12",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "250": {
                "id": "250",
                "x": "53",
                "y": "135",
                "width": "12",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "251": {
                "id": "251",
                "x": "66",
                "y": "134",
                "width": "12",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "252": {
                "id": "252",
                "x": "79",
                "y": "134",
                "width": "12",
                "height": "19",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "12",
                "page": "0",
                "chnl": "15"
            },
            "253": {
                "id": "253",
                "x": "188",
                "y": "0",
                "width": "14",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "14",
                "page": "0",
                "chnl": "15"
            },
            "254": {
                "id": "254",
                "x": "172",
                "y": "0",
                "width": "15",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "15",
                "page": "0",
                "chnl": "15"
            },
            "255": {
                "id": "255",
                "x": "203",
                "y": "0",
                "width": "14",
                "height": "24",
                "xoffset": "0",
                "yoffset": "7",
                "xadvance": "13",
                "page": "0",
                "chnl": "15"
            }
        }

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


