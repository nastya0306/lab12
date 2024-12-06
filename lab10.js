$(document).ready(function () {
  const words = {
    beginner: [
      { word: "full", translation: "повний" },
      { word: "empty", translation: "пустий" },
      { word: "cat", translation: "кіт" }
    ],
    intermediate: [
      { word: "prawns", translation: "креветка" },
      { word: "squid", translation: "кальмари" },
      { word: "lamb", translation: "баранина" },
      { word: "cauliflower", translation: "цвітна капуста" }
    ],
    advanced: [
      { word: "amphibian", translation: "амфібія" },
      { word: "cold-blooded", translation: "холоднокровний" },
      { word: "rodent", translation: "гризун" }
    ]
  };

  let currentIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let selectedWords = [];

  function updateWord() {
    if (selectedWords.length > 0) {
      $("#word").text(selectedWords[currentIndex].word);
      $("#translation").val("");
      $("#step").text(`${currentIndex + 1}/${selectedWords.length}`);
      $("#correct").text(correctAnswers);
      $("#incorrect").text(incorrectAnswers);
    }
  }

  $("input[name='difficulty']").change(function () {
    const difficulty = $(this).val();
    selectedWords = words[difficulty] || [];
    currentIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    $("#correct").text(0);
    $("#incorrect").text(0);
    updateWord();
  });

  $("#check-btn").click(function () {
    const userTranslation = $("#translation").val().trim();
    const correctTranslation = selectedWords[currentIndex]?.translation;

    if (userTranslation.toLowerCase() === correctTranslation?.toLowerCase()) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

    currentIndex++;

    if (currentIndex < selectedWords.length) {
      updateWord();
    } else {
      const totalWords = selectedWords.length;
      const knowledgeLevel =
        correctAnswers / totalWords >= 0.8
          ? "Високий"
          : correctAnswers / totalWords >= 0.5
          ? "Середній"
          : "Низький";

      $("#result-message").text(
        `Ваша кількість вірних відповідей: ${correctAnswers}/${totalWords}. Рівень знань: ${knowledgeLevel}.`
      );
      $("#result-modal").fadeIn();
    }
  });

  $("#restart-btn").click(function () {
    currentIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    $("#correct").text(0);
    $("#incorrect").text(0);
    $("#result-modal").fadeOut();
    updateWord();
  });

  updateWord();
});
