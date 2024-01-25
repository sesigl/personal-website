---
title: "Event Sourcing Simplified: Mastering Real-World Event Processing in Your Application"
publishedAt: "2024-02-01"
image: "/images/posts/event-sourcing-simplified.png"
summary: "A guide to processing real-world events in applications, with practical steps, strategies, and real-world examples. Elevate your system's resilience and adaptability."
category: "Tech"
type: "Post"
---

In the digital world, data is the cornerstone of systems. Mastering the handling of real-world
events in applications can significantly elevate both business operations and developer
capabilities.

![Event Sourcing Banner](/images/posts/event-sourcing-simplified.png)


Enter Event Sourcing - an architectural pattern that revolutionizes data management and brings a
multitude of advantages to your applications. If your goal is to develop systems that are resilient,
adaptable, and equipped for the future, delve into this guide.
In this blog post, you will discover:

- The essence of Event Sourcing,
- Practical steps to implement and set up Event Sourcing,
- Strategies to manage complexity and scale using projections,

We begin with the fundamentals of Event Sourcing, gradually progressing to more complex topics.

# The Transformative Power of Event Sourcing

Event Sourcing goes beyond traditional technical concepts; it represents a paradigm shift in how we
manage application state.

Think of Event Sourcing like a video recording of a sports game. Traditional data management is like
a scoreboard, showing only the current score of a game. It tells you the state now, but not how the
game unfolded. Event Sourcing, on the other hand, is like having the entire game recorded. Every
play, every move, every score change is captured. This complete history allows you to understand not
just where the game stands now, but how it got there, offering insights that the scoreboard alone
could never provide.

By storing each change as a distinct event, this approach offers a comprehensive, detailed history
of your data. This diverges from conventional state-centric methods and provides rich historical
insight, equipping you with capabilities beyond the current state of data.

## Why It Matters

In the current dynamic digital landscape, applications must be responsive, resilient, and adept at
managing interconnected processes. Event Sourcing steps up to meet these demands by offering:

1. **Auditability**: A comprehensive history of changes, indispensable for compliance and
   troubleshooting.

2. **Flexibility**: The ability to recreate past states and explore alternative scenarios.

4. **Scalability**: Improved handling of increasing data and user demands, leveraging stream
   processing to scale computing and storage capabilities horizontally.
   By adopting Event Sourcing, developers and businesses are empowered to create systems that are
   not only robust and scalable but also agile enough to adapt to the evolving digital landscape.

# Basics of Event Sourcing

Event Sourcing is based on a few key pillars:

- Central components of Event Sourcing: Command, Entity, and Event.
- Each event is stored in an Event Log.
- Projections are utilized for reading use cases.

- Let’s explore them one by one.

## Central components of Event Sourcing

In Event Sourcing, the architecture revolves around three essential elements: Commands, Entities,
and Events.

![Command Entity Event Relationship](/images/posts/event-sourcing/command_entity_event_infographic.png)

Each plays a vital role in the data lifecycle, so let's examine them individually. While going
through the basic components, we will look at examples for each component, so you see how everything
connects in practice.

### Commands: The Triggers of Change

Commands are the driving force in an Event Sourcing system. They kick-start actions, leading to
changes in the system's state. These changes are clear and deliberate. Commands encapsulate the
action's intent, ensuring the system responds accurately and predictably.

#### Command Example

```json
{
  "commandType": "AddItemToCart",
  "createdAt": "2024-01-05T10:00:00Z",
  "data": {
    "cartId": "CART123",
    "itemId": "ITEM456",
    "quantity": 2
  }
}
```

In the example above, we see a practical representation of a command in the context of event
sourcing, specifically an `AddItemToCartCommand`. This JSON object is a command that instructs the
system to perform a specific action - adding an item to a shopping cart.

- `commandType`: Indicates the type of action to be performed. Here, it's "AddItemToCart", signaling
  that the command is to add an item to a cart.

- `createdAt`: A timestamp marking when the command was created. This is crucial for understanding
  the
  sequence of events, especially in systems where timing and order are significant.

- `data`: This nested object contains the details of the command
  A command leads to the creation of one or more events by being applied to an entity. Let’s look at
  the entity next.

### Entities: The Cornerstones of Your Domain

Entities represent the primary objects or data within your domain. For example, an important entity
in an online shop is an Order, or a Customer. They are the focal points for events. An Order changes
its state when certain events are happening, like an order was shipped. It's vital to maintain their
integrity and consistency, as each entity reflects the total impact of all events on it.

Over time, entities evolve, shaped by the events they experience. This evolution mirrors real-world
changes and decisions within the system's domain.

#### Entity Example

In the following code you see a simple version of a ShoppingCart, which is part of every online
shop. While users look for items, they put items in their shopping cart.

