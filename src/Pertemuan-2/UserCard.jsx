function UserCard(props){
  return(
    <div>
      <p>{props.nama}</p>
      <p>NIM : {props.nim}</p>
      <p>Email : {props.email}</p>
    </div>
  )
}

export default UserCard