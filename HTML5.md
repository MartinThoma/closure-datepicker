Should the input-field use type="date" or type="text"?

# Introduction #
HTML5 has a lot of cool new features. One of those new features is a `<input type="date" />` tag for datepickers. Unfortunately this tag isn't supported by most browsers. You can find an [article about the type date](http://diveintohtml5.org/forms.html#type-date) on diveintohtml5.org.


# Pro: Why the datepicker should use type="date" #
  * it's semantically better
  * the datepicker written by us could only be a fallback, if the browser doesn't support type="date"
  * the "pattern" attribute could be used if we would use type="text, e.g. `<input type="text" pattern="[0-9]{2}\.[0-9]{2}\.[0-9]{4}" />` (this RegEx can be improved significantly)
  * required could be used: `<input type="date" required="required" />`

# Contra: Why we should use type="text" #
  * We can be sure how browsers react
  * Always the same design on every browser

# Fallback #
A possibility how to create this fallback was explained on [www.unchi.co.uk](http://www.unchi.co.uk/2010/05/17/html5-date-picker-with-fallback/)