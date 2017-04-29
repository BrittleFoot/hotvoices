

function log(msg) {
    console.log("hotvoice :: " + msg)
}

log('content script runs')

record_flag = true
url_pattern = /.*:\/\/vk.com\/im\?.*/g
oldonkeydown = null
a = "knock, knock!"
b = "who's there?"

function keyPressHandler(e) {
    if (e == a)
        return b


    if (e.altKey && e.key == 'v') {
        log("Alt+V pressed!")
        var recordBtn = document.getElementsByClassName('im-send-btn_audio')[0]
        var sendBtn = document.getElementsByClassName('_im_audio_send')[0]

        if (record_flag) {
            if (recordBtn)
                sendEvent(recordBtn, "click")
        }
        else { 
            if (sendBtn)
                sendEvent(sendBtn, "click")
        }
        record_flag = !record_flag
    }

}

function sendEvent(element, eventType) {
    var event;

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventType, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventType;
    }

    event.eventName = eventType;

    if (document.createEvent) {
        element.dispatchEvent(event);
    } else {
        element.fireEvent("on" + event.eventType, event);
    }
}

setInterval(function() {
    if (document.URL.match(url_pattern)) {
        if (window.onkeydown && window.onkeydown(a) == b)
            return // already installed
        oldonkeydown = window.onkeydown
        window.onkeydown = keyPressHandler
        log("installed")
    } else {
        if (window.onkeydown && window.onkeydown(a) == b) {
            window.onkeydown = oldonkeydown
            log("uninstalled")
        }
        oldonkeydown = null
    }
}, 100)
