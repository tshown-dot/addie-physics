// Addie's Physics Test 2 Mastery App Logic

document.addEventListener("DOMContentLoaded", () => {
  // App State
  let state = {
    conceptsMastered: JSON.parse(localStorage.getItem("addie_concepts_mastered") || "[]"),
    mathStreak: parseInt(localStorage.getItem("addie_math_streak") || "0", 10),
    currentMatchmakerIdx: 0,
    currentMathIndex: 0,
    currentMathProblem: null,
    currentFilter: "all"
  };

  // Matchmaker Drill Scenarios
  const MATCHMAKER_SCENARIOS = [
    {
      prompt: "A moving box of mass 4 kg slides across a table at 15 m/s. You need to calculate its energy of motion.",
      keywords: ["mass (m)", "speed (v)", "energy of motion"],
      correctFormulaId: "kinetic-energy",
      reason: "When given mass and speed and asked for energy of motion, grab Kinetic Energy: KE = ½ m v²."
    },
    {
      prompt: "An airbag in a car inflates during a crash, spreading the collision over a longer duration (Δt) to reduce the force felt by the passenger.",
      keywords: ["cushion / airbag", "time of contact (Δt)", "impact force (F)", "stopping momentum"],
      correctFormulaId: "impulse-momentum",
      reason: "Any question discussing cushioning, airbags, follow-through, or force over time uses Impulse-Momentum: F Δt = Δp."
    },
    {
      prompt: "A cylindrical space habitat with radius r = 600 m rotates at speed v = 40 m/s to simulate gravity. What is the acceleration on the outer rim?",
      keywords: ["circular radius (r)", "speed on rim (v)", "outer edge acceleration"],
      correctFormulaId: "centripetal-acceleration",
      reason: "Acceleration while turning or spinning in a circle is Centripetal Acceleration: ac = v² / r."
    },
    {
      prompt: "A 3 kg cart rolling at 8 m/s slams into a resting 5 kg cart, and their velcro bumpers make them latch and stick together.",
      keywords: ["stick together", "two masses combine", "collision speed"],
      correctFormulaId: "inelastic-collision",
      reason: "'Stick together' or 'couple together' triggers the Inelastic Collision formula: (m₁ + m₂)vf = m₁v₁ + m₂v₂."
    },
    {
      prompt: "A mechanic uses a long 0.5-meter pipe over a wrench to more easily turn and loosen a stubborn, rusted lug nut.",
      keywords: ["wrench", "distance from hinge / bolt", "turning force", "lever arm"],
      correctFormulaId: "torque",
      reason: "Twisting or rotating around a pivot using a lever arm is Torque: τ = Force × Lever Arm."
    },
    {
      prompt: "A car moving at 20 m/s hits the brakes and slows to a stop. You need to calculate the change in momentum.",
      keywords: ["car slowing down", "mass and change in velocity", "momentum change"],
      correctFormulaId: "impulse-momentum",
      reason: "Change in momentum is Δp = m(vf - vi). Remember: horizontal car, so never use g = 9.8!"
    },
    {
      prompt: "A 1000 kg car speeds up from 10 m/s to 30 m/s. How much work was done by the engine?",
      keywords: ["work done", "change in speed", "kinetic energy change"],
      correctFormulaId: "work-energy",
      reason: "Work-Energy Theorem: Net Work = change in kinetic energy (W = ΔKE = ½ m vf² - ½ m vi²)."
    }
  ];

  // DOM Elements
  const tabButtons = document.querySelectorAll(".nav-tab");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const conceptScoreEl = document.getElementById("concept-score");
  const mathStreakEl = document.getElementById("math-streak");

  // Initialize Stats
  function updateStatsUI() {
    conceptScoreEl.textContent = state.conceptsMastered.length;
    mathStreakEl.textContent = state.mathStreak;
  }
  updateStatsUI();

  // Tab Navigation
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  // -------------------------------------------------------------
  // TAB 1: FORMULA MATCHMAKER DRILL
  // -------------------------------------------------------------
  const mmTopic = document.getElementById("mm-topic");
  const mmProgress = document.getElementById("mm-progress");
  const mmPrompt = document.getElementById("mm-prompt");
  const mmKeywords = document.getElementById("mm-keywords");
  const mmOptions = document.getElementById("mm-options");
  const mmFeedback = document.getElementById("mm-feedback");
  const mmFeedbackHeader = document.getElementById("mm-feedback-header");
  const mmFeedbackText = document.getElementById("mm-feedback-text");
  const mmAlgebraTip = document.getElementById("mm-algebra-tip");
  const mmNextBtn = document.getElementById("mm-next-btn");

  function renderMatchmakerCard() {
    const scenario = MATCHMAKER_SCENARIOS[state.currentMatchmakerIdx];
    const correctForm = FORMULAS.find(f => f.id === scenario.correctFormulaId);

    mmTopic.textContent = correctForm ? correctForm.topic : "Physics Test 2";
    mmProgress.textContent = `Scenario ${state.currentMatchmakerIdx + 1} of ${MATCHMAKER_SCENARIOS.length}`;
    mmPrompt.innerHTML = scenario.prompt;

    // Render keyword tags
    mmKeywords.innerHTML = scenario.keywords.map(kw => `<span class="keyword-tag">🔍 ${kw}</span>`).join("");

    // Prepare 4 choices: the correct formula + 3 distractors
    const distractors = FORMULAS.filter(f => f.id !== scenario.correctFormulaId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const choices = [correctForm, ...distractors].sort(() => 0.5 - Math.random());

    mmOptions.innerHTML = "";
    mmFeedback.classList.add("hidden");
    mmFeedback.className = "feedback-box hidden";

    choices.forEach(formula => {
      const btn = document.createElement("button");
      btn.className = "mm-opt-btn";
      btn.innerHTML = `
        <span class="mm-opt-name">${formula.name}</span>
        <span class="mm-opt-eq">${formula.equation}</span>
      `;

      btn.addEventListener("click", () => {
        handleMatchmakerChoice(formula.id, scenario, correctForm);
      });

      mmOptions.appendChild(btn);
    });
  }

  function handleMatchmakerChoice(chosenId, scenario, correctForm) {
    const optionButtons = mmOptions.querySelectorAll(".mm-opt-btn");
    optionButtons.forEach(btn => (btn.disabled = true));

    const isCorrect = chosenId === scenario.correctFormulaId;
    mmFeedback.classList.remove("hidden");

    if (isCorrect) {
      mmFeedback.classList.add("correct");
      mmFeedbackHeader.innerHTML = "🎉 Exactly Right! Spot on!";
      mmFeedbackText.innerHTML = scenario.reason;
    } else {
      mmFeedback.classList.add("wrong");
      mmFeedbackHeader.innerHTML = "💡 Not quite — here is the key clue:";
      mmFeedbackText.innerHTML = `${scenario.reason} <br><strong>Correct Choice:</strong> ${correctForm.name} (<code>${correctForm.equation}</code>)`;
    }

    // Highlight correct & wrong buttons
    optionButtons.forEach(btn => {
      const eqText = btn.querySelector(".mm-opt-eq").textContent;
      if (eqText === correctForm.equation) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }
    });

    // Show Algebra Lifeline Tip
    const firstRearrange = correctForm.algebraLifeline[0];
    mmAlgebraTip.innerHTML = `
      <strong>💡 Addie's Algebra Lifeline for this formula:</strong><br>
      To solve for <em>${firstRearrange.find}</em>: <code>${firstRearrange.formula}</code> &mdash; ${firstRearrange.tip}
    `;
  }

  mmNextBtn.addEventListener("click", () => {
    state.currentMatchmakerIdx = (state.currentMatchmakerIdx + 1) % MATCHMAKER_SCENARIOS.length;
    renderMatchmakerCard();
  });

  renderMatchmakerCard();

  // -------------------------------------------------------------
  // TAB 2: SCAFFOLDED MATH LAB
  // -------------------------------------------------------------
  const mathTopicSelect = document.getElementById("math-topic-select");
  const mathRandomizeBtn = document.getElementById("math-randomize-btn");
  const mathProblemBadge = document.getElementById("math-problem-badge");
  const mathProblemTopic = document.getElementById("math-problem-topic");
  const mathProblemPrompt = document.getElementById("math-problem-prompt");
  const mathTrapAlert = document.getElementById("math-trap-alert");
  const mathTrapText = document.getElementById("math-trap-text");
  const mathGivensGrid = document.getElementById("math-givens-grid");
  const mathFormulaName = document.getElementById("math-formula-name");
  const mathRawFormula = document.getElementById("math-raw-formula");
  const mathUserAnswer = document.getElementById("math-user-answer");
  const mathAnswerUnit = document.getElementById("math-answer-unit");
  const mathCheckBtn = document.getElementById("math-check-btn");
  const mathRevealStepsBtn = document.getElementById("math-reveal-steps-btn");
  const mathFeedback = document.getElementById("math-feedback");
  const mathWalkthrough = document.getElementById("math-walkthrough");
  const mathStepList = document.getElementById("math-step-list");

  function loadMathProblem(templateIndex) {
    const template = MATH_TEMPLATES[templateIndex];
    state.currentMathIndex = templateIndex;
    state.currentMathProblem = template.generate();

    mathProblemBadge.textContent = template.badge;
    mathProblemTopic.textContent = template.topic;
    mathProblemPrompt.innerHTML = state.currentMathProblem.prompt;
    mathTrapText.innerHTML = state.currentMathProblem.trapAlert;
    mathFormulaName.textContent = state.currentMathProblem.formulaName;
    mathRawFormula.textContent = state.currentMathProblem.rawFormula;
    mathAnswerUnit.textContent = state.currentMathProblem.unit;

    // Render Givens
    mathGivensGrid.innerHTML = state.currentMathProblem.givens.map(g => `
      <div class="given-chip">
        <span class="given-label">${g.label}</span>
        <span class="given-val">${g.val}</span>
      </div>
    `).join("");

    // Render step list
    mathStepList.innerHTML = state.currentMathProblem.algebraSteps.map(s => `<li>${s}</li>`).join("");

    // Reset inputs and feedback
    mathUserAnswer.value = "";
    mathFeedback.className = "math-feedback-box hidden";
    mathFeedback.innerHTML = "";
    mathWalkthrough.classList.add("hidden");
  }

  mathTopicSelect.addEventListener("change", (e) => {
    loadMathProblem(parseInt(e.target.value, 10));
  });

  mathRandomizeBtn.addEventListener("click", () => {
    loadMathProblem(state.currentMathIndex);
  });

  mathCheckBtn.addEventListener("click", () => {
    const userVal = parseFloat(mathUserAnswer.value);
    if (isNaN(userVal)) {
      alert("Please enter a number for your answer!");
      return;
    }

    const expected = state.currentMathProblem.answer;
    // Allow slight tolerance (0.1 or 2%)
    const diff = Math.abs(userVal - expected);
    const isClose = diff < 0.15 || (expected !== 0 && diff / Math.abs(expected) < 0.03);

    mathFeedback.classList.remove("hidden");
    if (isClose) {
      mathFeedback.className = "math-feedback-box correct";
      mathFeedback.innerHTML = `🌟 EXCELLENT WORK, ADDIE! Correct: <strong>${expected} ${state.currentMathProblem.unit}</strong>! Your algebra is solid!`;
      state.mathStreak++;
      localStorage.setItem("addie_math_streak", state.mathStreak);
      updateStatsUI();
      mathWalkthrough.classList.remove("hidden");
    } else {
      mathFeedback.className = "math-feedback-box wrong";
      mathFeedback.innerHTML = `Almost! You entered <strong>${userVal}</strong>, but the expected answer is <strong>${expected} ${state.currentMathProblem.unit}</strong>. Check the step breakdown below to see where the algebra went off track.`;
      state.mathStreak = 0;
      localStorage.setItem("addie_math_streak", "0");
      updateStatsUI();
      mathWalkthrough.classList.remove("hidden");
    }
  });

  mathRevealStepsBtn.addEventListener("click", () => {
    mathWalkthrough.classList.toggle("hidden");
  });

  loadMathProblem(0);

  // -------------------------------------------------------------
  // TAB 3: CONCEPTUAL EXAM BANK
  // -------------------------------------------------------------
  const conceptQuestionsList = document.getElementById("concept-questions-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderConceptQuestions() {
    const filtered = state.currentFilter === "all"
      ? CONCEPT_QUESTIONS
      : CONCEPT_QUESTIONS.filter(q => q.chapter.toString() === state.currentFilter);

    conceptQuestionsList.innerHTML = "";

    filtered.forEach((q, idx) => {
      const isMastered = state.conceptsMastered.includes(q.id);
      const card = document.createElement("div");
      card.className = `question-card ${isMastered ? "answered-correct" : ""}`;
      card.id = `qcard-${q.id}`;

      card.innerHTML = `
        <div class="q-header">
          <span class="topic-pill">${q.chapterTitle}</span>
          ${isMastered ? '<span class="badge" style="background:#dcfce7;color:#15803d;font-weight:700;">✓ Mastered</span>' : ''}
        </div>
        <div class="q-title">${idx + 1}. ${q.question}</div>
        <div class="q-options" id="opt-container-${q.id}">
          ${q.options.map((opt, optIdx) => `
            <button class="q-opt" data-qid="${q.id}" data-optindex="${optIdx}">
              <span class="q-opt-letter">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>
        <div class="q-explanation hidden" id="exp-${q.id}">
          <span class="q-exp-label">Plain English Explanation:</span>
          <p>${q.plainEnglish}</p>
          <div class="q-trap-tip">⚠️ <strong>Prof. Perugini Trap Warning:</strong> ${q.trapTip}</div>
        </div>
      `;

      conceptQuestionsList.appendChild(card);
    });

    // Attach click listeners to all question options
    document.querySelectorAll(".q-opt").forEach(btn => {
      btn.addEventListener("click", handleConceptAnswer);
    });
  }

  function handleConceptAnswer(e) {
    const btn = e.currentTarget;
    const qid = btn.getAttribute("data-qid");
    const optIdx = parseInt(btn.getAttribute("data-optindex"), 10);
    const question = CONCEPT_QUESTIONS.find(q => q.id === qid);
    const container = document.getElementById(`opt-container-${qid}`);
    const explanation = document.getElementById(`exp-${qid}`);
    const card = document.getElementById(`qcard-${qid}`);

    // Disable all options in this card
    const allBtns = container.querySelectorAll(".q-opt");
    allBtns.forEach(b => (b.disabled = true));

    explanation.classList.remove("hidden");

    if (optIdx === question.correct) {
      btn.classList.add("selected-correct");
      card.classList.add("answered-correct");
      if (!state.conceptsMastered.includes(qid)) {
        state.conceptsMastered.push(qid);
        localStorage.setItem("addie_concepts_mastered", JSON.stringify(state.conceptsMastered));
        updateStatsUI();
      }
    } else {
      btn.classList.add("selected-wrong");
      allBtns[question.correct].classList.add("selected-correct");
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentFilter = btn.getAttribute("data-chapter");
      renderConceptQuestions();
    });
  });

  renderConceptQuestions();

  // -------------------------------------------------------------
  // TAB 4: TRAP WARNINGS
  // -------------------------------------------------------------
  const trapsGrid = document.getElementById("traps-grid");
  trapsGrid.innerHTML = TRAPS.map(trap => `
    <div class="trap-card">
      <div class="trap-card-header">
        <span class="badge" style="background:${trap.color}22; color:${trap.color}; font-weight:700;">${trap.badge}</span>
      </div>
      <h3>${trap.title}</h3>
      <p class="trap-desc">${trap.description}</p>
      <div class="trap-rule-box">
        <strong>The Rule You Must Memorize:</strong>
        <p>${trap.rule}</p>
      </div>
      <div class="trap-mnemonic">
        💡 <em>Memory Hook:</em> ${trap.mnemonic}
      </div>
    </div>
  `).join("");

  // -------------------------------------------------------------
  // TAB 5: CHEAT SHEET & ALGEBRA
  // -------------------------------------------------------------
  const cheatGrid = document.getElementById("cheat-sheet-grid");
  cheatGrid.innerHTML = FORMULAS.map(form => `
    <div class="cheat-card">
      <span class="topic-pill">${form.topic}</span>
      <h3 style="margin-top:8px;">${form.name}</h3>
      <div class="cheat-equation">${form.equation}</div>
      <p class="cheat-plain">${form.plainEnglish}</p>
      
      <div style="font-size:0.85rem; color:#4338ca; font-weight:600; margin-bottom:6px;">
        🔍 Trigger Keywords: ${form.triggerKeywords.join(", ")}
      </div>

      <table class="cheat-algebra-table">
        <thead>
          <tr>
            <th>Solving For</th>
            <th>Formula to Plug Into</th>
            <th>Quick Tip</th>
          </tr>
        </thead>
        <tbody>
          ${form.algebraLifeline.map(alg => `
            <tr>
              <td><strong>${alg.find}</strong></td>
              <td><code>${alg.formula}</code></td>
              <td>${alg.tip}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `).join("");
});
