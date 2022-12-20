'use stricts'
//Elements
    const divs = document.querySelector("#divs")
    const sectionInput = document.querySelector("#section-input")
    const titleInput = document.querySelector("#title-input")
    const textInput = document.querySelector("#text-input")
    const editInput = document.querySelector("#edit-input")
    const editTitle = document.querySelector("#edit-title")
    const editText = document.querySelector("#edit-text")
    const notesList = document.querySelector("#notes-list")
    const cancelChangeBtn = document.querySelector("#btn-cancel-change")
    const changeBtn = document.querySelector("#btn-change")
    const searchBtn = document.querySelector("#btn-search")
    const searchInput = document.querySelector("#search-input")

    let oldTitleValue
    let oldTextValue
    let local_notes = []
    let local = JSON.parse(localStorage.getItem("note"))
    let count = 0
    
    
//Functions
        //Criação dos elementos HTML
    const createNotes = (json) => {

        
            const note = document.createElement("div")
            if(json.done != true){
                note.classList.add("notes")
                if(json.hide != false){
                    note.classList.remove("notes")
                    note.classList.add("hide")
                }else{
                    note.classList.add("notes")
                    note.classList.remove("hide")
                }
            }else{
                note.classList.add("notes-done")
                if(json.hide != false){
                    note.classList.remove("notes")
                    note.classList.add("hide")
                }else{
                    note.classList.add("notes")
                    note.classList.remove("hide")
                }
            }
            const noteTitle = document.createElement("h2")
            noteTitle.innerText = json.title
            note.appendChild(noteTitle)

            const noteText = document.createElement("p")
            noteText.innerText = json.text
            note.appendChild(noteText)
        
            const divButton = document.createElement("content")
            divButton.classList.add("buttons")
            note.appendChild(divButton)
        
            const buttonEdit = document.createElement("button")
            buttonEdit.classList.add("btn-edit")
            buttonEdit.innerHTML = "<i class='fa-solid fa-feather'></i>"
            divButton.appendChild(buttonEdit)
        
            const buttonRemove = document.createElement("button")
            buttonRemove.classList.add("btn-remove")
            buttonRemove.innerHTML = "<i class='fa-solid fa-xmark'></i>"
            divButton.appendChild(buttonRemove)
        
            const buttonCheck = document.createElement("button")
            buttonCheck.classList.add("btn-check")
            buttonCheck.innerHTML = "<i class='fa-solid fa-check'></i>"
            divButton.appendChild(buttonCheck)
        
            notesList.appendChild(note)
        
            titleInput.focus()

            titleInput.value = ''
            textInput.value = ''

            count++
        }
        //toggleEdit faz a alternação de classes em elementos HTML
    const toggleEdit = () => {
        editInput.classList.toggle("hide")
        divs.classList.toggle("hide")
        notesList.classList.toggle("hide")
    }
        //Funççao updateNotes troca um título antigo pelo novo
    const updateNote = (text) => {

        const allNotes = document.querySelectorAll(".notes")

        allNotes.forEach((note) => {
            let noteTitleE = note.querySelector("h2")
            let noteTextE = note.querySelector("p")
            if(noteTitleE.innerText == oldTitleValue){
                noteTitleE.innerText = text[0]//Título novo
                noteTextE.innerText = text[1]//Texto novo
            }
        })
    }
        //check() faz a checagem e cria os traz o createNotes se houver items no localStorage
    const check = () => {
        if(local !== null){
            local_notes = local
            const map = local_notes.map(obj => createNotes(obj))
        }
    }

