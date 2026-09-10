// seleciona os elementos do formulario

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona oss elementos da lista.
const expenseList = document.querySelector("ul")

//captura o evento de input para formatar o valor.

amount.oninput = () => {

  // obtém o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "")

  // transformar o valor em centavos
  value = Number(value) / 100

  //atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

// formata o valor para BRL (real brasileiro)
function formatCurrencyBRL(value){
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // retorna o valor formatado
  return value
}

//captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {

  //previne o comportamento padrão de recarregar a página.
  event.preventDefault()

  //cria objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),    
  }

  // chama a função que irá adicionar o item na lista
  expenseAdd(newExpense)
}

function expenseAdd(newExpense){
  try {
    //cria o elemento para adicionar na lista

    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //cria o icone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //cria a info da dispesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //cria a categoria das despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // // Adiciona name e category em expense info da despesa
    expenseInfo.append(expenseName, expenseCategory)

    //adiciona as infos do item
    expenseItem.append(expenseIcon, expenseInfo)

    //adiciona o item na lista
    expenseList.append(expenseItem)

  } catch (error) {
    alert("TENTE NOVAMENTE")
    console.log(error)
  }
}



