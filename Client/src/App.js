import logo from './logo.svg';
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
const url="https://localhost:7088/Customer/customers";
function App() {
  const[data,setData]=useState([]);
  const[Fetching,isFetching]=useState(false);
  const[input,setInput]=useState("");
  const[select,setSelect]=useState("None")
  const sortMethods = {
    country: { method: (a, b) => (a.country.toUpperCase() > b.country.toUpperCase() ? 1 : -1) },
    None:{method:(a, b) => null},
    Id:{method:(a,b)=>(a.customerId>b.customerId ? -1 : 1)},
    companyName:{method:(a,b)=>(a.companyName.toUpperCase()>b.companyName.toUpperCase() ? -1 : 1)},
    contactTitle:{method:(a,b)=>(a.contactTitle.toUpperCase()>b.contactTitle.toUpperCase() ? 1:-1)},
    contactName:{method:(a,b)=>(a.contactName.toUpperCase() > b.contactName.toUpperCase() ? 1 : -1)}
  };
  const fetchTours = async () => {
    try {
      const response = await fetch(url)
      const data=await response.json()
      setData(data)
      console.log(data)
      isFetching(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange=(evt)=>{
    setInput(evt.target.value.toLowerCase())
  }

  const handleSelect=(evt)=>{
    setSelect(evt.target.value);
  }

  const filterData =data.filter(x=>{
    if(input===""){
      return x
    }
    else{
      return (x.companyName.toLowerCase().includes(input)||x.customerId.toLowerCase().includes(input))
    }
  })
  
  

  
  useEffect(() => {
    fetchTours()
  }, [])
  if(Fetching===true){
    const key=Object.keys(data[0]).slice(0,Object.keys(data[0]).length-2)

    return (
  <div>
    <section className='search'>
      <form className="search-container mt-5">
        <input type="text" placeholder="Search.." name="search" value={input} onChange={handleChange} />
      </form>
    </section>
    <section className='sort'>
      <label className='label'>Sort By:</label>
      <select className="btn btn-secondary dropdown-toggle" aria-label="Sort By" onChange={handleSelect}>
              <option value="None" >None</option>
              <option value="Id">Id</option>
              <option value="companyName">companyName</option>
              <option value="contactName">contactName</option>
              <option value="contactTitle">contactTitle</option>
              <option value="country">country</option>
      </select>
    </section>

<section className='nb'>  
<table className="table table-bordered mt-4">
  <thead  className=" border border-dark">
    <tr>
    <th scope="col" >#</th>
      {key.map(x=><th scope="col">{x}</th>)}
    </tr>
  </thead>
  <tbody>
    {filterData.sort(sortMethods[select].method).map((x,id)=>{
      return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{x.customerId}</td>
          <td>{x.companyName}</td>
          <td>{x.contactName}</td>
          <td>{x.contactTitle}</td>
          <td>{x.address}</td>
          <td>{x.city}</td>
          <td>{x.region}</td>
          <td>{x.postalCode}</td>
          <td>{x.country}</td>
          <td>{x.phone}</td>
          <td>{x.fax}</td>
        </tr>
      )
    })}
  </tbody>
</table>
</section>  
      </div>
    
    );
  }
  else{
    return(
      <div>
        <h3>Loading....</h3>
      </div>
    )
  }
  
}


export default App;
