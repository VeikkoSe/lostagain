<?php

$file = $argv[1];




class readObjFile {

  private $v = array();  
  private $vt = array();  
  private $vn = array();  
  private $faces = array();  
  private $indexedArray = array();
  private $indices = array();
  public function __construct($objFile)
  {
    $this->objFile = $objFile;
    $this->readData();

	$this->buildIndexBuffer();
  }	
  
  private function isclose($a,$b) {
     $truef = "a:".$a."|b:".$b;
  
  
    if(strpos($a,"-")===0 && strpos($b,"-")!==0)
	{
	  //echo $truef .=" false(eka)\n";
	  return false;
	}
	  
    if($a+0.01>=$b && $a-0.01<=$b)
	{
	  //echo $truef .=" true(eka)\n";
	  return true;
	}
	  
	  
	//echo $truef .=" false(toka)\n";  
	return false;  
  }
  
  private function alreadyInserted($row) {
   
	if(!empty($this->indexedArray))
	{
		foreach($this->indexedArray as $index=>$alreadyAdded)
		{
		

		
		  if($this->isclose($alreadyAdded['v'][0], $row['v'][0]) &&
			 $this->isclose($alreadyAdded['v'][1], $row['v'][1]) &&
			 $this->isclose($alreadyAdded['v'][2], $row['v'][2]) &&
			 $this->isclose($alreadyAdded['vt'][0], $row['vt'][0]) &&
			 $this->isclose($alreadyAdded['vt'][1], $row['vt'][1]) &&
			 $this->isclose($alreadyAdded['vn'][0], $row['vn'][0]) &&
			 $this->isclose($alreadyAdded['vn'][1], $row['vn'][1]) &&
			 $this->isclose($alreadyAdded['vn'][2], $row['vn'][2])
			 )
		  {
	   
			
		  
			$ret = array();
			$ret['data'] = $this->indexedArray[$index];
			$ret['index'] = $this->indices[$index];

			return $ret;
		  }
		  
		}
	}

	return false;
 }
  
  private function buildIndexBuffer()
  {
    $i = 0;

    foreach($this->ret as $i=>$row)
	{

	  $ins = $this->alreadyInserted($row);

	  if($ins)
	  {

	    $this->indexedArray[] = $ins['data'];
		$this->indices[] = $ins['index'];
		
      }
	  else
	  {
	  
	    $this->indexedArray[] = $row;
		$this->indices[] = $i;
		$i++;
      }
		
	  
	  
	}

  

  }

  private function readData()
  {

    $rows = file($this->objFile);

    $vl = 0;
    $tl = 0;
    $vnc = 0;

    foreach ($rows as $r)
    {	
 
      $row = explode(" ",$r);
    
      if($row[0]=="v")
      {
        $this->v[$vl][0] = trim($row[1]);
        $this->v[$vl][1] = trim($row[2]);
        $this->v[$vl][2] = trim($row[3]);
        $vl++;
      }
      else if($row[0]=="vt")
      {
        $this->vt[$tl][0] = trim($row[1]);
        $this->vt[$tl][1] = trim($row[2]);
        $tl++;
      }
      else if($row[0]=="vn")
      {
        $this->vn[$vnc][0] = trim($row[1]);
        $this->vn[$vnc][1] = trim($row[2]);
        $this->vn[$vnc][2] = trim($row[3]);
        $vnc++;
      }
      else if($row[0] == "f")
      {
        $s1 = explode("/",trim($row[1]));
        $s2 = explode("/",trim($row[2]));
        $s3 = explode("/",trim($row[3]));
        $this->faces[] = array($s1,$s2,$s3);

      }

    }
	$i = 0;
//var_dump($this->faces);

    foreach($this->faces as $findx=>$face)
    {
		foreach($face as $indx=>$part)
		{
			$this->ret[$i]['v'] = $this->v[$part[0]-1];
			$this->ret[$i]['vt'] = $this->vt[$part[1]-1];
			$this->ret[$i]['vn'] = $this->vn[$part[2]-1];
			$i++;

		}
    }

	
  }

  public function getConvertedData() {
    return array($this->indexedArray,$this->indices);
  }
  

}

$r = new readObjFile($file);
$cd  = $r->getConvertedData();



	$arr['indices'] = $cd[1];
	unset($cd['indices']);

    foreach($cd[0] as $row)
	{
		$arr['vertices'][] = $row['v'][0];
		$arr['vertices'][] = $row['v'][1];
		$arr['vertices'][] = $row['v'][2];

		$arr['texturecoordinates'][] = $row['vt'][0];
		$arr['texturecoordinates'][] = $row['vt'][1];

		$arr['normals'][] = $row['vn'][0];
		$arr['normals'][] = $row['vn'][1];
		$arr['normals'][] = $row['vn'][2];
	}


//print_r($arr);
	$f = explode(".",$file);
	$newFile = $f[0]."."."js";
	//var_dump($newFile);

	$arr['ambient'] = array(0.5,0.5,0.5);
	$arr['diffuse'] = array(0.9,0.9,0.9);
	$arr['specular'] = array(1.0,1.0,1.0);
	$arr['x'] = 0;
	$arr['y'] = 0;
	$arr['z'] = 0;
	$arr['name'] = $f[0];


  echo $newFile ." created!";
file_put_contents($newFile,json_encode($arr));



