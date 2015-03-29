Many datepickers are written by now. Some of them are quite good ([MooTools](http://www.electricprism.com/aeron/calendar/) [2](http://mootools.net/forge/p/mootools_datepicker), [jQuery](http://jqueryui.com/demos/datepicker/), [Google Closure Library](http://code.google.com/p/closure-library/source/browse/trunk/closure/goog/demos/datepicker.html?r=247)), but none of them is written with [Google Closure Library](http://code.google.com/p/closure-library/) and has all features I'd like to have. So I started this project and hope some developers will help me implementing those features. The ones I miss most in Googles demo are:
  * disabeling dates
  * muli-calendar functionality

## Demo ##
The latest working example of [Closure-Datepicker](http://martin-thoma.de/closureDatePicker/).

## How should it be used? ##
You have a form in which a user should enter some dates. Maybe a timespan should be entered. Now you create your form:
```
<form method="post">
  <label for="MyStartDate">begin</label>
  <input type="text" name="MyStartDate" id="MyStartDate" />
  <label for="MyEndDate">end</label>
  <input type="text" name="MyEndDate" id="MyEndDate"/>
  <input type="submit"/>
</form>
```

At the end of the page / in the head-tag you define "`MyStartDate`" and "`MyEndDate`" as a multi-calendar. The rest should be done by the script:
```
<script type="text/javascript">		
var myCal = new Calendar('MyStartDate', 'MyEndDate', ['15-18 02 2011'], 1);
</script>
```

The first parameter is the id of the input element which contains the startdate, the second parameter is the enddate, the third parameter are blocked dates and the last is padding wich has to be between start and end.

Language-specific information like the format (e.g. "d.m.Y" or "d/m/Y") or the names of weekdays have to be specified before the JavaScript file is compiled! They can't be changed within the document.