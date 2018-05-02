import React from "react"

 
function List(props) {
    return (
     <div>
         {props.taskList.length>0 && <h2>{props.listTitle}</h2>}
         <ul>
             {props.taskList.map((task,index) => {
                 if(task.done === props.condition){
                 //li passem una condicio del .done (rollo props.condition) i nomes renderitza les que cumpleixen la condicio
                 return <li key={index}><span>{task.name}</span><button onClick={(e) => {
                    e.preventDefault()
                    props.modifyTaskStatus(task.id)
                 }}>{props.symbol}</button></li>
                }
                })}
         </ul>
     </div>
    );
  }
  




export default List