import React, {useState, useEffect} from "react";
import './employee.css';

const Employee = ()=>{

    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState("");
    const [employees, setEmployees] = useState([]);


  
    useEffect(()=>{
        getEmployees();
    },[]);

    const getEmployees = () =>{
        fetch(`http://localhost:3001/employee`)
        .then((res)=> res.json())
        .then((res)=> setEmployees(res))
        .then((err)=> console.log(err));
    }

    const showAll = ()=>{
        getEmployees();
    }


    const show = (dept)=>{
        fetch(`http://localhost:3001/employee?dept=${dept}`)
        .then((res)=> res.json())
        .then((res)=> setEmployees(res))
        .then((err)=> console.log(err));
    }

    const handleAdd = ()=>{
        const payload = {
            name : name,
            dept : dept,
            gender: gender,
            role: role,
            salary: salary,
            status : false,
        }

        const payloadJson = JSON.stringify(payload);

        fetch(`http://localhost:3001/employee`,{
            method: "POST",
            body: payloadJson,
            headers :{
                "content-type" : "application/json"
            }
        }).then((res)=>{
            console.log(res);
            getEmployees();
        })
    }
    console.log(showAll);


    return (
        <div className="main">
            <span>Name :</span>
            <input placeholder="Type Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <br />
            <span>Department :</span>
            <input placeholder="Type Department" value={dept} onChange={(e)=>setDept(e.target.value)} />
            <br />
            <span>Gender :</span>
            <input placeholder="Type Gender" value={gender} onChange={(e)=>setGender(e.target.value)} />
            <br />
            <span>Role :</span>
            <input placeholder="Type Role" value={role} onChange={(e)=>setRole(e.target.value)} />
            <br />
            <span>Salary :</span>
            <input placeholder="Type Salary" value={salary} onChange={(e)=>setSalary(e.target.value)} />
            <br />
            <button onClick={handleAdd}> Save</button>
            <br />
            <button onClick={showAll} >Show All Departments</button>
            <button onClick={()=> show("Marketing")}>Show Marketing</button>
            <button  onClick={()=> show("HR")}>Show HR</button>
            <button  onClick={()=> show("IT")}>Show IT</button>
            <button  onClick={()=> show("Finance")}>Show Finance</button>
            <br />
            <button>Sort By Salary Ascending</button>
            <button>Sort By Salary Descending</button>
            {
                employees.filter((item) => ()=>{
                    if(showAll == false){
                      show("");
                    }                    
                }
            )
               .map((item,index)=>{
                    return (
                        <div className="emp-card" key={index}>
                            <div><span>Name : </span>{item.name}</div>
                            <div><span>Department : </span>{item.dept}</div>
                            <div><span>Gender : </span>{item.gender}</div>
                            <div><span>Role : </span>{item.role}</div>
                            <div><span>Salary : </span>{item.salary}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export {Employee}