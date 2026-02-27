export default function UsersIndex({ fetchUsers }) {
    return (
        <ul>
            {fetchUsers.map(u => (
                <div key={u.id}>
                    <h2>{u.name}</h2>
                    <p>Role: {u.role}</p>
                    <p>Username: {u.username}</p>
                    <p>Password: {u.password}</p>
                    <hr />
                </div>
            ))}
        </ul>
    )
}