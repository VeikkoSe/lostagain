<?php

ini_set("display_errors",1);
ini_set('memory_limit', '-1');

class Terrain {

    public function __construct($imagefile) {

        if(!$imagefile)
        {
            return false;
        }
        //this.texture = new Texture(heightmap);
        $this->data = null;
        $this->initDone = 0;

        $this->normals = null;
        $this->vertices = null;
        $this->textures = null;
        $this->indices = null;
        $this->terrainData = null;
        $this->imageFile = $imagefile;

        $this->imageSize = getimagesize ($imagefile)[0];
        //$this->imageSize = 128;    


    }



    private function getHeightData() {

        $size = $this->imageSize;
        $im = imagecreatefrompng($this->imageFile);
        for($y = 0;$y<$size;$y++)
        {
          for($x = 0;$x<$size;$x++)
          {

            $src_index = imagecolorat($im,$x,$y);
            $pxlcolor = imagecolorsforindex($im, $src_index);
    
            $data[$y][$x] = 255-$pxlcolor['red'];
          }   
        }    
        imagedestroy($im);

        return $data;
    }

    public function createMap() {
        $tilesize =256;
        if($this->imageSize % $tilesize !=0)
        {
            exit("imagesize % $tilesize must be 0");
        }

        $im = imagecreatefrompng($this->imageFile);  

        $yloop = 0;
        //$batchnro =0;
        $size = $this->imageSize / $tilesize;

        for ($y=0;$y<$this->imageSize;$y = $y+$tilesize)
        {
            var_dump($y);
            $xloop = 0;    
            for ($x=0;$x<$this->imageSize;$x = $x+$tilesize)
            {

                //r_dump($batchnro);

                $heightdata = array();  
                $ypixel = 0;
                for($yy = $y;$yy<$y+$tilesize;$yy++)
                {
                    $xpixel = 0;
                    for($xx = $x;$xx<$x+$tilesize;$xx++)
                    {
        
                        $src_index = imagecolorat($im,$xx,$yy);
                        $pxlcolor = imagecolorsforindex($im, $src_index);
                
                        //$heightdata[$xpixel][$ypixel] = ($tilesize-1)-$pxlcolor['red'];

                        $xpixel++;
                    }
                    $ypixel++;

                }
               
                
                //TÄRKEE
                $mapdata = $this->createHeightMap($tilesize,$heightdata);
                //we swap x and y so the map renders property
                $mapdata['x'] = $y;
                $mapdata['z'] = $x;
                $mapdata['y'] = 0;
                //$mapdata['batch'] = $batchnro;

                file_put_contents("out/heightmap_".$yloop."_".$xloop.".js",json_encode($mapdata));
                unset($mapdata);
                unset($heightdata);
                
                
                

                
     
                /*if(($xloop+1)%2 == 0 && $xloop!=0 && $xloop!=$size-1) {
                    $batchnro++;
                }
                elseif($xloop==$size-1) {

                    $batchnro = $batchnro-(($size/2)-1);
                }*/
                
                $xloop++;

            }
/*
            if(($yloop+1)%2 == 0) {
                $batchnro = $batchnro+(($size/2)-1);
            }
  */          
            $yloop++;

            
        }

    }


