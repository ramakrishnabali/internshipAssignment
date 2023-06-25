import {useState,useEffect} from "react"

import "./App.css"

const App = ()=>{
  const [book,setBook] = useState("")
  const [bookList,setBookList] = useState([])

  useEffect(()=>{

    const getBookList = async()=>{
      const bookApi = "https://reqres.in/api/users?page=2"

      const options = {
        method:"GET"
      }
      const response = await fetch(bookApi, options)
      if (response.ok === true){
        const data = await response.json()
        
        const updatedData = data.data.map(book =>({
          avatar:book.avatar,
          email:book.email,
          id:book.id,
          firstName:book.first_name,
          lastName:book.last_name
        }))
        setBookList(updatedData)
      }
    }

    getBookList()
  },[])

  const getList = (event)=>{
    setBook(event.target.value)
  }

  const filteredList = bookList.filter(each =>(
    each.firstName.toLocaleLowerCase().includes(book.toLocaleLowerCase())
  ))

  return(

    <div className="app-container">
      <input value={book} onChange={getList} type="text" placeholder="SearchByFirstNmae" />
      <ul className="list-container">
        {filteredList.map(eachBook =>(
          <li className="list" key={eachBook.id}>
            <div className="id-container"><p>{eachBook.id}</p></div>
            <img className="avatar" src={eachBook.avatar} alt={`${eachBook.firstName}`} />
            <p className="name">FirstName: {eachBook.firstName}</p>
            <p className="name">LastName: {eachBook.lastName}</p>
            <p className="name">Email: {eachBook.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default App;