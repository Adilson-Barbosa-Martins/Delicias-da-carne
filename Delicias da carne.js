document
  .getElementById("contatoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("nomeInput").value;
    var email = document.getElementById("emailInput").value;
    var telefone = document.getElementById("telefoneInput").value;

    if (nome.length < 2) {
      alert(
        "Nome inválido. Por favor, insira pelo menos 2 caracteres no campo Nome."
      );
      return;
    }

    if (!validateEmail(email)) {
      alert("E-mail inválido. Por favor, insira um endereço de e-mail válido.");
      return;
    }

    if (!validateTelefone(telefone)) {
      alert(
        "Telefone inválido. Por favor, insira um número de telefone válido (11 dígitos)."
      );
      return;
    }

    alert(
      "Mensagem enviada com sucesso!\n\nNome: " +
        nome +
        "\nE-mail: " +
        email +
        "\nTelefone: " +
        telefone
    );

    document.getElementById("contatoForm").reset();
  });

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateTelefone(telefone) {
  var re = /^\d{11}$/;
  return re.test(telefone);
}

var nomeInput = document.createElement("input");
nomeInput.type = "text";
nomeInput.id = "nomeInput";
nomeInput.className = "campo";
nomeInput.required = true;
nomeInput.style.outline = "none";
nomeInput.style.border = "none";
nomeInput.style.background = "transparent";
nomeInput.style.width = "100%";
document.getElementById("nomeDiv").appendChild(nomeInput);

var emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "emailInput";
emailInput.className = "campo";
emailInput.required = true;
emailInput.style.outline = "none";
emailInput.style.border = "none";
emailInput.style.background = "transparent";
emailInput.style.width = "100%";
document.getElementById("emailDiv").appendChild(emailInput);

var telefoneInput = document.createElement("input");
telefoneInput.type = "tel";
telefoneInput.id = "telefoneInput";
telefoneInput.className = "campo";
telefoneInput.required = true;
telefoneInput.style.outline = "none";
telefoneInput.style.border = "none";
telefoneInput.style.background = "transparent";
telefoneInput.style.width = "100%";
document.getElementById("telefoneDiv").appendChild(telefoneInput);

const selectContainer = document.querySelector(".custom-select");
const selectSelected = selectContainer.querySelector(".select-selected");
const selectItems = selectContainer.querySelector(".select-items");
const selectOptions = Array.from(selectItems.querySelectorAll("div"));

selectSelected.addEventListener("click", () => {
  selectItems.classList.toggle("open");
});

selectOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectSelected.textContent = option.textContent;
    selectItems.classList.remove("open");
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!selectContainer.contains(target)) {
    selectItems.classList.remove("open");
  }
});

const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", () => {
  const nome = document.getElementById("nomeInput").value;
  const email = document.getElementById("emailInput").value;
  const telefone = document.getElementById("telefoneInput").value;

  if (nome.length < 2) {
    alert(
      "Nome inválido. Por favor, insira pelo menos 2 caracteres no campo Nome."
    );
    return;
  }

  if (!validateEmail(email)) {
    alert("E-mail inválido. Por favor, insira um endereço de e-mail válido.");
    return;
  }

  if (!validateTelefone(telefone)) {
    alert(
      "Telefone inválido. Por favor, insira um número de telefone válido (11 dígitos)."
    );
    return;
  }

  const selectedOptions = Array.from(checkboxDivs)
    .filter(
      (div, index) =>
        index !== 0 &&
        div.querySelector(".radio-btn1").classList.contains("selected1")
    )
    .map((div) => div.querySelector("label").innerText);

  const itens = selectedOptions;

  const selectValue = selectSelected.textContent;
  const relatorio = {
    nome: nome,
    email: email,
    telefone: telefone,
    genero: selectedOption,
    meioSelecionado: selectValue,
    itens: itens,
  };

  enviarRelatorio(relatorio);
});

function enviarRelatorio(relatorio) {
  console.log(relatorio);
}

const radioDivs = document.querySelectorAll(".radio-container > div");
let selectedOption = "";

radioDivs.forEach((div) => {
  div.addEventListener("click", () => {
    radioDivs.forEach((otherDiv) => {
      otherDiv.classList.remove("selected");
    });

    div.classList.add("selected");
    selectedOption = div.innerText;
  });
});

const checkboxDivs = document.querySelectorAll(".radio-container1 > div");
const todosCheckbox = checkboxDivs[0].querySelector(".radio-btn1");
todosCheckbox.classList.remove("selected1");

checkboxDivs.forEach((div, index) => {
  if (index !== 0) {
    const checkbox = div.querySelector(".radio-btn1");
    checkbox.classList.remove("selected1");
  }
});

checkboxDivs.forEach((div) => {
  const checkbox = div.querySelector(".radio-btn1");

  div.addEventListener("click", () => {
    if (div === checkboxDivs[0]) {
      const isChecked = checkbox.classList.toggle("selected1");

      checkboxDivs.forEach((div, index) => {
        if (index !== 0) {
          const otherCheckbox = div.querySelector(".radio-btn1");
          otherCheckbox.classList.toggle("selected1", isChecked);
        }
      });

      const areAllSelected = Array.from(checkboxDivs).every(
        (div, index) =>
          index === 0 ||
          div.querySelector(".radio-btn1").classList.contains("selected1")
      );
      todosCheckbox.classList.toggle("selected1", areAllSelected);
    } else {
      checkbox.classList.toggle("selected1");
      todosCheckbox.classList.remove("selected1");

      const allSelected = Array.from(checkboxDivs)
        .slice(1)
        .every((div) =>
          div.querySelector(".radio-btn1").classList.contains("selected1")
        );
      todosCheckbox.classList.toggle("selected1", allSelected);
    }
  });
});
