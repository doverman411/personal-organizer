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
    CCard,
    CCardHeader,
    CListGroup,
    CListGroupItem,
    CFormCheck,
    CContainer,
    CBadge,
 } from "@coreui/react"
import { Set } from "core-js"

const AddTaskForm = ({onSubmit, tagPool}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState(new Set())

    const valid = () => {
        return name.length;
    }

    const submit = (close) => {
        if (!valid()) {
            return
        }
        onSubmit({
            name: name, 
            description: description, 
            tags: tags, 
            close: close,
        })
    }

    const closeForm = () => {
        onSubmit(undefined)
    }

    const resetForm = () => {
        setName('')
        setDescription('')
        setTags(new Set())
    }

    return (
        <>
        <CModal
        alignment="center"
        visible
        onClose={closeForm}
        aria-labelledby="AddTask"
        >
            <CModalHeader>
                <CModalTitle id="AddTask">New Task</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <div className="mb-3">
                        <CFormLabel htmlFor="taskName">Name</CFormLabel>
                        <CFormInput
                            id="taskName" 
                            value={name}
                            type="text"
                            invalid={!name.length}
                            feedbackInvalid={<p>This field is required</p>}
                            onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="taskDescription">Description</CFormLabel>
                        <CFormTextarea 
                            id="taskDescription" 
                            value={description}
                            type="text"
                            rows={1} 
                            onChange={(event)=>{setDescription(event.target.value)}}
                        ></CFormTextarea>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Tags</CFormLabel>
                        {Array.from(tagPool).map((tag) => 
                            <CFormCheck key={tag.name}
                            id={`taskTags-${tag.name}`}
                            checked={tags.has(tag)}
                            label={<CBadge shape="rounded-pill" style={{backgroundColor: tag.color}}>{tag.name}</CBadge>}
                            onChange={(event)=>{
                                const newTags = new Set(tags)
                                if (event.target.checked) {
                                    newTags.add(tag)
                                } else {
                                    newTags.delete(tag)
                                }
                                setTags(newTags)
                            }}
                            ></CFormCheck>
                        )}
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={closeForm}>
                Close
                </CButton>
                <CButton color="primary" 
                    type="submit"
                    onClick={() => {
                        submit(true)
                        if (valid()) {
                            closeForm()
                        }    
                    }}
                >
                    Create & Close
                </CButton>
                <CButton color="primary"
                    type="submit"
                    onClick={() => {
                        submit(false)
                        resetForm()
                    }}
                >
                    Create
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

const Tasks = ({tasks, done}) => {
    return (
        tasks.length > 0 ?
        tasks.map(task => 
            <div key={task.id}>
                <CCard style={{ width: '18rem' }}>
                    <CCardHeader>
                        {task.name}
                        {Array.from(task.tags).map(tag => <CBadge key={`${task.id}-${tag.name}`} shape="rounded-pill" style={{backgroundColor: tag.color}}>{tag.name}</CBadge>)}
                    </CCardHeader>
                    <CListGroup flush>
                        {task.description.length > 0 && <CListGroupItem>{task.description}</CListGroupItem>}
                        <CListGroupItem>
                            <CButton 
                                color="primary"
                                onClick={()=> {done(task.id)}}
                            >
                            Done
                            </CButton>
                        </CListGroupItem>
                    </CListGroup>
                </CCard>
            </div>
        )
        : <p>You have no tasks, wohoo! Click + to add one</p>
    )
}

const Todo = () => {
    const [taskID, setTaskID] = useState(0)
    const [tasks, setTasks] = useState([])
    const [tags, setTags] = useState(new Set([{name: 'School', color: '#00FF00'}, {name: 'Fun', color: "#FF0000"}]))
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false)

    const addTask = (form) => {
        setTasks(() => [...tasks, {
            id: taskID,
            name: form.name,
            description: form.description,
            tags: form.tags,
        }])
        setTaskID(taskID+1)
    }

    const completeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <>
         <CButton 
            color="primary" 
            onClick={() => {setOpenAddTaskForm(true)}}
        >
            +
        </CButton>

        <Tasks tasks={tasks} done={(id) => {completeTask(id)}}/>

        {openAddTaskForm && <AddTaskForm tagPool={tags} onSubmit={(form) => {
            if (form) {
                addTask(form)
                setOpenAddTaskForm(!form.close)
            } else {
                setOpenAddTaskForm(false)
            }
            
        }}/>}
        </>
    )
}

export default Todo