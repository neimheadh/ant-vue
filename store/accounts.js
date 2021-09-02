import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
    list: [],
});

export const mutations = {
    add(state, { name }) {
        const uuid = uuidv4();

        state.list.push({
            uuid,
            name,
        });
    },
    remove(state, { uuid }) {
        const i = state.list.findIndex((account) => account.uuid === uuid);

        if (i >= 0) {
            state.list.splice(i, 1);
        }
    },
}
