$.ready(() => {
    let app = $.query('#app');

    app.addEventListener('click', evt => {
        let el = evt.target;

        if (el.matches('button[data-cmd]')) {
            Notification.requestPermission().then(permission => {
                if (permission == 'granted') {        
                    $.post('https://ntfy.sh/8columns', 'Just add your desired image size (width & height) after our URL, and you\'ll get a random image.', {
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

    const eventSource = new EventSource('https://ntfy.sh/8columns/sse');

    eventSource.onmessage = evt => {
        // console.log(evt.data);
    
        if (typeof evt?.data == 'string') {
            let node = JSON.parse(evt.data);
            
            let options = {
                body: node.message
            }
    
            if (node.attachment) {
                options.image = node.attachment.url
            }
    
            console.log(node);
            console.log(options);
    
            new Notification(node.title, options);
        }
    }
})

