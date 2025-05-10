import React, { useEffect, useState } from 'react'
import './todo.css'
import { AiOutlineCheck } from 'react-icons/ai';
import { TbXboxX } from 'react-icons/tb';

const Todo = () => {
    const [state, setstate] = useState('');
    const [data, setData] = useState([])
    const [mark, setMark] =useState([])
    const [edit,setEdit] = useState(null)

    let dataAdd = ()=>{
     if(state.trim()==="") return;
     if(edit !== null){
        const updatelist = [...data]
         updatelist[edit] = state
         setData(updatelist)
         setEdit(null)
     }else{
        setData([...data,state])
     }

     
        setstate('')
    }

    
   
    let DelteData =(index)=>{
        console.log(index);
       let dataDelte = data.filter((ele,id)=>{
        return index != id
       })
       setData(dataDelte)
       

    }
//   get input data
    let getData = (e)=>{
       let data = e.target.value
       console.log(data);

       setstate(data)
    }
    
    //change the text css X ?
    const ChangeText = (index) => {

    if (mark.includes(index)) {
        setMark(mark.filter(i => i !== index));
      } else {
        setMark([...mark, index]);
      }
    }
    console.log(mark);
    const isMarked = (index) => mark.includes(index);


    //handleedit

    const handleEdit =(ind)=>{
        setstate(data[ind])
        setEdit(ind)

    }
    
// keybord enter

    const HandleKey =(e)=>{
            if(e.key==="Enter"){
                dataAdd()
            }
    }

    return (
        <div className='mian-container'>
            <div className="head">
                <h1>To-Do-List</h1>
                <div className="inputShow">
                    <input type="text" name="" id="" value={state} onChange={getData} onKeyDown={HandleKey} className='inputdata' />
                    <button onClick={dataAdd}>Add</button>
                </div>
            </div>
            <div className="main-card">
                {
                    data.map((ele,index)=>{
                        return(
                            <React.Fragment key={index}>
                            <div className='Card'>
                                <span></span>
                                {console.log(mark.includes(index))}
                    <p className={mark.includes(index)  ? 'text':''}>{ele}</p>
                     <div>
                        <button className={`show show2 ${isMarked(index) ? 'red' : 'green'}`} onClick={()=>ChangeText(index)}>
                        {isMarked(index) ? <TbXboxX size={24} /> : <AiOutlineCheck size={20} />}
                        </button>
                        <button className='edit' onClick={()=>handleEdit(index)}>Update</button>
                        <button className='delete' onClick={()=>DelteData(index)}>Delete</button>
                     </div>
                </div>
                </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Todo
