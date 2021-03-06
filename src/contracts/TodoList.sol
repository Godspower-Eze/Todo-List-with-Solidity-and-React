pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated(
    uint id,
    string content,
    bool completed
    );

    mapping (uint => Task) public tasks;

    constructor () public {
        createTasks("First task on my list");
    }

    function createTasks (string memory _content) public {
        require(bytes(_content).length > 0);
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }
}