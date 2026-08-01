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

                // Container for option buttons
                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'options-container';

                // Div to display explanations after answering
                const expDiv = document.createElement('div');
                expDiv.className = 'explanation-box';
                expDiv.style.display = 'none';

                item.options.forEach((option, oIndex) => {
                    const btn = document.createElement('button');
                    btn.innerText = option;
                    
                    btn.onclick = () => {
                        // 1. Reset button colors for this question
                        const allButtons = optionsContainer.querySelectorAll('button');
                        allButtons.forEach(b => b.classList.remove('correct', 'wrong'));

                        // 2. Mark selected button as right or wrong
                        const isCorrect = (oIndex === item.answer);
                        if (isCorrect) {
                            btn.classList.add('correct');
                        } else {
                            btn.classList.add('wrong');
                        }

                        // 3. Render and display option-by-option explanations
                        let explanationHTML = `<strong>Result:</strong> ${isCorrect ? '<span style="color:green;">Correct!</span>' : '<span style="color:red;">Incorrect.</span>'}<br><br>`;
                        
                        if (item.choice_explanations) {
                            explanationHTML += `<strong>Explanation of choices:</strong><ul>`;
                            item.options.forEach((optText, idx) => {
                                const choiceKey = String.fromCharCode(65 + idx); // Converts 0->A, 1->B, etc.
                                const isAnswerKey = (idx === item.answer);
                                const choiceExplanation = item.choice_explanations[choiceKey] || "No explanation provided.";
                                
                                explanationHTML += `<li style="margin-bottom: 8px;">
                                    <strong>Option ${choiceKey} (${optText}) ${isAnswerKey ? '— [CORRECT ANSWER]' : ''}:</strong> 
                                    ${choiceExplanation}
                                </li>`;
                            });
                            explanationHTML += `</ul>`;
                        } else if (item.explanation) {
                            explanationHTML += `<strong>Explanation:</strong> ${item.explanation}`;
                        }

                        expDiv.innerHTML = explanationHTML;
                        expDiv.style.display = 'block';
                    };
                    
                    optionsContainer.appendChild(btn);
                });

                qDiv.appendChild(optionsContainer);
                qDiv.appendChild(expDiv);
                quizContainer.appendChild(qDiv);
            });
        })
        .catch(error => {
            quizContainer.innerHTML = `<p style="color:red;">Error: Could not load "${filePath}". Make sure the path and JSON structure are correct.</p>`;
        });
}

// Load default bank on page load
window.onload = loadSelectedBank;
