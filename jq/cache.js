//CACHE

var selectors = new Selector_Cache();


function Selector_Cache() {

    var collection = {};
    
    function get_from_cache( selector ) {

        if ( undefined === collection[ selector ] ) {
        collection[ selector ] = $( selector );
        }
        
        return collection[ selector ];

    }
    
    return { get: get_from_cache };
}