function loadSelectedBank() {
    const filePath = document.getElementById('bank-selector').value;
    const quizContainer = document.getElementById('quiz');
    
    quizContainer.innerHTML = "Loading questions...";

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.json();
        })
        .then(data => {
            quizContainer.innerHTML = "";

            data.forEach((item, qIndex) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'question-block';
                qDiv.innerHTML = `<h3>${item.question}</h3>`;

                item.options.forEach((option, oIndex) => {
                    const btn = document.createElement('button');
                    btn.innerText = option;
                    
                    btn.onclick = () => {
                        // Clear previous selection colors for this question
                        const allButtons = qDiv.querySelectorAll('button');
                        allButtons.forEach(b => b.classList.remove('correct', 'wrong'));

                        // Apply new color (allows re-selection)
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
            quizContainer.innerHTML = `<p style="color:red;">Error: Could not find "${filePath}" in the qbanks folder.</p>`;
        });
}

// Initial load
window.onload = loadSelectedBank;
