#!/bin/sh
cd H:/repos/nodeStudy/blog-native/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
