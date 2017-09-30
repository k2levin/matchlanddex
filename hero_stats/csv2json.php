<?php

$hero_names = ['ALEXANDER', 'BARRETT', 'FENRUS', 'JADE', 'PRIMM'];
$hero_stats = [];

foreach ($hero_names as $name) {
    $data_csv_file = fopen($name.'.csv', 'r') or die("Unable to open file!");
    $csvs = [];
    while (($csvs[] = fgetcsv($data_csv_file, 1000, ',')) !== FALSE) {
        // DO NOTHING
    }
    array_pop($csvs);
    $datas = [];
    $column_names = [];
    foreach ($csvs[0] as $single_csv) {
        $column_names[] = $single_csv;
    }
    foreach ($csvs as $key => $csv) {
        if ($key === 0) {
            continue;
        }
        foreach ($column_names as $column_key => $column_name) {
            $datas[$key-1][$column_name] = $csv[$column_key];
        }
    }
    $hero_stats[$name] = $datas;
    fclose($data_csv_file);
}

$data_json_file = fopen('../app/datas/hero.json', 'w') or die("Unable to open file!");
$json = json_encode($hero_stats);
fwrite($data_json_file, $json);
fclose($data_json_file);
