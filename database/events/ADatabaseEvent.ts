import IDatabaseEvent from "../IDatabaseEvent";
import IDatabaseManager from "../IDatabaseManager";

export interface IDatabaseEventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    defaultPrevented?: boolean;
}

export default abstract class ADatabaseEvent implements IDatabaseEvent {
    private event: Event;

    constructor(public type: string, readonly manager: IDatabaseManager, init?: EventInit) {
        this.event = new Event(type, init);
    }

    get bubbles(): boolean {
        return this.event.bubbles;
    }
    
    get cancelBubble(): boolean {
        return this.event.cancelBubble;
    }

    get cancelable(): boolean {
        return this.event.cancelable;
    }

    get composed(): boolean {
        return this.event.composed;
    }

    get currentTarget(): EventTarget | null {
        return this.event.currentTarget;
    }

    get defaultPrevented(): boolean {
        return this.event.defaultPrevented;
    }

    get eventPhase(): number {
        return this.event.eventPhase;
    }

    get isTrusted(): boolean {
        return this.event.isTrusted;
    }

    get returnValue(): boolean {
        return this.event.returnValue;
    }

    get srcElement(): EventTarget | null {
        return this.event.srcElement;
    }

    get target(): EventTarget | null {
        return this.event.target;
    }

    get timeStamp(): number {
        return this.event.timeStamp;
    }
    
    set cancelBubble(value: boolean) {
        this.event.cancelBubble = value;
    }

    set returnValue(value: boolean) {
        this.event.returnValue = value;
    }

    composedPath(): EventTarget[] {
        return this.event.composedPath();
    }

    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {
        this.event.initEvent(type, bubbles, cancelable);
    }

    preventDefault(): void {
        this.event.preventDefault();
    }

    stopImmediatePropagation(): void {
        this.event.stopImmediatePropagation();
    }

    stopPropagation(): void {
        this.event.stopPropagation();
    }

    AT_TARGET: number = Event.AT_TARGET;
    BUBBLING_PHASE: number = Event.BUBBLING_PHASE;
    CAPTURING_PHASE: number = Event.CAPTURING_PHASE;
    NONE: number = Event.NONE;
    
}