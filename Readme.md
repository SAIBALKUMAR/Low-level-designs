# Low-Level Design (LLD)

A collection of **Low-Level Design (LLD)** problems, solutions, design patterns, and object-oriented design principles focused on building maintainable, extensible, and production-ready software.

## 📌 Goals

This repository is designed to help me:

* Strengthen **Object-Oriented Design (OOD)** skills
* Understand and apply **SOLID principles**
* Learn and implement common **Design Patterns**
* Practice designing real-world systems at the class/object level
* Improve code readability, extensibility, and maintainability
* Prepare for **LLD / Machine Coding / OOD interviews**

---

## 🧠 Core Concepts

### Object-Oriented Programming

* Classes & Objects`
* Encapsulation
* Abstraction
* Inheritance
* Polymorphism
* Composition vs Inheritance
* Association, Aggregation & Composition
* Interfaces & Abstract Classes

### SOLID Principles

| Principle                     | Description                                                 |
| ----------------------------- | ----------------------------------------------------------- |
| **S — Single Responsibility** | A class should have one reason to change                    |
| **O — Open/Closed**           | Open for extension, closed for modification                 |
| **L — Liskov Substitution**   | Subtypes should be substitutable for their base types       |
| **I — Interface Segregation** | Prefer small, focused interfaces                            |
| **D — Dependency Inversion**  | Depend on abstractions rather than concrete implementations |

---

## 🧩 Design Patterns

### Creational Patterns

* Factory
* Abstract Factory
* Builder
* Singleton
* Prototype

### Structural Patterns

* Adapter
* Decorator
* Facade
* Composite
* Proxy
* Bridge

### Behavioral Patterns

* Strategy
* Observer
* State
* Command
* Template Method
* Chain of Responsibility
* Iterator
* Mediator

---

## 🏗️ LLD Problems

The repository contains implementations of common real-world design problems.

1. Authentication Service
2. Autosuggest Search 
3. BookMyShow 
4. Command Prompt 
5. ExceptionClass
6. In Memory Cache
7. LRU Cache
8. Message Queue
9. Money Splitter
10. Multiple Player Sudoku Game
11. Notification Service
12. Parking Lot
13. Snakes And Ladder
14. Stock Exchange
15. TinyUrl


## 📐 Design Approach

For every LLD problem, follow this process:

### 1. Clarify Requirements

Identify:

* Functional requirements
* Non-functional requirements
* Constraints
* Expected scale
* Actors and use cases

### 2. Identify Core Entities

Convert requirements into:

* Classes
* Interfaces
* Enums
* Value Objects
* Services

### 3. Define Relationships

Determine:

* `has-a`
* `is-a`
* `uses-a`

Prefer **composition over inheritance** when appropriate.

### 4. Define Responsibilities

For every class, answer:

> What is this class responsible for?

Avoid classes that do too much.

### 5. Identify Interfaces

Use interfaces where behavior is expected to vary.

For example:

```text
Payment
├── CreditCardPayment
├── UpiPayment
└── CashPayment
```

### 6. Apply Design Principles

Evaluate the design against:

* SOLID
* DRY
* KISS
* YAGNI
* Separation of Concerns
* Composition over Inheritance

### 7. Identify Design Patterns

Use patterns **only when they solve an actual problem**.

Do not force a design pattern into the solution.

### 8. Handle Extensibility

Ask:

> What is likely to change?

Design those areas behind appropriate abstractions.

### 9. Handle Edge Cases

Consider:

* Invalid input
* Concurrent operations
* State transitions
* Resource exhaustion
* Failure scenarios
* Duplicate operations

### 10. Write Production-Quality Code

Focus on:

* Clear naming
* Small classes/methods
* Proper abstractions
* Error handling
* Testability
* Thread safety where required

---


# 📚 Recommended Learning Order

```text
OOP
 ↓
SOLID
 ↓
UML / Class Diagrams
 ↓
Composition vs Inheritance
 ↓
Design Patterns
 ↓
Simple LLD Problems
 ↓
Complex LLD Problems
 ↓
Concurrency
 ↓
Machine Coding
````

---

# 🚀 Interview Strategy

During an LLD interview:

```text
Requirements
     ↓
Use Cases
     ↓
Entities
     ↓
Relationships
     ↓
Interfaces
     ↓
Class Design
     ↓
Design Patterns
     ↓
Implementation
     ↓
Edge Cases
     ↓
Concurrency
     ↓
Extensions & Trade-offs
```

The goal is **not** to produce the largest design.

The goal is to produce a design that is:

> **Simple → Correct → Extensible → Maintainable → Testable**

---

## ⭐ Key Principles

> **Prefer composition over inheritance.**

> **Program to interfaces, not implementations.**

> **Keep classes focused on a single responsibility.**

> **Use abstractions around things that are likely to change.**

> **Don't over-engineer.**

> **A design pattern is a tool, not a goal.**


## 💡 Philosophy

LLD is less about memorizing class diagrams and more about learning how to **model changing requirements through clean abstractions**.

For every problem, ask:

**What changes?**

**What stays stable?**

**Where should the variation live?**

**How can I make the design easier to extend without breaking existing behavior?**

```

If you're building this specifically for **senior/principal-level interviews**, I'd recommend making the README more rigorous around **concurrency, extensibility, API boundaries, failure handling, observability, and design trade-offs** rather than treating it as a collection of Design Pattern exercises.
```
