import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";

class AppEventTarget implements EventTarget {
    listeners: any = {};
    
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

        for (const callback of stack) {
            callback.call(this, event);
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
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    }
}

export default (ctx: Context, inject: Inject) => {
    return inject('events', new AppEventTarget());
}