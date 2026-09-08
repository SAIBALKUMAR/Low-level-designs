

class Tool {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    async execute(input) {
        throw new Error("execute() must be implemented");
    }
}

class WeatherTool extends Tool {
    constructor() {
        super("Weather Tool", "Fetches current weather for a location");
    }

    async execute(location) {
        return "The weather in New Delhi is 34 C and sunny"
    }
}

class MiddlewarePipeline {
    constructor() {
        this.middlewares = [];
    }

    use(middlewareFunc) {
        this.middlewares.push(middlewareFunc)
    }

    async process(prompt) {
        let currentPrompt = prompt;
        for (const mw of this.middlewares) {
            currentPrompt = await mw(currentPrompt);
        }
        return currentPrompt;
    }
}

const piiRedactor = async (prompt) => {
    return prompt.replace('%@kaj;df', "[REDACTED_EMAIL]")
}

class AgentOrchestrator {
    constructor(llmClient, maxIterations = 5) {
        this.llmClient = llmClient;
        this.maxIterations = maxIterations;
        this.toolRegistry = new Map()
        this.pipeline = new MiddlewarePipeline()
    }

    registerTool(tool) {
        this.toolRegistry.set(tool.name, tool)
    }

    async run(userQuery) {
        let history = [];
        let iteration = 0;

        let safeQuery = await this.pipeline.process(userQuery);

        history.push({ role: "user", content: safeQuery })
        while (iteration < this.maxIterations) {
            iteration++;

            const llmResponse = await this.llmClient.generate(history);

            if (llmResponse.action == "USE_TOOL") {
                const tool = this.toolRegistry.get(llmResponse.toolname);
                if (!tool) throw new Error(`Tool ${llmResponse.toolName} not found`)

                const toolResult = await tool.execute(llmResponse.toolName);
                history.push({ role: "assistant", content: `Used tool: ${tool.name}`});
                history.push({ role: 'system', content: `Tool Result: ${toolResult}`})
            } else if (llmResponse.action == "FINAL_ANSWER") {
                return llmResponse.content;
            }
        }

        return "I'm sorry. I couldn't determine the answer within the allowed steps."
    }
}
