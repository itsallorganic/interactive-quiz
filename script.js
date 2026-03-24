// 1. Fetch the questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const quizContainer = document.getElementById('quiz');

        data.forEach((item, qIndex) => {
            // Create a div for each question
            const qDiv = document.createElement('div');
            qDiv.className = 'question-block';
            qDiv.innerHTML = `<h3>${item.question}</h3>`;

            // Create buttons for each option
            item.options.forEach((option, oIndex) => {
                const btn = document.createElement('button');
                btn.innerText = option;
                
                btn.onclick = () => {
                    // Check if the clicked option index matches the answer index
                    if (oIndex === item.answer) {
                        btn.className = 'correct';
                    } else {
                        btn.className = 'wrong';
                    }
                    
                    // Disable all buttons in this question block after an answer is chosen
                    const siblingButtons = qDiv.querySelectorAll('button');
                    siblingButtons.forEach(b => b.disabled = true);
                };
                
                qDiv.appendChild(btn);
            });

            quizContainer.appendChild(qDiv);
        });
    });
