/**
 * @fileoverview Input Date Picker implementation.  Pairs a
 * goog.ui.PopupDatePicker with an input element and handles the input from
 * either. Should be used if two dates (from ... to ...) are to be handled
 * http://closure-library.googlecode.com/svn/docs/class_goog_ui_InputDatePicker.html
 * http://closure-library.googlecode.com/svn/docs/class_goog_ui_PopupDatePicker.html
 * http://closure-library.googlecode.com/svn/docs/class_goog_ui_DatePicker.html
 */

goog.provide('moose.picker');

goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.ui.InputDatePicker');

/** @define {string} */
moose.picker.PATTERN = "dd'.'MM'.'yyyy";                                        // in which format should the date be displayed? e.g.= "MM'/'dd'/'yyyy"

/** @define {string} */
moose.picker.SELECTEDCSSCLASS   = 'goog-date-picker-selected';
/** @define {string} */
moose.picker.GREYCSSCLASS       = 'goog-date-picker-grey';
/** @define {string} */
moose.picker.BLOCKEDCSSCLASS    = 'goog-date-picker-blocked';
/** @define {string} */
moose.picker.HILITECSSCLASS     = 'goog-date-picker-hilite';

var today = new goog.date.Date();
moose.picker.start = today.toString();
moose.picker.end   = moose.picker.start;

/**
 * This function returns the css class for a date
 * @param {goog.date.Date} date Any date which should get a css class
 * @return {string} The css class name
 */
goog.ui.DatePicker.prototype.dateDecorator = function (date) {
    var self = this;
    var dateString = date.toString(true);
    var isBlocked  = goog.array.find(this.blocked_dates, function (blocked) {
            if(goog.string.contains(blocked, ':')){
                var rangedBlockDate = blocked.split(':');
                return (rangedBlockDate[0] <= dateString && dateString <= rangedBlockDate[1]);
            } else {
                return (dateString == blocked);
            }});
    if(isBlocked){return moose.picker.BLOCKEDCSSCLASS;}
    if(this.getDate()){
        if(this.getDate().toString() == dateString){return moose.picker.SELECTEDCSSCLASS;}
    }
    if( dateString == moose.picker.start ){return moose.picker.GREYCSSCLASS;}
    if( dateString == moose.picker.end )  {return moose.picker.GREYCSSCLASS;}
    if( moose.picker.start < dateString && dateString < moose.picker.end){return moose.picker.HILITECSSCLASS;}
};

/**
 * Input date picker widget for to dates (from ... to ...)
 * @param {string} id1 The html-id of the first input element
 * @param {string} id2 The html-id of the second input element
 * @param {Array} blocked_dates Dates which can't be selected
 * @param {number} padding How many days should be between from and to?
 * @constructor
 */
moose.picker = function(id1, id2, blocked_dates, padding) {
    var formatter = new goog.i18n.DateTimeFormat(moose.picker.PATTERN);
    var parser    = new goog.i18n.DateTimeParse(moose.picker.PATTERN);

    // initialDate: today
    var initialDate = new goog.date.Date();

     // Block dates
    this.blocked_dates = blocked_dates;

    this.idp1 = new goog.ui.InputDatePicker(formatter, parser);
    this.idp1.decorate(goog.dom.getElement(id1));
    // customize my datepicker:
    this.dp1 = this.idp1.getDatePicker();

    this.dp1.setShowToday(false);
    this.dp1.setAllowNone(false);
    this.dp1.setShowWeekNum(false);
    this.dp1.setShowOtherMonths(false);
    this.dp1.setUseSimpleNavigationMenu(true);
    this.dp1.setUseNarrowWeekdayNames(true);
    //is this faster?:
    /*
    this.idp1.popupDatePicker_.datePicker_.setShowToday(false);
    this.idp1.popupDatePicker_.datePicker_.setAllowNone(false);
    this.idp1.popupDatePicker_.datePicker_.setShowWeekNum(false);
    this.idp1.popupDatePicker_.datePicker_.setShowOtherMonths(false);
    this.idp1.popupDatePicker_.datePicker_.setUseSimpleNavigationMenu(true);
    this.idp1.popupDatePicker_.datePicker_.setUseNarrowWeekdayNames(true);*/

    this.dp1.blocked_dates = this.blocked_dates;
    this.dp1.setDecorator(this.dp1.dateDecorator);
    this.dp1.setDate(initialDate);
 
    this.idp2 = new goog.ui.InputDatePicker(formatter, parser);
    this.idp2.decorate(goog.dom.getElement(id2));
    // customize my datepicker:
    this.dp2 = this.idp2.getDatePicker();
    this.dp2.setShowToday(false);
    this.dp2.setAllowNone(false);
    this.dp2.setShowWeekNum(false);
    this.dp2.setShowOtherMonths(false);
    this.dp2.setUseSimpleNavigationMenu(true);
    this.dp2.setUseNarrowWeekdayNames(true);
    this.dp2.blocked_dates = this.blocked_dates;
    this.dp2.setDecorator(this.dp2.dateDecorator);
    this.dp2.setDate(initialDate);

    goog.events.listen( this.idp1, goog.ui.DatePicker.Events.CHANGE, this.onDateChanged1, false, this);
    //goog.events.listen( goog.dom.getElement(id1), goog.events.EventType.CHANGE, this.onDateChanged1, false, this);

    goog.events.listen( this.idp2, goog.ui.DatePicker.Events.CHANGE, this.onDateChanged2, false, this);
    //goog.events.listen( goog.dom.getElement(id2), goog.events.EventType.CHANGE, this.onDateChanged2, false, this);
};

/**
 * Event handler for changes of the "from-date". 
 * @param {goog.events.Event} e The event object.
 */
moose.picker.prototype.onDateChanged1 = function(e) {
    if (this.idp1.getDate() > this.idp2.getDate()){
        this.idp2.setDate(this.idp1.getDate());
    }

    moose.picker.start = this.idp1.getDate().toString().substr(0, 8);           // can I get this without so many method calls?
    moose.picker.end   = this.idp2.getDate().toString().substr(0, 8);           // can I get this without so many method calls?
};

/**
 * Event handler for changes of the "to-date". 
 * @param {goog.events.Event} e The event object.
 */
moose.picker.prototype.onDateChanged2 = function(e) {
    if (this.idp1.getDate() > this.idp2.getDate()){
        this.idp1.setInputValue(this.idp2.getInputValue());
    }
    moose.picker.start = this.idp1.getDate().toString().substr(0, 8);           // can I get this without so many method calls?
    moose.picker.end   = this.idp2.getDate().toString().substr(0, 8);           // can I get this without so many method calls?
};

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['picker'] = moose.picker; // <-- Constructor
