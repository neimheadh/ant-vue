import e from "express";

/**
 * CustomEvent interface class wrapper.
 */
class _CustomEvent<T = any> implements CustomEvent<T> {
    /**
     * The connected event.
     */
    private _event: Event;

    /**
     * Constructor.
     * 
     * @param type Event type.
     * @param detail Custom event details.
     * @param eventInitDict Event initialization.
     */
    constructor(type: string, readonly detail: T, eventInitDict?: EventInit) {
        this._event = new Event(type, eventInitDict);
    }

    /**
     * {@inheritdoc}
     */
    get AT_TARGET(): number {
        return this._event.AT_TARGET;
    }

    /**
     * {@inheritdoc}
     */
    get BUBBLING_PHASE(): number {
        return this._event.BUBBLING_PHASE;
    }

    /**
     * {@inheritdoc}
     */
    get CAPTURING_PHASE(): number {
        return this._event.CAPTURING_PHASE;
    }

    /**
     * {@inheritdoc}
     */
    get NONE(): number {
        return this._event.NONE;
    }

    /**
     * {@inheritdoc}
     */
    get bubbles(): boolean {
        return this._event.bubbles;
    }

    /**
     * {@inheritdoc}
     */
    get cancelBubble(): boolean {
        return this._event.cancelBubble;
    }

    /**
     * {@inheritdoc}
     */
    get cancelable(): boolean {
        return this._event.cancelable;
    }

    /**
     * {@inheritdoc}
     */
    get composed(): boolean {
        return this._event.composed;
    }

    /**
     * {@inheritdoc}
     */
    get currentTarget(): EventTarget | null {
        return this._event.currentTarget;
    }
    
    /**
     * {@inheritdoc}
     */
    get defaultPrevented(): boolean {
        return this._event.defaultPrevented;
    }

    /**
     * {@inheritdoc}
     */
    get eventPhase(): number {
        return this._event.eventPhase;
    }

    /**
     * {@inheritdoc}
     */
    get isTrusted(): boolean {
        return this._event.isTrusted;
    }

    /**
     * {@inheritdoc}
     */
    get returnValue(): boolean {
        return this._event.returnValue;
    }

    /**
     * {@inheritdoc}
     * 
     * @deprecated
     */
    get srcElement(): EventTarget | null {
        return this._event.srcElement;
    }

    /**
     * {@inheritdoc}
     */
    get target(): EventTarget | null {
        return this._event.target;
    }

    /**
     * {@inheritdoc}
     */
    get timeStamp(): number {
        return this._event.timeStamp;
    }

    /**
     * {@inheritdoc}
     */
    get type(): string {
        return this._event.type;
    }

    /**
     * {@inheritdoc}
     */
    initCustomEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, detailArg: any): void {
    }

    /**
     * {@inheritdoc}
     */
    composedPath(): EventTarget[] {
        return this._event.composedPath();
    }

    /**
     * {@inheritdoc}
     */
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {
        this._event.initEvent(type, bubbles, cancelable);
    }

    /**
     * {@inheritdoc}
     */
    preventDefault(): void {
        this._event.preventDefault();
    }

    /**
     * {@inheritdoc}
     */
    stopImmediatePropagation(): void {
        this._event.stopImmediatePropagation();
    }

    /**
     * {@inheritdoc}
     */
    stopPropagation(): void {
        this._event.stopPropagation();
    }

}

export default _CustomEvent;