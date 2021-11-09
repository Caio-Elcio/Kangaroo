const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const exit_quiz = result_box.querySelector(".buttons .quit");
const replay_quiz = result_box.querySelector(".buttons .continue");

// se clicar no botão
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // apresentar a info box(caixa de regras lá)
}

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // fechar a caixa de regras
}

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // fechar a caixa de regras
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
}

exit_quiz.onclick = () => {
  window.location.assign("../index.html");
}

replay_quiz.onclick = () => {
  window.location.reload();
}

let que_count = 0;
let que_num = 1;

const next_btn = quiz_box.querySelector(".next_btn");
// se clicar no botão de avançar

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_num++;
    showQuestions(que_count);
    queCounter(que_num);
    next_btn.style.display = "none";
  } else {
    console.log("Quiz completo");
    info_box.classList.remove("activeInfo"); // fechar a caixa de regras
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const printResultQuiz = document.querySelector(".score_text span");
    let resultQuiz = `Você tirou ${result().personalidade} no teste de personalidade Kangaroo<br><br> ${result().message}`;
    console.log(result());
    printResultQuiz.innerHTML = resultQuiz;
  }
}
// pegando perguntas do array
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  const option_list = document.querySelector(".option_list");
  let que_tag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option"><div class="letter_option">A</div><div class="answer" onclick="painted1()">' + questions[index].option[0] + '</div></div>'
    + '<div class="option"><div class="letter_option">B</div><div id="bb" class="answer" onclick="painted2()">' + questions[index].option[1] + '</div></div>'
    + '<div class="option"><div class="letter_option">C</div><div class="answer" onclick="painted3()">' + questions[index].option[2] + '</div></div>'
    + '<div class="option"><div class="letter_option">D</div><div class="answer" onclick="painted4()">' + questions[index].option[3] + '</div></div>';
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".answer");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

var resp = [0, 0, 0, 0];

function optionSelected(answer) {
  // selecionado pelo user
  let userAns = answer.textContent;
  // questão do form
  let ansSelect = questions[que_count].option[que_count];

  if (userAns == questions[que_count].option[0]) {
    resp[0] += 1;
    console.log(resp[0]);
  } else if (userAns == questions[que_count].option[1]) {
    resp[1] += 1;
    console.log(resp[1]);
  } else if (userAns == questions[que_count].option[2]) {
    resp[2] += 1;
    console.log(resp[2]);
  } else if (userAns == questions[que_count].option[3]) {
    resp[3] += 1;
    console.log(resp[3]);
  }
  next_btn.style.display = "block";
}

function result() {
  let maxValue = {
    position: 0,
    value: 0
  }

  let person = {
    personalidade: "",
    message: ""
  }

  for (let i = 0; i < resp.length; i++) {
    if (maxValue.value < resp[i]) {
      maxValue.value = resp[i];
      maxValue.position = i;
    }
  }

  if (maxValue.position == 0) {
    person.personalidade = "Descuidado";
    person.message = "Você precisa tomar mais cuidado na internet! Algumas decisões em sites e jogos podem te trazer consequências ruins. Não divulgue informações pessoais, fotos ou vídeos com estranhos nas redes, eles podem fazer coisas ruins com seus dados ou de seus pais."
  } else if (maxValue.position == 1) {
    person.personalidade = "Cuidadoso";
    person.message = "Você é cuidadoso na internet! Não divulgue fotos, vídeos ou informações pessoais com estranhos. Fique atento em redes socias, jogos virtuais e chats online! Continue ignorando solicitações de estranhos e recusando links estranhos."
  } else if (maxValue.position == 2) {
    person.personalidade = "Obediente";
    person.message = "Você é obediente aos seus pais em relação a navegação na internet! Fique atento a interações de estranhos com você, se tiver dúvidas do que é seguro na internet sempre chame seus pais."
  } else if (maxValue.position == 3) {
    person.personalidade = "Responsável";
    person.message = "Você é responsável na internet, sabe que algumas atividades suas podem trazer consequências, por isso quando surge dúvida você prefere fechar guias no navegador ou cancelar algo que estava fazendo. Sua postura demonstra uma boa maturidade."
  }
  return person;
}

function queCounter(index) {
  const bottom_ques_count = quiz_box.querySelector(".total_que");
  let totalQuestCountTag = '<span><p>' + index + '</p>de<p>' + questions.length + '</p>Questões</span>';
  bottom_ques_count.innerHTML = totalQuestCountTag;
}