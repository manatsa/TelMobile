$.widget( "ui.tabs", $.ui.tabs, {

    _createWidget: function( options, element ) {
        var page, delayedCreate,
            that = this;

        if ( $.mobile.page ) {
            page = $( element )
                .parents( ":jqmData(role='page'),:mobile-page" )
                .first();

            if ( page.length > 0 && !page.hasClass( "ui-page-active" ) ) {
                delayedCreate = this._super;
                page.one( "pagebeforeshow", function() {
                    delayedCreate.call( that, options, element );
                });
            }
        } else {
            return this._super();
        }
    }
});