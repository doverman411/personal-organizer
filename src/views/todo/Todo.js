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
    CInputGroup,
    CCloseButton,
 } from "@coreui/react"
import { Set } from "core-js"
import './styles.css'

let taskID = 0
let tagID = 0

const AddTaskForm = ({onSubmit, tagPool}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])

    const valid = () => {
        return name.trim().length
    }

    const submit = (close) => {
        onSubmit({
            name: name.trim(), 
            description: description.trim(), 
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
        setTags([])
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
                    {/* Name */}
                    <div className="mb-3">
                        <CFormLabel htmlFor="taskName">Name</CFormLabel>
                        <CFormInput
                            id="taskName" 
                            value={name}
                            type="text"
                            invalid={!valid()}
                            feedbackInvalid={<p>This field is required</p>}
                            onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    {/* Description */}
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
                    {/* Tags */}
                    <div className="mb-3">
                        <CFormLabel>Tags</CFormLabel>
                        {tagPool.map((tag) => 
                            <CFormCheck key={tag.name}
                            id={tag.name}
                            checked={tags.includes(tag)}
                            label={<CBadge shape="rounded-pill" style={{backgroundColor: tag.color}}>{tag.name}</CBadge>}
                            onChange={(event)=>{
                                const newTags = [...tags]
                                if (event.target.checked) {
                                    newTags.push(tag)
                                } else {
                                    newTags.splice(newTags.indexOf(tag),1)
                                }
                                setTags(newTags)
                            }}
                            ></CFormCheck>
                        )}
                    </div>
                </CForm>
            </CModalBody>
            {/* Buttons */}
            <CModalFooter>
                <CButton color="secondary" onClick={closeForm}>
                Close
                </CButton>
                <CButton color="primary" 
                    type="submit"
                    onClick={() => {submit(true)}}
                    disabled={!valid()}
                >
                    Create & Close
                </CButton>
                <CButton color="primary"
                    type="submit"
                    onClick={() => {
                        submit(false)
                        resetForm()
                    }}
                    disabled={!valid()}
                >
                    Create
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

const TagsForm = ({onSubmit, tagPool}) => {
    const [tags, setTags] = useState(tagPool.map(tag => ({...tag})))

    const closeForm = () => {
        onSubmit(undefined)
    }

    const valid = () => {
        // tag names should be non-blank and unique
        return tags.every((tag) => tag.name.trim().length !== 0) && new Set(tags.map(tag => tag.name)).size === tags.length
    }

    const nameValid = (tag) => {
        const name = tag.name
        return name.trim().length !== 0 && tags.filter(tag => tag.name === name).length === 1
    }

    return (
    <>
    <CModal size="sm"
    alignment="center"
    visible
    onClose={closeForm}
    aria-labelledby="AddTask"
    >
        <CModalHeader>
            <CModalTitle id="Tags">Tags</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm>
                {tags.map(tag => 
                    <div key={tag.id} className="form-tag">
                        <div className="form-tag-name">
                            <CFormInput 
                                id={`tagName${tag.id}`}
                                defaultValue={tag.name}
                                invalid={!nameValid(tags.find((t)=> t.id === tag.id))}
                                feedbackInvalid={<p>Required and must be unique</p>}
                                onChange={(event) => {tags.find((t)=> t.id === tag.id).name = event.target.value; setTags([...tags])}}
                            />
                        </div>
                        <CFormInput className="form-tag-color"
                            id={`tagColor${tag.id}`} 
                            type="color" 
                            defaultValue={tag.color} 
                            onChange={(event) => {tags.find((t)=>t.id === tag.id).color = event.target.value; setTags([...tags])}}
                        />
                        <div className="form-tag-delete">
                            <CCloseButton className="form-tag-delete" onClick={(event) => {setTags(tags.filter((t) => t !== tag))}}/>
                        </div>
                    </div>
                )}
                <CButton color="primary" onClick={() => {setTags([...tags, {id: tagID++, name: '', color: '#000000'}])}}>
                    +
                </CButton>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={closeForm}>
            Close
            </CButton>
            <CButton color="primary" 
                type="submit"
                disabled={!valid()}
                onClick={() => {onSubmit(tags)}}
            >
                Save
            </CButton>
        </CModalFooter>
    </CModal>
    </>)
}

const Tasks = ({tasks, done}) => {
    return (
        tasks.length > 0 ?
        tasks.map(task => 
            <div key={task.id}>
                <CCard style={{ width: '18rem' }}>
                    <CCardHeader>
                        {task.name}
                        {task.tags.map(tag => <CBadge key={`${task.id}-${tag.name}`} shape="rounded-pill" style={{backgroundColor: tag.color}}>{tag.name}</CBadge>)}
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
    const [tasks, setTasks] = useState([])
    const [tags, setTags] = useState([])
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false)
    const [openTagsForm, setOpenTagsForm] = useState(false)

    const addTask = (form) => {
        setTasks(() => [...tasks, {
            id: taskID++,
            name: form.name,
            description: form.description,
            tags: form.tags,
        }])
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
        
        <CButton 
            color="primary" 
            onClick={() => {setOpenTagsForm(true)}}
        >
            Tags
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

        {openTagsForm && <TagsForm tagPool={tags} onSubmit={(form) => {
            setOpenTagsForm(false)
            if (!form) {
                return
            }
            setTags(form)
            for (const task of tasks) {
                for (const tag of task.tags) {
                    const coorespondingTag = form.find((t) => t.id === tag.id)
                    if (coorespondingTag) {
                        task.tags.splice(task.tags.indexOf(tag),1,coorespondingTag)
                    } else {
                        task.tags = task.tags.filter((t) => t.id !== tag.id)
                    }
                }
            }
            setTasks([...tasks])
        }}/>}
        </>
    )
}

export default Todo