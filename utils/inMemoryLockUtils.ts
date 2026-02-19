class inMemoryLockClass {
    private locks = new Map<string, Promise<void>>();

    async acquire(key : string) : Promise<() => void> {
        let releasePrevious = this.locks.get(key);
        let release! : () => void;
        const currentLock = new Promise<void>((resolve) => {
            release = resolve;
        });

        this.locks.set(key, currentLock);

        if(releasePrevious) {
            await releasePrevious;
        }

        return () => {
            release();
            if(this.locks.get(key) == currentLock) {
                this.locks.delete(key);
            }
        }
    }
}

export { inMemoryLockClass }