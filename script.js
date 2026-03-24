// Function to load the quiz based on the dropdown selection
function loadSelectedBank() {
    const fileName = document.getElementById('bank-selector').value;
    const quizContainer = document.getElementById('quiz');
    
    // Clear the current questions
    quizContainer.innerHTML = "Loading...";

    fetch(fileName)
        .then(response => response.json())
        .then(data => {
            quizContainer.innerHTML = ""; // Clear the loading text

            data.forEach((item, qIndex) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'question-block';
                qDiv.innerHTML = `<h3>${item.question}</h3>`;

                item.options.forEach((option, oIndex) => {
                    const btn = document.createElement('button');
                    btn.innerText = option;
                    
                    btn.onclick = () => {
                        // 1. Remove "correct" or "wrong" from ALL buttons in this specific question
                        const allButtonsInThisQuestion = qDiv.querySelectorAll('button');
                        allButtonsInThisQuestion.forEach(b => {
                            b.classList.remove('correct', 'wrong');
                        });

                        // 2. Check if the selection is right or wrong
                        if (oIndex === item.answer) {
                            btn.classList.add('correct');
                        } else {
                            btn.classList.add('wrong');
                        }
                    };
                    
                    qDiv.appendChild(btn);
                });

                quizContainer.appendChild(qDiv);
            });
        })
        .catch(error => {
            quizContainer.innerHTML = "Error loading file. Make sure the filename is correct.";
        });
}

// Load the default bank when the page first opens
window.onload = loadSelectedBank;
