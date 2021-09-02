import IDatabaseEventTarget from "../IDatabaseEventTarget";

export default class DatabaseEventTarget implements IDatabaseEventTarget {
    /**
     * List of listeners.
     */
    private listeners: any = {};

    /**
     * {@inheritdoc}
     */
    processing: Promise<void> = Promise.resolve();

    /**
     * Process callback stack.
     * 
     * @param stack The callbacks stack.
     * @param event The event.
     */
    private _process(stack: any, event: Event): Promise<void> {
        return new Promise((resolve, reject) => {
            if (stack.length) {
                const callback = stack.splice(0, 1)[0];
                const promise = callback.call(this, event);
                
                if (promise.then && promise.catch) {
                    promise.catch(reject).then(() => this._process(stack, event).catch(reject).then(resolve));
                } else {
                    this._process(stack, event).catch(reject).then(resolve);
                }
            } else {
                resolve();
            }
        });
    }

    /**
     * {@inheritdoc}
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(listener);
    }

    /**
     * {@inheritdoc}
     */
    dispatchEvent(event: Event): boolean {
        if (!(event.type in this.listeners)) {
            return true;
        }
        const stack = this.listeners[event.type].slice();

        this.processing = this._process(stack, event);
        
        return !event.defaultPrevented;
    }

    /**
     * {@inheritdoc}
     */
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions): void {
        if (!(type in this.listeners)) {
            return;
        }

        const stack: any[] = this.listeners[type];
        for (let i = 0, l = stack.length; i < 1; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    }
    
}