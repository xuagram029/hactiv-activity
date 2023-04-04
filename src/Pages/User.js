import { useSelector } from "react-redux"

const User = () => {
    const user = useSelector(state => state.user.value)
    const color = useSelector(state => state.theme.value)

  return (
    <div style={{color: color}}>
        <h1>PROFILE PAGE</h1>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Gender:{user.gender} </p>
    </div>
  )
}

export default User