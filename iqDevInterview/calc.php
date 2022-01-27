<?php
 
$deposit = json_decode($_REQUEST["deposit"]);
$i = 0;
$startDate = $deposit->startDate;
$sum = $deposit->sum;
$sumAdd = $deposit->sumAdd;
$percent = $deposit->percent;
$term = $deposit->term;
while ($i < $term) 
{
    $date2 = date('Y-m-d',strtotime($startDate)); // Преобразовываем дату в необходимый формат
    $dateAt = strtotime('+1 MONTH', strtotime($date2));
    $date1 = date('Y-m-d', $dateAt);
    $daysN = (strtotime($date1)-strtotime($date2)) / 60 / 60 / 24;
    if ( ( date('Y',strtotime($startDate)) % 4 == 0 && ( date('Y',strtotime($startDate)) % 100 != 0 || date('Y',strtotime($startDate)) % 400 == 0 ) ) ) 
    {
	    $daysY = 366;
    }
    else 
    {
	$daysY = 365;
    }
    $sum = $sum + ($sum + $sumAdd) * $daysN * ($percent / $daysY);
    $i++;
    $startDate = $date1;
}

$res = array('sum'=>number_format($sum,0,'',' '));
header('Content-type: application/json');
echo json_encode($res); 