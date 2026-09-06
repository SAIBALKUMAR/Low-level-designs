
let parkingLot = (() => {
    let instance;
    
    class ParkingLot {
        constructor(totalSlots, gates) {
            this.totalSlots = totalSlots;
            this.gates = gates;
            this.availableSlots = totalSlots;
            this.parkedVehicles = new Map();
            this.nextSlot = 0;
        }

        parkVehicle(vehicle) {
            if (this.availableSlots <= 0) {
                return `Parking lot is full. Cannot park vehicle ${vehicle}.`;
            }
            this.availableSlots--;
            this.parkedVehicles.set(vehicle, this.nextSlot);
            this.nextSlot++;
            return `Vehicle ${vehicle} parked at slot ${this.nextSlot - 1}.`;
        }

        removeVehicle(vehicle) {
            if (!this.parkedVehicles.has(vehicle)) {
                return `Vehicle ${vehicle} is not parked in the lot.`;
            }
            this.availableSlots++;
            this.parkedVehicles.delete(vehicle);
            return `Vehicle ${vehicle} has left the parking lot.`;
        }

        getAvailableSlots() {
            return this.availableSlots;
        }
    }

    return {
        getInstance: (totalSlots, gates) => {
            if (!instance) {
                instance = new ParkingLot(totalSlots, gates);
            }
            return instance;
        }
    };
})();

let lot = parkingLot.getInstance(10, [{entry: true, exit: true}]);

console.log(lot.parkVehicle("Car1")); // Vehicle Car1 parked at slot 0.
console.log(lot.parkVehicle("Car2"));
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeVehicle("Car1")); 
console.log(lot.getAvailableSlots()); // 9
console.log(lot.parkVehicle("Car3")); // Vehicle Car3 parked at slot 1.