```typescript

class ShoppingCart {
  cartId: string;
  items: Array<Item> = [];
  totalAmount: number = 0;

  constructor(cartId: string) {
    this.cartId = cartId;
  }

  // Method to process AddItemToCartCommand
  processCommand(command: Command): CartEvent {
    if (command.commandType === 'AddItemToCart') {
      return this.addItem(command.data.itemId, command.data.quantity);
    }
    // Other command types can be handled in similar fashion
  }

  // Method to add an item to the cart, which creates an Event
  private addItem(itemId: string, quantity: number): ItemAddedToCartEvent {
    const item = new Item(itemId, quantity);
    this.items.push(item);
    this.totalAmount += item.unitPrice * quantity;
    return new ItemAddedToCartEvent(this.cartId, item);
  }
}

```

The `AddItemToCart` command is a directive that gets processed by the ShoppingCart entity. When this
command is received, the ShoppingCart entity's `processCommand` method is invoked. This method
checks
the type of command and, if it's an `AddItemToCart` command, it calls the `addItem` method.

The `addItem` method in the `ShoppingCart` entity performs two key actions:

1. It adds a new item to the shopping cart, updating the cart's state (items and total amount).
2. It then creates and returns an `ItemAddedToCartEvent`.

This `ItemAddedToCartEvent` is an event that signifies that an item has been successfully added to
the
cart. It captures the resulting change in the state of the `ShoppingCart` entity, adhering to the
principles of event sourcing where state changes are tracked as a series of events. Let’s dive
deeper into events in the next section.

### Events: Chronicles of State Transformations

Events in event sourcing are immutable records that chronicle changes in an entity's state,
triggered by specific commands. They serve as detailed logs, capturing the nature of the change, the
process by which it occurred, and the exact timing. These events are pivotal for constructing a
historical narrative of the entity’s state changes, crucial for tasks such as auditing, debugging,
and understanding system evolution.

#### Event Example

To better understand events, let’s look at some more events of an online shopping cart:

| Event Type          | What it Records                              | Details Captured                                                 |
|---------------------|----------------------------------------------|------------------------------------------------------------------|
| ItemAddedToCart     | Addition of a product to the shopping cart.  | - Product ID<br/>- Quantity added<br/>- Timestamp of the addition |
| ItemRemovedFromCart | Removal of a product from the shopping cart. | - Product ID<br/>- Quantity removed<br/>- Timestamp of the removal |
| ItemQuantityUpdated | Change in the quantity of a specific item.   | - Product ID<br/>- New quantity<br/>- Timestamp of the update      |

These events collectively reconstruct the shopping cart’s state at any given point, offering a
clear, chronological record of its evolution.

In the next section we will learn more about the chronological ordered set of events, the so-called
event log.

## The Event Log: Storing Every Event In Order

To grasp the essence of Event Sourcing, consider another familiar scenario: a bank account. In
banking systems, every transaction is critical, and missing even a single entry is not an option.

Imagine a bank account's transaction history with each transaction (deposit, withdrawal, transfer)
incrementally updating the account balance. Each transaction is an event, and the sequence of these
events forms the account's current balance.

Here’s a simple representation of this concept:

| Event Type  | Version | Payload | Order |
|-------------|---------|---------|-------|
| Transaction | 1       | +10     | 10    |
| Transaction | 2       | -5      | 5     |
| Transaction | 3       | +100    | 105   |

Now, let's apply this concept to our online shop scenario. A user adds items to a basket and
eventually pays for the order. Here's how the events might look in this case:

| Event Type       | Version | Payload             | Order                                                                         |
|------------------|---------|---------------------|-------------------------------------------------------------------------------|
| AddedItem        | 1       | id: 99, quantity: 2 | Items: 99(2)<br/>Total: $40.00<br/>Payment: Pending<br/>Shipping: Pending        |
| RemovedItem      | 2       | id: 99, quantity: 1 | Items: 99(1)<br/>Total: $20.00<br/>Payment: Pending<br/>Shipping: Pending        |
| CheckedOut       | 3       |                     | Items: 99(1), 45(1)<br/>Total: $40.00<br/>Payment: Pending<br/>Shipping: Pending |
| PaymentProcessed | 4       |                     | Items: 99(1), 45(1)<br/>Total: $40.00<br/>Payment: Done<br/>Shipping: Pending    |

Events can vary in type, each applying different changes to an entity. Every change is recorded as
an Event which increments the entity version one by one.

Storing and processing the events provides you flexibility. You can change and extend the processing
of events any time. One key aspect here are so called projects, which we will learn more about in
the next section.

# Building Use-Case Specific Projections

In this section, we'll explore projections in Event Sourcing and how they enable efficient and
optimized read operations. Projections are a crucial component in event-sourced systems, offering
flexible and efficient data presentation for various needs.

![Event Sourcing Components](/images/posts/event-sourcing/event-sourcing-components-infographic.png)

