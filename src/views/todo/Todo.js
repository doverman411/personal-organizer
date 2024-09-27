import { useEffect, useState } from "react"
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
    CCardFooter,
    CCardBody,
 } from "@coreui/react"
import { Set } from "core-js"
import contrastColor from '../../utils/contrast-text'
import './styles.css'

let taskID = 0
let tagID = 0

const AddTaskForm = ({tagPool, onSubmit}) => {
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
                            onChange={event => {setName(event.target.value)}}
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
                            onChange={event => {setDescription(event.target.value)}}
                        ></CFormTextarea>
                    </div>
                    {/* Tags */}
                    <div className="mb-3">
                        <CFormLabel>Tags</CFormLabel>
                        {tagPool.map(tag => 
                            <CFormCheck key={tag.name}
                            id={tag.name}
                            checked={tags.includes(tag)}
                            label={<CBadge shape="rounded-pill" className="badge" style={{backgroundColor: tag.color, color: contrastColor(tag.color)}}>{tag.name}</CBadge>}
                            onChange={event => {
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
        return tags.every(tag => tag.name.trim().length !== 0) && new Set(tags.map(tag => tag.name)).size === tags.length
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
                                invalid={!nameValid(tags.find(t => t.id === tag.id))}
                                feedbackInvalid={<p>Required and must be unique</p>}
                                onChange={event => {tags.find(t => t.id === tag.id).name = event.target.value; setTags([...tags])}}
                            />
                        </div>
                        <CFormInput className="form-tag-color"
                            id={`tagColor${tag.id}`} 
                            type="color" 
                            defaultValue={tag.color} 
                            onChange={event => {tags.find(t =>t.id === tag.id).color = event.target.value; setTags([...tags])}}
                        />
                        <div className="form-tag-delete">
                            <CCloseButton className="form-tag-delete" onClick={event => {setTags(tags.filter(t => t !== tag))}}/>
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

const Filter = ({tagPool, onCheck, onOn, onDefault}) => {
    const [on, setOn] = useState(onDefault)
    const [all, setAll] = useState(true)
    const [checks, setChecks] = useState(new Map())

    useEffect(() => {
        console.log(tagPool)
        setChecks(new Map(tagPool.map(tag => [tag.id, checks.has(tag.id) ? checks.get(tag.id) : true])))
    }, [tagPool])

    const tagWithID = (tagID) => {
        return tagPool.find(tag => tag.id === tagID)
    }

    const selectAll = (checked) => {
        for (const [tagID, isChecked] of checks) {
            if (isChecked != checked) {
                onCheck(tagWithID(tagID))
            }
            checks.set(tagID, checked)
        }
        setChecks(new Map([...checks]))
    }

    const select = (tag) => {
        checks.set(tag.id, !checks.get(tag.id))
        setChecks(new Map([...checks]))
    }

    return (
        <>
        <CCard> 
            <CCardHeader content="h2">
                Filter
            </CCardHeader>
            <CCardBody>
                <CFormCheck 
                    label={<p>Filter by tag</p>}
                    onClick={event => {
                        onOn(event.target.checked)
                        setOn(event.target.checked
                    )}}
                    checked={on}
                    readOnly
                />
                <CFormCheck 
                    label={<p>Select All</p>} 
                    checked={all} 
                    onChange={event => {
                        setAll(event.target.checked)
                        selectAll(event.target.checked)
                    }} 
                    disabled={!on} 
                />
                {tagPool.map(tag => {
                    const check = checks.get(tag.id)
                    return (
                    <CFormCheck 
                        key={tag.id} 
                        checked={checks.get(tag.id)} 
                        onChange={() => {select(tag); onCheck(tag)}} 
                        label={<CBadge shape="rounded-pill" className="badge" 
                        style={{backgroundColor: tag.color, color: contrastColor(tag.color)}}>{tag.name}</CBadge>} 
                        disabled={!on}
                    />
                )})}
            </CCardBody>
        </CCard>
        </>
    )
}

const Tasks = ({tasks, done, filter}) => {
    return (
        tasks.length > 0 ?
        <div className="tasks-container">
        {tasks.filter(task => !filter.on || task.tags.map(tag => tag.id).some(tagID => filter.tags.map(tag => tag.id).includes(tagID))).map(task => 
            <div key={task.id}>
                <CCard style={{ width: '18rem' }}>
                    <CCardHeader>
                        <span className="task-header-name">{task.name}</span>
                    </CCardHeader>
                    <CListGroup flush>
                        {task.description.length > 0 && <CListGroupItem>{task.description}</CListGroupItem>}
                        { task.tags.length > 0 && 
                            <CListGroupItem>
                                <div className="task-header-tags">
                                    {task.tags.map(tag => <CBadge 
                                        key={`${task.id}-${tag.name}`} 
                                        shape="rounded-pill" 
                                        style={{backgroundColor: tag.color, color: contrastColor(tag.color)}}>
                                            {tag.name}
                                    </CBadge>)}
                                </div>
                            </CListGroupItem>
                            }
                        <CListGroupItem>
                            <CButton 
                                color="primary"
                                onClick={() => {done(task.id)}}
                            >
                            Done
                            </CButton>
                        </CListGroupItem>
                    </CListGroup>
                </CCard>
            </div>
        )}
        </div>
        : <p>You have no tasks, wohoo! Click + to add one</p>
    )
}

const Todo = () => {
    const test = [
        {id: -1, name: "School", color: "#000000"},
        {id: -2, name: "Work", color: "#FFFFFF"},
        {id: -3, name: "Fun", color: "932452"},
    ]
    // const test1 = [
    //     {id: -1, name: "Dance in suit", description: "Learn the tiktok dance", tags: [test[2]]},
    //     {id: -2, name: "All", description: "Do it all. You shall.", tags: [...test]},
    //     {id: -3, name: "Apply Internship", description: "", tags: [test[1],test[0]]},
    //     {id: -4, name: "No Tag", description: "No tags are permitted for this task. You must find this without the filter.", tags: []},
    //     {id: -5, name: "npm i dev", description: "You must npm i dev or else you will die.", tags: [test[1]]},
    //     {id: -6, name: "Zot on Peter", description: "", tags: [test[0]]}
    // ]
    const filterOnDefault = false; 
    const [tasks, setTasks] = useState([])
    const [tags, setTags] = useState([])
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false)
    const [openTagsForm, setOpenTagsForm] = useState(false)
    const [filter, setFilter] = useState({on: filterOnDefault, tags: []})

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
        <div className="tasks-ui">
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
        </div>

        <Filter 
            onDefault={filterOnDefault} 
            tagPool={tags} 
            onCheck={tag => {
                const tagIndex = filter.tags.findIndex(t => t.id === tag.id)
                if (tagIndex !== -1) {
                    filter.tags.splice(tagIndex,1)
                } else {
                    filter.tags.push(tag)
                }
                setFilter({...filter})
            }}
            onOn={on => {
                filter.on = on 
                setFilter({...filter})
            }}
            />

        <Tasks tasks={tasks} filter={filter} done={id => {completeTask(id)}}/>

        {openAddTaskForm && <AddTaskForm tagPool={tags} onSubmit={form => {
            if (form) {
                addTask(form)
                setOpenAddTaskForm(!form.close)
            } else {
                setOpenAddTaskForm(false)
            }
            
        }}/>}

        {openTagsForm && <TagsForm tagPool={tags} onSubmit={form => {
            setOpenTagsForm(false)
            if (!form) {
                return
            }
            
            // updating filter's tags
            const newFilter = {...filter}
            for (const tag of form) {
                const coorespondingTagIndex = newFilter.tags.findIndex(t => t.id === tag.id)
                if (coorespondingTagIndex !== -1) {
                    newFilter.tags[coorespondingTagIndex] = tag
                } else if (tags.every(t => t.id !== tag.id)) {
                    newFilter.tags.push(tag)
                }
            }
            for (const tag of newFilter.tags) {
                if (!form.find(t => t.id === tag.id)) {
                    newFilter.tags.splice(newFilter.tags.findIndex(t => t.id === tag.id),1)
                }
            }
            setFilter(newFilter)

            // updating tasks' tags
            for (const task of tasks) {
                for (const tag of task.tags) {
                    const coorespondingTag = form.find(t => t.id === tag.id)
                    if (coorespondingTag) {
                        task.tags.splice(task.tags.indexOf(tag),1,coorespondingTag)
                    } else {
                        task.tags = task.tags.filter(t => t.id !== tag.id)
                    }
                }
            }
            setTasks([...tasks])

            setTags(form)
        }}/>}
        {
            filter.tags.map((x) => <p key={x.id}>{x.name}</p>)
        }
        </>
    )
}

export default Todo