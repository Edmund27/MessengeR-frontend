export const selectUsers = state => (
    state.users.filter(user => user.id !== state.user.id)
)
