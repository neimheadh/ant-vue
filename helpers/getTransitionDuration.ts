/**
 * Get the transition duration for the given element transition property.
 * 
 * @param elt The element.
 * @param property The transition property.
 * 
 * @returns The transition duration in milliseconds, if defined. 
 */
export default (elt: HTMLElement, property: string = 'all'): number  => {
    const styles = getComputedStyle(elt);
    const {transitionProperty, transitionDuration} = styles;
    const properties = transitionProperty.split(',').map(str => str.trim());
    const durations = transitionDuration.split(',').map(str => str.trim());
    let duration_all: number | undefined = undefined;

    for (const p in properties) {
        if (durations[p] !== undefined && (properties[p] === property || properties[p] === 'all')) {
            const _duration = durations[p];
            let match, duration;

            if (match = /([0-9\.]+)\s*s/.exec(_duration)) {
                duration = parseFloat(match[1]) * 1000;
            } else if (match = /([0-9\.]+)\s*ms/.exec(_duration)) {
                duration = parseFloat(match[1]);
            } else {
                duration = parseFloat(_duration);
            }

            if (properties[p] === property) {
                return duration;
            }

            duration_all = duration;
        }
    }

    if (duration_all !== undefined) {
        return duration_all;
    }

    return 0;
};