    public function createHeightMap($width,$heightData) {

        $squares = $width-1;
        //$width = $this->imageSize;
        //$width  = $this->imageSize;


        $heightMapVertexData = array();
        $hd = array();

        $part = 1;

        // First, build the data for the vertex buffer
        for ($y = 0; $y < $squares; $y++) {

            for ($x = 0; $x < $squares; $x++) {

                //first triangle of square
                $xPosition1 = $x + 1;
                $yPosition1 = $y;

                $xPosition2 = $x + 1;
                $yPosition2 = $y + 1;

                $xPosition3 = $x;
                $yPosition3 = $y;

                //second triangle of square
                $xPosition4 = $x;
                $yPosition4 = $y;

                $xPosition5 = $x + 1;
                $yPosition5 = $y + 1;

                $xPosition6 = $x;
                $yPosition6 = $y + 1;

                // Position
                $hd[] = array($xPosition1, $yPosition1);
                $hd[] = array($xPosition2, $yPosition2);
                $hd[] = array($xPosition3, $yPosition3);

                $hd[] = array($xPosition4, $yPosition4);
                $hd[] = array($xPosition5, $yPosition5);
                $hd[] = array($xPosition6, $yPosition6);

            }
        }

      
        //keeps the indices;
        $iloop = array();
        //indice order number
        $il = 0;
        //if we have already used a vertice don't add it again
        //just link the original with index
        $added = array();
        //$alreadyAdded = false;
        $heightMapVertexData = array();
        //we create indexbuffer

        for ($i = 0; $i < count($hd); $i++) {
            //$alreadyAdded = false;

            $xc = $hd[$i][0] * $part;
            $yc = $hd[$i][1] * $part;

            if (isset($added[$xc][$yc])) {
                $iloop[] = $added[$xc][$yc];    
            }
            else { 

                //y is determined from heightmap value in same xy position
                $heightMapVertexData[] = $xc;
                $heightMapVertexData[] = 0;//$heightData[$hd[$i][1]][$hd[$i][0]];

                $heightMapVertexData[] = $yc;

                $added[$xc][$yc] = $il;
                $iloop[] = $il;//$hd[$i][0] . ',' . $hd[$i][1];

                $il++;
            }
        }
        unset($hd);
        unset($added);
        unset($heightData);

        $normals = $this->createNormals($heightMapVertexData, $iloop);

        $fakeTexture = array();

        for ($i = 0; $i < count($normals); $i++) {
            $fakeTexture[] = 0;
            $fakeTexture[] = 1;
        }

        return array('vertices'=>$heightMapVertexData,
                     'indices'=>$iloop,
                     'normals'=>$normals,
                     'texturecoordinates'=>$fakeTexture,
                     'ambient'  => array(0.5,0.5,0.5),
                     'diffuse'  => array(0.9,0.9,0.9),
                     'specular' => array(1.0,1.0,1.0)
                    );

    }




    private function createNormals($vs, $ind) {


        $x = 0;
        $y = 1;
        $z = 2;

        $ns = array();

        for ($i = 0; $i < count($vs); $i++) { //for each vertex, initialize normal x, normal y, normal z
            $ns[$i] = 0.0;
        }

        for ($i = 0; $i < count($ind); $i = $i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
            $v1 = array();
            $v2 = array();
            $normal = array();
            //p1 - p0
            $v1[$x] = $vs[3 * $ind[$i + 1] + $x] - $vs[3 * $ind[$i] + $x];
            $v1[$y] = $vs[3 * $ind[$i + 1] + $y] - $vs[3 * $ind[$i] + $y];
            $v1[$z] = $vs[3 * $ind[$i + 1] + $z] - $vs[3 * $ind[$i] + $z];
            // p0 - p1
            $v2[$x] = $vs[3 * $ind[$i + 2] + $x] - $vs[3 * $ind[$i + 1] + $x];
            $v2[$y] = $vs[3 * $ind[$i + 2] + $y] - $vs[3 * $ind[$i + 1] + $y];
            $v2[$z] = $vs[3 * $ind[$i + 2] + $z] - $vs[3 * $ind[$i + 1] + $z];

            //cross product by Sarrus Rule
            $normal[$x] = $v1[$y] * $v2[$z] - $v1[$z] * $v2[$y];
            $normal[$y] = $v1[$z] * $v2[$x] - $v1[$x] * $v2[$z];
            $normal[$z] = $v1[$x] * $v2[$y] - $v1[$y] * $v2[$x];

            for ($j = 0; $j < 3; $j++) { //update the normals of that triangle: sum of vectors
                $ns[3 * $ind[$i + $j] + $x] = $ns[3 * $ind[$i + $j] + $x] + $normal[$x];
                $ns[3 * $ind[$i + $j] + $y] = $ns[3 * $ind[$i + $j] + $y] + $normal[$y];
                $ns[3 * $ind[$i + $j] + $z] = $ns[3 * $ind[$i + $j] + $z] + $normal[$z];
            }
        }
        //normalize the result
        for ($i = 0; $i < count($vs); $i = $i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

            $nn = array();
            $nn[$x] = $ns[$i + $x];
            $nn[$y] = $ns[$i + $y];
            $nn[$z] = $ns[$i + $z];

            $len = sqrt(($nn[$x] * $nn[$x]) + ($nn[$y] * $nn[$y]) + ($nn[$z] * $nn[$z]));
            if ($len === 0 || is_nan($len)) 
                $len = 0.00001;

            $nn[$x] = $nn[$x] / $len;
            $nn[$y] = $nn[$y] / $len;
            $nn[$z] = $nn[$z] / $len;

            $ns[$i + $x] = $nn[$x];
            $ns[$i + $y] = $nn[$y];
            $ns[$i + $z] = $nn[$z];
        }

        return $ns;
    }
}


$terrain = new Terrain("heightmap_2048.png");
$terrain->createMap();
