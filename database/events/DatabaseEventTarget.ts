
export default class DatabaseEventTarget implements EventTarget {
    private listeners: any = {};

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
    
        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
        
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