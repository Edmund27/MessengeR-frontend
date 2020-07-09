export const selectUsers = state => (
    state.users.filter(user => user.id !== state.user.id)
)

export const selectUserByName = (state, username) => (
    state.users.find(user => user.name == username)
)
