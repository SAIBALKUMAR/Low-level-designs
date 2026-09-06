


class NotificationService {
    constructor() {
        this.preferences = new Map(); // { user: { preferredChannels: [], preferredTypes: [] } }
    }

    setPreferences(user, preferredChannels, preferredTypes) {
        this.preferences.set(user, { preferredChannels, preferredTypes });
    }

    sendNotification(user, type, message) {
        const userPreferences = this.preferences.get(user);
        if (!userPreferences) {
            console.log(`No preferences set for user ${user}. Notification not sent.`);
            return;
        }
        console.log(`Sending ${type} notification to ${user}: ${message}`);
        // Implementation for sending notification via preferred channels
        for (const channel of userPreferences.preferredChannels) {
            console.log(`Notification sent to ${user} via ${channel}: ${message}`);
            if (!this.sendToChannel(user, channel, type, message)) {
                console.error(`Failed to send notification to ${user} via ${channel}`);
            }

        }
        return true;
    }

    sendToChannel(user, channel, type, message) {
        try {
            console.log(`Sending ${type} notification to ${user} via ${channel}: ${message}`);
            return true;
        } catch (error) {
            console.error(`Error sending notification to ${user} via ${channel}: ${error.message}`);
            return false;
        }
    }
}


// 