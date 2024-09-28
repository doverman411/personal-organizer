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
    CTooltip,
 } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilPencil } from "@coreui/icons"
import { Set } from "core-js"
import contrastColor from '../../utils/contrast-text'
import './styles.css'



let taskID = 0
let tagID = 0

const TaskForm = ({tagPool, onSubmit, editData}) => {
    const id = editData ? editData.id : undefined
    const [name, setName] = useState(editData ? editData.name : '')
    const [description, setDescription] = useState(editData ? editData.description : '')
    const [tags, setTags] = useState(editData ? [...editData.tags] : [])

    const valid = () => {
        return name.trim().length
    }

    const submit = (close) => {
        onSubmit({
            id: id !== undefined ? id : taskID++,
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

    const onTagChange = (tag, checked) => {
        setTags(prevTags => {
            let newTags = [...prevTags]
            if (checked) {
                newTags.push(tag)
            } else {
                newTags = newTags.filter(t => t.id !== tag.id)
            }
            return newTags
        })
    }

    return (
        <>
        <CModal
        alignment="center"
        visible
        onClose={closeForm}
        aria-labelledby="AddTask"
        backdrop="static"
        >
            <CModalHeader>
                <CModalTitle id="AddTask">{editData ? <>Edit task</> : <>New Task</>}</CModalTitle>
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
                            checked={tags.find(t => t.id === tag.id)}
                            label={<CBadge shape="rounded-pill" className="badge" style={{backgroundColor: tag.color, color: contrastColor(tag.color)}}>{tag.name}</CBadge>}
                            onChange={(event) => onTagChange(tag, event.target.checked)}
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
                    {editData ? <>Save</> : <>Create & Close</>}
                </CButton>
                {!editData && <CButton color="primary"
                    type="submit"
                    onClick={() => {
                        submit(false)
                        resetForm()
                    }}
                    disabled={!valid()}
                >
                    Create
                </CButton>}
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

    const createNewTag = () => {
        setTags(prevTags => [...prevTags, {id: tagID++, name: '', color: '#000000'}])
    }

    const deleteTag = (tag) => {
        setTags(prevTags => prevTags.filter(t => t.id !== tag.id))
    }

    const changeName = (tag, name) => {
        setTags(prevTags => {
            const newTags = [...prevTags]
            newTags.find(t => t.id === tag.id).name = name
            return newTags
        })
    }

    const changeColor = (tag, color) => {
        setTags(prevTags => {
            const newTags = [...prevTags]
            newTags.find(t => t.id === tag.id).color = color
            return newTags
        })
    }

    return (
    <>
    <CModal size="sm"
    alignment="center"
    visible
    onClose={closeForm}
    aria-labelledby="EditTags"
    backdrop="static"
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
                                onChange={event => {changeName(tag, event.target.value)}}
                            />
                        </div>
                        <CFormInput className="form-tag-color"
                            id={`tagColor${tag.id}`} 
                            type="color" 
                            defaultValue={tag.color} 
                            onChange={event => {changeColor(tag, event.target.value)}}
                        />
                        <div className="form-tag-delete">
                            <CCloseButton className="form-tag-delete" onClick={() => {deleteTag(tag)}}/>
                        </div>
                    </div>
                )}
                <CButton color="primary" onClick={createNewTag}>
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
    const [changedTags, setChangedTags] = useState([])

    useEffect(() => {
        setChecks((prevChecks) => {
            const newChecks = new Map([...prevChecks])
            return new Map(tagPool.map(tag => [tag.id, newChecks.has(tag.id) ? newChecks.get(tag.id) : true]))
        })
    }, [tagPool])

    useEffect(() => {
        changedTags.forEach(onCheck)
    }, [changedTags])

    const tagWithID = (tagID) => {
        return tagPool.find(tag => tag.id === tagID)
    }

    const selectAll = (checked) => {
        const tagsToCheck = []
        setChecks(prevChecks => {
            const newChecks = new Map([...prevChecks])
            for (const [tagID, isChecked] of newChecks) {
                if (isChecked != checked) {
                    tagsToCheck.push(tagWithID(tagID))
                }
                newChecks.set(tagID, checked)
            }
            setChangedTags(tagsToCheck)
            return newChecks
        })
    }

    const select = (tag) => {
        setChecks(prevChecks => {
            const newChecks = new Map([...prevChecks])
            newChecks.set(tag.id, !newChecks.get(tag.id))
            return newChecks
        })
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
                        setOn(event.target.checked)
                    }}
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

const Tasks = ({tasks, done, filter, onEdit}) => {
    return (
        <div className="tasks-container">
        {tasks.length > 0 ?
        tasks.filter(task => !filter.on || task.tags.some(taskTag => filter.tags.find(filterTag => filterTag.id === taskTag.id))).map(task =>
            <div key={task.id}>
                <CCard style={{ width: '18rem' }}>
                    <CCardHeader>
                        <div className="task-top-container">
                            <div className="task-header-name">
                                <span>{task.name}</span>
                            </div>
                            <div className="task-header-edit-button">
                            <CTooltip
                                content={<>Edit task</>}
                            >
                                <CButton 
                                    color="primary" 
                                    shape="rounded-3" 
                                    variant="ghost"
                                    onClick={() => {onEdit(task)}}
                                >
                                    <CIcon icon={cilPencil} size="lg" />
                                    
                                </CButton>
                            </CTooltip>
                            </div>
                        </div>
                        
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
        )
        : <p>You have no tasks, wohoo! Click + to add one</p>}
        </div>
        
    )
}

const Todo = () => {
    // const test = [
    //     {id: -1, name: "School", color: "#000000"},
    //     {id: -2, name: "Work", color: "#FFFFFF"},
    //     {id: -3, name: "Fun", color: "932452"},
    // ]
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
    const [openEditTaskForm, setOpenEditTaskForm] = useState(false)
    const [editTaskData, setEditTaskData] = useState()
    const [openTagsForm, setOpenTagsForm] = useState(false)
    const [filter, setFilter] = useState({on: filterOnDefault, tags: []})

    const addTask = (form) => {
        setTasks((prevTasks) => [...prevTasks, {
            id: form.id,
            name: form.name,
            description: form.description,
            tags: form.tags,
        }])
    }

    const completeTask = (id) => {
        setTasks(prevTasks => prevTasks.filter((task) => task.id !== id))
    }

    const onSubmitAddTaskForm = (form) => {
        if (form) {
            addTask(form)
            setOpenAddTaskForm(!form.close)
        } else {
            setOpenAddTaskForm(false)
        }
    }

    const onSubmitEditTaskForm = (form) => {
        setOpenEditTaskForm(false)
        if (!form) {
            return
        }
        setTasks(prevTasks => {
            const newTasks = [...prevTasks]
            newTasks.splice(newTasks.findIndex(task => task.id === form.id),1,form)
            return newTasks
        })
    }

    const onSubmitTagsForm = (form) => {
        setOpenTagsForm(false)
        if (!form) {
            return
        }
        // updating filter's tags
        setFilter(prevFilter => {
            const newFilter = { ...prevFilter, tags: [...prevFilter.tags] };
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
            return newFilter
        })

        // updating tasks' tags
        setTasks(prevTasks => {
            const newTasks = prevTasks.map(task => ({
                ...task, 
                tags: [...task.tags],
            }))
            for (const task of newTasks) {
                for (const tag of task.tags) {
                    const coorespondingTag = form.find(t => t.id === tag.id)
                    if (coorespondingTag) {
                        task.tags.splice(task.tags.indexOf(tag),1,coorespondingTag)
                    } else {
                        task.tags = task.tags.filter(t => t.id !== tag.id)
                    }
                }
            }
            return newTasks
        })
        setTags(form)
    }

    const onCheckFilter = (tag) => {
        setFilter(prevFilter => {
            const newFilter = {...prevFilter, tags: [...prevFilter.tags]}
            const tagIndex = newFilter.tags.findIndex(t => t.id === tag.id)
            if (tagIndex !== -1) {
                newFilter.tags.splice(tagIndex,1)
            } else {
                newFilter.tags.push(tag)
            }
            return newFilter
        })
    }

    const onOnFilter = (on) => {
        setFilter(prevFilter => {
            const newFilter = {...prevFilter, tags: [...prevFilter.tags]}
            newFilter.on = on 
            return newFilter
        })
    }

    return (
        <>
        <div className="todo-container">
            <div className="add-task-button ui-button">
                <CTooltip content="Create task">
                    <CButton 
                        color="primary" 
                        onClick={() => {setOpenAddTaskForm(true)}}
                    >
                    +
                    </CButton>
                </CTooltip>
            </div>

            <div className="title"><h1>Todo</h1></div>
            
            <div className="tags-form-button ui-button">
                <CButton 
                    color="primary" 
                    onClick={() => {setOpenTagsForm(true)}}
                >
                    Tags
                </CButton>
            </div>
            
            <div className="filter-container">
                <div className="filter">
                    <Filter 
                        
                        onDefault={filterOnDefault} 
                        tagPool={tags} 
                        onCheck={onCheckFilter}
                        onOn={onOnFilter}
                    />
                </div>
            </div>

            <div className="tasks">
                <Tasks 
                    tasks={tasks} 
                    filter={filter} 
                    done={completeTask}
                    onEdit={(task) => {
                        setOpenEditTaskForm(true)
                        setEditTaskData(task)
                    }}
                />
            </div>
        </div>

        {openAddTaskForm && <TaskForm tagPool={tags} onSubmit={onSubmitAddTaskForm}/>}

        {openEditTaskForm && <TaskForm tagPool={tags} editData={editTaskData} onSubmit={onSubmitEditTaskForm}/>}

        {openTagsForm && <TagsForm tagPool={tags} onSubmit={onSubmitTagsForm}/>}
        </>
    )
}

export default Todo