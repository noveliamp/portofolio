<?php

use Illuminate\Support\Facades\Route;

// Rute untuk halaman utama
Route::get('/', function () {
    return view('index');
});

// Rute untuk halaman detail portofolio
Route::get('/portfolio-details1', function () {
    return view('portfolio-details1');
});

Route::get('/portfolio-details2', function () {
    return view('portfolio-details2');
});

Route::get('/portfolio-details3', function () {
    return view('portfolio-details3');
});

Route::get('/portfolio-details4', function () {
    return view('portfolio-details4');
});

Route::get('/portfolio-details5', function () {
    return view('portfolio-details5');
});

Route::get('/portfolio-details6', function () {
    return view('portfolio-details6');
});

Route::get('/portfolio-details7', function () {
    return view('portfolio-details7');
});

Route::get('/portfolio-details8', function () {
    return view('portfolio-details8');
});

Route::get('/portfolio-details9', function () {
    return view('portfolio-details9');
});

// Rute untuk halaman blog
Route::get('/blog', function () {
    return view('blog');
});
