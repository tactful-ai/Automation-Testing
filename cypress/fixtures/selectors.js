

export let ticketsSelector ={    
    ticketNumber :":nth-child(1) > .w-100 > span > .tactful-input > .form-input-with-icon-search",    
    userName :":nth-child(2) > .w-100 > span > .tactful-input > .form-input-with-icon-search",   
    assignedToDrobDown : "#vs1__combobox > .vs__actions",    
    assignedToList : '#vs1__listbox li',
    requestTime : '.vdp-datepicker > :nth-child(1) > .form-input-with-icon-search',
    requestTimeCalender : '.vdp-datepicker__calendar',
    dayMonthBtn:'.day__month_btn',
    monthYearBtn:'.month__year_btn',
    datePicker:'.vdp-datepicker span',
    categoryDrobDown : '#vs2__combobox > .vs__actions',
    categoryList : "#vs2__listbox li",
    statusDrobDown : '#vs3__combobox > .vs__actions',
    statusList : '#vs3__listbox li',
    priorityDrobDown : '#vs4__combobox > .vs__actions',
    priorityList : "#vs4__listbox li",
    channelDrobDown : '#vs5__combobox > .vs__actions',
    channelList : '#vs5__listbox li',
    idNumber : '[data-label="#"]',
    statusContainer : '.status-btn[data-v-6f3d9e24]',
    notificationGroup : '.vue-notification-group',
    dueDateModal : "#bv-modal-setDueDate___BV_modal_content_",
}

export let moniteringSelector = {
    agentDrobDown : '#vs1__combobox > .vs__actions',
    agentList:'#vs1__listbox li',
    tagsDrobDown:'#vs2__combobox > .vs__actions',
    tagsList:'#vs2__listbox li',
    channelDrobDown:'#vs3__combobox > .vs__actions',
    channelList:'#vs3__listbox li',
    queueDrobDown :'#vs4__combobox > .vs__actions',
    queueList: '#vs4__listbox li'  ,
    HandoverDrobDown:'#vs5__combobox >.vs__actions',
    handOverList:"#vs5__listbox li",
    nickName:'.form-input-with-icon-search[data-v-dbb1b4b6]'
}
export let count = 0


export let webchatSelector = {
    validationError :'.validation-msg-error',
    channelNameInput :'input[placeholder = "Channel Name"]',
    tagInput : 'input[placeholder = "Tag"]',
    uploadLogoLink:'.upload-logo',
    uploadLogoSwitcher:':nth-child(1) > .col-2 > .switcher > .switcher-indicator',
    leadCaptureSwitcher:':nth-child(3) > .col-2 > .switcher > .switcher-indicator',
    minimizedImgCircle : '.minimized-img-circle',
    minimizedImg : '.minimized-img',
    squareLauncher:'.square-launcher',
    dstnyLogo:'destiny-logo',
    titleSwitcher:'.title-switcher',
    titleInput:'.title-input > span > .tactful-input > .form-input-with-icon-search',
    channelEdit:'[data-label="Configuration"]',
    channelTag:'[data-label="Tag"]',
    channelName:'[data-label="Channel Name"]',
    spacing:'.apperance-accordion input[type="number"]'

}

