

const taskStatus = {
    PENDING: 'PENDING',
    RUNNING: 'RUNNING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
}

class Task {
    constructor(id) {
        this.id = id;
        this.status = taskStatus.PENDING;
    }

    async execute() {
        throw new Error('Execute method must be implemented by subclasses');
    }
}

class APITask extends Task {
    constructor(id, apiEndpoint) {
        super(id);
        this.apiEndpoint = apiEndpoint;
    }

    async execute() {
        // Implementation for API task execution
        console.log(`Executing API task ${this.id} at endpoint ${this.apiEndpoint}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay
        context[this.id] = { result: `Response from ${this.apiEndpoint}` }; // Store result in context
    }
}


class Workflow {
    constructor() {
        this.tasks = new Map();
        this.adjacencyList = new Map();
        this.inDegree = new Map();
    }

    addTask(task) {
        this.tasks.set(task.id, task);
        this.adjacencyList.set(task.id, []);
        this.inDegree.set(task.id, 0);
    }

    addDependency(taskId, dependencyId) {
        if (!this.tasks.has(taskId) || !this.tasks.has(dependencyId)) {
            throw new Error('Both tasks must be added to the workflow before adding a dependency');
        }
        this.adjacencyList.get(dependencyId).push(taskId);
        this.inDegree.set(taskId, this.inDegree.get(taskId) + 1);
    }
}

class WorkflowExecutor {
    async run(workflow, initialContext = {}) {
        const context = { ...initialContext };
        const queue = [];

        for (const [taskId, degree] of workflow.inDegree.entries()) {
            if (degree === 0) {
                queue.push(taskId);
            }
        }

        const executeTask = async (taskId) => {
            const task = workflow.tasks.get(taskId);
            task.status = taskStatus.RUNNING;
            try {
                await task.execute(context);
                task.status = taskStatus.COMPLETED;
                const dependents = workflow.adjacencyList.get(taskId);
                for (const dependentId of dependents) {
                    workflow.inDegree.set(dependentId, workflow.inDegree.get(dependentId) - 1);
                    if (workflow.inDegree.get(dependentId) === 0) {
                        queue.push(dependentId);
                    }
                }
            } catch (error) {
                task.status = taskStatus.FAILED;
                console.error(`Task ${taskId} failed:`, error);
                throw error;
            }
        };

        await Promise.all(queue.map(executeTask));
        return context;
    }
}