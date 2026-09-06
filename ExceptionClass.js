
class ExceptionHandler {
    static instance = null;

    constructor() {
        if (ExceptionHandler.instance) {
            return ExceptionHandler.instance;
        }
        ExceptionHandler.instance = this;
    }

    handleException(error) {
        console.error("An error occurred:", error.message);
        // Additional logging or error handling logic can be added here
    }

    throwError(message) {
        throw new Error(message);
    }

    throwValidationError(message) {
        throw new Error(`Validation Error: ${message}`);
    }
}

let handler = new ExceptionHandler();
try {
    handler.throwError("This is a general error.");
} catch (error) {
    handler.handleException(error);
}
