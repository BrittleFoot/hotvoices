
record_flag = true
window.onkeydown = function (e) {

    var recordBtn = document.getElementsByClassName('im-send-btn_audio')[0]
    var sendBtn = document.getElementsByClassName('_im_audio_send')[0]

    if (e.altKey && e.key == 'v') {
        if (record_flag) {
            if (recordBtn != undefined)
                sendEvent(recordBtn, "click")
        }
        else { 
            if (sendBtn != undefined)
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