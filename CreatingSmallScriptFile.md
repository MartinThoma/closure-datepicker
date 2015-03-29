In this text I will explain how to create a small script file.

# Introduction #
Go to console and type (explained on [this page](http://code.google.com/intl/de/closure/compiler/docs/gettingstarted_app.html)):
```
java -jar compiler.jar \
--compilation_level ADVANCED_OPTIMIZATIONS \
--js /var/www/closure-library-read-only/closure/goog/projekte/closureDatepicker.js \
--js_output_file datepickerClosure-compiled.js
```

or even better if you use the [dependency tree calculation script](http://code.google.com/intl/de-DE/closure/library/docs/calcdeps.html):

```
python ../closure-library/closure/bin/calcdeps.py \
-i closureDatepicker.js \
-p ../closure-library/closure/goog/ \
-o compiled \
-c ../closure-compiler/build/compiler.jar \
-f "--compilation_level=ADVANCED_OPTIMIZATIONS" \
-f "--define=goog.LOCALE='de'" > closureDatepicker-compiled.js
```

You can specify any language you want. See [base.js](http://code.google.com/p/closure-library/source/browse/trunk/closure/goog/base.js?r=2) (goog.LOCALE) for more information.