# BrowserPopcorn

![BrowserPopcorn](https://popcorntimefree.info/assets/facebook-preview.jpg)

Popcorn Time now works in your browser! Watch the best movies instantly in HD, for free!

Source code of https://popcorntimefree.info/

## About the project
This project has been in development since the original Popcorn Time launched back in 2014. I wanted an easy way to stream movies to users for free without the need to install any plugins. 
I have developed custom technology and software to stream torrents on demand and transcode them to the baseline H.264 (MP4) format. After a beta test of the technology at MovBucket, I decided that streaming torrents on demand was too wasteful, so I implemented a caching mechanism.
The current process is a cron job that runs a PHP script which checks if there are any new movies with the YTS API. If there are, it will make a list of the magnet links and the proper file names and start up a node script that will start downloading the movie. After it's downloaded, the node script escalates the job to php, which will call ffmpeg to check the properties of the video file. If it matches the predefined set of properties, it will call another PHP script to extract the file from the folder, rename it, place it in the appropriate folder, refresh the registry of files, add the movie to the database and refresh the cache. If the video file isn't in the proper format, ffmpeg is called again to convert the file, and then the process continues.
I can't reveal more about the technology itself, but I'm slowly preparing it to be open sourced.
This project also uses 2 CDN servers to cache the files from the main server, and a simple redirect-based randomized load-balancer. 
Everything is served by NGINX, and most stuff is written in PHP

## About this repository
This repository (currently) contains the full PHP source code of BrowserPopcorn, except the access keys and content keys that are required for it to integrate with the main server and be able to link to the movie files. As such, it cannot be used to create a clone of BrowserPopcorn, and doing so would be against the [Terms of Service](https://popcorntimefree.info/tos.php). 
The code doesn't use any framework, the only external dependencies are the streaming server and GD2 (which can be installed with *sudo apt-get install php5-gd*). The code is fully procedural, with mixed logic and HTML code, like it was from 2003, because I'm too lazy to implement proper OOP and MVC.

## License
Copyright &copy; 2014-2015 Milan Kragujević. All rights reserved. 
Redistribution is strictly forbidden unless you have obtained a written permission from the Author (Milan Kragujević, milankragujevic@gmail.com).