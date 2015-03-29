# Introduction #

If you read the other Wiki-Pages about how to get a small script size, you have to set up your closure tools. Here is a tutorial.


# Tutorial #

I made this tutorial for Ubuntu-Users.

```
//you might need to purge openjdk first
sudo apt-get install ant wget subversion unzip sun-java6-jre sun-java6-jdk sun-java6-source

cd /var/www
mkdir closure
cd closure
svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library

svn checkout http://closure-compiler.googlecode.com/svn/trunk/ closure-compiler
ant jar
```