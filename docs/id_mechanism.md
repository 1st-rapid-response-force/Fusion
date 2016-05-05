# Fusion IDs

Fusion IDs are the primary mechanic of distinct replication of item location to the datastore.

They work via the following set of constraints:

1. Each Fusion ID is a UUID v4 generated by a securely seeded server
2. No two objects in the space will share a Fusion ID
3. Any object that is expected to be part of network replication will use a Fusion ID

To implement Fusion IDs in game the SQF should use the following lifecycle.

**When building the map in the editor**

Add a Fusion ID variable to every item placed on the map that should undergo network replication.

**At map start**

Iterate over every item in the mission. If the item has a Fusion ID set on it, retrieve the state of the item and apply it to the item. Examples include moving a crate to the right location or updating its inventory. All items replicated at this stage should have their IDs stored for the next step.

Once preplaced items have been replicated from the datastore, the server should ask Fusion for the full item list and also provide the exclusion list as any item that has already undergone replication.

Fusion will return an array of Fusion IDs alongside their class type, location and inventory. These items should be spawned, moved and have their inventory restored. In the event that the object is a vehicle it should request vehicle repair statuses and in the event that the object is an enemy AI then it should request waypoint, health and equipment.