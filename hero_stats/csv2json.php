<?php

$files = [
    'ALEXANDER',
    'BARRETT',
];

foreach ($files as $file) {
    $data_csv_file = fopen($file.'.csv', 'r') or die("Unable to open file!");
    $csvs = [];
    while (($csvs[] = fgetcsv($data_csv_file, 1000, ',')) !== FALSE) {
        // DO NOTHING
    }
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
    $json = json_encode($datas);
    fclose($data_csv_file);
    // var_dump($json);die();

    $data_json_file = fopen('../app/datas/'.$file.'.json', 'w') or die("Unable to open file!");
    fwrite($data_json_file, $json);
    fclose($data_json_file);
}
