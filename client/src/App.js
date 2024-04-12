import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {

  const [users, setUsers] = useState([])
  const [username, setUserName] = useState('')
  const [age, setAge] = useState(0)


  const {data, loading, error} = useQuery(GET_ALL_USERS)
  const {data: dataOneUser, loading: loadingOneUser, error: errorOneUser} = useQuery(GET_ONE_USER,
    {
      variables: {
        id: 1
      }
    })
  console.log(dataOneUser)
  const [newUser] = useMutation(CREATE_USER)

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {username, age: Number(age)}
      }
    }).then(({data}) => {
      console.log(data)
      setUserName('')
      setAge(0)
    })
  }

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])


  return (
    <div className='app'>
      <h1>GraphQL</h1>
      <form>
        <input value={username} type="text" placeholder='Имя'
               onChange={(e) => setUserName(e.target.value)}/>
        <input value={age} type="number" placeholder='Телефон'
               onChange={(e) => setAge(e.target.value)}/>
        <div className='form_btns'>
          <button>Получить</button>
          <button onClick={(e) => addUser(e)}>Создать</button>
        </div>
      </form>
      {
        users.map(user => (
          <div className='user'>{user.id}. {user.username} {user.age}</div>
        ))
      }
    </div>
  );
}

export default App;
