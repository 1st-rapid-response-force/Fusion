/*
    The AnalyticsService provides handlers for analytics events to submit to Segment
 */

var AnalyticsLibrary = require( 'analytics-node' ),
    Analytics = new AnalyticsLibrary( process.env.SEGMENT_KEY )

function RRFAnalytics () {

}

RRFAnalytics.prototype.requestedLoadout(uuid) {

    Analytics.track({
        userId: uuid,
        event: "Requested Loadout"
    })

}

module.exports = new RRFAnalytics()