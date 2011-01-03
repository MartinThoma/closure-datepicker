/**
 * @fileoverview Input Date Picker implementation.  Pairs a
 * goog.ui.PopupDatePicker with an input element and handles the input from
 * either. Should be used if two dates (from ... to ...) are to be handled
 */

goog.provide('moose.picker');

goog.require('goog.ui.InputDatePicker');

/*
 * This function returns the css class for a date
 * @param {goog.date.Date} date Any date which should get a css class
 * @return {string} The css class name
 */
goog.ui.DatePicker.prototype.dateDecorator = function (date) {
        for(var i=0;i<this.blocked_dates.length;i++){
            if(goog.string.contains(this.blocked_dates[i], ':')){
                var rangedBlockDate = this.blocked_dates[i].split(':');
                startDate = goog.date.fromIsoString(rangedBlockDate[0]);
                endDate   = goog.date.fromIsoString(rangedBlockDate[1]);
                if(startDate <= date){
                    if(endDate >= date){
                        return 'goog-date-picker-blocked'; 
                    }
                }
            } else {
                if( goog.array.contains(this.blocked_dates,date.toIsoString(true) ) ) {
                    return 'goog-date-picker-blocked';                                  // special CSS class name for cells with blocked dates
                }
            }
        }
        if(date.toIsoString(true) == this.start){return 'goog-date-picker-selected';}
        if(date.toIsoString(true) == this.end)  {return 'goog-date-picker-selected';}
};

/*
 * Input date picker widget for to dates (from ... to ...)
 * @param {string} id1 The html-id of the first input element
 * @param {string} id2 The html-id of the second input element
 * @param {Array} blocked_dates Dates which can't be selected
 * @param {number} padding How many days should be between from and to?
 * @constructor
 */
moose.picker = function(id1, id2, blocked_dates, padding) {
    var PATTERN = "dd'.'MM'.'yyyy";                                             // in which format should the date be displayed? e.g.= "MM'/'dd'/'yyyy"
    var formatter = new goog.i18n.DateTimeFormat(PATTERN);
    var parser    = new goog.i18n.DateTimeParse(PATTERN);

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
    this.dp1.setUseNarrowWeekdayNames(true);
    this.dp1.blocked_dates = this.blocked_dates;
    this.dp1.setDecorator(this.dp1.dateDecorator);
    this.dp1.setDate(initialDate);
    this.dp1.start = initialDate;
    this.dp1.end   = initialDate;
 
    this.idp2 = new goog.ui.InputDatePicker(formatter, parser);
    this.idp2.decorate(goog.dom.getElement(id2));
    // customize my datepicker:
    this.dp2 = this.idp2.getDatePicker();
    this.dp2.setShowToday(false);
    this.dp2.setAllowNone(false);
    this.dp2.setShowWeekNum(false);
    this.dp2.setUseNarrowWeekdayNames(true);
    this.dp2.blocked_dates = this.blocked_dates;
    this.dp2.setDecorator(this.dp2.dateDecorator);
    this.dp2.setDate(initialDate);
    this.dp2.start = initialDate;
    this.dp2.end   = initialDate;

    goog.events.listen( this.idp1, goog.ui.DatePicker.Events.CHANGE, this.onDateChanged1, false, this);
    goog.events.listen( goog.dom.getElement(id1), goog.events.EventType.CHANGE, this.onDateChanged1, false, this);

    goog.events.listen( this.idp2, goog.ui.DatePicker.Events.CHANGE, this.onDateChanged2, false, this);
    goog.events.listen( goog.dom.getElement(id2), goog.events.EventType.CHANGE, this.onDateChanged2, false, this);
};

/**
 * Event handler for changes of the "from-date". 
 * @param {goog.events.Event} e The event object.
 */
moose.picker.prototype.onDateChanged1 = function(e) {
    if (this.idp1.getDate() > this.idp2.getDate()){
        this.idp2.setDate(this.idp1.getDate());
    }
    this.dp1.start = this.idp1.getDatePicker().getDate().toIsoString(true);
    this.dp1.end   = this.idp2.getDatePicker().getDate().toIsoString(true);
    this.dp2.start = this.idp1.getDatePicker().getDate().toIsoString(true);
    this.dp2.end   = this.idp2.getDatePicker().getDate().toIsoString(true);
};

/**
 * Event handler for changes of the "to-date". 
 * @param {goog.events.Event} e The event object.
 */
moose.picker.prototype.onDateChanged2 = function(e) {
    if (this.idp1.getDate() > this.idp2.getDate()){
        this.idp1.setInputValue(this.idp2.getInputValue());
    }
    this.dp1.start = this.idp1.getDatePicker().getDate().toIsoString(true);
    this.dp1.end   = this.idp2.getDatePicker().getDate().toIsoString(true);
    this.dp2.start = this.idp1.getDatePicker().getDate().toIsoString(true);
    this.dp2.end   = this.idp2.getDatePicker().getDate().toIsoString(true);
    return false;
};

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['picker'] = moose.picker; // <-- Constructor