check()
//Events

    
    sectionInput.addEventListener("submit", (e) => {
        
        let titleValue = titleInput.value
        let textValue = textInput.value
        /*Criando um objeto e dando um push em um array de objetos local-notes, e 
            sempre atualizanod o array no localStorage*/
        if(titleValue){
            let note_Object = {
                'hide' : false,
                'id': count,
                'title' : titleValue,
                'text' : textValue 
            }
            local_notes.push(note_Object)
            localStorage.setItem('note',JSON.stringify(local_notes))         
        }
    }
)

    notesList.addEventListener("click", (e) => {
    
    e.preventDefault()
    const targetElement = e.target
    const parent = targetElement.closest("div")
    let newTitle
    let newText

    if(parent || parent.querySelector('h2')){
        newTitle = parent.querySelector('h2').innerText
        newText = parent.querySelector('p').innerText
    }
    //Condição que irá adicionar nos objetos os itens "done = true"
    if(targetElement.classList.contains("btn-check")){

        const allNotes = document.querySelectorAll('.notes')

        allNotes.forEach((obj,i) => {
                obj.onclick = () => {
                    content.children[i]
                        local_notes[i].done = true
                        localStorage.setItem('note',JSON.stringify(local_notes))
                        parent.classList.add("notes-done")
                    }
            })
    }
    //Condição que irá quemover o card escolhido
    if(targetElement.classList.contains("btn-remove")){
         /*ForEach vai percorrer todas as notas, 
       selecionar a nota escolhida e dar um splice() no array de objetos */
        const allNotes = document.querySelectorAll('.notes')
        allNotes.forEach((obj,i) => {
            obj.onclick = () => { 
                content.children[i]/*o content.children[i] está pegando o objeto escolhido. */ 
                local_notes.splice(i,1)
                localStorage.setItem('note',JSON.stringify(local_notes))         
                parent.remove()
            }
        }
    )
    count--
}
    //Condição que irá fazer a edição do Card ser feita
    if(targetElement.classList.contains("btn-edit")){
        const allNotes = document.querySelectorAll('.notes')

        editTitle.value = newTitle
        oldTitleValue = newTitle
        //salvando os valores anteriores em uma variável e depois atualizando a editTittle ou editText
        editText.value = newText
        oldTextValue = newText
        //Atualizando o item modificado
        allNotes.forEach((obj, i) => {
            document.querySelector("#btn-change").onclick = () => {
                content.children[i]
                local_notes[i].title = editTitle.value
                local_notes[i].text = editText.value
                localStorage.setItem('note',JSON.stringify(local_notes)) 
            }
        })

        //toggle vai esconder as divs notes e mostrar a div Edit
        toggleEdit()
    }
    if(targetElement.classList.contains("#btn-cancel-change")){
        toggleEdit()
    }
    })

    cancelChangeBtn.addEventListener("click", () => {
        toggleEdit()
        titleInput.value = ''
        textInput.value = ''
        localStorage.removeItem('note')
    })

    changeBtn.addEventListener("click", (e) => {
        e.preventDefault()

        let newTitle = editTitle.value
        let newText = editText.value
        let newValues = [newTitle,newText]
        /*O melhor argumento que achei foi colocar os valores (title e text) novos num array e
            chamar a função updateNote que irá usar os primeiros indices do array (0,1) e completar a modificação dentro da 
            função. */
        updateNote(newValues)

        toggleEdit()
    })
    //Botão de pesquisa de elementos
    searchBtn.addEventListener('click', () => {
        //Criei um array com os objetos que são iguais aos valores do input de pesquisa
        const filterNote = local_notes.filter(obj => {
            return obj.title.toLowerCase().includes(searchInput.value.toLowerCase())
    })
        /*a função searchCard vai comparar o objeto filtrado com todos os objetos existentes, e todos que forem diferentes do
            do elemento buscado vao ser escondidos através da classe "hide"*/
        const searchCard = (array) => {
            array.forEach((elem) => {
                local_notes.map((obj) => {
                    if(obj.title == elem.title){
                        obj.hide = false
                        localStorage.removeItem('note')
                        localStorage.setItem('note', JSON.stringify(local_notes))
                    }else if (obj.title != elem.title){
                        obj.hide = true
                        localStorage.removeItem('note')
                        localStorage.setItem('note', JSON.stringify(local_notes))
                    }
                })
                })
                //console.log(local_notes)
        }
        /*E essa condição abaixo irá fazer todos os elementos serem mostrados na tela após usar o filtro de pesquisa, apenas 
            clicando no botao de btn-search sem nenhum argumento no input*/
        if(searchInput.value != ''){
            searchCard(filterNote)
        }else{
            local_notes.map((obj) => {
                obj.hide = false
                localStorage.removeItem('note')
                localStorage.setItem('note', JSON.stringify(local_notes))
            })
        }
        
        
})