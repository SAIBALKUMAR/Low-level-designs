
const  LockerSize = {
    SMALL: 0,
    MEDIUM: 1,
    LARGE: 2,
    EXTRA_LARGE: 3
}

const LockerState = {
    AVAILABLE: "AVAILABLE",
    RESERVED: "RESERVED",
    OCCUPIED: "OCCUPIED",
    CLOSED: "CLOSED"
}

class Package {
    constructor(id, size) {
        this.id = id;
        this.size = size;
    }
}


class Locker {
    constructor(id, size) {
        this.id = id;
        this.size = size;
        this.state = LockerState.AVAILABLE;
        this.isLocked = false;
    }

    reserve() {
        if (!this.isLocked && this.state === LockerState.AVAILABLE) {
            this.isLocked = true;
            try {
                this.state = LockerState.RESERVED;
                return true;
            } finally {
                this.isLocked = false;
            }
        }
        return false;
    }
    pickup() {
        // }
    }
    dropOff() {
        //
    }
}


class LockerSystem {
    constructor(lockers) {
        this.lockers = lockers;
    }

    assignLocker(package) {
        const validLockers = this.lockers.filter(locker => locker.size >= package.size && locker.state === LockerState.AVAILABLE)
            .sort((a, b) => a.size - b.size);
        for (const locker of validLockers) {
            if (locker.reserve()) {
                return locker;
            }
        }
        throw new Error("No available locker found for the package size.");
    }
}