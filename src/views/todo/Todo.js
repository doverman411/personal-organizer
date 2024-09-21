import { useState } from "react"
import { 
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CForm,
    CFormLabel,
    CFormInput,
    CFormTextarea,
 } from "@coreui/react"

const Todo = () => {
    const [taskID, setTaskID] = useState(0)
    const [tasks, setTasks] = useState([])
    const [visible, setVisible] = useState(false)
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')

    const isAddTaskFormValid = () => {
        return newTaskName.length;
    }

    const resetAddTaskForm = () => {
        setNewTaskName('')
        setNewTaskDescription('')
    }

    const addTask = () => {
        if (!isAddTaskFormValid()) {
            return
        }
        setTasks(() => [...tasks, {
            id: taskID,
            name: newTaskName,
            description: newTaskDescription
        }])
        setTaskID(taskID+1)
    }

    const closeAddTask = () => {
        setVisible(false)
        setTimeout(resetAddTaskForm, 150)
    }

    return (
        <>
         <CButton 
            color="primary" 
            onClick={() => {setVisible(true)}}
        >
            Add
        </CButton>

        <ul>
            {tasks.map(v=><li key={v.id}>{v.name}</li>)}
        </ul>

        <CModal
        alignment="center"
        visible={visible}
        onClose={() => {setVisible(false)}}
        aria-labelledby="VerticallyCenteredExample"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">New Task</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <div className="mb-3">
                        <CFormLabel htmlFor="taskName">Name</CFormLabel>
                        <CFormInput
                            id="taskName" 
                            value={newTaskName}
                            type="text"
                            invalid={!newTaskName.length}
                            feedbackInvalid={<p>This field is required</p>}
                            onChange={(event)=>{setNewTaskName(event.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="taskDescription">Description</CFormLabel>
                        <CFormTextarea 
                            id="taskDescrption" 
                            value={newTaskDescription}
                            type="text"
                            rows={3} 
                            onChange={(event)=>{setNewTaskDescription(event.target.value)}}
                        ></CFormTextarea>
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={closeAddTask}>
                Close
                </CButton>
                <CButton color="primary" 
                    type="submit"
                    onClick={() => {
                        addTask()
                        if (isAddTaskFormValid()) {
                            closeAddTask()
                        }    
                    }}
                >
                    Create task & Close
                </CButton>
                <CButton color="primary"
                    type="submit"
                    onClick={() => {
                        addTask()
                        resetAddTaskForm()
                    }}
                >
                    Create task
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

export default Todo