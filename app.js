$.ready(() => {
    let app = $.query('#app');
    const topic = '1729183231';

    app.addEventListener('click', evt => {
        let el = evt.target;

        if (el.matches('button[data-cmd]')) {
            Notification.requestPermission().then(permission => {
                if (permission == 'granted') {        
                    $.post('https://ntfy.sh/' + topic, 'Just add your desired image size (width & height) after our URL, and you\'ll get a random image.', {
                        "content-type": "text/plain",
                        "Title": "Easy to use, stylish placeholders",
                        "Priority": "default",
                        "Tags": "incoming_envelope",
                        "Attach":"https://picsum.photos/300/200"
                    })        
                } else {
                    alert('Notfication permission not allowed!');
                }
            })
        }
    })

    const eventSource = new EventSource('https://ntfy.sh/' + topic + '/sse');

    eventSource.onmessage = evt => {    
        if (typeof evt?.data == 'string') {
            let node = JSON.parse(evt.data);
            
            let options = {
                body: node.message
            }
    
            if (node.attachment) {
                options.image = node.attachment.url
            }
        
            new Notification(node.title, options);
        }
    }
})

