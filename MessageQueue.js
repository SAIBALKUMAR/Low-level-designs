

class MessageQueue {
    constructor() {
        this.queue = [];
        this.processing = new Set();
    }

    publish(message) {
        this.queue.push(message);
        console.log(`Message enqueued: ${message}`);
    }


    consume(handler) {
        if (this.queue.length === 0) {
            console.log("Queue is empty. No message to consume.");
            return;
        }
        try {
            const message = this.queue.shift();
            this.processing.add(message);
            handler(message);
            this.processing.delete(message);
        } catch (error) {
            console.error("Error while consuming message:", error.message);
            this.queue.unshift(message); // Re-enqueue the message for retry
        }
    }
}


const messageQueue = new MessageQueue();
messageQueue.publish("Message 1");
messageQueue.publish("Message 2");
messageQueue.consume((message) => {
    console.log(`Processing: ${message}`);
    if (message === "Message 1") {
        throw new Error("Simulated processing error for Message 1");
    }
    console.log(`Completed processing: ${message}`);
});