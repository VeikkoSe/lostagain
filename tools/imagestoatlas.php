<?php

function getImages($maxSize, $path) {
    $images = scandir($path);
    $imagesBySize = [];

    foreach ($images as $image) {
        $imageData = @getimagesize($path . $image);


        if (empty($imageData)) {
            continue;
        }

        $width = $imageData[0];
        $height = $imageData[1];
        if ($width != $height) {
            exit("not symmetric image: " . $image);
        }
        if ($width % 2 != 0) {
            exit("not power of two: " . $image);
        }

        if ($width > $maxSize) {
            exit("too large image: " . $image);
        }

        $imagesBySize[$width][] = $image;
    }

    krsort($imagesBySize);
    return $imagesBySize;
}

$max = 2048;
$max = 4096;
$path = "../resources/images/";
$imageArray = getImages($max, $path);




$width = 0;
$height = 0;

//we create the atlas
$dest_img = imagecreatetruecolor($max, $max);
$maxDimension = 0;
$maxWidth = 0;
$row = 0;
$lastrow = 0;
foreach ($imageArray as $size => $images) {
    //$sideLength = $max/$size;

    $imageNumber = 0;
    //$amount = count($images)/$sideLength;

    //if ($size < 512) {
    //    continue;
    //}
    
    
    
    
    
    
    foreach ($images as $image) {
        $maxHeight = (!isset($maxHeight))?$size:$maxHeight;
        /*
        
           if ($size >= $maxDimension) {
        $maxDimension = $size;
    }
    else 
    {
        $maxWidth = $width;
    }
         * 
         * 
         */
        
        
        
        //if($row!=$lastrow) {
          //  $width = 0;
          //  $maxHeight = $size;        
           // $maxWidth = $max;
            
        //}
        //$lastrow = $row;
        
    
        //if($width+$size!=$max && $size<$lastsize) {
        //    $maxWidth = $width;
        //}
        
        

        $source_img = imagecreatefrompng($path . $image);

        imagecopymerge($dest_img, $source_img, $width, $height, 0, 0, $size, $size, 100);

        
        //maxed up, lets change image
        /*if ($width + $size >= $max && $height + $size >= $max) {
            $imageNumber++;
            if($height + $size >= $maxDimension) {
                $width = 0;
            }
            else {
                $width = $maxWidth;
            }
                
            $height = 0;
            break;
        }
         
         */

        
        if ($width + $size == $max) {
            
           // if($height+$size==$maxHeight) {
                //$row++;
                $maxHeight=$maxHeight+$size;
                $width=0;
                
           // }
            //else {
            
                $height+=$size;
                $width = $maxWidth;
            //}
         
            
            
            
            
        }
        else {
            $width+=$size;
        }
            /*
           
            if ($height + $size == $maxDimension) {
                  $width = 0;
                  $maxWidth =0;
            }
            else
            {
                $width = $maxWidth;
            }
            $height+=$size;
        }
        else {
            $width+=$size;
        }*/
        
       
            /*
            else {
            $height+=$size;
            }
             * 
             */
        
        
    }
    $lastsize = $size;
}




header('Content-Type: image/png');

imagepng($dest_img);
imagedestroy($dest_img);


