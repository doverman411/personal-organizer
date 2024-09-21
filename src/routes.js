import React from 'react'

const Dashboard = React.lazy(() => import('./views/coreui/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/coreui/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/coreui/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/coreui/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/coreui/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/coreui/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/coreui/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/coreui/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/coreui/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/coreui/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/coreui/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/coreui/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/coreui/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/coreui/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/coreui/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/coreui/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/coreui/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/coreui/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/coreui/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/coreui/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/coreui/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/coreui/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/coreui/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/coreui/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/coreui/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/coreui/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/coreui/forms/range/Range'))
const Select = React.lazy(() => import('./views/coreui/forms/select/Select'))
const Validation = React.lazy(() => import('./views/coreui/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/coreui/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/coreui/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/coreui/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/coreui/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/coreui/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/coreui/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/coreui/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/coreui/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/coreui/widgets/Widgets'))

// My components
const Todo = React.lazy(() => import('./views/todo/Todo'))
const Medication = React.lazy(() => import('./views/medication/Medication'))
const Journal = React.lazy(() => import('./views/journal/Journal'))

const routes = [
  { path: '/todo', name: 'Todo', element: Todo },
  { path: '/medication', name: 'Medication', element: Medication },
  { path: '/journal', name: 'Journal', element: Journal },

  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