The image above illustrates the relationship between the various elements of Event Sourcing:
commands, entities, events, storage, queries, and projections.

## The Role and Utility of Projections

Think of projections in Event Sourcing as specialized, tailor-made views or states derived from the
event log. They are designed specifically to meet certain read requirements. By creating a clear
distinction between these read models and the write model (which is the event log), your system
benefits greatly in terms of query performance and adaptability.

### Projection Example

To better understand this, let's revisit an e-commerce example and explore how a shopping cart
projection evolves with each event, like adding or updating an item's quantity.
Initially, when a user first visits a shop's page and no events have occurred yet, the projection is
empty:

```json
{
  "cartItems": []
}
```

As soon as the user adds an item to the cart, an 'AddedItem' event is stored:

| Event Type | Payload              |
|------------|----------------------|
| AddedItem  | id:99<br/>quantity: 2 |

To create the projection, this event is processed:

```typescript
function processEvents(events: ShoppingCartEvent[]) {
  const projection = {cartItems: []};

  events.forEach(event => {
    const itemIndex = cartProjection.cartItems.findIndex(item => item.productId === event.productId);

    switch (event.type) {
      case 'AddedItem':
        if (itemIndex === -1) {
          projection.cartItems.push({
            productId: event.productId,
            quantity: event.quantity,
            lastUpdated: event.timestamp,
          });
        } else {
          projection.cartItems[itemIndex].quantity += event.quantity;
          projection.cartItems[itemIndex].lastUpdated = event.timestamp;
        }
        break;

        // more case statements to process other events
    }
  })

  return projection;
}
```

The processEvents function in this code builds a projection of a shopping cart's current state by
processing an array of shopping cart events. It initializes a projection object with an empty
cartItems array. As it iterates through the events, it handles each one based on its type, for now
only the ‘AddedItem’ event.
When we add a second event, 'ItemQuantityUpdated', the event history updates:

| Event Type      | Payload              |
|-----------------|----------------------|
| AddedItem       | id:99<br/>quantity: 2 |
| QuantityUpdated | id:99<br/>quantity: 1 |

The code is accordingly modified to process this new event:

```typescript
function processEvents(events: ShoppingCartEvent[]) {
  const projection = {cartItems: []};

  events.forEach(event => {
    const itemIndex = projection.cartItems.findIndex(item => item.productId === event.productId);

    switch (event.type) {
      case 'AddedItem':
        // Process AddedItem Event 
        // ...

      case 'ItemQuantityUpdated':
        if (itemIndex !== -1) {
          projection.cartItems[itemIndex].quantity = event.newQuantity;
          projection.cartItems[itemIndex].lastUpdated = event.timestamp;
        }
        break;
    }
  });

  return projection;
}
```

Through the processing of each event, the shopping cart's projection is dynamically updated,
providing an accurate, real-time view of its contents. This system is efficient and adaptable,
ensuring the current state of the cart is always reflective of the processed sequence of events. The
projection, in this way, evolves with the customer's interactions, exemplifying the flexibility and
power of event sourcing in e-commerce scenarios.

## Processing Events into Projections

Selecting the right consistency model in Event Sourcing is crucial because it affects how your system updates and shows data after an event, like a user action.

Think of it as choosing how quickly a scoreboard updates during a game. Immediate consistency is like updating the score the moment a goal is scored, or eventual consistent, means update the scoreboard every few minutes. It's less immediate, but it keeps things running smoothly even when the game gets busy. Let’s look into the topic of consistency in the next section.

### Choosing the Right Consistency Model

A consistency model determines how current your projections are in relation to the events:

1. **Immediate Consistency**: This model updates projections synchronously, usually in memory, with each event. It ensures that your views are always current but can lead to performance trade-offs due to the additional processing required.
2. **Eventual Consistency**: Often preferred in Event Sourcing, this model allows for a delay between an event happening and its update in the projection. Stream processing tools like Kafka are used to decouple storing events from processing events. It's a balance between having fresh data and maintaining system performance.

These decisions should align with your application’s requirements for data freshness, performance, and complexity of read operations. The choice of database for storing projections is particularly important, as it should be optimized for the expected types of queries.

# Conclusion

Event Sourcing is more than a mere technical choice; it represents a significant shift in data handling and perception, a paradigm that has been successfully employed for decades in sectors like banking.

By adopting Event Sourcing, we gain numerous advantages like robustness and flexibility.

However, it's crucial to assess whether Event Sourcing aligns with your objectives and constraints. Consider the following:

- Alignment with Project Goals: Ensure that the benefits of Event Sourcing meet your specific project needs.
- Technical and Operational Fit: Evaluate if your team and infrastructure can support the complexities of an event-sourced system.

As technology evolves, the principles of Event Sourcing continue to be relevant and potent. By integrating this pattern into your systems, you prepare your projects not just for current demands but also for future challenges and advancements.
