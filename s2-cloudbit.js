(function(ext) {
    /*
        Hi! Thanks for checking out my extension.

        I don't actually have a cloudBit to test on, so any feedback is greatly appreciated.

        Thanks! :)
    */

    //Initial setup
    var token = String(prompt("Please enter your Authentication token:")); //this is a nasty solution, and I'd love to figure out how to authenticate IFTTT-style
    var id = String(prompt("Please enter the ID of the cloudBit you want to control:")); //similarly nasty UI-wise, but I'm not sure how to fix that

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};



    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.output = function(num, dur, callback) {
        $.ajax({
      url:"https://api-http.littlebitscloud.cc/devices/" + id + "/output",
      type:"POST",
      headers: { 
        "Authorization" : "Bearer" + token,
        "Accept" : "application/vnd.littlebits.v2+json"
      },
      data:{percent: num, duration_ms: String(parseFloat(dur) * 1000)},
      dataType:"json"
    })
        .done(function() {
            callback();
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'output %n percent power for %n seconds', 'output', '100', '5'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('cloudBit', descriptor, ext);
})({});