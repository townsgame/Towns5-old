<?php

require_once('files.lib.php');
require_once('init.php');


//----------------------------------------------------------------------------------------------------------------------


error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_WARNING );
ini_set("register_globals","off");
ini_set("display_errors","on");

//----------------------------------------------------------------------------------------------------------------------

define("gr",1.62);


define("height",212);//výška html bloku
//---------------------------
define("grid",0);
define("t_brdcc",0.3);//počet kuliček
define("t_brdca",2);//6;//min radius kule
define("t_brdcb",10);//8;//max radius kule
define("t_brdcr",gr);//8;//poměr šířka/výška kule
define("t_pofb",1);//přesah okrajů


//---------------------------

define("border",(1+(2*t_pofb)));


$size=intval($_GET['size']);
if(!$size)$size=160;

define("t_size",$size/border);

//----------------------------------------------------------------------------------------------------------------------



$terrain=$_GET['terrain'];
$file="../../media/image/terrain/$terrain.png";

if(!file_exists($file)){
    die('{error: \'No terrain!\'}');
}

$seed=intval($_GET['seed']);

//$seed=abs($seed);
//$seed=($seed%10)+1;

srand($seed);




//$ease=floatval($_GET['ease']);
//if(!$ease)$ease=1;


if(false){

}elseif($terrain=='t1' or $terrain=='t11') {
    $ease = 0.9;
}elseif($terrain=='t4'){
    $ease = 0.6;
}else{
    $ease=pow(abs($seed),(1/3));
}

//$ease=0.3;


//----------------------------------------------------------------------------------------------------------------------



$cachefile=files\cacheFile(array(1,$ease,$seed,$terrain,$size),'png','terrain');
if(!file_exists($cachefile) or isset($_GET['notmp']) or true) {
    //_________________________________________

    $source = imagecreatefrompng($file);

    $fileshape="../../media/image/terrain/shape/$terrain.png";
    if(file_exists($fileshape)){

        $shape = imagecreatefrompng($fileshape);

        $degrees=rand(0,360);

        $white = imagecolorallocate($shape,255, 255, 255);
        $shape = imagerotate($shape, $degrees,$white);

        /*header('Content-Type: image/png');
        imagepng($shape);
        exit;*/


    }else{

        $shape=false;
    }


    $maxx = imagesx($source) - (t_size * border);
    $maxy = imagesy($source) - (t_size * 2 * border);

    //die($maxx.','.$maxy);


    $xt = rand(0, $maxx);
    $yt = rand(0, $maxy);

    //die($xt.','.$yt);


    $img = imagecreatetruecolor(t_size * border, t_size * border /* 2*/);
    $img2 = imagecreatetruecolor(t_size * border, t_size * 2 * border);

    //----------------------------------------------------------------

    imagealphablending($img, false);

    $alpha = imagecolorallocatealpha($img, 0, 0, 0, 127);
    imagefill($img, 0, 0, $alpha);


    imagecopy($img2, $source, 0, 0, $xt, $yt, t_size * border, t_size * 2 * border);


    //----------------------------------------------------------------


    $sourceSize = imagesx($img2);
    $sourceSize2 = $sourceSize / 2;

    for ($i = 1; t_brdcc * $sourceSize * $sourceSize > $i; $i++) {

        $ytmp = rand(0, $sourceSize - 1);
        $xtmp = rand(0, $sourceSize - 1);


        $radiusx = rand(t_brdca, t_brdcb);
        $radiusy = rand(t_brdca, t_brdcb);


        $rgb = imagecolorat($img2, round($xtmp), round($ytmp*2));
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;


        if($terrain=='t6'){
            $q=1;
            //$q=$q*($ytmp/$sourceSize);
            $q=$q*($xtmp/$sourceSize);
            $q=1-$q;

            $r=$r*$q;
            $g=$g*$q;
            $b=$b*$q;
        }

        if($seed<0){

            $q=1;
            $q=$q*($ytmp/$sourceSize);
            $q=$q*($xtmp/$sourceSize);
            $q=1-$q;
            $q=pow($q,4);
            $q=$q/abs($seed);

            $r=$r*$q;
            $g=$g*$q;
            $b=$b*$q;
        }

        if($r>255)$r=255;
        if($g>255)$g=255;
        if($b>255)$b=255;


        if($shape){

            $alpha = imagecolorat($shape, round($xtmp/$sourceSize*imagesx($shape)), round($ytmp/$sourceSize*imagesy($shape)));
            $a=0;
            $a += ($alpha >> 16) & 0xFF;
            $a += ($alpha >> 8) & 0xFF;
            $a += $alpha & 0xFF;

            $a=$a/3/255;
            //$a=1-$a;
            $a=$a*127;




        }else{

            $dist = pow(pow(abs($sourceSize2 - $ytmp), 2) + pow(abs($sourceSize2 - $xtmp), 2), 1 / 2);
            $alpha = $dist / ($sourceSize2 * 1);
            if ($alpha > 1) {
                $alpha = 1;
            }

            $a = intval((1 - (1 - $alpha) * $ease) * 127);

        }



        if ($a < 1) $a = 1;
        if ($a > 127) $a = 127;
        $alpha = imagecolorallocatealpha($img, $r, $g, $b, $a);
        //imagesetpixel($terrain,$xtmp,$ytmp,$alpha);
        imagefilledellipse($img, $xtmp, $ytmp /* 2*/, $radiusx, $radiusy / t_brdcr, $alpha);
        //imagefilledellipse($terrain,$xtmp,$ytmp,$radiusx,$radiusy,$alpha);

    }


    //--------------------------Output
    imagedestroy($img2);
    imagedestroy($source);
    imagesavealpha($img, true);


    imagepng($img,$cachefile);


    //_________________________________________
}


header('Content-Type: image/png');
readfile($cachefile);





?>